# VN App — bản vá định tuyến công tác Đảng và kiểm soát APK (12/10/2026)

## Đã thay đổi trong mã nguồn

- Tra cứu `lịch sử nộp đảng phí`, `đã nộp đảng phí`, `nộp đảng phí chưa` ưu tiên **kiểm tra lịch sử tại hệ thống của Đảng**, không dẫn nhầm sang **nộp tiền**.
- Tra cứu `tôi muốn nộp đảng phí` vẫn đưa tới luồng nộp đảng phí.
- Có mục **Chọn nghiệp vụ công tác Đảng**: nộp, kiểm tra lịch sử, chuyển sinh hoạt, theo dõi hồ sơ, sổ tay đảng viên. Mục này chỉ định tuyến đến chức năng/danh mục hiện đã được khai báo; không tính, không thu và không lưu đảng phí hoặc thông tin đảng viên.
- Có kiểm thử hồi quy phân biệt hai ý định và từ chối lựa chọn đường dẫn không hợp lệ.
- Android CI phân biệt rõ artifact **đã ký / có thể cài** với artifact **chưa ký / không thể cài**:
  - `VN-App-Android-SIGNED-installable`: chỉ tải lên nếu tồn tại file phát hành và `apksigner verify` thành công.
  - `VN-App-Android-UNSIGNED-not-installable`: file biên dịch chưa ký, dành cho chẩn đoán; không được quảng bá là APK cài đặt.
- Không tạo khóa ký giả/khóa ngẫu nhiên thay cho khóa phát hành cố định.

## Chưa hoàn thành, không được tuyên bố đã nghiệm thu

- Chưa có khóa phát hành Android nên **không có APK đã ký mới**.
- iOS chưa có bằng chứng IPA đã được ký (workflow có thể báo success khi chỉ preflight).
- Chưa chạy thử tay trên Android/iPhone thật, chưa xác minh luồng đăng nhập và nộp hồ sơ trong các app ngoài.
- Chưa xác nhận URL hoạt động thời gian thực; dữ liệu nhà nước/Đảng phải tiếp tục đối chiếu nguồn phát hành chính thức và hiệu lực từng thủ tục.
- Tác vụ thu/chi, hồ sơ đảng viên thực hiện bên hệ thống chuyên trách. VN App không giữ số thẻ, mật khẩu, OTP hay thông tin cá nhân.

## Cách nghiệm thu

1. `npm run check` phải thành công trên CI của nhánh đã cập nhật.
2. Nhập lần lượt: `lịch sử nộp đảng phí`, `tôi đã nộp đảng phí chưa`, `tôi muốn nộp đảng phí`, `thủ tục đảng viên`.
3. Xác minh phần đầu ra lịch sử khác phần nộp, mục trợ giúp không tự thanh toán.
4. Với Android: không lấy file cài đặt từ artifact mang tên `UNSIGNED`. Để phát hành thật phải cấu hình keystore đúng, xác minh chữ ký và kiểm thử cài mới/nâng cấp trên máy thật.

## Bản vá tiếp tục: giữ đúng ngữ cảnh từng thủ tục

- Khi kết quả có nhiều việc, mỗi lựa chọn giữ phần câu thuộc chính việc đó. Ví dụ: “đăng ký khai sinh và đăng ký kết hôn có yếu tố nước ngoài” không gán yếu tố nước ngoài của kết hôn sang khai sinh.
- Chọn kết quả và chọn tiếp trường hợp mất giấy tờ giữ ngữ cảnh nước ngoài/lãnh sự. Trường hợp chưa có nguồn đúng vẫn hiển thị giới hạn, không mở mặc định thủ tục trong nước.
- “Không có yếu tố nước ngoài” và “không có người nước ngoài” không kích hoạt chuyển sang thủ tục nước ngoài.
- Ô tìm trong danh mục dùng cùng bộ xử lý câu phủ định như tra cứu chính: “không muốn nộp đảng phí, tôi cần giấy độc thân” trả mục giấy độc thân.
- Chuyển danh mục hoặc tình huống mới xóa ngữ cảnh lựa chọn cũ.
- Có hồi quy ở bộ xử lý và đầu ra HTML của giao diện mô phỏng. Chưa kiểm thử máy thật; bản vá mã nguồn này không tự tạo APK đã ký.

## Chuẩn bị phát hành 3.22

- Phiên bản 3.22.0 / 32200 cho Android và iOS; giữ nguyên mã gói và dữ liệu ứng dụng.
- CI của bản vá 56da63b đã kiểm tra thành công; Android tạo được APK chưa ký. iOS compile không thay thế IPA ký để cài.
- Đã lấy lại bản sao khóa phát hành từ tệp lưu riêng để ký cục bộ; khóa và mật khẩu không đưa vào kho mã nguồn. CI chưa có cấu hình khóa nên vẫn phân loại đầu ra chưa ký.
- Bản mới phải xác minh chữ ký, nội dung đóng gói và số phiên bản trước khi cung cấp; chưa nghiệm thu điện thoại vật lý.
