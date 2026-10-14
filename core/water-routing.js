/* Region is a search filter, never proof of a household's water supplier. */
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./water-data'):root.VN_WATER_DATA);if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.VN_WATER=api;})(typeof globalThis!=='undefined'?globalThis:this,function(DATA){
'use strict';
const REGIONS=Object.freeze([
 {id:'hcm',name:'TP.HCM mới',areas:[{id:'hcm-old',name:'TP.HCM trước sáp nhập'},{id:'binhduong-old',name:'Bình Dương trước sáp nhập'},{id:'brvt-old',name:'Bà Rịa – Vũng Tàu trước sáp nhập'}]},
 {id:'tayninh',name:'Tây Ninh mới',areas:[{id:'tayninh-old',name:'Tây Ninh trước sáp nhập'},{id:'longan-old',name:'Long An trước sáp nhập'}]}
]);
const PROVIDERS=Object.freeze(DATA.providers.map(x=>Object.freeze({...x,channels:Object.freeze(x.channels)})));
const APPS=Object.freeze({
 momo:Object.freeze({id:'momo',name:'MoMo',android:'https://play.google.com/store/apps/details?id=com.mservice.momotransfer',ios:'',help:'https://www.momo.vn/huong-dan/huong-dan-thanh-toan-hoa-don-tien-nuoc-bang-vi-momo',packageId:'com.mservice.momotransfer'}),
 payoo:Object.freeze({id:'payoo',name:'Payoo',android:'https://play.google.com/store/apps/details?id=vn.payoo',ios:'',help:'https://app.payoo.vn/',packageId:'vn.payoo',web:'https://bill.payoo.vn/'})
});
function candidates(region,area){const r=REGIONS.find(x=>x.id===region);if(!r)return {status:'NEEDS_REGION',providers:[]};if(area&&!r.areas.some(x=>x.id===area))return {status:'INVALID_AREA',providers:[]};const providers=PROVIDERS.filter(x=>x.region===region&&(!area||x.area===area));return {status:providers.length?'CANDIDATES_ONLY':'NO_VERIFIED_PROVIDER',providers};}
function resolve({region,area,providerId,confirmed=false}={}){const result=candidates(region,area);const provider=result.providers.find(x=>x.id===providerId);if(!provider)return {...result,apps:[]};if(confirmed!==true)return {status:'NEEDS_PROVIDER_CONFIRMATION',provider,apps:[]};return {status:'HANDOFF_READY',provider,apps:provider.channels.map(x=>APPS[x]).filter(Boolean),canConfirmPayment:false};}
function fromQuery(query){const q=String(query||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').toLowerCase();const regions=[];if(/tphcm|tp\.?\s*hcm|ho chi minh|binh duong|ba ria|vung tau/.test(q))regions.push('hcm');if(/tay ninh|long an/.test(q))regions.push('tayninh');let region=regions.length===1?regions[0]:'';let area='';if(region==='hcm'&&/binh duong/.test(q))area='binhduong-old';else if(region==='hcm'&&/ba ria|vung tau/.test(q))area='brvt-old';else if(region==='tayninh'&&/long an/.test(q))area='longan-old';return {region,area};}
// Browser cannot launch a package by store URL. A trusted Android host can open a pinned package.
function launchRequest(appId,bridge){const app=Object.hasOwn(APPS,appId)?APPS[appId]:null;if(!app)return {status:'UNKNOWN_APP'};if(!bridge||typeof bridge.openKnownApp!=='function')return {status:'NATIVE_LAUNCH_UNAVAILABLE',app};try{const status=bridge.openKnownApp(appId);return {status:status==='REQUESTED'?'LAUNCH_REQUESTED':status==='NOT_INSTALLED'?'NOT_INSTALLED':'LAUNCH_FAILED',app};}catch{return {status:'LAUNCH_FAILED',app};}}
function normalize(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();}
function search({region='',area='',query='',rural=false}={}){const tokens=normalize(query).replace(/\b(?:xa|phuong|quan|huyen|thi tran|cong ty|o|tai)\b/g,' ').split(' ').filter(Boolean);return PROVIDERS.filter(p=>(!region||p.region===region)&&(!area||p.area===area)&&(!rural||/nong thon|hop tac xa/.test(normalize(p.name)))&&tokens.every(t=>(' '+normalize([p.name,...p.coverage.flatMap(c=>[c.district,c.old,c.new])].join(' '))+' ').includes(' '+t+' ')));}
function named(raw){const q=' '+normalize(raw)+' ',ids=['lawaco','bwaco','taniwassco','phumyvinh'];const found=PROVIDERS.filter(p=>ids.includes(p.id)&&q.includes(' '+p.id+' '));return found.length===1?found[0]:null;}
return Object.freeze({REGIONS,PROVIDERS,APPS,candidates,resolve,fromQuery,launchRequest,search,named,reviewedAt:DATA.reviewedAt});
});
