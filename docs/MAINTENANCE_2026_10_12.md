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

## Giao diện 3.23 theo yêu cầu

- Đưa toàn bộ app thuộc danh mục đang nạp (20 app chính thức và app người dùng đã thêm) lên đầu nội dung trang chủ, ngay dưới phần tra cứu giữ nguyên.
- Giữ nguyên ô tra cứu, nút gửi, gợi ý nhanh và mục Tra cứu nhanh.
- Các lối vào Nhà nước, công tác Đảng, đời sống và việc đã ghim chuyển xuống dưới trong mục “Các tính năng khác”, mặc định đóng. Bấm để mở khi cần.
- Danh mục app tự lưu tải xong sẽ xuất hiện ngay trên trang chủ; không đòi chuyển sang Kho ứng dụng.
- Phiên bản 3.23.0 / 32300 giữ mã gói và khóa ký cũ.

## Bản sửa lỗi nghiệm thu 3.24

- Ưu tiên câu khẩn cấp trước các nhánh điện, nước, địa giới, mã bưu chính và thủ tục. Không chuyển tiếp tin báo; chỉ hiển thị kênh liên hệ trực tiếp.
- Câu hỏi trạng thái hồ sơ không mở thủ tục tạo mới; hỏi hệ thống đã nộp hồ sơ trước khi dẫn tới mục tra cứu. Hồ sơ TTHC Đảng giữ kênh riêng.
- Câu nhiều nhu cầu khác nhóm có lựa chọn từng phần; giữ nguyên nội dung đã nhập, không bỏ phần BHYT. Lựa chọn chỉ nhận chỉ số trong danh sách đang hiển thị.
- Giữ các luồng nhiều thủ tục cùng nhóm và nhiều loại hóa đơn đã có.
- Trang chủ có đủ 20 app: bổ sung MoMo và Payoo từ mô-đun nước. Liên kết dùng đúng URL đã có, không đoán nguồn cài iOS.
- Thêm hồi quy cho các câu lỗi tìm được ở bản 3.23, kiểm tra cả chuyển trang khi chọn việc và từ chối chỉ số ngoài danh sách.
- Phiên bản 3.24.0 / 32400. Chưa nghiệm thu trên thiết bị vật lý; không thay đổi giới hạn dữ liệu địa giới, đồng bộ hoặc ký iOS.

## Nâng cấp hỏi bằng câu tự nhiên 3.25

- Thêm 40 quy tắc tình huống nối tới tác vụ đã có nguồn, bao gồm hộ tịch, chứng thực, nhà đất, an sinh, công tác Đảng, bảo hiểm, khám bệnh, học tập, đơn hàng và thiết bị hỏng.
- Người dùng không cần gõ đúng tên thủ tục. Ví dụ: “bé mới chào đời cần làm giấy gì”, “bản photo cần đóng dấu”, “máy giặt LG không vắt”, “gói hàng bao giờ tới”.
- Giữ tên cơ sở, hãng thiết bị và ngữ cảnh nước ngoài khi mở tác vụ. Không sửa nội dung đang gõ; không sửa tên thuốc hoặc suy ra chẩn đoán.
- Một nhu cầu đủ rõ mở trực tiếp màn hình nguồn/app. Chỉ hỏi thêm khi thiếu cơ sở, hãng, hệ thống hoặc có nhiều việc khác nhau.
- Câu có nhiều tình huống mới vẫn được tách để chọn từng việc, tránh dùng ngữ cảnh của việc này cho việc khác.
- Chỉ sử dụng đích có trong danh mục hiện có; không tạo URL từ câu hỏi. Thông tin nhận diện cá nhân không đi qua bộ nhận diện này.
- Đây là bộ quy tắc cục bộ mở rộng, chưa phải model AI hoặc bảo đảm hiểu mọi câu hỏi. Phạm vi nguồn và chức năng của các hệ thống ngoài vẫn giữ nguyên giới hạn.
- Có hồi quy câu tự nhiên, nguồn trả về, tên đơn vị, dữ liệu riêng tư, câu nhiều nhu cầu và ngoài danh mục. Phiên bản 3.25.0 / 32500.

## Tên hiển thị và gói cài 3.26

- Tên người dùng nằm trên “Bạn cần tra cứu gì?” ở trang chủ. Bấm biểu tượng bút hoặc vào “Thêm & hiển thị → Tên hiển thị” để đổi tên.
- Lưu tùy chọn bằng IndexedDB riêng trên thiết bị, tối đa 60 ký tự; để trống để bỏ tên. Không tạo tài khoản, gửi mạng hoặc dùng localStorage.
- Lưu thất bại giữ nguyên tên cũ; tải tên nền không ghi đè dữ liệu người dùng đang nhập. Tên không ảnh hưởng bộ nhận diện câu hỏi.
- Có kiểm tra lưu/đọc lại qua IndexedDB mô phỏng, đổi/bỏ tên và dữ liệu không hợp lệ. Chưa nghiệm thu trên điện thoại thật.
- Người dùng tiếp tục báo “Gói không hợp lệ” khi cài 3.25. Bản khôi phục có cấu trúc/chữ ký hợp lệ trên máy kiểm tra; chưa có log Package Installer để xác định nguyên nhân trên điện thoại.
- Bản 3.26 dùng cùng mã gói/chứng chỉ, tăng versionCode 32600, ký v1/v2/v3 và cung cấp tệp tên mới trong ZIP. Cần kiểm tra cả bản tải lại, không chỉ tệp trước khi lưu.
