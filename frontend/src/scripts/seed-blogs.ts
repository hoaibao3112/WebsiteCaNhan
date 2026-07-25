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
  console.log('🌱 Bắt đầu khởi tạo dữ liệu bài viết Blog mẫu chuẩn SEO...');

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

  // Danh sách bài viết mẫu phong phú với mốc thời gian rõ ràng
  const now = Date.now();
  const DAY = 24 * 60 * 60 * 1000;

  const samplePosts = [
    {
      title: 'Top 7 Xu Hướng Thiết Kế Website Độc Bản Năm 2026',
      slug: 'top-7-xu-huong-thiet-ke-website-2026',
      categorySlug: 'thiet-ke-web',
      summary: 'Khám phá các xu hướng thiết kế web đột phá giúp doanh nghiệp thu hút khách hàng ngay từ cái nhìn đầu tiên với giao diện ấn tượng và trải nghiệm siêu mượt.',
      featuredImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
      tags: ['ThiếtKếWeb', 'UIUX', 'XuHướng2026', 'KaboAgency'],
      publishedAt: new Date(now - 30 * DAY),
      content: `
        <h2>1. Giao Diện Tối Giản Nhưng Sang Trọng (Minimalist & Premium)</h2>
        <p>Năm 2026 đánh dấu sự lên ngôi của phong cách thiết kế tối giản nhưng giàu tính tương tác. Khách hàng không còn hào hứng với những trang web rối mắt chứa quá nhiều banner tĩnh. Thay vào đó, khoảng trắng (White space) được khai thác triệt để nhằm làm nổi bật sản phẩm chính.</p>
        
        <h2>2. Dark Mode Động Tự Điều Chỉnh Theo Hệ Thống</h2>
        <p>Tính năng chuyển đổi chế độ Sáng/Tối (Light/Dark mode) mượt mà dựa trên cấu hình thiết bị của người dùng trở thành tiêu chuẩn bắt buộc cho mọi website hiện đại. Việc này không chỉ bảo vệ mắt người dùng mà còn giúp nâng cao tỉ lệ giữ chân (Retention rate).</p>

        <h2>3. Micro-Animations & View Transitions</h2>
        <p>Các hiệu ứng chuyển trang mượt mà không load lại trang (Single Page Experience) kết hợp với các hiệu ứng di chuột (hover effects) tinh tế giúp website hoạt động sinh động như một ứng dụng di động native.</p>

        <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 16px; margin: 20px 0; border-radius: 8px;">
          <strong>💡 Mẹo dành cho doanh nghiệp:</strong> Hãy ưu tiên tốc độ tải trang dưới 1.5 giây để đảm bảo trải nghiệm khách hàng tối ưu nhất!
        </div>

        <h2>4. Tích Hợp AI Chatbot Trực Tiếp Vào Giao Diện</h2>
        <p>Không chỉ là nút chat Zalo hay Facebook Messenger thông thường, các dòng website cao cấp hiện nay đều tích hợp các trợ lý AI thông minh có khả năng tự tư vấn và chốt đơn ngay lập tức 24/7.</p>
      `,
    },
    {
      title: 'Hướng Dẫn Tối Ưu SEO On-Page Chuẩn Google Dành Cho Doanh Nghiệp Mới',
      slug: 'huong-dan-toi-uu-seo-onpage-chuan-google',
      categorySlug: 'toi-uu-seo',
      summary: 'Bí quyết tối ưu cấu trúc thẻ Meta, Heading, Schema.org và tốc độ trải nghiệm người dùng Core Web Vitals giúp website tăng trưởng traffic tự nhiên bền vững.',
      featuredImage: 'https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?w=1200&q=80',
      tags: ['SEO', 'GoogleSEO', 'SEOOnPage', 'CoreWebVitals'],
      publishedAt: new Date(now - 21 * DAY),
      content: `
        <h2>1. Thẻ Meta Title & Meta Description Thu Hút Tỷ Lệ Click (CTR)</h2>
        <p>Tiêu đề bài viết cần chứa từ khóa chính ở vị trí đầu tiên, độ dài từ 50-60 ký tự. Thẻ Meta Description cần cô đọng từ 140-160 ký tự kèm lời kêu gọi hành động (CTA) rõ ràng.</p>

        <h2>2. Cấu Trúc Thẻ Heading H1, H2, H3 Rõ Ràng</h2>
        <p>Một bài viết chuẩn SEO cần có duy nhất 1 thẻ H1 (Tiêu đề chính). Các ý lớn sử dụng H2 và các phân tích chi tiết nằm trong thẻ H3. Điều này giúp bot của Google hiểu rõ ngữ cảnh bài viết.</p>

        <h2>3. Tích Hợp Schema.org Structured Data</h2>
        <p>Bằng cách bổ sung mã JSON-LD Schema (như BlogPosting, Product, Organization), trang web của bạn sẽ hiển thị kết quả giàu thông tin (Rich Snippets) trên trang tìm kiếm Google.</p>

        <h2>4. Tối Ưu Tốc Độ Tải Trang Với Core Web Vitals</h2>
        <p>Chỉ số LCP (Largest Contentful Paint) và CLS (Cumulative Layout Shift) đóng vai trò quyết định trong việc Google đánh giá thứ hạng bài viết của bạn.</p>
      `,
    },
    {
      title: 'Bí Quyết Xây Dựng Trang Bán Hàng Online Tỷ Lệ Chuyển Đổi Cao (High Conversion Rate)',
      slug: 'bi-quyet-xay-dung-trang-ban-hang-online-chuyen-doi-cao',
      categorySlug: 'ban-hang-online',
      summary: 'Cách bố trí nút kêu gọi hành động (CTA), tạo niềm tin bằng Social Proof và tối ưu quy trình thanh toán nhanh chóng trên website bán hàng.',
      featuredImage: 'https://images.unsplash.com/photo-1556742049-0a679149204c?w=1200&q=80',
      tags: ['BánHàngOnline', 'LandingPage', 'ChuyểnĐổi', 'Ecommerce'],
      publishedAt: new Date(now - 14 * DAY),
      content: `
        <h2>1. Nút Gọi Hành Động (CTA) Nổi Bật Và Đúng Vị Trí</h2>
        <p>Nút "MUA NGAY" hoặc "TƯ VẤN BÁO GIÁ" nên sử dụng màu tương phản nổi bật và luôn nằm trong tầm mắt người dùng (Sticky Bar hoặc Hero Section).</p>

        <h2>2. Sử Dụng Đánh Giá Khách Hàng (Social Proof) Thực Tế</h2>
        <p>Hơn 85% người tiêu dùng trực tuyến đưa ra quyết định mua hàng sau khi đọc các phản hồi, hình ảnh chụp thực tế từ các khách hàng trước đó. Hãy tích hợp khối Testimonial và đánh giá sao ngay trên trang.</p>

        <h2>3. Quy Trình Thanh Toán Tối Giản 1 Bước (One-Step Checkout)</h2>
        <p>Bỏ bớt các bước điền thông tin không cần thiết. Cho phép người dùng thanh toán qua quét mã VietQR, ZaloPay hoặc COD một cách tiện lợi nhất.</p>
      `,
    },
    {
      title: 'Ứng Dụng AI Trong Thiết Kế Web & Tự Động Hóa Content Bán Hàng',
      slug: 'ung-dung-ai-trong-thiet-ke-web-va-content-marketing',
      categorySlug: 'cong-nghe-ai',
      summary: 'Tìm hiểu cách các công cụ AI đột phá giúp doanh nghiệp tự động tạo bố cục website, viết bài blog chuẩn SEO và hỗ trợ chăm sóc khách hàng tự động.',
      featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=1200&q=80',
      tags: ['AI', 'ChatGPT', 'TựĐộngHóa', 'TechTrend'],
      publishedAt: new Date(now - 7 * DAY),
      content: `
        <h2>1. AI Thiết Kế Giao Diện Tự Động Từ Ý Tưởng Text</h2>
        <p>Công nghệ trí tuệ nhân tạo hiện nay cho phép bạn mô tả ý tưởng trang web bằng ngôn ngữ tự nhiên và tạo ra bản mẫu thiết kế chỉ trong vài giây.</p>

        <h2>2. Tự Động Hóa Viết Bài SEO & Lên Lịch Đăng Bài</h2>
        <p>Kết hợp AI API với hệ thống quản trị website giúp doanh nghiệp liên tục duy trì các bài viết chất lượng cao, giữ cho trang web luôn cập nhật tươi mới trong mắt Google.</p>

        <h2>3. Cá Nhân Hóa Trải Nghiệm Khách Hàng Theo Thời Gian Thực</h2>
        <p>AI có thể phân tích hành vi của người truy cập để đề xuất chính xác các dịch vụ hoặc sản phẩm mà khách hàng đang thực sự quan tâm.</p>
      `,
    },
    {
      title: 'Tối Ưu Trải Nghiệm Mobile-First: Vì Sao Lại Quyết Định 80% Doanh Số?',
      slug: 'toi-uu-trai-nghiem-mobile-first-quyet-dinh-doanh-so',
      categorySlug: 'thiet-ke-web',
      summary: 'Tại sao việc thiết kế chuẩn trên thiết bị di động không chỉ giúp bạn giữ chân khách hàng mà còn là yếu tố quan trọng hàng đầu trong thuật toán xếp hạng của Google.',
      featuredImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
      tags: ['MobileFirst', 'Responsive', 'UXMobile', 'ThietKeWeb'],
      publishedAt: new Date(now - 3 * DAY),
      content: `
        <h2>1. Thói Quân Lướt Web Trên Smartphone Đã Chiếm Ưu Thế</h2>
        <p>Hơn 75% lưu lượng truy cập internet tại Việt Nam đến từ các thiết bị di động. Nếu website của bạn bị vỡ khung hoặc chữ quá nhỏ trên di động, bạn đang lãng phí phần lớn chi phí quảng cáo.</p>

        <h2>2. Google Mobile-First Indexing</h2>
        <p>Google hiện áp dụng lập chỉ mục ưu tiên di động làm tiêu chuẩn mặc định. Phiên bản di động của bạn chính là thước đo để Google xếp hạng từ khóa.</p>
      `,
    },
    {
      title: 'Tăng Tốc Độ Website Lên 99+ Điểm PageSpeed Insights Với Next.js & Supabase',
      slug: 'tang-toc-do-website-99-diem-pagespeed-insights-nextjs',
      categorySlug: 'cong-nghe-ai',
      summary: 'Bí quyết tối ưu hóa hình ảnh WebP/AVIF, lazy loading, caching Redis và rendering SSR/ISR với Next.js App Router cho hiệu năng đỉnh cao.',
      featuredImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
      tags: ['NextJS', 'Performance', 'PageSpeed', 'React19'],
      publishedAt: new Date(now - 1 * DAY),
      content: `
        <h2>1. Sử Dụng Định Dạng Ảnh Hiện Đại WebP & AVIF</h2>
        <p>Hình ảnh thường chiếm đến 70% dung lượng trang web. Việc nén và tối ưu hóa ảnh thông qua thẻ Next.js Image component giúp giảm dung lượng tệp tệp tin đáng kể.</p>

        <h2>2. Cơ Chế Incremental Static Regeneration (ISR)</h2>
        <p>ISR cho phép các trang được tĩnh hóa sẵn (static generation) đồng thời tự động làm tươi nội dung ở phía background mà không làm chậm tốc độ phản hồi trang web.</p>
      `,
    },
  ];

  for (const postData of samplePosts) {
    const categoryId = createdCategories[postData.categorySlug];

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
        featuredImage: postData.featuredImage,
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
        featuredImage: postData.featuredImage,
        tags: postData.tags,
        isPublished: true,
        publishedAt: postData.publishedAt,
        categoryId,
      },
    });

    console.log(`✅ Khởi tạo bài viết thành công: ${post.title} (${post.slug})`);
  }

  console.log('🎉 Hoàn tất nạp dữ liệu Blog bài viết mẫu!');
}

main()
  .catch((e) => {
    console.error('❌ Lỗi seed blog:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
