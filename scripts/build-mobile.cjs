const fs=require('node:fs'),path=require('node:path'),esbuild=require('esbuild');
require('./verify-app-icons.cjs');
require('./build-scanner.cjs');
const base=path.join(__dirname,'..'),out=path.join(base,'www');fs.mkdirSync(out,{recursive:true});
for(const file of ['index.html','styles.css','ui-design.css','icon.svg','icon.png','apple-touch-icon.png','data.js','engine.js','script.js','reference-data.js','online.js','product-ui.js','scanner-decoder.js','contacts-ui.js','contacts-template.json','THIRD_PARTY_NOTICES.txt'])fs.copyFileSync(path.join(base,file),path.join(out,file));
fs.cpSync(path.join(base,'assets/app-icons'),path.join(out,'assets/app-icons'),{recursive:true});
fs.cpSync(path.join(base,'core'),path.join(out,'core'),{recursive:true});
let html=fs.readFileSync(path.join(out,'index.html'),'utf8');html=html.replace('<script src="data.js">','<script src="native.js"></script><script src="data.js">');fs.writeFileSync(path.join(out,'index.html'),html);
esbuild.buildSync({entryPoints:[path.join(base,'mobile/native-entry.js')],bundle:true,minify:true,format:'iife',target:['es2020'],outfile:path.join(out,'native.js')});console.log('Mobile web bundle built.');
