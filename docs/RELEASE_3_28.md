# VN App 3.28 — Xác định nhu cầu và dẫn đúng nội dung

Thêm tìm tác vụ theo các từ có ý nghĩa trong toàn bộ danh mục public/life/citizen. Kết quả tìm gần luôn cần người dùng xác nhận; không coi điểm xếp hạng là xác suất đúng và không tự mở một tác vụ đoán được. Lọc từ dẫn câu, yêu cầu số từ khớp tối thiểu, có từ chỉ nghiệp vụ, chặn gợi ý mua hàng khi người dùng muốn sửa thiết bị, giữ từ riêng để hệ thống đích chọn đơn vị.

- Câu chung về bảo hiểm, đất, giấy tờ, khoản thu, sửa máy, đơn mua hàng, học hành, y tế, thuốc, học phí và thuế có câu hỏi và lựa chọn cụ thể.
- Khi chưa xác định được việc: bổ sung ngay tại kết quả; dùng yêu cầu trước đó làm ngữ cảnh. Không buộc nhập lại toàn bộ câu, không đổi ô nhập ban đầu ở câu không chứa dữ liệu riêng.
- Câu không có tác vụ gần phù hợp: ghi rõ chưa có nguồn, vẫn cho bổ sung tên việc/đơn vị. Không sinh URL hoặc trả kết quả nghiệp vụ.
- Nhận đúng một tên đơn vị nước LAWACO/BWACO/TANIWASSCO/Phú Mỹ Vinh có trong danh mục thì chọn đơn vị ngay, giảm bước chọn lại địa bàn. Không chọn nếu địa bàn đã nhập mâu thuẫn hoặc đang yêu cầu nước nông thôn. Thanh toán vẫn cần đối chiếu đơn vị trên hóa đơn; không xác nhận giao dịch.
- Khi đã xác nhận đơn vị và muốn trả tiền nước, chỉ nút thanh toán là hành động chính; xem hóa đơn vẫn có thể dùng.

Kiểm thử hành trình qua DOM giả: hỏi bảo hiểm → chọn BHXH một lần → nguồn thủ tục; giấy đi làm → lý lịch tư pháp → nguồn; rút bảo hiểm → xác nhận tác vụ; máy lạnh sửa → chọn hãng; rút tiền → bổ sung BHXH một lần; đóng phí → chọn nước; LAWACO → xác nhận đơn vị → Payoo. Có ca xung đột địa bàn, giữ câu ban đầu, mã khách hàng, từ phủ định, câu thuốc theo triệu chứng, câu lạ và URL ngoài. Bộ dự án gồm các hồi quy 3.27 cũng phải đạt.

Giới hạn: tìm theo danh mục và thuật ngữ, chưa có model AI hiểu mọi câu; nguồn và nhà cung cấp chưa đầy đủ, không có kiểm tra nguồn trực tiếp theo từng câu. Một số app chưa có liên kết mở riêng chức năng. DOM giả, chữ ký APK và đối chiếu nội dung không thay thế cài/chạy trên điện thoại thật; lỗi cài trên máy người dùng chưa được xác nhận đã hết. Không được tuyên bố mục tiêu sản phẩm đã đạt đầy đủ dựa trên bộ kiểm tra này.
