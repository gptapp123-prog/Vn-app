'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),Module=require('node:module'),path=require('node:path'),L=require('../core/location-context');
const R=require('../core/reference-directory');let now=Date.now();const fix=()=>({coords:{latitude:10.75,longitude:106.6,accuracy:20},timestamp:now});
(async()=>{
 let positionCalls=0,placeCalls=0;const session=L.session({reference:R,now:()=>now,getPosition:async()=>{positionCalls++;return fix();},getPlace:async()=>{placeCalls++;return {countryCode:'VN',province:'Ho Chi Minh City',ward:'Bình Tân'};}});
 assert.equal(positionCalls,0);assert.equal(session.current(),null);const located=await session.locate();assert.equal(located.status,'LOCATED');assert.equal(located.candidates[0].id,'79');assert(!('coords' in located));assert.equal(session.current(),null);assert(session.confirm('79'));assert.equal(session.current().id,'79');now+=1800001;assert.equal(session.current(),null);now=Date.now();
 assert.throws(()=>L.validate({...fix(),timestamp:now-130000},now),/INVALID_POSITION/);assert.throws(()=>L.validate({coords:{latitude:100,longitude:1,accuracy:1},timestamp:now}),/INVALID_POSITION/);
 assert.equal(L.provinceMatches({countryCode:'US',province:'Hanoi'},R).length,0);
 const denied=L.session({reference:R,getPosition:async()=>{throw {code:1};}});assert.match((await denied.locate()).message,/quyền/);
 const noName=L.session({reference:R,getPosition:async()=>fix()});assert.equal((await noName.locate()).status,'NAME_UNAVAILABLE');assert(noName.confirm('01'));assert.equal(noName.current().id,'01');
 const low=L.session({reference:R,getPosition:async()=>({...fix(),coords:{...fix().coords,accuracy:5000}}),getPlace:async()=>({countryCode:'VN',province:'Hà Nội'})});assert.equal((await low.locate()).candidates.length,0);
 let resolve;const slow=L.session({reference:R,getPosition:()=>new Promise(r=>{resolve=r;}),getPlace:async()=>{throw Error('Should not geocode after clear');}});const pending=slow.locate();slow.clear();resolve(fix());assert.equal((await pending).status,'CANCELLED');assert.equal(slow.current(),null);
 let resolve2;const manual=L.session({reference:R,getPosition:()=>new Promise(r=>{resolve2=r;})});const pending2=manual.locate();manual.confirm('01');resolve2(fix());assert.equal((await pending2).status,'CANCELLED');assert.equal(manual.current().id,'01');
 const listeners={},panel={innerHTML:''};let called=0;const ctx={VN_LOCATION:L,VN_REFERENCE:R,VN_MOBILE:{getPosition:async()=>{called++;return fix();},getPlace:async()=>({countryCode:'VN',province:'Hà Nội',ward:'<img>'})},document:{getElementById:()=>panel,addEventListener:(k,fn)=>listeners[k]=fn},Date,Promise};ctx.window=ctx;vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../location-ui.js'),'utf8'),ctx);assert.equal(called,0);assert(panel.innerHTML.includes('Lấy vị trí GPS'));
 await listeners.click({target:{closest:sel=>sel==='[data-location-get]'?{}:null}});assert.equal(called,1);assert(panel.innerHTML.includes('&lt;img&gt;'));assert.equal(ctx.VN_LOCATION_UI.current(),null);listeners.submit({preventDefault(){},target:{id:'locationConfirmForm',elements:{province:{value:'01'}}}});assert.equal(ctx.VN_LOCATION_UI.current().id,'01');ctx.VN_LOCATION_UI.clear();assert.equal(ctx.VN_LOCATION_UI.current(),null);
 const html=fs.readFileSync(path.join(__dirname,'../index.html'),'utf8');assert(html.indexOf('core/reference-directory.js')<html.indexOf('location-ui.js'));assert(html.includes('id="locationPanel"'));
 const manifest=fs.readFileSync(path.join(__dirname,'../android/app/src/main/AndroidManifest.xml'),'utf8');assert(manifest.includes('ACCESS_FINE_LOCATION'));assert(manifest.includes('ACCESS_COARSE_LOCATION'));assert(!manifest.includes('ACCESS_BACKGROUND_LOCATION'));
 const setup=fs.readFileSync(path.join(__dirname,'ui-smoke.test.js'),'utf8').split("assert.ok(els.routeBody.innerHTML.includes('app-launcher'));")[0];
 const cases=`
 context.VN_LOCATION_UI={current:()=>({id:'79',name:'TP Hồ Chí Minh'}),place:()=>({province:'TP Hồ Chí Minh',ward:'Bình Tân',country:'Việt Nam'})};
 function search(q){els.searchInput.value=q;handlers['searchForm:submit']({preventDefault(){}});return els.routeBody.innerHTML;}
 let html=search('tôi đang ở đâu');assert(html.includes('Bình Tân'));assert(!html.includes('class="primary"'));
 html=search('đóng tiền nước ở đây');assert(html.includes('data-water-provider'));assert(!html.includes('value="day'));assert(!html.includes('data-open-water-app'));
 html=search('đóng tiền nước nông thôn Long An');assert(!html.includes('data-water-provider="sawaco-nt"'));assert(!html.includes('data-open-water-app'));
 html=search('đóng tiền điện ở đây');assert(html.includes('EVNHCMC'));html=search('đóng tiền điện Hà Nội');assert(html.includes('EVNHANOI'));assert(!html.includes('EVNHCMC'));
 context.VN_LOCATION_UI.current=()=>null;context.VN_LOCATION_UI.place=()=>null;html=search('nơi đây là đâu');assert(html.includes('Lấy vị trí GPS'));html=search('đóng tiền nước ở đây');assert(html.includes('Bạn ở tỉnh/thành nào?'));
 html=search('tôi đang ở đâu, cháy nhà');assert(html.includes('tel:114'));assert(!html.includes('Tên địa bàn do thiết bị trả về'));
 console.log('PASS 3.29 location journeys: consent only on click, device place name, manual confirmation, no persistence, stale/inaccurate/cancelled/outside-VN positions, location query, local utility context, explicit-place precedence and emergency priority.');`;
 const m=new Module(path.join(__dirname,'location-journeys-runtime.js'),module);m.filename=path.join(__dirname,'location-journeys-runtime.js');m.paths=module.paths;m._compile(setup+'\n'+cases,m.filename);
})().catch(e=>{console.error(e);process.exitCode=1;});
