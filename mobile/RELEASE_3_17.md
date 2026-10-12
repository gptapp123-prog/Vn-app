# VN App 3.17

- Quy đổi toàn quốc hai chiều theo bảng Cục Thống kê: 10.571 quan hệ nguồn, 3.321 mã xã/phường/đặc khu mới, 63 tỉnh cũ và 34 tỉnh mới. Mốc chuyển đổi: 01/07/2025. Giữ quan hệ chia tách, huyện đảo chuyển đặc khu, tên trùng và mã có số 0 đầu. Không tự suy ra địa chỉ hộ dân, không tuyên bố cập nhật mọi thay đổi sau mốc nguồn.
- 24 đầu mối cấp nước ở TP.HCM và Tây Ninh; 11 đơn vị SAWACO, 4 chi nhánh BIWASE, BWACO, LAWACO, TANIWASSCO và các đầu mối bổ sung. Tìm theo địa bàn cũ/mới, mở mục hóa đơn và thanh toán riêng đã có nguồn. 118 dòng phạm vi phục vụ. Nguồn chính: danh bạ SAWACO, BIWASE, website đơn vị và cơ quan quản lý. Không khẳng định đủ mọi trạm tư nhân/hợp tác xã; đầu mối nông thôn chưa xác minh được kênh thanh toán được ghi rõ.
- Danh bạ nước dùng chung bộ dữ liệu với tra cứu để tránh thông tin lệch nhau. Bỏ đường dẫn nông thôn cũ không truy cập được.
- Android: bộ chọn app đã cài, lấy tên/icon thật từ PackageManager, lưu vào danh mục cá nhân, bấm để mở. Không gửi danh sách app ra mạng; chỉ app do người dùng chọn được phép mở. Sau khôi phục sang máy khác, chọn lại để cấp quyền mở. iOS và web dùng biểu mẫu liên kết kho ứng dụng, không giả lập khả năng liệt kê app iOS.
- Giữ mã gói Android `vn.vnapp.citizen.stable`, nâng versionCode lên 31700. Không xóa hay di chuyển dữ liệu người dùng. Bản APK phải ký bằng khóa phát hành cố định trước khi giao.

## Kiểm chứng

`npm run check`: kiểm thử hiện có cùng kiểm thử 3.17 về dữ liệu địa giới, chia tách/trùng tên, phạm vi cấp nước, xác nhận đơn vị thanh toán, dữ liệu app từ điện thoại và sao lưu.

Kiểm tra trình duyệt thật ở 320/375/768/1440 px: không tràn ngang; quy đổi Ngọc Hà, Côn Đảo và Long An; tra công ty nước Bình Chánh/Bình Dương; giữ luồng nhiều loại hóa đơn; lưu, tải lại và sửa app chọn từ cầu nối giả lập.

Chưa nghiệm thu trên điện thoại Android vật lý. Bộ chọn native cần bản biên dịch Android thành công; kiểm thử cầu nối trình duyệt không thay thế kiểm thử thiết bị thật.
