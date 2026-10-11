const assert=require('node:assert/strict'),E=require('../engine'),U=require('../core/citizen-services'),C=require('../core/personal-contacts');
for(const q of ['không đổi GPLX, tôi muốn cấp lại bằng lái bị mất','không muốn đổi GPLX, tôi cần cấp lại GPLX','đừng đổi bằng lái, tôi muốn cấp lại GPLX']){
 assert.equal(U.match(q).services[0].id,'lost-licence');
 assert.ok(!E.process(q).results.some(x=>x.id==='doigplx'));
}
assert.equal(U.match('không muốn đổi GPLX').services.length,0);
assert.match(E.focusQuery('làm hộ chiếu không gắn chip'),/khong gan chip/);
const row={name:'Nguyễn Văn A',position:'Trưởng phòng',phone:'0901 234 567',organization:'Đơn vị A'};
assert.equal(C.unique([row,row],[]).length,1);
assert.equal(C.unique([{...row,phone:'0901234567'}],[row]).length,0);
assert.equal(C.unique([{...row,organization:'Đơn vị B'}],[row]).length,1);
assert.throws(()=>C.parse('null'),/không đúng mẫu/);
const A=require('../core/app-catalog');
assert.equal(A.parseBackup(JSON.stringify({schema:'vn-app-apps/1',apps:[{name:'App thử',group:'Khác',android:'https://play.google.com/store/apps/details?id=vn.example.app',ios:'',bills:[]}]})).length,1);
assert.throws(()=>A.parseBackup('null'));
assert.throws(()=>A.parseBackup(JSON.stringify({schema:'vn-app-apps/1',apps:[{name:'Lạ',android:'https://evil.example/app',ios:''}]})));
console.log('PASS repaired routing: denied actions, positive intent, semantic negation and duplicate imports.');
