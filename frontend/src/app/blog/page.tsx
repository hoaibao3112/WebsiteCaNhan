import { Metadata } from 'next';
import Link from 'next/link';
import { BlogService } from '@/services/blog.service';
import SafeImage from '@/components/ui/SafeImage';
import { ArrowRight, Search, X, Calendar, Clock, Sparkles } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800" style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}>

      {/* ══ HERO BANNER ═══════════════════════════════════════════════════════ */}
      <section className="relative w-full bg-gradient-to-r from-[#002b2e] via-[#004d56] to-[#006672] text-white py-16 md:py-20 px-6 overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-[1200px] mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-md text-cyan-200 border border-cyan-400/30 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="size-3.5 text-cyan-300" /> KABO BLOG &amp; INSIGHTS
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-5 tracking-tight text-white leading-tight">
            Góc Chia Sẻ Kiến Thức <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-teal-300">Web &amp; SEO</span>
          </h1>
          <p className="text-base md:text-lg text-slate-200 max-w-2xl mx-auto mb-8 leading-relaxed">
            Tổng hợp kinh nghiệm thiết kế website chuyên nghiệp, chiến lược SEO Marketing bền vững và cập nhật công nghệ mới nhất.
          </p>

          {/* Search Bar */}
          <form action="/blog" method="GET" className="relative max-w-xl mx-auto">
            {categorySlug && <input type="hidden" name="category" value={categorySlug} />}
            <div className="relative flex items-center shadow-lg rounded-2xl overflow-hidden bg-white/95 backdrop-blur-md p-1.5 border border-white/40">
              <Search className="size-5 text-slate-400 ml-3.5 shrink-0" />
              <input
                type="text"
                name="search"
                defaultValue={search || ''}
                placeholder="Tìm bài viết theo từ khóa (VD: Next.js, SEO, UI/UX...)"
                className="w-full px-3 py-2.5 text-sm text-slate-900 placeholder-slate-400 bg-transparent border-none focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#004d56] hover:bg-[#003434] text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-sm shrink-0 cursor-pointer"
              >
                Tìm Kiếm
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ══ STICKY CATEGORY PILL NAVIGATION ══════════════════════════════════ */}
      <section className="sticky top-[68px] z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-3.5">
            <Link
              href="/blog"
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
                !categorySlug && !search && !tag
                  ? 'bg-[#004d56] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              Tất cả bài viết
            </Link>
            {categories.map((cat: any) => (
              <Link
                key={cat.id}
                href={`/blog?category=${cat.slug}`}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all whitespace-nowrap ${
                  categorySlug === cat.slug
                    ? 'bg-[#004d56] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MAIN CONTENT AREA ══════════════════════════════════════════════ */}
      <main className="max-w-[1200px] mx-auto px-6 py-12">

        {/* Active Filters Bar */}
        {(search || categorySlug || tag) && (
          <div className="flex flex-wrap items-center gap-3 mb-8 bg-teal-50/80 border border-teal-200/70 px-5 py-3.5 rounded-2xl shadow-xs">
            <span className="text-xs font-bold text-teal-900">Đang lọc bài viết:</span>
            {search && (
              <span className="bg-white text-teal-800 px-3 py-1 rounded-full text-xs font-semibold border border-teal-200 shadow-2xs">
                Từ khóa: &ldquo;{search}&rdquo;
              </span>
            )}
            {categorySlug && (
              <span className="bg-white text-teal-800 px-3 py-1 rounded-full text-xs font-semibold border border-teal-200 shadow-2xs">
                Danh mục: {categorySlug}
              </span>
            )}
            {tag && (
              <span className="bg-white text-teal-800 px-3 py-1 rounded-full text-xs font-semibold border border-teal-200 shadow-2xs">
                #{tag}
              </span>
            )}
            <Link href="/blog" className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors">
              <X className="size-3.5" /> Xóa bộ lọc
            </Link>
          </div>
        )}

        {/* ── UNIFORM 3-COLUMN GRID FOR ALL ARTICLES ──────────────────────── */}
        {posts.length === 0 ? (
          <EmptyState search={search} categorySlug={categorySlug} tag={tag} />
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-extrabold text-slate-900">
                Danh Sách Bài Viết
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                Hiển thị {posts.length} bài viết
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: any) => {
                const cover = post.coverImage || post.featuredImage;
                const readingTime = BlogService.calculateReadingTime(post.content);
                return (
                  <article
                    key={post.id}
                    className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                  >
                    {/* Fixed aspect ratio cover container */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <SafeImage
                        src={cover || ''}
                        alt={post.title}
                        fill
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 z-10">
                        <span className="bg-white/95 backdrop-blur-md text-[#004d56] text-xs font-bold px-3 py-1 rounded-full shadow-2xs">
                          {post.category?.name || 'TIN TỨC'}
                        </span>
                      </div>
                    </div>

                    {/* Content section */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                          <Calendar className="size-3.5 text-[#006672]" />
                          <span>
                            {post.publishedAt
                              ? new Date(post.publishedAt).toLocaleDateString('vi-VN', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                })
                              : 'Mới đăng'}
                          </span>
                          <span>•</span>
                          <Clock className="size-3.5 text-slate-400" />
                          <span>{readingTime} phút đọc</span>
                        </div>

                        <h4 className="text-lg font-bold text-slate-900 group-hover:text-[#004d56] transition-colors line-clamp-2 leading-snug mb-3">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h4>

                        <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-4">
                          {post.summary}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                        <span className="text-xs text-slate-500 font-medium">
                          {post.author || 'KABO Team'}
                        </span>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#004d56] hover:text-[#006672] transition-colors"
                        >
                          Đọc ngay <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination / Load More */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-16">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`/blog?page=${p}${categorySlug ? `&category=${categorySlug}` : ''}${search ? `&search=${encodeURIComponent(search)}` : ''}${tag ? `&tag=${encodeURIComponent(tag)}` : ''}`}
                    className={`w-10 h-10 rounded-xl text-xs font-bold flex items-center justify-center border transition-all ${
                      p === pagination.page
                        ? 'bg-[#004d56] text-white border-[#004d56] shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-[#004d56] hover:text-[#004d56]'
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
      <section className="bg-gradient-to-r from-[#002b2e] to-[#004d56] text-white py-16 px-6 border-t border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block bg-white/10 text-cyan-200 px-3 py-1 rounded-full text-xs font-semibold mb-4 border border-cyan-400/20">
            NEWSLETTER
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3 text-white">
            Đăng Ký Nhận Bản Tin Chuyên Sâu
          </h2>
          <p className="text-sm md:text-base text-slate-200 mb-8 max-w-xl mx-auto leading-relaxed">
            Nhận tổng hợp kiến thức giá trị nhất về Web, SEO và Công nghệ AI hàng tuần. Không spam, hủy đăng ký bất kỳ lúc nào.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Nhập địa chỉ email của bạn..."
              className="flex-grow rounded-xl border-none px-4 py-3 text-slate-900 bg-white focus:outline-none text-sm placeholder-slate-400"
            />
            <button
              type="submit"
              className="bg-cyan-400 hover:bg-cyan-300 text-[#002b2e] px-6 py-3 rounded-xl font-bold transition-all text-xs uppercase tracking-wider shrink-0 cursor-pointer shadow-sm"
            >
              Đăng Ký
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
    <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-xs max-w-md mx-auto my-8">
      <h3 className="text-lg font-bold text-slate-900 mb-2">Không tìm thấy bài viết</h3>
      <p className="text-sm text-slate-500 mb-6 max-w-sm mx-auto leading-relaxed">
        {search || categorySlug || tag
          ? 'Không tìm thấy bài viết nào phù hợp với bộ lọc tìm kiếm của bạn.'
          : 'Bài viết đang được cập nhật. Vui lòng quay lại sau.'}
      </p>
      {(search || categorySlug || tag) && (
        <Link
          href="/blog"
          className="inline-flex items-center px-6 py-2.5 rounded-xl bg-[#004d56] text-white text-xs font-bold hover:bg-[#003434] transition-colors"
        >
          Xem tất cả bài viết
        </Link>
      )}
    </div>
  );
}
