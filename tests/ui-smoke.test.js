'use strict';
const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path');
const base=path.join(__dirname,'..');
const keys=['desktopNav','mobileNav','crumb','hero','searchInput','routeBody','suggestions','searchForm','actionStatus'];
const handlers={};const els={};
for(const id of keys)els[id]={innerHTML:'',value:'',textContent:'',style:{},addEventListener(type,fn){handlers[id+':'+type]=fn;}};
const context={scrollTo(){},document:{getElementById:id=>els[id],addEventListener(type,fn){handlers['document:'+type]=fn;}},setTimeout,clearTimeout,URL};
context.window=context;context.window.VN_ENGINE=require('../engine.js');
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(base,'data.js'),'utf8'),context,{filename:'data.js'});
for(const file of ['core/trust-registry.js','core/evidence.js','core/orchestrator.js','core/water-data.js','core/utility-context.js','core/water-routing.js','core/app-icons.js','core/app-catalog.js','core/citizen-services.js','core/app-launch.js','reference-data.js','core/reference-directory.js','core/direct-lookup.js','core/service-routing.js','core/admin-data.js','core/admin-conversion.js','admin-ui.js','core/identity-data.js','core/identity-prefix.js','core/lookup-keywords.js','lookup-ui.js','core/power-routing.js','power-ui.js','core/language-understanding.js','core/life-services.js','life-ui.js','core/public-services.js','public-ui.js','core/request-discovery.js','core/question-router.js','core/display-name.js','script.js'])vm.runInContext(fs.readFileSync(path.join(base,file),'utf8'),context,{filename:file});
assert.ok(els.routeBody.innerHTML.includes('app-launcher'));
assert.ok(els.desktopNav.innerHTML.includes('Việc cần làm'));
function search(q){els.searchInput.value=q;handlers['searchForm:submit']({preventDefault(){}});return els.routeBody.innerHTML;}
const directHtml=search('Tôi muốn đổi GPLX');const visiblePart=directHtml.split('<details class="sourcedetail">')[0];assert.ok(visiblePart.includes('dvc-gplx.csgt.bocongan.gov.vn/p/home/dvc-cap-doi-gplx.html'));assert.equal((visiblePart.match(/class="primary"/g)||[]).length,1);assert.ok(!visiblePart.includes('Mở VNeID'));assert.ok(!visiblePart.includes('Hướng dẫn thực hiện'));
assert.ok(search('Cho tôi biết biển số 62 là của tỉnh nào').includes('Ký hiệu biển số'));
assert.ok(search('Tổng đài điện lực là bao nhiêu').includes('Gọi 1558'));
assert.ok(search('BHYT và nộp thuế').includes('Bạn muốn thực hiện việc nào trước?'));
let html=search('đổi giấy phép lái xe');assert.ok(html.includes('Vào trang đổi GPLX'));assert.ok(html.includes('dvc-gplx.csgt.bocongan.gov.vn/p/home/dvc-cap-doi-gplx.html'));assert.ok(html.includes('SOURCE_CHECK_REQUIRED')===false);
html=search('thẻ BHYT còn hạn không');assert.ok(html.includes('Tra cứu thời hạn BHYT'));assert.ok(html.includes('baohiemxahoi.gov.vn/tracuu/'));
html=search('phạt nguội biển số 59A-123.45');assert.ok(html.includes('Tra cứu tại Cục CSGT'));assert.ok(!html.includes('59A-123.45'));
html=search('ngoài danh mục một vấn đề lạ lẫm');assert.ok(html.includes('Chưa có nguồn đủ chắc chắn'));
html=search('SOS, cấp cứu');assert.ok(html.includes('tel:113')&&html.includes('tel:114')&&html.includes('tel:115'));
html=search('lệ phí đổi GPLX bao nhiêu?');assert.ok(html.includes('SOURCE_CHECK_REQUIRED'));
assert.ok(!html.includes('ma_thu_tuc=372344'));
console.log('PASS: 8 kiểm thử tích hợp giao diện V3.');

