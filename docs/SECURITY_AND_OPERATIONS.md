# VN App V3 — Bảo mật, vận hành, kiểm thử và tiêu chí phát hành

## 1. Threat model (bản sơ bộ)

| Rủi ro | V3 đang xử lý | Cần bổ sung trước phát hành |
|---|---|---|
| Link nhái/chèn website thứ ba | allowlist chính xác + `noopener noreferrer`; từ chối URL nguy hiểm | giám sát redirect cuối, kiểm chứng domain DNS/TLS định kỳ |
| Thay package trên App Store/Play | pin nguyên URL từng ứng dụng | kiểm tra tên nhà phát hành và trạng thái niêm yết theo quý |
| Người dùng nhập CCCD/email/biển số | loại bỏ một số định dạng; không gửi server | tăng kiểm tra PII và cảnh báo chủ động; không hứa lọc 100% |
| Văn bản đã hết hiệu lực | cảnh báo đòi chứng cứ hiện hành | nguồn versioned, hiệu lực, người duyệt, chống dùng bản cũ |
| Nhận định pháp luật do AI tự suy | V3 chỉ dùng hướng dẫn tĩnh, không suy ra số tiền/quy định mới | retrieval grounded + thẩm định nội dung |
| Đánh cắp OTP qua web giả | không nhúng login / không yêu cầu OTP | kiểm tra đích redirect, làm rõ nhận diện app độc lập |
| Nhiều intent gần giống | giữ logic xếp hạng V2, loại bớt ý định trùng nhóm | benchmark hội thoại, kiểm thử sai lệch và hỏi làm rõ |
| Sự cố cứu hộ | 113/114/115 để gọi trực tiếp | thử số điện thoại trên thiết bị thật và UX thao tác 1 chạm |
| XSS qua nội dung | thoát HTML bằng `esc`; CSP không gọi API | kiểm tra dependency, CSP header, SAST, penetration test |

## 2. Quy trình quản trị nguồn đề xuất (chưa có backend)

1. Quản trị viên nộp địa chỉ và hồ sơ xác minh cơ quan phát hành; không tự động chấp nhận URL mới.
2. Hệ thống kiểm tra HTTPS, chứng thư và chuỗi redirect; so sánh điểm cuối với danh mục được phép.
3. Kiểm tra ứng dụng trên hai kho bằng package ID, bundle ID, đơn vị phát hành (khi công khai), cập nhật tối thiểu mỗi quý.
4. Với thủ tục, quản lý ID quy trình và trang nguồn đúng **hệ thống mới**; không dùng đường dẫn cũ chỉ vì hostname vẫn thuộc `.gov.vn`.
5. Người duyệt độc lập phê chuẩn thay đổi; lưu changelog nguồn không chứa thông tin người dùng.
6. Build bộ nguồn có checksum/chữ ký; CI chặn link không hợp lệ và chạy test định tuyến.
7. Khi URL đổi hoặc nghi vấn, rút khỏi danh mục sản phẩm thay vì chuyển sang liên kết không có bằng chứng.

## 3. Cấu hình triển khai HTTPS đề xuất

Ví dụ cấu hình ở reverse proxy (chỉ áp dụng sau khi xác nhận tương thích hạ tầng):

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
Referrer-Policy: no-referrer
Permissions-Policy: geolocation=(), camera=(), microphone=()
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'none'; object-src 'none'; frame-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'; upgrade-insecure-requests
```

Không chủ động chặn kết nối internet của trang được mở trong một tab độc lập. VN App không dùng tracker, SDK quảng cáo, đăng nhập riêng hoặc notification chứa dữ liệu cá nhân.

## 4. Checklist nghiệm thu thiết bị thật

- [ ] Android Chrome: chọn danh mục, nhập tiếng Việt có dấu/không dấu, chặn PII, mở link ngoài.
- [ ] iOS Safari: form nhập liệu, bàn phím, viewport, mở App Store, liên kết `tel:`.
- [ ] 20 tuyến nghiệp vụ + âm tính: sai link, ý định mơ hồ, câu hỏi về tiền và thời hạn, 2 mục trong một câu.
- [ ] Đối chiếu 8 ứng dụng gốc, logo có quyền sử dụng (chưa đưa logo vào dự án).
- [ ] Kiểm tra link đích/redirect thực và cơ quan phát hành; phát hiện URL bị đổi hoặc không truy cập được.
- [ ] Security headers HTTPS, CSP, SAST/DAST, thư viện bên thứ ba (hiện không có).
- [ ] Không xuất hiện thông tin nhập riêng tư trong query string, console, analytics, storage hoặc các request.
- [ ] Thử ngoại tuyến: UI có thể tải nếu tài nguyên đã được tải; kết nối ra cổng phải báo đúng là cần internet.
- [ ] Kiểm tra tiếp cận WCAG: kích thước nút, chỉ thị focus, tương phản, screen reader.

## 5. Trạng thái thực tế

Đã thực thi: static routing, source registry, evidence gate, response contract, unit/smoke tests.
Chưa có: kiểm tra URL live định kỳ, backend, RAG công bố pháp luật, kho văn bản có hiệu lực, xác thực OCR/tài liệu, tích hợp API của cơ quan chức năng, APK, iOS build, test browser/thiết bị thực hoàn chỉnh.
