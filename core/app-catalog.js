/* User-owned app shortcuts are not the official verified source registry. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.VN_APPS=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const GROUPS=Object.freeze(['Thanh toán hóa đơn','Ngân hàng & tài chính','Mua sắm','Vận chuyển','Y tế','Giáo dục','Dịch vụ công','Khác']);
const BILL_TYPES=Object.freeze(['Tiền điện','Tiền nước','Internet / truyền hình','Điện thoại trả sau','Học phí','Phí chung cư']);
function storeUrl(raw){
 if(typeof raw!=='string'||raw.length>700||/[\s\\\x00-\x1f]/.test(raw))return '';
 try{const u=new URL(raw);if(u.protocol!=='https:'||u.username||u.password||u.port||u.hash||u.href!==raw)return '';
 if(u.hostname==='play.google.com'&&u.pathname==='/store/apps/details'&&[...u.searchParams.keys()].length===1&&/^[a-zA-Z][a-zA-Z0-9_]*(?:\.[a-zA-Z0-9_]+)+$/.test(u.searchParams.get('id')||''))return u.href;
 if(u.hostname==='apps.apple.com'&&/^\/[a-z]{2}\/app\/[^/]+\/id\d+$/.test(u.pathname)&&!u.search)return u.href;
 }catch{}return '';
}
function validate(input){
 if(!input||typeof input.name!=='string'||!input.name.trim()||input.name.length>80)return {ok:false,message:'Nhập tên ứng dụng, tối đa 80 ký tự.'};
 const android=input.android?storeUrl(input.android):'',ios=input.ios?storeUrl(input.ios):'';
 if(input.android&&!android||input.ios&&!ios||!android&&!ios)return {ok:false,message:'Dùng liên kết trực tiếp của ứng dụng trên Google Play hoặc App Store.'};
 if(android&&!android.startsWith('https://play.google.com/')||ios&&!ios.startsWith('https://apps.apple.com/'))return {ok:false,message:'Đặt đúng liên kết Android và iOS.'};
 const group=GROUPS.includes(input.group)?input.group:'Khác';
 const bills=Array.isArray(input.bills)?[...new Set(input.bills.filter(x=>BILL_TYPES.includes(x)))]:[];
 return {ok:true,item:{id:android||ios,name:input.name.trim(),group,android,ios,bills,sourceState:'USER_ADDED_UNVERIFIED'}};
}
function matchBilling(query){const q=String(query||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').toLowerCase();if(!/(hoa don|tien dien|tien nuoc|hoc phi|cuoc internet|cuoc dien thoai|phi chung cu|thanh toan.*(?:internet|truyen hinh|dien thoai|tra sau))/.test(q)&&!/^\s*thanh toan\s*$/.test(q))return null;
 const rules=[['Tiền điện',/tien dien|hoa don dien/],['Tiền nước',/tien nuoc|hoa don nuoc/],['Internet / truyền hình',/internet|truyen hinh/],['Điện thoại trả sau',/dien thoai|tra sau/],['Học phí',/hoc phi/],['Phí chung cư',/chung cu/]];
 return rules.filter(([,re])=>re.test(q)).map(([name])=>name);
}
function repository(idb){
 function open(){return new Promise((resolve,reject)=>{if(!idb){reject(Error('Trình duyệt không hỗ trợ lưu danh mục.'));return;}const request=idb.open('vn-app-public-shortcuts',1);request.onupgradeneeded=()=>request.result.createObjectStore('apps',{keyPath:'id'});request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);request.onblocked=()=>reject(Error('Danh mục đang được mở ở tab khác; đóng tab cũ rồi thử lại.'));});}
 async function transaction(mode,action){const db=await open();return new Promise((resolve,reject)=>{const tx=db.transaction('apps',mode);let value;const req=action(tx.objectStore('apps'));req.onsuccess=()=>{value=req.result;};tx.oncomplete=()=>{db.close();resolve(value);};tx.onerror=tx.onabort=()=>{db.close();reject(tx.error||Error('Không lưu được danh mục.'));};});}
 return {async list(){const rows=await transaction('readonly',store=>store.getAll());return rows.map(validate).filter(x=>x.ok).map(x=>x.item);},async put(input,previousId){const verdict=validate(input);if(!verdict.ok)throw Error(verdict.message);await transaction('readwrite',store=>{if(previousId&&previousId!==verdict.item.id)store.delete(previousId);return store.put(verdict.item);});return verdict.item;},remove(id){return transaction('readwrite',store=>store.delete(id));}};
}
return Object.freeze({GROUPS,BILL_TYPES,storeUrl,validate,matchBilling,repository});
});
