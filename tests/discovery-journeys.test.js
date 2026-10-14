'use strict';
const fs=require('node:fs'),path=require('node:path'),Module=require('node:module');
const setup=fs.readFileSync(path.join(__dirname,'ui-smoke.test.js'),'utf8').split("assert.ok(els.routeBody.innerHTML.includes('app-launcher'));")[0];
const cases=`
const Discovery=require('../core/request-discovery'),catalogs={public:require('../core/public-services').SERVICES,life:require('../core/life-services').SERVICES,citizen:require('../core/citizen-services').SERVICES};
let lastQuery='';function search(q){lastQuery=q;els.searchInput.value=q;handlers['searchForm:submit']({preventDefault(){}});return els.routeBody.innerHTML;}
function select(id){const choices=Discovery.discover(lastQuery,catalogs).choices,index=choices.findIndex(x=>x.id===id);assert(index>=0,id);handlers['document:click']({target:{closest(s){return s==='[data-question-choice]'?{dataset:{questionChoice:String(index)}}:null;}}});return els.routeBody.innerHTML;}
let html=search('bảo hiểm');assert(html.includes('Bạn cần kiểm tra hay làm việc gì về bảo hiểm?'));assert(!html.includes('class="primary"'));html=select('social-lump');assert(html.includes('BHXH một lần'));assert(html.includes('href="https://'));
html=search('tôi cần giấy để đi làm');assert(html.includes('Bạn cần loại giấy nào?'));html=select('criminal-record');assert(html.includes('lý lịch tư pháp'));assert(html.includes('href="https://'));
html=search('rút bảo hiểm');assert(html.includes('data-question-choice'));assert(!html.includes('class="primary"'));html=select('social-lump');assert(html.includes('BHXH một lần'));assert.equal(els.searchInput.value,'rút bảo hiểm');
html=search('máy lạnh sửa');assert(html.includes('Sửa điều hòa, máy lạnh'));assert(!html.includes('Tìm và mua sản phẩm'));html=select('repair-aircon');assert(html.includes('lifeProviderForm'));
html=search('ngoài danh mục một vấn đề lạ lẫm');assert(html.includes('questionRefineForm'));assert(html.includes('Chưa có nguồn đủ chắc chắn'));assert(!html.includes('data-question-choice'));assert(!html.includes('thuốc không kê đơn'));
html=search('rút tiền');assert(html.includes('questionRefineForm'));handlers['document:submit']({preventDefault(){},target:{id:'questionRefineForm',elements:{detail:{value:'BHXH một lần'}}}});assert(els.routeBody.innerHTML.includes('BHXH một lần'));assert.equal(els.searchInput.value,'rút tiền');
html=search('đóng phí');assert(html.includes('Bạn muốn đóng khoản nào?'));html=select('water');assert(html.includes('waterRegion'));assert(!html.includes('value="phi'));
html=search('đóng tiền nước LAWACO');assert(html.includes('Đúng đơn vị ghi trên hóa đơn'));assert(!html.includes('data-open-water-app'));handlers['document:change']({target:{id:'waterConfirmed',checked:true}});assert(els.routeBody.innerHTML.includes('Thanh toán đúng đơn vị trên Payoo'));assert.equal((els.routeBody.innerHTML.match(/class="primary"/g)||[]).length,1);
html=search('đóng tiền nước LAWACO Đồng Nai');assert(!html.includes('Đúng đơn vị ghi trên hóa đơn'));assert(!html.includes('data-open-water-app'));
for(const q of ['không muốn sửa máy','ngoài danh mục một vấn đề lạ lẫm','thuốc nào chữa đau đầu','https://evil.test/thuoc-gia'])assert.equal(Discovery.discover(q,catalogs).choices.length,0,q);
assert.equal(Discovery.discover('mã khách hàng PE12345678 đóng phí',catalogs).status,'PRIVATE_INPUT');
html=search('rút tiền');handlers['document:submit']({preventDefault(){},target:{id:'questionRefineForm',elements:{detail:{value:'mã khách hàng PE12345678'}}}});assert(!els.routeBody.innerHTML.includes('PE12345678'));assert(!els.searchInput.value.includes('PE12345678'));
html=search('học phí');assert(html.includes('đóng học phí hay tìm chính sách'));assert(!html.includes('class=\"primary\"'));html=select('tuition');assert(html.includes('trường hoặc đơn vị thu học phí'));
html=search('thuốc');assert(html.includes('tra thông tin nào về thuốc'));assert(html.includes('questionRefineForm'));
html=search('khai sinh có yếu tố nước ngoài');assert(html.includes('nước ngoài'));assert(!html.includes('questionRefineForm'));
html=search('máy giặt LG không vắt');assert(html.includes('LG'));assert(!html.includes('questionRefineForm'));
console.log('PASS 3.28 user journeys: broad task clarification, catalog confirmation, follow-up keeps original input, exact known supplier, region conflict, single primary payment destination, private/negative/medical/unknown/URL guards and existing direct paths.');
`;
const m=new Module(path.join(__dirname,'discovery-journeys-runtime.js'),module);m.filename=path.join(__dirname,'discovery-journeys-runtime.js');m.paths=module.paths;m._compile(setup+'\n'+cases,m.filename);
