# VN App V3.1 — Kết quả nâng cấp 11/10/2026

## Phạm vi đã thực hiện
Nâng cấp trực tiếp mã nguồn VN App V3 từ VN_App_V3_Architecture.zip, giữ nguyên bộ định tuyến 20 ý định, danh mục ứng dụng và ranh giới không thu thập hồ sơ cá nhân.

- Thêm manifest, biểu tượng riêng VN App, service worker và nút cài khi trình duyệt hỗ trợ.
- Ngoại tuyến sau lần tải và cài cache thành công trên HTTPS: nhận diện nhu cầu, danh mục và hướng dẫn tĩnh. Website cơ quan vẫn cần Internet. Không cam kết hoạt động lần đầu chưa tải gói.
- Cache chỉ tài nguyên đóng gói có URL chính xác; bỏ qua query string, POST, URL bên ngoài và tài nguyên ngoài danh sách. Không cache dữ liệu người dùng hoặc trang xác thực. Cache cũ của chính VN App được dọn khi phiên bản mới kích hoạt; không xóa cache ứng dụng khác.
- Báo trạng thái mạng, lỗi chuẩn bị ngoại tuyến, nút cài tự ẩn sau cài đặt. Trình duyệt không hỗ trợ lời nhắc cài có thể dùng chức năng thêm vào màn hình chính của trình duyệt.
- Sửa nhãn gây hiểu nhầm về xác minh trực tuyến; loại style nội tuyến bị CSP chặn, thêm focus rõ và giảm chuyển động theo thiết lập người dùng.
- Thêm mô-đun kiểm tra chứng cứ: URL được phép, người duyệt, trạng thái, ngày hiệu lực, nguồn thay thế, tuổi rà soát tối đa 30 ngày, SHA-256, đoạn trích có thật trong nội dung, phạm vi địa lý và xung đột cùng điều khoản.
- Adapter dịch vụ chỉ trả HANDOFF/NOT_AVAILABLE; không tạo trạng thái hồ sơ giả.

## Giới hạn quan trọng
Mô-đun chứng cứ là nền tảng kiểm tra dữ liệu, chưa nối vào giao diện hỏi đáp vì chưa có kho văn bản đã thẩm định. Checksum chứng minh nội dung khớp, không chứng minh cơ quan ban hành hoặc hiệu lực pháp lý. Metadata cần người duyệt độc lập; allowlist không chứng minh nguồn còn hoạt động. Chính sách 30 ngày là lựa chọn kỹ thuật của bản này, không phải quy định pháp luật.
Chưa triển khai: thu thập nguồn, kiểm tra redirect/DNS/TLS định kỳ, chữ ký danh mục, backend quản trị, RAG trực tuyến, API cá nhân, APK/iOS, triển khai HTTPS công khai.

## Kiểm thử đã chạy
`npm run check` thành công trên Node 24: 56 kiểm tra định tuyến, 79 assertion pipeline, 8 ca UI DOM giả và bộ kiểm thử mới về hiệu lực/checksum/xung đột/phạm vi/cache. Đây không phải kết quả kiểm thử trình duyệt hay thiết bị thật.

## Vận hành
Phục vụ thư mục dự án qua HTTPS hoặc localhost; không mở bằng file:// để thử PWA. Lần đầu cần mạng. Service worker mới chờ các tab cũ đóng để tránh trộn phiên bản; đóng tất cả tab VN App rồi mở lại khi cập nhật. Không lưu lịch sử tìm kiếm. CSP cho phép kết nối cùng nguồn để cài tài nguyên công khai; ứng dụng không có API nhận câu hỏi.
Áp dụng security headers trong deploy/security-headers.txt ở máy chủ; meta CSP không thay thế frame-ancestors và HSTS của máy chủ.

## Bước tiếp theo trước phát hành
1. Thử Android Chrome và Safari iOS thật: cài đặt, mở lại khi mất mạng, bàn phím, trình đọc màn hình, cập nhật cache, liên kết tel.
2. Xác minh từng URL, chuỗi chuyển hướng và nhà phát hành ứng dụng; rút link sai thay vì tự thay nguồn.
3. Thiết lập kho chứng cứ có nguồn chính thống và người duyệt độc lập; chỉ nối câu trả lời trực tiếp sau khi có dữ liệu đủ thẩm định.
4. Kiểm thử HTTPS/CSP và bảo mật rồi mới phát hành. Không đưa kết quả kiểm thử giả lập thành tuyên bố nghiệm thu thiết bị thật.
