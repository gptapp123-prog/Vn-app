'use strict';
const fs=require('node:fs'),path=require('node:path'),Module=require('node:module');
const setup=fs.readFileSync(path.join(__dirname,'ui-smoke.test.js'),'utf8').split("assert.ok(els.routeBody.innerHTML.includes('app-launcher'));")[0];
const cases=`
const X=require('../core/utility-context'),W=require('../core/water-routing'),Q=require('../core/question-router');
const catalogs={public:require('../core/public-services').SERVICES,life:require('../core/life-services').SERVICES,citizen:require('../core/citizen-services').SERVICES};
function search(q){els.searchInput.value=q;handlers['searchForm:submit']({preventDefault(){}});return els.routeBody.innerHTML;}
for(const q of ['đóng tiền nước nông thôn','DONG TIEN NUOC NONG THON','tôi muốn đóng tiền nước nông thôn ở đâu']){const c=X.parse(q,'water');assert.equal(c.intent,'payment');assert.equal(c.rural,true);assert.equal(c.query,'');const html=search(q);assert(html.includes('Bạn ở tỉnh/thành nào?'));assert(html.includes('trạm nước nông thôn'));assert(!html.includes('Đã thanh toán'));}
for(const place of ['Đồng Nai','Nhà Bè','Đồng Tháp','Trà Vinh'])assert.equal(X.parse('đóng tiền nước '+place,'water').query,X.normalize(place));
assert.equal(X.parse('tôi đã đóng tiền nước chưa','water').intent,'history');assert.equal(X.parse('báo sự cố mất nước','water').intent,'outage');
let html=search('đóng tiền nước nông thôn Bình Chánh TPHCM');assert(html.includes('data-water-provider="nongthon"')||html.includes('Cấp nước Nông Thôn'));assert(!html.includes('data-water-provider="sawaco"'));assert(!html.includes('value="dong tien'));
html=search('đóng tiền nước nông thôn Đồng Nai');assert(html.includes('0 đầu mối'));assert(!html.includes('data-open-water-app'));assert(!html.includes('data-water-provider="sawaco"'));
html=search('tôi đã đóng tiền nước Long An chưa');assert(html.includes('khoản đã đóng'));assert(html.includes('LAWACO'));assert(!html.includes('value="chua'));
html=search('đóng tiền điện Long An');assert(html.includes('ThanhToanTrucTuyen'));assert(html.includes('Thanh toán tiền điện'));html=search('lịch cúp điện Long An');assert(html.includes('LichNgungGiamCungCapDien'));
html=search('tôi đã đóng tiền điện Long An chưa');assert(html.includes('Kiểm tra hóa đơn và khoản đã đóng'));assert(!html.includes('Đã thanh toán'));
html=search('đóng tiền');assert(html.includes('Bạn muốn đóng khoản nào?'));assert(html.includes('data-confirm-query="thanh toan hoc phi"'));
handlers['document:click']({target:{closest(sel){return sel==='[data-confirm-query]'?{dataset:{confirmQuery:'thanh toan hoc phi'}}:null;}}});assert(els.routeBody.innerHTML.includes('trường hoặc đơn vị thu học phí'));
const examples=[
['căn cước lần đầu','identity-first'],['căn cước thất lạc','identity-lost'],['căn cước hết hạn','identity-exchange'],['xin việc cần giấy lý lịch tư pháp','criminal-record'],['giấy khai sinh sai ngày sinh','civil-change'],['thửa đất muốn chia ra','land-split'],['tranh chấp ranh đất cần hòa giải','land-mediate'],['muốn rút tiền bảo hiểm xã hội','social-lump'],['ho kinh doanh tam nghi','business-pause'],['ho kinh doanh nghi han','business-close'],['mat giay kinh doanh','business-replace'],['o tro can dang ky tam tru','temporary'],['xin giay xac nhan noi o','residence'],['bang lai that lac','lost-licence'],['bhxh dong duoc may nam','bhxh'],['tra ma so thue','taxcode'],['dong tien hoc phi','tuition'],['dong tien wifi','internet'],['tra cuoc dien thoai','postpaid'],['benh vien xem lai ket qua kham','health-record'],['thuoc bi thu hoi','drug-recall'],['thuoc duoc phep luu hanh','drug-registration'],['thuoc gia niem yet','drug-price'],['dai hoc chon truong','university-choice'],['dang ky thi tot nghiep thpt','exam-registration'],['don hang khong mua nua','cancel-order'],['don hang nguoi ban khong tra loi','shop-support'],['may da gui sua xong chua','repair-status'],['tu lanh dia chi trung tam bao hanh','service-center'],['ong nuoc bi vo','home-repair'],['o cam dien nha bi hong','home-repair']];
for(const [q,id] of examples){const r=Q.match(q,catalogs);assert(r.choices.some(c=>c.id===id),q+' → '+JSON.stringify(r));}
assert.equal(Q.match('không muốn đóng học phí',catalogs).status,'NONE');assert.equal(Q.match('mã khách hàng 123456789 đóng tiền nước',catalogs).status,'PRIVATE_INPUT');
html=search('ống nước bị vỡ');assert(html.includes('Thợ sửa điện, nước'));assert(!html.includes('waterRegion'));
html=search('đóng tiền nước và đóng học phí');assert(html.includes('Bạn muốn thanh toán loại hóa đơn nào trước?'));assert(html.includes('data-confirm-query=\"thanh toan hoc phi\"'));
html=search('nước nào xuất khẩu gạo');assert(!html.includes('waterRegion'));
console.log('PASS 3.27 question context: 31 new natural-language examples, rural/unknown utility coverage, provider/place preservation, history/outage/payment distinction, clickable billing clarification, sensitive/negative/multiple/unrelated requests.');
`;
const m=new Module(path.join(__dirname,'question-context-runtime.js'),module);m.filename=path.join(__dirname,'question-context-runtime.js');m.paths=module.paths;m._compile(setup+'\n'+cases,m.filename);
