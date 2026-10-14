# VN App 3.29 — Vị trí và câu trả lời theo địa bàn

Thêm khung vị trí nhỏ cạnh luồng tra cứu: Lấy vị trí GPS, kiểm tra tên địa bàn do thiết bị trả về, xác nhận tỉnh/thành hoặc chọn thủ công, bỏ địa bàn. Không xin vị trí lúc khởi động. Chỉ lấy một lần theo nút, không watchPosition hoặc quyền chạy nền. Địa bàn đã xác nhận chỉ giữ trong bộ nhớ phiên và hết hạn sau 30 phút; không lưu tọa độ trong IndexedDB/localStorage, không gửi tới máy chủ của VN App.

Android dùng @capacitor/geolocation 8.2.3 để lấy vị trí và Android Geocoder để tra tên địa bàn. iOS dùng cùng plugin GPS và CLGeocoder, đăng ký trong AppBridgeViewController/SceneDelegate. Dịch vụ địa chỉ của hệ điều hành có thể cần mạng và dùng máy chủ của nhà cung cấp hệ điều hành; không khẳng định việc tra địa chỉ luôn ngoại tuyến. Web có GPS theo quyền trình duyệt; chưa có dịch vụ tra địa chỉ trong web, nên khi chưa có tên địa bàn sẽ yêu cầu chọn thủ công.

- Câu “tôi đang ở đâu”, “nơi đây là đâu”, “vị trí của tôi” hiển thị tên địa bàn nếu đã lấy GPS. Nếu chỉ chọn thủ công thì ghi đó là địa bàn tra cứu, không nói là địa điểm GPS hiện tại.
- Điện và nước: dùng tỉnh/thành đã xác nhận khi câu không nêu địa bàn. Tên tỉnh/thành trong câu luôn ưu tiên; không suy đoán xã/phường, nhà cung cấp nước hoặc khách hàng từ GPS. Vị trí không được xem là chứng cứ đơn vị thu tiền của từng hộ.
- “Đóng tiền nước ở đây” bỏ từ chỉ nơi khỏi bộ lọc tên đơn vị, tránh không tìm được do từ “đây”.
- GPS cũ, không hợp lệ, bị từ chối, hết thời gian hoặc sai số lớn có xử lý rõ và đường chọn thủ công. Vị trí nước ngoài không tự ánh xạ thành tỉnh Việt Nam. Kết quả đến sau khi bỏ vị trí/chọn thủ công không được ghi đè lựa chọn.
- Câu khẩn cấp luôn ưu tiên trước câu hỏi vị trí.

Nguồn API: https://capacitorjs.com/docs/apis/geolocation ; https://developer.android.com/reference/android/location/Geocoder ; https://developer.apple.com/documentation/corelocation/clgeocoder . Không dùng bộ polygon lịch sử geoBoundaries 2008 làm ranh giới địa phương hiện nay. Tên xã/phường do dịch vụ thiết bị trả về có thể còn tên cũ, phải hiển thị nguồn và kiểm tra, không gọi là dữ liệu pháp lý hiện hành.

Kiểm thử DOM/API mô phỏng: không lấy GPS lúc khởi động, quyền bị từ chối, tọa độ cũ/sai, sai số lớn, không có tên, ngoài Việt Nam, hủy yêu cầu, chọn thủ công khi đang lấy, che HTML tên địa bàn, xác nhận và xóa; câu hỏi vị trí, điện/nước theo địa bàn, tên địa bàn nhập rõ thắng GPS, khẩn cấp ưu tiên. Build native và chữ ký APK cần kiểm tra riêng. Chưa thử GPS/cài đặt trên điện thoại thật; không tuyên bố đã đạt hoàn toàn mục tiêu trả lời mọi câu hỏi hoặc xác định đúng mọi phường/xã.
