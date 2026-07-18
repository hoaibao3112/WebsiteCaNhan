# Hướng Dẫn Thiết Lập Lên Lịch Chạy Tự Động (Scheduled Task) Cho Bản Claude Pro/Max

Tài liệu này cung cấp cấu hình chi tiết và hướng dẫn các bước thiết lập để hệ thống tự động chạy ngầm (mỗi 10 - 15 phút) nhằm quét ảnh, gắn ảnh và xuất bản bài viết mà không cần con người phải chat hay ra lệnh thủ công.

---

## 📅 1. Cấu Hình Chu Kỳ Chạy (Cron Expression)

Khi cài đặt Scheduled Task (Lịch trình chạy nền), anh cấu hình thời gian chạy tự động như sau:

* **Tần suất khuyên dùng:** 10 hoặc 15 phút một lần (Đủ nhanh để cập nhật bài viết mà không làm quá tải hạn mức API).
* **Mã Cron Expression:** 
  * Chạy mỗi 10 phút: `*/10 * * * *`
  * Chạy mỗi 15 phút: `*/15 * * * *`

---

## 🤖 2. Nội Dung Lệnh Chạy Tự Động (Cron Job Prompt)

Khi cấu hình lệnh chạy ngầm, anh copy chính xác đoạn Prompt hướng dẫn này dán vào ô **"Instructions" (Chỉ dẫn chạy)** của Scheduled Task:

```text
Bạn là tác nhân chạy ngầm (Background Agent) xử lý quy trình đăng bài Blog tự động cho AIZEN.

Hãy thực thi các nhiệm vụ sau theo đúng quy trình:
1. Đọc tệp cấu hình Skill `blog-image-publisher` trong thư mục dự án.
2. Thực thi "Part 2 — Checking for ready images" (Quét Drive tìm ảnh khớp ID bài viết nháp, lấy link công khai, cập nhật bài nháp Haravan và ghi log lên Google Sheet tab Blog_Automation).
3. Thực thi "Action B: Sync manual publishing status" để kiểm tra xem Admin đã bấm Đăng bài trên Haravan chưa. Nếu rồi, tự động chuyển trạng thái trên Google Sheet thành "published".
4. Nếu gặp bất kỳ lỗi kết nối API nào (Google Drive, Google Sheets, Haravan), hãy ngay lập tức gọi Skill `blog-automation-monitor` để gửi cảnh báo đỏ về Lark Webhook.

*Lưu ý: Bạn đang chạy ở chế độ tự động hoàn toàn (cron job ngầm), tuyệt đối không đặt câu hỏi phản hồi cho người dùng, sử dụng các mã ID thư mục mặc định hoặc cấu hình động trên Google Sheet để xử lý.*
```

---

## ⚙️ 3. Các Bước Thiết Lập Trên Giao Diện Claude Pro/Cowork

Khi tính năng chạy ngầm (Scheduled Tasks / Cowork) khả dụng trên tài khoản Claude của anh, anh thực hiện cài đặt theo các bước sau:

1. **Bước 1: Tạo Task mới**
   * Vào phần quản trị **Cowork / Scheduled Tasks** trên tài khoản Claude Pro/Max.
   * Bấm **Create New Task** (Tạo tác vụ mới).
2. **Bước 2: Chọn thư mục dự án (Workspace)**
   * Liên kết Task này với thư mục chứa mã nguồn website của anh: `d:\freelancer\WebSiteCaNhan`.
   * Việc này giúp Claude tự động đọc được 5 file Skill trong thư mục `.agents/skills/`.
3. **Bước 3: Dán Chỉ Dẫn Chạy**
   * Dán đoạn Prompt hướng dẫn ở **Mục 2** phía trên vào ô *Chỉ dẫn hành động (Task Prompt / Instructions)*.
4. **Bước 4: Cài đặt lịch trình (Schedule)**
   * Chọn chế độ chạy theo chu kỳ (Cron/Interval) và điền mã `*/10 * * * *` (mỗi 10 phút).
5. **Bước 5: Kích hoạt (Enable)**
   * Bấm **Save & Run** để bắt đầu kích hoạt tác vụ chạy ngầm.

---

## 🚨 4. Cơ Chế Giám Sát Khi Chạy Tự Động
* Mỗi khi chạy xong, hệ thống sẽ gửi một báo cáo ngắn gọn (Báo cáo xanh) về Lark Webhook của anh báo cáo danh sách bài viết đã được gắn ảnh thành công.
* Nếu có lỗi phát sinh (mất kết nối, file đặt sai tên), hệ thống sẽ gửi cảnh báo lỗi (Cảnh báo đỏ) về Lark Webhook để anh vào xử lý kịp thời.
