# VN App V2.0 — ĐẶC TẢ BỘ XỬ LÝ TÁC VỤ

Ngày: 11/10/2026. Phạm vi: Bộ nhận ý định + định tuyến tới cổng có thẩm quyền + đầu ra hướng dẫn có cấu trúc. Không có API lấy hồ sơ cá nhân.

## 1. Luồng hoạt động (đã lập trình)

```
Người dùng nhập tiếng Việt
    │
    ├─ Loại bỏ chuỗi có nguy cơ chứa CCCD, số BHXH, số ĐT, biển số xe, email
    ↓
Chuẩn hóa tiếng Việt (bỏ dấu, chữ thường, alias GPLX/BHYT/BHXH)
    ↓
Phân lớp nghiệp vụ theo bảng quy tắc (20 tuyến)
    ↓
Đối chiếu đường dẫn theo danh sách hostname HTTPS được phép
    ↓
Đầu ra = trạng thái + câu trả lời giới hạn + hướng dẫn + liên kết + nguồn
    │
    ├─ Có nguồn trực tiếp: mở đúng trang nghiệp vụ đã xác minh
    ├─ Chỉ xác minh cổng: hiển thị trung thực "Cổng chính thống (cần chọn chức năng)"
    ├─ Nhiều ý định: trả tối đa 3 nghiệp vụ thuộc nhóm khác nhau
    ├─ Không đủ bằng chứng: không đoán / không tạo đường dẫn giả
    └─ Tình huống khẩn cấp: ưu tiên số 113/114/115, không nhận tin báo
```

## 2. Định nghĩa trạng thái kết quả

| Mã nội bộ | Nghĩa |
|---|---|
| MATCHED | Khớp 1 quy tắc nghiệp vụ từ tập đã duyệt |
| MULTIPLE_MATCHES | Có các yêu cầu thuộc nhiều nghiệp vụ trong một câu |
| NO_VERIFIED_ROUTE | Không tìm được tuyến nghiệp vụ đủ chắc chắn |
| PRIVATE_INPUT | Nội dung chủ yếu chứa số định danh/biển số/email/số điện thoại; dữ liệu đã được loại bỏ |
| EMPTY | Người dùng chưa nhập đủ tên tác vụ |

Các loại **kết quả trả về**: `OFFICIAL_PROCEDURE`, `PUBLIC_INFORMATION`, `AUTH_REQUIRED`, `AUTH_OR_CAPTCHA`, `EMERGENCY`. Đây là *loại tuyến xử lý*, **không phải kết quả nghiệp vụ thực tế do cơ quan chức năng trả về**.

## 3. Tập nghiệp vụ đã lập trình

1. Phạt nguội → biểu mẫu có tại CSGT, VNeTraffic (kho chính thức).
2. Đổi GPLX → đường dẫn trực tiếp trang thủ tục đổi GPLX trên Cổng DVCQG.
3. Cấp lại GPLX → cổng thủ tục, chọn đúng trường hợp.
4. Tra cứu GPLX → DVCQG/VNeID.
5. Thông báo lưu trú → đường dẫn trang thủ tục.
6. Đăng ký tạm trú → DVC Bộ Công an.
7. Thường trú và xác nhận cư trú → DVC Bộ Công an.
8. Định danh VNeID → trang dịch vụ VNeID.
9. Kiểm tra thời hạn BHYT → biểu mẫu BHXH trực tiếp.
10. BHXH/BHYT/VssID → cổng BHXH và kho ứng dụng.
11. Y tế/giấy phép hành nghề → DVC Bộ Y tế.
12. Tra cứu mã số thuế → cổng Thuế điện tử.
13. Nộp thuế/thuế cá nhân → cổng Thuế và kho eTax Mobile.
14. Tiến độ hồ sơ → DVCQG (cần đăng nhập/xác thực).
15. Các loại giấy phép → DVCQG.
16. Học sinh, tuyển sinh → Bộ Giáo dục và Đào tạo; hệ thống địa phương cần được bổ sung.
17. Nghĩa vụ quân sự → Bộ Quốc phòng; hồ sơ cá nhân tại địa phương.
18. Phản ánh/tiện ích TPHCM → Công dân số TP.HCM.
19. Sổ tay Đảng viên → hệ thống và kho phát hành iCPV - Book.
20. SOS/Help 114 và số khẩn cấp → hiển thị đường gọi phù hợp.

## 4. Xác thực nguồn & độ cụ thể của liên kết

- Link **trực tiếp**: chỉ gắn nhãn trực tiếp khi đã tìm được trang nghiệp vụ cụ thể công bố bởi cơ quan chính thức.
- Link **cổng chính thống**: không tuyên bố đã mở đến màn hình thủ tục cụ thể.
- Kho Android/iOS: chỉ là trang cài đặt trên Play Store/App Store, không mặc định ứng dụng được cài đặt hoặc tự mở đúng màn hình.
- Biểu tượng ứng dụng: chưa chèn; không tự vẽ lại.
- Lĩnh vực thay đổi thường xuyên (thẩm quyền, điều kiện, lệ phí, hiệu lực văn bản): V2 chưa tự tra cứu pháp luật thời gian thực; chỉ đưa nguồn để kiểm tra.
- Không áp dụng tự động chuyển hướng qua domain thứ ba; URL HTTPS được so sánh theo hostname tuyệt đối.

