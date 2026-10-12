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
