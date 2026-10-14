/* Foreground, session-only location. No watch, coordinate persistence or application server. */
(function(r,f){const a=f();if(typeof module==='object'&&module.exports)module.exports=a;if(r)r.VN_LOCATION=a;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const norm=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
function validate(position,now=Date.now()){const c=position?.coords,t=position?.timestamp;if(!c||![c.latitude,c.longitude,c.accuracy,t].every(Number.isFinite)||Math.abs(c.latitude)>90||Math.abs(c.longitude)>180||c.accuracy<0||now-t>120000||t-now>60000)throw Error('INVALID_POSITION');return position;}
function provinceMatches(place,reference){if(String(place?.countryCode||'').toUpperCase()!=='VN')return [];let name=String(place.province||'');const aliases={'ho chi minh city':'TP Hồ Chí Minh','ho chi minh':'TP Hồ Chí Minh','hanoi':'Hà Nội','ha noi city':'Hà Nội'};name=aliases[norm(name)]||name;return reference?.provinces(name)||[];}
function errorMessage(error){const code=String(error?.code||error?.message||'');if(code==='1'||/0003|DENIED|permission/i.test(code))return 'Chưa được cấp quyền vị trí. Bạn có thể bật quyền trong cài đặt hoặc chọn tỉnh/thành thủ công.';if(code==='3'||/TIMEOUT|0010|0011/i.test(code))return 'Lấy vị trí quá thời gian. Thử nơi thoáng hơn hoặc chọn địa bàn thủ công.';if(/INVALID_POSITION/.test(code))return 'Vị trí đã cũ hoặc không hợp lệ. Hãy lấy GPS lại.';return 'Chưa lấy được vị trí. Kiểm tra GPS của máy hoặc chọn địa bàn thủ công.';}
function timed(promise,ms){let timer;return Promise.race([promise,new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('TIMEOUT')),ms);})]).finally(()=>clearTimeout(timer));}
function session({getPosition,getPlace,reference,now=Date.now}={}){let generation=0,value=null;
 async function locate(){const token=++generation;value=null;try{const position=validate(await timed(getPosition(),25000),now());if(token!==generation)return {status:'CANCELLED'};let place=null;try{place=getPlace?await timed(getPlace(position),12000):null;}catch{}if(token!==generation)return {status:'CANCELLED'};const candidates=place&&position.coords.accuracy<=3000?provinceMatches(place,reference):[];value={status:place?'LOCATED':'NAME_UNAVAILABLE',accuracy:position.coords.accuracy,at:now(),place:place?Object.fromEntries(['countryCode','country','province','district','locality','ward'].map(k=>[k,String(place[k]||'').slice(0,100)])):null,candidates,confirmed:null};return value;}catch(error){if(token!==generation)return {status:'CANCELLED'};return {status:'ERROR',message:errorMessage(error)};}}
 function confirm(id){const item=reference?.data?.provinces?.find(x=>x.id===id);if(!item)return false;generation++;value={...(value||{status:'MANUAL',place:null}),at:now(),confirmed:{id:item.id,name:item.name}};return true;}
 function current(){if(!value||now()-value.at>1800000)return null;return value.confirmed;}
 function clear(){generation++;value=null;}
 return {locate,confirm,current,clear};}
return Object.freeze({validate,provinceMatches,errorMessage,session});
});