### Mẫu nguồn trực tiếp đã đối chiếu

- BHYT: https://baohiemxahoi.gov.vn/tracuu/pages/tra-cuu-thoi-han-su-dung-the-bhyt.aspx
- Đổi GPLX: https://dichvucong.gov.vn/p/home/dvc-tthc-thu-tuc-hanh-chinh-chi-tiet.html?ma_thu_tuc=372344
- Thông báo lưu trú: https://dichvucong.gov.vn/p/home/dvc-tthc-thu-tuc-hanh-chinh-chi-tiet.html?ma_thu_tuc=3931
- Phạt nguội: https://www.csgt.vn/ (có mục tra cứu qua hình ảnh; chưa xác minh URL tách riêng cho biểu mẫu nên gắn nhãn 'cổng').

Lưu ý: các trang thủ tục có thể thay đổi cơ quan giải quyết, phạm vi hoặc đường dẫn. Trước khi phát hành công cộng phải rà lại trang đang hoạt động, redirects, hiệu lực và đơn vị quản lý. Không tự xác nhận hồ sơ và dữ liệu công dân.

## 5. Quy tắc bảo vệ dữ liệu

- VN App không có form nhập CCCD, biển số, họ tên, mật khẩu, mã OTP, số BHXH; người dùng nhập ở website đích.
- Các chuỗi có dạng email, số điện thoại, số định danh 10–12 số và biển số phổ biến được xóa khỏi chuỗi xử lý. Đây là cơ chế giảm thiểu rủi ro, không phải bộ nhận diện toàn diện tất cả PII.
- Không dùng cookie, localStorage, sessionStorage, IndexedDB cho truy vấn, không gọi API, không analytics, không gửi câu hỏi về máy chủ.
- Không log văn bản tìm kiếm. Kết quả được lập cục bộ trong trình duyệt và chỉ tồn tại trong bộ nhớ hiện hành.
- Nội dung kết quả được escape trước khi đưa vào giao diện; liên kết mở tab mới với `noopener noreferrer`.
- CSP `connect-src 'none'`, `frame-src 'none'`, `form-action 'none'` ngăn việc VN App kết nối trực tiếp dịch vụ ngoài qua request.

## 6. Cấu trúc kỹ thuật

- `data.js`: danh mục gốc 8 ứng dụng, 13 website, 13 nhóm tác vụ.
- `engine.js`: xử lý ngôn ngữ, lựa chọn nghiệp vụ, phân mức kết quả, whitelist URL, loại bỏ dữ liệu nhạy cảm.
- `script.js`: UI nhận câu hỏi, xử lý tức thì sau ~220 ms dừng gõ, render kết quả/nguồn, nút vào ứng dụng chính thống.
- `index.html`, `styles.css`: giao diện responsive, không tự tạo logo app.
- `tests/engine.test.js`: kiểm thử ý định, đa ý định, dữ liệu nhạy cảm, URL.
- `tests/ui-smoke.test.js`: khởi tạo UI và kết xuất câu trả lời với DOM giả lập.

Chạy kiểm thử bằng Node.js 18+: `node tests/engine.test.js && node tests/ui-smoke.test.js`.

## 7. Điều kiện cần có để thành hệ thống tra cứu nghiệp vụ thực sự

**Tầng A — phiên bản hiện tại:** định tuyến từ câu hỏi tới thủ tục/nguồn tĩnh, cho biết rõ có cần xác thực hay không.

**Tầng B — tra cứu tri thức chính thức:** thu thập văn bản, hướng dẫn và thủ tục từ API/công bố chính thức được phép; gắn `source_url`, `issuing_agency`, `effective_from`, `effective_to`, `verified_at`, `checksum`, quy trình kiểm duyệt. Sử dụng retrieval có trích dẫn và kiểm soát hiệu lực; không dùng model tự tạo quyết định pháp lý.

**Tầng C — kết quả dữ liệu cá nhân:** chỉ tích hợp khi có API chính thức và văn bản/thỏa thuận cấp quyền tương ứng. Định danh/đăng nhập phải thực hiện bởi nhà cung cấp (OAuth/OIDC/token hạn ngắn nếu được phê duyệt); không chuyển căn cước/mật khẩu/OTP qua VN App, không tạo bản sao dữ liệu cá nhân. Nếu cơ quan không cung cấp API, chỉ được liên kết ra website/app của cơ quan.

**Tầng D — vận hành:** hệ thống giám sát công khai tình trạng URL, chuyển hướng, ngày hiệu lực, quy trình gỡ link không còn hợp lệ; test trên Android/iOS và mạng thật.

## 8. Nghiệm thu tại thời điểm bàn giao

- 56 kiểm thử logic: ĐẠT.
- 6 smoke test JS giao diện: ĐẠT.
- Kiểm tra cú pháp JS qua `node --check`: ĐẠT.
- Kiểm định trình duyệt Chromium headless: KHÔNG HOÀN TẤT do môi trường chạy Chromium bị treo.
- Test thiết bị Android/iOS thật: CHƯA CÓ.
- HTTP monitoring của toàn bộ URL/redirect tại thiết bị thật: CHƯA CÓ.
- API trả kết quả cá nhân, đồng bộ từ hệ thống nhà nước: CHƯA ĐƯỢC CẤP/CHƯA KẾT NỐI.
