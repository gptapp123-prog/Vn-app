/* Curated primary-source destinations; no diagnosis, prices, inventory or fabricated deep links. */
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./language-understanding'):root.VN_LANGUAGE);if(typeof module==='object'&&module.exports)module.exports=api;else root.VN_LIFE=api;})(typeof window!=='undefined'?window:globalThis,function(L){
'use strict';
const DATA={
  "GROUPS": [
    {
      "id": "health",
      "title": "Y tế",
      "description": "Đặt khám · thuốc · tiêm chủng"
    },
    {
      "id": "learning",
      "title": "Học hành",
      "description": "Điểm · lịch học · kỳ thi · VTV7"
    },
    {
      "id": "shopping",
      "title": "Mua sắm",
      "description": "Tìm hàng · đơn hàng · đổi trả"
    },
    {
      "id": "repair",
      "title": "Sửa chữa",
      "description": "Chọn hãng · bảo hành · đặt lịch"
    }
  ],
  "PROVIDERS": {
    "medpro": {
      "id": "medpro",
      "name": "Medpro",
      "group": "health",
      "aliases": [
        "medpro"
      ],
      "url": "https://medpro.vn/",
      "source": "https://medpro.vn/huong-dan/dat-lich-kham",
      "appId": "medpro",
      "note": "Chọn cơ sở và chuyên khoa tại Medpro; lịch trống do cơ sở cung cấp.",
      "reviewedAt": "2026-10-12"
    },
    "choray": {
      "id": "choray",
      "name": "Bệnh viện Chợ Rẫy",
      "group": "health",
      "aliases": [
        "cho ray",
        "bv cho ray",
        "benh vien cho ray"
      ],
      "url": "https://medpro.vn/cho-ray",
      "source": "https://medpro.vn/tin-tuc/cach-dat-lich-kham-benh-vien-cho-ray",
      "appId": "medpro",
      "note": "",
      "reviewedAt": "2026-10-12"
    },
    "nd115": {
      "id": "nd115",
      "name": "Bệnh viện Nhân dân 115",
      "group": "health",
      "aliases": [
        "nhan dan 115",
        "benh vien 115"
      ],
      "url": "https://medpro.vn/benh-vien-nhan-dan-115",
      "source": "https://medpro.vn/",
      "appId": "medpro",
      "note": "",
      "reviewedAt": "2026-10-12"
    },
    "nhi2": {
      "id": "nhi2",
      "name": "Bệnh viện Nhi đồng 2",
      "group": "health",
      "aliases": [
        "nhi dong 2",
        "nhidong2"
      ],
      "url": "https://medpro.vn/nhidong2",
      "source": "https://medpro.vn/",
      "appId": "medpro",
      "note": "",
      "reviewedAt": "2026-10-12"
    },
    "umc": {
      "id": "umc",
      "name": "Bệnh viện Đại học Y Dược · UMC Care",
      "group": "health",
      "aliases": [
        "dai hoc y duoc",
        "umc care",
        "umc"
      ],
      "url": "",
      "source": "https://play.google.com/store/apps/details?id=vn.com.umc.patient",
      "appId": "umccare",
      "note": "Đặt khám trong UMC Care; chưa có liên kết web mở riêng chức năng được xác minh.",
      "reviewedAt": "2026-10-12"
    },
    "dav": {
      "id": "dav",
      "name": "Cục Quản lý Dược",
      "group": "health",
      "aliases": [
        "cuc quan ly duoc",
        "dav"
      ],
      "url": "https://dichvucong.dav.gov.vn/",
      "source": "https://dichvucong.dav.gov.vn/",
      "appId": "",
      "note": "",
      "reviewedAt": "2026-10-12"
    },
    "hcdc": {
      "id": "hcdc",
      "name": "HCDC · Tiêm chủng TP.HCM",
      "group": "health",
      "aliases": [
        "hcdc",
        "tiem chung tphcm",
        "tiem chung ho chi minh"
      ],
      "url": "https://dangkytiemchung.hcdc.vn/booking",
      "source": "https://hcdc.vn/",
      "appId": "",
      "note": "Lịch này dành cho cơ sở HCDC hiển thị trên trang đặt lịch; không áp dụng cho mọi điểm tiêm.",
      "reviewedAt": "2026-10-12"
    },
    "vnedu": {
      "id": "vnedu",
      "name": "vnEdu Connect · VNPT",
      "group": "learning",
      "aliases": [
        "vnedu",
        "vn edu",
        "vnpt"
      ],
      "url": "https://tracuu.vnedu.vn/",
      "source": "https://vnpt.vn/doanh-nghiep/tu-van/vnedu-connect",
      "appId": "vnedu",
      "note": "Cần trường sử dụng vnEdu và tài khoản do nhà trường đăng ký. Trang web chưa xác nhận truy cập ổn định; có thể dùng app.",
      "reviewedAt": "2026-10-12"
    },
    "exam": {
      "id": "exam",
      "name": "Hệ thống thí sinh · Bộ GDĐT",
      "group": "learning",
      "aliases": [
        "thi thpt",
        "thi tot nghiep",
        "bo giao duc"
      ],
      "url": "https://thisinh.thitotnghiepthpt.edu.vn/",
      "source": "https://xaydungchinhsach.chinhphu.vn/tra-cuu-diem-thi-tot-nghiep-thpt-2026-119260618122338248.htm",
      "appId": "",
      "note": "Dùng tài khoản thí sinh tại hệ thống Bộ GDĐT; các chức năng mở theo lịch của kỳ thi.",
      "reviewedAt": "2026-10-12"
    },
    "vtv7": {
      "id": "vtv7",
      "name": "VTV7 · Kênh giáo dục",
      "group": "learning",
      "aliases": [
        "vtv7",
        "vtv 7",
        "vtvgo",
        "vtv go"
      ],
      "url": "https://vtvgo.vn/channel/27",
      "source": "https://vtvgo.vn/channel/27",
      "appId": "vtvgo",
      "note": "",
      "reviewedAt": "2026-10-12"
    },
    "tiki": {
      "id": "tiki",
      "name": "Tiki",
      "group": "shopping",
      "aliases": [
        "tiki"
      ],
      "url": "https://tiki.vn/",
      "source": "https://tiki.vn/",
      "appId": "tiki",
      "note": "",
      "reviewedAt": "2026-10-12"
    },
    "shopee": {
      "id": "shopee",
      "name": "Shopee",
      "group": "shopping",
      "aliases": [
        "shopee",
        "shop pi"
      ],
      "url": "https://shopee.vn/",
      "source": "https://apps.apple.com/vn/app/shopee-mua-s%E1%BA%AFm-online/id959841449",
      "appId": "shopee",
      "note": "",
      "reviewedAt": "2026-10-12"
    },
    "lazada": {
      "id": "lazada",
      "name": "Lazada",
      "group": "shopping",
      "aliases": [
        "lazada",
        "la za da"
      ],
      "url": "https://www.lazada.vn/",
      "source": "https://www.lazada.vn/",
      "appId": "lazada",
      "note": "",
      "reviewedAt": "2026-10-12"
    },
    "samsung": {
      "id": "samsung",
      "name": "Samsung Việt Nam",
      "group": "repair",
      "aliases": [
        "samsung",
        "sam sung"
      ],
      "url": "https://www.samsung.com/vn/support/supportServiceCenter/",
      "source": "https://www.samsung.com/vn/support/supportServiceCenter/",
      "appId": "samsungmembers",
      "note": "",
      "reviewedAt": "2026-10-12"
    },
    "apple": {
      "id": "apple",
      "name": "Apple",
      "group": "repair",
      "aliases": [
        "apple",
        "iphone",
        "ipad",
        "macbook"
      ],
      "url": "https://support.apple.com/vi-vn/repair",
      "source": "https://support.apple.com/vi-vn/repair",
      "appId": "",
      "note": "",
      "reviewedAt": "2026-10-12"
    },
    "lg": {
      "id": "lg",
      "name": "LG Việt Nam",
      "group": "repair",
      "aliases": [
        "lg"
      ],
      "url": "https://www.lg.com/vn/tro-giup/ho-tro-san-pham/yeu-cau-sua-chua/",
      "source": "https://www.lg.com/vn/dich-vu-bao-duong-bao-hanh/",
      "appId": "",
      "note": "",
      "reviewedAt": "2026-10-12"
    },
    "toshiba": {
      "id": "toshiba",
      "name": "Toshiba Việt Nam",
      "group": "repair",
      "aliases": [
        "toshiba"
      ],
      "url": "https://www.toshiba-lifestyle.com/vn/service-center",
      "source": "https://www.toshiba-lifestyle.com/vn/service-center",
      "appId": "",
      "note": "",
      "reviewedAt": "2026-10-12"
    },
    "hocmai": {
      "id": "hocmai",
      "name": "HOCMAI",
      "group": "learning",
      "aliases": [
        "hocmai",
        "hoc mai"
      ],
      "url": "https://hocmai.vn/",
      "source": "https://hocmai.vn/",
      "appId": "",
      "note": "",
      "reviewedAt": "2026-10-12"
    }
  },
  "APPS": [
    {
      "id": "medpro",
      "name": "Medpro",
      "group": "Y tế",
      "short": "Đặt lịch khám theo cơ sở, bác sĩ và chuyên khoa",
      "agency": "Công ty Cổ phần Ứng dụng PKH",
      "site": "https://medpro.vn/",
      "android": "https://play.google.com/store/apps/details?id=vn.com.medpro",
      "ios": "https://apps.apple.com/us/app/medpro-%C4%91%E1%BA%B7t-l%E1%BB%8Bch-kh%C3%A1m-b%E1%BB%87nh/id1481561748",
      "keywords": "Đặt lịch khám theo cơ sở, bác sĩ và chuyên khoa",
      "bills": []
    },
    {
      "id": "umccare",
      "name": "UMC Care",
      "group": "Y tế",
      "short": "Đặt khám và quản lý hồ sơ tại Bệnh viện Đại học Y Dược",
      "agency": "Bệnh viện Đại học Y Dược TP.HCM",
      "site": "",
      "android": "https://play.google.com/store/apps/details?id=vn.com.umc.patient",
      "ios": "https://apps.apple.com/us/app/umc-care/id1484775684",
      "keywords": "Đặt khám và quản lý hồ sơ tại Bệnh viện Đại học Y Dược",
      "bills": []
    },
    {
      "id": "vnedu",
      "name": "vnEdu Connect",
      "group": "Học hành",
      "short": "Kết quả học tập, lịch học và liên lạc với nhà trường",
      "agency": "VNPT",
      "site": "https://vnpt.vn/doanh-nghiep/tu-van/vnedu-connect",
      "android": "https://play.google.com/store/apps/details?id=com.vnptit.vnedu.parent",
      "ios": "https://apps.apple.com/vn/app/vnedu-connect/id1448464007",
      "keywords": "Kết quả học tập, lịch học và liên lạc với nhà trường",
      "bills": []
    },
    {
      "id": "vtvgo",
      "name": "VTVgo",
      "group": "Học hành",
      "short": "Xem kênh giáo dục VTV7 và các kênh VTV",
      "agency": "Đài Truyền hình Việt Nam",
      "site": "https://vtvgo.vn/channel/27",
      "android": "https://play.google.com/store/apps/details?id=vn.vtv.vtvgo",
      "ios": "https://apps.apple.com/us/app/vtvgo-truy%E1%BB%81n-h%C3%ACnh-s%E1%BB%91-qu%E1%BB%91c-gia/id1072038396",
      "keywords": "Xem kênh giáo dục VTV7 và các kênh VTV",
      "bills": []
    },
    {
      "id": "tiki",
      "name": "Tiki",
      "group": "Mua sắm",
      "short": "Tìm sản phẩm, quản lý đơn hàng và hỗ trợ mua hàng",
      "agency": "Tiki",
      "site": "https://tiki.vn/",
      "android": "https://play.google.com/store/apps/details?id=vn.tiki.app.tikiandroid",
      "ios": "https://apps.apple.com/vn/app/tiki-t%E1%BB%91t-nhanh/id958100553",
      "keywords": "Tìm sản phẩm, quản lý đơn hàng và hỗ trợ mua hàng",
      "bills": []
    },
    {
      "id": "shopee",
      "name": "Shopee",
      "group": "Mua sắm",
      "short": "Mua hàng và hỗ trợ đơn hàng trên Shopee",
      "agency": "Shopee",
      "site": "https://shopee.vn/",
      "android": "https://play.google.com/store/apps/details?id=com.shopee.vn",
      "ios": "https://apps.apple.com/vn/app/shopee-mua-s%E1%BA%AFm-online/id959841449",
      "keywords": "Mua hàng và hỗ trợ đơn hàng trên Shopee",
      "bills": []
    },
    {
      "id": "lazada",
      "name": "Lazada",
      "group": "Mua sắm",
      "short": "Mua hàng và hỗ trợ đơn hàng trên Lazada",
      "agency": "Lazada",
      "site": "https://www.lazada.vn/",
      "android": "https://play.google.com/store/apps/details?id=com.lazada.android",
      "ios": "https://apps.apple.com/vn/app/lazada-10-10-sale/id785385147",
      "keywords": "Mua hàng và hỗ trợ đơn hàng trên Lazada",
      "bills": []
    },
    {
      "id": "samsungmembers",
      "name": "Samsung Members",
      "group": "Sửa chữa",
      "short": "Hỗ trợ và kiểm tra thiết bị Samsung",
      "agency": "Samsung Electronics",
      "site": "https://www.samsung.com/vn/support/supportServiceCenter/",
      "android": "https://play.google.com/store/apps/details?id=com.samsung.android.voc",
      "ios": "",
      "keywords": "Hỗ trợ và kiểm tra thiết bị Samsung",
      "bills": []
    }
  ],
  "SERVICES": [
    {
      "id": "appointment",
      "title": "Đặt lịch khám",
      "group": "health",
      "terms": [
        "dat lich kham",
        "dat kham",
        "dang ky kham",
        "kham benh",
        "kham binh",
        "hen kham",
        "khám tổng quát"
      ],
      "channels": [
        {
          "providerId": "medpro",
          "url": "https://medpro.vn/",
          "appId": "medpro",
          "label": "Đặt lịch khám",
          "appOnly": false
        },
        {
          "providerId": "choray",
          "url": "https://medpro.vn/cho-ray",
          "appId": "medpro",
          "label": "Đặt lịch khám",
          "appOnly": false
        },
        {
          "providerId": "nd115",
          "url": "https://medpro.vn/benh-vien-nhan-dan-115",
          "appId": "medpro",
          "label": "Đặt lịch khám",
          "appOnly": false
        },
        {
          "providerId": "nhi2",
          "url": "https://medpro.vn/nhidong2",
          "appId": "medpro",
          "label": "Đặt lịch khám",
          "appOnly": false
        },
        {
          "providerId": "umc",
          "url": "",
          "appId": "umccare",
          "label": "Đặt lịch khám",
          "appOnly": false
        }
      ],
      "note": ""
    },
    {
      "id": "specialist",
      "title": "Khám theo chuyên khoa",
      "group": "health",
      "terms": [
        "kham chuyen khoa",
        "kham nhi",
        "kham tai mui hong",
        "kham da lieu",
        "kham san",
        "kham mat",
        "kham tim mach"
      ],
      "channels": [
        {
          "providerId": "medpro",
          "url": "https://medpro.vn/",
          "appId": "medpro",
          "label": "Chọn chuyên khoa",
          "appOnly": false
        },
        {
          "providerId": "choray",
          "url": "https://medpro.vn/cho-ray",
          "appId": "medpro",
          "label": "Chọn chuyên khoa",
          "appOnly": false
        },
        {
          "providerId": "nd115",
          "url": "https://medpro.vn/benh-vien-nhan-dan-115",
          "appId": "medpro",
          "label": "Chọn chuyên khoa",
          "appOnly": false
        },
        {
          "providerId": "nhi2",
          "url": "https://medpro.vn/nhidong2",
          "appId": "medpro",
          "label": "Chọn chuyên khoa",
          "appOnly": false
        },
        {
          "providerId": "umc",
          "url": "",
          "appId": "umccare",
          "label": "Chọn chuyên khoa",
          "appOnly": false
        }
      ],
      "note": "Chuyên khoa và bác sĩ khả dụng cần chọn tại cơ sở khám."
    },
    {
      "id": "health-record",
      "title": "Hồ sơ sức khỏe tại bệnh viện",
      "group": "health",
      "terms": [
        "ho so suc khoe",
        "ho so kham benh",
        "lich su kham benh",
        "ket qua xet nghiem",
        "ket qua kham"
      ],
      "channels": [
        {
          "providerId": "umc",
          "url": "",
          "appId": "umccare",
          "label": "Mở hồ sơ sức khỏe",
          "appOnly": true
        }
      ],
      "note": ""
    },
    {
      "id": "drug-registration",
      "title": "Tra đăng ký lưu hành thuốc",
      "group": "health",
      "terms": [
        "tra thuoc",
        "tra cuu thuoc",
        "so dang ky thuoc",
        "dang ky luu hanh thuoc",
        "nguon goc thuoc",
        "thuoc duoc cap phep"
      ],
      "channels": [
        {
          "providerId": "dav",
          "url": "https://dichvucong.dav.gov.vn/congbothuoc/index",
          "appId": "",
          "label": "Tra số đăng ký thuốc",
          "appOnly": false
        }
      ],
      "note": "Tra dữ liệu đăng ký tại Cục Quản lý Dược. Kết quả không xác nhận thuốc đang cầm là hàng thật; tên thuốc được giữ nguyên."
    },
    {
      "id": "drug-recall",
      "title": "Tra thuốc thu hồi, vi phạm",
      "group": "health",
      "terms": [
        "thuoc thu hoi",
        "thuoc vi pham",
        "thuoc gia",
        "thuoc kem chat luong"
      ],
      "channels": [
        {
          "providerId": "dav",
          "url": "https://dichvucong.dav.gov.vn/congbothuocvipham/index",
          "appId": "",
          "label": "Tra thuốc vi phạm, thu hồi",
          "appOnly": false
        }
      ],
      "note": ""
    },
    {
      "id": "drug-price",
      "title": "Tra giá thuốc công bố",
      "group": "health",
      "terms": [
        "gia thuoc",
        "gia ban buon thuoc",
        "ke khai gia thuoc"
      ],
      "channels": [
        {
          "providerId": "dav",
          "url": "https://dichvucong.dav.gov.vn/congbogiathuoc",
          "appId": "",
          "label": "Tra giá bán buôn công bố",
          "appOnly": false
        }
      ],
      "note": "Đây là giá bán buôn công bố, không phải báo giá bán lẻ hoặc tình trạng tồn kho."
    },
    {
      "id": "drug-otc",
      "title": "Danh mục thuốc không kê đơn",
      "group": "health",
      "terms": [
        "thuoc khong ke don",
        "thuoc otc"
      ],
      "channels": [
        {
          "providerId": "dav",
          "url": "https://dichvucong.dav.gov.vn/congbothuockhongkedon/index",
          "appId": "",
          "label": "Tra danh mục không kê đơn",
          "appOnly": false
        }
      ],
      "note": ""
    },
    {
      "id": "drug-maker",
      "title": "Tra cơ sở có thuốc vi phạm",
      "group": "health",
      "terms": [
        "co so thuoc vi pham",
        "nha san xuat thuoc vi pham"
      ],
      "channels": [
        {
          "providerId": "dav",
          "url": "https://dichvucong.dav.gov.vn/congboblacklist/index",
          "appId": "",
          "label": "Tra cơ sở sản xuất vi phạm",
          "appOnly": false
        }
      ],
      "note": ""
    },
    {
      "id": "vaccination",
      "title": "Đặt lịch tiêm HCDC",
      "group": "health",
      "terms": [
        "dat lich tiem",
        "tiem chung",
        "tiem ngua",
        "tiem vac xin",
        "tiem vaccine"
      ],
      "channels": [
        {
          "providerId": "hcdc",
          "url": "https://dangkytiemchung.hcdc.vn/booking",
          "appId": "",
          "label": "Đặt lịch tiêm tại HCDC",
          "appOnly": false
        }
      ],
      "note": ""
    },
    {
      "id": "student-result",
      "title": "Điểm và kết quả học tập",
      "group": "learning",
      "terms": [
        "diem hoc sinh",
        "xem diem con",
        "ket qua hoc tap",
        "diem vnedu",
        "bang diem hoc sinh",
        "diem hs"
      ],
      "channels": [
        {
          "providerId": "vnedu",
          "url": "https://tracuu.vnedu.vn/",
          "appId": "vnedu",
          "label": "Xem kết quả học tập",
          "appOnly": true
        }
      ],
      "note": ""
    },
    {
      "id": "school-contact",
      "title": "Sổ liên lạc điện tử",
      "group": "learning",
      "terms": [
        "so lien lac dien tu",
        "lien lac giao vien",
        "thong bao nha truong",
        "tin nhan nha truong"
      ],
      "channels": [
        {
          "providerId": "vnedu",
          "url": "https://tracuu.vnedu.vn/",
          "appId": "vnedu",
          "label": "Mở sổ liên lạc",
          "appOnly": true
        }
      ],
      "note": ""
    },
    {
      "id": "school-schedule",
      "title": "Thời khóa biểu",
      "group": "learning",
      "terms": [
        "thoi khoa bieu",
        "lich hoc",
        "lich hoc vnedu"
      ],
      "channels": [
        {
          "providerId": "vnedu",
          "url": "https://tracuu.vnedu.vn/",
          "appId": "vnedu",
          "label": "Xem thời khóa biểu",
          "appOnly": true
        }
      ],
      "note": ""
    },
    {
      "id": "school-attendance",
      "title": "Điểm danh và xin nghỉ học",
      "group": "learning",
      "terms": [
        "diem danh hoc sinh",
        "xin nghi hoc",
        "vang hoc"
      ],
      "channels": [
        {
          "providerId": "vnedu",
          "url": "https://tracuu.vnedu.vn/",
          "appId": "vnedu",
          "label": "Mở thông tin điểm danh / nghỉ học",
          "appOnly": true
        }
      ],
      "note": "Phụ thuộc tính năng được nhà trường bật trong vnEdu."
    },
    {
      "id": "exam-result",
      "title": "Điểm thi tốt nghiệp THPT",
      "group": "learning",
      "terms": [
        "diem thi tot nghiep",
        "diem thi thpt",
        "tra diem thi",
        "diem tot nghiep"
      ],
      "channels": [
        {
          "providerId": "exam",
          "url": "https://thisinh.thitotnghiepthpt.edu.vn/",
          "appId": "",
          "label": "Vào hệ thống thí sinh",
          "appOnly": false
        }
      ],
      "note": ""
    },
    {
      "id": "exam-registration",
      "title": "Đăng ký dự thi THPT",
      "group": "learning",
      "terms": [
        "dang ky du thi",
        "dang ky thi thpt",
        "ho so thi tot nghiep"
      ],
      "channels": [
        {
          "providerId": "exam",
          "url": "https://thisinh.thitotnghiepthpt.edu.vn/",
          "appId": "",
          "label": "Đăng nhập để đăng ký dự thi",
          "appOnly": false
        }
      ],
      "note": ""
    },
    {
      "id": "university-choice",
      "title": "Nguyện vọng đại học",
      "group": "learning",
      "terms": [
        "nguyen vong dai hoc",
        "dang ky xet tuyen dai hoc",
        "doi nguyen vong",
        "xet tuyen dai hoc"
      ],
      "channels": [
        {
          "providerId": "exam",
          "url": "https://thisinh.thitotnghiepthpt.edu.vn/",
          "appId": "",
          "label": "Vào hệ thống nguyện vọng",
          "appOnly": false
        }
      ],
      "note": ""
    },
    {
      "id": "online-course",
      "title": "Khóa học trực tuyến",
      "group": "learning",
      "terms": [
        "hoc truc tuyen",
        "hoc online",
        "khoa hoc online",
        "khoa hoc truc tuyen",
        "hoc tieng anh online",
        "luyen thi online"
      ],
      "channels": [
        {
          "providerId": "hocmai",
          "url": "https://hocmai.vn/",
          "appId": "",
          "label": "Xem khóa học tại HOCMAI",
          "appOnly": false
        }
      ],
      "note": "Chọn lớp và môn tại HOCMAI. Giá và điều kiện khóa học xem tại đơn vị cung cấp."
    },
    {
      "id": "math-10",
      "title": "Học Toán lớp 10",
      "group": "learning",
      "terms": [
        "hoc toan lop 10",
        "toan 10",
        "bai giang toan 10"
      ],
      "channels": [
        {
          "providerId": "hocmai",
          "url": "https://hocmai.vn/khoa-hoc-truc-tuyen/306/toan-10.html",
          "appId": "",
          "label": "Xem khóa Toán 10",
          "appOnly": false
        }
      ],
      "note": ""
    },
    {
      "id": "math-11",
      "title": "Học Toán lớp 11",
      "group": "learning",
      "terms": [
        "hoc toan lop 11",
        "toan 11",
        "bai giang toan 11"
      ],
      "channels": [
        {
          "providerId": "hocmai",
          "url": "https://hocmai.vn/khoa-hoc-truc-tuyen/143/toan-11.html",
          "appId": "",
          "label": "Xem khóa Toán 11",
          "appOnly": false
        }
      ],
      "note": ""
    },
    {
      "id": "grade-10",
      "title": "Khóa học theo lớp 10",
      "group": "learning",
      "terms": [
        "hoc lop 10",
        "khoa hoc lop 10"
      ],
      "channels": [
        {
          "providerId": "hocmai",
          "url": "https://hocmai.vn/khoa-hoc-truc-tuyen/index.php?lop=10",
          "appId": "",
          "label": "Xem các môn lớp 10",
          "appOnly": false
        }
      ],
      "note": ""
    },
    {
      "id": "learning-tv",
      "title": "Học qua kênh VTV7",
      "group": "learning",
      "terms": [
        "kenh giao duc",
        "hoc vtv7",
        "bai giang vtv7",
        "vtv7"
      ],
      "channels": [
        {
          "providerId": "vtv7",
          "url": "https://vtvgo.vn/channel/27",
          "appId": "vtvgo",
          "label": "Xem kênh giáo dục VTV7",
          "appOnly": false
        }
      ],
      "note": "Đây là kênh chương trình giáo dục, không phải cổng nộp bài hoặc lớp học của trường."
    },
    {
      "id": "buy-product",
      "title": "Tìm và mua sản phẩm",
      "group": "shopping",
      "terms": [
        "mua hang",
        "mua sam",
        "mua do",
        "tim san pham",
        "mua dien thoai",
        "mua laptop",
        "mua sach",
        "mua may giat",
        "mua tu lanh",
        "mua quan ao",
        "mua do gia dung",
        "mua may lanh",
        "mua do em be", "mua sua chua", "mua sua bot", "mua tivi", "mua tv", "mua dieu hoa","mua iphone","mua ipad","mua may tinh","mua dien may","mua do dien","mua phu kien","mua giay dep","mua my pham","mua do an","mua thuc pham","mua do uong","mua do choi","mua but","mua vo","mua sach giao khoa","mua dung cu hoc tap","mua ban hoc","mua ghe","mua den","mua quat","mua may loc nuoc","mua noi com dien","mua bep","mua nong san","mua do the thao","mua thu cung","mua vat lieu","mua son","mua ong nuoc","mua khoa cua","mua dung cu","mua linh kien","mua pin","mua sac","mua tai nghe"
      ],
      "channels": [
        {
          "providerId": "tiki",
          "url": "https://tiki.vn/",
          "appId": "tiki",
          "label": "Tìm hàng trên sàn",
          "appOnly": false
        },
        {
          "providerId": "shopee",
          "url": "https://shopee.vn/",
          "appId": "shopee",
          "label": "Tìm hàng trên sàn",
          "appOnly": false
        },
        {
          "providerId": "lazada",
          "url": "https://www.lazada.vn/",
          "appId": "lazada",
          "label": "Tìm hàng trên sàn",
          "appOnly": false
        }
      ],
      "note": "Giá, tồn kho và người bán xem tại sàn; chưa xác thực xuất xứ hoặc chất lượng sản phẩm."
    },
    {
      "id": "order-track",
      "title": "Theo dõi đơn mua hàng",
      "group": "shopping",
      "terms": [
        "theo doi don hang",
        "kiem tra don hang",
        "tra don hang",
        "don hang o dau",
        "lich su mua hang"
      ],
      "channels": [
        {
          "providerId": "tiki",
          "url": "https://tiki.vn/",
          "appId": "tiki",
          "label": "Mở đơn hàng",
          "appOnly": true
        },
        {
          "providerId": "shopee",
          "url": "https://shopee.vn/",
          "appId": "shopee",
          "label": "Mở đơn hàng",
          "appOnly": true
        },
        {
          "providerId": "lazada",
          "url": "https://www.lazada.vn/",
          "appId": "lazada",
          "label": "Mở đơn hàng",
          "appOnly": true
        }
      ],
      "note": ""
    },
    {
      "id": "return-order",
      "title": "Trả hàng và hoàn tiền",
      "group": "shopping",
      "terms": [
        "tra hang",
        "hoan tien",
        "doi tra hang",
        "hang loi",
        "hang khong dung"
      ],
      "channels": [
        {
          "providerId": "tiki",
          "url": "https://tiki.vn/",
          "appId": "tiki",
          "label": "Mở trả hàng / hoàn tiền",
          "appOnly": true
        },
        {
          "providerId": "shopee",
          "url": "https://shopee.vn/",
          "appId": "shopee",
          "label": "Mở trả hàng / hoàn tiền",
          "appOnly": true
        },
        {
          "providerId": "lazada",
          "url": "https://www.lazada.vn/",
          "appId": "lazada",
          "label": "Mở trả hàng / hoàn tiền",
          "appOnly": true
        }
      ],
      "note": ""
    },
    {
      "id": "cancel-order",
      "title": "Hủy đơn mua hàng",
      "group": "shopping",
      "terms": [
        "huy don hang",
        "huy mua hang"
      ],
      "channels": [
        {
          "providerId": "tiki",
          "url": "https://tiki.vn/",
          "appId": "tiki",
          "label": "Mở đơn cần hủy",
          "appOnly": true
        },
        {
          "providerId": "shopee",
          "url": "https://shopee.vn/",
          "appId": "shopee",
          "label": "Mở đơn cần hủy",
          "appOnly": true
        },
        {
          "providerId": "lazada",
          "url": "https://www.lazada.vn/",
          "appId": "lazada",
          "label": "Mở đơn cần hủy",
          "appOnly": true
        }
      ],
      "note": ""
    },
    {
      "id": "shop-support",
      "title": "Hỗ trợ đơn hàng",
      "group": "shopping",
      "terms": [
        "khieu nai mua hang",
        "ho tro mua hang",
        "lien he san",
        "bao cao nguoi ban",
        "khong nhan duoc hang"
      ],
      "channels": [
        {
          "providerId": "tiki",
          "url": "https://tiki.vn/",
          "appId": "tiki",
          "label": "Mở hỗ trợ đơn hàng",
          "appOnly": true
        },
        {
          "providerId": "shopee",
          "url": "https://shopee.vn/",
          "appId": "shopee",
          "label": "Mở hỗ trợ đơn hàng",
          "appOnly": true
        },
        {
          "providerId": "lazada",
          "url": "https://www.lazada.vn/",
          "appId": "lazada",
          "label": "Mở hỗ trợ đơn hàng",
          "appOnly": true
        }
      ],
      "note": ""
    },
    {
      "id": "repair-device",
      "title": "Sửa chữa thiết bị",
      "group": "repair",
      "terms": [
        "sua chua",
        "sua thiet bi",
        "bao hanh thiet bi",
        "bao hanh",
        "may bi hong"
      ],
      "channels": [
        {
          "providerId": "samsung",
          "url": "https://www.samsung.com/vn/support/supportServiceCenter/",
          "appId": "samsungmembers",
          "label": "Mở hỗ trợ sửa chữa",
          "appOnly": false
        },
        {
          "providerId": "apple",
          "url": "https://support.apple.com/vi-vn/repair",
          "appId": "",
          "label": "Mở hỗ trợ sửa chữa",
          "appOnly": false
        },
        {
          "providerId": "lg",
          "url": "https://www.lg.com/vn/tro-giup/ho-tro-san-pham/yeu-cau-sua-chua/",
          "appId": "",
          "label": "Mở hỗ trợ sửa chữa",
          "appOnly": false
        },
        {
          "providerId": "toshiba",
          "url": "https://www.toshiba-lifestyle.com/vn/service-center",
          "appId": "",
          "label": "Mở hỗ trợ sửa chữa",
          "appOnly": false
        }
      ],
      "note": ""
    },
    {
      "id": "repair-phone",
      "title": "Sửa điện thoại, máy tính bảng",
      "group": "repair",
      "terms": [
        "sua dien thoai",
        "sua chua dien thoai",
        "bao hanh dien thoai",
        "sua iphone",
        "sua chua iphone",
        "bao hanh iphone",
        "sua ipad",
        "sua chua ipad",
        "bao hanh ipad",
        "sua dt",
        "thay man hinh",
        "thay pin dien thoai",
        "dien thoai hu",
        "dien thoai hong"
      ],
      "channels": [
        {
          "providerId": "samsung",
          "url": "https://www.samsung.com/vn/support/supportServiceCenter/",
          "appId": "samsungmembers",
          "label": "Mở sửa chữa điện thoại",
          "appOnly": false
        },
        {
          "providerId": "apple",
          "url": "https://support.apple.com/vi-vn/iphone/repair?services=service",
          "appId": "",
          "label": "Mở sửa chữa điện thoại",
          "appOnly": false
        }
      ],
      "note": ""
    },
    {
      "id": "repair-laptop",
      "title": "Sửa máy tính, laptop",
      "group": "repair",
      "terms": [
        "sua may tinh",
        "sua chua may tinh",
        "bao hanh may tinh",
        "sua laptop",
        "sua chua laptop",
        "bao hanh laptop",
        "sua macbook",
        "sua chua macbook",
        "bao hanh macbook",
        "laptop hu",
        "may tinh hong"
      ],
      "channels": [
        {
          "providerId": "apple",
          "url": "https://support.apple.com/vi-vn/repair",
          "appId": "",
          "label": "Mở hỗ trợ máy tính",
          "appOnly": false
        },
        {
          "providerId": "lg",
          "url": "https://www.lg.com/vn/tro-giup/ho-tro-san-pham/yeu-cau-sua-chua/",
          "appId": "",
          "label": "Mở hỗ trợ máy tính",
          "appOnly": false
        }
      ],
      "note": ""
    },
    {
      "id": "repair-washer",
      "title": "Sửa máy giặt",
      "group": "repair",
      "terms": [
        "sua may giat",
        "sua chua may giat",
        "bao hanh may giat",
        "may giat hu",
        "may giat hong",
        "may giat khong vat"
      ],
      "channels": [
        {
          "providerId": "samsung",
          "url": "https://www.samsung.com/vn/support/supportServiceCenter/",
          "appId": "samsungmembers",
          "label": "Mở hỗ trợ máy giặt",
          "appOnly": false
        },
        {
          "providerId": "lg",
          "url": "https://www.lg.com/vn/tro-giup/ho-tro-san-pham/yeu-cau-sua-chua/",
          "appId": "",
          "label": "Mở hỗ trợ máy giặt",
          "appOnly": false
        },
        {
          "providerId": "toshiba",
          "url": "https://www.toshiba-lifestyle.com/vn/service-center",
          "appId": "",
          "label": "Mở hỗ trợ máy giặt",
          "appOnly": false
        }
      ],
      "note": ""
    },
    {
      "id": "repair-fridge",
      "title": "Sửa tủ lạnh",
      "group": "repair",
      "terms": [
        "sua tu lanh",
        "sua chua tu lanh",
        "bao hanh tu lanh",
        "tu lanh hu",
        "tu lanh hong",
        "tu lanh khong lanh"
      ],
      "channels": [
        {
          "providerId": "samsung",
          "url": "https://www.samsung.com/vn/support/supportServiceCenter/",
          "appId": "samsungmembers",
          "label": "Mở hỗ trợ tủ lạnh",
          "appOnly": false
        },
        {
          "providerId": "lg",
          "url": "https://www.lg.com/vn/tro-giup/ho-tro-san-pham/yeu-cau-sua-chua/",
          "appId": "",
          "label": "Mở hỗ trợ tủ lạnh",
          "appOnly": false
        },
        {
          "providerId": "toshiba",
          "url": "https://www.toshiba-lifestyle.com/vn/service-center",
          "appId": "",
          "label": "Mở hỗ trợ tủ lạnh",
          "appOnly": false
        }
      ],
      "note": ""
    },
    {
      "id": "repair-aircon",
      "title": "Sửa điều hòa, máy lạnh",
      "group": "repair",
      "terms": [
        "sua dieu hoa",
        "sua chua dieu hoa",
        "bao hanh dieu hoa",
        "sua may lanh",
        "sua chua may lanh",
        "bao hanh may lanh",
        "may lanh hu",
        "dieu hoa khong mat",
        "may lanh khong lanh"
      ],
      "channels": [
        {
          "providerId": "samsung",
          "url": "https://www.samsung.com/vn/support/supportServiceCenter/",
          "appId": "samsungmembers",
          "label": "Mở hỗ trợ điều hòa",
          "appOnly": false
        },
        {
          "providerId": "lg",
          "url": "https://www.lg.com/vn/tro-giup/ho-tro-san-pham/yeu-cau-sua-chua/",
          "appId": "",
          "label": "Mở hỗ trợ điều hòa",
          "appOnly": false
        },
        {
          "providerId": "toshiba",
          "url": "https://www.toshiba-lifestyle.com/vn/service-center",
          "appId": "",
          "label": "Mở hỗ trợ điều hòa",
          "appOnly": false
        }
      ],
      "note": ""
    },
    {
      "id": "repair-tv",
      "title": "Sửa TV",
      "group": "repair",
      "terms": [
        "sua tv",
        "sua chua tv",
        "bao hanh tv",
        "sua tivi",
        "sua chua tivi",
        "bao hanh tivi",
        "tv hu",
        "tv hong",
        "tivi hong"
      ],
      "channels": [
        {
          "providerId": "samsung",
          "url": "https://www.samsung.com/vn/support/supportServiceCenter/",
          "appId": "samsungmembers",
          "label": "Mở hỗ trợ TV",
          "appOnly": false
        },
        {
          "providerId": "lg",
          "url": "https://www.lg.com/vn/tro-giup/ho-tro-san-pham/yeu-cau-sua-chua/",
          "appId": "",
          "label": "Mở hỗ trợ TV",
          "appOnly": false
        },
        {
          "providerId": "toshiba",
          "url": "https://www.toshiba-lifestyle.com/vn/service-center",
          "appId": "",
          "label": "Mở hỗ trợ TV",
          "appOnly": false
        }
      ],
      "note": ""
    },
    {
      "id": "service-center",
      "title": "Trung tâm bảo hành của hãng",
      "group": "repair",
      "terms": [
        "trung tam bao hanh",
        "dia chi bao hanh",
        "trung tam sua chua",
        "noi bao hanh"
      ],
      "channels": [
        {
          "providerId": "samsung",
          "url": "https://www.samsung.com/vn/support/supportServiceCenter/",
          "appId": "samsungmembers",
          "label": "Tìm trung tâm dịch vụ",
          "appOnly": false
        },
        {
          "providerId": "apple",
          "url": "https://support.apple.com/vi-vn/repair-products",
          "appId": "",
          "label": "Tìm trung tâm dịch vụ",
          "appOnly": false
        },
        {
          "providerId": "lg",
          "url": "https://www.lg.com/vn/dich-vu-bao-duong-bao-hanh/",
          "appId": "",
          "label": "Tìm trung tâm dịch vụ",
          "appOnly": false
        },
        {
          "providerId": "toshiba",
          "url": "https://www.toshiba-lifestyle.com/vn/service-center",
          "appId": "",
          "label": "Tìm trung tâm dịch vụ",
          "appOnly": false
        }
      ],
      "note": ""
    },
    {
      "id": "warranty-policy",
      "title": "Chính sách bảo hành",
      "group": "repair",
      "terms": [
        "chinh sach bao hanh",
        "thoi han bao hanh",
        "dieu kien bao hanh"
      ],
      "channels": [
        {
          "providerId": "lg",
          "url": "https://www.lg.com/vn/tro-giup/bao-hanh/",
          "appId": "",
          "label": "Xem bảo hành",
          "appOnly": false
        },
        {
          "providerId": "apple",
          "url": "https://support.apple.com/vi-vn/repair",
          "appId": "",
          "label": "Xem bảo hành",
          "appOnly": false
        }
      ],
      "note": ""
    },
    {
      "id": "repair-appointment",
      "title": "Đặt lịch sửa chữa",
      "group": "repair",
      "terms": [
        "dat lich sua chua",
        "hen sua chua"
      ],
      "channels": [
        {
          "providerId": "lg",
          "url": "https://www.lg.com/vn/tro-giup/ho-tro-san-pham/dat-lich-sua-chua/",
          "appId": "",
          "label": "Đặt lịch sửa chữa",
          "appOnly": false
        },
        {
          "providerId": "samsung",
          "url": "https://www.samsung.com/vn/support/mobile-devices/book-an-apt/",
          "appId": "samsungmembers",
          "label": "Đặt lịch sửa chữa",
          "appOnly": false
        }
      ],
      "note": ""
    },
    {
      "id": "repair-status",
      "title": "Theo dõi tình trạng sửa chữa",
      "group": "repair",
      "terms": [
        "tinh trang sua chua",
        "trang thai sua chua",
        "tien do sua chua"
      ],
      "channels": [
        {
          "providerId": "lg",
          "url": "https://www.lg.com/vn/tro-giup/ho-tro-san-pham/xem-trang-thai-sua-chua/",
          "appId": "",
          "label": "Xem trạng thái sửa chữa",
          "appOnly": false
        }
      ],
      "note": ""
    },
    {
      "id": "warranty-register",
      "title": "Đăng ký bảo hành Toshiba",
      "group": "repair",
      "terms": [
        "dang ky bao hanh toshiba",
        "kich hoat bao hanh toshiba"
      ],
      "channels": [
        {
          "providerId": "toshiba",
          "url": "https://www.toshiba-lifestyle.com/vn/support/repair-request",
          "appId": "",
          "label": "Đăng ký bảo hành",
          "appOnly": false
        }
      ],
      "note": ""
    },
    {
      "id": "warranty-check",
      "title": "Tra bảo hành Toshiba",
      "group": "repair",
      "terms": [
        "tra bao hanh toshiba",
        "kiem tra bao hanh toshiba"
      ],
      "channels": [
        {
          "providerId": "toshiba",
          "url": "https://www.toshiba-lifestyle.com/vn/support/check-repair-status",
          "appId": "",
          "label": "Tra cứu bảo hành",
          "appOnly": false
        }
      ],
      "note": ""
    },
    {
      "id": "home-repair",
      "title": "Thợ sửa điện, nước và nhà cửa",
      "group": "repair",
      "terms": [
        "tho dien",
        "tho nuoc",
        "sua ong nuoc",
        "sua khoa",
        "sua nha",
        "sua dien nuoc",
        "dien nuoc dan dung"
      ],
      "channels": [],
      "note": "Chưa có đơn vị dịch vụ được xác minh cho địa chỉ của bạn. Có thể dùng liên hệ đơn vị bạn đã tự lưu trong danh bạ."
    }
  ]
};
const normalize=L.normalize, phrase=(q,t)=>(' '+q+' ').includes(' '+normalize(t)+' ');
const links=new Set([...Object.values(DATA.PROVIDERS).flatMap(p=>[p.url,p.source]),...DATA.APPS.flatMap(a=>[a.android,a.ios,a.site]),...DATA.SERVICES.flatMap(s=>s.channels.map(c=>c.url))].filter(Boolean));
function validUrl(url){try{const u=new URL(url);return u.protocol==='https:'&&!u.username&&!u.password&&(links.has(url)||(u.hostname==='tiki.vn'&&u.pathname==='/search'&&[...u.searchParams.keys()].join()==='q'&&u.searchParams.get('q').length<=150));}catch{return false;}}
function find(raw='',group=''){const q=L.understand(raw).query,words=q.split(' ').filter(Boolean);return DATA.SERVICES.filter(s=>(!group||s.group===group)&&words.every(w=>normalize([s.title,...s.terms].join(' ')).split(' ').includes(w)));}
function match(raw){const q=L.understand(raw).query;if(!q||/\b(?:khong|dung)\s+(?:(?:muon|can)\s+)?(?:tim|tra|mua|sua|dat|mo|dang ky)\b/.test(q))return {status:'NONE',services:[]};const scored=DATA.SERVICES.map(s=>({s,score:Math.max(0,...[s.title,...s.terms].filter(t=>phrase(q,t)).map(t=>normalize(t).length))})).filter(x=>x.score);if(!scored.length)return {status:'NONE',services:[]};scored.sort((a,b)=>b.score-a.score);let chosen=scored.filter(x=>x.score===scored[0].score);if(/\b(?:va|hoac)\b/.test(q)){chosen=scored.filter(x=>x.score>=8);}const services=chosen.map(x=>x.s);return {status:services.length===1?'MATCH':'CHOICE',services,query:q};}
function resolve(id,raw='',choice=''){const service=DATA.SERVICES.find(s=>s.id===id);if(!service)return {status:'UNKNOWN'};if(!service.channels.length)return {status:'CONTACT',service};const q=L.understand(raw).query,named=Object.values(DATA.PROVIDERS).filter(p=>p.group===service.group&&p.aliases.some(t=>phrase(q,t))),allowed=service.channels.map(c=>c.providerId);if(choice&&!allowed.includes(choice))return {status:'UNKNOWN'};if(!choice&&named.some(p=>!allowed.includes(p.id)))return {status:'UNSUPPORTED',service};const selected=choice||((named.length===1&&allowed.includes(named[0].id))?named[0].id:'')||(allowed.length===1&&!['vaccination','health-record','warranty-policy','repair-status','online-course'].includes(id)?allowed[0]:'');if(id==='vaccination'&&!selected&&/tay ninh|long an|ha noi|da nang/.test(q))return {status:'UNSUPPORTED',service};if(!selected)return {status:'NEEDS_PROVIDER',service,choices:service.channels.map(c=>DATA.PROVIDERS[c.providerId])};const channel={...service.channels.find(c=>c.providerId===selected)},provider=DATA.PROVIDERS[selected];if(id==='buy-product'&&selected==='tiki'&&q){const term=q.replace(/(?:^| )(?:toi|muon|can|tim|mua|hang|san pham|tiki)(?= |$)/g,' ').replace(/\s+/g,' ').trim();if(term)channel.url='https://tiki.vn/search?q='+encodeURIComponent(term.slice(0,150));}return {status:channel.appOnly||!channel.url?'APP':'WEB',service,channel,provider};}
return Object.freeze({...DATA,normalize,validUrl,find,match,resolve});
});
