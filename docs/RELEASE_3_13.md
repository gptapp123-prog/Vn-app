# VN App 3.13 — phạm vi thay đổi và nghiệm thu

- Trang chủ: lưới 9 app; thông tin/cài đặt mở bằng dấu ⋯; 6 mục tra cứu nhanh. Không hiển thị 39 việc thành danh sách dài.
- Danh mục việc làm: 8 mục mỗi lượt, lọc nhóm, nút Xem thêm; tình huống thu gọn.
- Danh bạ/mã tra cứu: không tự đổ toàn bộ bảng khi chưa chọn loại hoặc nhập yêu cầu.
- Sửa phủ định hành động, bổ sung cách diễn đạt cấp lại bằng lái; không chuyển sang đổi GPLX khi người dùng nói không đổi.
- Scanner: bộ đọc ZXing cục bộ cho camera/ảnh khi BarcodeDetector không có. Không xác nhận xuất xứ hoặc hàng thật.
- Camera web: Permissions-Policy camera=(self).
- Danh bạ: nhập trùng đủ 4 trường được bỏ qua; tệp chia sẻ native được dọn khi đóng chia sẻ.
- App tự thêm: sao lưu/khôi phục JSON, kiểm tra lại URL và dữ liệu trước khi nhập; không tự xác nhận nhà phát hành.
- Dependency: uuid override 11.1.1; npm audit không có cảnh báo trong lần kiểm tra 11/10/2026.
- Android: assembleRelease, ký bằng khóa cố định từ Secrets; không tạo khóa ngẫu nhiên thay thế. Thiếu khóa sẽ tạo artifact unsigned để ký bằng khóa chủ dự án, không gọi đó là bản cài.
- iOS: compile thành công tại bản 3.13 trước commit tài liệu này; bước ký sẽ chỉ chạy khi đủ 5 Secrets Apple. Compile/CI success không chứng minh có IPA.
- Build Android theo dõi JS, CSS, JSON, TXT, core, mobile và scripts; phiên bản hiện hành 3.13.0/31300.

## Kiểm chứng
npm run check đạt: 17 bộ JS và 8 bài Python. Trình duyệt thật: 40 màn hình/5 kích thước không tràn ngang; không pageerror; ảnh QR đọc được khi BarcodeDetector bị tắt; camera mở với header mới; nhập lại 2 dòng trùng không tăng danh bạ. Có kiểm thử phủ định và tệp sao lưu không hợp lệ.

Chưa thử điện thoại thật. Chưa có backend/đồng bộ admin, tự lấy kết quả trực tuyến, dữ liệu sản phẩm hay độ phủ nước nông thôn đầy đủ. Các URL chưa được kiểm chứng tiếp nhận hồ sơ/đăng nhập trong lần này. Thay đổi giao diện không thay thế nghiệm thu dịch vụ thực tế.

## Chuyển từ bản Android debug cũ
Bản debug trước đây có chứng chỉ khác. Xuất danh bạ và danh mục app trước khi gỡ; chỉ gỡ khi đã có bản sao và APK release. Từ release 3.13 giữ cùng khóa ký và tăng versionCode cho lần sau. Khóa không nằm trong repo công khai. GitHub Secrets Android chưa được tự cấu hình qua connector; file khóa được giữ riêng cho chủ dự án.
