/* Device-local optional display name. No account, network or localStorage. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.VN_DISPLAY_NAME=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
function validate(raw){if(typeof raw!=='string'||/[\x00-\x1f\x7f<>]/.test(raw))throw Error('Tên không được chứa ký tự điều khiển hoặc dấu < >.');const name=raw.normalize('NFC').trim().replace(/\s+/g,' ');if(Array.from(name).length>60)throw Error('Tên hiển thị tối đa 60 ký tự.');return name;}
function repository(idb){
 function open(){return new Promise((resolve,reject)=>{if(!idb)return reject(Error('Thiết bị chưa hỗ trợ lưu tên.'));const r=idb.open('vn-app-preferences',1);r.onupgradeneeded=()=>r.result.createObjectStore('settings');r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error||Error('Không mở được nơi lưu tên.'));r.onblocked=()=>reject(Error('Đóng tab VN App cũ rồi thử lưu lại.'));});}
 async function run(mode,name){const db=await open();return new Promise((resolve,reject)=>{let tx,value='';try{tx=db.transaction('settings',mode);const s=tx.objectStore('settings'),r=mode==='readwrite'?s.put(name,'displayName'):s.get('displayName');r.onsuccess=()=>{try{value=mode==='readwrite'?name:typeof r.result==='string'?validate(r.result):'';}catch(e){tx.abort();reject(e);}};}catch(e){db.close();reject(e);return;}tx.oncomplete=()=>{db.close();resolve(value);};tx.onerror=tx.onabort=()=>{db.close();reject(tx.error||Error('Không lưu được tên.'));};});}
 return {get:()=>run('readonly'),set:name=>run('readwrite',validate(name))};
}
return Object.freeze({validate,repository});});
