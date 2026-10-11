'use strict';
const assert=require('node:assert/strict');
const E=require('../engine.js');
let success=0;
function expectIntent(input,expected){const r=E.process(input);assert.ok(r.results.some(x=>x.id===expected),`“${input}” → ${JSON.stringify(r.results.map(x=>x.id))}, thiếu ${expected}`);success++;}
function expectStatus(input,expected){const r=E.process(input);assert.equal(r.status,expected,JSON.stringify(r));success++;}
const positives=[
 ['phạt nguội','phatnguoi'], ['xe bị phạt nguội?','phatnguoi'], ['tra cứu phương tiện vi phạm','phatnguoi'],
 ['đổi GPLX','doigplx'],['bằng lái hết hạn muốn đổi','doigplx'],['Tôi muốn đổi giấy phép lái xe','doigplx'],
 ['mất bằng lái rồi','caplaigplx'],['cấp lại giấy phép lái xe','caplaigplx'], ['kiểm tra GPLX','gplx'],
 ['thông báo lưu trú','luutru'], ['khách sạn báo lưu trú','luutru'],
 ['đăng ký tạm trú','tamtru'], ['tôi muốn làm tạm trú','tamtru'], ['tra cứu hộ khẩu','thuongtru'],
 ['tài khoản VNeID','vneid'], ['làm căn cước','vneid'],
 ['thẻ BHYT còn hạn','bhytvalid'],['kiểm tra thẻ BHYT','bhytvalid'], ['bảo hiểm y tế còn hạn không','bhytvalid'],
 ['tôi cần xem BHXH','bhxh'], ['sổ VssID','bhxh'],
 ['thủ tục y tế','medical'],['giấy phép hành nghề y','medical'],
 ['mã số thuế','masothue'],['tra mã số thuế','masothue'],
 ['nộp thuế','nopthue'],['eTax','nopthue'], ['thuế thu nhập','nopthue'],
 ['tra cứu hồ sơ','ho so'], ['hồ sơ đang xử lý','ho so'],
 ['giấy phép xây dựng','giayphep'], ['tuyển sinh','hocsinh'], ['học sinh lớp 1','hocsinh'],
 ['nghĩa vụ quân sự','nghiavu'],['NVQS','nghiavu'],
 ['phản ánh TPHCM','congdanso'],['Công dân số','congdanso'],
 ['sổ tay đảng viên','dangvien'], ['sinh hoạt chi bộ','dangvien'],
 ['cháy nhà 114','khan'],['cần cấp cứu 115','khan'], ['ứng dụng SOS','khan'],
];
for(const [input,id] of positives)expectIntent(input,id);
assert.deepEqual(E.process('tra cứu thuế và BHYT').results.map(x=>x.id).sort(),['bhxh','nopthue']);success++;
for(const input of ['BHYT số 0123456789','phạt nguội xe 59A-123.45','vneid số căn cước 012345678901','liên hệ toi@gmail.com về eTax']){
 const x=E.process(input);assert.equal(x.sensitive,true,input);assert.ok(!JSON.stringify(x).includes('0123456789'),input);success++;
}
expectStatus('','EMPTY');expectStatus('một chủ đề hoàn toàn xa lạ','NO_VERIFIED_ROUTE');expectStatus('012345678901','PRIVATE_INPUT');
assert.equal(E.validUrl('https://evil-example.com/'),false);success++;
assert.equal(E.validUrl('http://dichvucong.gov.vn/'),false);success++;
assert.equal(E.validUrl('https://dichvucong.gov.vn.evil.com/'),false);success++;
assert.equal(E.validUrl('https://dichvucong.gov.vn@evil.com/'),false);success++;
assert.deepEqual(E.selfCheck().invalidLinks,[]);success++;
for(const x of ['localStorage','sessionStorage','fetch(','XMLHttpRequest','navigator.sendBeacon','console.log'])assert.ok(!require('fs').readFileSync(require.resolve('../engine.js'),'utf8').includes(x),x);
success++;
console.log('PASS:',success,'kiểm tra; bộ xử lý có',E.selfCheck().intents,'intent.');
