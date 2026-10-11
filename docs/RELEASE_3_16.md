# VN App 3.16 — đúng icon ứng dụng

11 icon gốc lấy từ đúng Google Play package trong danh mục: EVN CSKH, VNeID, VNeTraffic, iCPV - Book, Công dân số TPHCM, eTax Mobile, VssID, SOS An ninh trật tự - CATP HCM, Help 114, MoMo và Payoo. Nguồn, URL ảnh, package và SHA-256 được ghi trong assets/app-icons/sources.json. Giữ nguyên artwork, chuyển định dạng PNG không mất dữ liệu. Icon đóng gói trong APK, không cần tải từ mạng khi mở màn hình. Nhãn hiệu thuộc các chủ sở hữu tương ứng.

Thay biểu tượng chữ trong lưới app, bổ sung icon trên thẻ thông tin, nút mở app trong kết quả và phần app thanh toán nước. Kiểm tra build bắt buộc đủ icon, đúng package và đúng hash ảnh; thiếu ảnh làm build thất bại.

App tự thêm khớp danh mục được gắn icon đúng theo liên kết kho. App khác phải chọn ảnh icon trước khi lưu mới; ảnh người dùng cung cấp không được coi là đã xác minh từ kho. Dữ liệu cũ thiếu icon được giữ và đưa vào hàng yêu cầu bổ sung, không dựng logo hoặc dùng chữ thay thế. Giữ icon trong nhập/xuất JSON, giới hạn tệp nhập danh mục 20 MB.

Giữ package vn.vnapp.citizen.stable và khóa phát hành cố định của 3.15 để cập nhật cùng dòng app mới. Không cần gỡ bản 3.15; bản legacy vn.vnapp.citizen vẫn cài song song. Chưa kiểm thử cập nhật trên điện thoại thật.
