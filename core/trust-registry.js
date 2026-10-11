/* VN App V3: explicit destination registry and origin validation.
 * No networking, no user input or credentials, no generic URL forwarding.
 */
(function(root,factory){
 const api=factory();
 if(typeof module==='object'&&module.exports)module.exports=api;
 if(root)root.VN_TRUST=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const CANONICAL=Object.freeze([
 ['https://csgt.bocongan.gov.vn/tra-cuu-phat-nguoi','Cục Cảnh sát giao thông · Bộ Công an','direct'],
 ['https://dvc-gplx.csgt.bocongan.gov.vn/p/home/dvc-cap-doi-gplx.html','Cục Cảnh sát giao thông · Bộ Công an','direct'],
 ['https://www.csgt.vn/','Cục Cảnh sát giao thông','portal'],
 ['https://dichvucong.gov.vn/','Cổng Dịch vụ công Quốc gia','portal'],
 ['https://dichvucong.bocongan.gov.vn/','Bộ Công an','portal'],
 ['https://baohiemxahoi.gov.vn/','Bảo hiểm xã hội Việt Nam','portal'],
 ['https://baohiemxahoi.gov.vn/gioithieu/Pages/tai-ung-dung-vssid.aspx','Bảo hiểm xã hội Việt Nam','direct'],
 ['https://baohiemxahoi.gov.vn/tracuu/pages/tra-cuu-thoi-han-su-dung-the-bhyt.aspx','Bảo hiểm xã hội Việt Nam','direct'],
 ['https://thuedientu.gdt.gov.vn/','Cơ quan Thuế','portal'],
 ['https://dichvucongbyt.moh.gov.vn/','Bộ Y tế','portal'],
 ['https://moet.gov.vn/','Bộ Giáo dục và Đào tạo','portal'],
 ['https://mod.gov.vn/','Bộ Quốc phòng','portal'],
 ['https://hochiminhcity.gov.vn/','Chính quyền TP.HCM','portal'],
 ['https://vbpl.vn/','Cơ sở dữ liệu văn bản pháp luật','portal'],
 ['https://dangcongsan.vn/','Cơ quan Đảng','portal'],
 ['https://universal.vneid.gov.vn/','Hệ thống VNeID','portal'],
 ['https://bocongan.gov.vn/','Bộ Công an','portal'],
 ['https://chinhphu.vn/','Cổng Thông tin điện tử Chính phủ','portal'],
 ['https://dxcenter.hochiminhcity.gov.vn/','Cơ quan TP.HCM','portal'],
 ['https://pccc-congan.hochiminhcity.gov.vn/w/huong-dan-su-dung-ung-dung-help-114','Công an TP.HCM','direct']
]);
// V2 linked to the legacy detailed-procedure paths. Without validating their current
// authoritative target after 2026 migration, route to DVC homepage instead.
const LEGACY=new Set([
 'https://dichvucong.gov.vn/p/home/dvc-tthc-thu-tuc-hanh-chinh-chi-tiet.html?ma_thu_tuc=372344',
 'https://dichvucong.gov.vn/p/home/dvc-tthc-thu-tuc-hanh-chinh-chi-tiet.html?ma_thu_tuc=3931'
]);
function isSafeSyntax(value){
 if(typeof value!=='string'||value.length>700||/[\s\\\x00-\x1f]/.test(value))return false;
 try{
  const u=new URL(value);
  return u.protocol==='https:'&&!u.username&&!u.password&&!u.port&&!u.hash&&u.href===value&&/^[a-z0-9.-]+$/.test(u.hostname);
 }catch{return false;}
}
const listed=new Map(CANONICAL.map(([url,agency,level])=>[url,Object.freeze({url,agency,level,channel:'official',reviewState:'catalogued'})]));
// Exact app-store packages pinned to the reviewed V2 catalog; no store URL
// is trusted merely because it is hosted by Google Play or Apple.
const PINNED_STORES=Object.freeze({
 evncskh:['https://play.google.com/store/apps/details?id=com.evn.cskh.vn','https://apps.apple.com/vn/app/evn-cskh/id6754793134'],
 vneid:['https://play.google.com/store/apps/details?id=com.vnid','https://apps.apple.com/vn/app/vneid/id1582750372'],
 vnetraffic:['https://play.google.com/store/apps/details?id=com.ots.c08.vnetraffic','https://apps.apple.com/vn/app/vnetraffic/id6475181815'],
 icpv:['https://play.google.com/store/apps/details?id=vn.dcs.icpvbook','https://apps.apple.com/vn/app/icpv-book/id6744908429'],
 congdanso:['https://play.google.com/store/apps/details?id=vn.gov.tphcm.hcmccitizen','https://apps.apple.com/vn/app/c%C3%B4ng-d%C3%A2n-s%E1%BB%91-tphcm/id6737809050'],
 etax:['https://play.google.com/store/apps/details?id=com.etax.icanhan','https://apps.apple.com/vn/app/etax-mobile/id1589750682'],
 vssid:['https://play.google.com/store/apps/details?id=com.bhxhapp','https://apps.apple.com/vn/app/vssid/id1521647264'],
 sos:['https://play.google.com/store/apps/details?id=com.ots.cbkc.catp','https://apps.apple.com/vn/app/sos-an-ninh-tr%E1%BA%ADt-t%E1%BB%B1-catp-hcm/id6742221934'],
 help114:['https://play.google.com/store/apps/details?id=com.mobicall.mobicall114','https://apps.apple.com/vn/app/help-114/id1262343518']
});
function fromCatalog(data){
 const destinations=new Map(listed);
 if(data&&Array.isArray(data.apps))for(const app of data.apps){
   const pin=PINNED_STORES[app.id];if(!pin)continue;
   for(const [idx,platform] of ['android','ios'].entries()){
     const url=app[platform];if(url!==pin[idx]||!isSafeSyntax(url))continue;
     destinations.set(url,Object.freeze({url,agency:app.agency,level:'store',channel:'store',reviewState:'catalogued'}));
   }
 }
 function resolve(url){
   if(!isSafeSyntax(url))return {ok:false,reason:'INVALID_URL'};
   if(LEGACY.has(url))return {ok:true,changed:true,record:destinations.get('https://dichvucong.gov.vn/'),reason:'LEGACY_LINK_REVIEW_REQUIRED'};
   const record=destinations.get(url);
   return record?{ok:true,changed:false,record,reason:'CATALOGUED_DESTINATION'}:{ok:false,reason:'NOT_IN_APPROVED_REGISTER'};
 }
 return Object.freeze({resolve,allowedCount:destinations.size,validUrl(url){return resolve(url).ok;},records(){return [...destinations.values()];}});
}
return Object.freeze({fromCatalog,isSafeSyntax,LEGACY_URLS:Object.freeze([...LEGACY])});
});
