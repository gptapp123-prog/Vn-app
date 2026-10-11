# V3.5 — Nâng cấp theo nhu cầu người dân

## Đã bổ sung

- 39 mục điều hướng trong 8 nhóm: giấy tờ/gia đình, cư trú, hóa đơn, sức khỏe/bảo hiểm, xe, thuế/kinh doanh, học tập/đời sống, hỗ trợ/khẩn cấp.
- 7 tình huống gợi ý: có con, chuyển chỗ ở, mất giấy tờ, mua xe, chuẩn bị nghỉ hưu, kinh doanh và hỗ trợ. Đây là gợi ý để chọn việc, không phải quy trình pháp lý đầy đủ.
- Trang chủ có việc thường dùng và liên hệ khẩn cấp. Tìm kiếm hiện trên mọi trang; điện thoại có 5 tab và mục Thêm.
- Ghim nhu cầu công khai bằng IndexedDB. Chỉ lưu ID mục; không lưu nội dung tìm kiếm, hồ sơ hay danh sách tự kiểm tra. Nếu lưu thất bại, giao diện thông báo và không giả báo thành công.
- Chữ lớn, tăng tương phản trong phiên; danh sách 3 bước tự kiểm tra cho mỗi mục. Dấu chọn không xác nhận kết quả và mất khi tải lại.
- Tìm app theo tên/nhóm, giữ thêm/sửa/xóa app tự bổ sung. App tự thêm được đánh dấu chưa xác minh.
- Phân biệt mở app, cài Android/iPhone và website đơn vị/hướng dẫn. Adapter Android chỉ nhận 11 ID đã ghim; không nhận package tùy ý.
- Mất điện/thiếu nước chuyển sang liên hệ đơn vị thay vì thanh toán. Tìm nhiều loại hóa đơn giữ các bảng khi đổi lựa chọn nước.
- Khám bệnh cần xác định cơ sở khám; không điều hướng sang thủ tục cấp phép hành nghề hoặc giả báo đặt lịch.
- Câu hỏi phí/thời hạn/quyền lợi chưa được kiểm chứng cho trường hợp cụ thể có thông báo cần đọc nguồn hiện hành. Không suy đoán đơn vị nước từ tỉnh thành.

## Dữ liệu và nguồn

Danh mục nhu cầu và nguồn ở core/citizen-services.js và citizen-services.json. Tuyến mới dùng cổng Dịch vụ công, Bộ Công an, BHXH và nguồn cơ quan liên quan để tra cứu/tiếp tục xử lý; không sao chép mức phí, điều kiện hoặc thời hạn chưa xác minh. Ngày rà soát 11/10/2026 không khẳng định mọi thủ tục địa phương đã được kiểm chứng.

Giữ dữ liệu V3.4: 34 tiền tố bưu chính tỉnh, 3.319 mã bưu chính cấp xã hợp lệ, bảng biển số/mã tỉnh, đối chiếu 63 tên tỉnh cũ và 17 mục danh bạ. Hai dòng lỗi trong tài liệu bưu chính tiếp tục cách ly. Các bảng hành chính ghi rõ nguồn năm 2025; không tự coi là bản cập nhật thời gian thực năm 2026.

## Giới hạn thực tế

Đây là mã nguồn chưa triển khai. Web chưa mở trực tiếp app đã cài; adapter Android cần tích hợp và thử trong host. Không có bản iOS native, APK, đăng nhập dịch vụ đích, thanh toán hoặc nộp hồ sơ tự động. Không có kết quả cá nhân hay đồng bộ danh mục thời gian thực.

Chưa có danh mục đầy đủ từng trạm nước nông thôn, bệnh viện, ngân hàng, nhà mạng và cơ sở địa phương. TP.HCM/Tây Ninh là điểm lọc ban đầu; phải xác nhận tên đơn vị trên hóa đơn trước khi chọn kênh thanh toán. 39 mục là tuyến hỗ trợ tìm/chọn dịch vụ, không phải 39 tích hợp giao dịch.

## Kiểm tra

`npm run check` đạt: 8 bộ kiểm thử và kiểm tra cú pháp, gồm engine, ranh giới dẫn chứng, giao diện mô phỏng, thêm app, nước, danh bạ/mã và nhu cầu người dân. Kiểm tra toàn vẹn 3.319 dòng bưu chính và hash tài liệu nguồn.

Giao diện kiểm thử bằng DOM mô phỏng. Cài Chromium để kiểm tra trực quan không thành công do gói tải lỗi; chưa kiểm thử trình duyệt thực, điện thoại thật hoặc biên dịch adapter Android. Kiểm thử mô phỏng không chứng minh tích hợp dịch vụ đích.
