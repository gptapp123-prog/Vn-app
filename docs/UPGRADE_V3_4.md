# VN App V3.4 — danh bạ và mã tra cứu

Đối chiếu nguồn ngày 11/10/2026. Đây là bản nâng cấp mã nguồn, chưa triển khai lên website hoặc đóng gói APK.

## Đã bổ sung

| Dữ liệu/chức năng | Phạm vi |
|---|---|
| Đầu mã bưu chính 2 số | 34 địa phương theo QĐ 2334/QĐ-BKHCN |
| Mã bưu chính phường/xã/đặc khu 5 số | 3.319 dòng hợp lệ, giữ số 0 đầu |
| Ký hiệu biển số | 34 địa phương theo Phụ lục 02 TT 51/2025/TT-BCA; riêng 80 là Cục CSGT |
| Mã hành chính cấp tỉnh | 34 mã theo QĐ 19/2025/QĐ-TTg, tách khỏi mã bưu chính/biển số |
| Tên địa phương trước sắp xếp | Đối chiếu 63 tên theo NQ 202/2025/QH15; Huế có tên cũ Thừa Thiên Huế |
| Danh bạ dịch vụ mới | 17 đầu mối: điện, bưu chính, nước và 112 |
| Danh mục có sẵn | Tiếp tục 9 app, 13 website và nhóm thanh toán hóa đơn; truy cập từ danh bạ |

Tra qua ô tìm kiếm chung (`biển số 62`, `mã bưu chính Bình Chánh TPHCM`, `danh bạ điện`) hoặc mục **Danh bạ & mã tra cứu**. Có bộ lọc địa phương/lĩnh vực, bảng tra trực tiếp và tải thêm 50 kết quả mỗi lần. Với xã trùng tên, hiển thị các địa phương phù hợp để người dùng chọn. Tên tỉnh cũ chỉ định tuyến tới địa phương sau sắp xếp; không thay thế bảng địa giới xã cũ–mới.

Nguồn gốc mở tại từng kết quả. Dòng bưu chính có liên kết trực tiếp tới trang PDF vật lý chứa dòng gốc; số trang vật lý khác số trang in trong một số tài liệu. Các URL mới được ghim chính xác trong `core/reference-directory.js`, không mở URL do người dùng tùy ý nhập. Không đăng ký service worker hay bổ sung chế độ offline.

## Kiểm tra lỗi nguồn

PDF Bộ KH&CN công bố gồm 3.321 dòng, có hai lỗi nhìn thấy trực tiếp trong tài liệu:

| Trang PDF vật lý | Địa phương | Lỗi |
|---|---|---|
| 38 | Hải Phòng, dòng 34 | Tên đối tượng là `#VALUE!`; mã ghi trong nguồn là `05127` |
| 67 | Phú Thọ, dòng 83, X. Tam Dương Bắc | Mã nguồn ghi `152213`, gồm 6 số |

Hai dòng nằm trong `rejected`, không nằm trong kết quả mã hợp lệ. Không đoán tên xã, không cắt số thừa, không gán mã thay thế. Khi tìm theo tên/mã tương ứng, UI thông báo cần kiểm tra nguồn và mở kênh tra cứu quốc gia. `05127` không được hiển thị như mã hợp lệ.

## Nguồn chính

