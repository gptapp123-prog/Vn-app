# Giao thức adapter tương lai — CHƯA tích hợp

**Mục tiêu:** tránh tạo 'API giả' hoặc nhận dữ liệu cá nhân khi chưa có quyền.

## PublicKnowledgeAdapter

```ts
type OfficialPublicRecord = {
  source_id: string;
  source_url: string;
  issuing_agency: string;
  publication_date: string | null;
  effective_from: string | null;
  effective_to: string | null;
  last_verified_at: string;
  content_checksum: string;
  jurisdiction: string;
  content: string;
};
type PublicKnowledgeResult =
  | { kind: 'EVIDENCE_FOUND'; items: OfficialPublicRecord[] }
  | { kind: 'NO_VALID_EVIDENCE'; reason: string }
  | { kind: 'SOURCE_UNAVAILABLE'; retryable: boolean };
```

**Yêu cầu:** câu trả lời phải dựa vào ít nhất một `OfficialPublicRecord` đủ hiệu lực cho ngữ cảnh; xuất URL + ngày hiệu lực; nếu nguồn xung đột/không rõ thì không kết luận. Không lấy lời văn từ mạng xã hội, blog hay nguồn chưa được xác nhận để khẳng định thủ tục hiện hành.

## OfficialServiceAdapter

```ts
type OfficialServiceResult =
  | {kind: 'HANDOFF'; official_url: string; auth_required: boolean}
  | {kind: 'NOT_AVAILABLE'; reason: 'NO_OFFICIAL_API' | 'NOT_AUTHORIZED' | 'NO_VERIFIED_ROUTE'};
```

**Không chấp nhận** `completed`, `fined`, `insured`, `approved` từ nguồn giả lập/mock trả cho người dùng. Chỉ có thể tạo adapter đọc hồ sơ khi có cơ sở pháp lý, hợp đồng tích hợp, scope và tài liệu bảo mật được cơ quan có thẩm quyền cấp. Mọi bảo mật riêng tư và phiên xác thực do hệ thống đích quản lý theo phương án được cấp phép.

## Acceptance gate

- `EVIDENCE_FOUND`: kiểm tra ban hành/hiệu lực, checksum nguồn, trích dẫn tới đoạn cụ thể trước khi hiển thị.
- `NO_VALID_EVIDENCE`: trả trạng thái chưa đủ thông tin; không tự điền câu trả lời.
- `HANDOFF`: hiển thị tên cơ quan, đích chính thức, có cần xác thực không.
- `NOT_AVAILABLE`: không dựng trang đăng nhập VN App để thay thế cơ quan.
