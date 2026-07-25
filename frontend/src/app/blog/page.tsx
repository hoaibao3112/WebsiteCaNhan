import { Metadata } from 'next';
import Link from 'next/link';
import { BlogService } from '@/services/blog.service';
import SafeImage from '@/components/ui/SafeImage';
import {
  Calendar,
  ArrowRight,
  BookOpen,
  Search,
  Sparkles,
  Clock,
  X,
  Rss,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog & Tin Tức Công Nghệ — Kiến Thức Thiết Kế Web Chuẩn SEO',
  description:
    'Tổng hợp bài viết chia sẻ kinh nghiệm thiết kế website, tối ưu SEO Google, chiến lược bán hàng online và xu hướng công nghệ mới nhất.',
  openGraph: {
    title: 'Blog & Tin Tức — Kinh Nghiệm Thiết Kế Web & Tối Ưu SEO',
    description:
      'Tổng hợp bài viết chia sẻ kinh nghiệm thiết kế website, tối ưu SEO Google, chiến lược bán hàng online.',
  },
};

const NAVBAR_HEIGHT = 68; // px — must match Navbar h-[68px]
const DEFAULT_ACCOUNT_ID = process.env.DEFAULT_ACCOUNT_ID || 'default-account';
export const revalidate = 60;

// ─── Small helpers ────────────────────────────────────────────────────────────

function PostMeta({ publishedAt, content }: { publishedAt: Date | null; content: string }) {
  return (
    <div className="flex items-center gap-3 text-[11px] text-gray-400 font-medium">
      <span className="flex items-center gap-1">
        <Calendar className="size-3 text-[#006672]" />
        {publishedAt
          ? new Date(publishedAt).toLocaleDateString('vi-VN', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })
          : 'Mới đăng'}
      </span>
      <span className="flex items-center gap-1">
        <Clock className="size-3 text-emerald-500" />
        {BlogService.calculateReadingTime(content)} phút đọc
      </span>
    </div>
  );
}