- Bộ KH&CN: https://mst.gov.vn/van-ban-phap-luat/25175.htm — QĐ 2334/QĐ-BKHCN; tài liệu đính kèm đã lưu tại `sources/postal-2334-2025.pdf`.
- Chính phủ: https://vanban.chinhphu.vn/?classid=1&docid=214486&pageid=27160&typegroupid=6 — TT 51/2025/TT-BCA; bản ký tại `sources/plates-51-2025.pdf`, phụ lục trang 4.
- Báo Điện tử Chính phủ: https://baochinhphu.vn/bang-danh-muc-va-ma-so-cua-34-tinh-thanh-moi-3321-don-vi-hanh-chinh-cap-xa-moi-102250704153652947.htm — mã hành chính cấp tỉnh.
- Báo Điện tử Chính phủ: https://baochinhphu.vn/nghi-quyet-cua-quoc-hoi-ve-sap-xep-don-vi-hanh-chinh-cap-tinh-102250612191145158.htm — tên tỉnh trước/sau sắp xếp.
- Vietnam Post: https://vnpost.vn/vi/hoat-dong-nganh/thong-bao-sua-doi-ma-buu-chinh-quoc-gia-theo-don-vi-hanh-chinh-2-cap — xác nhận kênh https://mabuuchinh.vn/ và số 1900545481.
- SAWACO: https://cskh.sawaco.com.vn/ho_tro/thong_tin_don_vi — 11 đơn vị cấp nước, website/email và hotline chung 1900999997; không sao chép toàn bộ bản đồ phạm vi phục vụ.
- EVN: https://www.evn.com.vn/d/vi-VN/news/Chinh-thuc-dua-vao-hoat-dong-so-dien-thoai-tong-dai-cham-soc-khach-hang-EVN-1558-tu-ngay-1582026-60-142-509261 — số 1558 từ 15/8/2026, chỉ gọi thoại.
- Chính phủ: https://xaydungchinhsach.chinhphu.vn/nhung-dieu-can-biet-ve-tong-dai-112-so-dien-thoai-tiep-nhan-thong-tin-va-noi-dung-thong-tin-ve-su-co-tham-hoa-119250714134442873.htm — tổng đài 112.
- Sở NN&MT Tây Ninh: https://sonnmt.tayninh.gov.vn/nuoc-sach-nong-thon/ — đầu mối nguồn quản lý nước nông thôn; truy xuất trang không thành công trong lượt rà soát này, không thêm hotline hoặc kênh thanh toán suy đoán.

Ghi nguồn Bộ KH&CN, Cổng TTĐT Chính phủ/Báo Điện tử Chính phủ, Vietnam Post và SAWACO khi phát hành lại các dữ liệu tương ứng.

## Dữ liệu và bảo trì

`reference-data.json` là dữ liệu máy đọc; `reference-data.js` là bản dùng trong trình duyệt, không cần tải mạng lúc lọc. Metadata có văn bản, ngày hiệu lực, ngày đối chiếu, nguồn và SHA-256 của hai PDF. Không tự đồng bộ thay đổi pháp luật/địa giới; ngày rà soát không phải ngày hiệu lực của bảng. Không xác nhận đây là bảng địa giới mới nhất sau mọi văn bản năm 2026; giao diện nêu rõ cơ sở văn bản năm 2025 và dùng tên địa phương không gán lại loại tỉnh/thành phố.

Chạy `python3 tools/build-reference-data.py` (cần Poppler `pdftotext`) để dựng lại dữ liệu bưu chính từ PDF. Trình dựng kiểm tra số lượng 3.321 dòng, thứ tự từng tỉnh, đầu mã, mã trùng và loại dòng lỗi. Khi nguồn đổi phải thay PDF, cập nhật metadata và đối chiếu thủ công bảng biển số/mã hành chính; không được tự tái sử dụng ngày rà soát cũ. Danh bạ nằm trong `core/reference-directory.js`; `node tools/export-contacts.js` tạo bản JSON danh bạ để tích hợp dịch vụ khác.

## Kiểm chứng và giới hạn

`npm run check` kiểm tra cả các chức năng cũ và mới: 34 địa phương, 63 tên cũ, 3.319 dòng bưu chính, tính duy nhất/chuẩn 5 số, số 0 đầu, hash PDF, tách các hệ mã, lọc địa phương, hai dòng lỗi, URL bị chặn, tra cứu giao diện, tab và danh bạ EVN. Kiểm thử UI dùng DOM mô phỏng. Chưa chạy trình duyệt thật, APK hoặc thiết bị; chưa thử gọi tổng đài hay thanh toán.

Danh bạ chưa phủ mọi nhà cung cấp nước, điện ngoài EVN, ngân hàng, viễn thông, cơ sở y tế hoặc từng bưu cục. Website/email của đơn vị cấp nước không chứng minh đơn vị hỗ trợ app thanh toán cụ thể. Không dùng tên xã/tỉnh để tự chọn nhà cung cấp, không nhận mã khách hàng/OTP và không xác nhận đã thanh toán. Các giới hạn mở app của V3.3 còn áp dụng.
