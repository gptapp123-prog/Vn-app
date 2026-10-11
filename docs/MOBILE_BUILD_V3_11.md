# VN App V3.11 — Android và iOS

## Kết quả hiện có

Đã tạo dự án Android Gradle và dự án iOS Xcode/Swift Package Manager bằng Capacitor 8.5.3, mã ứng dụng `vn.vnapp.citizen`. Dùng chung giao diện V3.10, danh bạ và bộ định tuyến V3.9. Có bundle web đã dựng và đồng bộ vào hai dự án. Không có service worker hay bản offline riêng; các trang dịch vụ và giao dịch vẫn cần mạng.

Đã nối bộ quét QR/mã vạch native, không phụ thuộc BarcodeDetector khi bấm camera. Nhập mã thủ công vẫn dùng được. Đọc mã từ ảnh trên web vẫn phụ thuộc hỗ trợ trình duyệt, chưa có bộ đọc ảnh native. Camera native mở giao diện của plugin; bố cục camera compact trong web không điều khiển giao diện này.

Đã nối mở website bằng trình duyệt hệ thống trong app, mở trình gọi điện, chia sẻ/xuất danh bạ JSON bằng màn hình chia sẻ native. Tệp chia sẻ tạm được giữ để ứng dụng nhận đọc đủ dữ liệu; các tệp danh bạ tạm cũ hơn 24 giờ được dọn ở lần mở VN App tiếp theo. Danh bạ chính vẫn ở IndexedDB; Android tắt sao lưu tự động. Xuất tệp trước khi gỡ app để giữ danh bạ.

Android mở các package đã ghim qua App Launcher và có khai báo queries đúng danh mục. iOS chưa có scheme mở riêng VNeID/VNeTraffic/các app khác đã được xác minh: không đoán scheme; dùng kênh web hoặc App Store trong phần thông tin thêm. Không xác nhận giao dịch hoặc hồ sơ.

Android minSdk 26 (Android 8 trở lên), compile/target SDK 36; dự án dùng Java 21. iOS deployment target từ dự án Capacitor là iOS 15 trở lên, cần kiểm tra thực trên phiên bản mục tiêu. Không tuyên bố đã tương thích mọi điện thoại.

## Build Android

Cài Node 24, JDK 21 và Android SDK 36/build tools 36.0.0. Giải nén vào thư mục có package.json:

```sh
npm ci
npm run check
npm run mobile:sync
npm run android:debug
```

APK debug khi build thành công: `android/app/build/outputs/apk/debug/app-debug.apk`. Bản phát hành cần keystore riêng của chủ ứng dụng; không dùng khóa debug để phát hành. Mở Android Studio bằng `npm run android:open`.

## Build iOS

Trên Mac có Xcode hỗ trợ dự án, chạy `npm ci`, `npm run check`, `npm run mobile:sync`, `npm run ios:open`. Chọn Signing & Capabilities, Apple Development Team và thiết bị iPhone để build và chạy. Phát hành IPA/TestFlight cần chữ ký và cấu hình phân phối Apple phù hợp; gói này chưa có IPA hoặc tài khoản ký.

Có workflow `.github/workflows/mobile-build.yml` chỉ chạy thủ công khi đưa dự án lên repository riêng và chọn Run workflow. Android xuất APK debug; iOS xuất App.app cho simulator, không cài được App.app simulator lên iPhone. Workflow chưa được chạy trong lần bàn giao này và chưa phát sinh build GitHub từ tác vụ này.

## Kiểm chứng và trạng thái hiện tại

`npm run mobile:sync` thành công, bundle dựng thành công. `npm run check` đạt 15 bộ kiểm thử; phần native kiểm bằng mock plugin, không phải chạy trên máy thật. Đã kiểm trường hợp scanner native làm app tạm ẩn nhưng kết quả vẫn được nhận; chuyển trang trong lúc quét không đổ kết quả vào trang mới.

Đã xử lý điểm chặn Gradle, cài JDK 21 và SDK 36 từ nguồn chính thức, dùng kho chứng thư hệ thống có xác minh TLS. Build cuối `:app:assembleDebug` thành công trong 11 giây sau lần biên dịch đầy đủ. APK debug tên VN_App_V3_11_Android.apk đã kiểm chữ ký v2, căn chỉnh ZIP 16 KB và các đoạn LOAD của thư viện ARM64 16 KB. Kiểm tra tất cả 25 tệp bundle trong APK khớp nguồn www. Chi tiết và SHA-256 trong mobile/build-status.json; kết quả chữ ký trong mobile/apk-signature-check.txt.

15 bộ kiểm thử đạt; chưa chạy trên điện thoại hoặc emulator thực. Chưa có Xcode/macOS và cấu hình ký Apple để tạo IPA. Workflow GitHub chưa chạy. Dự án iOS đã đồng bộ nhưng chưa xác nhận build thành công.

Chạy build Android bằng `npm run android:debug`; bộ chạy kiểm JDK 21 có javac và SDK 36 trước khi build. Nếu môi trường dùng proxy, cấu hình được đưa trực tiếp vào Java. Có thể đặt VN_APP_JAVA_TRUSTSTORE vào kho chứng thư tin cậy phù hợp; không tắt xác minh TLS. Android Gradle có thể tự cài build-tools 35 mặc định khi có mạng và giấy phép SDK đã chấp nhận. `npm run ios:simulator` chỉ chạy trên Mac có Xcode, không tạo bản cài iPhone.

Cài thử Android: tải APK, mở tệp và cấp quyền cài từ ứng dụng mở tệp khi hệ thống yêu cầu. Đây là bản debug có ký, chưa phải bản phát hành Play Store. Quét QR chỉ xin camera khi người dùng bấm quét. Kết quả phân tích mã không chứng minh hàng thật hoặc xuất xứ.

Nguồn kỹ thuật: https://capacitorjs.com/docs/getting-started/environment-setup ; https://capacitorjs.com/docs/apis/barcode-scanner ; https://capacitorjs.com/docs/apis/app-launcher . Dữ liệu tra cứu công dân vẫn theo danh mục nguồn chính thức của ứng dụng.
