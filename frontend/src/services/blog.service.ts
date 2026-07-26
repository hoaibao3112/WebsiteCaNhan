import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export const createBlogPostSchema = z.object({
  title: z.string().min(3, 'Tiêu đề phải có ít nhất 3 ký tự'),
  slug: z.string().optional(),
  summary: z.string().optional(),
  content: z.string().min(10, 'Nội dung bài viết phải có ít nhất 10 ký tự'),
  categoryName: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  coverImage: z.string().url('URL hình ảnh bìa không hợp lệ').optional().or(z.literal('')),
  featuredImage: z.string().url('URL hình ảnh không hợp lệ').optional().or(z.literal('')), // backward compatibility
  contentImages: z.array(z.string()).optional().default([]),
  author: z.string().optional().default('KABO Editorial'),
  tags: z.array(z.string()).optional().default([]),
  isPublished: z.boolean().default(true),
  accountId: z.string().optional(),
});

export type CreateBlogPostInput = z.infer<typeof createBlogPostSchema>;

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

const FALLBACK_CATEGORIES = [
  { id: 'cat-1', accountId: 'default-account', name: 'Thiết Kế Web', slug: 'thiet-ke-web', description: 'Xu hướng thiết kế UI/UX và tối ưu trải nghiệm người dùng.', createdAt: new Date(), updatedAt: new Date(), _count: { posts: 2 } },
  { id: 'cat-2', accountId: 'default-account', name: 'Tối Ưu SEO', slug: 'toi-uu-seo', description: 'Bí quyết tăng thứ hạng website trên Google và tìm kiếm.', createdAt: new Date(), updatedAt: new Date(), _count: { posts: 1 } },
  { id: 'cat-3', accountId: 'default-account', name: 'Bán Hàng Online', slug: 'ban-hang-online', description: 'Chiến lược tăng tỷ lệ chuyển đổi và quản lý cửa hàng trực tuyến.', createdAt: new Date(), updatedAt: new Date(), _count: { posts: 1 } },
  { id: 'cat-4', accountId: 'default-account', name: 'Công Nghệ & AI', slug: 'cong-nghe-ai', description: 'Ứng dụng trí tuệ nhân tạo và công nghệ mới vào kinh doanh.', createdAt: new Date(), updatedAt: new Date(), _count: { posts: 2 } },
];

