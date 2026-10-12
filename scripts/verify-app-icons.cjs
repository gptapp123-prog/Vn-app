'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const root=path.join(__dirname,'..'),ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'data.js'),'utf8'),ctx);
const registry=require('../core/app-icons'),water=require('../core/water-routing'),sources=JSON.parse(fs.readFileSync(path.join(root,'assets/app-icons/sources.json'),'utf8'));
const apps=[...ctx.window.VN_DATA.apps,...Object.values(water.APPS),...require('../core/life-services').APPS,...require('../core/public-services').APPS];
for(const app of apps){
 const file=registry.resolve(app);assert(file,`Missing official icon: ${app.id}`);
 const source=sources[app.id];assert(source,`Missing source: ${app.id}`);
 assert.equal(new URL(app.android).searchParams.get('id'),source.packageId,`Wrong app identity: ${app.id}`);
 assert.equal(file,source.path);assert.equal(new URL(source.storeUrl).hostname,'play.google.com');
 const data=fs.readFileSync(path.join(root,file));assert(data.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])));
 assert.equal(data.readUInt32BE(16),512);assert.equal(data.readUInt32BE(20),512);
 assert.equal(crypto.createHash('sha256').update(data).digest('hex'),source.sha256,`Changed artwork: ${app.id}`);
}
assert.equal(new Set(apps.map(a=>registry.resolve(a))).size,apps.length,'Icons must not be substituted between apps');
console.log(`PASS: ${apps.length}/${apps.length} official store icons, exact identities and image hashes.`);
