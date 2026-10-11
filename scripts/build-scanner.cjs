const path=require('node:path');
require('esbuild').buildSync({entryPoints:[path.join(__dirname,'../mobile/scanner-entry.js')],bundle:true,minify:true,format:'iife',target:['es2020'],legalComments:'eof',outfile:path.join(__dirname,'../scanner-decoder.js')});
