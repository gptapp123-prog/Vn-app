'use strict';
const assert=require('node:assert/strict');
const vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const trust=require('../core/trust-registry.js');
const evidence=require('../core/evidence.js');
const engine=require('../engine.js');
const base=path.join(__dirname,'..');
const context={window:{},URL};vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(base,'data.js'),'utf8'),context);
const data=context.window.VN_DATA;
const {create}=require('../core/orchestrator.js');
const runtime=create(engine,data,trust,evidence);
let checks=0;const ok=(v,msg)=>{assert.ok(v,msg);checks++};const equal=(a,b)=>{assert.equal(a,b);checks++};
const registry=trust.fromCatalog(data);
ok(runtime&&runtime.selfCheck().intents===20,'preserve 20 intents');
ok(registry.allowedCount>=20,'sources loaded');
equal(data.apps.length,9);equal(data.sites.length,13);equal(data.tasks.length,13);
const modified={apps:data.apps.map(a=>({...a})),sites:[]};modified.apps[0].android='https://play.google.com/store/apps/details?id=imposter';
equal(trust.fromCatalog(modified).validUrl(modified.apps[0].android),false);
const alteredSites={apps:[],sites:[{url:'https://untrusted.example.gov/',agency:'Unknown'}]};
equal(trust.fromCatalog(alteredSites).validUrl('https://untrusted.example.gov/'),false);
for(const url of ['https://www.csgt.vn/','https://dichvucong.gov.vn/','https://baohiemxahoi.gov.vn/','https://play.google.com/store/apps/details?id=com.bhxhapp'])ok(registry.resolve(url).ok,url);
for(const url of [
 'http://dichvucong.gov.vn/','javascript:alert(1)','https://dichvucong.gov.vn.evil.example/',
 'https://dichvucong.gov.vn@evil.example/','https://dichvucong.gov.vn:8443/',
 'https://evil.example/?next=https://dichvucong.gov.vn/','https://dichvucong.gov.vn/#fake',
 'https://dichvucong.gov.vn/redirect?url=https://evil.example/',
 'https://play.google.com/store/apps/details?id=imposter'] )equal(registry.resolve(url).ok,false);
const legacy='https://dichvucong.gov.vn/p/home/dvc-tthc-thu-tuc-hanh-chinh-chi-tiet.html?ma_thu_tuc=372344';
const redirected=registry.resolve(legacy);ok(redirected.ok&&redirected.changed,'legacy marks changed');equal(redirected.record.url,'https://dichvucong.gov.vn/');
const cases=[['phạt nguội','phatnguoi'],['đổi GPLX','doigplx'],['mất bằng lái','caplaigplx'],['thẻ BHYT còn hạn không','bhytvalid'],['thông báo lưu trú','luutru'],['nghĩa vụ quân sự','nghiavu'],['báo cháy khẩn cấp','khan'],['nộp thuế','nopthue']];
for(const [text,id] of cases){const r=runtime.process(text);ok(r.results.some(x=>x.id===id),text);ok(r.results.every(x=>x.actions.every(a=>registry.validUrl(a.url))),text);}
const gplx=runtime.process('đổi GPLX').results[0];equal(gplx.actions[0].level,'direct');equal(gplx.actions[0].url,'https://dvc-gplx.csgt.bocongan.gov.vn/p/home/dvc-cap-doi-gplx.html');ok(!gplx.actions[0].reviewNeeded,'explicit task URL');
const bhyt=runtime.process('kiểm tra thẻ BHYT').results[0];equal(bhyt.actions[0].level,'direct');
const legal=runtime.process('lệ phí đổi GPLX bao nhiêu?').results[0];ok(legal.decision.requiresEvidence,'legal cost needs evidence');equal(legal.decision.outcome,'SOURCE_CHECK_REQUIRED');
const personal=runtime.process('BHXH của tôi').results[0];equal(personal.decision.outcome,'EXTERNAL_AUTH_REQUIRED');
const urgent=runtime.process('cháy nhà, cần cấp cứu');equal(urgent.results[0].decision.outcome,'EMERGENCY_HANDOFF');
for(const input of ['BHYT 012345678901 của tôi','phạt nguội xe 59A-123.45','tôi@gmail.com hỏi về mã số thuế','Hồ sơ số 0123456789']){
 const r=runtime.process(input);ok(r.sensitive,'PII warning');
 for(const bad of ['012345678901','59A-123.45','tôi@gmail.com','0123456789'])ok(!JSON.stringify(r).includes(bad),'PII not echoed');
}
const unknown=runtime.process('môn thể thao cầu lông trường làng');equal(unknown.status,'NO_VERIFIED_ROUTE');equal(unknown.results.length,0);
const zero=runtime.process('012345678901');equal(zero.status,'PRIVATE_INPUT');
for(const [input,expected] of [['đổi GPLX','MATCHED'],['tra cứu thuế và BHYT','MULTIPLE_MATCHES'],['','EMPTY']])equal(runtime.process(input).status,expected);
const source=fs.readFileSync(path.join(base,'core/orchestrator.js'),'utf8');
for(const risky of ['fetch(', 'localStorage', 'sessionStorage', 'indexedDB', 'XMLHttpRequest', 'sendBeacon', 'console.log'])ok(!source.includes(risky),'No network/storage in core: '+risky);
console.log(`PASS V3 PIPELINE: ${checks} assertions.`);
