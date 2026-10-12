'use strict';
const assert=require('node:assert/strict'),A=require('../core/admin-conversion'),D=require('../core/admin-data'),W=require('../core/water-routing'),C=require('../core/app-catalog');
assert.deepEqual(A.stats,{relations:10571,communes:3321,oldProvinces:63,newProvinces:34});
assert.equal(A.search({direction:'new-old',province:'79'}).total,168);
assert.equal(A.search({direction:'new-old',province:'80'}).total,96);
assert.equal(A.search({level:'province',query:'Long An'}).rows[0].targets[0].code,'80');
assert.equal(A.search({level:'province',query:'Hồ Chí Minh',direction:'new-old'}).rows[0].targets.length,3);
assert(A.search({query:'00016'}).rows[0].targets.length>1,'Split communes must retain all destinations');
assert.equal(A.search({query:'Truc Bach'}).rows[0].code,'00004');
assert.equal(A.search({query:'Côn Đảo'}).rows[0].targets[0].code,'26732');
assert(A.search({query:'An Bình'}).total>1,'Duplicate names must not collapse across districts');
assert.equal(A.search({query:'không tồn tại abc xyz'}).total,0);
for(const raw of D.rows){const r=Object.fromEntries(D.columns.map((k,i)=>[k,D.strings[raw[i]]]));assert.match(r.newCode,/^\d{5}$/);assert(r.oldCode||r.oldDistrict);assert.match(r.newProvince,/\(\d{2}\)$/);assert(r.note);}
assert.equal(W.PROVIDERS.length,24);
assert.equal(W.candidates('hcm','hcm-old').providers.length,11);
assert.equal(W.search({query:'xã Bình Chánh'}).some(p=>p.id==='sawaco-nt'),true);
assert(W.search({query:'Nhiêu Lộc'}).length>1,'Partial coverage must keep competing candidates');
assert(W.search({query:'Dĩ An'}).some(p=>p.id.startsWith('biwase')));
assert(W.search({region:'tayninh',area:'longan-old'}).length>1);
assert.equal(W.search({query:'không có xyz'}).length,0);
for(const p of W.PROVIDERS){for(const key of ['source','website','lookup','payment'])if(p[key])assert.equal(new URL(p[key]).protocol,'https:');for(const id of p.channels)assert(W.APPS[id]);}
assert.equal(W.PROVIDERS.find(p=>p.id==='rural-tayninh').payment,'');
const icon='data:image/png;base64,aGVsbG8=';
const device=C.validate({kind:'device',packageName:'vn.example.device',name:'App máy',icon,bills:['Tiền nước']});assert(device.ok);assert.equal(device.item.id,'device:vn.example.device');assert.equal(device.item.android,'');assert.equal(C.parseBackup(JSON.stringify({schema:'vn-app-apps/1',apps:[device.item]}))[0].packageName,'vn.example.device');
for(const packageName of ['javascript:alert(1)','vn.example;rm','', '../bad'])assert.equal(C.validate({kind:'device',packageName,name:'App',icon}).ok,false);
assert.equal(C.validate({kind:'device',packageName:'vn.example.device',name:'App'}).ok,false);
console.log('PASS 3.17: nationwide snapshot invariants, split/duplicate/district conversion, water coverage and device-app backup validation.');
