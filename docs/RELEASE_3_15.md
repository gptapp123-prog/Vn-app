# VN App 3.15 — cài song song để giữ dữ liệu

Android application ID: `vn.vnapp.citizen.stable`, tên hiển thị `VN App Mới`. Bản cũ `vn.vnapp.citizen` giữ nguyên và không phải gỡ. Android namespace/activity giữ nguyên lớp mã; FileProvider dùng `${applicationId}` nên có authority riêng. Capacitor appId và iOS bundle vẫn là `vn.vnapp.citizen`; applicationId Android được cố định riêng trong Gradle.

Bản mới dùng khóa phát hành cố định đã dùng từ 3.13. Các bản kế tiếp phải giữ mã gói `.stable` và cùng khóa. Không có khóa riêng của bản debug cũ nên không thể tạo bản cập nhật đè tương thích chữ ký cho bản đó.

Chuyển dữ liệu: Thêm & hiển thị → Chuyển dữ liệu từ app cũ. Người dùng xuất JSON từ app cũ, nhập vào bản mới và đối chiếu. Không tự truy cập dữ liệu sandbox app cũ; không hứa tự chuyển dữ liệu. Mục ghim cần ghim lại. Nếu bản cũ chưa có xuất danh mục app, giữ app cũ và thêm lại các mục cần dùng.

Kiểm thử: bộ kiểm tra dự án, giao diện nhập dữ liệu trên trình duyệt; kiểm tra APK cuối cùng có package và provider riêng, chữ ký cố định. Chưa kiểm thử cài song song trên thiết bị Android thật.
