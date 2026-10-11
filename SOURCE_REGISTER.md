# Danh mục nguồn và kiểm định liên kết — 11/10/2026

Nguồn đối chiếu: website cơ quan quản lý và trang ứng dụng Google Play / App Store có thông tin nhà phát hành. Link các app nằm trong `data.js` và có `source` mô tả nguồn kiểm chứng. Trong bản mẫu chưa tải bản gốc biểu tượng về, nên không có hình minh họa thay thế.

| Ứng dụng | Android | iOS | Cơ sở đối chiếu |
|---|---|---|---|
| VNeID | com.vnid | id1582750372 | universal.vneid.gov.vn; kho ứng dụng ghi Trung tâm dữ liệu quốc gia về dân cư |
| VNeTraffic | com.ots.c08.vnetraffic | id6475181815 | mô tả kho ứng dụng ghi quyền Cục CSGT/ủy quyền GTEL |
| Sổ tay đảng viên iCPV - Book | vn.dcs.icpvbook | id6744908429 | nguồn chính quyền địa phương hướng dẫn iCPV-Book; kho ứng dụng ghi Viettel |
| Công dân số TPHCM | vn.gov.tphcm.hcmccitizen | id6737809050 | Trung tâm Chuyển đổi số TPHCM / các cổng thành phố |
| eTax Mobile | com.etax.icanhan | id1589750682 | kho ứng dụng ghi cơ quan Thuế |
| VssID | com.bhxhapp | id1521647264 | trang tải chính thức baohiemxahoi.gov.vn |
| SOS An ninh trật tự - CATP HCM | com.ots.cbkc.catp | id6742221934 | kho ứng dụng nêu quyền CATP HCM / GTEL |
| Help 114 | com.mobicall.mobicall114 | id1262343518 | hướng dẫn trên pccc-congan.hochiminhcity.gov.vn |

**Điểm cập nhật đặc biệt:** Cổng Dịch vụ công quốc gia chuyển hệ thống vận hành sang `dichvucong.gov.vn` ngày 21-24/4/2026. Nguồn thông báo: https://vpcp.dichvucong.gov.vn/p/home/dvc-chi-tiet-tin-tuc.html?new_id=982

**Lưu ý kiểm định:** Đây là đối chiếu nội dung công khai, không phải giấy chứng nhận bảo trợ/chứng thực chính thức cho VN App. Chưa thể xác minh được tính ổn định và tất cả đường dẫn con trong môi trường mạng thực tế. Một số website chặn robot/đăng nhập/redirect. Do đó mẫu chỉ chuyển tới trang chủ đáng tin cậy hoặc trang app store chính chủ, không tự bịa URL deep link cụ thể.

## Bổ sung khi nâng cấp bộ xử lý V2 (11/10/2026)

Các đường dẫn **trực tiếp đến nghiệp vụ** đã được đối chiếu bằng nguồn thuộc tên miền cơ quan có thẩm quyền:

- BHYT: https://baohiemxahoi.gov.vn/tracuu/pages/tra-cuu-thoi-han-su-dung-the-bhyt.aspx — nguồn BHXH Việt Nam.
- Đổi GPLX: https://dichvucong.gov.vn/p/home/dvc-tthc-thu-tuc-hanh-chinh-chi-tiet.html?ma_thu_tuc=372344 — bản niêm yết trên DVC Quốc gia; điều kiện thực hiện cần kiểm tra trên trang.
- Thông báo lưu trú: https://dichvucong.gov.vn/p/home/dvc-tthc-thu-tuc-hanh-chinh-chi-tiet.html?ma_thu_tuc=3931 — bản niêm yết trên DVC Quốc gia.
- Phạt nguội: https://www.csgt.vn/ — trang CSGT có khối tra cứu phương tiện vi phạm qua hình ảnh; **không** dán đường dẫn biểu mẫu tách riêng chưa xác nhận.

Nguồn chính thức không tương đương API truy vấn kết quả. Link chi tiết có thể thay đổi theo địa bàn hoặc phiên bản niêm yết; phải kiểm định lần nữa trước phát hành sản phẩm công cộng.
