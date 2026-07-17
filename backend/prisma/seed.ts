import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const templatesData = [
  {
    slug: 'nexcore-saas',
    title: 'NexCore SaaS',
    category: 'saas',
    description: 'Landing page chuyển đổi hiệu quả cho phần mềm công nghệ. Tích hợp tính năng và biểu đồ tương tác.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    demoImages: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80', // Homepage
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80', // Feature Detail
      'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&q=80'  // Pricing Page
    ],
    tags: ['SaaS', 'Tech', 'Conversion', 'Next.js'],
    features: [
      'Pricing section tích hợp',
      'Feature comparison table',
      'Testimonials carousel',
      'Free trial CTA flow'
    ],
    price: 99.00,
    isActive: true,
  },
  {
    slug: 'aura-boutique',
    title: 'Aura Boutique',
    category: 'ecommerce',
    description: 'Giao diện mua sắm mỹ phẩm sang trọng, tối giản và tràn đầy hình ảnh sản phẩm đẹp.',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&q=80',
    demoImages: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&q=80', // Homepage Shop
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80', // Catalog & Filters
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80'  // Product Detail
    ],
    tags: ['Beauty', 'Ecommerce', 'Elegant', 'Tailwind'],
    features: [
      'Product gallery với zoom',
      'Quick add to cart',
      'Filter & search nâng cao',
      'Mobile-first checkout'
    ],
    price: 129.00,
    isActive: true,
  },
  {
    slug: 'studio-vibe',
    title: 'Studio Vibe',
    category: 'enterprise',
    description: 'Thiết kế bố cục đối xứng, tràn đầy năng lượng dành cho agency sáng tạo hoặc cá nhân.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80',
    demoImages: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&q=80', // Bento Showcase
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80', // Portfolio Details
      'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1200&q=80'  // Contact & Work Brief
    ],
    tags: ['Agency', 'Creative', 'Portfolio', 'Shadcn UI'],
    features: [
      'Bento grid portfolio',
      'Dark mode toggle',
      'Smooth scroll animations',
      'Contact form tích hợp'
    ],
    price: 79.00,
    isActive: true,
  },
  {
    slug: 'enterprise-flow',
    title: 'Enterprise Flow',
    category: 'enterprise',
    description: 'Cấu trúc chuyên nghiệp, đáng tin cậy dành cho tập đoàn và công ty tài chính.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    demoImages: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80', // Homepage Corporate
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80', // Investor Relations
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&q=80'  // Career Portal
    ],
    tags: ['Corporate', 'Finance', 'Enterprise', 'Multi-language'],
    features: [
      'Multi-language ready',
      'Investor relations section',
      'Annual report showcase',
      'Career portal tích hợp'
    ],
    price: 199.00,
    isActive: true,
  },
  {
    slug: 'applaunch-pro',
    title: 'AppLaunch Pro',
    category: 'saas',
    description: 'Landing page giới thiệu ứng dụng di động, tối ưu chuyển đổi, hiệu ứng mượt mà.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80',
    demoImages: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80', // Mobile Mockup Landing
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=80', // Features Grid
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80'  // Download CTA
    ],
    tags: ['App', 'Mobile', 'Launch', 'Interactive'],
    features: [
      'App store badges',
      'Feature showcase với mockup',
      'Waitlist form',
      'Social proof section'
    ],
    price: 89.00,
    isActive: true,
  },
  {
    slug: 'techchronicle',
    title: 'TechChronicle',
    category: 'saas',
    description: 'Giao diện tin tức và blog công nghệ, tập trung vào đọc và trải nghiệm đọc và typography.',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80',
    demoImages: [
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80', // Blog Layout
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&q=80', // Article Page
      'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1200&q=80'  // Newsletter Popup
    ],
    tags: ['Blog', 'News', 'Tech', 'Typography'],
    features: [
      'Reading progress bar',
      'Article series',
      'Newsletter signup',
      'Dark mode tối ưu'
    ],
    price: 69.00,
    isActive: true,
  }
];

async function main() {
  console.log('🌱 Start seeding templates...');
  
  // Clean existing templates to avoid duplicate slug violations on re-seeding
  await prisma.template.deleteMany();
  
  for (const t of templatesData) {
    const template = await prisma.template.create({
      data: t,
    });
    console.log(`Created template with slug: ${template.slug}`);
  }
  
  console.log('✅ Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
