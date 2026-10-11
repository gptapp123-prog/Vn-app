const assert=require('node:assert/strict');const Q=require('../core/direct-lookup.js'),R=require('../core/reference-directory.js');
let r=Q.reference('Cho tôi biết biển số 62 là của tỉnh nào',R);assert.equal(r.total,1);assert.match(r.answer,/Tây Ninh/);
r=Q.reference('Tôi muốn biết mã bưu chính xã Bình Chánh TPHCM là bao nhiêu',R);assert.equal(r.total,1);assert.match(r.rows[0].name,/Bình Chánh/);assert.match(r.answer,/\d{5}/);
r=Q.reference('Tôi muốn biết mã bưu chính TPHCM',R);assert.ok(r.total>1);assert.match(r.answer,/xã\/phường/);
r=Q.reference('Tổng đài điện lực là bao nhiêu',R);assert.equal(r.total,1);assert.match(r.answer,/1558/);
r=Q.reference('Long An nay thuộc tỉnh nào sau sáp nhập',R);assert.equal(r.total,1);assert.match(r.answer,/Tây Ninh/);
assert.equal(Q.reference('phạt nguội biển số',R),null);assert.equal(Q.clean('La Gi'),'la gi');assert.equal(Q.clean('Cửa Nam'),'cua nam');
assert.equal(Q.reference('biển số 80',R).answer,'Biển số 80: Cục Cảnh sát giao thông.');assert.equal(Q.reference('mã bưu chính 05127',R).total,0);
console.log('PASS direct lookup: natural questions, direct postal/contact/plate/admin results, ambiguity preserved, proper names retained, rejected data excluded.');