html=search('thanh toán tiền nước');assert.ok(html.includes('Tiền nước'));assert.ok(html.includes('waterRegion'));assert.ok(!html.includes('Đã thanh toán'));
handlers['document:click']({target:{closest(selector){return selector==='[data-route]'?{dataset:{route:'apps'}}:null;}}});
assert.ok(els.routeBody.innerHTML.includes('+ Thêm ứng dụng'));assert.ok(els.routeBody.innerHTML.includes('Liên kết Google Play'));
console.log('PASS: billing search and add-app navigation UI.');
html=search('thanh toán tiền nước Long An');assert.ok(html.includes('LAWACO'));assert.ok(!html.includes('data-open-water-app='));
handlers['document:change']({target:{id:'waterProvider',value:'lawaco'}});
assert.ok(els.routeBody.innerHTML.includes('Đúng đơn vị ghi trên hóa đơn'));assert.ok(!els.routeBody.innerHTML.includes('data-open-water-app='));
handlers['document:change']({target:{id:'waterConfirmed',checked:true}});
assert.ok(els.routeBody.innerHTML.includes('Mở Payoo'));assert.ok(els.routeBody.innerHTML.includes('Thanh toán đúng đơn vị trên Payoo'));
els.waterLaunchStatus={textContent:''};
handlers['document:click']({target:{closest(selector){return selector==='[data-open-water-app]'?{dataset:{openWaterApp:'payoo'}}:null;}}});
assert.ok(els.waterLaunchStatus.textContent.includes('Bản web chưa có liên kết'));
html=search('thanh toán tiền nước Bình Dương');assert.ok(html.includes('BIWASE'));assert.ok(!html.includes('data-open-water-app='));
console.log('PASS: water provider confirmation UI, absent native launch and unknown rural coverage.');

html=search('biển số 62');assert.ok(html.includes('Tây Ninh'));assert.ok(html.includes('62, 70'));assert.ok(!html.includes('Long An</th>'));
html=search('biển số 80');assert.ok(html.includes('Biển số 80: Cục Cảnh sát giao thông'));assert.ok(!html.includes('<th scope="row">Tây Ninh'));
html=search('mã bưu chính 05127');assert.ok(html.includes('Dòng nguồn cần kiểm tra'));assert.ok(!html.includes('<strong>05127</strong>'));
html=search('mã bưu chính Tam Dương Bắc');assert.ok(html.includes('Mã nguồn không đủ chuẩn 5 số'));assert.ok(!html.includes('152213'));
html=search('mã bưu chính Bình Chánh TPHCM');assert.ok(html.includes('X. Bình Chánh'));assert.ok(html.includes('#page='));
html=search('danh bạ điện');assert.ok(html.includes('tel:1558'));assert.ok(!html.includes('tel:1900545454'));
handlers['document:click']({target:{closest(selector){return selector==='[data-route]'?{dataset:{route:'directory'}}:null;}}});
assert.ok(els.routeBody.innerHTML.includes('lookup-hub'));assert.ok(!els.routeBody.innerHTML.includes('referenceForm'));
handlers['document:click']({target:{closest(selector){return selector==='[data-reference-mode]'?{dataset:{referenceMode:'postal'}}:null;}}});
handlers['document:submit']({preventDefault(){},target:{id:'referenceForm',elements:{query:{value:'03127'},province:{value:'31'}}}});
assert.ok(els.routeBody.innerHTML.includes('Hải Phòng'));assert.ok(els.routeBody.innerHTML.includes('<strong>03127</strong>'));
console.log('PASS: directory navigation, mode tabs, submitted province filter, postal leading zero, direct sources, quarantine and EVN contact.');

