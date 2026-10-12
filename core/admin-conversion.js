/* Exact NSO snapshot: July 2025 transition, not a live address validation service. */
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./admin-data'):root.VN_ADMIN_DATA);if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.VN_ADMIN=api;})(typeof globalThis!=='undefined'?globalThis:this,function(D){
'use strict';
const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
const rows=D.rows.map(values=>Object.fromEntries(D.columns.map((key,i)=>[key,D.strings[values[i]]])));
const provinceCode=s=>(s.match(/\((\d{2})\)$/)||[])[1]||'';
const oldProvinces=[...new Map(rows.map(r=>[provinceCode(r.oldProvince),{code:provinceCode(r.oldProvince),name:r.oldProvince}])).values()].sort((a,b)=>a.name.localeCompare(b.name,'vi'));
const newProvinces=[...new Map(rows.map(r=>[provinceCode(r.newProvince),{code:provinceCode(r.newProvince),name:r.newProvince}])).values()].sort((a,b)=>a.name.localeCompare(b.name,'vi'));
const indexed=rows.map(r=>({r,old:normalize([r.oldName,r.oldCode,r.oldDistrict,r.oldProvince].join(' ')),new:normalize([r.newName,r.newCode,r.newProvince].join(' '))}));
function search({query='',direction='old-new',province='',level='commune',offset=0,limit=30}={}){
 const reverse=direction==='new-old',side=reverse?'new':'old',q=normalize(query).replace(/\b(?:tphcm|tp hcm|hcm)\b/g,'ho chi minh'),tokens=q.split(' ').filter(Boolean),pkey=reverse?'newProvince':'oldProvince';
 const matches=indexed.filter(x=>(!province||provinceCode(x.r[pkey])===province)&&tokens.every(t=>(' '+(level==='province'?normalize(x.r[pkey]):x[side])+' ').includes(' '+t+' ')));
 const groups=new Map();
 for(const {r} of matches){const key=level==='province'?provinceCode(r[pkey]):reverse?r.newCode:(r.oldCode?'commune:'+r.oldCode:'area:'+r.oldDistrict+':'+r.oldName);if(!groups.has(key))groups.set(key,{key,name:level==='province'?r[pkey]:reverse?r.newName:(r.oldName||r.oldDistrict),code:level==='province'?provinceCode(r[pkey]):reverse?r.newCode:r.oldCode,province:r[pkey],district:reverse?'':r.oldDistrict,targets:[]});const g=groups.get(key),t=level==='province'?{name:reverse?r.oldProvince:r.newProvince,code:provinceCode(reverse?r.oldProvince:r.newProvince),note:''}:reverse?{name:r.oldName||r.oldDistrict,code:r.oldCode,province:r.oldProvince,district:r.oldDistrict,note:r.note}:{name:r.newName,code:r.newCode,province:r.newProvince,note:r.note};if(!g.targets.some(x=>JSON.stringify(x)===JSON.stringify(t)))g.targets.push(t);}
 const all=[...groups.values()];return {total:all.length,rows:all.slice(Math.max(0,offset),Math.max(0,offset)+Math.max(1,Math.min(limit,11000))),direction,level};
}
return Object.freeze({search,normalize,oldProvinces,newProvinces,source:D.source,download:D.download,effectiveFrom:D.effectiveFrom,reviewedAt:D.reviewedAt,stats:{relations:rows.length,communes:new Set(rows.map(r=>r.newCode)).size,oldProvinces:oldProvinces.length,newProvinces:newProvinces.length}});
});
