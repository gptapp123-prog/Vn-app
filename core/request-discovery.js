/* Catalog retrieval proposes tasks for confirmation; never invents links or auto-opens a guess. */
(function(r,f){const a=f(typeof module==='object'&&module.exports?require('./language-understanding'):r.VN_LANGUAGE,typeof module==='object'&&module.exports?require('../engine'):r.VN_ENGINE);if(typeof module==='object'&&module.exports)module.exports=a;if(r)r.VN_DISCOVERY=a;})(typeof globalThis!=='undefined'?globalThis:this,function(L,E){
'use strict';
const STOP=new Set('toi minh ban muon can giup cho xin lam sao the nao o dau nhu vay de va hoac cua ve co viec tim tra cuu xem mot cac nhung duoc voi la thi hien tai dang da khi nay'.split(' '));
const DOMAINS=[
 {phrases:['bao hiem','bao hiem cua toi'],question:'Bạn cần kiểm tra hay làm việc gì về bảo hiểm?',ids:['bhyt','bhxh','maternity','pension','social-lump','unemployment']},
 {phrases:['dat','dat dai','so hong','so do'],question:'Bạn cần làm việc gì về đất hoặc giấy chứng nhận?',ids:['land-certificate','land-first','land-lost','land-exchange','land-transfer','land-split','land-mediate','land-info']},
 {phrases:['giay to','giay de di lam','giay to di lam'],question:'Bạn cần loại giấy nào? Chọn tên giấy để tìm đúng thủ tục.',ids:['identity-apply','criminal-record','civil-copy','certify-copy','residence']},
 {phrases:['dong phi','nop phi','tra phi','khoan thu','dong khoan nao'],question:'Bạn muốn đóng khoản nào?',ids:['electric','water','tuition','internet','postpaid','party-dues']},
 {phrases:['sua may','may hong','thiet bi hong','sua do','sua thiet bi'],question:'Bạn muốn sửa thiết bị nào?',ids:['repair-phone','repair-laptop','repair-washer','repair-fridge','repair-aircon','repair-tv','home-repair']},
 {phrases:['don mua','viec mua hang','don mua hang'],question:'Bạn cần làm gì với đơn mua hàng?',ids:['order-track','cancel-order','return-order','shop-support']},
 {phrases:['hoc hanh','viec hoc','viec hoc cua con'],question:'Bạn cần xem thông tin học tập hay làm thủ tục nào?',ids:['student-result','school-contact','school-schedule','school-attendance','exam-result','school-exemption','study-support']},
 {phrases:['y te','kham','di kham','viec kham'],question:'Bạn cần đặt lịch, xem kết quả khám hay tra thông tin thuốc?',ids:['appointment','specialist','health-record','drug-registration','drug-recall','drug-price']},
 {phrases:['thuoc','thong tin thuoc'],question:'Bạn muốn tra thông tin nào về thuốc?',ids:['drug-registration','drug-recall','drug-price','drug-otc']},
 {phrases:['hoc phi','tien hoc'],question:'Bạn muốn đóng học phí hay tìm chính sách hỗ trợ?',ids:['tuition','school-exemption','study-support']},
 {phrases:['thue','viec thue'],question:'Bạn muốn nộp thuế hay tra thông tin thuế?',ids:['tax','taxcode']}
];
const words=q=>L.normalize(q).split(' ').filter(w=>w&&!STOP.has(w));
function catalogRows(catalogs){const rows=[];const seen=new Set();for(const kind of ['public','life','citizen'])for(const s of catalogs?.[kind]||[]){if(seen.has(s.id))continue;seen.add(s.id);rows.push({kind,id:s.id,title:s.title,group:s.group,words:new Set(words([s.title,...(s.terms||[])].join(' ')))});}return rows;}
function discover(raw,catalogs){const safe=E.sanitize(raw);if(safe.sensitive)return {status:'PRIVATE_INPUT',choices:[]};const q=L.understand(E.focusQuery(safe.query)).query;if(!q||/\b(?:khong|dung)\s+(?:muon|can)\b/.test(q))return {status:'NONE',choices:[]};const rows=catalogRows(catalogs),short=words(q).join(' '),domain=DOMAINS.find(d=>d.phrases.some(p=>words(p).join(' ')===short));
 if(domain){const choices=domain.ids.map(id=>rows.find(r=>r.id===id)).filter(Boolean).map(({kind,id,title})=>({kind,id,title}));return {status:'CLARIFY',question:domain.question,choices,query:q};}
 if(!/\b(?:bhxh|bhyt|bao hiem|can cuoc|ho tich|khai sinh|giay|dat|so do|so hong|kinh doanh|hoc|thi|thuoc|benh vien|kham|may|dien thoai|don hang|don mua|thue|dien|nuoc|dang vien|dang phi|ho chieu|xe|bang lai|gplx|cu tru|nha)\b/.test(q)||/https?:\/\//i.test(raw))return {status:'NONE',choices:[],query:q};
 const repair=/\bsua\b/.test(q)&&/\b(?:may|dien thoai|thiet bi|tu lanh|dieu hoa)\b/.test(q);
 const tokens=[...new Set(words(q))];if(tokens.length<2)return {status:'NONE',choices:[],query:q};const frequency=new Map(tokens.map(w=>[w,rows.filter(r=>r.words.has(w)).length]));
 const ranked=rows.filter(r=>!repair||(r.kind==='life'&&r.group==='repair')).map(r=>{const matched=tokens.filter(w=>r.words.has(w)),specific=matched.filter(w=>frequency.get(w)<=Math.max(2,rows.length*.2));return {r,matched,specific,score:matched.reduce((n,w)=>n+Math.log(1+rows.length/(frequency.get(w)||1)),0)};}).filter(x=>x.matched.length>=2&&x.specific.length>=1&&x.matched.length/tokens.length>=.5).sort((a,b)=>b.score-a.score);
 if(!ranked.length)return {status:'NONE',choices:[],query:q};const best=ranked[0].score;const choices=ranked.filter(x=>x.score>=best*.7).slice(0,6).map(({r,matched})=>({kind:r.kind,id:r.id,title:r.title,matched}));return {status:'CONFIRM',question:'Bạn muốn thực hiện việc nào dưới đây?',choices,query:q};
}
return Object.freeze({discover});
});
