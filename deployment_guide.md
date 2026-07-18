# Hướng Dẫn Deploy Hệ Thống (Frontend: Vercel | Backend: Render)

Tài liệu này hướng dẫn chi tiết cách triển khai (deploy) hệ thống ứng dụng bao gồm **Next.js Frontend** (lên **Vercel**), **NestJS Backend REST API** (lên **Render**), **Database PostgreSQL** (trên **Supabase**), và **BullMQ Email Worker** (chạy nền trên **Render**).

---

## 1. Kiến Trúc Triển Khai (Deployment Architecture)

Hệ thống được tách biệt thành Front-end và Back-end để tối ưu hóa hiệu năng, chi phí và khả năng mở rộng:

```mermaid
graph TD
    User([Người Dùng])
    
    subgraph Vercel [Nền tảng Vercel (Serverless)]
        FE[Next.js Frontend]
    end
    
    subgraph Render [Nền tảng Render (Long-running Services)]
        BE[NestJS Backend API]
        Worker[BullMQ Email Worker]
        Redis[(Render Redis)]
    end
    
    subgraph Supabase [Database Cloud]
        DB[(PostgreSQL Database)]
    end
    
    subgraph EmailService [Dịch vụ SMTP]
        SMTP[Mailtrap / Gmail SMTP]
    end

    User -->|HTTP/Access| FE
    FE -->|API Calls + x-api-key| BE
    FE -->|Lưu Contact| DB
    FE -->|Đẩy Email Job| Redis
    
    BE -->|Query Templates| DB
    Worker -->|Lắng nghe Job| Redis
    Worker -->|Gửi Mail| SMTP
```

---

## 2. Chuẩn Bị Cơ Sở Dữ Liệu (PostgreSQL & Redis)

### 2.1. Cấu Hinh PostgreSQL (Supabase - Cô lập Schema)
Dự án sử dụng chung một database PostgreSQL trên Supabase cho cả Backend và Frontend, nhưng để tránh xung đột dữ liệu (do hai phần dùng hai schema Prisma độc lập, nếu dùng chung namespace `public` thì Prisma sẽ xóa bảng của phần còn lại khi đồng bộ):
- **Backend (API):** Sử dụng schema namespace mặc định là `public`.
  - Database URL: `postgresql://postgres:Kimloan%40%40123@db.ufqzgyfdeliahuytfrmc.supabase.co:5432/postgres?schema=public`
- **Frontend & Worker:** Sử dụng schema namespace cô lập là `frontend`.
  - Database URL: `postgresql://postgres:Kimloan%40%40123@db.ufqzgyfdeliahuytfrmc.supabase.co:5432/postgres?schema=frontend`

**Các bước cập nhật schema trên Database:**
1. **Đối với Backend (Bảng `Template` trong namespace `public`):**
   Mở terminal tại thư mục `backend/` và chạy lệnh sau để áp dụng các file migration có sẵn lên Supabase:
   ```bash
   cd backend
   npx prisma migrate deploy
   ```
2. **Gieo dữ liệu mẫu cho Backend (Seed Templates):**
   Chạy lệnh sau để khởi tạo dữ liệu mẫu cho các template thiết kế:
   ```bash
   npx prisma db seed
   ```
3. **Đối với Frontend (Bảng `contact_submissions` trong namespace `frontend`):**
   Mở terminal tại thư mục `frontend/` và chạy lệnh sau để tự động tạo schema `frontend` và bảng `contact_submissions`:
   ```bash
   cd frontend
   npx prisma db push
   ```

### 2.2. Tạo Khởi Tạo Redis trên Render
Vì Next.js chạy ở môi trường Serverless trên Vercel không thể duy trì kết nối persistent 24/7 để chạy hàng đợi xử lý ngầm (BullMQ Worker), chúng ta cần một dịch vụ Redis trung gian.

