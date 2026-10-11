const fs=require('node:fs');
const path=require('node:path');
const U=require('../core/citizen-services.js');
fs.writeFileSync(path.join(__dirname,'../citizen-services.json'),JSON.stringify({schemaVersion:1,reviewedAt:'2026-10-11',groups:U.GROUPS,services:U.SERVICES,scenarios:U.SCENARIOS,sources:U.SOURCES},null,2)+'\n');