function CategoryBadge({ name, position = 'top-3 left-3' }: { name: string; position?: string }) {
  return (
    <span
      className={`absolute ${position} z-10 bg-white/95 backdrop-blur-sm text-[#006672] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm`}
    >
      {name}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

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

  const heroPost =
    page === 1 && !categorySlug && !tag && !search && posts.length > 0 ? posts[0] : null;
  const gridPosts = heroPost ? posts.slice(1) : posts;

  return (
    <div className="min-h-screen bg-[#f5f7f8]" style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}>

      {/* ══ HERO HEADER ══════════════════════════════════════════════════════ */}
      <div
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #002d33 0%, #004d56 55%, #006672 100%)' }}
      >
        {/* dot-grid texture */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />

        <div className="relative max-w-4xl mx-auto px-4 md:px-8 py-14 text-center">
          {/* eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-emerald-300 text-[11px] font-bold tracking-[0.15em] uppercase px-4 py-1.5 rounded-full mb-5">
            <Rss className="size-3" /> KABO BLOG & INSIGHTS
          </div>

          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 tracking-tight"
            style={{ fontFamily: 'var(--font-heading, Georgia, serif)' }}
          >
            Góc Chia Sẻ Kiến Thức
            <br />
            <span className="text-emerald-300">Web & SEO</span>
          </h1>

          <p className="text-white/65 text-sm md:text-base max-w-2xl mx-auto leading-relaxed mb-8">
            Cập nhật liên tục kinh nghiệm thiết kế website, chiến lược Marketing số
            và công nghệ mới nhất dành cho doanh nghiệp Việt Nam.
          </p>

          {/* Search */}
          <form action="/blog" method="GET" className="max-w-xl mx-auto">
            {categorySlug && <input type="hidden" name="category" value={categorySlug} />}
            <div className="flex items-center bg-white rounded-2xl shadow-xl shadow-black/20 overflow-hidden">
              <Search className="size-4 text-gray-400 ml-4 shrink-0" />
              <input
                type="text"
                name="search"
                defaultValue={search || ''}
                placeholder="Tìm kiếm bài viết... (ví dụ: SEO, Next.js, Bán hàng)"
                className="flex-1 px-3 py-3.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none bg-transparent"
              />
              <button
                type="submit"
                className="m-1 bg-[#006672] hover:bg-[#004d56] text-white text-xs font-bold px-5 py-3 rounded-xl transition-colors shrink-0"
              >
                Tìm
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ══ MAIN CONTENT ═════════════════════════════════════════════════════ */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8">

        {/* Active Filters */}
        {(search || categorySlug || tag) && (
          <div className="flex flex-wrap items-center gap-2 mb-5 bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-xl">
            <span className="text-xs font-bold text-emerald-900">Bộ lọc đang bật:</span>
            {search && (
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold">
                &ldquo;{search}&rdquo;
              </span>
            )}
            {categorySlug && (
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold">
                {categorySlug}
              </span>
            )}
            {tag && (
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold">
                #{tag}
              </span>
            )}
            <Link href="/blog" className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-red-600">
              <X className="size-3.5" /> Xóa
            </Link>
          </div>
        )}

        {/* Category Pills */}
        {categories.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 mb-8 no-scrollbar">
            <Link
              href="/blog"
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                !categorySlug && !search && !tag
                  ? 'bg-[#006672] text-white border-[#006672]'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#006672] hover:text-[#006672]'
              }`}
            >
              Tất cả
            </Link>
            {categories.map((cat: any) => (
              <Link
                key={cat.id}
                href={`/blog?category=${cat.slug}`}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                  categorySlug === cat.slug
                    ? 'bg-[#006672] text-white border-[#006672]'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#006672] hover:text-[#006672]'
                }`}
              >
                {cat.name}
                <span className="ml-1 opacity-50 text-[10px]">({cat._count?.posts ?? 0})</span>
              </Link>
            ))}
          </div>
        )}

        {/* ── FEATURED HERO POST ──────────────────────────────────────────── */}
        {heroPost && (
          <div className="mb-10">
            {/* section label */}
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-[#006672] mb-3">
              Bài viết Blog KABO Tech &amp; Business
            </p>

            <article className="group grid grid-cols-1 lg:grid-cols-2 bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-lg transition-shadow duration-300">

              {/* LEFT — text */}
              <div className="flex flex-col justify-between p-7 lg:p-9 order-2 lg:order-1">
                <div className="space-y-4">
                  {heroPost.category && (
                    <span className="inline-block bg-emerald-50 text-[#006672] text-[11px] font-extrabold tracking-wider px-3 py-1 rounded-full border border-emerald-200/80 uppercase">
                      {heroPost.category.name}
                    </span>
                  )}

                  <h2
                    className="text-xl lg:text-2xl font-extrabold text-gray-900 group-hover:text-[#006672] transition-colors leading-snug"
                    style={{ fontFamily: 'var(--font-heading, Georgia, serif)' }}
                  >
                    <Link href={`/blog/${heroPost.slug}`}>{heroPost.title}</Link>
                  </h2>

                  {heroPost.summary && (
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                      {heroPost.summary}
                    </p>
                  )}
                </div>

                <div className="mt-6 space-y-4">
                  <PostMeta publishedAt={heroPost.publishedAt} content={heroPost.content} />

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#006672] to-[#004d56] flex items-center justify-center text-white text-xs font-extrabold">
                        {(heroPost.author || 'K').charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-700">{heroPost.author || 'KABO Editorial'}</p>
                        <p className="text-[10px] text-gray-400">Tác giả</p>
                      </div>
                    </div>
                    <Link
                      href={`/blog/${heroPost.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#006672] hover:text-[#004d56] transition-colors"
                    >
                      Đọc tiếp <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* RIGHT — cover image */}
              <div
                className="relative overflow-hidden order-1 lg:order-2"
                style={{
                  minHeight: '280px',
                  background: 'linear-gradient(135deg, #003d45, #006672)',
                }}
              >
                <SafeImage
                  src={heroPost.coverImage || heroPost.featuredImage || ''}
                  alt={heroPost.title}
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* gradient overlay bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
            </article>
          </div>
        )}

        {/* ── POST GRID ───────────────────────────────────────────────────── */}
        {posts.length === 0 ? (
          <EmptyState search={search} categorySlug={categorySlug} tag={tag} />
        ) : gridPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {gridPosts.map((post: any) => {
                const cover = post.coverImage || post.featuredImage;
                return (
                  <article
                    key={post.id}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  >
                    {/* Thumbnail */}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="block relative overflow-hidden shrink-0"
                      style={{ paddingTop: '56.25%' /* 16∶9 */ }}
                    >
                      <div className="absolute inset-0">
                        <SafeImage
                          src={cover || ''}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      {post.category && <CategoryBadge name={post.category.name} position="top-4 left-4" />}
                    </Link>

                    {/* Body */}
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <PostMeta publishedAt={post.publishedAt} content={post.content} />

                        <h2
                          className="mt-3 mb-2 text-base md:text-lg font-bold text-gray-900 group-hover:text-[#006672] transition-colors leading-snug line-clamp-2"
                          style={{ fontFamily: 'var(--font-heading, Georgia, serif)' }}
                        >
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h2>

                        {post.summary && (
                          <p className="text-xs md:text-sm text-gray-500 line-clamp-2 leading-relaxed mb-4">
                            {post.summary}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#006672] to-[#004d56] flex items-center justify-center text-white text-[10px] font-extrabold">
                            {(post.author || 'K').charAt(0)}
                          </div>
                          <span className="text-xs text-gray-600 font-semibold">
                            {post.author || 'KABO Editorial'}
                          </span>
                        </div>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#006672] hover:text-[#004d56] transition-colors group-hover:translate-x-0.5 duration-200"
                        >
                          Đọc tiếp <ArrowRight className="size-3.5" />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`/blog?page=${p}${categorySlug ? `&category=${categorySlug}` : ''}${search ? `&search=${encodeURIComponent(search)}` : ''}${tag ? `&tag=${encodeURIComponent(tag)}` : ''}`}
                    className={`w-9 h-9 rounded-xl text-sm font-bold flex items-center justify-center border transition-all ${
                      p === pagination.page
                        ? 'bg-[#006672] text-white border-[#006672]'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#006672] hover:text-[#006672]'
                    }`}
                  >
                    {p}
                  </Link>
                ))}
              </div>
            )}
          </>
        ) : null}
      </main>

      {/* ══ NEWSLETTER CTA ═══════════════════════════════════════════════════ */}
      <section
        className="mt-10 py-16 px-4"
        style={{ background: 'linear-gradient(135deg, #002d33 0%, #004d56 60%, #006672 100%)' }}
      >
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-emerald-300 text-[11px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-5">
            <Rss className="size-3" /> BẢN TIN HÀNG TUẦN
          </div>
          <h2
            className="text-2xl md:text-3xl font-extrabold text-white mb-3 leading-snug"
            style={{ fontFamily: 'var(--font-heading, Georgia, serif)' }}
          >
            Đăng ký nhận bản tin chuyên sâu
          </h2>
          <p className="text-white/60 text-sm leading-relaxed mb-7">
            Tóm tắt kiến thức web, SEO và Marketing gửi thẳng vào hộp thư mỗi tuần.
            Không spam, chỉ nội dung chất lượng.
          </p>
          <form className="flex items-center gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="email@cua-ban.com"
              className="flex-1 px-4 py-3 rounded-xl text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <button
              type="submit"
              className="shrink-0 bg-emerald-400 hover:bg-emerald-300 text-gray-900 font-extrabold text-sm px-5 py-3 rounded-xl transition-colors"
            >
              Đăng ký
            </button>
          </form>
          <p className="text-white/35 text-[11px] mt-3">
            Miễn phí · Huỷ bất cứ lúc nào · 100% không spam
          </p>
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
    <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
      <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <BookOpen className="size-8 text-[#006672]" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">Chưa có bài viết nào</h3>
      <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
        {search || categorySlug || tag
          ? 'Không tìm thấy bài viết phù hợp với bộ lọc.'
          : 'Bài viết đang được biên soạn và sẽ cập nhật sớm.'}
      </p>
      {(search || categorySlug || tag) && (
        <Link
          href="/blog"
          className="inline-flex items-center px-5 py-2.5 rounded-xl bg-[#006672] text-white text-sm font-semibold hover:bg-[#004d56] transition-colors"
        >
          Xem tất cả bài viết
        </Link>
      )}
    </div>
  );
}
