# VN App V3.9 — điều hướng vào chức năng

Đã áp dụng bộ định tuyến chung cho ô tìm kiếm, thẻ việc cần làm và kết quả từ bộ xử lý cũ. Một nhu cầu có một hành động chính; ứng dụng thay thế, nguồn xác minh và hướng dẫn nằm trong phần mở rộng. Không dùng trang chủ làm kết quả xử lý chính.

## Phạm vi thực tế

39 nhu cầu: 7 tuyến web, 7 tuyến ứng dụng, 3 tra cứu dữ liệu trực tiếp, 2 danh bạ, 3 cuộc gọi, 4 nhóm hóa đơn cần xác định nhà cung cấp, 10 tuyến cần thêm thông tin và 3 tuyến chưa có trang chức năng đã xác minh. Đây là phạm vi định tuyến, không phải 39 tích hợp API.

11 địa chỉ cụ thể được ghi trong `direct-destinations.json`: phạt nguội, đổi GPLX, tạm trú, thường trú, xác nhận cư trú, thông báo lưu trú, thời hạn BHYT, hai loại hộ chiếu và hai hệ thống tra cứu hồ sơ. Hộ chiếu và hồ sơ chỉ hỏi một thông tin để chọn đúng trang. Trang thủ tục được phân biệt với biểu mẫu nộp hồ sơ.

Phạt nguội ưu tiên mục CSGT; VNeTraffic nằm trong kênh thay thế. Nếu người dùng chỉ rõ VNeTraffic, ứng dụng được ưu tiên. Không lấy hay suy đoán kết quả vi phạm cá nhân. Nguồn Công an Cần Thơ xác nhận địa chỉ mục CSGT; truy cập trực tiếp mục này và đổi GPLX trong lần rà soát gặp lỗi/timeout, nên chưa xác nhận khả năng hoạt động trực tiếp.

Ứng dụng chưa có liên kết được xác minh mở riêng từng chức năng được ghi rõ cần chọn mục bên trong app. Bộ gọi app Android vẫn cần tích hợp trong bản native; gói này không phải APK. Cấp lại căn cước dùng VNeID với hướng dẫn chọn mục; không ghim trang có nhãn cấp huyện/tỉnh mâu thuẫn.

Hóa đơn nước yêu cầu đối chiếu đúng đơn vị trên hóa đơn trước khi chuyển kênh thanh toán. Payoo mở kênh hóa đơn chung, chưa mở riêng nhà cung cấp. Chưa có danh mục đầy đủ nước nông thôn. Không thu OTP và không xác nhận giao dịch.

Giữ nguyên thư viện mã bưu chính, biển số, địa phương, danh bạ, thêm app và quét QR gọn. Mã vạch/QR không tự chứng minh xuất xứ hay hàng thật; chưa có API sản phẩm.

## Kiểm tra

`npm run check` đạt: 12 bộ kiểm thử và kiểm tra cú pháp JavaScript. Có kiểm tra tuyến CSGT, chỉ định VNeTraffic, phân biệt xác nhận cư trú/thường trú, chọn hộ chiếu, khoảng trống nguồn, dữ liệu thư viện và scanner mô phỏng. Chưa kiểm thử trình duyệt thực, camera điện thoại, đăng nhập, nộp hồ sơ hoặc thanh toán thực. Chưa triển khai lên ứng dụng đang chạy.

## Cài và tích hợp

Giải nén và phục vụ thư mục bằng máy chủ HTTPS để camera có điều kiện hoạt động. Xem README và thư mục native để tích hợp bộ mở ứng dụng Android. Quy tắc tập trung ở `core/service-routing.js`; danh mục xuất ra `service-routes.json`. Chỉ bổ sung địa chỉ chức năng sau khi có nguồn chính thức và ghi rõ mức xác minh.
