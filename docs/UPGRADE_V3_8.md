# V3.8 — Kết quả trực tiếp, mở đúng mục

Đổi cách hiển thị kết quả nhận diện: tên việc và một nút chính tới đích. Hướng dẫn, app liên quan, nguồn và lựa chọn phụ thu vào mục Thông tin thêm. Câu hỏi phí/điều kiện/thời hạn chưa xác minh vẫn có cảnh báo ngắn. Nhiều tác vụ engine cùng khớp yêu cầu nhập một việc cụ thể, không tự chọn thay người dùng.

Đổi GPLX trỏ thẳng tới:
https://dvc-gplx.csgt.bocongan.gov.vn/p/home/dvc-cap-doi-gplx.html

Nguồn Bộ Công an xác nhận cổng vận hành từ 26/3/2025:
https://mps.gov.vn/bai-viet/thong-bao-chuyen-doi-trang-thong-tin-dien-tu-cung-cap-dich-vu-cong-cap-doi-giay-phep-lai-xe-d2-t44164

Trang mục cấp đổi được chỉ mục trên tên miền chính thức, có nội dung biểu mẫu. Kiểm tra 11/10/2026: trình tải trực tiếp gặp timeout/HTTP 502, nên chưa xác nhận trang đang hoạt động hoặc luồng đăng nhập hoàn tất. Không tự động mở trang, đăng nhập hay nộp hồ sơ; nút dẫn người dùng tới đúng URL đã ghim. Không dùng URL thủ tục cũ 372344 làm nút đổi GPLX. Các mục khác chưa xác minh được URL chức năng vẫn ghi rõ cần chọn mục tại cổng, không giả là đã có đường dẫn trực tiếp.

Tra mã bưu chính/biển số/danh bạ/tỉnh cũ–mới: bỏ các cụm hỏi thông dụng trước khi tìm trong dữ liệu đang có. Nếu đúng một bản ghi, hiện câu trả lời ngay; bảng chi tiết và bộ lọc thu gọn. Nếu tên trùng hoặc thiếu xã/phường, yêu cầu phần thông tin còn thiếu, không chọn bản ghi đầu tiên. Giữ tên riêng La Gi, Cửa Nam và các dòng nguồn bị cách ly.

Không thêm dữ liệu quốc gia mới hay API sản phẩm. Giữ cơ sở hành chính theo nguồn 2025; không gọi đó là dữ liệu thời gian thực 2026. Không lưu nội dung tìm kiếm, không nhận dữ liệu cá nhân. Camera V3.7 được giữ nguyên.

Kiểm thử tự động và cú pháp bằng npm run check. Kiểm thử giao diện dùng DOM mô phỏng; chưa kiểm thử trình duyệt thật, nộp GPLX hay camera thật. Đây là mã nguồn chưa triển khai.
