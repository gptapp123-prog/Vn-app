# V3.7 — Tra cứu liên quan và camera gọn

## Đã thực hiện

- Khung camera tối đa 360 px, điện thoại nhỏ tối đa 320 px, tỷ lệ 16:10. Video dùng contain để không cắt mất vùng mã. Khung hướng dẫn chỉ hỗ trợ căn máy; nhận diện vẫn trên toàn hình.
- Giữ hai thao tác chính Quét mã / Chọn ảnh; Dừng chỉ hiện lúc quét. Nhập tay và hướng dẫn dài thu gọn. Tự đóng camera sau khi đọc mã hoặc rời trang, ngăn lệnh mở camera lặp và dọn yêu cầu cấp quyền đến muộn.
- Sau khi đọc mã, tự điền GTIN và thông tin liên quan nếu QR GS1 Digital Link chứa: lô (10), sê-ri (21), hạn dùng (17). Giữ nguyên YYMMDD, không đoán thế kỷ. Ngày 00 được giữ nguyên để người dùng đối chiếu quy tắc nguồn.
- Sao chép GTIN hỗ trợ cả GTIN trích từ QR; giữ số 0 đầu. Tự hiện nguồn tra cứu GS1/Bộ KH&CN cùng trạng thái dữ liệu. Không lưu mã, ảnh, lịch sử hoặc gửi QR tới nguồn chưa xác minh.
- Trường trùng, độ dài bất thường, ngày không phù hợp hoặc mã hóa lỗi không tạo bảng thông tin lô/sê-ri/hạn dùng. Không hiển thị thông tin cũ sau quét lỗi hoặc xóa.

## Phần chưa kết nối

Tên hàng, thương hiệu, nhà sản xuất và xuất xứ chưa được tự tải từ cơ sở dữ liệu sản phẩm. QR/GTIN không đủ để tự xác minh các thông tin này. V3.7 tự đọc dữ liệu trong mã và hiện nguồn liên quan, không giả lập kết quả API.

Rà soát 11/10/2026: trang https://gs1.gov.vn/verified-by-gs1?lang=vi nhúng biểu mẫu https://www.gs1.org/services/verified-by-gs1/iframe trong JavaScript công khai. https://home-verify.gs1.gov.vn/ giới thiệu dịch vụ; chưa xác minh được API công khai có tài liệu/quyền truy cập phù hợp để tích hợp tự tải thông tin sản phẩm. Không gọi endpoint phỏng đoán, bỏ qua đăng nhập hoặc nhúng nguồn ngoài vào WebView.

Thông tin trích QR chỉ là nội dung mã, không phải xác nhận xuất xứ, hạn dùng thực tế hoặc hàng thật. Tất cả tính năng quét cần trình duyệt hỗ trợ BarcodeDetector và HTTPS.

## Kiểm tra và đóng gói

`npm run check`: kiểm thử tự động và cú pháp đạt, gồm giải mã các trường QR, trùng trường, ngày lỗi, bảo toàn phần trăm/số 0 đầu, tự điền/đặt lại thông tin, dừng camera và hủy cấp quyền muộn trong môi trường mô phỏng. Chưa kiểm thử trình duyệt thực, camera điện thoại hoặc tích hợp dịch vụ dữ liệu sản phẩm. Đây là mã nguồn V3.7, chưa triển khai/APK.
