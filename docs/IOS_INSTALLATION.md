# Trạng thái iOS và tạo bản cài

Chưa có IPA. Repository riêng: https://github.com/gptapp123-prog/Vn-app. Workflow biên dịch iPhone chưa ký tự chạy khi cập nhật main; phải kiểm tra kết quả GitHub Actions trước khi xác nhận build thành công.

Đã thêm scheme App chia sẻ cho Xcode và workflow riêng ios-build.yml. Có thể chạy thủ công với hai đích biên dịch: iPhone chưa ký hoặc simulator; cả hai không phải bản cài iPhone.

Trên Mac có Xcode, Node 24 và tài khoản ký đã cấu hình:

```sh
npm ci
npm run ios:device
# Sau khi có Team ID thực của chủ ứng dụng:
export VN_APP_APPLE_TEAM_ID='TEAM_ID_THUC_CUA_ANH'
npm run ios:archive
# Trỏ vào ExportOptions.plist thực từ Xcode:
export VN_APP_EXPORT_OPTIONS='/duong-dan/ExportOptions.plist'
npm run ios:export
```

Team ID trong ví dụ là chỗ điền, không phải giá trị dùng để build. Bộ chạy từ chối Team ID không đúng định dạng. Archive phải qua codesign --verify; export phải có IPA thực thì mới báo thành công. Không tự thay profile, chữ ký hoặc mã thiết bị. Không tự xuất một IPA chưa ký rồi gọi là bản cài.

Để chạy build từ xa cần repository dành riêng cho VN App được kết nối; để cài lên iPhone cần cấu hình ký tương ứng. Cài thử trực tiếp bằng Xcode trên Mac có tài khoản cá nhân khác với phân phối TestFlight/App Store. TestFlight/App Store cần tư cách Apple Developer Program phù hợp. Giữ chứng thư, khóa riêng và mật khẩu trong Keychain/GitHub Secrets; không gửi mật khẩu Apple hoặc khóa riêng trong chat.

Nguồn: https://developer.apple.com/documentation/xcode/distributing-your-app-for-beta-testing-and-releases ; https://help.apple.com/xcode/mac/current/en.lproj/dev60b6fbbc7.html ; https://docs.github.com/en/enterprise-cloud%40latest/actions/how-tos/deploy/deploy-to-third-party-platforms/sign-xcode-applications .