const FALLBACK_POSTS = [
  {
    id: 'post-6',
    accountId: 'default-account',
    title: 'Tăng Tốc Độ Website Lên 99+ Điểm PageSpeed Insights Với Next.js & Supabase',
    slug: 'tang-toc-do-website-99-diem-pagespeed-insights-nextjs',
    summary: 'Bí quyết tối ưu hóa hình ảnh WebP/AVIF, lazy loading, caching Redis và rendering SSR/ISR với Next.js App Router cho hiệu năng đỉnh cao.',
    content: `
      <h2>1. Sử Dụng Định Dạng Ảnh Hiện Đại WebP & AVIF</h2>
      <p>Hình ảnh thường chiếm đến 70% dung lượng trang web. Việc nén và tối ưu hóa ảnh thông qua thẻ Next.js Image component giúp giảm dung lượng tệp tin đáng kể.</p>
      <p><img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&q=80" alt="Báo cáo phân tích hiệu năng website" style="border-radius: 12px; margin: 16px 0;" /></p>
      <div style="background-color: #f0fdf4; border-left: 4px solid #10b981; padding: 16px; margin: 20px 0; border-radius: 8px;">
        <strong>🚀 Mẹo tối ưu:</strong> Sử dụng định dạng ảnh WebP để tăng tốc độ tải trang lên đến 40% so với JPG truyền thống.
      </div>
      <h2>2. Cơ Chế Incremental Static Regeneration (ISR)</h2>
      <p>ISR cho phép các trang được tĩnh hóa sẵn (static generation) đồng thời tự động làm tươi nội dung ở phía background mà không làm chậm tốc độ phản hồi trang web.</p>
      <p><img src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1000&q=80" alt="Hệ thống dữ liệu lưu trữ thời gian thực" style="border-radius: 12px; margin: 16px 0;" /></p>
      <h2>3. Giảm Thiểu Mã JavaScript Nhàn Rỗi (Code Splitting)</h2>
      <p>Tận dụng Dynamic Import trong React để chỉ tải các component nặng khi người dùng cuộn tới vị trí tương ứng.</p>
    `,
    metaTitle: 'Tăng Tốc Độ Website Lên 99+ Điểm PageSpeed Insights — Kabo Agency',
    metaDescription: 'Bí quyết tối ưu hóa hình ảnh WebP/AVIF, lazy loading, caching Redis và rendering SSR/ISR.',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    contentImages: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&q=80',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1000&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&q=80',
    ],
    author: 'KABO Tech Team',
    tags: ['NextJS', 'Performance', 'PageSpeed', 'React19'],
    isPublished: true,
    publishedAt: new Date('2026-07-24T08:00:00Z'),
    createdAt: new Date('2026-07-24T08:00:00Z'),
    updatedAt: new Date('2026-07-24T08:00:00Z'),
    categoryId: 'cat-4',
    category: { id: 'cat-4', accountId: 'default-account', name: 'Công Nghệ & AI', slug: 'cong-nghe-ai', description: '', createdAt: new Date(), updatedAt: new Date() },
  },
  {
    id: 'post-5',
    accountId: 'default-account',
    title: 'Tối Ưu Trải Nghiệm Mobile-First: Vì Sao Lại Quyết Định 80% Doanh Số?',
    slug: 'toi-uu-trai-nghiem-mobile-first-quyet-dinh-doanh-so',
    summary: 'Tại sao việc thiết kế chuẩn trên thiết bị di động không chỉ giúp bạn giữ chân khách hàng mà còn là yếu tố quan trọng hàng đầu trong thuật toán xếp hạng của Google.',
    content: `
      <h2>1. Thói Quen Lướt Web Trên Smartphone Đã Chiếm Ưu Thế</h2>
      <p>Hơn 75% lưu lượng truy cập internet tại Việt Nam đến từ các thiết bị di động. Nếu website của bạn bị vỡ khung hoặc chữ quá nhỏ trên di động, bạn đang lãng phí phần lớn chi phí quảng cáo.</p>
      <p><img src="https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=1000&q=80" alt="Giao diện di động mượt mà" style="border-radius: 12px; margin: 16px 0;" /></p>
      <h2>2. Google Mobile-First Indexing</h2>
      <p>Google hiện áp dụng lập chỉ mục ưu tiên di động làm tiêu chuẩn mặc định. Phiên bản di động của bạn chính là thước đo để Google xếp hạng từ khóa.</p>
      <h2>3. Thiết Kế Thanh Điều Hướng Đáy (Bottom Navigation) Thuận Tiện Ngón Tay Cái</h2>
      <p>Bố trí nút mua hàng và gọi điện ở góc dưới màn hình giúp người dùng thao tác bằng một tay dễ dàng hơn bao giờ hết.</p>
    `,
    metaTitle: 'Tối Ưu Trải Nghiệm Mobile-First Quyết Định Doanh Số — Kabo Agency',
    metaDescription: 'Tại sao việc thiết kế chuẩn trên thiết bị di động quyết định 80% doanh số bán hàng.',
    coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
    contentImages: [
      'https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=1000&q=80',
      'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=1000&q=80',
    ],
    author: 'KABO Design Team',
    tags: ['MobileFirst', 'Responsive', 'UXMobile', 'ThietKeWeb'],
    isPublished: true,
    publishedAt: new Date('2026-07-20T10:30:00Z'),
    createdAt: new Date('2026-07-20T10:30:00Z'),
    updatedAt: new Date('2026-07-20T10:30:00Z'),
    categoryId: 'cat-1',
    category: { id: 'cat-1', accountId: 'default-account', name: 'Thiết Kế Web', slug: 'thiet-ke-web', description: '', createdAt: new Date(), updatedAt: new Date() },
  },
  {
    id: 'post-4',
    accountId: 'default-account',
    title: 'Ứng Dụng AI Trong Thiết Kế Web & Tự Động Hóa Content Bán Hàng',
    slug: 'ung-dung-ai-trong-thiet-ke-web-va-content-marketing',
    summary: 'Tìm hiểu cách các công cụ AI đột phá giúp doanh nghiệp tự động tạo bố cục website, viết bài blog chuẩn SEO và hỗ trợ chăm sóc khách hàng tự động.',
    content: `
      <h2>1. AI Thiết Kế Giao Diện Tự Động Từ Ý Tưởng Text</h2>
      <p>Công nghệ trí tuệ nhân tạo hiện nay cho phép bạn mô tả ý tưởng trang web bằng ngôn ngữ tự nhiên và tạo ra bản mẫu thiết kế chỉ trong vài giây.</p>
      <p><img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&q=80" alt="Mô phỏng trí tuệ nhân tạo và thiết kế" style="border-radius: 12px; margin: 16px 0;" /></p>
      <h2>2. Tự Động Hóa Viết Bài SEO & Lên Lịch Đăng Bài</h2>
      <p>Kết hợp AI API với hệ thống quản trị website giúp doanh nghiệp liên tục duy trì các bài viết chất lượng cao, giữ cho trang web luôn cập nhật tươi mới trong mắt Google.</p>
      <h2>3. Cá Nhân Hóa Trải Nghiệm Khách Hàng Theo Thời Gian Thực</h2>
      <p>AI có thể phân tích hành vi của người truy cập để đề xuất chính xác các dịch vụ hoặc sản phẩm mà khách hàng đang thực sự quan tâm.</p>
    `,
    metaTitle: 'Ứng Dụng AI Trong Thiết Kế Web & Content Marketing — Kabo Agency',
    metaDescription: 'Cách công cụ AI đột phá giúp doanh nghiệp tự động hóa viết bài SEO và thiết kế web.',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=1200&q=80',
    contentImages: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&q=80',
      'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1000&q=80',
    ],
    author: 'Claude AI Specialist',
    tags: ['AI', 'ChatGPT', 'TựĐộngHóa', 'TechTrend'],
    isPublished: true,
    publishedAt: new Date('2026-07-15T14:00:00Z'),
    createdAt: new Date('2026-07-15T14:00:00Z'),
    updatedAt: new Date('2026-07-15T14:00:00Z'),
    categoryId: 'cat-4',
    category: { id: 'cat-4', accountId: 'default-account', name: 'Công Nghệ & AI', slug: 'cong-nghe-ai', description: '', createdAt: new Date(), updatedAt: new Date() },
  },
  {
    id: 'post-3',
    accountId: 'default-account',
    title: 'Bí Quyết Xây Dựng Trang Bán Hàng Online Tỷ Lệ Chuyển Đổi Cao (High Conversion Rate)',
    slug: 'bi-quyet-xay-dung-trang-ban-hang-online-chuyen-doi-cao',
    summary: 'Cách bố trí nút kêu gọi hành động (CTA), tạo niềm tin bằng Social Proof và tối ưu quy trình thanh toán nhanh chóng trên website bán hàng.',
    content: `
      <h2>1. Nút Gọi Hành Động (CTA) Nổi Bật Và Đúng Vị Trí</h2>
      <p>Nút "MUA NGAY" hoặc "TƯ VẤN BÁO GIÁ" nên sử dụng màu tương phản nổi bật và luôn nằm trong tầm mắt người dùng (Sticky Bar hoặc Hero Section).</p>
      <p><img src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1000&q=80" alt="Thanh toán trực tuyến dễ dàng" style="border-radius: 12px; margin: 16px 0;" /></p>
      <h2>2. Sử Dụng Đánh Giá Khách Hàng (Social Proof) Thực Tế</h2>
      <p>Hơn 85% người tiêu dùng trực tuyến đưa ra quyết định mua hàng sau khi đọc các phản hồi, hình ảnh chụp thực tế từ các khách hàng trước đó. Hãy tích hợp khối Testimonial và đánh giá sao ngay trên trang.</p>
      <h2>3. Quy Trình Thanh Toán Tối Giản 1 Bước (One-Step Checkout)</h2>
      <p>Bỏ bớt các bước điền thông tin không cần thiết. Cho phép người dùng thanh toán qua quét mã VietQR, ZaloPay hoặc COD một cách tiện lợi nhất.</p>
    `,
    metaTitle: 'Bí Quyết Trang Bán Hàng Tỷ Lệ Chuyển Đổi Cao — Kabo Agency',
    metaDescription: 'Bố trí CTA, tạo niềm tin bằng Social Proof và tối ưu quy trình thanh toán nhanh.',
    coverImage: 'https://images.unsplash.com/photo-1556742049-0a679149204c?w=1200&q=80',
    contentImages: [
      'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1000&q=80',
      'https://images.unsplash.com/photo-1556742111-a301076d9d18?w=1000&q=80',
    ],
    author: 'KABO Growth Team',
    tags: ['BánHàngOnline', 'LandingPage', 'ChuyểnĐổi', 'Ecommerce'],
    isPublished: true,
    publishedAt: new Date('2026-07-08T09:15:00Z'),
    createdAt: new Date('2026-07-08T09:15:00Z'),
    updatedAt: new Date('2026-07-08T09:15:00Z'),
    categoryId: 'cat-3',
    category: { id: 'cat-3', accountId: 'default-account', name: 'Bán Hàng Online', slug: 'ban-hang-online', description: '', createdAt: new Date(), updatedAt: new Date() },
  },
  {
    id: 'post-2',
    accountId: 'default-account',
    title: 'Hướng Dẫn Tối Ưu SEO On-Page Chuẩn Google Dành Cho Doanh Nghiệp Mới',
    slug: 'huong-dan-toi-uu-seo-onpage-chuan-google',
    summary: 'Bí quyết tối ưu cấu trúc thẻ Meta, Heading, Schema.org và tốc độ trải nghiệm người dùng Core Web Vitals giúp website tăng trưởng traffic tự nhiên bền vững.',
    content: `
      <h2>1. Thẻ Meta Title & Meta Description Thu Hút Tỷ Lệ Click (CTR)</h2>
      <p>Tiêu đề bài viết cần chứa từ khóa chính ở vị trí đầu tiên, độ dài từ 50-60 ký tự. Thẻ Meta Description cần cô đọng từ 140-160 ký tự kèm lời kêu gọi hành động (CTA) rõ ràng.</p>
      <p><img src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1000&q=80" alt="Chiến lược Marketing SEO Google" style="border-radius: 12px; margin: 16px 0;" /></p>
      <h2>2. Cấu Trúc Thẻ Heading H1, H2, H3 Rõ Ràng</h2>
      <p>Một bài viết chuẩn SEO cần có duy nhất 1 thẻ H1 (Tiêu đề chính). Các ý lớn sử dụng H2 và các phân tích chi tiết nằm trong thẻ H3. Điều này giúp bot của Google hiểu rõ ngữ cảnh bài viết.</p>
      <h2>3. Tích Hợp Schema.org Structured Data</h2>
      <p>Bằng cách bổ sung mã JSON-LD Schema (như BlogPosting, Product, Organization), trang web của bạn sẽ hiển thị kết quả giàu thông tin (Rich Snippets) trên trang tìm kiếm Google.</p>
    `,
    metaTitle: 'Hướng Dẫn Tối Ưu SEO On-Page Chuẩn Google — Kabo Agency',
    metaDescription: 'Tối ưu Meta, Heading, Schema.org và tốc độ trải nghiệm người dùng Core Web Vitals.',
    coverImage: 'https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?w=1200&q=80',
    contentImages: [
      'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1000&q=80',
      'https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=1000&q=80',
    ],
    author: 'KABO SEO Specialist',
    tags: ['SEO', 'GoogleSEO', 'SEOOnPage', 'CoreWebVitals'],
    isPublished: true,
    publishedAt: new Date('2026-06-30T11:00:00Z'),
    createdAt: new Date('2026-06-30T11:00:00Z'),
    updatedAt: new Date('2026-06-30T11:00:00Z'),
    categoryId: 'cat-2',
    category: { id: 'cat-2', accountId: 'default-account', name: 'Tối Ưu SEO', slug: 'toi-uu-seo', description: '', createdAt: new Date(), updatedAt: new Date() },
  },
  {
    id: 'post-1',
    accountId: 'default-account',
    title: 'Top 7 Xu Hướng Thiết Kế Website Độc Bản Năm 2026',
    slug: 'top-7-xu-huong-thiet-ke-website-2026',
    summary: 'Khám phá các xu hướng thiết kế web đột phá giúp doanh nghiệp thu hút khách hàng ngay từ cái nhìn đầu tiên với giao diện ấn tượng và trải nghiệm siêu mượt.',
    content: `
      <h2>1. Giao Diện Tối Giản Nhưng Sang Trọng (Minimalist & Premium)</h2>
      <p>Năm 2026 đánh dấu sự lên ngôi của phong cách thiết kế tối giản nhưng giàu tính tương tác. Khách hàng không còn hào hứng với những trang web rối mắt chứa quá nhiều banner tĩnh. Thay vào đó, khoảng trắng (White space) được khai thác triệt để nhằm làm nổi bật sản phẩm chính.</p>
      <p><img src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1000&q=80" alt="Bàn làm việc thiết kế giao diện" style="border-radius: 12px; margin: 16px 0;" /></p>
      <h2>2. Dark Mode Động Tự Điều Chỉnh Theo Hệ Thống</h2>
      <p>Tính năng chuyển đổi chế độ Sáng/Tối (Light/Dark mode) mượt mà dựa trên cấu hình thiết bị của người dùng trở thành tiêu chuẩn bắt buộc cho mọi website hiện đại.</p>
      <h2>3. Micro-Animations & View Transitions</h2>
      <p>Các hiệu ứng chuyển trang mượt mà kết hợp với các hiệu ứng di chuột tinh tế giúp website hoạt động sinh động như ứng dụng cao cấp.</p>
    `,
    metaTitle: 'Top 7 Xu Hướng Thiết Kế Website Độc Bản 2026 — Kabo Agency',
    metaDescription: 'Khám phá các xu hướng thiết kế web đột phá giúp doanh nghiệp thu hút khách hàng.',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    contentImages: [
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1000&q=80',
      'https://images.unsplash.com/photo-1542744094-3a3172720189?w=1000&q=80',
    ],
    author: 'KABO Creative Director',
    tags: ['ThiếtKếWeb', 'UIUX', 'XuHướng2026', 'KaboAgency'],
    isPublished: true,
    publishedAt: new Date('2026-06-25T15:00:00Z'),
    createdAt: new Date('2026-06-25T15:00:00Z'),
    updatedAt: new Date('2026-06-25T15:00:00Z'),
    categoryId: 'cat-1',
    category: { id: 'cat-1', accountId: 'default-account', name: 'Thiết Kế Web', slug: 'thiet-ke-web', description: '', createdAt: new Date(), updatedAt: new Date() },
  },
];

