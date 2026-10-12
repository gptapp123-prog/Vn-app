/* Public task routing only. No eligibility calculations or private Party-member database. */
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./language-understanding'):root.VN_LANGUAGE);if(typeof module==='object'&&module.exports)module.exports=api;else root.VN_PUBLIC_SERVICES=api;})(typeof window!=='undefined'?window:globalThis,function(L){
'use strict';const DATA={
  "GROUPS": [
    {
      "id": "family",
      "title": "Hộ tịch & gia đình"
    },
    {
      "id": "certify",
      "title": "Chứng thực & giấy tờ"
    },
    {
      "id": "property",
      "title": "Đất đai & nhà ở"
    },
    {
      "id": "welfare",
      "title": "Việc làm & an sinh"
    },
    {
      "id": "business",
      "title": "Kinh doanh & thuế"
    },
    {
      "id": "education",
      "title": "Học tập & hỗ trợ"
    },
    {
      "id": "law",
      "title": "Pháp luật & kiến nghị"
    },
    {
      "id": "party",
      "title": "Công tác Đảng"
    },
    {
      "id": "identity",
      "title": "Cư trú, căn cước & xe"
    }
  ],
  "SERVICES": [
    {
      "id": "birth",
      "title": "Đăng ký khai sinh",
      "group": "family",
      "terms": [
        "dang ky khai sinh",
        "lam khai sinh",
        "giay khai sinh",
        "khai sinh",
        "dang ki khai sinh"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-dung-chung.html?ma_thu_tuc=1.001193",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Thủ tục đăng ký khai sinh",
      "procedureCode": "1.001193",
      "label": "Vào thủ tục Đăng ký khai sinh",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục.",
      "legacyId": "birth"
    },
    {
      "id": "birth-foreign",
      "title": "Khai sinh có yếu tố nước ngoài",
      "group": "family",
      "terms": [
        "khai sinh co yeu to nuoc ngoai",
        "khai sinh nuoc ngoai"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://thutuc.dichvucong.gov.vn/p/home/dvc-tthc-thu-tuc-hanh-chinh-chi-tiet.html?ma_thu_tuc=1611",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Thủ tục đăng ký khai sinh có yếu tố nước ngoài",
      "procedureCode": "2.000528",
      "label": "Vào thủ tục Khai sinh có yếu tố nước ngoài",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "marriage",
      "title": "Đăng ký kết hôn",
      "group": "family",
      "terms": [
        "dang ky ket hon",
        "lam giay ket hon",
        "ket hon",
        "dang ki ket hon"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-dung-chung.html?ma_thu_tuc=1.000894",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Thủ tục đăng ký kết hôn",
      "procedureCode": "1.000894",
      "label": "Vào thủ tục Đăng ký kết hôn",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục.",
      "legacyId": "marriage"
    },
    {
      "id": "marriage-foreign",
      "title": "Kết hôn có yếu tố nước ngoài",
      "group": "family",
      "terms": [
        "ket hon nguoi nuoc ngoai",
        "ket hon co yeu to nuoc ngoai",
        "ket hon nuoc ngoai"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://thutuc.dichvucong.gov.vn/p/home/dvc-tthc-thu-tuc-hanh-chinh-chi-tiet.html?ma_thu_tuc=2608",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Thủ tục đăng ký kết hôn có yếu tố nước ngoài",
      "procedureCode": "2.000806",
      "label": "Vào thủ tục Kết hôn có yếu tố nước ngoài",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "civil-copy",
      "title": "Bản sao trích lục hộ tịch",
      "group": "family",
      "terms": [
        "trich luc ho tich",
        "trich luc khai sinh",
        "ban sao giay khai sinh",
        "ban sao ho tich"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-dung-chung.html?ma_thu_tuc=2.000635",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Cấp bản sao Trích lục hộ tịch, bản sao Giấy khai sinh",
      "procedureCode": "2.000635",
      "label": "Vào thủ tục Bản sao trích lục hộ tịch",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục.",
      "legacyId": "civil-copy"
    },
    {
      "id": "death",
      "title": "Đăng ký khai tử",
      "group": "family",
      "terms": [
        "dang ky khai tu",
        "giay chung tu",
        "lam khai tu"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://vpcp.dichvucong.gov.vn/p/home/dvc-ket-qua-thu-tuc.html?originKey=%C4%90%C4%83ng%20k%C3%BD%20khai%20t%E1%BB%AD&tukhoa=%C4%90%C4%83ng%20k%C3%BD%20khai%20t%E1%BB%AD&tinh_thanh=",
      "source": "https://vpcp.dichvucong.gov.vn/p/home/dvc-dich-vu-cong-truc-tuyen-ds.html",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "FILTERED_DIRECTORY",
      "label": "Tra đúng danh mục Đăng ký khai tử",
      "scope": "Đã đặt sẵn tên thủ tục. Chọn bản công bố đúng cơ quan tại cổng; chưa xác minh một trang nộp riêng dùng chung mọi trường hợp."
    },
    {
      "id": "rebirth",
      "title": "Đăng ký lại khai sinh",
      "group": "family",
      "terms": [
        "dang ky lai khai sinh",
        "khai sinh dang ky lai"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-dung-chung.html?ma_thu_tuc=1.004884",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Thủ tục đăng ký lại khai sinh",
      "procedureCode": "1.004884",
      "label": "Vào thủ tục Đăng ký lại khai sinh",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "lost-birth",
      "title": "Mất giấy khai sinh",
      "group": "family",
      "terms": [
        "mat giay khai sinh",
        "khai sinh bi mat"
      ],
      "kind": "CHOICE",
      "reviewedAt": "2026-10-12",
      "question": "Bạn xin bản sao trích lục hay đăng ký lại khai sinh theo điều kiện tại nguồn?",
      "choices": [
        [
          "civil-copy",
          "Xin bản sao trích lục"
        ],
        [
          "rebirth",
          "Đăng ký lại khai sinh"
        ]
      ]
    },
    {
      "id": "remarriage",
      "title": "Đăng ký lại kết hôn",
      "group": "family",
      "terms": [
        "dang ky lai ket hon",
        "ket hon dang ky lai"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-dung-chung.html?ma_thu_tuc=1.004746",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Thủ tục đăng ký lại kết hôn",
      "procedureCode": "1.004746",
      "label": "Vào thủ tục Đăng ký lại kết hôn",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "rebirth-foreign",
      "title": "Đăng ký lại khai sinh có yếu tố nước ngoài",
      "group": "family",
      "terms": [
        "dang ky lai khai sinh nuoc ngoai",
        "dang ky lai khai sinh co yeu to nuoc ngoai"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://thutuc.dichvucong.gov.vn/p/home/dvc-tthc-thu-tuc-hanh-chinh-chi-tiet.html?ma_thu_tuc=1598",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Thủ tục đăng ký lại khai sinh có yếu tố nước ngoài",
      "procedureCode": "2.000522",
      "label": "Vào thủ tục Đăng ký lại khai sinh có yếu tố nước ngoài",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "remarriage-foreign",
      "title": "Đăng ký lại kết hôn có yếu tố nước ngoài",
      "group": "family",
      "terms": [
        "dang ky lai ket hon nuoc ngoai",
        "dang ky lai ket hon co yeu to nuoc ngoai"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://thutuc.dichvucong.gov.vn/p/home/dvc-tthc-thu-tuc-hanh-chinh-chi-tiet.html?ma_thu_tuc=1559",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Thủ tục đăng ký lại kết hôn có yếu tố nước ngoài",
      "procedureCode": "2.000513",
      "label": "Vào thủ tục Đăng ký lại kết hôn có yếu tố nước ngoài",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "death-foreign",
      "title": "Khai tử có yếu tố nước ngoài",
      "group": "family",
      "terms": [
        "khai tu co yeu to nuoc ngoai",
        "khai tu nuoc ngoai"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-dung-chung.html?ma_thu_tuc=1.001766",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Thủ tục đăng ký khai tử có yếu tố nước ngoài",
      "procedureCode": "1.001766",
      "label": "Vào thủ tục Khai tử có yếu tố nước ngoài",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "single",
      "title": "Xác nhận tình trạng hôn nhân",
      "group": "family",
      "terms": [
        "xac nhan tinh trang hon nhan",
        "giay doc than",
        "xac nhan doc than",
        "giay chung nhan doc than",
        "giay xac nhan doc than"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-dung-chung.html?ma_thu_tuc=1.004873",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Thủ tục cấp Giấy xác nhận tình trạng hôn nhân",
      "procedureCode": "1.004873",
      "label": "Vào thủ tục Xác nhận tình trạng hôn nhân",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "parent",
      "title": "Đăng ký nhận cha, mẹ, con",
      "group": "family",
      "terms": [
        "nhan cha me con",
        "dang ky nhan con",
        "nhan cha",
        "nhan me"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-dung-chung.html?ma_thu_tuc=1.001022",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Thủ tục đăng ký nhận cha, mẹ, con",
      "procedureCode": "1.001022",
      "label": "Vào thủ tục Đăng ký nhận cha, mẹ, con",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "adoption",
      "title": "Nuôi con nuôi trong nước",
      "group": "family",
      "terms": [
        "nuoi con nuoi trong nuoc",
        "nhan con nuoi",
        "thu tuc con nuoi"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-dung-chung.html?ma_thu_tuc=2.001263",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Đăng ký việc nuôi con nuôi trong nước",
      "procedureCode": "2.001263",
      "label": "Vào thủ tục Nuôi con nuôi trong nước",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "birth-linked",
      "title": "Liên thông khai sinh, thường trú, BHYT",
      "group": "family",
      "terms": [
        "lien thong khai sinh",
        "khai sinh thuong tru bhyt"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-dung-chung.html?ma_thu_tuc=2.000986",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Liên thông thủ tục hành chính về đăng ký khai sinh, đăng ký thường trú, cấp thẻ bảo hiểm y tế cho trẻ em dưới 6 tuổi",
      "procedureCode": "2.000986",
      "label": "Vào thủ tục Liên thông khai sinh, thường trú, BHYT",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục.",
      "covers": [
        "birth",
        "permanent",
        "bhyt"
      ]
    },
    {
      "id": "death-linked",
      "title": "Liên thông khai tử, cư trú, mai táng, tử tuất",
      "group": "family",
      "terms": [
        "lien thong khai tu",
        "khai tu mai tang tu tuat"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-dung-chung.html?ma_thu_tuc=2.002622",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Thủ tục đăng ký khai tử, xóa đăng ký thường trú, giải quyết mai táng phí, tử tuất",
      "procedureCode": "2.002622",
      "label": "Vào thủ tục Liên thông khai tử, cư trú, mai táng, tử tuất",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục.",
      "covers": [
        "death"
      ]
    },
    {
      "id": "civil-change",
      "title": "Thay đổi, cải chính hộ tịch",
      "group": "family",
      "terms": [
        "cai chinh ho tich",
        "doi ten khai sinh",
        "thay doi ho tich",
        "bo sung ho tich"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://vpcp.dichvucong.gov.vn/p/home/dvc-ket-qua-thu-tuc.html?originKey=Thay%20%C4%91%E1%BB%95i%20c%E1%BA%A3i%20ch%C3%ADnh%20b%E1%BB%95%20sung%20h%E1%BB%99%20t%E1%BB%8Bch&tukhoa=Thay%20%C4%91%E1%BB%95i%20c%E1%BA%A3i%20ch%C3%ADnh%20b%E1%BB%95%20sung%20h%E1%BB%99%20t%E1%BB%8Bch&tinh_thanh=",
      "source": "https://vpcp.dichvucong.gov.vn/p/home/dvc-dich-vu-cong-truc-tuyen-ds.html",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "FILTERED_DIRECTORY",
      "label": "Tra đúng danh mục Thay đổi, cải chính hộ tịch",
      "scope": "Đã đặt sẵn tên thủ tục. Chọn bản công bố đúng cơ quan tại cổng; chưa xác minh một trang nộp riêng dùng chung mọi trường hợp."
    },
    {
      "id": "notary",
      "title": "Chứng thực / công chứng",
      "group": "certify",
      "terms": [
        "sao y",
        "cong chung"
      ],
      "kind": "CHOICE",
      "reviewedAt": "2026-10-12",
      "question": "Bạn cần chứng thực giấy tờ hay công chứng hợp đồng?",
      "choices": [
        [
          "certify-copy",
          "Chứng thực bản sao"
        ],
        [
          "certify-sign",
          "Chứng thực chữ ký"
        ],
        [
          "notary-gap",
          "Công chứng hợp đồng"
        ]
      ]
    },
    {
      "id": "notary-gap",
      "title": "Công chứng hợp đồng",
      "group": "certify",
      "terms": [
        "cong chung hop dong"
      ],
      "kind": "GAP",
      "reviewedAt": "2026-10-12",
      "question": "Cần tỉnh/thành và tổ chức hành nghề công chứng; chưa có liên kết chức năng riêng được xác minh."
    },
    {
      "id": "certify-copy",
      "title": "Chứng thực bản sao",
      "group": "certify",
      "terms": [
        "chung thuc ban sao",
        "sao y ban chinh",
        "chung thuc giay to"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-dung-chung.html?ma_thu_tuc=2.000815",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Chứng thực bản sao từ bản chính giấy tờ, văn bản do cơ quan, tổ chức có thẩm quyền của Việt Nam; cơ quan, tổ chức có thẩm quyền của nước ngoài; cơ quan, tổ chức có thẩm quyền của Việt Nam liên kết với cơ quan, tổ chức có thẩm quyền của nước ngoài cấp hoặc chứng nhận",
      "procedureCode": "2.000815",
      "label": "Vào thủ tục Chứng thực bản sao",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "certify-sign",
      "title": "Chứng thực chữ ký",
      "group": "certify",
      "terms": [
        "chung thuc chu ky",
        "chung thuc diem chi"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-dung-chung.html?ma_thu_tuc=2.000884",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Thủ tục chứng thực chữ ký trong các giấy tờ, văn bản (áp dụng cho cả trường hợp chứng thực điểm chỉ và trường hợp người yêu cầu chứng thực không thể ký, không thể điểm chỉ được)",
      "procedureCode": "2.000884",
      "label": "Vào thủ tục Chứng thực chữ ký",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "land-certificate",
      "title": "Sổ đỏ / giấy chứng nhận đất",
      "group": "property",
      "terms": [
        "so do",
        "so hong",
        "giay chung nhan dat",
        "lam so do"
      ],
      "kind": "CHOICE",
      "reviewedAt": "2026-10-12",
      "question": "Bạn cần làm lần đầu, cấp đổi hay cấp lại do mất?",
      "choices": [
        [
          "land-first",
          "Lần đầu · hộ gia đình/cá nhân"
        ],
        [
          "land-exchange",
          "Cấp đổi"
        ],
        [
          "land-lost",
          "Cấp lại do mất"
        ]
      ]
    },
    {
      "id": "land-first",
      "title": "Cấp giấy chứng nhận đất lần đầu",
      "group": "property",
      "terms": [
        "cap so do lan dau",
        "cap giay chung nhan dat lan dau",
        "dang ky dat dai lan dau"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=1.013978",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Đăng ký đất đai, tài sản gắn liền với đất, cấp Giấy chứng nhận quyền sử dụng đất, quyền sở hữu tài sản gắn liền với đất lần đầu đối với hộ gia đình, cá nhân, cộng đồng dân cư, người gốc VN định cư ở nước ngoài",
      "procedureCode": "1.013978",
      "label": "Vào thủ tục Cấp giấy chứng nhận đất lần đầu",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "land-exchange",
      "title": "Cấp đổi giấy chứng nhận đất",
      "group": "property",
      "terms": [
        "cap doi so do",
        "doi so hong",
        "cap doi giay chung nhan dat"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://vpcp.dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=1.012783",
      "source": "https://vpcp.dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=1.012783",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "label": "Vào thủ tục cấp đổi giấy chứng nhận đất"
    },
    {
      "id": "land-lost",
      "title": "Cấp lại giấy chứng nhận đất do mất",
      "group": "property",
      "terms": [
        "mat so do",
        "mat so hong",
        "cap lai so do",
        "cap lai giay chung nhan dat"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://vpcp.dichvucong.gov.vn/p/home/dvc-ket-qua-thu-tuc.html?originKey=C%E1%BA%A5p%20l%E1%BA%A1i%20Gi%E1%BA%A5y%20ch%E1%BB%A9ng%20nh%E1%BA%ADn%20do%20b%E1%BB%8B%20m%E1%BA%A5t&tukhoa=C%E1%BA%A5p%20l%E1%BA%A1i%20Gi%E1%BA%A5y%20ch%E1%BB%A9ng%20nh%E1%BA%ADn%20do%20b%E1%BB%8B%20m%E1%BA%A5t&tinh_thanh=",
      "source": "https://vpcp.dichvucong.gov.vn/p/home/dvc-dich-vu-cong-truc-tuyen-ds.html",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "FILTERED_DIRECTORY",
      "label": "Tra đúng danh mục Cấp lại giấy chứng nhận đất do mất",
      "scope": "Đã đặt sẵn tên thủ tục. Chọn bản công bố đúng cơ quan tại cổng; chưa xác minh một trang nộp riêng dùng chung mọi trường hợp."
    },
    {
      "id": "land-info",
      "title": "Thông tin, dữ liệu đất đai",
      "group": "property",
      "terms": [
        "cung cap du lieu dat dai",
        "thong tin dat dai",
        "xin trich luc dat",
        "trich luc dia chinh"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=1.012789",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Cung cấp thông tin, dữ liệu đất đai",
      "procedureCode": "1.012789",
      "label": "Vào thủ tục Thông tin, dữ liệu đất đai",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "land-mediate",
      "title": "Hòa giải tranh chấp đất đai",
      "group": "property",
      "terms": [
        "hoa giai tranh chap dat",
        "hoa giai dat dai"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=1.012812",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Hòa giải tranh chấp đất đai",
      "procedureCode": "1.012812",
      "label": "Vào thủ tục Hòa giải tranh chấp đất đai",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "land-transfer",
      "title": "Đăng ký biến động, chuyển nhượng, thừa kế đất",
      "group": "property",
      "terms": [
        "sang ten dat",
        "thua ke dat",
        "tang cho dat",
        "dang ky bien dong dat"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=1.013831",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Đăng ký biến động quyền sử dụng đất, quyền sở hữu tài sản gắn liền với đất trong các trường hợp chuyển đổi quyền sử dụng đất nông nghiệp mà không theo phương án dồn điền, đổi thửa, chuyển nhượng, thừa kế, tặng cho quyền sử dụng đất, quyền sở hữu tài sản gắn liền với đất, góp vốn bằng quyền sử dụng đất, quyền sở hữu tài sản gắn liền với đất; cho thuê, cho thuê lại quyền sử dụng đất trong dự án xây dựng kinh doanh kết cấu hạ tầng; bán hoặc tặng cho hoặc để thừa kế hoặc góp vốn bằng tài sản gắn liền với đất thuê của Nhà nước theo hình thức thuê đất trả tiền hàng năm",
      "procedureCode": "1.013831",
      "label": "Vào thủ tục Đăng ký biến động, chuyển nhượng, thừa kế đất",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "build",
      "title": "Xin giấy phép xây dựng mới",
      "group": "property",
      "terms": [
        "xin giay phep xay dung",
        "giay phep xay nha",
        "cap phep xay dung moi"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-dung-chung.html?ma_thu_tuc=1.013225",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Cấp giấy phép xây dựng mới đối với công trình cấp III, cấp IV (Công trình không theo tuyến/Theo tuyến trong đô thị/Tín ngưỡng, tôn giáo/Tượng đài, tranh hoành tráng/Theo giai đoạn cho công trình không theo tuyến/Theo giai đoạn cho công trình theo tuyến trong đô thị/Dự án) và nhà ở riêng lẻ",
      "procedureCode": "1.013225",
      "label": "Vào thủ tục Xin giấy phép xây dựng mới",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "build-repair",
      "title": "Giấy phép sửa chữa, cải tạo nhà",
      "group": "property",
      "terms": [
        "giay phep sua nha",
        "giay phep cai tao nha",
        "cap phep sua chua nha"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-dung-chung.html?ma_thu_tuc=1.013229",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Cấp giấy phép xây dựng sửa chữa, cải tạo đối với công trình cấp III, cấp IV (công trình Không theo tuyến/Theo tuyến trong đô thị/Tín ngưỡng, tôn giáo/Tượng đài, tranh hoành tráng/Theo giai đoạn cho công trình không theo tuyến/Theo giai đoạn cho công trình theo tuyến trong đô thị/Dự án) và nhà ở riêng lẻ.",
      "procedureCode": "1.013229",
      "label": "Vào thủ tục Giấy phép sửa chữa, cải tạo nhà",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "social-home",
      "title": "Đăng ký nhà ở xã hội",
      "group": "property",
      "terms": [
        "nha o xa hoi",
        "mua nha xa hoi",
        "thue nha xa hoi"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-dung-chung.html?ma_thu_tuc=1.014632",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Đăng ký mua, thuê mua, thuê nhà ở xã hội, vay vốn để hộ gia đình, cá nhân tự xây dựng hoặc cải tạo, sửa chữa nhà ở",
      "procedureCode": "1.014632",
      "label": "Vào thủ tục Đăng ký nhà ở xã hội",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "disability",
      "title": "Xác định mức độ khuyết tật",
      "group": "welfare",
      "terms": [
        "xac nhan khuyet tat",
        "giay khuyet tat",
        "xac dinh muc do khuyet tat"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-dung-chung.html?ma_thu_tuc=1.001699",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Xác định, xác định lại mức độ khuyết tật và cấp Giấy xác nhận khuyết tật",
      "procedureCode": "1.001699",
      "label": "Vào thủ tục Xác định mức độ khuyết tật",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "disability-replace",
      "title": "Đổi, cấp lại xác nhận khuyết tật",
      "group": "welfare",
      "terms": [
        "cap lai giay khuyet tat",
        "doi giay khuyet tat"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-dung-chung.html?ma_thu_tuc=1.001653",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Đổi, cấp lại Giấy xác nhận khuyết tật",
      "procedureCode": "1.001653",
      "label": "Vào thủ tục Đổi, cấp lại xác nhận khuyết tật",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "social-allowance",
      "title": "Trợ cấp xã hội hằng tháng",
      "group": "welfare",
      "terms": [
        "tro cap xa hoi",
        "bao tro xa hoi",
        "ho tro cham soc nuoi duong"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-dung-chung.html?ma_thu_tuc=1.001776",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Thực hiện, điều chỉnh, thôi hưởng trợ cấp xã hội hàng tháng, hỗ trợ kinh phí chăm sóc, nuôi dưỡng hàng tháng",
      "procedureCode": "1.001776",
      "label": "Vào thủ tục Trợ cấp xã hội hằng tháng",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "social-pension",
      "title": "Trợ cấp hưu trí xã hội",
      "group": "welfare",
      "terms": [
        "huu tri xa hoi",
        "tro cap nguoi cao tuoi",
        "tro cap huu tri xa hoi"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-dung-chung.html?ma_thu_tuc=1.014027",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Thực hiện, điều chỉnh thôi hưởng trợ cấp hưu trí xã hội",
      "procedureCode": "1.014027",
      "label": "Vào thủ tục Trợ cấp hưu trí xã hội",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "poor-household",
      "title": "Công nhận hộ nghèo, cận nghèo",
      "group": "welfare",
      "terms": [
        "xac nhan ho ngheo",
        "cong nhan ho ngheo",
        "ho can ngheo"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=1.011607",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Công nhận hộ nghèo, hộ cận nghèo thường xuyên hằng năm",
      "procedureCode": "1.011607",
      "label": "Vào thủ tục Công nhận hộ nghèo, cận nghèo",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "martyr-family",
      "title": "Trợ cấp thân nhân liệt sĩ",
      "group": "welfare",
      "terms": [
        "tro cap than nhan liet si",
        "che do than nhan liet si"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=1.010801",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Giải quyết chế độ trợ cấp ưu đãi đối với thân nhân liệt sĩ",
      "procedureCode": "1.010801",
      "label": "Vào thủ tục Trợ cấp thân nhân liệt sĩ",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "unemployment",
      "title": "Trợ cấp thất nghiệp",
      "group": "welfare",
      "terms": [
        "tro cap that nghiep",
        "bao hiem that nghiep",
        "huong bhtn"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://vpcp.dichvucong.gov.vn/p/home/dvc-ket-qua-thu-tuc.html?originKey=Gi%E1%BA%A3i%20quy%E1%BA%BFt%20tr%E1%BB%A3%20c%E1%BA%A5p%20th%E1%BA%A5t%20nghi%E1%BB%87p&tukhoa=Gi%E1%BA%A3i%20quy%E1%BA%BFt%20tr%E1%BB%A3%20c%E1%BA%A5p%20th%E1%BA%A5t%20nghi%E1%BB%87p&tinh_thanh=",
      "source": "https://vpcp.dichvucong.gov.vn/p/home/dvc-dich-vu-cong-truc-tuyen-ds.html",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "FILTERED_DIRECTORY",
      "label": "Tra đúng danh mục Trợ cấp thất nghiệp",
      "scope": "Đã đặt sẵn tên thủ tục. Chọn bản công bố đúng cơ quan tại cổng; chưa xác minh một trang nộp riêng dùng chung mọi trường hợp."
    },
    {
      "id": "social-lump",
      "title": "BHXH một lần",
      "group": "welfare",
      "terms": [
        "bhxh mot lan",
        "rut bao hiem xa hoi",
        "bao hiem xa hoi mot lan"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://vpcp.dichvucong.gov.vn/p/home/dvc-ket-qua-thu-tuc.html?originKey=Gi%E1%BA%A3i%20quy%E1%BA%BFt%20h%C6%B0%E1%BB%9Fng%20b%E1%BA%A3o%20hi%E1%BB%83m%20x%C3%A3%20h%E1%BB%99i%20m%E1%BB%99t%20l%E1%BA%A7n&tukhoa=Gi%E1%BA%A3i%20quy%E1%BA%BFt%20h%C6%B0%E1%BB%9Fng%20b%E1%BA%A3o%20hi%E1%BB%83m%20x%C3%A3%20h%E1%BB%99i%20m%E1%BB%99t%20l%E1%BA%A7n&tinh_thanh=",
      "source": "https://vpcp.dichvucong.gov.vn/p/home/dvc-dich-vu-cong-truc-tuyen-ds.html",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "FILTERED_DIRECTORY",
      "label": "Tra đúng danh mục BHXH một lần",
      "scope": "Đã đặt sẵn tên thủ tục. Chọn bản công bố đúng cơ quan tại cổng; chưa xác minh một trang nộp riêng dùng chung mọi trường hợp."
    },
    {
      "id": "maternity",
      "title": "Chế độ thai sản",
      "group": "welfare",
      "terms": [
        "che do thai san",
        "tro cap thai san"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://vpcp.dichvucong.gov.vn/p/home/dvc-ket-qua-thu-tuc.html?originKey=Gi%E1%BA%A3i%20quy%E1%BA%BFt%20h%C6%B0%E1%BB%9Fng%20ch%E1%BA%BF%20%C4%91%E1%BB%99%20thai%20s%E1%BA%A3n&tukhoa=Gi%E1%BA%A3i%20quy%E1%BA%BFt%20h%C6%B0%E1%BB%9Fng%20ch%E1%BA%BF%20%C4%91%E1%BB%99%20thai%20s%E1%BA%A3n&tinh_thanh=",
      "source": "https://vpcp.dichvucong.gov.vn/p/home/dvc-dich-vu-cong-truc-tuyen-ds.html",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "FILTERED_DIRECTORY",
      "label": "Tra đúng danh mục Chế độ thai sản",
      "scope": "Đã đặt sẵn tên thủ tục. Chọn bản công bố đúng cơ quan tại cổng; chưa xác minh một trang nộp riêng dùng chung mọi trường hợp.",
      "legacyId": "maternity"
    },
    {
      "id": "pension",
      "title": "Hưởng lương hưu BHXH",
      "group": "welfare",
      "terms": [
        "huong luong huu",
        "thu tuc nghi huu",
        "luong huu"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://vpcp.dichvucong.gov.vn/p/home/dvc-ket-qua-thu-tuc.html?originKey=Gi%E1%BA%A3i%20quy%E1%BA%BFt%20h%C6%B0%E1%BB%9Fng%20l%C6%B0%C6%A1ng%20h%C6%B0u&tukhoa=Gi%E1%BA%A3i%20quy%E1%BA%BFt%20h%C6%B0%E1%BB%9Fng%20l%C6%B0%C6%A1ng%20h%C6%B0u&tinh_thanh=",
      "source": "https://vpcp.dichvucong.gov.vn/p/home/dvc-dich-vu-cong-truc-tuyen-ds.html",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "FILTERED_DIRECTORY",
      "label": "Tra đúng danh mục Hưởng lương hưu BHXH",
      "scope": "Đã đặt sẵn tên thủ tục. Chọn bản công bố đúng cơ quan tại cổng; chưa xác minh một trang nộp riêng dùng chung mọi trường hợp.",
      "legacyId": "pension"
    },
    {
      "id": "business",
      "title": "Đăng ký hộ kinh doanh",
      "group": "business",
      "terms": [
        "dang ky ho kinh doanh",
        "mo ho kinh doanh",
        "dang ky kinh doanh",
        "mo quan"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://thutuc.dichvucong.gov.vn/p/home/dvc-tthc-thu-tuc-hanh-chinh-chi-tiet.html?ma_thu_tuc=2350",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Đăng ký thành lập hộ kinh doanh",
      "procedureCode": "1.001612",
      "label": "Vào thủ tục Đăng ký hộ kinh doanh",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục.",
      "legacyId": "business"
    },
    {
      "id": "business-change",
      "title": "Thay đổi đăng ký hộ kinh doanh",
      "group": "business",
      "terms": [
        "thay doi ho kinh doanh",
        "doi dia chi ho kinh doanh",
        "doi ten ho kinh doanh"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=2.000720",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Đăng ký thay đổi nội dung đăng ký hộ kinh doanh",
      "procedureCode": "2.000720",
      "label": "Vào thủ tục Thay đổi đăng ký hộ kinh doanh",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục.",
      "sourceProcedureCode": "2.00072"
    },
    {
      "id": "business-pause",
      "title": "Tạm ngừng hộ kinh doanh",
      "group": "business",
      "terms": [
        "tam ngung ho kinh doanh",
        "tam nghi kinh doanh",
        "tam ngung kinh doanh"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=1.001570",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Tạm ngừng kinh doanh, tiếp tục kinh doanh trước thời hạn đã thông báo của hộ kinh doanh",
      "procedureCode": "1.001570",
      "label": "Vào thủ tục Tạm ngừng hộ kinh doanh",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục.",
      "sourceProcedureCode": "1.00157"
    },
    {
      "id": "business-close",
      "title": "Chấm dứt hộ kinh doanh",
      "group": "business",
      "terms": [
        "cham dut ho kinh doanh",
        "dong ho kinh doanh",
        "dong cua ho kinh doanh"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=1.001266",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Chấm dứt hoạt động hộ kinh doanh",
      "procedureCode": "1.001266",
      "label": "Vào thủ tục Chấm dứt hộ kinh doanh",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "business-replace",
      "title": "Cấp lại đăng ký hộ kinh doanh",
      "group": "business",
      "terms": [
        "cap lai dang ky ho kinh doanh",
        "mat giay ho kinh doanh"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-hanh-chinh.html?ma_thu_tuc=2.000575",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Cấp lại Giấy chứng nhận đăng ký hộ kinh doanh",
      "procedureCode": "2.000575",
      "label": "Vào thủ tục Cấp lại đăng ký hộ kinh doanh",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "food-safety",
      "title": "Giấy chứng nhận an toàn thực phẩm",
      "group": "business",
      "terms": [
        "giay an toan thuc pham",
        "chung nhan attp",
        "giay phep ve sinh thuc pham"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-dung-chung.html?ma_thu_tuc=1.013855",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Cấp Giấy chứng nhận cơ sở đủ điều kiện an toàn thực phẩm đối với cơ sở sản xuất thực phẩm, kinh doanh dịch vụ ăn uống",
      "procedureCode": "1.013855",
      "label": "Vào thủ tục Giấy chứng nhận an toàn thực phẩm",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "study-support",
      "title": "Hỗ trợ chi phí học tập",
      "group": "education",
      "terms": [
        "ho tro chi phi hoc tap",
        "ho tro hoc tap"
      ],
      "kind": "CHOICE",
      "reviewedAt": "2026-10-12",
      "question": "Cơ sở giáo dục thuộc loại nào?",
      "choices": [
        [
          "study-public",
          "Mầm non/phổ thông công lập"
        ],
        [
          "study-private",
          "Mầm non/phổ thông tư thục"
        ]
      ]
    },
    {
      "id": "study-public",
      "title": "Hỗ trợ học tập · trường công lập",
      "group": "education",
      "terms": [
        "ho tro hoc tap truong cong",
        "ho tro chi phi hoc tap cong lap"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-dung-chung.html?ma_thu_tuc=1.014336",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Đề nghị hỗ trợ chi phí học tập trong cơ sở giáo dục mầm non công lập, cơ sở giáo dục phổ thông công lập, cơ sở giáo dục công lập thực hiện chương trình giáo dục phổ thông",
      "procedureCode": "1.014336",
      "label": "Vào thủ tục Hỗ trợ học tập · trường công lập",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "study-private",
      "title": "Hỗ trợ học tập · trường tư thục",
      "group": "education",
      "terms": [
        "ho tro hoc tap truong tu",
        "ho tro chi phi hoc tap tu thuc"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-dung-chung.html?ma_thu_tuc=1.014337",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Đề nghị hỗ trợ chi phí học tập trong cơ sở giáo dục mầm non dân lập, tư thục; trường tiểu học tư thục, trường trung học cơ sở tư thục, cơ sở giáo dục thường xuyên tư thục, cơ sở giáo dục mầm non, trường tiểu học, trung học cơ sở trong các trường đại học, cao đẳng, viện nghiên cứu",
      "procedureCode": "1.014337",
      "label": "Vào thủ tục Hỗ trợ học tập · trường tư thục",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "school-disability",
      "title": "Học bổng, đồ dùng học tập cho người khuyết tật",
      "group": "education",
      "terms": [
        "hoc bong nguoi khuyet tat",
        "do dung hoc tap khuyet tat"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-dung-chung.html?ma_thu_tuc=1.001714",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Cấp học bổng và hỗ trợ kinh phí mua phương tiện, đồ dùng học tập dùng riêng cho người khuyết tật học tại các cơ sở giáo dục",
      "procedureCode": "1.001714",
      "label": "Vào thủ tục Học bổng, đồ dùng học tập cho người khuyết tật",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "school-exemption",
      "title": "Miễn, giảm học phí",
      "group": "education",
      "terms": [
        "mien hoc phi",
        "giam hoc phi",
        "mien giam hoc phi"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://vpcp.dichvucong.gov.vn/p/home/dvc-ket-qua-thu-tuc.html?originKey=Mi%E1%BB%85n%20gi%E1%BA%A3m%20h%E1%BB%8Dc%20ph%C3%AD&tukhoa=Mi%E1%BB%85n%20gi%E1%BA%A3m%20h%E1%BB%8Dc%20ph%C3%AD&tinh_thanh=",
      "source": "https://vpcp.dichvucong.gov.vn/p/home/dvc-dich-vu-cong-truc-tuyen-ds.html",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "FILTERED_DIRECTORY",
      "label": "Tra đúng danh mục Miễn, giảm học phí",
      "scope": "Đã đặt sẵn tên thủ tục. Chọn bản công bố đúng cơ quan tại cổng; chưa xác minh một trang nộp riêng dùng chung mọi trường hợp."
    },
    {
      "id": "law",
      "title": "Tra văn bản pháp luật",
      "group": "law",
      "terms": [
        "tra van ban phap luat",
        "van ban phap luat",
        "tra nghi dinh",
        "tra thong tu",
        "tra luat"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://vanban.chinhphu.vn/",
      "source": "https://vanban.chinhphu.vn/",
      "publisher": "Cổng TTĐT Chính phủ",
      "level": "SEARCH_FUNCTION",
      "label": "Tra văn bản tại hệ thống Chính phủ"
    },
    {
      "id": "national-feedback",
      "title": "Phản ánh, kiến nghị về thủ tục hành chính",
      "group": "law",
      "terms": [
        "phan anh thu tuc hanh chinh",
        "kien nghi thu tuc",
        "phan anh dich vu cong"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://vpcp.dichvucong.gov.vn/p/phananhkiennghi/pakn-search.html",
      "source": "https://vpcp.dichvucong.gov.vn/p/home/dvc-dich-vu-cong-truc-tuyen-ds.html",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "SEARCH_FUNCTION",
      "label": "Mở mục phản ánh, kiến nghị",
      "scope": "Trang tra cứu phản ánh đã công bố; để gửi phản ánh, chọn Gửi PAKN và đăng nhập tại cổng. Không thay cho đơn khiếu nại hoặc tố cáo."
    },
    {
      "id": "complaint",
      "title": "Khiếu nại lần đầu thuộc thẩm quyền cấp xã",
      "group": "law",
      "terms": [
        "khieu nai cap xa",
        "khieu nai lan dau cap xa"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-dung-chung.html?ma_thu_tuc=2.002409",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Thủ tục giải quyết khiếu nại lần đầu tại cấp xã",
      "procedureCode": "2.002409",
      "label": "Vào thủ tục Khiếu nại lần đầu thuộc thẩm quyền cấp xã",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "accusation",
      "title": "Tố cáo thuộc thẩm quyền cấp xã",
      "group": "law",
      "terms": [
        "to cao cap xa",
        "giai quyet to cao cap xa"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.gov.vn/p/home/dvc-chi-tiet-thu-tuc-dung-chung.html?ma_thu_tuc=2.002396",
      "source": "https://baccamranh.khanhhoa.gov.vn/vi/cai-cach-thu-tuc-hanh-chinh/cong-khai-tthc",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "PROCEDURE_PAGE",
      "officialTitle": "Thủ tục giải quyết tố cáo tại cấp xã",
      "procedureCode": "2.002396",
      "label": "Vào thủ tục Tố cáo thuộc thẩm quyền cấp xã",
      "scope": "Chọn cơ quan thực hiện và nơi nộp hồ sơ tại hệ thống đích. Phí, điều kiện và hồ sơ xem trên trang thủ tục."
    },
    {
      "id": "complaint-general",
      "title": "Khiếu nại / tố cáo",
      "group": "law",
      "terms": [
        "khieu nai",
        "to cao"
      ],
      "kind": "CHOICE",
      "reviewedAt": "2026-10-12",
      "question": "Đã xác định cơ quan có thẩm quyền cấp xã chưa?",
      "choices": [
        [
          "complaint",
          "Khiếu nại lần đầu · cấp xã"
        ],
        [
          "accusation",
          "Tố cáo · cấp xã"
        ],
        [
          "agency-help",
          "Chưa rõ cơ quan tiếp nhận"
        ]
      ]
    },
    {
      "id": "agency-help",
      "title": "Tìm cơ quan có thẩm quyền",
      "group": "law",
      "terms": [
        "co quan tiep nhan don"
      ],
      "kind": "LOCAL",
      "reviewedAt": "2026-10-12",
      "route": "agencies"
    },
    {
      "id": "party-dues",
      "title": "Nộp đảng phí",
      "group": "party",
      "terms": [
        "nop dang phi",
        "dong dang phi",
        "thanh toan dang phi",
        "dang phi",
        "nop phi dang"
      ],
      "kind": "APP",
      "reviewedAt": "2026-10-12",
      "appId": "icpvtthc",
      "functionLabel": "Thu nộp đảng phí",
      "source": "https://play.google.com/store/apps/details?id=com.vnpt.dvc.vptw",
      "publisher": "iCPV TTHC · VNPT",
      "scope": "Thực hiện tại iCPV TTHC. Số tiền, kỳ phải nộp và trạng thái do hệ thống của đơn vị trả; VN App không thu tiền."
    },
    {
      "id": "party-transfer",
      "title": "Chuyển sinh hoạt Đảng",
      "group": "party",
      "terms": [
        "chuyen sinh hoat dang",
        "chuyen dang bo",
        "chuyen chi bo"
      ],
      "kind": "APP",
      "reviewedAt": "2026-10-12",
      "appId": "icpvtthc",
      "functionLabel": "Chuyển sinh hoạt Đảng",
      "source": "https://play.google.com/store/apps/details?id=com.vnpt.dvc.vptw",
      "publisher": "iCPV TTHC · VNPT",
      "scope": "Chọn đúng loại chuyển sinh hoạt và đơn vị tiếp nhận trong app; chưa có liên kết mở riêng từng loại đã xác minh."
    },
    {
      "id": "party-dues-history",
      "title": "Lịch sử nộp đảng phí",
      "group": "party",
      "terms": [
        "lich su dang phi",
        "kiem tra dang phi",
        "tra cuu dang phi",
        "dang phi da nop"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.dcs.vn/web/dvc/lich-su-nop-dang-phi",
      "source": "https://dichvucong.dcs.vn/",
      "routeEvidence": "https://dichvucong.dcs.vn/dvc/main.js",
      "publisher": "Hệ thống giải quyết TTHC của Đảng",
      "level": "AUTH_FUNCTION",
      "label": "Mở Lịch sử nộp đảng phí",
      "scope": "Đăng nhập tại hệ thống đích; VN App không nhận hoặc lưu tài khoản, số thẻ đảng viên hay hồ sơ."
    },
    {
      "id": "party-files",
      "title": "Hồ sơ TTHC Đảng của tôi",
      "group": "party",
      "terms": [
        "ho so tthc dang",
        "tien do ho so dang",
        "ho so dang vien"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.dcs.vn/web/dvc/dich-vu-cong-cua-toi",
      "source": "https://dichvucong.dcs.vn/",
      "routeEvidence": "https://dichvucong.dcs.vn/dvc/main.js",
      "publisher": "Hệ thống giải quyết TTHC của Đảng",
      "level": "AUTH_FUNCTION",
      "label": "Mở Hồ sơ TTHC Đảng của tôi",
      "scope": "Đăng nhập tại hệ thống đích; VN App không nhận hoặc lưu tài khoản, số thẻ đảng viên hay hồ sơ."
    },
    {
      "id": "party-book",
      "title": "Sổ tay đảng viên · iCPV Book",
      "group": "party",
      "terms": [
        "so tay dang vien",
        "icpv book",
        "sinh hoat chi bo",
        "tai lieu sinh hoat chi bo"
      ],
      "kind": "APP",
      "reviewedAt": "2026-10-12",
      "appId": "icpv",
      "functionLabel": "Sổ tay đảng viên",
      "source": "https://nhuxuan.thanhhoa.gov.vn/xay-dung-dang-135457/86e3f2565225606411d6f0d59e1e6a29-633121",
      "publisher": "iCPV Book",
      "scope": "Sổ tay đọc tài liệu và hỗ trợ sinh hoạt chi bộ; thu nộp đảng phí và hồ sơ chuyển sinh hoạt dùng iCPV TTHC."
    },
    {
      "id": "party-rules",
      "title": "Văn bản, quy định của Đảng",
      "group": "party",
      "terms": [
        "van ban dang",
        "quy dinh cua dang",
        "nghi quyet dang",
        "chi thi dang",
        "huong dan cong tac dang"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://tulieuvankien.dangcongsan.vn/he-thong-van-ban/van-ban-cua-dang?categoryId=102000092",
      "source": "https://tulieuvankien.dangcongsan.vn/he-thong-van-ban/van-ban-cua-dang?categoryId=102000092",
      "publisher": "Cổng thông tin, tư liệu và TTHC của Đảng",
      "level": "TOPIC_DIRECTORY",
      "label": "Mở Văn bản, quy định của Đảng"
    },
    {
      "id": "party-charter",
      "title": "Điều lệ Đảng",
      "group": "party",
      "terms": [
        "dieu le dang",
        "tra dieu le dang"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://tulieuvankien.dangcongsan.vn/tu-lieu-van-kien-dang/dieu-le-dang",
      "source": "https://tulieuvankien.dangcongsan.vn/tu-lieu-van-kien-dang/dieu-le-dang",
      "publisher": "Cổng thông tin, tư liệu và TTHC của Đảng",
      "level": "TOPIC_DIRECTORY",
      "label": "Mở Điều lệ Đảng"
    },
    {
      "id": "party-congress",
      "title": "Văn kiện Đại hội Đảng XIV",
      "group": "party",
      "terms": [
        "van kien dai hoi dang",
        "van kien dai hoi xiv",
        "dai hoi dang xiv"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://tulieuvankien.dangcongsan.vn/bo-chinh-tri-ban-bi-thu-ban-chap-hanh-trung-uong/dai-hoi-dang/lan-thu-xiv",
      "source": "https://tulieuvankien.dangcongsan.vn/bo-chinh-tri-ban-bi-thu-ban-chap-hanh-trung-uong/dai-hoi-dang/lan-thu-xiv",
      "publisher": "Cổng thông tin, tư liệu và TTHC của Đảng",
      "level": "TOPIC_DIRECTORY",
      "label": "Mở Văn kiện Đại hội Đảng XIV"
    },
    {
      "id": "party-committee",
      "title": "Đảng bộ tỉnh, thành phố",
      "group": "party",
      "terms": [
        "tinh uy",
        "thanh uy",
        "dang bo tinh",
        "dang bo thanh pho"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://tulieuvankien.dangcongsan.vn/cac-dang-bo-truc-thuoc-trung-uong/cac-tinh-uy-thanh-uy?categoryId=102000126",
      "source": "https://tulieuvankien.dangcongsan.vn/cac-dang-bo-truc-thuoc-trung-uong/cac-tinh-uy-thanh-uy?categoryId=102000126",
      "publisher": "Cổng thông tin, tư liệu và TTHC của Đảng",
      "level": "TOPIC_DIRECTORY",
      "label": "Mở Đảng bộ tỉnh, thành phố"
    },
    {
      "id": "party-help",
      "title": "Hướng dẫn TTHC của Đảng",
      "group": "party",
      "terms": [
        "huong dan nop dang phi",
        "huong dan tthc dang",
        "huong dan chuyen sinh hoat dang"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://dichvucong.dcs.vn/web/dvc/ho-tro/huong-dan-dan-su-dung",
      "source": "https://dichvucong.dcs.vn/web/dvc/ho-tro/huong-dan-dan-su-dung",
      "publisher": "Cổng thông tin, tư liệu và TTHC của Đảng",
      "level": "TOPIC_DIRECTORY",
      "label": "Mở Hướng dẫn TTHC của Đảng"
    },
    {
      "id": "identity-first",
      "title": "Cấp căn cước lần đầu",
      "group": "identity",
      "terms": [
        "cap can cuoc lan dau",
        "cccd lan dau",
        "can cuoc lan dau"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://vpcp.dichvucong.gov.vn/p/home/dvc-ket-qua-thu-tuc.html?originKey=C%E1%BA%A5p%20th%E1%BA%BB%20c%C4%83n%20c%C6%B0%E1%BB%9Bc&tukhoa=C%E1%BA%A5p%20th%E1%BA%BB%20c%C4%83n%20c%C6%B0%E1%BB%9Bc&tinh_thanh=",
      "source": "https://vpcp.dichvucong.gov.vn/p/home/dvc-dich-vu-cong-truc-tuyen-ds.html",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "FILTERED_DIRECTORY",
      "label": "Tra danh mục Cấp căn cước lần đầu",
      "scope": "Đã đặt sẵn tên thủ tục. Chọn đúng cơ quan, trường hợp và nơi thực hiện tại cổng; chưa có một liên kết nộp riêng được xác minh cho mọi trường hợp."
    },
    {
      "id": "identity-exchange",
      "title": "Cấp đổi căn cước",
      "group": "identity",
      "terms": [
        "cap doi can cuoc",
        "doi the can cuoc",
        "doi cccd"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://vpcp.dichvucong.gov.vn/p/home/dvc-ket-qua-thu-tuc.html?originKey=C%E1%BA%A5p%20%C4%91%E1%BB%95i%20th%E1%BA%BB%20c%C4%83n%20c%C6%B0%E1%BB%9Bc&tukhoa=C%E1%BA%A5p%20%C4%91%E1%BB%95i%20th%E1%BA%BB%20c%C4%83n%20c%C6%B0%E1%BB%9Bc&tinh_thanh=",
      "source": "https://vpcp.dichvucong.gov.vn/p/home/dvc-dich-vu-cong-truc-tuyen-ds.html",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "FILTERED_DIRECTORY",
      "label": "Tra danh mục Cấp đổi căn cước",
      "scope": "Đã đặt sẵn tên thủ tục. Chọn đúng cơ quan, trường hợp và nơi thực hiện tại cổng; chưa có một liên kết nộp riêng được xác minh cho mọi trường hợp."
    },
    {
      "id": "identity-lost",
      "title": "Cấp lại căn cước",
      "group": "identity",
      "terms": [
        "cap lai can cuoc",
        "mat can cuoc",
        "mat cccd"
      ],
      "kind": "APP",
      "legacyId": "identity",
      "appId": "vneid",
      "functionLabel": "Cấp lại căn cước",
      "source": "https://play.google.com/store/apps/details?id=com.vnid",
      "publisher": "VNeID · Bộ Công an",
      "reviewedAt": "2026-10-12"
    },
    {
      "id": "identity-apply",
      "title": "Cấp căn cước: lần đầu, đổi, cấp lại",
      "group": "identity",
      "terms": [
        "lam can cuoc",
        "lam cccd",
        "cap can cuoc"
      ],
      "kind": "CHOICE",
      "question": "Bạn làm lần đầu, đổi thẻ hay cấp lại?",
      "choices": [
        [
          "identity-first",
          "Lần đầu"
        ],
        [
          "identity-exchange",
          "Cấp đổi"
        ],
        [
          "identity-lost",
          "Cấp lại"
        ]
      ],
      "reviewedAt": "2026-10-12"
    },
    {
      "id": "criminal-record",
      "title": "Cấp Phiếu lý lịch tư pháp",
      "group": "identity",
      "terms": [
        "ly lich tu phap",
        "phieu ly lich tu phap",
        "lam lltp"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://vpcp.dichvucong.gov.vn/p/home/dvc-ket-qua-thu-tuc.html?originKey=C%E1%BA%A5p%20Phi%E1%BA%BFu%20l%C3%BD%20l%E1%BB%8Bch%20t%C6%B0%20ph%C3%A1p&tukhoa=C%E1%BA%A5p%20Phi%E1%BA%BFu%20l%C3%BD%20l%E1%BB%8Bch%20t%C6%B0%20ph%C3%A1p&tinh_thanh=",
      "source": "https://vpcp.dichvucong.gov.vn/p/home/dvc-dich-vu-cong-truc-tuyen-ds.html",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "FILTERED_DIRECTORY",
      "label": "Tra danh mục Cấp Phiếu lý lịch tư pháp",
      "scope": "Đã đặt sẵn tên thủ tục. Chọn đúng cơ quan, trường hợp và nơi thực hiện tại cổng; chưa có một liên kết nộp riêng được xác minh cho mọi trường hợp."
    },
    {
      "id": "land-split",
      "title": "Tách thửa, hợp thửa đất",
      "group": "property",
      "terms": [
        "tach thua dat",
        "hop thua dat",
        "tach thua",
        "hop thua"
      ],
      "kind": "WEB",
      "reviewedAt": "2026-10-12",
      "url": "https://vpcp.dichvucong.gov.vn/p/home/dvc-ket-qua-thu-tuc.html?originKey=T%C3%A1ch%20th%E1%BB%ADa%20h%E1%BB%A3p%20th%E1%BB%ADa%20%C4%91%E1%BA%A5t&tukhoa=T%C3%A1ch%20th%E1%BB%ADa%20h%E1%BB%A3p%20th%E1%BB%ADa%20%C4%91%E1%BA%A5t&tinh_thanh=",
      "source": "https://vpcp.dichvucong.gov.vn/p/home/dvc-dich-vu-cong-truc-tuyen-ds.html",
      "publisher": "Cổng Dịch vụ công Quốc gia",
      "level": "FILTERED_DIRECTORY",
      "label": "Tra danh mục Tách thửa, hợp thửa đất",
      "scope": "Đã đặt sẵn tên thủ tục. Chọn đúng cơ quan, trường hợp và nơi thực hiện tại cổng; chưa có một liên kết nộp riêng được xác minh cho mọi trường hợp."
    }
  ],
  "APPS": [
    {
      "id": "icpvtthc",
      "name": "iCPV TTHC",
      "agency": "VNPT · Hệ thống thủ tục hành chính của Đảng",
      "group": "Công tác Đảng",
      "short": "Đảng phí, hồ sơ và chuyển sinh hoạt Đảng; khác iCPV Book.",
      "android": "https://play.google.com/store/apps/details?id=com.vnpt.dvc.vptw",
      "ios": "https://apps.apple.com/vn/app/icpv-tthc/id6757136196",
      "site": "https://dichvucong.dcs.vn/",
      "keywords": "dang phi chuyen sinh hoat dang tthc",
      "bills": []
    }
  ]
};
const norm=L.normalize,contains=(q,t)=>(' '+q+' ').includes(' '+norm(t)+' '),urls=new Set([...DATA.SERVICES.flatMap(s=>[s.url,s.source]),...DATA.APPS.flatMap(a=>[a.android,a.ios,a.site])].filter(Boolean));
function validUrl(value){try{const u=new URL(value);return u.protocol==='https:'&&!u.username&&!u.password&&urls.has(value);}catch{return false;}}
function match(raw){const q=L.understand(raw).query;if(!q||/\b(?:khong|dung)\s+(?:(?:muon|can)\s+)?(?:nop|dong|lam|dang ky|tra|tim|chuyen)\b/.test(q))return {status:'NONE',services:[]};function single(part){const ranked=DATA.SERVICES.map(s=>({s,score:Math.max(0,...[s.title,...s.terms].filter(t=>contains(part,t)).map(t=>norm(t).length))})).filter(x=>x.score).sort((a,b)=>b.score-a.score);return ranked.length?ranked.filter(x=>x.score===ranked[0].score).map(x=>x.s):[];}let found=single(q);const parts=q.split(/\b(?:va|hoac)\b/);if(parts.length>1){const split=parts.flatMap(single);if(split.length>1)found=split;}found=[...new Map(found.map(s=>[s.id,s])).values()].filter(s=>!found.some(other=>other!==s&&other.covers?.includes(s.id)));return {status:found.length===1?'MATCH':found.length?'CHOICE':'NONE',services:found};}

function find(raw='',group=''){const words=L.understand(raw).query.split(' ').filter(Boolean);return DATA.SERVICES.filter(s=>(!group||s.group===group)&&words.every(w=>norm([s.title,...s.terms].join(' ')).split(' ').includes(w)));}
function resolve(id,raw='',choice=''){let s=DATA.SERVICES.find(s=>s.id===id);if(!s)return {status:'UNKNOWN'};if(s.kind==='CHOICE'){if(!choice)return {status:'QUESTION',service:s};if(!s.choices.some(c=>c[0]===choice))return {status:'UNKNOWN'};return resolve(choice,raw);}const q=norm(raw);if(s.group==='family'&&/dai su quan|lanh su quan|tai nuoc ngoai/.test(q))return {status:'GAP',service:s,question:'Cần quốc gia và cơ quan đại diện lãnh sự để xác định đúng kênh; chưa mở thủ tục hộ tịch trong nước cho trường hợp này.'};if(['birth','marriage','rebirth','remarriage','death','adoption'].includes(id)&&/nuoc ngoai|nguoi ngoai quoc|quoc tich khac/.test(q)){const next=id+'-foreign';if(DATA.SERVICES.some(x=>x.id===next))s=DATA.SERVICES.find(x=>x.id===next);else return {status:'GAP',service:s,question:'Cần thủ tục có yếu tố nước ngoài; chưa có trang đúng trường hợp được xác minh.'};}return {status:s.kind,service:s};}
return Object.freeze({...DATA,normalize:norm,validUrl,match,find,resolve});});
