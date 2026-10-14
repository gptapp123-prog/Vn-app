/* Extract utility intent separately from provider/place words; no destinations invented. */
(function(r,f){const a=f();if(typeof module==='object'&&module.exports)module.exports=a;if(r)r.VN_UTILITY=a;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/gi,'d').toLowerCase().replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();
function parse(raw,kind){const q=normalize(raw);const rural=/\b(?:nong thon|hop tac xa)\b/.test(q);let intent='lookup';
 if(/\b(?:da dong|da nop|dong roi|nop roi|tra roi|lich su|chua thanh toan|chua dong|chua nop|con no|no bao nhieu)\b/.test(q))intent='history';
 else if(/\b(?:mat nuoc|cup nuoc|cat nuoc|mat dien|cup dien|cat dien|khong co nuoc|khong co dien|bao su co)\b/.test(q))intent='outage';
 else if(/\b(?:dong|nop|tra|thanh toan)\b/.test(q))intent='payment';
 let query=q.replace(/\b(?:cho toi|giup toi|toi muon|toi can|toi|minh|lam sao|lam the nao|bang cach nao|o dau|o day|tai day|gan toi|gan day|noi nay|noi day|khu vuc nay|nhu the nao|duoc khong|khong biet|chua biet|bao nhieu|lich su|kiem tra|tra cuu|da dong|da nop|dong roi|nop roi|tra roi|chua thanh toan|chua dong|chua nop|con no|no bao nhieu|thanh toan|dong tien|nop tien|tra tien|dong hoa don|nop hoa don|tra hoa don|dong phi|nop phi|tra phi|khoan thu|hoa don|tien|cuoc|bao su co)\b/g,' ');
 const terms=kind==='water'?/\b(?:cong ty nuoc|don vi cap nuoc|nha may nuoc|tram nuoc|cap nuoc|nuoc sach|nuoc nong thon|mat nuoc|cup nuoc|cat nuoc|khong co nuoc|nuoc)\b/g:/\b(?:cong ty dien|don vi dien luc|dien luc|mat dien|cup dien|cat dien|khong co dien|dien)\b/g;
 query=query.replace(terms,' ').replace(/\b(?:nong thon|hop tac xa|cho|cua|tai|o|tren|bang|voi|ho|gia dinh|nay|roi|chua|da|can|muon)\b/g,' ').replace(/\s+/g,' ').trim();
 return {intent,rural:kind==='water'&&rural,query};}
function billingQuestion(raw){return /^(?:(?:toi|minh) (?:muon|can) )?(?:dong tien|nop tien|tra tien|thanh toan|thanh toan hoa don|dong hoa don|nop hoa don)(?: o dau| bang cach nao| nhu the nao)?$/.test(normalize(raw));}
return Object.freeze({normalize,parse,billingQuestion});
});
