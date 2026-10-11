/* Citizen-oriented public routing, not legal eligibility or a case-status API. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.VN_CITIZEN=api;})(typeof window!=='undefined'?window:globalThis,function(){
'use strict';
const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const contains=(q,p)=>(' '+q+' ').includes(' '+normalize(p)+' ');
const GROUPS=Object.freeze(['Giấy tờ & gia đình','Nơi ở & cư trú','Điện, nước & hóa đơn','Sức khỏe & bảo hiểm','Xe & đi lại','Thuế & kinh doanh','Học tập & đời sống','Hỗ trợ & khẩn cấp']);
const SOURCES=Object.freeze({
 dvc:{url:'https://dichvucong.gov.vn/',publisher:'Cổng Dịch vụ công Quốc gia',level:'portal',reviewedAt:'2026-10-11'},
 police:{url:'https://dichvucong.bocongan.gov.vn/',publisher:'Bộ Công an',level:'portal',reviewedAt:'2026-10-11',evidence:'https://dichvucong.bocongan.gov.vn/bocongan/bothutuc/listThuTuc?muc_do=MUC_DO_4&page=1&per_page=20'},
 social:{url:'https://baohiemxahoi.gov.vn/dich-vu-cong/Pages/default.aspx',publisher:'Bảo hiểm xã hội Việt Nam',level:'directory',reviewedAt:'2026-10-11'},
 bhxh:{url:'https://baohiemxahoi.gov.vn/',publisher:'Bảo hiểm xã hội Việt Nam',level:'portal',reviewedAt:'2026-10-11'},
 tax:{url:'https://thuedientu.gdt.gov.vn/',publisher:'Cơ quan Thuế',level:'portal',reviewedAt:'2026-10-11'},
 education:{url:'https://moet.gov.vn/',publisher:'Bộ Giáo dục và Đào tạo',level:'portal',reviewedAt:'2026-10-11'},
 hcm:{url:'https://hochiminhcity.gov.vn/',publisher:'Chính quyền TP.HCM',level:'portal',reviewedAt:'2026-10-11'},
 child:{url:'https://tiengchuong.chinhphu.vn/khai-truong-tong-dai-quoc-gia-bao-ve-tre-em-11320902.htm',publisher:'Cổng TTĐT Chính phủ',level:'publication',reviewedAt:'2026-10-11'},
 emergency:{url:'https://xaydungchinhsach.chinhphu.vn/nhung-dieu-can-biet-ve-tong-dai-112-so-dien-thoai-tiep-nhan-thong-tin-va-noi-dung-thong-tin-ve-su-co-tham-hoa-119250714134442873.htm',publisher:'Cổng TTĐT Chính phủ',level:'publication',reviewedAt:'2026-10-11'}
});
// id, title, group index, kind, route/query, source key, app ids, phrases
const rows=[
 ['birth','Làm giấy khai sinh',0,'portal','Đăng ký khai sinh','dvc','vneid','khai sinh|giay khai sinh|lam khai sinh'],
 ['marriage','Đăng ký kết hôn',0,'portal','Đăng ký kết hôn','dvc','vneid','ket hon|dang ky ket hon'],
 ['civil-copy','Xin bản sao giấy tờ hộ tịch',0,'portal','Cấp bản sao trích lục hộ tịch','dvc','vneid','trich luc ho tich|ban sao giay khai sinh'],
 ['identity','Cấp lại căn cước bị mất',0,'portal','Cấp lại thẻ căn cước','police','vneid','mat can cuoc|mat cccd|cap lai can cuoc'],
 ['passport','Làm hộ chiếu',0,'portal','Cấp hộ chiếu phổ thông ở trong nước','police','vneid','ho chieu|passport'],
 ['eidentity','Mở VNeID & giấy tờ điện tử',0,'app','vneid','police','vneid','mo vneid|dinh danh dien tu'],
 ['temporary','Đăng ký tạm trú',1,'engine','đăng ký tạm trú','police','vneid','tam tru|dang ky tam tru'],
 ['permanent','Đăng ký thường trú',1,'engine','đăng ký thường trú','police','vneid','thuong tru|ho khau'],
 ['residence','Xác nhận thông tin cư trú',1,'engine','xác nhận cư trú','police','vneid','xac nhan thong tin ve cu tru|xac nhan thong tin cu tru|xac nhan cu tru|giay cu tru'],
 ['stay','Thông báo lưu trú',1,'engine','thông báo lưu trú','police','vneid','luu tru|thong bao luu tru'],
 ['electric','Thanh toán tiền điện',2,'billing','Tiền điện','','evncskh','tien dien|hoa don dien'],
 ['water','Thanh toán tiền nước',2,'billing','Tiền nước','','','tien nuoc|hoa don nuoc'],
 ['internet','Thanh toán Internet / truyền hình',2,'billing','Internet / truyền hình','','','cuoc internet|thanh toan internet|cuoc truyen hinh'],
 ['postpaid','Thanh toán điện thoại trả sau',2,'billing','Điện thoại trả sau','','','dien thoai tra sau|cuoc dien thoai'],
 ['outage','Mất điện / báo sự cố điện',2,'contacts','điện','','','mat dien|bao su co dien|dien bi cat'],
 ['water-help','Tìm đơn vị cấp nước / báo mất nước',2,'contacts','nước','','','mat nuoc|nuoc bi cat|don vi cap nuoc|khong biet don vi nuoc'],
 ['bhyt','Kiểm tra thẻ BHYT',3,'engine','thẻ BHYT còn hạn không','bhxh','vssid','the bhyt|bao hiem y te'],
 ['bhxh','Xem quá trình đóng BHXH',3,'engine','quá trình bảo hiểm xã hội','bhxh','vssid','qua trinh bhxh|dong bhxh'],
 ['maternity','Tìm thủ tục chế độ thai sản',3,'portal','Giải quyết hưởng chế độ thai sản','social','vssid','che do thai san|tro cap thai san'],
 ['pension','Tìm thủ tục hưởng lương hưu',3,'portal','Giải quyết hưởng lương hưu','social','vssid','luong huu|nghi huu'],
 ['medical','Khám bệnh / đặt lịch khám',3,'needs-provider','','bhxh','','dat lich kham|kham benh|tim benh vien'],
 ['fines','Tra cứu phạt nguội',4,'engine','phạt nguội','police','vnetraffic','phat nguoi|loi xe'],
 ['licence','Đổi bằng lái xe',4,'engine','đổi giấy phép lái xe','dvc','vneid','doi bang lai|doi gplx'],
 ['lost-licence','Cấp lại bằng lái bị mất',4,'engine','cấp lại giấy phép lái xe','dvc','vneid','mat bang lai|cap lai gplx'],
 ['register-car','Đăng ký xe lần đầu',4,'portal','Đăng ký xe lần đầu','police','vneid','dang ky xe|mua xe moi'],
 ['plate','Tra ký hiệu biển số',4,'reference','biển số','','','ky hieu bien so|dau bien so'],
 ['tax','Nộp thuế cá nhân',5,'engine','nộp thuế','tax','etax','nop thue|dong thue'],
 ['taxcode','Tra cứu thông tin thuế',5,'engine','mã số thuế','tax','etax','ma so thue|thong tin thue'],
 ['business','Đăng ký hộ kinh doanh',5,'portal','Đăng ký hộ kinh doanh','dvc','etax','ho kinh doanh|mo quan|dang ky kinh doanh'],
 ['school','Tìm thông tin tuyển sinh',6,'engine','tuyển sinh','education','','tuyen sinh|nhap hoc'],
 ['tuition','Thanh toán học phí',6,'billing','Học phí','','','hoc phi'],
 ['postal','Tra mã bưu chính phường/xã',6,'reference','mã bưu chính','','','ma buu chinh|ma buu dien|zip code'],
 ['old-new','Đối chiếu tên tỉnh cũ–mới',6,'reference','tỉnh cũ mới','','','tinh cu moi|tinh sap nhap'],
 ['postoffice','Tìm hỗ trợ bưu điện / bưu cục',6,'contacts','bưu chính','','','buu cuc|buu dien|chuyen phat'],
 ['case','Kiểm tra hồ sơ dịch vụ công',7,'portal','Tra cứu hồ sơ','dvc','vneid','ho so dich vu cong|tien do ho so'],
 ['feedback','Phản ánh với chính quyền TP.HCM',7,'engine','phản ánh TPHCM','hcm','congdanso','phan anh tphcm|phan anh ho chi minh'],
 ['emergency','Khẩn cấp: công an, cháy, cấp cứu',7,'emergency','','emergency','help114','khan cap|cap cuu|bao chay|cuu ho|sos'],
 ['child-help','Bảo vệ trẻ em · gọi 111',7,'call','111','child','','bao ve tre em|tre bi bao hanh|tre em bi xam hai'],
 ['disaster','Sự cố, thiên tai · gọi 112',7,'call','112','emergency','','thien tai|tham hoa|lu lut']
];
const SERVICES=Object.freeze(rows.map(([id,title,index,kind,target,sourceId,apps,terms])=>Object.freeze({id,title,group:GROUPS[index],kind,target,sourceId,appIds:Object.freeze(apps?apps.split(','):[]),terms:Object.freeze(terms.split('|')),reviewedAt:'2026-10-11',evidenceScope:kind==='portal'?'SOURCE_ROUTING_ONLY':'HANDOFF_ONLY'})));
const SCENARIOS=Object.freeze([
 {id:'newborn',title:'Gia đình vừa có em bé',terms:['vua sinh con','vua co em be'],serviceIds:['birth','bhyt','maternity']},
 {id:'move',title:'Chuyển nơi ở',terms:['chuyen noi o','chuyen nha'],serviceIds:['temporary','permanent','residence','water','electric','postal']},
 {id:'lost',title:'Mất giấy tờ',terms:['mat giay to'],serviceIds:['identity','lost-licence','civil-copy']},
 {id:'vehicle',title:'Mua xe',terms:['mua xe'],serviceIds:['register-car','tax','plate','fines']},
 {id:'retire',title:'Chuẩn bị nghỉ hưu',terms:['chuan bi nghi huu'],serviceIds:['bhxh','pension','bhyt']},
 {id:'shop',title:'Mở hộ kinh doanh',terms:['mo ho kinh doanh'],serviceIds:['business','taxcode','tax']},
 {id:'support',title:'Cần trợ giúp khẩn cấp',terms:['can tro giup khan cap'],serviceIds:['emergency','child-help','disaster']}
].map(x=>Object.freeze({...x,serviceIds:Object.freeze(x.serviceIds),terms:Object.freeze(x.terms)})));
function find(query='',group='Tất cả'){const terms=normalize(query).split(' ').filter(Boolean);return SERVICES.filter(s=>(group==='Tất cả'||s.group===group)&&terms.every(t=>normalize([s.title,s.group,...s.terms].join(' ')).split(' ').includes(t)));}
function match(query){const q=normalize(query);if(!q)return {status:'EMPTY',services:[],scenarios:[]};const scenarios=SCENARIOS.filter(s=>s.terms.some(t=>contains(q,t)));if(scenarios.length)return {status:'SCENARIO',services:[],scenarios};const ranked=SERVICES.map(s=>({s,score:Math.max(0,...s.terms.filter(t=>contains(q,t)).map(t=>normalize(t).split(' ').length*10))})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score);return {status:ranked.length>1?'CHOOSE':ranked.length?'MATCH':'NO_MATCH',services:(/\bva\b/.test(q)?ranked:ranked.filter(x=>x.score===ranked[0]?.score)).map(x=>x.s).slice(0,8),scenarios:[]};}
const urls=new Set(Object.values(SOURCES).flatMap(s=>[s.url,s.evidence]).filter(Boolean));
function validUrl(value){try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password&&urls.has(value);}catch{return false;}}
function checklist(serviceId){const s=SERVICES.find(x=>x.id===serviceId);if(!s)return [];return s.kind==='portal'||s.kind==='engine'?['Xác định đúng việc cần làm và địa phương áp dụng','Đọc thủ tục, giấy tờ và khoản phí trên hệ thống chính thức','Thực hiện và giữ phiếu tiếp nhận tại hệ thống đích']:['Chọn đúng đơn vị hoặc ứng dụng xử lý','Đối chiếu thông tin tại ứng dụng / kênh chính thức','Tự kiểm tra kết quả tại dịch vụ đã sử dụng'];}
function repository(idb){
 const allowed=new Set(SERVICES.map(s=>s.id));
 function open(){return new Promise((resolve,reject)=>{if(!idb)return reject(Error('Thiết bị chưa hỗ trợ lưu mục đã ghim.'));const req=idb.open('vn-app-citizen-pins',1);req.onupgradeneeded=()=>req.result.createObjectStore('pins',{keyPath:'id'});req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error||Error('Không mở được mục đã ghim.'));req.onblocked=()=>reject(Error('Đóng tab VN App cũ rồi thử lại.'));});}
 async function run(mode,action){const db=await open();return new Promise((resolve,reject)=>{let value;const tx=db.transaction('pins',mode);const req=action(tx.objectStore('pins'));req.onsuccess=()=>{value=req.result};tx.oncomplete=()=>{db.close();resolve(value)};tx.onabort=tx.onerror=()=>{db.close();reject(tx.error||Error('Không lưu được mục đã ghim.'))};});}
 return {async list(){const rows=await run('readonly',s=>s.getAll());return rows.filter(r=>r&&allowed.has(r.id)).map(r=>r.id)},async set(id,pinned){if(!allowed.has(id))throw Error('Mục không thuộc danh mục công khai.');await run('readwrite',s=>pinned?s.put({id,schemaVersion:1}):s.delete(id));return id;}};
}
return Object.freeze({GROUPS,SERVICES,SCENARIOS,SOURCES,normalize,find,match,validUrl,checklist,repository});
});
