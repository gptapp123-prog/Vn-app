# Ký và xuất IPA cho VN App

## Kết quả đã kiểm chứng

Nguồn: https://github.com/gptapp123-prog/Vn-app

Build iPhone chưa ký đã thành công trên GitHub macOS:
https://github.com/gptapp123-prog/Vn-app/actions/runs/38109404255

Chưa có IPA đã ký; chưa kiểm thử iPhone thật. Workflow mới `VN App signed iOS IPA` đã được triển khai nhưng chưa chạy với cấu hình Apple thực.

## Cấu hình một lần

Trong Settings → Secrets and variables → Actions → New repository secret của kho VN App, thêm:

| Secret | Giá trị |
| --- | --- |
| VN_APP_APPLE_TEAM_ID | Team ID Apple gồm 10 ký tự |
| VN_APP_CERTIFICATE_BASE64 | Base64 của chứng thư .p12 có khóa riêng |
| VN_APP_P12_PASSWORD | Mật khẩu bảo vệ .p12 |
| VN_APP_PROFILE_BASE64 | Base64 của provisioning profile .mobileprovision |
| VN_APP_EXPORT_OPTIONS_BASE64 | Base64 của ExportOptions.plist thực từ Xcode |

Trang cấu hình: https://github.com/gptapp123-prog/Vn-app/settings/secrets/actions

Profile và chứng thư phải cùng Team, chưa hết hạn, dành cho bundle ID `vn.vnapp.citizen`. Không gửi mật khẩu Apple, chứng thư hay khóa riêng trong chat. Quy trình này không cần mật khẩu đăng nhập Apple.

ExportOptions.plist lấy từ bước export archive trong Xcode. Cần `signingStyle=manual`, `teamID` đúng, `destination=export`, và `provisioningProfiles` ánh xạ `vn.vnapp.citizen` tới UUID hoặc tên profile. Chọn phương thức phù hợp với tài khoản và profile thực. Không dùng các giá trị ví dụ làm thông tin ký.

## Chạy và nhận kết quả

Mở https://github.com/gptapp123-prog/Vn-app/actions/workflows/ios-signed.yml → Run workflow → chọn main.

1. Kiểm tra đủ Secrets trên Linux; nếu thiếu sẽ dừng trước job Mac.
2. Kiểm thử nguồn, đồng bộ Capacitor.
3. Giải mã và kiểm tra profile, chứng thư có khóa riêng, Team và ExportOptions.
4. Import vào keychain tạm, tạo archive bằng manual signing.
5. Export IPA và kiểm tra chữ ký, bundle ID, profile nhúng.
6. Chỉ khi kiểm tra thành công mới tải artifact `VN-App-iOS-signed-IPA` chứa IPA cùng `verification.json` có SHA-256.
7. Dọn keychain, chứng thư, profile và cấu hình tạm kể cả khi build lỗi.

Artifact giữ 1 ngày. Không tự đăng App Store hoặc tự gửi TestFlight.

IPA kiểu development/release-testing chỉ dành cho thiết bị có trong profile. IPA cho App Store Connect cần đưa lên App Store Connect rồi phân phối qua TestFlight/App Store; tải file IPA về không đồng nghĩa cài trực tiếp được trên mọi iPhone.

## Nghiệm thu trên thiết bị

Sau khi cài bằng phương thức Apple tương ứng, kiểm tra trên iPhone thật: mở app, danh bạ thêm/sửa/xóa và giữ dữ liệu khi khởi động lại; camera quét QR; ảnh từ thư viện; chia sẻ tệp; mở điện thoại/liên kết; quyền camera bị từ chối; bàn phím và menu trên màn hình nhỏ. Kiểm thử nguồn và biên dịch không thay thế nghiệm thu này.

## Nguồn chính thức

- GitHub: https://docs.github.com/en/actions/how-tos/deploy/deploy-to-third-party-platforms/sign-xcode-applications
- Apple, các tệp export: https://help.apple.com/xcode/mac/current/en.lproj/deva1f2ab5a2.html
- Apple, phân phối: https://developer.apple.com/documentation/xcode/distributing-your-app-for-beta-testing-and-releases
