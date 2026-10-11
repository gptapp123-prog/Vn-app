# V3.6 — Check hàng, xuất xứ và QR

Thêm trang Check hàng & QR ở trang chủ/menu/Thêm; tìm nhu cầu quét QR, mã vạch, kiểm tra hàng, xuất xứ, truy xuất chuyển đến trang này.

Chức năng: quét camera sau khi người dùng bấm; đọc ảnh JPG/PNG/WebP tối đa 10 MB; nhập thủ công; kiểm tra số kiểm tra GTIN 8/12/13/14 chữ số và giữ số 0 đầu; nhận diện đường dẫn trong QR và GTIN ở đoạn /01/ của URL; sao chép mã để tra cứu GS1. Ảnh nhiều mã yêu cầu cắt một mã, không tự chọn.

Camera dừng khi ra trang khác, ẩn trang, đóng trang, bấm dừng hoặc đã đọc được mã. Ảnh/camera/mã không lưu, không tải lên. QR không tự mở website hay thực thi lệnh; không hiển thị toàn bộ nội dung QR có thể chứa thông tin riêng tư.

Nguồn đã rà soát 11/10/2026:
- https://camnangsokhcn.mst.gov.vn/tieu-chuan-do-luong-va-chat-luong.htm — Bộ KH&CN xác nhận Scan and Check và Verify do Trung tâm Mã số, mã vạch Quốc gia vận hành.
- https://gs1.gov.vn/verified-by-gs1?lang=vi — trang tra cứu GS1 Việt Nam; trình đọc nghiên cứu chưa lấy được nội dung biểu mẫu, không khẳng định đã thử truy vấn thành công.
- https://mst.gov.vn/truy-xuat-nguon-goc-tu-ma-qr-den-yeu-cau-minh-bach-bat-buoc-cua-thi-truong-197260524163750094.htm — nguồn Bộ KH&CN về thông tin chuỗi cung ứng.

Không suy ra nước sản xuất từ tiền tố mã vạch. Số kiểm tra hợp lệ chỉ là kiểm tra cấu trúc; QR đọc được không chứng minh hàng thật. Không có kết quả tra cứu không đồng nghĩa hàng giả. VN App không có API sản phẩm; chưa xác minh xuất xứ, chứng nhận, an toàn hoặc hàng thật/giả. Không thêm package/store URL của Scan and Check/Verify khi chưa kiểm chứng; người dùng truy cập nguồn chính thức để chọn đúng app.

Quét phụ thuộc BarcodeDetector, định dạng thiết bị hỗ trợ và HTTPS. Trình duyệt thiếu API phải nhập mã hoặc dùng app tra cứu chính thức; chưa có decoder thay thế. Chưa kiểm thử camera/ảnh trên điện thoại thật. Kiểm thử tự động bao gồm mã kiểm tra, số 0 đầu, URL giả mạo, lệnh QR và ranh giới không kết luận xuất xứ/hàng thật.
