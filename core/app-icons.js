/* Exact store identities and bundled original app artwork. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.VN_APP_ICONS=api;})(typeof globalThis!=='undefined'?globalThis:this,function(){
'use strict';
const icons=Object.freeze({
  "icpv": {
    "path": "assets/app-icons/icpv.png",
    "android": "https://play.google.com/store/apps/details?id=vn.dcs.icpvbook",
    "ios": "https://apps.apple.com/vn/app/icpv-book/id6744908429"
  },
  "congdanso": {
    "path": "assets/app-icons/congdanso.png",
    "android": "https://play.google.com/store/apps/details?id=vn.gov.tphcm.hcmccitizen",
    "ios": "https://apps.apple.com/vn/app/c%C3%B4ng-d%C3%A2n-s%E1%BB%91-tphcm/id6737809050"
  },
  "vnetraffic": {
    "path": "assets/app-icons/vnetraffic.png",
    "android": "https://play.google.com/store/apps/details?id=com.ots.c08.vnetraffic",
    "ios": "https://apps.apple.com/vn/app/vnetraffic/id6475181815"
  },
  "vneid": {
    "path": "assets/app-icons/vneid.png",
    "android": "https://play.google.com/store/apps/details?id=com.vnid",
    "ios": "https://apps.apple.com/vn/app/vneid/id1582750372"
  },
  "evncskh": {
    "path": "assets/app-icons/evncskh.png",
    "android": "https://play.google.com/store/apps/details?id=com.evn.cskh.vn",
    "ios": "https://apps.apple.com/vn/app/evn-cskh/id6754793134"
  },
  "momo": {
    "path": "assets/app-icons/momo.png",
    "android": "https://play.google.com/store/apps/details?id=com.mservice.momotransfer"
  },
  "vssid": {
    "path": "assets/app-icons/vssid.png",
    "android": "https://play.google.com/store/apps/details?id=com.bhxhapp",
    "ios": "https://apps.apple.com/vn/app/vssid/id1521647264"
  },
  "etax": {
    "path": "assets/app-icons/etax.png",
    "android": "https://play.google.com/store/apps/details?id=com.etax.icanhan",
    "ios": "https://apps.apple.com/vn/app/etax-mobile/id1589750682"
  },
  "help114": {
    "path": "assets/app-icons/help114.png",
    "android": "https://play.google.com/store/apps/details?id=com.mobicall.mobicall114",
    "ios": "https://apps.apple.com/vn/app/help-114/id1262343518"
  },
  "sos": {
    "path": "assets/app-icons/sos.png",
    "android": "https://play.google.com/store/apps/details?id=com.ots.cbkc.catp",
    "ios": "https://apps.apple.com/vn/app/sos-an-ninh-tr%E1%BA%ADt-t%E1%BB%B1-catp-hcm/id6742221934"
  },
  "payoo": {
    "path": "assets/app-icons/payoo.png",
    "android": "https://play.google.com/store/apps/details?id=vn.payoo"
  },
  "medpro": {
    "android": "https://play.google.com/store/apps/details?id=vn.com.medpro",
    "ios": "https://apps.apple.com/us/app/medpro-%C4%91%E1%BA%B7t-l%E1%BB%8Bch-kh%C3%A1m-b%E1%BB%87nh/id1481561748",
    "path": "assets/app-icons/medpro.png"
  },
  "umccare": {
    "android": "https://play.google.com/store/apps/details?id=vn.com.umc.patient",
    "ios": "https://apps.apple.com/us/app/umc-care/id1484775684",
    "path": "assets/app-icons/umccare.png"
  },
  "vnedu": {
    "android": "https://play.google.com/store/apps/details?id=com.vnptit.vnedu.parent",
    "ios": "https://apps.apple.com/vn/app/vnedu-connect/id1448464007",
    "path": "assets/app-icons/vnedu.png"
  },
  "vtvgo": {
    "android": "https://play.google.com/store/apps/details?id=vn.vtv.vtvgo",
    "ios": "https://apps.apple.com/us/app/vtvgo-truy%E1%BB%81n-h%C3%ACnh-s%E1%BB%91-qu%E1%BB%91c-gia/id1072038396",
    "path": "assets/app-icons/vtvgo.png"
  },
  "tiki": {
    "android": "https://play.google.com/store/apps/details?id=vn.tiki.app.tikiandroid",
    "ios": "https://apps.apple.com/vn/app/tiki-t%E1%BB%91t-nhanh/id958100553",
    "path": "assets/app-icons/tiki.png"
  },
  "shopee": {
    "android": "https://play.google.com/store/apps/details?id=com.shopee.vn",
    "ios": "https://apps.apple.com/vn/app/shopee-mua-s%E1%BA%AFm-online/id959841449",
    "path": "assets/app-icons/shopee.png"
  },
  "lazada": {
    "android": "https://play.google.com/store/apps/details?id=com.lazada.android",
    "ios": "https://apps.apple.com/vn/app/lazada-10-10-sale/id785385147",
    "path": "assets/app-icons/lazada.png"
  },
  "samsungmembers": {
    "android": "https://play.google.com/store/apps/details?id=com.samsung.android.voc",
    "path": "assets/app-icons/samsungmembers.png"
  },
  "icpvtthc": {
    "path": "assets/app-icons/icpvtthc.png",
    "android": "https://play.google.com/store/apps/details?id=com.vnpt.dvc.vptw",
    "ios": "https://apps.apple.com/vn/app/icpv-tthc/id6757136196"
  }
});
function resolve(app){if(!app)return '';const direct=Object.hasOwn(icons,app.id)?icons[app.id]:null;if(direct)return direct.path;const item=Object.values(icons).find(x=>(app.android&&x.android===app.android)||(app.ios&&x.ios===app.ios));return item?item.path:'';}
return Object.freeze({icons,resolve});
});