html=search('Tôi muốn làm hộ chiếu');assert.ok(html.includes('Làm hộ chiếu'));assert.ok(html.includes('Cấp hộ chiếu phổ thông ở trong nước'));assert.ok(html.includes('Sao chép tên thủ tục'));assert.ok(!html.includes('Đã nộp hồ sơ'));
html=search('lệ phí hộ chiếu bao nhiêu');assert.ok(html.includes('Cần kiểm tra thông tin hiện hành tại nguồn'));assert.ok(!html.includes('200.000'));
html=search('đặt lịch khám');assert.ok(html.includes('Cần biết tên cơ sở khám'));assert.ok(!html.includes('dichvucongbyt.moh.gov.vn'));
html=search('nhà tôi mất điện');assert.ok(html.includes('tel:1558'));assert.ok(!html.includes('EVN CSKH</div>'));
html=search('mất nước');assert.ok(html.includes('đối chiếu tên đơn vị'));assert.ok(!html.includes('data-open-water-app'));
html=search('bản sao giấy khai sinh');assert.ok(html.includes('Bản sao trích lục hộ tịch'));assert.ok(html.includes('ma_thu_tuc=2.000635'));assert.ok(!html.includes('địa phương nào'));assert.ok(!html.includes('Có nhiều nhu cầu khớp'));
html=search('vừa sinh con');assert.ok(html.includes('Gia đình vừa có em bé'));assert.ok(html.includes('data-service="maternity"'));
handlers['document:click']({target:{closest(s){return s==='[data-service]'?{dataset:{service:'passport'}}:null;}}});
assert.ok(els.routeBody.innerHTML.includes('Danh sách tự kiểm tra'));
handlers['document:change']({target:{dataset:{checkService:'passport',checkIndex:'0'},checked:true}});
assert.ok(els.actionStatus.textContent.includes('Chưa xác nhận kết quả'));
handlers['document:click']({target:{closest(s){return s==='[data-open-app]'?{dataset:{openApp:'vneid'}}:null;}}});
assert.ok(els.actionStatus.textContent.includes('Bản web này chưa mở trực tiếp'));
handlers['document:click']({target:{closest(s){return s==='[data-route]'?{dataset:{route:'apps'}}:null;}}});
assert.ok(els.hero.style.display==='');assert.ok(els.routeBody.innerHTML.includes('appFilterForm'));assert.ok(els.routeBody.innerHTML.includes('data-open-app='));
handlers['document:submit']({preventDefault(){},target:{id:'appFilterForm',elements:{query:{value:'VNeID'},group:{value:'Tất cả'}}}});
assert.ok(els.routeBody.innerHTML.includes('VNeID'));assert.ok(!els.routeBody.innerHTML.includes('EVN CSKH</div>'));
handlers['document:click']({target:{closest(s){return s==='[data-route]'?{dataset:{route:'more'}}:null;}}});
assert.ok(els.routeBody.innerHTML.includes('Dùng chữ lớn'));assert.ok(els.mobileNav.innerHTML.includes('data-route="more"'));assert.equal((els.mobileNav.innerHTML.match(/data-route=/g)||[]).length,5);
html=search('Tiền nước và tiền điện');assert.ok(html.includes('EVN CSKH'));assert.ok(html.includes('waterRegion'));
handlers['document:change']({target:{id:'waterRegion',value:'tayninh'}});assert.ok(els.routeBody.innerHTML.includes('EVN CSKH'));
console.log('PASS: citizen handoff, evidence questions, medical routing, power/water contacts, scenarios, memory checklist, app search, 5 mobile tabs, mixed billing preserved.');

html=search('tra cứu phạt nguội');assert.ok(html.split('<details')[0].includes('https://csgt.bocongan.gov.vn/tra-cuu-phat-nguoi'));
html=search('tra cứu phạt nguội trên VNeTraffic');assert.ok(html.split('<details')[0].includes('data-open-app="vnetraffic"'));
html=search('xác nhận thông tin về cư trú');assert.ok(html.includes('ma-thu-tuc=26497'));assert.ok(!html.split('<details')[0].includes('matt=26360'));
html=search('làm hộ chiếu');assert.ok(html.includes('routeChoiceForm'));
handlers['document:submit']({preventDefault(){},target:{id:'routeChoiceForm',dataset:{serviceId:'passport'},elements:{choice:{value:'chip'}}}});assert.ok(els.routeBody.innerHTML.includes('matt=35620'));
html=search('cấp lại GPLX');assert.ok(html.includes('Chưa có đường dẫn cấp lại GPLX đã xác minh'));assert.ok(!html.split('<details')[0].includes('href="https://dichvucong.gov.vn/"'));
console.log('PASS: function routing, explicit app preference, residence distinction, passport choice and source gaps.');

