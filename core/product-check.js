(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.VN_PRODUCT=api;})(typeof window!=='undefined'?window:globalThis,function(){
'use strict';
const SOURCES=Object.freeze({lookup:'https://gs1.gov.vn/verified-by-gs1?lang=vi',apps:'https://camnangsokhcn.mst.gov.vn/tieu-chuan-do-luong-va-chat-luong.htm'});
function gtin(value){const code=String(value||'').trim();if(!/^(?:\d{8}|\d{12}|\d{13}|\d{14})$/.test(code))return {status:'INVALID_LENGTH',code};let sum=0,weight=3;for(let i=code.length-2;i>=0;i--){sum+=Number(code[i])*weight;weight=weight===3?1:3;}return {status:(10-sum%10)%10===Number(code.at(-1))?'VALID_CHECK_DIGIT':'INVALID_CHECK_DIGIT',code};}
function digitalFields(u){const parts=u.pathname.split('/').filter(Boolean);if(parts[0]!=='01'||!/^\d{14}$/.test(parts[1]||''))return null;const fields={gtin:gtin(parts[1]),lot:'',serial:'',expiry:''},seen=new Set(['01']);const values={'10':'lot','21':'serial','17':'expiry'};const entries=[];for(let i=2;i<parts.length;i+=2){if(parts[i+1]===undefined)return null;try{entries.push([parts[i],decodeURIComponent(parts[i+1])]);}catch{return null;}}for(const pair of u.searchParams.entries())if(Object.hasOwn(values,pair[0]))entries.push(pair);
for(const [ai,encoded] of entries){if(!Object.hasOwn(values,ai))continue;if(seen.has(ai))return null;seen.add(ai);const text=encoded;if(ai==='17'){if(!/^\d{6}$/.test(text)||Number(text.slice(2,4))<1||Number(text.slice(2,4))>12||Number(text.slice(4))>[31,Number(text.slice(0,2))%4===0?29:28,31,30,31,30,31,31,30,31,30,31][Number(text.slice(2,4))-1])return null;}else if(!text||text.length>20||/[\x00-\x1f\x7f]/.test(text))return null;fields[values[ai]]=text;}
return fields;}
function related(r){return {basis:r.kind==='URL'&&r.fields?'QR_GS1':'CODE_ONLY',gtin:r.kind==='GTIN'?r.code:r.fields?.gtin.code||r.gtin?.code||'',lot:r.fields?.lot||'',serial:r.fields?.serial||'',expiry:r.fields?.expiry||'',sources:SOURCES,productStatus:'NO_CONNECTED_DATABASE'};}
function analyze(value){const raw=String(value||'').trim();const base={origin:'NOT_VERIFIED',authenticity:'NOT_VERIFIED'};if(!raw)return {...base,kind:'EMPTY'};if(raw.length>4096)return {...base,kind:'TOO_LONG'};if(/^\d+$/.test(raw))return {...base,kind:'GTIN',...gtin(raw)};
 if(/^https?:\/\//i.test(raw)){try{const u=new URL(raw);if(u.protocol!=='https:'||u.username||u.password)return {...base,kind:'BLOCKED_URL'};const match=u.pathname.match(/\/01\/(\d{14})(?:\/|$)/);return {...base,kind:'URL',host:u.hostname,official:Object.values(SOURCES).includes(raw),gtin:match?gtin(match[1]):null,fields:digitalFields(u)};}catch{return {...base,kind:'BLOCKED_URL'};}}
 if(/^[a-z][a-z0-9+.-]*:/i.test(raw))return {...base,kind:'BLOCKED_SCHEME'};
 return {...base,kind:'TEXT'};
}
return Object.freeze({SOURCES,gtin,analyze,related});
});
