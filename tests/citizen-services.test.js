'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const U=require('../core/citizen-services.js'),L=require('../core/app-launch.js');
assert.equal(U.GROUPS.length,8);assert.equal(U.SERVICES.length,39);assert.equal(U.SCENARIOS.length,7);
assert.equal(new Set(U.SERVICES.map(x=>x.id)).size,39);
for(const item of U.SERVICES){assert.ok(U.GROUPS.includes(item.group));assert.ok(item.terms.length);if(item.sourceId)assert.ok(U.SOURCES[item.sourceId]);for(const id of item.appIds)assert.ok(Object.hasOwn(L.PACKAGES,id));assert.equal(U.checklist(item.id).length,3);}
for(const event of U.SCENARIOS)for(const id of event.serviceIds)assert.ok(U.SERVICES.some(x=>x.id===id));
assert.equal(U.match('Tôi muốn làm hộ chiếu').services[0].id,'passport');
assert.equal(U.match('mất căn cước').services[0].id,'identity');
assert.equal(U.match('đặt lịch khám').services[0].kind,'needs-provider');
assert.equal(U.match('mất điện').services[0].id,'outage');
assert.equal(U.match('nhà tôi mất nước').services[0].id,'water-help');
assert.equal(U.match('bản sao giấy khai sinh').status,'MATCH');
assert.equal(U.match('vừa sinh con').scenarios[0].id,'newborn');
assert.equal(U.match('một yêu cầu không trong danh mục').status,'NO_MATCH');
assert.equal(U.match('').status,'EMPTY');assert.equal(U.find('hộ chiếu').length,1);
assert.equal(U.find('hộ chiếu','Thuế & kinh doanh').length,0);
assert.equal(U.match('dau tu crypto').status,'NO_MATCH');
for(const source of Object.values(U.SOURCES)){assert.ok(U.validUrl(source.url));if(source.evidence)assert.ok(U.validUrl(source.evidence));}
assert.equal(U.validUrl('https://dichvucong.gov.vn/evil'),false);assert.equal(U.validUrl('https://dichvucong.gov.vn/?redirect=https://evil.example'),false);
assert.equal(L.request('vneid',null).status,'NATIVE_LAUNCH_UNAVAILABLE');
let called=[];const bridge={openKnownApp(id){called.push(id);return 'REQUESTED';}};
assert.equal(L.request('vneid',bridge).status,'LAUNCH_REQUESTED');assert.deepEqual(called,['vneid']);
for(const id of ['constructor','__proto__','unknown','com.vnid','https://evil.example/'])assert.equal(L.request(id,bridge).status,'UNKNOWN_APP');
assert.deepEqual(called,['vneid']);
assert.equal(L.request('etax',{openKnownApp(){return 'NOT_INSTALLED'}}).status,'NOT_INSTALLED');
assert.equal(L.request('etax',{openKnownApp(){throw Error('device secret')}}).status,'LAUNCH_FAILED');
assert.equal(L.request('etax',{openKnownApp(){return Promise.resolve('REQUESTED')}}).status,'LAUNCH_FAILED');
const java=fs.readFileSync(path.join(__dirname,'../native/android/KnownAppLauncher.java'),'utf8'),xml=fs.readFileSync(path.join(__dirname,'../native/android/manifest-queries.xml'),'utf8');
for(const [id,pkg] of Object.entries(L.PACKAGES)){assert.ok(java.includes('ids.put("'+id+'", "'+pkg+'")'));assert.ok(xml.includes('android:name="'+pkg+'"'));}
assert.ok(java.includes('report(appId, "LAUNCH_FAILED")'));
(async()=>{await assert.rejects(U.repository(null).list());await assert.rejects(U.repository(null).set('CCCD 123456789012',true),/danh mục công khai/);console.log('PASS: 39 citizen routes, 7 scenarios, no guessed booking, ambiguity, exact sources and native pins, private ids rejected.');})().catch(e=>{console.error(e);process.exitCode=1;});
