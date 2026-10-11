# Adapter mở ứng dụng đã cài trên Android

Mã nguồn hỗ trợ 11 định danh app cố định: 9 app của danh mục và MoMo, Payoo. Chưa có APK, host WebView hoặc bản iOS. App tự thêm không được truyền package vào bridge.

- Merge manifest-queries.xml vào AndroidManifest của host.
- Chỉ gắn KnownAppLauncher dưới tên VNAndroid vào giao diện VN App thuộc quyền kiểm soát. Constructor có WebView cung cấp callback VNAppLaunchResult; constructor chỉ có Activity không có callback.
- Không cho tải URL hoặc iframe bên ngoài trong WebView có bridge. Mở trang đích bằng trình duyệt độc lập, gỡ bridge trước khi host đổi nội dung ngoài.
- Không nhận package, intent URL, component hay dữ liệu thanh toán do JavaScript cung cấp. Adapter chỉ nhận 11 ID trong bảng cố định.
- REQUESTED là đã xếp yêu cầu; STARTED là hệ thống nhận lệnh mở. Cả hai không chứng minh thanh toán/hồ sơ hoàn tất. Callback báo LAUNCH_FAILED khi startActivity thất bại; lookup bị SecurityException cũng trả LAUNCH_FAILED.
- Trước khi phát hành host: đối chiếu package, thử app chưa cài/đã cài, app không mở được, quay lại từ app, mất mạng. Adapter chưa được biên dịch hoặc chạy trên Android thật trong bản này.
