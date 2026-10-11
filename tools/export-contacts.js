'use strict';
const fs=require('node:fs'),path=require('node:path'),R=require('../core/reference-directory.js');
fs.writeFileSync(path.join(__dirname,'../public-contacts.json'),JSON.stringify({schemaVersion:1,reviewedAt:R.data.reviewedAt,coverage:'17 curated public contacts; not a nationwide provider directory',contacts:R.contacts},null,2)+'\n');
console.log('Exported '+R.contacts.length+' public contacts.');