// Regression: Vietnamese IME input must stay untouched until explicit submission.
const beforeComposition=els.routeBody.innerHTML;
els.searchInput.value='Tôi muốn đổi GPLX';
handlers['searchInput:compositionstart']();
handlers['searchForm:submit']({preventDefault(){}});
assert.equal(els.routeBody.innerHTML,beforeComposition);
assert.equal(els.searchInput.value,'Tôi muốn đổi GPLX');
handlers['searchInput:compositionend']();
handlers['searchForm:submit']({preventDefault(){}});
assert(els.routeBody.innerHTML.includes('dvc-cap-doi-gplx.html'));
assert.equal(els.searchInput.value,'Tôi muốn đổi GPLX');
const beforeImeEnter=els.routeBody.innerHTML;
els.searchInput.value='tiền nước';
handlers['searchInput:keydown']({key:'Enter',isComposing:true,keyCode:229});
handlers['searchForm:submit']({preventDefault(){}});
assert.equal(els.routeBody.innerHTML,beforeImeEnter);
assert.equal(handlers['searchInput:input'],undefined,'Typing must never schedule a search or rewrite text');
console.log('PASS 3.18: IME composition/Enter guard and preserving submitted Vietnamese text.');

handlers['searchInput:blur']();
const request='đăng ký khai sinh và đăng ký kết hôn có yếu tố nước ngoài';
html=search(request);assert(html.includes('data-public-topic="birth"'));assert.equal(els.searchInput.value,request);
handlers['document:click']({target:{closest(selector){return selector==='[data-public-topic]'?{dataset:{publicTopic:'birth'}}:null;}}});
assert(els.routeBody.innerHTML.includes('ma_thu_tuc=1.001193'));assert(!els.routeBody.innerHTML.includes('ma_thu_tuc=1611'));
handlers['document:submit']({preventDefault(){},target:{id:'publicFilterForm',elements:{query:{value:'không muốn nộp đảng phí, tôi cần giấy độc thân'}}}});
assert(els.routeBody.innerHTML.includes('Xác nhận tình trạng hôn nhân'));assert(!els.routeBody.innerHTML.includes('Mở iCPV TTHC'));
console.log('PASS submitted public search and result selection preserve case context and input.');

// Audit regressions: priority across domains, case status vs applying,
// mixed clauses, and payment apps in the launcher.
handlers['searchInput:blur']();
for(const q of ['cháy nhà mất điện','cấp cứu cần số điện lực','cấp cứu và tra mã bưu chính','báo cháy và tra tiền nước','cấp cứu và nộp đảng phí']){
 const h=search(q);assert(h.includes('tel:114')&&h.includes('tel:115'),q);assert(!h.includes('waterRegion'));assert(!h.includes('<h2>Mã bưu chính</h2>'));
}
for(const q of ['tôi đã nộp hồ sơ khai sinh chưa','hồ sơ kết hôn đang ở đâu','tôi đã đăng ký kết hôn chưa','theo dõi hồ sơ khai sinh']){
 const h=search(q);assert(h.includes('routeChoiceForm'),q);assert(h.includes('Hồ sơ được nộp trên hệ thống nào?'));assert(!h.includes('ma_thu_tuc=1.001193'));assert(!h.includes('ma_thu_tuc=1.000894'));
}
assert(search('tiến độ hồ sơ đảng viên').includes('dichvucong.dcs.vn/web/dvc/dich-vu-cong-cua-toi'));
for(const q of ['nộp đảng phí và BHYT','khai sinh và kiểm tra BHYT']){
 const h=search(q);assert(h.includes('data-query-part="0"')&&h.includes('data-query-part="1"'));assert.equal(els.searchInput.value,q);
 const before=h;handlers['document:click']({target:{closest(s){return s==='[data-query-part]'?{dataset:{queryPart:'999'}}:null;}}});assert.equal(els.routeBody.innerHTML,before);
 handlers['document:click']({target:{closest(s){return s==='[data-query-part]'?{dataset:{queryPart:'1'}}:null;}}});assert(els.routeBody.innerHTML.includes('VssID')||els.routeBody.innerHTML.includes('baohiemxahoi.gov.vn'));
}
assert(!search('đừng gọi 114, tôi cần tra tiền nước').includes('tel:114'));
handlers['document:click']({target:{closest(s){return s==='[data-route]'?{dataset:{route:'home'}}:null;}}});
assert.equal((els.routeBody.innerHTML.match(/class="app-tile"/g)||[]).length,20);assert(els.routeBody.innerHTML.includes('data-open-app="momo"'));assert(els.routeBody.innerHTML.includes('data-open-app="payoo"'));
handlers['document:click']({target:{closest(s){return s==='[data-app-detail]'?{dataset:{appDetail:'momo'}}:null;}}});assert(els.routeBody.innerHTML.includes('https://play.google.com/store/apps/details?id=com.mservice.momotransfer'));
console.log('PASS 3.24 audit regressions: emergency priority, case status, mixed-query choice, validated selection and 20 home apps.');

