/* VN App V3 pipeline. No network, analytics, query storage, external auth or private API. */
(function(root,factory){
 const api=factory(root?.VN_ENGINE,root?.VN_DATA,root?.VN_TRUST,root?.VN_EVIDENCE);
 if(typeof module==='object'&&module.exports)module.exports={create:factory};
 if(root)root.VN_RUNTIME=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(engine,data,trust,evidence){
'use strict';
if(!engine||!data||!trust||!evidence)return null;
const registry=trust.fromCatalog(data);
const STAGES=Object.freeze(['INPUT_BOUNDARY','INTENT_ROUTER','EVIDENCE_GATE','OFFICIAL_SOURCE_POLICY','RESPONSE_CONTRACT']);
function process(raw){
 const safe=engine.sanitize(raw);
 // Drop raw value after boundary. Only sanitized, volatile string reaches classifier.
 const draft=engine.process(safe.query);
 const flags=evidence.classify(safe.query,engine.normalize);
 const results=[];
 for(const match of draft.results){
   const actions=[];
   for(const a of match.actions){
     const approved=registry.resolve(a.url);
     if(!approved.ok)continue;
     const d=approved.record;
     if(!actions.some(x=>x.url===d.url))actions.push(Object.freeze({
       label:approved.changed?'Đến Cổng Dịch vụ công (kiểm tra lại thủ tục)':a.label,
       url:d.url,level:approved.changed?'portal':a.level==='direct'&&d.level==='direct'?'direct':'portal',
       agency:d.agency,sourceState:d.reviewState,reviewNeeded:approved.changed
     }));
   }
   // Fails closed: do not return a route if all its URLs were rejected.
   if(!actions.length)continue;
   const card={id:match.id,task:match.task,title:match.title,category:match.category,status:match.status,
     answer:match.answer,steps:match.steps,actions,source:actions[0].url,
     verifiedAt:'11/10/2026 (danh mục tĩnh)',sourceState:'CATALOGUED_NOT_LIVE_CHECKED'};
   const decision=evidence.gate(card,flags);
   results.push(Object.freeze({...card,decision}));
 }
 let status=(!safe.query&&safe.sensitive)?'PRIVATE_INPUT':draft.status;
 if(draft.status==='MATCHED'||draft.status==='MULTIPLE_MATCHES'){
   status=results.length>1?'MULTIPLE_MATCHES':results.length===1?'MATCHED':'NO_VERIFIED_ROUTE';
 }
 return Object.freeze({version:'3.13.0',status,results,sensitive:safe.sensitive||draft.sensitive,
   message:status==='NO_VERIFIED_ROUTE'?'Không có điểm đến hợp lệ trong danh mục cho tác vụ này. Không tự tạo liên kết hoặc kết quả.':draft.message,
   diagnostics:Object.freeze({stages:STAGES,sourceMode:'STATIC_CATALOG',remoteApi:false,personalDataAccess:false,confidenceModel:'not_calibrated'})});
}
function selfCheck(){const items=engine.selfCheck();const unsafe=registry.records().filter(x=>!trust.isSafeSyntax(x.url));return Object.freeze({intents:items.intents,approvedDestinations:registry.allowedCount,invalidLinks:items.invalidLinks,unsafeDestinations:unsafe.length});}
return Object.freeze({process,validUrl:registry.validUrl,selfCheck,stages:STAGES,engine,registry});
});
