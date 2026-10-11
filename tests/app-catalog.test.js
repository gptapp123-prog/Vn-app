'use strict';
const assert=require('node:assert/strict');const C=require('../core/app-catalog');
const android='https://play.google.com/store/apps/details?id=vn.test.app';
const ios='https://apps.apple.com/vn/app/test/id123456';
assert.equal(C.storeUrl(android),android);assert.equal(C.storeUrl(ios),ios);
for(const url of ['javascript:alert(1)','https://evil.example/app','https://play.google.com.evil.example/store/apps/details?id=vn.test.app','https://play.google.com/store/apps/details?id=vn.test.app&redirect=evil','https://play.google.com/store/apps/details?id=vn.test.app#test','https://apps.apple.com/vn/app/test/id123456?next=evil','https://user:pass@play.google.com/store/apps/details?id=vn.test.app','https://play.google.com/store/apps/details?id=vn.test.app& id=evil'])assert.equal(C.storeUrl(url),'');
assert.equal(C.validate({name:'Test',android,group:'Thanh toán hóa đơn',bills:['Tiền điện','Tiền điện','Fake'],verified:true}).item.sourceState,'USER_ADDED_UNVERIFIED');
assert.deepEqual(C.validate({name:'Test',android,group:'Thanh toán hóa đơn',bills:['Tiền điện','Tiền điện','Fake']}).item.bills,['Tiền điện']);
assert.equal(C.validate({name:'Test',android:ios}).ok,false);assert.equal(C.validate({name:'Test'}).ok,false);assert.equal(C.validate({name:'',android}).ok,false);
assert.deepEqual(C.matchBilling('Thanh toán tiền điện và tiền nước'),['Tiền điện','Tiền nước']);assert.deepEqual(C.matchBilling('thanh toán hóa đơn'),[]);assert.equal(C.matchBilling('đổi GPLX'),null);
assert.deepEqual(C.matchBilling('đóng tiền học phí'),['Học phí']);
(async()=>{await assert.rejects(C.repository(null).list(),/không hỗ trợ/);await assert.rejects(C.repository(null).put({name:'bad'}),/liên kết/);console.log('PASS: app links, unverified state, billing classification and persistence failure.');})().catch(e=>{console.error(e);process.exitCode=1;});

assert.equal(C.matchBilling('thanh toán thuế'),null);