for(const q of ['tôi đã nộp đảng phí chưa','lịch sử nộp đảng phí']){const h=search(q);assert(h.includes('Nộp đảng phí')===false||h.includes('lịch sử'));assert(!h.includes('routeChoiceForm'));assert(h.includes('dichvucong.dcs.vn'));}
assert(!search('tôi đã nộp thuế chưa').includes('Hồ sơ được nộp trên hệ thống nào?'));
console.log('PASS Party-payment history and tax questions remain distinct from procedure case tracking.');

// Natural question routing must reach a reviewed destination, keep provider
// context, and leave the user's text untouched.
for(const [q,title] of [
 ['Bé nhà tôi mới chào đời, cần làm giấy gì?', 'Đăng ký khai sinh'],
 ['Tôi cần giấy chứng minh mình chưa kết hôn', 'Xác nhận tình trạng hôn nhân'],
 ['Bản photo của tôi cần đóng dấu ở đâu?', 'Chứng thực bản sao'],
 ['Ông tôi qua đời thì làm giấy gì?', 'Đăng ký khai tử'],
 ['Tôi bị cho nghỉ, muốn tìm tiền hỗ trợ thất nghiệp', 'Trợ cấp thất nghiệp'],
 ['Tôi bán hàng tại nhà, đăng ký thủ tục ở đâu?', 'Đăng ký hộ kinh doanh'],
 ['Tôi là đảng viên, chuyển chỗ làm thì đổi nơi sinh hoạt thế nào?', 'Chuyển sinh hoạt Đảng']
 ]){const h=search(q);assert(h.includes(title),q);assert(h.includes('href="https:')||h.includes('data-open-app='),q);assert.equal(els.searchInput.value,q);}
let natural=search('Máy giặt LG nhà tôi không vắt được, liên hệ ở đâu?');assert(natural.includes('LG'));assert(natural.includes('href="https:'));assert(!natural.includes('lifeProviderForm'));
natural=search('Tôi muốn lấy số đăng ký trước tại bệnh viện Chợ Rẫy');assert(natural.includes('Chợ Rẫy'));assert(natural.includes('href="https:'));assert(!natural.includes('lifeProviderForm'));
natural=search('App nào xem giờ học của con tôi?');assert(natural.includes('Thời khóa biểu'));assert(natural.includes('vnEdu'));
natural=search('Gói hàng tôi chờ bao giờ tới?');assert(natural.includes('Theo dõi đơn mua hàng'));assert(natural.includes('lifeProviderForm'));
natural=search('Bé mới chào đời cần giấy gì và máy giặt LG không vắt');assert(natural.includes('data-query-part="0"')&&natural.includes('data-query-part="1"'));
handlers['document:click']({target:{closest(s){return s==='[data-query-part]'?{dataset:{queryPart:'1'}}:null;}}});assert(els.routeBody.innerHTML.includes('LG'));
const QR=require('../core/question-router'),catalogs={public:require('../core/public-services').SERVICES,life:require('../core/life-services').SERVICES,citizen:require('../core/citizen-services').SERVICES};
assert.equal(QR.ruleCount,71);assert.equal(QR.match('Tôi muốn đầu tư cổ phiếu',catalogs).status,'NONE');assert.equal(QR.match('Tôi đau ngực, cần thuốc nào?',catalogs).status,'NONE');assert.equal(QR.match('Máy giặt không vắt, số điện thoại 0901234567',catalogs).status,'PRIVATE_INPUT');assert.equal(QR.match('Bé mới chào đời làm giấy gì',{}).status,'NONE');assert.equal(QR.match('Đừng đăng ký khai sinh, tôi muốn đổi bằng lái',catalogs).status,'NONE');
assert.equal(QR.match('Máy tính bảng không lên nguồn',catalogs).choices[0].id,'repair-phone');
console.log('PASS 3.25 natural questions: reviewed handoffs, provider context, multiple needs, unchanged input, privacy and unknown-source refusal.');