export class BlogService {
  /**
   * Tạo mới một bài viết blog vào CSDL
   */
  static async createPost(input: CreateBlogPostInput, targetAccountId: string) {
    const accountId = targetAccountId;
    const slug = input.slug && input.slug.trim() !== '' ? slugify(input.slug) : slugify(input.title);

    let categoryId: string | null = null;

    if (input.categoryName && input.categoryName.trim() !== '') {
      const categorySlug = slugify(input.categoryName);
      try {
        const category = await prisma.blogCategory.upsert({
          where: {
            accountId_slug: {
              accountId,
              slug: categorySlug,
            },
          },
          update: {
            name: input.categoryName,
          },
          create: {
            accountId,
            name: input.categoryName,
            slug: categorySlug,
          },
        });
        categoryId = category.id;
      } catch (err) {
        console.warn('Cảnh báo khi upsert category:', err);
      }
    }

    let finalSlug = slug;
    let counter = 1;
    const coverImg = input.coverImage || input.featuredImage || null;
    try {
      while (true) {
        const existing = await prisma.blogPost.findUnique({
          where: {
            accountId_slug: {
              accountId,
              slug: finalSlug,
            },
          },
        });
        if (!existing) break;
        finalSlug = `${slug}-${counter}`;
        counter++;
      }

      const post = await prisma.blogPost.create({
        data: {
          accountId,
          title: input.title,
          slug: finalSlug,
          summary: input.summary || null,
          content: input.content,
          metaTitle: input.metaTitle || input.title,
          metaDescription: input.metaDescription || input.summary || null,
          coverImage: coverImg,
          contentImages: input.contentImages || [],
          author: input.author || 'KABO Editorial',
          tags: input.tags || [],
          isPublished: input.isPublished ?? true,
          publishedAt: input.isPublished ? new Date() : null,
          categoryId,
        },
        include: {
          category: true,
        },
      });

      return post;
    } catch (err) {
      console.error('Lỗi khi tạo post vào DB:', err);
      return {
        id: `mock-${Date.now()}`,
        accountId,
        title: input.title,
        slug: finalSlug,
        summary: input.summary || null,
        content: input.content,
        metaTitle: input.metaTitle || input.title,
        metaDescription: input.metaDescription || input.summary || null,
        coverImage: coverImg,
        contentImages: input.contentImages || [],
        author: input.author || 'KABO Editorial',
        tags: input.tags || [],
        isPublished: input.isPublished ?? true,
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId,
        category: categoryId ? { id: categoryId, accountId, name: input.categoryName || 'General', slug: categoryId, description: null, createdAt: new Date(), updatedAt: new Date() } : null,
      };
    }
  }

