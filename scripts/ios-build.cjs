'use strict';
const {spawnSync}=require('node:child_process'),path=require('node:path'),fs=require('node:fs');
const mode=process.argv[2]||'simulator',root=path.join(__dirname,'..');
if(!['simulator','device','archive','export'].includes(mode)){console.error('Chọn simulator, device, archive hoặc export.');process.exit(1);}
if(process.platform!=='darwin'){console.error('Build iOS cần Mac có Xcode. Chưa tạo bản cài iOS trên máy này.');process.exit(1);}
function run(command,args){const r=spawnSync(command,args,{cwd:root,stdio:'inherit'});if(r.status!==0)process.exit(r.status||1);}
run('xcodebuild',['-version']);
const common=['-project','ios/App/App.xcodeproj','-scheme','App'];
const archive=path.join(root,'ios-build/VNApp.xcarchive');
if(mode==='simulator'||mode==='device'){
 const simulator=mode==='simulator';run('xcodebuild',[...common,'-sdk',simulator?'iphonesimulator':'iphoneos','-destination',simulator?'generic/platform=iOS Simulator':'generic/platform=iOS','-configuration',simulator?'Debug':'Release','-derivedDataPath','ios-build','CODE_SIGNING_ALLOWED=NO','build']);
 const app=path.join(root,'ios-build/Build/Products',simulator?'Debug-iphonesimulator':'Release-iphoneos','App.app');if(!fs.existsSync(app))throw Error('Chưa tìm thấy App.app sau build.');
 console.log(simulator?'Đã build cho simulator; không phải bản cài iPhone.':'Đã biên dịch cho iPhone; chưa ký, chưa cài được.');
}else{
 const team=process.env.VN_APP_APPLE_TEAM_ID||'';if(!/^[A-Z0-9]{10}$/.test(team)){console.error('Cần VN_APP_APPLE_TEAM_ID hợp lệ và tài khoản ký đã cấu hình trong Xcode.');process.exit(1);}
 if(mode==='archive'){
  const profile=process.env.VN_APP_PROFILE_UUID,identity=process.env.VN_APP_SIGNING_IDENTITY;
  const signing=profile?['CODE_SIGN_STYLE=Manual','PROVISIONING_PROFILE_SPECIFIER='+profile,'CODE_SIGN_IDENTITY='+identity]:['CODE_SIGN_STYLE=Automatic','-allowProvisioningUpdates'];
  if(profile&&(!/^[A-Fa-f0-9-]{36}$/.test(profile)||!identity)){console.error('Thiếu cấu hình profile hoặc chứng thư ký.');process.exit(1);}
  run('xcodebuild',[...common,'-destination','generic/platform=iOS','-configuration','Release','-archivePath',archive,'DEVELOPMENT_TEAM='+team,...signing,'archive']);
  const app=path.join(archive,'Products/Applications/App.app');if(!fs.existsSync(app))throw Error('Archive chưa chứa ứng dụng.');run('codesign',['--verify','--deep','--strict',app]);console.log('Đã tạo archive có ký. Chưa xuất IPA.');
 }else{
  const opts=process.env.VN_APP_EXPORT_OPTIONS;if(!opts||!fs.existsSync(opts)||!fs.existsSync(archive)){console.error('Cần archive đã ký và VN_APP_EXPORT_OPTIONS trỏ tới ExportOptions.plist từ Xcode.');process.exit(1);}
  run('plutil',['-lint',opts]);run('xcodebuild',['-exportArchive','-archivePath',archive,'-exportOptionsPlist',path.resolve(opts),'-exportPath','ios-build/export',...(process.env.VN_APP_PROFILE_UUID?[]:['-allowProvisioningUpdates'])]);
  const files=fs.readdirSync(path.join(root,'ios-build/export')).filter(n=>n.endsWith('.ipa'));if(!files.length)throw Error('Chưa có IPA sau khi xuất.');console.log('Đã xuất IPA: '+files.join(', '));
 }
}
