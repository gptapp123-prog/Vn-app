/* Versioned guidance gate: never manufacture current legal, medical or personal facts. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.VN_EVIDENCE=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const FACT_QUESTIONS=/(?:^|\s)(?:bao nhieu|muc phat|le phi|phi|han chot|thoi han|dieu kien|can nhung giay to gi|can giay to gi|theo luat|luat nao|nghi dinh nao|co duoc mien|duoc hoan|bao lau|ty le|muc dong)(?:\s|$)/;
const PERSONAL_QUESTIONS=/(?:^|\s)(?:cua toi|cua minh|da dong|da duoc duyet|da xu ly|con han|bi phat|trang thai|ket qua)(?:\s|$)/;
function classify(s,normalizer){const q=normalizer(s);return Object.freeze({requiresUpdatedEvidence:FACT_QUESTIONS.test(' '+q+' '),mightBePersonal:PERSONAL_QUESTIONS.test(' '+q+' ')});}
function gate(result,flags){
 const privateRoute=['AUTH_REQUIRED','AUTH_OR_CAPTCHA'].includes(result.category);
 const requiresSystem=privateRoute||flags.mightBePersonal&&result.category!=='EMERGENCY';
 const requiresEvidence=flags.requiresUpdatedEvidence&&result.category!=='EMERGENCY';
 const outcome=result.category==='EMERGENCY'?'EMERGENCY_HANDOFF':requiresEvidence?'SOURCE_CHECK_REQUIRED':requiresSystem?'EXTERNAL_AUTH_REQUIRED':result.actions.some(a=>a.level==='direct')?'PROCEDURE_LINK_READY':'GUIDANCE_READY';
 const disclaimer=requiresEvidence?'VN App chưa có văn bản hiệu lực được thẩm định cho câu hỏi cụ thể này. Không xác định lệ phí, thời hạn, mức phạt hoặc điều kiện chỉ từ từ khóa.':requiresSystem?'Kết quả hồ sơ hoặc quyền lợi cá nhân chỉ do hệ thống của cơ quan có thẩm quyền cung cấp.':'Đây là hướng dẫn cố định của VN App, không phải kết quả truy vấn trực tiếp từ cơ quan nhà nước.';
 return Object.freeze({outcome,disclaimer,requiresEvidence,requiresSystem});
}
return Object.freeze({classify,gate});
});
