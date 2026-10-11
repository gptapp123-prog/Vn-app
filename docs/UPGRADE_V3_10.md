# VN App V3.10 — danh bạ và bố cục

Đã thêm danh bạ nhập tay: Họ và tên, Chức vụ, Số điện thoại, Đơn vị. Họ tên bắt buộc; các trường khác có thể để trống. Có thêm, sửa, xóa có xác nhận, tìm theo bốn trường, bấm gọi, xuất và nhập tệp JSON theo contacts-template.json. Nhập thêm vào danh bạ hiện có theo một giao dịch IndexedDB; không ghi đè hoặc xóa liên hệ cũ. Tệp tối đa 2 MB và 2.000 liên hệ. Nội dung hiển thị được escape; số điện thoại được kiểm tra trước khi tạo liên kết gọi.

Dữ liệu chỉ lưu trên trình duyệt/thiết bị hiện tại; không gửi lên mạng. Quản trị viên có thể chuẩn bị tệp rồi người dùng nhập. Chưa có tài khoản/phân quyền admin, cập nhật trực tiếp từ máy chủ hoặc đồng bộ nhiều thiết bị. Không đặt nút admin giả để ngụ ý đã có quyền quản trị. Danh bạ công khai, mã bưu chính và biển số giữ riêng với danh bạ cá nhân.

Toàn bộ menu chức năng ở cột trái trên desktop. Trên mobile, nút Chức năng mở menu trái; chọn mục sẽ đóng menu. Bỏ thanh đáy để tránh che nội dung. Khung tra cứu ở giữa; màu panel theo chủ đề danh bạ, hóa đơn, mã tra cứu, QR và ứng dụng. Mobile dùng một cột, nút/nhãn xuống dòng, trường nhập không vượt khung, bảng dữ liệu lớn cuộn ngang và có khoảng an toàn ở đáy.

Kiểm chứng: npm run check, kiểm thử danh bạ và giao diện bằng DOM mô phỏng. Chưa có trình duyệt thực/camera/điện thoại trong môi trường này để xác nhận bố cục trực quan trên mọi máy. Đây là gói mã nguồn, chưa cập nhật bản đang chạy.
