/* Public, versioned lookup. Never accepts a full vehicle registration or private identifier. */
(function(root,factory){const data=typeof module==='object'&&module.exports?require('../reference-data.js'):root.VN_REFERENCE_DATA;const water=typeof module==='object'&&module.exports?require('./water-data'):root.VN_WATER_DATA;const api=factory(data,water);if(typeof module==='object'&&module.exports)module.exports=api;else root.VN_REFERENCE=api;})(typeof window!=='undefined'?window:globalThis,function(D,water){
'use strict';
const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const contains=(s,n)=>(' '+s+' ').includes(' '+n+' ');
const aliases=p=>[p.name,...p.oldNames,...(p.id==='79'?['TPHCM','TP HCM','HCM','Sài Gòn']:[]),...(p.id==='46'?['Thừa Thiên - Huế']:[])].map(normalize);
function provinces(query,mode='all'){
 const q=normalize(query);if(!q)return D.provinces.slice();
 if(/^\d+$/.test(q)){if(!/^\d{2}$/.test(q))return [];return D.provinces.filter(p=>(mode==='plates'?p.plates:mode==='postal'?p.postalPrefixes:mode==='admin'?[p.adminCode]:[...p.plates,...p.postalPrefixes,p.adminCode]).includes(q));}
 return D.provinces.filter(p=>aliases(p).some(n=>contains(q,n)||n.startsWith(q)));
}
function postal(query,provinceId='',limit=50){
 let q=normalize(query).replace(/\b(ma buu chinh|ma buu dien|postal code|zip code|zipcode)\b/g,'').trim();
 const found=D.provinces.filter(p=>aliases(p).some(n=>contains(q,n)));
 const chosen=provinceId?D.provinces.filter(p=>p.id===provinceId):found;
 if(provinceId&&!chosen.length)return {items:[],total:0,rejected:[],status:'UNKNOWN_PROVINCE'};
 const ids=chosen.map(p=>p.id);
 // Strip only whole, matched province names. A former province is not a commune boundary map.
 for(const p of chosen)for(const n of aliases(p).sort((a,b)=>b.length-a.length))if(contains(q,n))q=(' '+q+' ').replace(' '+n+' ',' ').trim();
 q=q.replace(/\b(thanh pho|tp|tinh|phuong|xa|dac khu|o dau|la gi|bao nhieu)\b/g,' ').replace(/\s+/g,' ').trim();
 const tokens=q.split(' ').filter(Boolean);
 const match=r=>(!provinceId||r.provinceId===provinceId)&&(!found.length||ids.includes(r.provinceId))&&tokens.every(t=>/^\d+$/.test(t)?r.code===t:normalize(r.name).split(' ').includes(t));
 const items=D.communes.filter(match),rejected=D.rejected.filter(match);
 return {items:items.slice(0,Math.max(1,Math.min(3321,limit))),total:items.length,rejected,status:rejected.length?'SOURCE_ROW_INVALID':items.length?'FOUND':'NO_VERIFIED_RECORD'};
}
function detect(raw){
 const q=normalize(raw);
 if(/\b(phat nguoi|vi pham|dang ky xe|doi bien|cap lai)\b/.test(q))return null;
 if(/\b(ma buu chinh|ma buu dien|postal code|zip code|zipcode)\b/.test(q))return {mode:'postal',query:q.replace(/\b(ma buu chinh|ma buu dien|postal code|zip code|zipcode)\b/g,'').trim()};
 if(/\b(bien so|dau so xe|ky hieu bien)\b/.test(q))return {mode:'plates',query:q.replace(/\b(bien so|dau so xe|ky hieu bien|xe|tinh nao|cua tinh|o dau|la gi|ma|tinh|thanh pho|tp)\b/g,' ').replace(/\s+/g,' ').trim()};
 if(/\b(ma tinh|ma don vi hanh chinh|tinh cu moi|tinh sap nhap)\b/.test(q))return {mode:'admin',query:q.replace(/\b(ma tinh|ma don vi hanh chinh|tinh cu moi|tinh sap nhap)\b/g,'').trim()};
 if(/\b(danh ba|tong dai|hotline|buu cuc)\b/.test(q))return {mode:'contacts',query:q.replace(/\b(danh ba|tong dai|hotline)\b/g,'').trim()};
 return null;
}
const waterSource='https://cskh.sawaco.com.vn/ho_tro/thong_tin_don_vi';
const contacts=[
 {id:'evn-hotline',name:'EVN · hỗ trợ khách hàng dùng điện',group:'Điện',region:'Toàn quốc',phone:'1558',url:'https://www.evn.com.vn/d/vi-VN/news/Chinh-thuc-dua-vao-hoat-dong-so-dien-thoai-tong-dai-cham-soc-khach-hang-EVN-1558-tu-ngay-1582026-60-142-509261',source:'https://www.evn.com.vn/d/vi-VN/news/Chinh-thuc-dua-vao-hoat-dong-so-dien-thoai-tong-dai-cham-soc-khach-hang-EVN-1558-tu-ngay-1582026-60-142-509261',note:'Đầu số từ 15/8/2026; chỉ gọi thoại. Thanh toán tiền điện: mở mục Thanh toán hóa đơn.',actionRoute:'billing'},
 {id:'vnpost',name:'Vietnam Post · Bưu điện Việt Nam',group:'Bưu chính',region:'Toàn quốc',phone:'1900545481',url:'https://vnpost.vn/vi/ho-tro',source:'https://vnpost.vn/vi/hoat-dong-nganh/thong-bao-sua-doi-ma-buu-chinh-quoc-gia-theo-don-vi-hanh-chinh-2-cap',note:'Hỗ trợ dịch vụ và hướng dẫn tìm bưu cục. Chưa nhập danh sách địa chỉ từng bưu cục.'},
 {id:'postal-lookup',name:'Tra cứu mã bưu chính quốc gia',group:'Bưu chính',region:'Toàn quốc',url:'https://mabuuchinh.vn/',source:'https://vnpost.vn/vi/hoat-dong-nganh/thong-bao-sua-doi-ma-buu-chinh-quoc-gia-theo-don-vi-hanh-chinh-2-cap',note:'Kênh tra cứu được Vietnam Post công bố; chọn đúng phường/xã nhận thư.'},
 {id:'sawaco',name:'SAWACO · chăm sóc khách hàng cấp nước',group:'Nước',region:'TP.HCM · theo phạm vi từng đơn vị',phone:'1900999997',email:'cskhsawaco@sawaco.com.vn',url:waterSource,source:waterSource,note:'Xem đơn vị và phạm vi cấp nước, đối chiếu hóa đơn. Không suy ra nhà cung cấp từ tên thành phố.',actionRoute:'billing'},
 {id:'emergency-112',name:'112 · sự cố, thiên tai, tình huống nguy cấp',group:'Khẩn cấp',region:'Toàn quốc',phone:'112',url:'https://xaydungchinhsach.chinhphu.vn/nhung-dieu-can-biet-ve-tong-dai-112-so-dien-thoai-tiep-nhan-thong-tin-va-noi-dung-thong-tin-ve-su-co-tham-hoa-119250714134442873.htm',source:'https://xaydungchinhsach.chinhphu.vn/nhung-dieu-can-biet-ve-tong-dai-112-so-dien-thoai-tiep-nhan-thong-tin-va-noi-dung-thong-tin-ve-su-co-tham-hoa-119250714134442873.htm',note:'Kênh tiếp nhận thông tin khẩn cấp theo NĐ 200/2025/NĐ-CP.'}
];
for(const p of water.providers)contacts.push({id:p.id,name:p.name,group:'Nước',region:p.region==='hcm'?'TP.HCM':'Tây Ninh',url:p.lookup||p.website,phone:p.phone,email:p.email||'',source:p.source,note:p.note,actionRoute:'billing'});
for(const c of contacts)c.reviewedAt='2026-10-11';
const urls=new Set([...contacts.flatMap(c=>[c.url,c.source]),...Object.values(D.sources).flatMap(s=>[s.url,s.pdfUrl,s.lookupUrl]).filter(Boolean)]);
function validUrl(value){try{const u=new URL(value);if(u.protocol!=='https:'||u.username||u.password)return false;if(urls.has(value))return true;const base=value.split('#')[0];return Object.values(D.sources).some(s=>s.pdfUrl===base)&&/^#page=\d{1,2}$/.test(u.hash)&&Number(u.hash.slice(6))>=1&&Number(u.hash.slice(6))<=94;}catch{return false;}}
function findContacts(query='',group='Tất cả'){const terms=normalize(query).split(' ').filter(Boolean);return contacts.filter(c=>{const keywords=c.group==='Điện'?'tiền điện điện lực mất điện':c.group==='Nước'?'tiền nước cấp nước':c.group==='Bưu chính'?'bưu cục chuyển phát': '';const words=normalize([c.name,c.region,c.group,c.phone,keywords].join(' ')).split(' ');return (group==='Tất cả'||c.group===group)&&terms.every(t=>words.includes(t));});}
return Object.freeze({data:D,normalize,provinces,postal,detect,contacts,findContacts,validUrl,specialPlate:{code:'80',name:'Cục Cảnh sát giao thông',sourceId:'plates'}});
});
