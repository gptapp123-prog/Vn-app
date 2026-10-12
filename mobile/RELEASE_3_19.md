# VN App 3.19

1. Mỗi mục mở riêng: mã bưu chính, biển số, đầu số căn cước, điện, nước, quy đổi địa giới và cơ quan. Danh mục tra cứu là màn hình chọn mục; không tự liệt kê tất cả bảng hay đầu mối. Mã bưu chính chỉ hiện mã xã/phường và tỉnh liên quan, không kèm bảng biển số hoặc mã hành chính.
2. Từ khóa có dấu/không dấu và cách gọi phổ biến: zip/postal/mã gửi thư, biển kiểm soát/đầu biển, đầu số/3 số đầu CCCD, trạm nước/nhà máy nước, lịch cúp điện, danh bạ dân sự và cơ quan. Không tự chọn một tác vụ khi cùng hỏi điện và nước; giữ các tuyến dịch vụ công cụ thể.
3. Chọn tỉnh trước khi tra cấp nước, đủ 34 lựa chọn tỉnh mới. Danh mục đơn vị nước vẫn là 24 đầu mối đã có nguồn, không giả lập dữ liệu các tỉnh chưa có. Chỉ hiển thị 3 đầu mối mỗi lượt. Điện lực: ánh xạ đủ 34 tỉnh mới vào 5 hệ thống EVN theo nguồn công bố; TP.HCM mới dùng EVNHCMC, Tây Ninh mới dùng EVNSPC. Có đường dẫn chức năng đã xác minh cho EVNSPC; các cổng chưa có đường dẫn chức năng được ghi rõ.
4. Danh bạ tự lưu có hai loại Dân sự và Cơ quan/đơn vị, giữ 4 trường cũ. Dữ liệu cũ chưa có loại được giữ trong Dân sự, cho phép sửa phân loại. Sao lưu v1 tiếp tục dùng được và giữ loại mới; không suy đoán loại dựa trên tên đơn vị. Danh mục cơ quan công khai tách khỏi liên hệ tự nhập. Biểu mẫu thêm liên hệ thu gọn khi mở màn hình.
5. Tra cứu ba số đầu căn cước theo bảng 63 mã đã công bố trên Cổng Chính phủ. Không nhận cả số căn cước. Mã gốc và địa bàn sau sắp xếp 01/07/2025 hiển thị riêng, không đánh đồng mã căn cước với mã hành chính mới. Không xác minh thẻ, danh tính hoặc nơi cư trú từ đầu mã. Nguồn bảng: https://xaydungchinhsach.chinhphu.vn/cach-nho-12-so-can-cuoc-cong-dan-gan-chip-cuc-de-119220914161814354.htm
6. Tra cứu nhanh dùng thẻ chức năng có icon theo nội dung, tiêu đề, mô tả đích và nút rõ ràng. Hiện 6 thẻ chính; các thẻ còn lại trong “Thêm tra cứu nhanh”. Các icon app chính thức được giữ nguyên.

## Kiểm tra

Bộ kiểm thử hiện có và kiểm thử 3.19: phân biệt mã CCCD 072/080, không nhận số 12 chữ số, ánh xạ điện lực 34 tỉnh không trùng, phân loại/sao lưu danh bạ cũ và mới, từ khóa, màn hình độc lập và yêu cầu tỉnh khi xã trùng tên.

Trình duyệt Chrome thật: 320/375/768/1440 px không tràn ngang; tra bưu chính Bình Chánh; mã CCCD 074 và địa bàn Hồ Chí Minh sau sắp xếp; 34 lựa chọn tỉnh trong nước, 3 kết quả mỗi lượt; điện Bình Dương/Tây Ninh; lưu hai loại danh bạ không lẫn nhau; ô gõ vẫn giữ nội dung khi dừng giữa câu. Không có lỗi JavaScript trong các luồng thử.

Chưa nghiệm thu trên điện thoại Android vật lý. Bảng CCCD là bảng gốc đã công bố, không tuyên bố đây là quy tắc cấp mã mới cho mọi trường hợp năm 2026. Địa giới là mốc 01/07/2025; dữ liệu nước không phủ mọi trạm. Android giữ mã gói `vn.vnapp.citizen.stable` và khóa phát hành cũ; versionCode 31900.
