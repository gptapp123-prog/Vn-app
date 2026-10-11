/* Evidence validation boundary. No seeded legal facts, personal APIs or remote calls. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.VN_KNOWLEDGE=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const date=x=>typeof x==='string'&&/^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(x)&&Number.isFinite(Date.parse(x));
async function validate(record,policy,now=new Date()){
 if(!record||!policy||!Number.isFinite(+now))return {ok:false,reason:'INVALID_RECORD'};
 const required=['source_id','issuing_agency','source_url','content','content_checksum','jurisdiction','reviewer','quote'];
 if(required.some(k=>typeof record[k]!=='string'||!record[k].trim()))return {ok:false,reason:'MISSING_METADATA'};
 if(!policy.validUrl(record.source_url))return {ok:false,reason:'UNAPPROVED_SOURCE'};
 if(record.status!=='APPROVED'||record.superseded_by)return {ok:false,reason:'NOT_CURRENT_APPROVED'};
 if(!date(record.publication_date)||!date(record.effective_from)||!date(record.last_verified_at))return {ok:false,reason:'UNKNOWN_DATES'};
 const from=Date.parse(record.effective_from),verified=Date.parse(record.last_verified_at);
 if(from>+now||verified>+now||Date.parse(record.publication_date)>+now)return {ok:false,reason:'FUTURE_RECORD'};
 if(record.effective_to!=null&&(!date(record.effective_to)||Date.parse(record.effective_to)<=+now))return {ok:false,reason:'EXPIRED_OR_INVALID_END'};
 if(+now-verified>30*86400000)return {ok:false,reason:'REVIEW_STALE'};
 if(!record.content.includes(record.quote))return {ok:false,reason:'QUOTE_NOT_FOUND'};
 if(!/^[a-f0-9]{64}$/.test(record.content_checksum))return {ok:false,reason:'INVALID_CHECKSUM'};
 const bytes=new TextEncoder().encode(record.content);
 const hash=Array.from(new Uint8Array(await globalThis.crypto.subtle.digest('SHA-256',bytes)),x=>x.toString(16).padStart(2,'0')).join('');
 if(hash!==record.content_checksum)return {ok:false,reason:'CHECKSUM_MISMATCH'};
 return {ok:true,record};
}
async function retrieve(records,policy,jurisdiction,now=new Date()){
 if(!Array.isArray(records)||!jurisdiction)return {kind:'NO_VALID_EVIDENCE',reason:'MISSING_CONTEXT'};
 const items=[];
 for(const record of records){if(record.jurisdiction!==jurisdiction)continue;const verdict=await validate(record,policy,now);if(verdict.ok)items.push(record);}
 if(!items.length)return {kind:'NO_VALID_EVIDENCE',reason:'NO_CURRENT_APPROVED_RECORD'};
 // Conflicting provisions need independent review; do not choose a winner.
 const provisions=new Map();
 for(const item of items){if(!item.provision_id)return {kind:'NO_VALID_EVIDENCE',reason:'MISSING_PROVISION_ID'};const prior=provisions.get(item.provision_id);if(prior&&prior!==item.content_checksum)return {kind:'NO_VALID_EVIDENCE',reason:'CONFLICTING_EVIDENCE'};provisions.set(item.provision_id,item.content_checksum);}
 return {kind:'EVIDENCE_FOUND',items};
}
function service(url,policy){return policy?.validUrl(url)?{kind:'HANDOFF',official_url:url,auth_required:true}:{kind:'NOT_AVAILABLE',reason:'NO_VERIFIED_ROUTE'};}
return Object.freeze({validate,retrieve,service});
});
