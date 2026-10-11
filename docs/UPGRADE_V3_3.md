# VN App V3.3 — Nước: địa bàn, đơn vị, ứng dụng

Ngày 11/10/2026. Mã nguồn nâng cấp từ V3.2, chưa triển khai đến điện thoại người dùng.

## Đã bổ sung
- Tiền nước có bộ chọn TP.HCM mới / Tây Ninh mới và khu vực trước sáp nhập.
- Nhận địa bàn từ câu hỏi có tên TP.HCM, Bình Dương, Bà Rịa – Vũng Tàu, Tây Ninh, Long An; câu có cả hai tỉnh/thành để trống lựa chọn thay vì đoán.
- Đối chiếu tên đơn vị, yêu cầu người dùng xác nhận tên trên hóa đơn/trạm trước khi đưa ra kênh phù hợp.
- Hai mục có nguồn: nhóm SAWACO và LAWACO, với MoMo/Payoo. Dữ liệu này là danh mục kênh công bố, không phải bản đồ ranh giới cấp nước từng hộ hoặc dữ liệu đối tác live.
- Chưa có dữ liệu xác nhận từng trạm nước nông thôn, địa bàn Bình Dương, Bà Rịa – Vũng Tàu cũ và Tây Ninh cũ: trả thiếu nguồn, không gán nhà cung cấp khác.
- Chỉ truyền ID app cố định khi yêu cầu mở app; không truyền mã khách hàng, số tiền, hồ sơ hoặc tự tạo giao dịch.
- Web có nút sang kênh thanh toán Payoo, liên kết Google Play đúng package. Chưa xác minh riêng App Store nên không tự tạo link iOS.

## Trạng thái mở app — cần phân biệt
Bản web chưa có deep link chính thức được xác minh để mở MoMo/Payoo vào chức năng tiền nước. Nút Mở ứng dụng hiện báo rõ giới hạn đó; không đánh tráo mở kho tải thành mở app đang cài.

Đã thêm giao thức gọi host Android và mã nguồn KnownAppLauncher.java dùng getLaunchIntentForPackage cho đúng hai package. Đây là adapter tích hợp, KHÔNG phải app Android đã build hoặc APK. Cần đưa adapter vào host Android thực và nghiệm thu mới có thể mở app cài trên máy. Giá trị REQUESTED chỉ là yêu cầu đã được xếp hàng, không xác nhận app đã mở hoặc đã thanh toán. Chưa tích hợp iOS.

Nguồn Android: https://developer.android.com/reference/android/content/pm/PackageManager#getLaunchIntentForPackage(java.lang.String)
Không đưa bridge JavaScript vào nội dung website bên ngoài; chỉ gắn với nội dung VN App thuộc quyền kiểm soát, bỏ bridge trước khi điều hướng ngoài. Không nhúng trang ngân hàng/OTP vào WebView. Trước tích hợp phải xử lý callback lỗi, kiểm tra origin và vòng đời host; adapter riêng chưa đủ cấu thành host an toàn.

## Nguồn đối chiếu
- LAWACO: https://baotintuc.vn/chuyen-dong-so/thuc-day-thanh-toan-so-kien-tao-xa-hoi-so-20260809185227397.htm — bài TTXVN ngày 09/08/2026 công bố các kênh thu tiền nước của LAWACO.
- SAWACO: https://vtv9.vtv.vn/thoi-su-phuong-nam-hom-nay-21022025 — nguồn VTV ngày 21/02/2025 về kênh thanh toán chính thống. Không dùng để khẳng định mọi trạm nông thôn đều thu qua cùng hệ thống.
- MoMo: https://www.momo.vn/huong-dan/huong-dan-thanh-toan-hoa-don-tien-nuoc-bang-vi-momo — các bước chọn nước, nhà cung cấp và đối chiếu hóa đơn.
- Payoo: https://payoo.vn/ — website chính thức dẫn sang https://bill.payoo.vn/ và https://app.payoo.vn/. Không dùng các tên miền sandbox.
- Package đã đối chiếu tại Google Play: com.mservice.momotransfer và vn.payoo.

## Kiểm thử
`npm run check` đạt, gồm hồi quy cũ và ca mới: địa bàn không hợp lệ; không xác định nhà cấp nước từ tỉnh; xác nhận phải boolean true; loại app không được pin; giới hạn host chưa tích hợp; không dựng kết quả giao dịch; UI chọn đơn vị/xác nhận/app.
Chưa chạy Chromium/Android/iOS thật vì môi trường chưa có executable trình duyệt. Java adapter chưa biên dịch cùng SDK Android.

## Phần tiếp theo
Thu thập dữ liệu chính thống về đơn vị/trạm và địa bàn phục vụ, ưu tiên nước nông thôn; xác minh deep link hoặc tích hợp host Android an toàn; kiểm thử thiết bị thật. Không tự nhận đã phủ toàn bộ hai tỉnh/thành.
