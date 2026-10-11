# VN App — bộ xử lý tác vụ V2.0

Ngày phát hành mẫu: 11/10/2026. **Ứng dụng độc lập**, không thuộc hoặc đại diện cơ quan nhà nước. Đây là prototype HTML/JS có bộ xử lý tác vụ thật, **không phải APK/IPA và không phải API tra cứu dữ liệu cá nhân**.

## Chạy thử

Mở `index.html` bằng Chrome/Edge, hoặc chạy `python -m http.server 8000` trong thư mục này rồi truy cập `http://localhost:8000/`. Dùng offline trên máy đã lưu đủ file mã nguồn; VN App không gửi truy vấn đi nơi khác.

## Nâng cấp chính so với V1

- `engine.js`: xử lý 20 ý định nghiệp vụ độc lập, hiểu từ khóa tiếng Việt có dấu/không dấu và nhiều cách diễn đạt, một câu có thể gồm nhiều nghiệp vụ.
- Chọn đúng đầu ra theo `OFFICIAL_PROCEDURE`, `PUBLIC_INFORMATION`, `AUTH_REQUIRED`, `AUTH_OR_CAPTCHA`, `EMERGENCY`.
- Trả ngay **trạng thái → đáp án giới hạn → hướng dẫn → link trực tiếp hoặc cổng chính thống → nguồn**.
- Tự cập nhật kết quả khi dừng gõ khoảng 220ms hoặc nhấn nút xử lý. Không truyền yêu cầu lên server.
- Dẫn đến trang cụ thể đã xác minh cho BHYT, đổi GPLX, thông báo lưu trú; đối với đường dẫn chưa được xác minh đến trang tác vụ thì gắn nhãn cổng.
- Với nhiệm vụ gắn ứng dụng, có nút mở kho cài đặt chính thức trên Android/iOS.
- Loại bỏ thông tin có thể nhận diện công dân nhập nhầm như số định danh, biển số, email, số điện thoại ở một số định dạng thông dụng.
- Chỉ chấp nhận danh sách hostname HTTPS được duyệt; không tự tạo URL. Giữ nguyên chính sách không dựng logo giả.
- Bổ sung 62 kiểm tra tự động về nghiệp vụ và render JS giao diện.

## Kiểm thử

```
node tests/engine.test.js
node tests/ui-smoke.test.js
node --check engine.js
node --check script.js
```

Chi tiết hệ thống và các điều kiện nghiệm thu xem [`TASK_ENGINE_V2.md`](TASK_ENGINE_V2.md). Danh mục nguồn nền xem [`SOURCE_REGISTER.md`](SOURCE_REGISTER.md).

## Giới hạn

Dữ liệu hồ sơ cá nhân, tình trạng phạt nguội, GPLX, BHYT, thuế vẫn phải được tra tại hệ thống chính thức. Bản này chưa có kết nối API nhà nước có thẩm quyền cấp; không được nói rằng đã trả dữ liệu cá nhân thực tế. Câu trả lời lĩnh vực pháp lý/y tế từ văn bản đang có hiệu lực cần một cơ sở tri thức được kiểm định riêng (chưa tích hợp). Chưa nghiệm thu hiển thị trực quan trên thiết bị thật; Chromium headless thử nghiệm bị treo trong môi trường này.
