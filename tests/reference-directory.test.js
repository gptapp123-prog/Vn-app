'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto'),path=require('node:path');
const R=require('../core/reference-directory.js'),D=R.data,E=require('../engine.js');
assert.equal(D.provinces.length,34);
assert.equal(new Set(D.provinces.map(p=>p.id)).size,34);
assert.equal(new Set(D.provinces.flatMap(p=>p.oldNames)).size,63);
assert.equal(new Set(D.provinces.flatMap(p=>p.plates)).size,D.provinces.flatMap(p=>p.plates).length);
assert.equal(D.communes.length,3319);assert.equal(D.rejected.length,2);
assert.equal(new Set(D.communes.map(c=>c.code)).size,3319);
for(const c of D.communes){assert.match(c.code,/^\d{5}$/);assert.ok(D.provinces.find(p=>p.id===c.provinceId).postalPrefixes.includes(c.code.slice(0,2)));assert.ok(c.pdfPage>=2&&c.pdfPage<=94);}
for(const source of Object.values(D.sources)){assert.ok(R.validUrl(source.url));if(source.localFile)assert.equal(crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname,'..',source.localFile))).digest('hex'),source.sha256);}
assert.equal(R.provinces('Long An','admin')[0].name,'Tây Ninh');
assert.equal(R.provinces('Bình Dương','admin')[0].name,'Hồ Chí Minh');
assert.deepEqual(R.provinces('Tây Ninh','postal')[0].postalPrefixes,['80','82','83']);
assert.equal(R.provinces('62','plates')[0].name,'Tây Ninh');
assert.equal(R.provinces('80','plates').length,0);assert.equal(R.specialPlate.name,'Cục Cảnh sát giao thông');
assert.equal(R.provinces('80','admin')[0].name,'Tây Ninh'); // no interchange between different code systems
assert.equal(R.provinces('03','postal')[0].name,'Hải Phòng');
assert.equal(R.provinces('05127','plates').length,0);
assert.equal(R.postal('05127').status,'SOURCE_ROW_INVALID');assert.equal(R.postal('05127').items.length,0);
assert.equal(R.postal('Tam Dương Bắc').status,'SOURCE_ROW_INVALID');assert.equal(R.postal('152213').items.length,0);
assert.equal(R.postal('mã bưu chính Bình Chánh TPHCM').items[0].name,'X. Bình Chánh');
assert.equal(R.postal('mã bưu chính TPHCM').total,168);
assert.ok(R.postal('An').items.some(c=>c.provinceId!=='91')); // partial commune names cannot narrow to An Giang
assert.equal(R.postal('không có tên này').total,0);
assert.equal(R.postal('', 'invalid').status,'UNKNOWN_PROVINCE');
assert.equal(R.postal('Bình Chánh','80').total,0);
assert.equal(R.postal('', '',50).items.length,50);assert.equal(R.postal('', '',100).items.length,100);
assert.deepEqual(R.detect('biển số xe 62 tỉnh nào'),{mode:'plates',query:'62'});
assert.equal(R.detect('phạt nguội biển số 59A-123.45'),null);
assert.equal(E.sanitize('mã bưu chính 03106').sensitive,false);
assert.equal(E.sanitize('biển số 59A-123.45').sensitive,true);
assert.equal(R.findContacts('điện')[0].phone,'1558');
assert.equal(R.findContacts('Nông Thôn','Nước').some(c=>c.email==='nongthon@sawaco.com.vn'),true);
assert.equal(R.findContacts('không có đơn vị').length,0);
for(const c of R.contacts){assert.ok(R.validUrl(c.url));assert.ok(R.validUrl(c.source));if(c.phone)assert.match(c.phone,/^\d{3,11}$/);}
assert.equal(R.validUrl('https://evil.example/'),false);
assert.equal(R.validUrl(D.sources.postal.pdfUrl+'#page=38'),true);
assert.equal(R.validUrl(D.sources.postal.pdfUrl+'#page=999'),false);
assert.equal(R.validUrl(D.sources.postal.pdfUrl+'?redirect=evil'),false);
assert.equal(R.validUrl('https://user:pass@mst.gov.vn/van-ban-phap-luat/25175.htm'),false);
console.log('PASS: province/plate/postal mappings, all 3319 row invariants, source hashes, quarantine, ambiguity, contact pins.');