1. Truy cập vào dashboard [Render](https://dashboard.render.com/).
2. Click **New** -> **Redis**.
3. Điền các thông tin:
   - **Name**: `website-service-redis`
   - **Region**: Chọn vùng cùng với Backend (Ví dụ: `Singapore - ap-southeast-1` để có độ trễ thấp nhất).
   - **Plan**: Chọn `Free` (hoặc nâng cấp nếu cần).
4. Sau khi khởi tạo xong, Render sẽ cung cấp **Internal Redis URL** (dùng nội bộ trong Render) và **External Redis URL** (dùng cho Vercel).
   - *Lưu ý:* Lưu lại chuỗi kết nối dạng `redis://red-xxxxxxxxxx:6379`.

---

## 3. Triển Khai Backend (NestJS API trên Render)

Backend là một ứng dụng NestJS REST API chạy liên tục 24/7. Chúng ta sẽ deploy dưới dạng **Web Service** trên Render.

### 3.1. Thiết Lập Trên Render Web Service
1. Click **New** -> **Web Service**.
2. Kết nối tới tài khoản GitHub của bạn và chọn repository chứa code.
3. Cấu hình dịch vụ như sau:
   - **Name**: `website-studio-backend`
   - **Root Directory**: `backend` *(Rất quan trọng - Render sẽ CD vào đây trước khi build)*
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npx prisma generate && npx prisma migrate deploy && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Plan**: Chọn `Free` hoặc phù hợp với nhu cầu.

### 3.2. Cấu Hình Environment Variables (Biến môi trường)
Nhấp vào tab **Environment** của Web Service mới tạo và thêm các biến:

| Key | Value | Ghi chú |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Chế độ chạy production |
| `PORT` | `5000` | Cổng HTTP mà NestJS lắng nghe |
| `DATABASE_URL` | `postgresql://postgres:Kimloan%40%40123@db.ufqzgyfdeliahuytfrmc.supabase.co:5432/postgres?schema=public` | Link DB Supabase |
| `API_KEY` | `studiocanhan_secure_api_key_7799` | Key bảo mật để FE gọi BE |
| `CORS_ORIGIN` | `https://your-frontend-domain.vercel.app` | Điền tên miền frontend Vercel của bạn (sau khi deploy FE xong) |

### 3.3. Cấu Hình Health Check (Tùy chọn nhưng khuyến nghị)
Trong phần **Advanced** của Web Service:
- **Health Check Path**: `/api/health`
- Render sẽ tự động gọi endpoint này để xác định xem server đã khởi động thành công và sẵn sàng nhận traffic hay chưa.

---

## 4. Triển Khai BullMQ Email Worker (Render Background Worker)

Vì Vercel Serverless không thể chạy vòng lặp vô hạn xử lý hàng đợi email, ta sẽ deploy kịch bản Worker (`frontend/src/scripts/start-worker.ts`) dưới dạng một **Background Worker** chạy độc lập trên Render.

### 4.1. Thiết Lập Trên Render Background Worker
1. Click **New** -> **Background Worker**.
2. Chọn repository chứa dự án.
3. Cấu hình dịch vụ như sau:
   - **Name**: `website-email-worker`
   - **Root Directory**: `frontend` *(Dùng thư mục frontend vì script worker nằm ở đây)*
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npx prisma generate`
   - **Start Command**: `npm run worker`
   - **Plan**: Chọn `Free` (hoặc cấp độ phù hợp).

### 4.2. Cấu Hình Environment Variables cho Worker
Worker cần các biến môi trường để kết nối Redis và gửi mail SMTP qua Nodemailer:

| Key | Value | Ghi chú |
| :--- | :--- | :--- |
| `DATABASE_URL` | `postgresql://postgres:Kimloan%40%40123@db.ufqzgyfdeliahuytfrmc.supabase.co:5432/postgres?schema=frontend` | Kết nối tới schema cô lập của frontend |
| `REDIS_URL` | *(Sử dụng Internal Redis URL của Render Redis vừa tạo ở Bước 2)* | Dùng kết nối nội bộ để không bị tính băng thông ngoài |
| `SMTP_HOST` | `smtp.mailtrap.io` *(hoặc smtp.gmail.com)* | Host gửi mail |
| `SMTP_PORT` | `2525` *(hoặc 465 / 587)* | Cổng gửi mail |
| `SMTP_USER` | `your-smtp-username` | Tài khoản gửi mail |
| `SMTP_PASSWORD` | `your-smtp-password` | Mật khẩu gửi mail |
| `DEFAULT_ACCOUNT_ID` | `lumina-agency-default` | ID quản lý của đại lý |

---

## 5. Triển Khai Frontend (Next.js trên Vercel)

Frontend sử dụng Next.js App Router sẽ được triển khai lên **Vercel** để tối ưu hóa tốc độ tải trang toàn cầu qua CDN Edge.

### 5.1. Thiết Lập Trên Vercel
1. Đăng nhập vào [Vercel](https://vercel.com/) bằng tài khoản GitHub của bạn.
2. Click **Add New** -> **Project**.
3. Chọn repository của dự án.
4. Cấu hình dự án:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `frontend` *(Chọn thư mục frontend)*
   - **Build Command**: `npx prisma generate && next build` *(Ghi đè để sinh Prisma client trước khi build dự án)*
   - **Install Command**: `npm install`

### 5.2. Cấu Hinh Environment Variables trên Vercel
Thêm các biến môi trường sau vào phần **Environment Variables**:

| Key | Value | Ghi chú |
| :--- | :--- | :--- |
| `DATABASE_URL` | `postgresql://postgres:Kimloan%40%40123@db.ufqzgyfdeliahuytfrmc.supabase.co:5432/postgres?schema=frontend` | Đường dẫn kết nối DB Supabase với namespace `frontend` |
| `REDIS_URL` | *(Sử dụng **External** Redis URL của Render Redis)* | Vercel gọi từ ngoài vào Render nên phải dùng link External |
| `NEXT_PUBLIC_API_URL` | `https://website-studio-backend.onrender.com` | URL của NestJS Backend Web Service trên Render sau khi deploy thành công |
| `API_KEY` | `studiocanhan_secure_api_key_7799` | Phải trùng khớp với API_KEY ở Backend |
| `SMTP_HOST` | `dummy` | Đặt dummy vì Vercel không trực tiếp chạy worker gửi mail |
| `SMTP_PORT` | `2525` | Đặt dummy |
| `SMTP_USER` | `dummy@example.com` | Đặt dummy |
| `SMTP_PASSWORD` | `dummy` | Đặt dummy |

---

## 6. Quy Trình Kiểm Tra & Vận Hành (Verification)

Sau khi deploy xong cả 4 thành phần (Database, Backend, Worker, Frontend):

1. **Kiểm tra kết nối API:**
   Truy cập `https://your-frontend-domain.vercel.app`. Trang web sẽ tải danh sách các template. 
   - *Nếu hiển thị dữ liệu chuẩn từ DB:* Kết nối Next.js -> NestJS Backend thành công.
   - *Nếu hiển thị dữ liệu giả định (Fallback):* Kiểm tra log Vercel và xem `NEXT_PUBLIC_API_URL` đã đúng chưa, `API_KEY` đã khớp chưa.

2. **Kiểm tra Contact Form & BullMQ Worker:**
   - Điền form liên hệ ở phần chân trang (hoặc trang liên hệ) và bấm gửi.
   - Xem log trên Vercel: Phải ghi nhận yêu cầu và thêm job thành công vào Redis.
   - Xem log trên Render Background Worker (`website-email-worker`): Sẽ xuất hiện dòng chữ `✉️ [Worker] Processing email for...` và sau đó là `✅ [Worker] Email sent successfully`.
   - Kiểm tra hòm thư nhận thư mẫu để chắc chắn email đã được gửi thành công.
