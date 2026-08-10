import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

function loadEnv() {
  if (process.env.DATABASE_URL) return;
  const envPath = path.resolve(__dirname, '../../.env.local');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split(/\r?\n/).forEach((line) => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*["']?([^"'\r\n]+)["']?/);
      if (match) {
        const key = match[1];
        const value = match[2];
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    });
  }
}

loadEnv();

const prisma = new PrismaClient();
const DEFAULT_ACCOUNT_ID = process.env.DEFAULT_ACCOUNT_ID || 'default-account';

async function main() {
  console.log('🌱 Bắt đầu khởi tạo dữ liệu bài viết Blog mẫu phong phú chuẩn SEO & Đa ảnh...');

  // Danh mục mẫu
  const categoriesData = [
    { name: 'Thiết Kế Web', slug: 'thiet-ke-web', description: 'Xu hướng thiết kế UI/UX và tối ưu trải nghiệm người dùng.' },
    { name: 'Tối Ưu SEO', slug: 'toi-uu-seo', description: 'Bí quyết tăng thứ hạng website trên Google và tìm kiếm.' },
    { name: 'Bán Hàng Online', slug: 'ban-hang-online', description: 'Chiến lược tăng tỷ lệ chuyển đổi và quản lý cửa hàng trực tuyến.' },
    { name: 'Công Nghệ & AI', slug: 'cong-nghe-ai', description: 'Ứng dụng trí tuệ nhân tạo và công nghệ mới vào kinh doanh.' },
  ];

  const createdCategories: Record<string, string> = {};

  for (const cat of categoriesData) {
    const category = await prisma.blogCategory.upsert({
      where: {
        accountId_slug: {
          accountId: DEFAULT_ACCOUNT_ID,
          slug: cat.slug,
        },
      },
      update: {
        name: cat.name,
        description: cat.description,
      },
      create: {
        accountId: DEFAULT_ACCOUNT_ID,
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
      },
    });
    createdCategories[cat.slug] = category.id;
    console.log(`✅ Danh mục: ${cat.name} (${category.id})`);
  }

  const now = Date.now();
  const DAY = 24 * 60 * 60 * 1000;

  const samplePosts = [
    {
      title: 'Tăng Tốc Độ Website Lên 99+ Điểm PageSpeed Insights Với Next.js & Supabase',
      slug: 'tang-toc-do-website-99-diem-pagespeed-insights-nextjs',
      categorySlug: 'cong-nghe-ai',
      summary: 'Bí quyết tối ưu hóa hình ảnh WebP/AVIF, lazy loading, caching Redis và rendering SSR/ISR với Next.js App Router cho hiệu năng đỉnh cao.',
      content: `
        <h2>1. Sử Dụng Định Dạng Ảnh Hiện Đại WebP & AVIF</h2>
        <p>Hình ảnh thường chiếm đến 70% dung lượng trang web. Việc nén và tối ưu hóa ảnh thông qua thẻ Next.js Image component giúp giảm dung lượng tệp tin đáng kể.</p>
        <p><img src="/blogs/blog-2.png" alt="Báo cáo phân tích hiệu năng website" style="border-radius: 12px; margin: 16px 0;" /></p>
        <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 16px; margin: 20px 0; border-radius: 8px;">
          <strong>🚀 Mẹo tối ưu:</strong> Sử dụng định dạng ảnh WebP để tăng tốc độ tải trang lên đến 40% so với JPG truyền thống.
        </div>
        <h2>2. Cơ Chế Incremental Static Regeneration (ISR)</h2>
        <p>ISR cho phép các trang được tĩnh hóa sẵn (static generation) đồng thời tự động làm tươi nội dung ở phía background mà không làm chậm tốc độ phản hồi trang web.</p>
        <p><img src="/blogs/blog-4.png" alt="Hệ thống dữ liệu lưu trữ thời gian thực" style="border-radius: 12px; margin: 16px 0;" /></p>
        <h2>3. Giảm Thiểu Mã JavaScript Nhàn Rỗi (Code Splitting)</h2>
        <p>Tận dụng Dynamic Import trong React để chỉ tải các component nặng khi người dùng cuộn tới vị trí tương ứng.</p>
      `,
      metaTitle: 'Tăng Tốc Độ Website Lên 99+ Điểm PageSpeed Insights — Kabo Agency',
      metaDescription: 'Bí quyết tối ưu hóa hình ảnh WebP/AVIF, lazy loading, caching Redis và rendering SSR/ISR.',
      coverImage: '/blogs/blog-2.png',
      contentImages: [
        '/blogs/blog-2.png',
        '/blogs/blog-4.png',
        '/blogs/blog-1.png',
      ],
      author: 'KABO Tech Team',
      tags: ['NextJS', 'Performance', 'PageSpeed', 'React19'],
      isPublished: true,
      publishedAt: new Date('2026-07-24T08:00:00Z'),
      categoryId: 'cat-4',
    },
    {
      id: 'post-5',
      title: 'Tối Ưu Trải Nghiệm Mobile-First: Vì Sao Lại Quyết Định 80% Doanh Số?',
      slug: 'toi-uu-trai-nghiem-mobile-first-quyet-dinh-doanh-so',
      summary: 'Tại sao việc thiết kế chuẩn trên thiết bị di động không chỉ giúp bạn giữ chân khách hàng mà còn là yếu tố quan trọng hàng đầu trong thuật toán xếp hạng của Google.',
      content: `
        <h2>1. Thói Quen Lướt Web Trên Smartphone Đã Chiếm Ưu Thế</h2>
        <p>Hơn 75% lưu lượng truy cập internet tại Việt Nam đến từ các thiết bị di động. Nếu website của bạn bị vỡ khung hoặc chữ quá nhỏ trên di động, bạn đang lãng phí phần lớn chi phí quảng cáo.</p>
        <p><img src="/blogs/blog-3.png" alt="Giao diện di động mượt mà" style="border-radius: 12px; margin: 16px 0;" /></p>
        <h2>2. Google Mobile-First Indexing</h2>
        <p>Google hiện áp dụng lập chỉ mục ưu tiên di động làm tiêu chuẩn mặc định. Phiên bản di động của bạn chính là thước đo để Google xếp hạng từ khóa.</p>
        <h2>3. Thiết Kế Thanh Điều Hướng Đáy (Bottom Navigation) Thuận Tiện Ngón Tay Cái</h2>
        <p>Bố trí nút mua hàng và gọi điện ở góc dưới màn hình giúp người dùng thao tác bằng một tay dễ dàng hơn bao giờ hết.</p>
      `,
      metaTitle: 'Tối Ưu Trải Nghiệm Mobile-First Quyết Định Doanh Số — Kabo Agency',
      metaDescription: 'Tại sao việc thiết kế chuẩn trên thiết bị di động quyết định 80% doanh số bán hàng.',
      coverImage: '/blogs/blog-3.png',
      contentImages: [
        '/blogs/blog-3.png',
        '/blogs/blog-1.png',
      ],
      author: 'KABO Design Team',
      tags: ['MobileFirst', 'Responsive', 'UXMobile', 'ThietKeWeb'],
      isPublished: true,
      publishedAt: new Date('2026-07-20T10:30:00Z'),
      categoryId: 'cat-1',
    },
    {
      id: 'post-4',
      title: 'Ứng Dụng AI Trong Thiết Kế Web & Tự Động Hóa Content Bán Hàng',
      slug: 'ung-dung-ai-trong-thiet-ke-web-va-content-marketing',
      summary: 'Tìm hiểu cách các công cụ AI đột phá giúp doanh nghiệp tự động tạo bố cục website, viết bài blog chuẩn SEO và hỗ trợ chăm sóc khách hàng tự động.',
      content: `
        <h2>1. AI Thiết Kế Giao Diện Tự Động Từ Ý Tưởng Text</h2>
        <p>Công nghệ trí tuệ nhân tạo hiện nay cho phép bạn mô tả ý tưởng trang web bằng ngôn ngữ tự nhiên và tạo ra bản mẫu thiết kế chỉ trong vài giây.</p>
        <p><img src="/blogs/blog-4.png" alt="Mô phỏng trí tuệ nhân tạo và thiết kế" style="border-radius: 12px; margin: 16px 0;" /></p>
        <h2>2. Tự Động Hóa Viết Bài SEO & Lên Lịch Đăng Bài</h2>
        <p>Kết hợp AI API với hệ thống quản trị website giúp doanh nghiệp liên tục duy trì các bài viết chất lượng cao, giữ cho trang web luôn cập nhật tươi mới trong mắt Google.</p>
        <h2>3. Cá Nhân Hóa Trải Nghiệm Khách Hàng Theo Thời Gian Thực</h2>
        <p>AI có thể phân tích hành vi của người truy cập để đề xuất chính xác các dịch vụ hoặc sản phẩm mà khách hàng đang thực sự quan tâm.</p>
      `,
      metaTitle: 'Ứng Dụng AI Trong Thiết Kế Web & Content Marketing — Kabo Agency',
      metaDescription: 'Cách công cụ AI đột phá giúp doanh nghiệp tự động hóa viết bài SEO và thiết kế web.',
      coverImage: '/blogs/blog-4.png',
      contentImages: [
        '/blogs/blog-4.png',
        '/blogs/blog-2.png',
      ],
      author: 'Claude AI Specialist',
      tags: ['AI', 'ChatGPT', 'TựĐộngHóa', 'TechTrend'],
      isPublished: true,
      publishedAt: new Date('2026-07-15T14:00:00Z'),
      categoryId: 'cat-4',
    },
    {
      id: 'post-3',
      title: 'Bí Quyết Xây Dựng Trang Bán Hàng Online Tỷ Lệ Chuyển Đổi Cao (High Conversion Rate)',
      slug: 'bi-quyet-xay-dung-trang-ban-hang-online-chuyen-doi-cao',
      summary: 'Cách bố trí nút kêu gọi hành động (CTA), tạo niềm tin bằng Social Proof và tối ưu quy trình thanh toán nhanh chóng trên website bán hàng.',
      content: `
        <h2>1. Nút Gọi Hành Động (CTA) Nổi Bật Và Đúng Vị Trí</h2>
        <p>Nút "MUA NGAY" hoặc "TƯ VẤN BÁO GIÁ" nên sử dụng màu tương phản nổi bật và luôn nằm trong tầm mắt người dùng (Sticky Bar hoặc Hero Section).</p>
        <p><img src="/blogs/blog-5.png" alt="Thanh toán trực tuyến dễ dàng" style="border-radius: 12px; margin: 16px 0;" /></p>
        <h2>2. Sử Dụng Đánh Giá Khách Hàng (Social Proof) Thực Tế</h2>
        <p>Hơn 85% người tiêu dùng trực tuyến đưa ra quyết định mua hàng sau khi đọc các phản hồi, hình ảnh chụp thực tế từ các khách hàng trước đó. Hãy tích hợp khối Testimonial và đánh giá sao ngay trên trang.</p>
        <h2>3. Quy Trình Thanh Toán Tối Giản 1 Bước (One-Step Checkout)</h2>
        <p>Bỏ bớt các bước điền thông tin không cần thiết. Cho phép người dùng thanh toán qua quét mã VietQR, ZaloPay hoặc COD một cách tiện lợi nhất.</p>
      `,
      metaTitle: 'Bí Quyết Trang Bán Hàng Tỷ Lệ Chuyển Đổi Cao — Kabo Agency',
      metaDescription: 'Bố trí CTA, tạo niềm tin bằng Social Proof và tối ưu quy trình thanh toán nhanh.',
      coverImage: '/blogs/blog-5.png',
      contentImages: [
        '/blogs/blog-5.png',
        '/blogs/blog-1.png',
      ],
      author: 'KABO Growth Team',
      tags: ['BánHàngOnline', 'LandingPage', 'ChuyểnĐổi', 'Ecommerce'],
      isPublished: true,
      publishedAt: new Date('2026-07-08T09:15:00Z'),
      categoryId: 'cat-3',
    },
    {
      id: 'post-2',
      title: 'Hướng Dẫn Tối Ưu SEO On-Page Chuẩn Google Dành Cho Doanh Nghiệp Mới',
      slug: 'huong-dan-toi-uu-seo-onpage-chuan-google',
      summary: 'Bí quyết tối ưu cấu trúc thẻ Meta, Heading, Schema.org và tốc độ trải nghiệm người dùng Core Web Vitals giúp website tăng trưởng traffic tự nhiên bền vững.',
      content: `
        <h2>1. Thẻ Meta Title & Meta Description Thu Hút Tỷ Lệ Click (CTR)</h2>
        <p>Tiêu đề bài viết cần chứa từ khóa chính ở vị trí đầu tiên, độ dài từ 50-60 ký tự. Thẻ Meta Description cần cô đọng từ 140-160 ký tự kèm lời kêu gọi hành động (CTA) rõ ràng.</p>
        <p><img src="/blogs/blog-6.png" alt="Chiến lược Marketing SEO Google" style="border-radius: 12px; margin: 16px 0;" /></p>
        <h2>2. Cấu Trúc Thẻ Heading H1, H2, H3 Rõ Ràng</h2>
        <p>Một bài viết chuẩn SEO cần có duy nhất 1 thẻ H1 (Tiêu đề chính). Các ý lớn sử dụng H2 và các phân tích chi tiết nằm trong thẻ H3. Điều này giúp bot của Google hiểu rõ ngữ cảnh bài viết.</p>
        <h2>3. Tích Hợp Schema.org Structured Data</h2>
        <p>Bằng cách bổ sung mã JSON-LD Schema (như BlogPosting, Product, Organization), trang web của bạn sẽ hiển thị kết quả giàu thông tin (Rich Snippets) trên trang tìm kiếm Google.</p>
      `,
      metaTitle: 'Hướng Dẫn Tối Ưu SEO On-Page Chuẩn Google — Kabo Agency',
      metaDescription: 'Tối ưu Meta, Heading, Schema.org và tốc độ trải nghiệm người dùng Core Web Vitals.',
      coverImage: '/blogs/blog-6.png',
      contentImages: [
        '/blogs/blog-6.png',
        '/blogs/blog-2.png',
      ],
      author: 'KABO SEO Specialist',
      tags: ['SEO', 'GoogleSEO', 'SEOOnPage', 'CoreWebVitals'],
      isPublished: true,
      publishedAt: new Date('2026-06-30T11:00:00Z'),
      categoryId: 'cat-2',
    },
    {
      id: 'post-1',
      title: 'Top 7 Xu Hướng Thiết Kế Website Độc Bản Năm 2026',
      slug: 'top-7-xu-huong-thiet-ke-website-2026',
      categorySlug: 'thiet-ke-web',
      summary: 'Khám phá các xu hướng thiết kế web đột phá giúp doanh nghiệp thu hút khách hàng ngay từ cái nhìn đầu tiên với giao diện ấn tượng và trải nghiệm siêu mượt.',
      content: `
        <h2>1. Giao Diện Tối Giản Nhưng Sang Trọng (Minimalist & Premium)</h2>
        <p>Năm 2026 đánh dấu sự lên ngôi của phong cách thiết kế tối giản nhưng giàu tính tương tác. Khách hàng không còn hào hứng với những trang web rối mắt chứa quá nhiều banner tĩnh. Thay vào đó, khoảng trắng (White space) được khai thác triệt để nhằm làm nổi bật sản phẩm chính.</p>
        <p><img src="/blogs/blog-1.png" alt="Bàn làm việc thiết kế giao diện" style="border-radius: 12px; margin: 16px 0;" /></p>

        <h2>2. Dark Mode Động Tự Điều Chỉnh Theo Hệ Thống</h2>
        <p>Tính năng chuyển đổi chế độ Sáng/Tối (Light/Dark mode) mượt mà dựa trên cấu hình thiết bị của người dùng trở thành tiêu chuẩn bắt buộc cho mọi website hiện đại.</p>

        <h2>3. Micro-Animations & View Transitions</h2>
        <p>Các hiệu ứng chuyển trang mượt mà kết hợp với các hiệu ứng di chuột tinh tế giúp website hoạt động sinh động như ứng dụng cao cấp.</p>
      `,
      metaTitle: 'Top 7 Xu Hướng Thiết Kế Website Độc Bản 2026 — Kabo Agency',
      metaDescription: 'Khám phá các xu hướng thiết kế web đột phá giúp doanh nghiệp thu hút khách hàng.',
      coverImage: '/blogs/blog-1.png',
      contentImages: [
        '/blogs/blog-1.png',
        '/blogs/blog-3.png',
      ],
      author: 'KABO Creative Director',
      tags: ['ThiếtKếWeb', 'UIUX', 'XuHướng2026', 'KaboAgency'],
      isPublished: true,
      publishedAt: new Date('2026-06-25T15:00:00Z'),
    },
  ];

  for (const postData of samplePosts) {
    const slug = postData.categorySlug || 'thiet-ke-web';
    const categoryId = createdCategories[slug];

    const post = await prisma.blogPost.upsert({
      where: {
        accountId_slug: {
          accountId: DEFAULT_ACCOUNT_ID,
          slug: postData.slug,
        },
      },
      update: {
        title: postData.title,
        summary: postData.summary,
        content: postData.content,
        metaTitle: `${postData.title} — Kabo Agency`,
        metaDescription: postData.summary,
        coverImage: postData.coverImage,
        contentImages: postData.contentImages,
        author: postData.author,
        tags: postData.tags,
        isPublished: true,
        publishedAt: postData.publishedAt,
        categoryId,
      },
      create: {
        accountId: DEFAULT_ACCOUNT_ID,
        title: postData.title,
        slug: postData.slug,
        summary: postData.summary,
        content: postData.content,
        metaTitle: `${postData.title} — Kabo Agency`,
        metaDescription: postData.summary,
        coverImage: postData.coverImage,
        contentImages: postData.contentImages,
        author: postData.author,
        tags: postData.tags,
        isPublished: true,
        publishedAt: postData.publishedAt,
        categoryId,
      },
    });

    console.log(`✅ Khởi tạo bài viết thành công: ${post.title} (${post.slug})`);
  }

  console.log('🎉 Hoàn tất nạp dữ liệu Blog bài viết mẫu đa ảnh thành công!');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi seed blog:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
