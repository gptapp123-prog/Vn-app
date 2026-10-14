/* Curated question-to-task rules. Uses existing destinations; never creates URLs. */
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./language-understanding'):root.VN_LANGUAGE,typeof module==='object'&&module.exports?require('../engine'):root.VN_ENGINE);if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.VN_QUESTIONS=api;})(typeof globalThis!=='undefined'?globalThis:this,function(L,E){
'use strict';
// Every group must match. Alternatives within a group express the same need.
const RULES=[
 ['public','birth',['be|con|em be','chao doi|moi sinh|vua sinh','giay|dang ky|thu tuc'],['mat giay|that lac|bao hiem|thuong tru']],
 ['public','birth-linked',['be|con|em be','moi sinh|vua sinh|chao doi','bao hiem|thuong tru']],
 ['public','lost-birth',['giay sinh|giay luc sinh','mat|that lac|khong con']],
 ['public','marriage',['dam cuoi|cuoi nhau','giay|dang ky|hop phap']],
 ['public','single',['chua ket hon|doc than','giay|xac nhan|chung minh']],
 ['public','death',['nguoi than|ong|ba|cha|me','qua doi|mat di','giay|dang ky|thu tuc']],
 ['public','certify-copy',['photo|photocopy','dong dau|xac nhan|chung thuc']],
 ['public','certify-sign',['chu ky','xac nhan|chung thuc|lam chung']],
 ['public','land-first',['dat|nha dat','chua co giay|lan dau','so|giay chung nhan']],
 ['public','land-lost',['giay dat|so dat|giay nha dat','mat|that lac']],
 ['public','land-transfer',['dat|nha dat','de lai|cho tang|thua ke','sang ten|giay to|thu tuc']],
 ['public','build-repair',['nha|nha o','cai tao|sua lai|nang tang','giay phep|xin phep|thu tuc']],
 ['public','unemployment',['nghi viec|mat viec|bi cho nghi','tro cap|tien ho tro|ho tro that nghiep']],
 ['public','social-pension',['nguoi gia|tuoi cao','khong co luong huu','tro cap|ho tro']],
 ['public','business',['ban hang|mo quan|buon ban','dang ky|giay phep|thu tuc'],['an toan thuc pham|ve sinh']],
 ['public','food-safety',['quan an|ban do an','ve sinh|an toan thuc pham|giay an toan']],
 ['public','school-exemption',['hoc phi','bot tien|mien|giam|khong phai dong']],
 ['public','study-support',['di hoc|hoc sinh','ho tro tien|ho tro chi phi|tien ho tro']],
 ['public','party-dues-history',['dang phi','dong roi|nop roi|lich su|chua|da dong|da nop']],
 ['public','party-dues',['dang phi','dong|nop|thanh toan'],['lich su|chua|da dong|da nop|nop roi|dong roi']],
 ['public','party-transfer',['dang vien|chi bo','chuyen cho lam|chuyen noi o|doi noi sinh hoat']],
 ['public','party-book',['dang vien|chi bo','tai lieu sinh hoat|so dien tu|doc tin']],
 ['citizen','passport',['di nuoc ngoai|ra nuoc ngoai','giay to|lam giay|thu tuc']],
 ['citizen','bhyt',['the kham benh|the bao hiem|bhyt','con dung|con hieu luc|het han|han su dung']],
 ['citizen','licence',['bang lai|gplx','sap het han|het han|doi lai']],
 ['citizen','outage',['nha|khu|khu vuc','bi cat dien|khong co dien']],
 ['life','appointment',['di kham|kham benh|benh vien','lay so|dat truoc|hen gio|dang ky']],
 ['life','student-result',['con|hoc sinh|chau','duoc may diem|ket qua hoc|diem mon|xem diem'],['thpt|thi tot nghiep|thi cap ba']],
 ['life','school-schedule',['con|hoc sinh|chau','hoc ngay nao|hoc tiet nao|gio hoc']],
 ['life','school-attendance',['con|hoc sinh|chau','xin nghi|vang hoc']],
 ['life','exam-result',['thi cap ba|thi tot nghiep|thpt','may diem|ket qua|xem diem']],
 ['life','return-order',['mon hang|don hang|mua online','bi loi|sai mau|khong dung|tra lai|lay lai tien']],
 ['life','order-track',['goi hang|don mua|mon hang','den dau|bao gio toi|chua nhan|chua giao']],
 ['life','repair-washer',['may giat','khong chay|khong vat|bi hong|bao loi|khong len nguon']],
 ['life','repair-fridge',['tu lanh','khong lanh|khong chay|bi hong|keu to']],
 ['life','repair-aircon',['dieu hoa|may lanh','khong mat|chay nuoc|khong lanh|bi hong']],
 ['life','repair-phone',['dien thoai|may tinh bang','bi hong|vo man|khong len|sac khong vao']],
 ['life','repair-laptop',['may tinh|laptop','khong khoi dong|khong len|bi hong|sac khong vao'],['may tinh bang']],
 ['life','repair-tv',['tv|tivi','khong len|mat hinh|bi hong']],
 ['life','warranty-policy',['may|thiet bi|do da mua','con duoc bao hanh|het bao hanh|thoi han bao hanh']],
 ['public','identity-first',['can cuoc|cccd','lan dau|chua tung lam']],
 ['public','identity-lost',['can cuoc|cccd','that lac|khong tim thay']],
 ['public','identity-exchange',['can cuoc|cccd','het han|bi hong|doi lai']],
 ['public','criminal-record',['xin viec|di lam','ly lich tu phap|giay tu phap']],
 ['public','civil-change',['giay khai sinh|ho tich','sai ten|sai ngay sinh|sua thong tin']],
 ['public','land-split',['dat|thua dat','chia ra|gop lai|tach ra']],
 ['public','land-mediate',['dat|ranh dat','tranh chap|hang xom lan|lan chiem','hoa giai|giai quyet']],
 ['public','social-lump',['bao hiem xa hoi|bhxh','rut tien|lay tien|mot lan']],
 ['public','business-pause',['quan|cua hang|ho kinh doanh','nghi tam|tam nghi|tam ngung']],
 ['public','business-close',['ho kinh doanh|quan|cua hang','nghi han|dong cua han|cham dut']],
 ['public','business-replace',['giay kinh doanh|dang ky kinh doanh','mat|that lac']],
 ['citizen','temporary',['thue nha|o tro|chuyen cho o','dang ky|khai bao','tam tru|cu tru']],
 ['citizen','residence',['giay|xac nhan','noi o|dia chi cu tru']],
 ['citizen','lost-licence',['bang lai|gplx','that lac|khong tim thay']],
 ['citizen','bhxh',['bao hiem xa hoi|bhxh','dong duoc may nam|dong bao lau|qua trinh dong']],
 ['citizen','taxcode',['thue','ma cua toi|ma so|thong tin dang ky']],
 ['citizen','tuition',['hoc phi|tien hoc','dong|nop|tra|thanh toan'],['mien|giam|ho tro']],
 ['citizen','internet',['internet|wifi|truyen hinh','dong tien|nop tien|tra tien|thanh toan']],
 ['citizen','postpaid',['dien thoai tra sau|cuoc dien thoai','dong|nop|tra|thanh toan']],
 ['life','health-record',['benh vien|di kham|kham benh','xem lai ket qua|ho so suc khoe|ket qua kham']],
 ['life','drug-recall',['thuoc','bi thu hoi|cam ban|vi pham']],
 ['life','drug-registration',['thuoc','duoc phep luu hanh|so dang ky|cap phep']],
 ['life','drug-price',['thuoc','gia cong bo|gia niem yet']],
 ['life','university-choice',['dai hoc','nguyen vong|chon truong|dang ky xet tuyen']],
 ['life','exam-registration',['thpt|thi tot nghiep|thi cap ba','dang ky|nop ho so']],
 ['life','cancel-order',['don hang|don mua|hang da dat','huy|khong mua nua']],
 ['life','shop-support',['don hang|mua hang','khieu nai|lien he ho tro|nguoi ban khong tra loi']],
 ['life','repair-status',['may|thiet bi|dien thoai|tu lanh','da gui sua|dang sua|gui bao hanh','den dau|xong chua|tien do']],
 ['life','service-center',['may|thiet bi|dien thoai|tu lanh','trung tam|dia chi','bao hanh']],
 ['life','home-repair',['ong nuoc|voi nuoc|bon nuoc','ro ri|bi vo|bi tac|bi hong']],
 ['life','home-repair',['dien nha|o cam|day dien','sua|tho|bi hong']]
];
const phrase=(q,p)=>(' '+q+' ').includes(' '+L.understand(p).query+' ');
function match(raw,catalogs){
 const safe=E.sanitize(raw);if(safe.sensitive)return {status:'PRIVATE_INPUT',choices:[]};
 const query=L.understand(E.focusQuery(safe.query)).query;
 if(!query||/\b(?:khong|dung)\s+(?:muon|can)\b/.test(query))return {status:'NONE',choices:[]};
 const hits=[];
 for(const [kind,id,groups,exclude=[]] of RULES){
  if(exclude.some(g=>g.split('|').some(p=>phrase(query,p))))continue;
  const lengths=groups.map(g=>Math.max(0,...g.split('|').filter(p=>phrase(query,p)).map(p=>L.normalize(p).length)));
  if(lengths.some(n=>!n))continue;
  const item=catalogs?.[kind]?.find(s=>s.id===id);if(!item)continue;
  hits.push({kind,id,title:item.title,score:lengths.reduce((a,b)=>a+b,0)+groups.length*20});
 }
 hits.sort((a,b)=>b.score-a.score);
 // Distinct needs remain a choice; lexical score is not a calibrated probability.
 const choices=[...new Map(hits.map(h=>[h.kind+':'+h.id,h])).values()].map(({score,...h})=>h);
 return {status:choices.length===1?'MATCH':choices.length?'CHOICE':'NONE',choices,query};
}
return Object.freeze({match,ruleCount:RULES.length});});
