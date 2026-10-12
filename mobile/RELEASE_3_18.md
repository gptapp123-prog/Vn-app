# VN App 3.18 — sửa nhập liệu tra cứu

- Bỏ tự tra cứu sau 220 ms khi người dùng đang nhập. Chỉ tra cứu khi bấm nút hoặc Enter sau khi kết thúc bộ gõ.
- Không ghi lại chuỗi đã chuẩn hóa vào ô nhập thông thường; giữ nội dung tiếng Việt và vị trí con trỏ trong lúc sửa.
- Chặn submit khi IME đang ghép chữ hoặc Enter đang xác nhận lựa chọn IME. Escape của bộ gõ không đóng chức năng.
- Xóa ô tìm không tự điều hướng về trang chủ; không thay DOM kết quả trong khi gõ.
- Giữ bản nháp từ khóa cấp nước khi đổi tỉnh/khu vực.
- Vẫn lọc dữ liệu riêng tư tại thời điểm gửi tra cứu, không gửi dữ liệu tra cứu ra mạng.
- Android: giữ `vn.vnapp.citizen.stable`, versionCode 31800 và khóa phát hành cũ để cài cập nhật.

Kiểm thử hồi quy trong `tests/ui-smoke.test.js` kiểm tra chặn IME submit, Enter xác nhận và giữ nguyên câu tiếng Việt. Chưa xác minh trên điện thoại vật lý hoặc mọi loại bàn phím Android.
