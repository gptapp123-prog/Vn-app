# VN App V3.2 — Thêm ứng dụng và thanh toán hóa đơn

Ngày 11/10/2026. Bản mã nguồn nâng cấp; chưa triển khai lên website hoặc điện thoại người dùng.

## Chức năng mới
- Kho ứng dụng: thêm, sửa, xóa ứng dụng bằng liên kết trực tiếp Google Play/App Store. Không nhận APK hoặc liên kết tải từ website bất kỳ.
- Lĩnh vực: thanh toán hóa đơn, ngân hàng & tài chính, mua sắm, vận chuyển, y tế, giáo dục, dịch vụ công và khác. Đây là nhóm phân loại ứng dụng, không khẳng định VN App đã tích hợp dịch vụ của mọi lĩnh vực.
- Nhãn rõ ràng: ứng dụng tự thêm chưa xác minh nhà phát hành; không đưa vào sổ nguồn chính thống của bộ điều phối.
- Lưu danh mục ứng dụng trên thiết bị bằng IndexedDB, không lưu lịch sử tìm kiếm hoặc dữ liệu hóa đơn. Chưa đồng bộ nhiều thiết bị. Không nhập dữ liệu cá nhân trong tên ứng dụng.
- Thanh toán hóa đơn: tiền điện, nước, Internet/truyền hình, điện thoại trả sau, học phí, phí chung cư. Gắn ứng dụng tự thêm với từng loại; tìm bằng tiếng Việt.
- Tiền điện có sẵn liên kết ứng dụng EVN CSKH trên Google Play/App Store. Đã đối chiếu bài EVN công bố chức năng thanh toán và trang niêm yết kho vào 11/10/2026. Không phát minh deep link tới màn hình thanh toán; các nút mở trang ứng dụng, chưa tự mở chính xác chức năng trong app đã cài.
- Loại hóa đơn khác chưa có nhà cung cấp xác minh sẵn: dùng ứng dụng người dùng gắn; không đoán nhà cung cấp, phí, số dư hoặc trạng thái giao dịch.
- Bỏ PWA/manifest/service worker cache ngoại tuyến theo yêu cầu. Mã chuyển đổi gỡ worker trong đúng phạm vi VN App và xóa cache cũ mang tiền tố VN App.

## Nguồn trực tiếp
EVN: https://evn.com.vn/d/vi-VN/news/Ung-dung-EVN-CSKH-can-moc-1-trieu-khach-hang-lien-ket-su-dung-60-3557-509019
Google Play: https://play.google.com/store/apps/details?id=com.evn.cskh.vn
App Store: https://apps.apple.com/vn/app/evn-cskh/id6754793134

## Kiểm chứng
`npm run check` đạt: định tuyến cũ, pipeline, DOM giả, chứng cứ, URL ứng dụng, phân loại hóa đơn và lỗi không có lưu trữ. Thử Chromium thật bị chặn do môi trường chưa có executable trình duyệt; chưa tuyên bố nghiệm thu trình duyệt/Android/iOS. Cần thử lưu, tải lại, sửa URL và xóa trên trình duyệt thật.

## Ranh giới
Chưa có cổng thanh toán, đối tác thanh toán, đối soát hay webhook. Không nhận mã khách hàng, thẻ, OTP, không báo thanh toán thành công. Khi giao dịch, người dùng thực hiện trong ứng dụng nhà cung cấp/ngân hàng; đây là chức năng chọn và mở ứng dụng hỗ trợ thanh toán.
Hệ thống hỏi đáp vẫn dùng danh mục tĩnh; chưa đáp ứng tra cứu trực tuyến có chứng cứ cho toàn bộ lĩnh vực. Mô-đun chứng cứ V3.1 chưa có kho văn bản đã thẩm định.

## Tiếp theo
Nghiệm thu trên trình duyệt thật; xác minh ứng dụng và đơn vị cung cấp nước/viễn thông theo địa bàn; sau đó bổ sung liên kết cụ thể. Thanh toán ngay trong VN App chỉ triển khai khi có tích hợp chính thức và đối soát hợp lệ.
