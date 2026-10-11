/* VN App V2 — bộ phân loại nhu cầu và điều hướng xác định, không có API cá nhân.
 * Thuần JS; không gửi yêu cầu mạng, không log/lưu truy vấn. Node: require('./engine.js')
 */
(function(root,factory){
  const engine=factory();
  if(typeof module==='object'&&module.exports)module.exports=engine;
  if(root)root.VN_ENGINE=engine;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const VERIFIED='11/10/2026';
const APPROVED_HOSTS=new Set([
  'csgt.bocongan.gov.vn','dvc-gplx.csgt.bocongan.gov.vn','www.csgt.vn','csgt.vn','dichvucong.gov.vn','dichvucong.bocongan.gov.vn',
  'baohiemxahoi.gov.vn','dichvucongbyt.moh.gov.vn','thuedientu.gdt.gov.vn',
  'moet.gov.vn','mod.gov.vn','bocongan.gov.vn','www.bocongan.gov.vn',
  'chinhphu.vn','dangcongsan.vn','hochiminhcity.gov.vn','vbpl.vn',
  'universal.vneid.gov.vn','dxcenter.hochiminhcity.gov.vn',
  'play.google.com','apps.apple.com','pccc-congan.hochiminhcity.gov.vn'
]);
const URLS=Object.freeze({
  csgt:'https://csgt.bocongan.gov.vn/tra-cuu-phat-nguoi',
  dvc:'https://dichvucong.gov.vn/',
  police:'https://dichvucong.bocongan.gov.vn/',
  bhxh:'https://baohiemxahoi.gov.vn/',
  bhyt:'https://baohiemxahoi.gov.vn/tracuu/pages/tra-cuu-thoi-han-su-dung-the-bhyt.aspx',
  gplx:'https://dvc-gplx.csgt.bocongan.gov.vn/p/home/dvc-cap-doi-gplx.html',
  luutru:'https://dichvucong.gov.vn/p/home/dvc-tthc-thu-tuc-hanh-chinh-chi-tiet.html?ma_thu_tuc=3931',
  tax:'https://thuedientu.gdt.gov.vn/',
  health:'https://dichvucongbyt.moh.gov.vn/',
  education:'https://moet.gov.vn/',
  defense:'https://mod.gov.vn/',
  hcm:'https://hochiminhcity.gov.vn/',
  law:'https://vbpl.vn/',
  party:'https://dangcongsan.vn/',
  vneid:'https://universal.vneid.gov.vn/'
});
const STOP=new Set('toi minh em anh chi muon can ho tro xem tra cuu cho toi lam sao nhu the nao o dau tren web ung dung app tim kiem giup xem thong tin ve cua da duoc la voi ngay bay gio hien tai'.split(' '));
const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase().replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();
const contains=(s,phrase)=>(' '+s+' ').includes(' '+normalize(phrase)+' ');
// Với biển số, số định danh, email, điện thoại: xóa khỏi chuỗi xử lý và khỏi UI trả lời.
const SENSITIVE_PATTERNS=[
  /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
  /(?:^|\D)(?:\+?84|0)(?:[ .-]?\d){9}(?!\d)/g,
  /\b\d{12}\b/g,
  /\b\d{10,11}\b/g,
  /\b\d{2}[A-Za-z]{1,2}\s*[-.]?\s*\d{3}[ .-]?\d{2,3}\b/g
];
function sanitize(raw){
  const initial=String(raw??'').slice(0,250);let query=initial;
  for(const regex of SENSITIVE_PATTERNS)query=query.replace(regex,' [thông tin riêng] ');
  const sensitive=query!==initial;
  query=query.replace(/\[thông tin riêng\]/g,' ').replace(/\s+/g,' ').trim().slice(0,150);
  return {query,sensitive};
}
const act=(title,url,direct=true)=>({title,url,direct});
// Mỗi quy tắc trả thông điệp cố định + bằng chứng đích đã đối chiếu, không tự bịa câu trả lời pháp luật.
const INTENTS=[
 {id:'phatnguoi',task:'phatnguoi',name:'Tra cứu phạt nguội',patterns:['phat nguoi','vi pham qua hinh anh','phuong tien vi pham','kiem tra loi xe','loi bien so'],hints:['xe','giao thong','bien so'],exclude:['nop thue','bao hiem'],type:'AUTH_OR_CAPTCHA',answer:'Cục Cảnh sát giao thông cung cấp mục tra cứu phương tiện vi phạm qua hình ảnh. Kết quả vi phạm được hệ thống CSGT trả trực tiếp sau khi bạn nhập thông tin ở đó.',steps:['Mở website Cục Cảnh sát giao thông','Chọn “Tra cứu phương tiện vi phạm giao thông qua hình ảnh”','Nhập biển kiểm soát và mã xác nhận trên website chính thức'],actions:[act('Tra cứu tại Cục CSGT',URLS.csgt)],source:URLS.csgt},
 {id:'doigplx',task:'gplx',name:'Đổi giấy phép lái xe',patterns:['doi gplx','doi giay phep lai xe','doi bang lai','bang lai het han','cap doi bang lai'],hints:['gplx','bang lai','giay phep lai xe'],type:'OFFICIAL_PROCEDURE',answer:'Đã xác định thủ tục đổi giấy phép lái xe. Điều kiện cụ thể phụ thuộc loại GPLX và trường hợp của bạn; kiểm tra hồ sơ/địa bàn trên cổng được công bố.',steps:['Mở trực tiếp trang đổi GPLX của Cục Cảnh sát giao thông','Kiểm tra đúng loại giấy phép, cơ quan thực hiện và phạm vi tiếp nhận','Thực hiện hồ sơ trên hệ thống chính thức'],actions:[act('Vào trang đổi GPLX',URLS.gplx)],source:URLS.gplx},
 {id:'caplaigplx',task:'gplx',name:'Cấp lại giấy phép lái xe',patterns:['cap lai gplx','mat bang lai','mat gplx','cap lai giay phep lai xe','bang lai bi mat'],hints:['gplx','bang lai'],type:'OFFICIAL_PROCEDURE',answer:'Thủ tục cấp lại GPLX cần đối chiếu lý do mất/hỏng và loại giấy phép. VN App chưa có đường dẫn chi tiết chung được xác minh đủ cho mọi trường hợp.',steps:['Mở Cổng Dịch vụ công Quốc gia','Tìm “Cấp lại Giấy phép lái xe”','Chọn thủ tục đúng cơ quan và trường hợp'],actions:[act('Đến Cổng Dịch vụ công',URLS.dvc,false)],source:URLS.dvc},
 {id:'gplx',task:'gplx',name:'Tra cứu thông tin GPLX',patterns:['gplx','giay phep lai xe','bang lai','thi lai xe','sinh trac gplx'],hints:['giao thong','xe'],type:'AUTH_REQUIRED',answer:'Thông tin GPLX của cá nhân chỉ được xác nhận bởi hệ thống có thẩm quyền. VN App không đọc, kiểm tra số GPLX hoặc trạng thái tích hợp thay bạn.',steps:['Mở Cổng Dịch vụ công Quốc gia hoặc VNeID','Chọn nghiệp vụ GPLX cần thực hiện','Xác thực và tra cứu trên dịch vụ chính thức'],actions:[act('Đến Cổng Dịch vụ công',URLS.dvc,false),act('VNeID',URLS.vneid,false)],source:URLS.dvc},
 {id:'luutru',task:'luutru',name:'Thông báo lưu trú',patterns:['thong bao luu tru','khai bao luu tru','luu tru','qua dem','khach san bao luu tru','nha nghi bao luu tru'],hints:['tam tru','cu tru','nha nghi'],type:'OFFICIAL_PROCEDURE',answer:'Đã xác định thủ tục Thông báo lưu trú. VN App không tiếp nhận thông tin khách lưu trú; việc thông báo được thực hiện trên kênh cơ quan công an.',steps:['Mở thông tin thủ tục Thông báo lưu trú của Cổng Dịch vụ công','Kiểm tra đơn vị tiếp nhận đúng địa bàn','Chọn thực hiện trực tuyến trên cổng được công bố'],actions:[act('Xem thủ tục Thông báo lưu trú',URLS.luutru)],source:URLS.luutru},
 {id:'tamtru',task:'cutru',name:'Đăng ký tạm trú',patterns:['dang ky tam tru','lam tam tru','tam tru','gia han tam tru'],hints:['cu tru','nha'],type:'OFFICIAL_PROCEDURE',answer:'Đăng ký tạm trú là thủ tục quản lý cư trú. Cổng Bộ Công an cung cấp hướng dẫn và quy trình theo địa bàn.',steps:['Vào Cổng Dịch vụ công Bộ Công an','Tìm chính xác “Đăng ký tạm trú”','Chọn địa bàn và thực hiện trên dịch vụ được niêm yết'],actions:[act('Dịch vụ công Bộ Công an',URLS.police,false)],source:URLS.police},
 {id:'thuongtru',task:'cutru',name:'Đăng ký thường trú và xác nhận cư trú',patterns:['ho khau','thuong tru','dang ky thuong tru','xac nhan cu tru','dia chi cu tru','so ho khau'],hints:['cu tru','can cuoc'],type:'OFFICIAL_PROCEDURE',answer:'Các thủ tục thường trú, xác nhận cư trú và thông tin hộ gia đình phải tra cứu theo thủ tục đang được cơ quan công an công bố.',steps:['Mở Cổng Dịch vụ công Bộ Công an','Chọn thủ tục thường trú hoặc xác nhận thông tin cư trú','Nhập dữ liệu cần thiết chỉ tại cổng chính thức'],actions:[act('Dịch vụ công Bộ Công an',URLS.police,false)],source:URLS.police},
 {id:'vneid',task:'cutru',name:'Định danh điện tử VNeID',patterns:['vneid','dinh danh dien tu','can cuoc','cccd','tich hop giay to'],hints:['dinh danh'],type:'AUTH_REQUIRED',answer:'Các giấy tờ hoặc thông tin định danh cá nhân chỉ được hiển thị sau khi đăng nhập chính thức vào VNeID.',steps:['Mở VNeID từ nguồn chính thức','Chọn mục giấy tờ/dịch vụ phù hợp','Đăng nhập và thực hiện trong ứng dụng chính thức'],actions:[act('Mở trang VNeID',URLS.vneid,false)],source:URLS.vneid},
 {id:'bhytvalid',task:'bhyt',name:'Kiểm tra giá trị sử dụng thẻ BHYT',patterns:['bhyt con han','the bhyt con han','bhyt het han','thoi han bhyt','gia tri su dung the bhyt','kiem tra the bhyt','kiem tra bhyt','han bao hiem y te','tra the bhyt','bao hiem y te con han'],hints:['bhyt','the bao hiem','bao hiem y te'],type:'AUTH_OR_CAPTCHA',answer:'BHXH Việt Nam có trang “Tra cứu giá trị sử dụng thẻ BHYT”. Kết quả hạn thẻ chỉ xuất hiện trên website của BHXH sau khi người dùng hoàn thành các trường bắt buộc.',steps:['Mở trực tiếp trang tra cứu giá trị sử dụng thẻ BHYT','Nhập thông tin theo yêu cầu tại website của BHXH Việt Nam','Xem thời hạn sử dụng do hệ thống BHXH trả về'],actions:[act('Tra cứu thời hạn BHYT',URLS.bhyt)],source:URLS.bhyt},
 {id:'bhxh',task:'bhyt',name:'Thông tin BHXH, BHYT, VssID',patterns:['vssid','bao hiem xa hoi','bhxh','bao hiem y te','bhyt','che do bhxh','quyen loi bhyt','qua trinh dong bhxh'],hints:['y te','bao hiem'],type:'AUTH_REQUIRED',answer:'Quá trình đóng và quyền lợi BHXH/BHYT thuộc thông tin cá nhân. Người dùng cần tra cứu trực tiếp ở VssID hoặc hệ thống BHXH.',steps:['Mở cổng BHXH Việt Nam hoặc VssID chính thức','Chọn mục phù hợp','Xác thực theo hướng dẫn của hệ thống'],actions:[act('Mở cổng BHXH Việt Nam',URLS.bhxh,false)],source:URLS.bhxh},
 {id:'medical',task:'yte',name:'Thủ tục y tế và giấy phép hành nghề',patterns:['giay phep hanh nghe y','chung chi hanh nghe','kham chua benh','y te','benh vien','co so kham benh','duoc','giay phep kham benh'],hints:['suc khoe'],type:'PUBLIC_INFORMATION',answer:'Thông tin thủ tục và giấy phép thuộc quản lý ngành y tế có thể tra cứu trên Cổng Dịch vụ công Bộ Y tế. VN App không tư vấn chẩn đoán hoặc cung cấp hồ sơ bệnh án.',steps:['Mở Cổng Dịch vụ công Bộ Y tế','Chọn chính xác thủ tục hoặc nhóm giấy phép','Đọc thông tin điều kiện, biểu mẫu và cơ quan thực hiện'],actions:[act('Dịch vụ công Bộ Y tế',URLS.health,false)],source:URLS.health},
 {id:'masothue',task:'thue',name:'Tra cứu mã số thuế',patterns:['ma so thue','mst','kiem tra ma thue','tra ma so thue'],hints:['thue'],type:'AUTH_REQUIRED',answer:'Thông tin thuế phải được đối chiếu trên hệ thống ngành Thuế. VN App không yêu cầu nhập số định danh, mã số thuế hoặc mật khẩu.',steps:['Mở hệ thống Thuế điện tử chính thức','Chọn chức năng tra cứu thông tin người nộp thuế','Nhập dữ liệu chỉ trên website chính thức'],actions:[act('Đến Thuế điện tử',URLS.tax,false)],source:URLS.tax},
 {id:'nopthue',task:'thue',name:'Nộp thuế và nghĩa vụ tài chính',patterns:['thue','nop thue','dong thue','le phi truoc ba','quyet toan thue','thue thu nhap','thue ca nhan','thue xe','etax'],hints:['thue','le phi','etax'],type:'AUTH_REQUIRED',answer:'Nộp thuế và tra cứu nghĩa vụ tài chính thực hiện qua eTax Mobile hoặc cổng Thuế điện tử. VN App không xử lý thanh toán và không giữ chứng từ.',steps:['Mở eTax Mobile hoặc Thuế điện tử','Đăng nhập trên hệ thống thuế','Chọn đúng nghĩa vụ tài chính cần thực hiện'],actions:[act('Mở Thuế điện tử',URLS.tax,false)],source:URLS.tax},
 {id:'ho so',task:'giayphep',name:'Theo dõi hồ sơ dịch vụ công',patterns:['tra cuu ho so','tinh trang ho so','ket qua ho so','tien do giai quyet','ho so dang xu ly','ma ho so'],hints:['ho so','dich vu cong'],type:'AUTH_REQUIRED',answer:'Trạng thái hồ sơ phải lấy từ cơ quan đang thụ lý. VN App chưa được kết nối cơ sở dữ liệu dịch vụ công để xem trạng thái thay bạn.',steps:['Mở Cổng Dịch vụ công Quốc gia','Đăng nhập hoặc vào mục tra cứu hồ sơ','Tra cứu theo hướng dẫn ngay trên hệ thống'],actions:[act('Tra cứu hồ sơ tại DVC Quốc gia',URLS.dvc,false)],source:URLS.dvc},
 {id:'giayphep',task:'giayphep',name:'Tra cứu giấy phép và thủ tục hành chính',patterns:['giay phep','cap phep','thu tuc hanh chinh','kinh doanh','giay phep xay dung','giay phep con','ho so'],hints:['dich vu cong','cap lai'],type:'OFFICIAL_PROCEDURE',answer:'Giấy phép tùy loại và địa bàn có cơ quan xử lý riêng. VN App chỉ xác định được cổng tra cứu chung khi chưa có thủ tục cụ thể đã được xác minh.',steps:['Mở Cổng Dịch vụ công Quốc gia','Tìm tên đầy đủ của giấy phép','Chọn đúng cơ quan và địa bàn giải quyết'],actions:[act('Tìm thủ tục tại DVC Quốc gia',URLS.dvc,false)],source:URLS.dvc},
 {id:'hocsinh',task:'hocsinh',name:'Học sinh và tuyển sinh',patterns:['hoc sinh','tuyen sinh','nhap hoc','hoc ba','dang ky di hoc','diem thi','thi tot nghiep','giao duc','truong hoc'],hints:['hoc sinh','hoc'],type:'PUBLIC_INFORMATION',answer:'Công bố chung về giáo dục thuộc Bộ GD&ĐT; kết quả tuyển sinh, học bạ cá nhân thường thuộc hệ thống của địa phương hoặc cơ sở giáo dục.',steps:['Xem thông tin công khai từ Bộ GD&ĐT','Chọn cổng tuyển sinh do địa phương/trường công bố','Tra cứu hồ sơ riêng trên hệ thống trường hoặc địa phương'],actions:[act('Thông tin Bộ GD&ĐT',URLS.education,false)],source:URLS.education},
 {id:'nghiavu',task:'nghiavu',name:'Nghĩa vụ quân sự',patterns:['nghia vu quan su','nvqs','nhap ngu','tuyen quan','kham nghia vu','tam hoan nghia vu','mien nghia vu','quan su'],hints:['quan doi'],type:'PUBLIC_INFORMATION',answer:'Nguồn chính thức chung là Bộ Quốc phòng. Lệnh gọi khám, hoãn hoặc miễn của một công dân phải xác minh với cơ quan quân sự có thẩm quyền tại địa phương.',steps:['Xem thông tin và văn bản do Bộ Quốc phòng công bố','Đối chiếu trường hợp cụ thể với văn bản còn hiệu lực','Liên hệ cơ quan quân sự địa phương khi cần kết luận cá nhân'],actions:[act('Cổng Bộ Quốc phòng',URLS.defense,false),act('Tra cứu văn bản pháp luật',URLS.law,false)],source:URLS.defense},
 {id:'congdanso',task:'phananh',name:'Phản ánh và dịch vụ công TP.HCM',patterns:['cong dan so','phan anh','kien nghi','phan anh tphcm','chinh quyen tphcm','tphcm'],hints:['tp hcm','ho so'],type:'AUTH_REQUIRED',answer:'Các phản ánh và hồ sơ theo dõi của TP.HCM thực hiện trên ứng dụng Công dân số TP.HCM hoặc kênh chính quyền công bố.',steps:['Mở ứng dụng Công dân số TP.HCM từ kho chính thức','Chọn mục phản ánh hoặc theo dõi hồ sơ','Nhập nội dung chỉ tại kênh tiếp nhận chính thức'],actions:[act('Cổng TTĐT TP.HCM',URLS.hcm,false)],source:URLS.hcm},
 {id:'dangvien',task:'dangvien',name:'Sổ tay đảng viên điện tử',patterns:['so tay dang vien','dang vien','icpv','sinh hoat chi bo','chi bo','nghi quyet dang'],hints:['dang'],type:'AUTH_REQUIRED',answer:'Sổ tay đảng viên phục vụ công tác Đảng theo phân quyền. VN App chỉ giúp xác định đúng ứng dụng và nguồn công bố.',steps:['Tìm ứng dụng iCPV - Book đúng nhà phát hành','Mở ứng dụng trên kho chính thức','Đăng nhập bằng tài khoản được tổ chức cung cấp'],actions:[act('Thông tin từ cơ quan Đảng',URLS.party,false)],source:URLS.party},
 {id:'khan',task:'khan',name:'Báo sự cố, cứu hộ và cấp cứu',patterns:['khan cap','chay nha','dang chay','bao chay','cuu hoa','cuu thuong','cap cuu','tai nan','113','114','115','sos','help 114','cuu ho','gap nguy hiem'],hints:['bao chay','bao dong'],type:'EMERGENCY',answer:'Nếu sự việc đang diễn ra, dùng số khẩn cấp phù hợp. VN App không tiếp nhận, chuyển tiếp tin báo và không cung cấp trạng thái điều động lực lượng.',steps:['Gọi 113 khi cần công an; 114 khi cháy hoặc cứu nạn cứu hộ; 115 khi cần cấp cứu y tế','Nêu địa điểm và diễn biến trực tiếp cho tổng đài','Không chờ VN App trả kết quả xử lý khẩn cấp'],actions:[act('Thông tin an toàn từ Bộ Công an',URLS.police,false)],source:URLS.police}
];
const PUBLIC_STATUS=Object.freeze({EMERGENCY:'Khẩn cấp — liên hệ trực tiếp',AUTH_REQUIRED:'Cần xác thực ở nguồn chính thức',AUTH_OR_CAPTCHA:'Cần nhập dữ liệu tại nguồn chính thức',OFFICIAL_PROCEDURE:'Đã xác định thủ tục công khai',PUBLIC_INFORMATION:'Thông tin công khai'});
const ALIASES=[[/\bbang lai xe\b/g,'gplx'],[/\bbang lai\b/g,'gplx'],[/\bgiay phep lai xe\b/g,'gplx'],[/\bbao hiem y te\b/g,'bhyt'],[/\bbao hiem xa hoi\b/g,'bhxh'],[/\btp hcm\b/g,'tphcm'],[/\bthanh pho ho chi minh\b/g,'tphcm'],[/\bgiay phep\b/g,'giay phep']];
function canonical(s){let n=normalize(s);for(const [re,replace] of ALIASES)n=n.replace(re,replace);return n.replace(/\s+/g,' ').trim();}
function validUrl(url){try{const u=new URL(url);return u.protocol==='https:'&&APPROVED_HOSTS.has(u.hostname)&&!u.username&&!u.password;}catch{return false;}}
function buildAction(a){return validUrl(a.url)?{label:a.title,url:a.url,level:a.direct?'direct':'portal',verifiedAt:VERIFIED}:null;}
function score(rule,input){
 const q=canonical(input);if(!q)return 0;
 const terms=[...new Set(q.split(' ').filter(w=>w.length>1&&!STOP.has(w)))];
 let n=0;
 for(const pat of rule.patterns){const p=canonical(pat);if(!p)continue;
  if(contains(q,p))n=Math.max(n,50+p.split(' ').length*16+(q===p?34:0));
  else if(q.length>=6&&p.includes(q))n=Math.max(n,30);
 }
 for(const hint of rule.hints||[])if(contains(q,canonical(hint)))n+=7;
 if(n===0)return 0;
 const covered=terms.filter(t=>rule.patterns.some(p=>canonical(p).split(' ').includes(t))||rule.hints.some(h=>canonical(h).split(' ').includes(t)));
 n+=covered.length*2;
 for(const ex of rule.exclude||[])if(contains(q,ex))n-=45;
 return Math.max(0,n);
}
function process(raw){
 const safe=sanitize(raw),input=focusQuery(safe.query);
 if(!input)return {status:safe.sensitive?'PRIVATE_INPUT':'EMPTY',sensitive:safe.sensitive,results:[],message:safe.sensitive?'Không nhập số định danh, điện thoại hoặc biển số tại VN App. Hãy nhập tên việc cần làm.':'Nhập nhu cầu, ví dụ “kiểm tra thẻ BHYT” hoặc “đổi GPLX”.'};
 let ranked=INTENTS.map((rule)=>({rule,points:score(rule,input)})).filter(a=>a.points>=30).sort((a,b)=>b.points-a.points);
 // Tác vụ độc lập xuất hiện cùng lúc (ví dụ: "BHYT và thuế") thì cùng trả hai đích.
 if(ranked.length>1){const top=ranked[0];ranked=ranked.filter((entry,i)=>i===0||(entry.rule.task!==top.rule.task&&entry.points>=Math.max(45,top.points*.7)));}
 const primary=ranked.slice(0,3).map(({rule,points})=>({id:rule.id,task:rule.task,title:rule.name,category:rule.type,status:PUBLIC_STATUS[rule.type],answer:rule.answer,steps:rule.steps.slice(),actions:rule.actions.map(buildAction).filter(Boolean),source:rule.source,verifiedAt:VERIFIED,confidence:Math.min(99,Math.round(points))}));
 if(!primary.length)return {status:'NO_VERIFIED_ROUTE',sensitive:safe.sensitive,results:[],message:'Chưa tìm được nghiệp vụ khớp đủ chắc chắn trong danh mục đã duyệt. VN App không tự đoán đường dẫn hoặc kết quả.'};
 return {status:primary.length>1?'MULTIPLE_MATCHES':'MATCHED',sensitive:safe.sensitive,results:primary,message:safe.sensitive?'Đã loại bỏ thông tin có thể nhận diện cá nhân khỏi yêu cầu. Chỉ thực hiện tra cứu tại nguồn chính thức.':'Đã xác định nguồn để thực hiện tác vụ.'};
}
function selfCheck(){const bad=INTENTS.flatMap(t=>t.actions.filter(a=>!validUrl(a.url)).map(a=>t.id+': '+a.url));return {intents:INTENTS.length,invalidLinks:bad};}
function focusQuery(raw){
 const q=normalize(raw);
 // Keep semantic negations such as “không gắn chip”; remove only denied actions.
 return q.replace(/\b(?:khong|dung)\s+(?:(?:muon|can)\s+)?(?:doi|tra cuu|dang ky|nop|thanh toan|cap|lam|mo|tim|kiem tra)\b.*?(?=\b(?:toi muon|toi can|muon|can|thay vao do|ma la|chi muon)\b|$)/g,' ').replace(/\s+/g,' ').trim();
}
return Object.freeze({process,normalize,sanitize,focusQuery,validUrl,selfCheck,intents:INTENTS.map(x=>({id:x.id,task:x.task,name:x.name}))});
});
