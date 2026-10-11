# VN App V3.11 — dự án Android, iOS và web

Đã tạo thư mục `android/`, `ios/` và bundle `www/`. Hướng dẫn và tình trạng build: [MOBILE_BUILD_V3_11.md](docs/MOBILE_BUILD_V3_11.md). Đã build thành công APK debug Android và kiểm chữ ký. Chưa có IPA iOS; cần Mac/Xcode và cấu hình ký Apple. Chạy `npm ci`, `npm run check`, `npm run mobile:sync` trước khi build bằng Android Studio/Xcode.


39 mục nhu cầu thuộc 8 nhóm, 7 tình huống đời sống; tìm kiếm luôn sẵn có, ghim mục thường dùng, chữ lớn, tăng tương phản và danh sách tự kiểm tra. Giữ tính năng thêm ứng dụng, hóa đơn, danh bạ và tra cứu mã bưu chính/biển số/tên tỉnh cũ–mới.

Đọc [phạm vi V3.11](docs/UPGRADE_V3_10.md). Các tài liệu V3–V3.5 là lịch sử.

Chạy `npm run check`; phục vụ bằng HTTP khi phát triển, HTTPS khi triển khai. Không mở bằng file://. Đây là mã nguồn web và adapter Android, chưa triển khai và không phải APK. Web có liên kết cài đặt/website; mở app đã cài cần host Android tích hợp. Không có bản offline, backend xử lý hồ sơ hay thanh toán tự động.

Thêm Check hàng & QR: camera/ảnh khi trình duyệt hỗ trợ, nhập GTIN, kiểm tra số kiểm tra và chuyển tới nguồn GS1/Bộ KH&CN. Không kết luận xuất xứ hoặc hàng thật từ mã; chưa có API dữ liệu sản phẩm.

Danh bạ cá nhân: họ tên, chức vụ, điện thoại, đơn vị; thêm/sửa/xóa, tìm và nhập/xuất JSON. Lưu IndexedDB trên thiết bị. Chưa có admin đăng nhập hay đồng bộ máy chủ. Menu desktop ở trái, mobile dùng nút mở menu bên trái; tra cứu ở giữa.

Phần tạo bản cài iPhone: [IOS_INSTALLATION.md](docs/IOS_INSTALLATION.md). Đã chuẩn bị build device, archive có ký và export IPA; chưa có môi trường Mac và chữ ký để chạy thực.
