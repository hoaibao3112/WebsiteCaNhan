import { Metadata } from 'next';
import Link from 'next/link';
import { BlogService } from '@/services/blog.service';
import SafeImage from '@/components/ui/SafeImage';
import { ArrowRight, Search, ChevronDown, X } from 'lucide-react';

export const metadata: Metadata = {
  title: 'KABO Tech & SEO | Blog & Insights',
  description:
    'Bài viết kinh nghiệm thiết kế website chuyên nghiệp, chiến lược SEO Marketing bền vững và những cập nhật công nghệ mới nhất cho doanh nghiệp.',
  openGraph: {
    title: 'KABO Tech & SEO | Blog & Insights',
    description:
      'Bài viết kinh nghiệm thiết kế website chuyên nghiệp, chiến lược SEO Marketing bền vững và những cập nhật công nghệ mới nhất cho doanh nghiệp.',
  },
};

const NAVBAR_HEIGHT = 68;
const DEFAULT_ACCOUNT_ID = process.env.DEFAULT_ACCOUNT_ID || 'default-account';
export const revalidate = 60;

export default async function BlogListPage({
  searchParams,
}: {
  searchParams: { page?: string; category?: string; tag?: string; search?: string };
}) {
  const page = parseInt(searchParams.page || '1', 10);
  const categorySlug = searchParams.category;
  const tag = searchParams.tag;
  const search = searchParams.search;

  const [{ posts, pagination }, categories] = await Promise.all([
    BlogService.getPosts(DEFAULT_ACCOUNT_ID, { page, limit: 9, categorySlug, tag, search }),
    BlogService.getCategories(DEFAULT_ACCOUNT_ID),
  ]);

  // Featured post 1 (Large left) and Featured post 2 (Sidebar right) for page 1 without filters
  const isDefaultView = page === 1 && !categorySlug && !tag && !search;
  const featuredLargePost = isDefaultView && posts.length > 0 ? posts[0] : null;
  const featuredSidebarPost = isDefaultView && posts.length > 1 ? posts[1] : null;
  
  // Standard grid posts
  const standardGridPosts = isDefaultView
    ? posts.slice(2)
    : posts;

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c]" style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}>

      {/* ══ HERO SECTION: FEATURED POST HEADER ════════════════════════════ */}
      <section className="relative w-full h-[450px] md:h-[500px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SafeImage
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80"
            alt="KABO Blog Banner"
            fill
            priority
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 w-full px-6 max-w-[1200px] mx-auto">
          <div className="max-w-2xl text-white">
            <span className="inline-block bg-[#006a6a] text-white px-3 py-1 rounded-full text-xs font-semibold mb-6 border border-[#76d6d5]/40 tracking-wider">
              KABO BLOG &amp; INSIGHTS
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight tracking-tight">
              Góc Chia Sẻ Kiến Thức <br />
              <span className="text-[#93f2f2]">Web &amp; SEO</span>
            </h1>
            <p className="text-base md:text-lg mb-8 text-white/90 leading-relaxed max-w-xl">
              Bài viết kinh nghiệm thiết kế website chuyên nghiệp, chiến lược SEO Marketing bền vững và những cập nhật công nghệ mới nhất cho doanh nghiệp.
            </p>

            {/* Search Bar */}
            <form action="/blog" method="GET" className="relative max-w-md">
              {categorySlug && <input type="hidden" name="category" value={categorySlug} />}
              <input
                type="text"
                name="search"
                defaultValue={search || ''}
                placeholder="Tìm kiếm bài viết..."
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-3 text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#93f2f2] transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bg-[#93f2f2] hover:bg-white text-[#003434] font-bold text-xs px-4 py-1.5 rounded transition-colors"
              >
                Tìm
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ══ STICKY CATEGORY TABS ═══════════════════════════════════════════ */}
      <section className="border-b border-[#e2e2e2] bg-[#f9f9f9] sticky top-[68px] z-40 shadow-sm">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex overflow-x-auto no-scrollbar gap-8 py-4 items-center">
            <Link
              href="/blog"
              className={`whitespace-nowrap font-semibold text-sm transition-colors ${
                !categorySlug && !search && !tag
                  ? 'text-[#003434] border-b-2 border-[#003434] pb-1 font-bold'
                  : 'text-[#3f4848] hover:text-[#003434]'
              }`}
            >
              Tất cả
            </Link>
            {categories.map((cat: any) => (
              <Link
                key={cat.id}
                href={`/blog?category=${cat.slug}`}
                className={`whitespace-nowrap font-semibold text-sm transition-colors ${
                  categorySlug === cat.slug
                    ? 'text-[#003434] border-b-2 border-[#003434] pb-1 font-bold'
                    : 'text-[#3f4848] hover:text-[#003434]'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MAIN CONTENT AREA ══════════════════════════════════════════════ */}
      <main className="max-w-[1200px] mx-auto px-6 py-16">

        {/* Active Filters */}
        {(search || categorySlug || tag) && (
          <div className="flex flex-wrap items-center gap-2 mb-10 bg-emerald-50 border border-emerald-200 px-5 py-3 rounded-xl">
            <span className="text-xs font-bold text-emerald-900">Đang lọc theo:</span>
            {search && (
              <span className="bg-white text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200">
                Từ khóa: &ldquo;{search}&rdquo;
              </span>
            )}
            {categorySlug && (
              <span className="bg-white text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200">
                Danh mục: {categorySlug}
              </span>
            )}
            {tag && (
              <span className="bg-white text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200">
                #{tag}
              </span>
            )}
            <Link href="/blog" className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-red-600">
              <X className="size-3.5" /> Xóa bộ lọc
            </Link>
          </div>
        )}

        {/* ── FEATURED LARGE GRID LAYOUT (Page 1 without filter) ──────────── */}
        {featuredLargePost && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            
            {/* Large Featured Card (Spans 2 columns) */}
            <div className="lg:col-span-2 group article-card relative overflow-hidden rounded-xl border border-[#e2e2e2] bg-white shadow-[0_8px_24px_rgba(0,77,77,0.06)]">
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-1/2 overflow-hidden h-64 md:h-full relative min-h-[260px]">
                  <SafeImage
                    src={featuredLargePost.coverImage || featuredLargePost.featuredImage || ''}
                    alt={featuredLargePost.title}
                    fill
                    priority
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-4 flex-wrap">
                    <span className="bg-[#b0eeed] text-[#003434] px-3 py-1 rounded-lg text-xs font-semibold uppercase">
                      {featuredLargePost.category?.name || 'CÔNG NGHỆ & AI'}
                    </span>
                    <span className="text-[#6f7978] text-xs font-medium">
                      {featuredLargePost.publishedAt
                        ? new Date(featuredLargePost.publishedAt).toLocaleDateString('vi-VN', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                          })
                        : 'Mới đăng'}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-[#003434] leading-tight group-hover:text-[#006a6a] transition-colors">
                    <Link href={`/blog/${featuredLargePost.slug}`}>{featuredLargePost.title}</Link>
                  </h2>
                  <p className="text-sm text-[#3f4848] mb-6 line-clamp-3 leading-relaxed">
                    {featuredLargePost.summary}
                  </p>
                  <Link
                    href={`/blog/${featuredLargePost.slug}`}
                    className="flex items-center gap-2 text-[#003434] font-bold hover:text-[#006a6a] transition-colors text-sm group"
                  >
                    Đọc ngay <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Featured Sidebar Post (Spans 1 column) */}
            {featuredSidebarPost ? (
              <div className="group article-card border border-[#e2e2e2] rounded-xl p-8 bg-white shadow-[0_8px_24px_rgba(0,77,77,0.06)] flex flex-col justify-between">
                <div>
                  <div className="mb-4">
                    <span className="bg-[#90efef] text-[#006e6e] px-3 py-1 rounded-lg text-xs font-semibold uppercase">
                      {featuredSidebarPost.category?.name || 'THIẾT KẾ WEB'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-[#003434] group-hover:text-[#006a6a] transition-colors leading-snug">
                    <Link href={`/blog/${featuredSidebarPost.slug}`}>{featuredSidebarPost.title}</Link>
                  </h3>
                  <p className="text-sm text-[#3f4848] mb-6 line-clamp-3 leading-relaxed">
                    {featuredSidebarPost.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-[#e2e2e2] mt-auto">
                  <span className="text-xs text-[#6f7978]">
                    {BlogService.calculateReadingTime(featuredSidebarPost.content)} phút đọc
                  </span>
                  <Link
                    href={`/blog/${featuredSidebarPost.slug}`}
                    className="flex items-center gap-2 text-[#003434] font-bold hover:text-[#006a6a] transition-colors text-sm group"
                  >
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ) : null}

          </div>
        )}

        {/* ── STANDARD 3-COLUMN GRID ──────────────────────────────────────── */}
        {posts.length === 0 ? (
          <EmptyState search={search} categorySlug={categorySlug} tag={tag} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {standardGridPosts.map((post: any) => {
                const cover = post.coverImage || post.featuredImage;
                const readingTime = BlogService.calculateReadingTime(post.content);
                return (
                  <article
                    key={post.id}
                    className="article-card group bg-white border border-[#e2e2e2] rounded-xl overflow-hidden hover:shadow-lg transition-all flex flex-col"
                  >
                    <div className="h-48 overflow-hidden relative">
                      <SafeImage
                        src={cover || ''}
                        alt={post.title}
                        fill
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-[#006a6a] font-bold uppercase tracking-wider">
                            {post.category?.name || 'TIN TỨC'}
                          </span>
                          <span className="text-xs text-[#6f7978]">
                            {post.publishedAt
                              ? new Date(post.publishedAt).toLocaleDateString('vi-VN', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                })
                              : 'Mới đăng'}
                          </span>
                        </div>

                        <h4 className="text-lg font-bold mb-3 text-[#003434] group-hover:text-[#006a6a] transition-colors line-clamp-2 leading-snug">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h4>

                        <p className="text-sm text-[#3f4848] mb-4 line-clamp-2 leading-relaxed">
                          {post.summary}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-[#f4f3f3] flex items-center justify-between mt-auto">
                        <span className="text-xs text-[#6f7978]">{readingTime} phút đọc</span>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1 text-[#003434] font-bold text-sm group-hover:text-[#006a6a] transition-colors"
                        >
                          Đọc ngay <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination / Load More */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-16">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`/blog?page=${p}${categorySlug ? `&category=${categorySlug}` : ''}${search ? `&search=${encodeURIComponent(search)}` : ''}${tag ? `&tag=${encodeURIComponent(tag)}` : ''}`}
                    className={`w-10 h-10 rounded-lg text-sm font-bold flex items-center justify-center border transition-all ${
                      p === pagination.page
                        ? 'bg-[#003434] text-white border-[#003434] shadow-sm'
                        : 'bg-white text-[#3f4848] border-[#e2e2e2] hover:border-[#003434] hover:text-[#003434]'
                    }`}
                  >
                    {p}
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* ══ NEWSLETTER SECTION ═══════════════════════════════════════════════ */}
      <section className="bg-[#004d4d] text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#80bdbc]">
            Đăng ký nhận bản tin chuyên sâu
          </h2>
          <p className="text-sm md:text-base text-white/80 mb-8 max-w-xl mx-auto leading-relaxed">
            Chúng tôi gửi những kiến thức giá trị nhất về Web &amp; SEO mỗi tuần, không spam, không quảng cáo.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Email của bạn"
              className="flex-grow rounded-lg border-none px-6 py-3 text-[#1a1c1c] bg-white focus:outline-none focus:ring-2 focus:ring-[#006a6a] text-sm"
            />
            <button
              type="submit"
              className="bg-[#006a6a] text-white px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all text-sm shrink-0"
            >
              Đăng ký
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

// ─── Empty State ──────────────────────────────────────────────────────────────
function EmptyState({
  search,
  categorySlug,
  tag,
}: {
  search?: string;
  categorySlug?: string;
  tag?: string;
}) {
  return (
    <div className="text-center py-20 bg-white rounded-xl border border-[#e2e2e2] shadow-sm max-w-md mx-auto">
      <h3 className="text-lg font-bold text-[#003434] mb-2">Chưa có bài viết nào</h3>
      <p className="text-sm text-[#6f7978] mb-6 max-w-sm mx-auto">
        {search || categorySlug || tag
          ? 'Không tìm thấy bài viết phù hợp với bộ lọc.'
          : 'Bài viết đang được biên soạn và sẽ cập nhật sớm.'}
      </p>
      {(search || categorySlug || tag) && (
        <Link
          href="/blog"
          className="inline-flex items-center px-6 py-2.5 rounded-lg bg-[#003434] text-white text-sm font-semibold hover:bg-[#006a6a] transition-colors"
        >
          Xem tất cả bài viết
        </Link>
      )}
    </div>
  );
}
