# Tài Liệu Thiết Kế Hệ Thống - Website Giới Thiệu Mẫu Web (Kiến Trúc Tách Biệt Frontend & Backend)

Hệ thống được thiết kế tách biệt hoàn toàn giữa Frontend (giao diện hiển thị) và Backend (xử lý dữ liệu/API) để tối ưu hóa việc triển khai miễn phí trên Vercel và Render.

## 1. Kiến Trúc Hệ Thống (Architecture)

- **Frontend (FE):** Next.js App Router (Deploy lên **Vercel** - miễn phí, tốc độ tải trang cực nhanh và tối ưu SEO).
- **Backend (BE):** Node.js + Express + TypeScript + Prisma ORM (Deploy lên **Render** - miễn phí, chạy REST API độc lập).
- **Database:** Supabase PostgreSQL (Bản Free) kết nối với Backend thông qua Prisma.
- **Storage:** Supabase Storage (Bản Free) để lưu trữ ảnh chụp màn hình các mẫu website.
- **UI Framework (FE):** Shadcn UI + Tailwind CSS v4.

---

## 2. Cấu Trúc Thư Mục & Các Trang Giao Diện (Folder Structure & Pages)

Dự án được chia thành 2 thư mục chính độc lập:

```
d:\freelancer\WebSiteCaNhan\
├── frontend/             # Dự án Next.js (Vercel)
│   ├── src/
│   │   ├── app/          # Thư mục trang (App Router)
│   │   │   ├── page.tsx  # Trang chủ (Homepage) giới thiệu chung
│   │   │   ├── work/     # Trang [Work]: Danh sách & chi tiết các mẫu website (Templates) lấy từ API Backend
│   │   │   │   └── page.tsx
│   │   │   ├── services/ # Trang [Services]: Chi tiết các dịch vụ hỗ trợ thiết kế web & báo giá các gói
│   │   │   │   └── page.tsx
│   │   │   ├── process/  # Trang [Process]: Quy trình làm việc (nhận brief -> thiết kế -> bàn giao)
│   │   │   │   └── page.tsx
│   │   │   ├── about/    # Trang [About]: Giới thiệu thông tin studio/cá nhân thiết kế
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── globals.css
│   │   ├── components/   # UI Components chung (Navbar, Footer, Floating Contact Buttons...)
│   │   └── lib/          # Thư viện tiện ích (fetch API...)
│   ├── package.json
│   ├── tailwind.config.js
│   └── tsconfig.json
│
├── backend/              # Dự án Express API (Render)
│   ├── prisma/
│   │   └── schema.prisma # Định nghĩa cấu trúc Database
│   ├── src/
│   │   ├── controllers/  # Logic điều hướng API
│   │   ├── routes/       # Endpoint /api/templates
│   │   ├── lib/          # Khởi tạo Prisma Client
│   │   └── server.ts     # Cấu hình Express server
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
└── docs/                 # Tài liệu hướng dẫn
    └── specs/
        └── 2026-07-16-website-design-service.md
```

---

## 3. Thiết Kế Cơ Sở Dữ Liệu (Prisma Schema - Trong Backend)

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Template {
  id          String   @id @default(uuid())
  title       String   // Tên mẫu website
  description String   // Mô tả chi tiết các tính năng của mẫu
  imageUrl    String   // Link ảnh mẫu web (lưu trên Supabase Storage)
  previewUrl  String?  // Link chạy thử demo
  category    String   // Phân loại: Bán hàng, Doanh nghiệp, Landing Page...
  price       Decimal  @db.Decimal(12, 2) // Giá tham khảo
  isActive    Boolean  @default(true) // Trạng thái ẩn/hiện mẫu web
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

---

## 4. Quy Trình Vận Hành & Giao Tiếp

1. **Trang Work:** Frontend gọi API `GET /api/templates` của Backend (được host trên Render) để render danh sách mẫu website. Khách hàng lọc theo danh mục hoặc từ khóa để tìm mẫu ưng ý.
2. **Trang Services:** Trình bày chi tiết các gói dịch vụ (Ví dụ: Gói Landing Page, Gói Website Doanh Nghiệp, Gói Thương Mại Điện Tử), mô tả quyền lợi của khách hàng.
3. **Trang Process:** Giải thích quy trình 4 bước (Tiếp nhận brief -> Thiết kế Demo UI -> Phát triển code -> Bàn giao & Hỗ trợ vận hành) bằng sơ đồ đẹp mắt để tăng độ tin cậy.
4. **Trang About:** Giới thiệu ngắn gọn về kinh nghiệm, phong cách thiết kế, triết lý làm việc và thông tin liên hệ chính thống.
5. **Floating Zalo/Messenger:** Hiển thị xuyên suốt toàn bộ các trang để khách hàng có thể click nhắn tin bất kỳ lúc nào.
