# VN App 3.27 — Câu hỏi, tác vụ và thông tin còn thiếu

- Tách yêu cầu đóng tiền nước, kiểm tra khoản đã đóng, báo sự cố khỏi tên đơn vị và địa bàn. Giữ Đồng Nai, Nhà Bè, Trà Vinh, Đồng Tháp khi bỏ từ dẫn câu.
- Nước nông thôn hỏi tỉnh và tên trạm/xã; chỉ lọc đầu mối nông thôn đã có trong danh mục. Địa bàn chưa có dữ liệu hiển thị thiếu nguồn; không đổi sang nhà cung cấp khác.
- Câu đóng tiền không nêu loại khoản thu có các lựa chọn. Câu nhiều khoản có nút chọn từng loại để mở đúng mục.
- Điện phân biệt thanh toán, lịch ngừng cấp, xem hóa đơn/khối khoản đã đóng. Chỉ dùng đường dẫn chức năng có sẵn; nếu chưa có thì mở cổng đúng đơn vị và nêu mục cần chọn.
- Thêm 31 nhóm câu tự nhiên vào bộ 40 nhóm hiện có (71 tổng): căn cước, cư trú, đất, BHXH, hộ kinh doanh, học phí, Internet, thuốc, kết quả khám, thi/đại học, mua hàng và sửa chữa. Không thêm đường dẫn hoặc nhà cung cấp chưa xác minh.
- Hiểu cụm “đơn hàng không mua nữa” là hủy đơn; giữ bảo vệ câu phủ định khác. Che mã khách hàng, học sinh, thuê bao được ghi kèm nhãn.

Kiểm thử gồm bộ dự án và các ca tích hợp câu hỏi mới, lựa chọn khoản thu, riêng tư, nhiều yêu cầu, địa bàn chưa có dữ liệu. DOM giả và kiểm tra đóng gói không thay thế nghiệm thu trên điện thoại thật. Chưa bảo đảm hiểu mọi câu tiếng Việt, chưa có model AI hoặc danh mục toàn bộ trạm nước; không xác nhận thanh toán/hồ sơ thay hệ thống đích. Lỗi cài trên điện thoại vẫn cần kiểm tra tiếp, không gọi bản này là sửa xong lỗi cài.
