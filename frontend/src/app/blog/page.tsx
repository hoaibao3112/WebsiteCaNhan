import { Metadata } from 'next';
import Link from 'next/link';
import { BlogService, getBlogCoverImage } from '@/services/blog.service';
import SafeImage from '@/components/ui/SafeImage';
import { ArrowRight, Search, X, Calendar, Clock, Flame, Sparkles, BookOpen, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog & Kiến Thức Thiết Kế Website — KABO Agency',
  description:
    'Chia sẻ kiến thức chuyên sâu về thiết kế website UI/UX, chiến lược SEO Google On-page, tối ưu tỷ lệ chuyển đổi và cập nhật công nghệ web hiện đại.',
  openGraph: {
    title: 'Blog & Kiến Thức Thiết Kế Website — KABO Agency',
    description:
      'Chia sẻ kiến thức chuyên sâu về thiết kế website UI/UX, chiến lược SEO Google On-page, tối ưu tỷ lệ chuyển đổi và cập nhật công nghệ web hiện đại.',
  },
};

const NAVBAR_HEIGHT = 72;
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
    <div className="min-h-screen bg-[#fafafa] text-[#0f172a]" style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}>

      {/* ══ HERO HEADER ═══════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-gradient-to-b from-[#f0f7f8] via-[#f8fafc] to-[#fafafa] pt-14 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#e2ecec]">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#006672] bg-[#006672]/10 px-4 py-1.5 rounded-full mb-5">
            <Sparkles className="size-3.5" /> KABO Blog &amp; Insights
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] tracking-tight leading-tight mb-4">
            Góc Chia Sẻ <span className="text-[#006672]">Kiến Thức</span> &amp; Xu Hướng Web
          </h1>

          <p className="text-sm sm:text-base text-[#64748b] max-w-2xl mx-auto leading-relaxed mb-8">
            Tổng hợp kinh nghiệm thiết kế website chuyên nghiệp, chiến lược SEO Marketing và những bí quyết tăng tỷ lệ chuyển đổi đơn hàng.
          </p>

          {/* Modern Search Bar */}
          <form action="/blog" method="GET" className="w-full max-w-xl">
            {categorySlug && <input type="hidden" name="category" value={categorySlug} />}
            <div className="flex items-center bg-white rounded-2xl p-2 shadow-lg shadow-[#006672]/5 border border-[#e2ecec] focus-within:border-[#006672] focus-within:ring-2 focus-within:ring-[#006672]/20 transition-all">
              <Search className="size-5 text-[#94a3b8] ml-3 shrink-0" />
              <input
                type="text"
                name="search"
                defaultValue={search || ''}
                placeholder="Tìm kiếm bài viết (VD: Landing Page, SEO, E-Commerce...)"
                className="w-full px-3 py-2 text-sm text-[#0f172a] placeholder-[#94a3b8] bg-transparent border-none focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#006672] hover:bg-[#004d56] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shrink-0 cursor-pointer shadow-sm"
              >
                Tìm Kiếm
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ══ CATEGORY FILTER TABS ══════════════════════════════════════════════ */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-2">
          <Link
            href="/blog"
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
              !categorySlug && !search && !tag
                ? 'bg-[#006672] text-white shadow-md shadow-[#006672]/20'
                : 'bg-white text-[#64748b] border border-[#e2ecec] hover:border-[#006672] hover:text-[#006672]'
            }`}
          >
            Tất cả bài viết
          </Link>
          {categories.map((cat: any) => (
            <Link
              key={cat.id}
              href={`/blog?category=${cat.slug}`}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
                categorySlug === cat.slug
                  ? 'bg-[#006672] text-white shadow-md shadow-[#006672]/20'
                  : 'bg-white text-[#64748b] border border-[#e2ecec] hover:border-[#006672] hover:text-[#006672]'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </section>

      {/* ══ MAIN CONTENT AREA ══════════════════════════════════════════════════ */}
      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pb-24">

        {/* Active Filter Bar */}
        {(search || categorySlug || tag) && (
          <div className="flex flex-wrap items-center gap-2.5 mb-8 bg-[#f0f7f8] border border-[#80c2cb]/40 px-5 py-3 rounded-2xl">
            <span className="text-xs font-bold text-[#006672]">Đang lọc bài viết:</span>
            {search && (
              <span className="bg-white text-[#006672] px-3 py-1 rounded-full text-xs font-semibold border border-[#e2ecec]">
                Từ khóa: &ldquo;{search}&rdquo;
              </span>
            )}
            {categorySlug && (
              <span className="bg-white text-[#006672] px-3 py-1 rounded-full text-xs font-semibold border border-[#e2ecec]">
                Danh mục: {categorySlug}
              </span>
            )}
            {tag && (
              <span className="bg-white text-[#006672] px-3 py-1 rounded-full text-xs font-semibold border border-[#e2ecec]">
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
            {/* ── FEATURED SPOTLIGHT ARTICLE ─────────────────────────────── */}
            {featuredPost && !search && !categorySlug && !tag && page === 1 && (
              <FeaturedArticle post={featuredPost} />
            )}

            {/* ── SECTION TITLE ─────────────────────────────────────────── */}
            <div className="flex justify-between items-center border-b border-[#e2ecec] pb-4 mb-8">
              <h2 className="text-xl sm:text-2xl font-black text-[#0f172a] flex items-center gap-2">
                <Layers className="size-5 text-[#006672]" />
                {search || categorySlug || tag ? 'Kết Quả Tìm Kiếm' : 'Bài Viết Mới Nhất'}
              </h2>
              <span className="text-xs text-[#64748b] font-bold bg-white px-3 py-1.5 rounded-full border border-[#e2ecec]">
                {pagination.total} bài viết
              </span>
            </div>

            {/* ── 3-COLUMN ARTICLE GRID ───────────────────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(search || categorySlug || tag || page !== 1 ? posts : gridPosts).map((post: any) => {
                const cover = getBlogCoverImage(post.title, post.category?.slug, post.coverImage || post.featuredImage);
                const readingTime = BlogService.calculateReadingTime(post.content);
                return (
                  <article
                    key={post.id}
                    className="bg-white rounded-3xl border border-[#e2ecec] overflow-hidden hover:border-[#80c2cb] hover:shadow-xl transition-all duration-300 flex flex-col h-full group"
                  >
                    {/* Cover Image */}
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100 shrink-0">
                      <span className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-sm text-[#006672] text-[10px] font-extrabold px-3 py-1 rounded-full shadow-sm border border-slate-200/60 uppercase tracking-wider">
                        {post.category?.name || 'TIN TỨC'}
                      </span>
                      <SafeImage
                        src={cover}
                        fallbackSrc={cover}
                        alt={post.title}
                        fill
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Meta */}
                        <div className="flex items-center gap-3 text-xs text-[#64748b] mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="size-3.5 text-[#006672]" />
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
                            <Clock className="size-3.5 text-[#64748b]" />
                            {readingTime} phút đọc
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="font-extrabold text-[#0f172a] text-base leading-snug mb-2.5 line-clamp-2 group-hover:text-[#006672] transition-colors">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>

                        {/* Summary */}
                        <p className="text-xs sm:text-sm text-[#64748b] line-clamp-2 leading-relaxed mb-4">
                          {post.summary}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="pt-4 mt-auto border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[11px] text-[#64748b] font-semibold">
                          {post.author || 'KABO Team'}
                        </span>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#006672] group-hover:text-[#004d56] transition-colors"
                        >
                          Đọc thêm <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-14">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`/blog?page=${p}${categorySlug ? `&category=${categorySlug}` : ''}${search ? `&search=${encodeURIComponent(search)}` : ''}${tag ? `&tag=${encodeURIComponent(tag)}` : ''}`}
                    className={`w-10 h-10 rounded-2xl text-xs font-bold flex items-center justify-center border transition-all ${
                      p === pagination.page
                        ? 'bg-[#006672] text-white border-[#006672] shadow-md shadow-[#006672]/20'
                        : 'bg-white text-[#64748b] border-[#e2ecec] hover:border-[#006672] hover:text-[#006672]'
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
  const cover = getBlogCoverImage(post.title, post.category?.slug, post.coverImage || post.featuredImage);
  const readingTime = BlogService.calculateReadingTime(post.content);

  return (
    <div className="bg-white rounded-3xl border border-[#e2ecec] overflow-hidden hover:shadow-2xl transition-all duration-300 mb-14 group">
      <div className="flex flex-col lg:flex-row relative">
        {/* Badge */}
        <div className="absolute top-4 left-4 z-10 bg-[#ca8a04] text-white px-3.5 py-1.5 rounded-full text-xs font-extrabold flex items-center shadow-lg gap-1.5">
          <Flame className="size-3.5 text-yellow-200 fill-yellow-200" />
          <span>BÀI VIẾT NỔI BẬT</span>
        </div>

        {/* Image Half */}
        <div className="lg:w-1/2 relative min-h-[260px] sm:min-h-[340px] lg:min-h-[400px] overflow-hidden bg-slate-100">
          <SafeImage
            src={cover}
            fallbackSrc={cover}
            alt={post.title}
            fill
            priority
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>

        {/* Content Half */}
        <div className="lg:w-1/2 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-white">
          {post.category && (
            <span className="text-[#006672] font-extrabold text-xs uppercase tracking-wider mb-3">
              {post.category.name}
            </span>
          )}

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#0f172a] leading-tight mb-4 group-hover:text-[#006672] transition-colors">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>

          <p className="text-xs sm:text-sm text-[#64748b] line-clamp-3 leading-relaxed mb-6">
            {post.summary}
          </p>

          <div className="flex items-center justify-between border-t border-slate-100 pt-5 mt-auto">
            <div className="flex items-center gap-3 text-xs text-[#64748b]">
              <span className="flex items-center gap-1 font-medium">
                <Calendar className="size-3.5 text-[#006672]" />
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString('vi-VN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })
                  : 'Mới đăng'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 font-medium">
                <Clock className="size-3.5 text-[#64748b]" />
                {readingTime} phút đọc
              </span>
            </div>

            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-white bg-[#006672] hover:bg-[#004d56] px-5 py-2.5 rounded-full transition-all shadow-md shadow-[#006672]/20"
            >
              Đọc ngay <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Empty State Component ───────────────────────────────────────────────────
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
    <div className="bg-white rounded-3xl border border-[#e2ecec] p-12 text-center max-w-lg mx-auto my-12 shadow-sm">
      <div className="size-16 rounded-2xl bg-[#f0f7f8] text-[#006672] flex items-center justify-center mx-auto mb-5">
        <BookOpen className="size-8" />
      </div>
      <h3 className="font-black text-xl text-[#0f172a] mb-2">Không tìm thấy bài viết</h3>
      <p className="text-xs sm:text-sm text-[#64748b] leading-relaxed mb-6">
        {search
          ? `Không có kết quả nào phù hợp với từ khóa "${search}".`
          : categorySlug
          ? `Chưa có bài viết nào thuộc danh mục này.`
          : `Không tìm thấy bài viết theo tiêu chí của bạn.`}
      </p>
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#006672] hover:bg-[#004d56] px-6 py-3 rounded-full transition-all shadow-md shadow-[#006672]/20"
      >
        Xem tất cả bài viết
      </Link>
    </div>
  );
}
