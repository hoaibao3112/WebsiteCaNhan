import { Metadata } from 'next';
import Link from 'next/link';
import { BlogService } from '@/services/blog.service';
import SafeImage from '@/components/ui/SafeImage';
import { ArrowRight, Search, X, Calendar, Clock, Flame, Sparkles, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Góc Chia Sẻ Kiến Thức | KABO Tech & SEO Blog',
  description:
    'Bài viết kinh nghiệm thiết kế website chuyên nghiệp, chiến lược SEO Marketing bền vững và những cập nhật công nghệ mới nhất cho doanh nghiệp.',
  openGraph: {
    title: 'Góc Chia Sẻ Kiến Thức | KABO Tech & SEO Blog',
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

  const featuredPost = posts.length > 0 ? posts[0] : null;
  const gridPosts = posts.length > 1 ? posts.slice(1) : [];

  return (
    <div className="min-h-screen bg-white text-foreground" style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}>

      {/* ══ HERO SECTION ═══════════════════════════════════════════════════════ */}
      <section className="relative w-full py-16 md:py-24 px-6 text-center max-w-[1200px] mx-auto">
        <span className="section-label mb-6 inline-flex">
          <Sparkles className="size-3.5" /> KABO BLOG & INSIGHTS
        </span>

        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-foreground leading-tight">
          Góc Chia Sẻ <span className="text-accent font-serif">Kiến Thức</span>
        </h1>

        <p className="text-base md:text-lg text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
          Tổng hợp kinh nghiệm thiết kế website chuyên nghiệp, chiến lược SEO Marketing bền vững và cập nhật công nghệ mới nhất.
        </p>

        {/* Search Bar */}
        <form action="/blog" method="GET" className="relative max-w-xl mx-auto">
          {categorySlug && <input type="hidden" name="category" value={categorySlug} />}
          <div className="relative flex items-center glass-panel rounded-full p-1.5 shadow-[var(--shadow-soft-float)] border border-border">
            <Search className="size-5 text-muted ml-4 shrink-0" />
            <input
              type="text"
              name="search"
              defaultValue={search || ''}
              placeholder="Tìm bài viết theo từ khóa (VD: Next.js, SEO, UI/UX...)"
              className="w-full px-3 py-2 text-sm text-foreground placeholder-muted bg-transparent border-none focus:outline-none"
            />
            <button
              type="submit"
              className="btn-primary !rounded-full !px-6 !py-2.5 !text-xs shrink-0 cursor-pointer"
            >
              Tìm Kiếm
            </button>
          </div>
        </form>
      </section>

      {/* ══ CATEGORIES FILTER ══════════════════════════════════════════════════ */}
      <section className="max-w-[1200px] mx-auto px-6 mb-12">
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-4 border-b border-border">
          <Link
            href="/blog"
            className={`filter-tab ${
              !categorySlug && !search && !tag ? 'active' : ''
            }`}
          >
            Tất cả bài viết
          </Link>
          {categories.map((cat: any) => (
            <Link
              key={cat.id}
              href={`/blog?category=${cat.slug}`}
              className={`filter-tab ${
                categorySlug === cat.slug ? 'active' : ''
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* ══ MAIN CONTENT AREA ══════════════════════════════════════════════════ */}
      <main className="max-w-[1200px] mx-auto px-6 pb-20">

        {/* Active Filters Bar */}
        {(search || categorySlug || tag) && (
          <div className="flex flex-wrap items-center gap-3 mb-10 bg-primary-surface border border-primary-light/40 px-5 py-3.5 rounded-2xl shadow-2xs">
            <span className="text-xs font-bold text-primary-dark">Đang lọc bài viết:</span>
            {search && (
              <span className="bg-white text-primary-dark px-3 py-1 rounded-full text-xs font-semibold border border-primary-light/50 shadow-2xs">
                Từ khóa: &ldquo;{search}&rdquo;
              </span>
            )}
            {categorySlug && (
              <span className="bg-white text-primary-dark px-3 py-1 rounded-full text-xs font-semibold border border-primary-light/50 shadow-2xs">
                Danh mục: {categorySlug}
              </span>
            )}
            {tag && (
              <span className="bg-white text-primary-dark px-3 py-1 rounded-full text-xs font-semibold border border-primary-light/50 shadow-2xs">
                #{tag}
              </span>
            )}
            <Link href="/blog" className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-600 transition-colors">
              <X className="size-3.5" /> Xóa bộ lọc
            </Link>
          </div>
        )}

        {posts.length === 0 ? (
          <EmptyState search={search} categorySlug={categorySlug} tag={tag} />
        ) : (
          <>
            {/* ── FEATURED POST (SPOTLIGHT) ─────────────────────────────── */}
            {featuredPost && !search && !categorySlug && !tag && page === 1 && (
              <FeaturedArticle post={featuredPost} />
            )}

            {/* ── RECENT POSTS SECTION HEADER ─────────────────────────────── */}
            <div className="flex justify-between items-end border-b-2 border-primary pb-3 mb-8">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground border-l-4 border-accent pl-3 leading-none">
                {search || categorySlug || tag ? 'Kết Quả Tìm Kiếm' : 'Bài Viết Mới Nhất'}
              </h2>
              <span className="text-xs text-muted font-medium bg-primary-surface px-3 py-1.5 rounded-full border border-border">
                {pagination.total} bài viết
              </span>
            </div>

            {/* ── 3-COLUMN ARTICLE GRID ───────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(search || categorySlug || tag || page !== 1 ? posts : gridPosts).map((post: any) => {
                const cover = post.coverImage || post.featuredImage;
                const readingTime = BlogService.calculateReadingTime(post.content);
                return (
                  <article
                    key={post.id}
                    className="card-lumina group flex flex-col h-full"
                  >
                    {/* Cover Image Container */}
                    <div className="relative h-48 overflow-hidden bg-primary-surface">
                      <span className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur-sm text-primary text-[11px] font-bold px-3 py-1 rounded-full shadow-xs border border-white/60 uppercase tracking-wider">
                        {post.category?.name || 'TIN TỨC'}
                      </span>
                      <SafeImage
                        src={cover || ''}
                        alt={post.title}
                        fill
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Content Section */}
                    <div className="p-5 flex flex-col flex-grow justify-between">
                      <div>
                        {/* Meta info */}
                        <div className="flex items-center gap-3 text-xs text-muted mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="size-3.5 text-primary" />
                            {post.publishedAt
                              ? new Date(post.publishedAt).toLocaleDateString('vi-VN', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                })
                              : 'Mới đăng'}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="size-3.5 text-muted" />
                            {readingTime} phút đọc
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-heading text-base font-bold text-foreground mb-2.5 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>

                        {/* Excerpt */}
                        <p className="text-sm text-muted line-clamp-2 leading-relaxed mb-4">
                          {post.summary}
                        </p>
                      </div>

                      {/* Card Footer */}
                      <div className="pt-4 mt-auto border-t border-border/60 flex items-center justify-between">
                        <span className="text-[11px] text-muted font-medium">
                          {post.author || 'KABO Team'}
                        </span>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-primary-dark transition-colors"
                        >
                          Đọc thêm <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination / Load More */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-14">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`/blog?page=${p}${categorySlug ? `&category=${categorySlug}` : ''}${search ? `&search=${encodeURIComponent(search)}` : ''}${tag ? `&tag=${encodeURIComponent(tag)}` : ''}`}
                    className={`w-10 h-10 rounded-full text-xs font-bold flex items-center justify-center border transition-all ${
                      p === pagination.page
                        ? 'bg-primary text-white border-primary shadow-md shadow-primary/20'
                        : 'bg-white text-muted border-border hover:border-primary hover:text-primary'
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
    </div>
  );
}

// ─── Featured Article Component ───────────────────────────────────────────────
function FeaturedArticle({ post }: { post: any }) {
  const cover = post.coverImage || post.featuredImage;
  const readingTime = BlogService.calculateReadingTime(post.content);

  return (
    <div className="card-lumina overflow-hidden mb-14 group">
      <div className="flex flex-col md:flex-row relative">
        {/* Badge */}
        <div className="absolute top-4 left-4 z-10 bg-accent text-white px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center shadow-md gap-1">
          <Flame className="size-3.5 text-yellow-200 fill-yellow-200" />
          <span>BÀI VIẾT NỔI BẬT</span>
        </div>

        {/* Image Half */}
        <div className="md:w-1/2 relative min-h-[280px] md:min-h-[380px] overflow-hidden bg-primary-surface">
          <SafeImage
            src={cover || ''}
            alt={post.title}
            fill
            priority
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Content Half */}
        <div className="md:w-1/2 p-8 lg:p-12 flex flex-col justify-center bg-white">
          {post.category && (
            <span className="text-primary font-bold text-xs uppercase tracking-wider mb-3">
              {post.category.name}
            </span>
          )}

          <h2 className="font-heading text-2xl md:text-3xl lg:text-[32px] leading-tight font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>

          <p className="text-sm md:text-base text-muted mb-6 line-clamp-3 leading-relaxed">
            {post.summary}
          </p>

          <div className="flex items-center text-xs text-muted mb-8 gap-4">
            <span className="flex items-center gap-1.5">
              <Calendar className="size-3.5 text-primary" />
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })
                : 'Mới đăng'}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5 text-muted" />
              {readingTime} phút đọc
            </span>
          </div>

          <div>
            <Link
              href={`/blog/${post.slug}`}
              className="btn-primary !text-xs !px-5 !py-2.5 inline-flex"
            >
              Đọc ngay <ArrowRight className="size-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Empty State Component ────────────────────────────────────────────────────
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
    <div className="text-center py-24 max-w-md mx-auto my-8 animate-fade-in">
      <div className="w-20 h-20 rounded-2xl bg-primary-surface flex items-center justify-center mx-auto mb-6 border border-border">
        <BookOpen className="size-8 text-primary" />
      </div>
      <h3 className="font-heading text-xl font-bold text-foreground mb-3">Không tìm thấy bài viết</h3>
      <p className="text-sm text-muted mb-8 max-w-sm mx-auto leading-relaxed">
        {search || categorySlug || tag
          ? 'Không tìm thấy bài viết nào phù hợp với bộ lọc tìm kiếm của bạn.'
          : 'Bài viết đang được cập nhật. Vui lòng quay lại sau.'}
      </p>
      {(search || categorySlug || tag) && (
        <Link
          href="/blog"
          className="btn-primary !text-xs"
        >
          Xem tất cả bài viết
        </Link>
      )}
    </div>
  );
}