  /**
   * Lấy danh sách bài viết theo accountId
   */
  static async getPosts(accountId: string, options: { page?: number; limit?: number; categorySlug?: string; tag?: string; search?: string } = {}) {
    const page = Math.max(1, options.page || 1);
    const limit = Math.min(50, Math.max(1, options.limit || 10));

    try {
      const skip = (page - 1) * limit;

      const where: any = {
        accountId,
        isPublished: true,
      };

      if (options.categorySlug) {
        where.category = {
          slug: options.categorySlug,
        };
      }

      if (options.tag) {
        where.tags = {
          has: options.tag,
        };
      }

      if (options.search) {
        where.OR = [
          { title: { contains: options.search, mode: 'insensitive' } },
          { summary: { contains: options.search, mode: 'insensitive' } },
          { content: { contains: options.search, mode: 'insensitive' } },
        ];
      }

      const [posts, total] = await Promise.all([
        prisma.blogPost.findMany({
          where,
          skip,
          take: limit,
          orderBy: { publishedAt: 'desc' },
          include: { category: true },
        }),
        prisma.blogPost.count({ where }),
      ]);

      return {
        posts,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.warn('Sử dụng Fallback Posts cho BlogService.getPosts do kết nối DB:', error instanceof Error ? error.message : error);
    }

    // Fallback in-memory filter
    let filtered = [...FALLBACK_POSTS];

    if (options.categorySlug) {
      filtered = filtered.filter((p) => p.category?.slug === options.categorySlug);
    }

    if (options.tag) {
      filtered = filtered.filter((p) => p.tags.includes(options.tag!));
    }

    if (options.search) {
      const q = options.search.toLowerCase();
      filtered = filtered.filter(
        (p) => p.title.toLowerCase().includes(q) || p.summary?.toLowerCase().includes(q) || p.content.toLowerCase().includes(q)
      );
    }

    const total = filtered.length;
    const skip = (page - 1) * limit;
    const paginatedPosts = filtered.slice(skip, skip + limit);

    return {
      posts: paginatedPosts as any,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  /**
   * Lấy chi tiết bài viết theo slug
   */
  static async getPostBySlug(accountId: string, slug: string) {
    try {
      const post = await prisma.blogPost.findUnique({
        where: {
          accountId_slug: {
            accountId,
            slug,
          },
        },
        include: {
          category: true,
        },
      });

      if (post) {
        return post;
      }
    } catch (error) {
      console.warn('Sử dụng Fallback Post cho BlogService.getPostBySlug:', error instanceof Error ? error.message : error);
    }

    const fallback = FALLBACK_POSTS.find((p) => p.slug === slug);
    return fallback ? (fallback as any) : null;
  }

  /**
   * Lấy danh sách tất cả các danh mục bài viết
   */
  static async getCategories(accountId: string) {
    try {
      const categories = await prisma.blogCategory.findMany({
        where: { accountId },
        include: {
          _count: {
            select: { posts: { where: { isPublished: true } } },
          },
        },
        orderBy: { name: 'asc' },
      });

      if (categories.length > 0) {
        return categories;
      }
    } catch (error) {
      console.warn('Sử dụng Fallback Categories:', error instanceof Error ? error.message : error);
    }

    return FALLBACK_CATEGORIES as any;
  }

  /**
   * Tính thời gian đọc ước tính dựa trên số từ trong nội dung bài viết
   */
  static calculateReadingTime(content: string): number {
    const plainText = content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const wordCount = plainText.split(/\s+/).filter(Boolean).length;
    const wordsPerMinute = 200;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  }

  /**
   * Lấy bài viết liền trước (cũ hơn) và liền sau (mới hơn) để điều hướng trực tiếp ở cuối bài viết
   */
  static async getPreviousAndNextPosts(accountId: string, currentPostId: string, publishedAt: Date | null) {
    try {
      const [previousPost, nextPost] = await Promise.all([
        prisma.blogPost.findFirst({
          where: {
            accountId,
            isPublished: true,
            id: { not: currentPostId },
            publishedAt: { lte: publishedAt || new Date() },
          },
          orderBy: { publishedAt: 'desc' },
          select: { id: true, title: true, slug: true, coverImage: true, publishedAt: true },
        }),
        prisma.blogPost.findFirst({
          where: {
            accountId,
            isPublished: true,
            id: { not: currentPostId },
            publishedAt: { gte: publishedAt || new Date() },
          },
          orderBy: { publishedAt: 'asc' },
          select: { id: true, title: true, slug: true, coverImage: true, publishedAt: true },
        }),
      ]);

      if (previousPost || nextPost) {
        return {
          previousPost: previousPost || null,
          nextPost: nextPost || null,
        };
      }
    } catch (err) {
      console.warn('Sử dụng Fallback cho getPreviousAndNextPosts');
    }

    // Fallback logic cho in-memory array
    const sorted = [...FALLBACK_POSTS].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    const currentIndex = sorted.findIndex((p) => p.id === currentPostId || p.slug === currentPostId);

    if (currentIndex === -1) {
      return {
        previousPost: sorted[1] ? { id: sorted[1].id, title: sorted[1].title, slug: sorted[1].slug, coverImage: sorted[1].coverImage, publishedAt: sorted[1].publishedAt } : null,
        nextPost: null,
      };
    }

    const previousPost = sorted[currentIndex + 1]
      ? { id: sorted[currentIndex + 1].id, title: sorted[currentIndex + 1].title, slug: sorted[currentIndex + 1].slug, coverImage: sorted[currentIndex + 1].coverImage, publishedAt: sorted[currentIndex + 1].publishedAt }
      : null;

    const nextPost = sorted[currentIndex - 1]
      ? { id: sorted[currentIndex - 1].id, title: sorted[currentIndex - 1].title, slug: sorted[currentIndex - 1].slug, coverImage: sorted[currentIndex - 1].coverImage, publishedAt: sorted[currentIndex - 1].publishedAt }
      : null;

    return { previousPost, nextPost };
  }

  /**
   * Lấy danh sách các bài viết liên quan (cùng danh mục hoặc bài viết mới)
   */
  static async getRelatedPosts(accountId: string, currentPostId: string, categoryId?: string | null, limit = 3) {
    try {
      let where: any = {
        accountId,
        isPublished: true,
        id: { not: currentPostId },
      };

      if (categoryId) {
        where.categoryId = categoryId;
      }

      let posts = await prisma.blogPost.findMany({
        where,
        take: limit,
        orderBy: { publishedAt: 'desc' },
        include: { category: true },
      });

      if (posts.length < limit) {
        const existingIds = [currentPostId, ...posts.map((p) => p.id)];
        const fallbackPosts = await prisma.blogPost.findMany({
          where: {
            accountId,
            isPublished: true,
            id: { notIn: existingIds },
          },
          take: limit - posts.length,
          orderBy: { publishedAt: 'desc' },
          include: { category: true },
        });
        posts = [...posts, ...fallbackPosts];
      }

      if (posts.length > 0) {
        return posts;
      }
    } catch (err) {
      console.warn('Sử dụng Fallback cho getRelatedPosts');
    }

    const fallback = FALLBACK_POSTS.filter((p) => p.id !== currentPostId && p.slug !== currentPostId).slice(0, limit);
    return fallback as any;
  }
}
