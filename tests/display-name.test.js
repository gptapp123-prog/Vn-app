'use strict';
const fs=require('node:fs'),path=require('node:path'),Module=require('node:module');
const filename=path.join(__dirname,'ui-smoke.test.js');
const setup=fs.readFileSync(filename,'utf8').split("assert.ok(els.routeBody.innerHTML.includes('app-launcher'));")[0]
 .replace("'actionStatus'];","'actionStatus','displayNameButton','displayNameText','displayNameInput','displayNameStatus'];")
 .replace('const context={scrollTo()',"const context={indexedDB:require('fake-indexeddb').indexedDB,scrollTo()");
const cases=`
(async()=>{
 const N=require('../core/display-name'),repo=N.repository(context.indexedDB);
 assert.equal(N.validate('  Anh   Toàn  '),'Anh Toàn');
 assert.throws(()=>N.validate('<script>'),/ký tự/);
 assert.throws(()=>N.validate('x'.repeat(61)),/60/);
 assert.equal(await repo.get(),'');
 const submit=async value=>{const form={id:'displayNameForm',elements:{name:{value},saveName:{disabled:false}}};await handlers['document:submit']({preventDefault(){},target:form});return form;};
 await submit('  Anh   Toàn  ');assert.equal(await N.repository(context.indexedDB).get(),'Anh Toàn');assert.equal(els.displayNameText.textContent,'Anh Toàn');assert.equal(els.displayNameStatus.textContent,'Đã lưu tên.');
 handlers['displayNameButton:click']();assert(els.routeBody.innerHTML.includes('Tên hiển thị'));assert(els.routeBody.innerHTML.includes('value="Anh Toàn"'));assert.equal(els.displayNameButton.hidden,true);
 await submit('Tên mới');assert.equal(await repo.get(),'Tên mới');assert.equal(els.displayNameText.textContent,'Tên mới');
 const failed=await submit('<img>');assert.equal(await repo.get(),'Tên mới');assert.equal(els.displayNameText.textContent,'Tên mới');assert.equal(failed.elements.saveName.disabled,false);
 await submit('');assert.equal(await repo.get(),'');assert.equal(els.displayNameText.textContent,'Tên hiển thị');
 const html=fs.readFileSync(path.join(base,'index.html'),'utf8');assert(html.indexOf('id="displayNameButton"')<html.indexOf('<h1>Bạn cần tra cứu gì?</h1>'));
 assert.equal(els.searchInput.value,'');
 await assert.rejects(N.repository(null).get(),/hỗ trợ/);
 console.log('PASS display name: IndexedDB persistence across repository instances, change/clear, validation failure preserves saved name, name position and unchanged search.');
})().catch(error=>{console.error(error);process.exitCode=1;});
`;
const run=new Module(filename,module);run.filename=filename;run.paths=Module._nodeModulePaths(__dirname);run._compile(setup+cases,filename);
