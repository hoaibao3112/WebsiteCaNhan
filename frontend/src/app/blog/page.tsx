import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BlogService } from '@/services/blog.service';
import { Calendar, ArrowRight, BookOpen, Search, Sparkles, Clock, X, TrendingUp } from 'lucide-react';

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

  const heroPost = page === 1 && !categorySlug && !tag && !search && posts.length > 0 ? posts[0] : null;
  const gridPosts = heroPost ? posts.slice(1) : posts;

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── HERO HEADER ─────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#003d45] via-[#005962] to-[#006e7a] pt-32 pb-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-emerald-200 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
            <Sparkles className="size-3.5" />
            KABO BLOG & INSIGHTS
          </div>

          {/* Title */}
          <h1 className="font-[family-name:var(--font-heading)] text-3xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Góc Chia Sẻ Kiến Thức
            <br />
            <span className="text-emerald-300">Web & SEO</span>
          </h1>
          <p className="text-emerald-100/80 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8">
            Bài viết kinh nghiệm thiết kế website, chiến lược Marketing và công nghệ mới nhất.
          </p>

          {/* Search */}
          <form action="/blog" method="GET" className="max-w-lg mx-auto">
            <div className="flex items-center bg-white rounded-2xl shadow-lg overflow-hidden border border-white/30">
              <Search className="size-4 text-gray-400 ml-4 shrink-0" />
              {categorySlug && <input type="hidden" name="category" value={categorySlug} />}
              <input
                type="text"
                name="search"
                defaultValue={search || ''}
                placeholder="Tìm kiếm bài viết..."
                className="flex-1 px-3 py-3.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none bg-transparent"
              />
              <button
                type="submit"
                className="bg-[#006672] hover:bg-[#004d56] text-white text-xs font-bold px-5 py-3.5 transition-colors shrink-0"
              >
                Tìm kiếm
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ── MAIN CONTENT ──────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-10">

        {/* Active Filters */}
        {(search || categorySlug || tag) && (
          <div className="flex flex-wrap items-center gap-2 mb-6 bg-emerald-50 border border-emerald-200 px-4 py-3 rounded-xl text-sm">
            <span className="font-semibold text-emerald-900 text-xs">Bộ lọc:</span>
            {search && (
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold">
                Từ khóa: &ldquo;{search}&rdquo;
              </span>
            )}
            {categorySlug && (
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold">
                Danh mục: {categorySlug}
              </span>
            )}
            {tag && (
              <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold">
                #{tag}
              </span>
            )}
            <Link
              href="/blog"
              className="ml-auto inline-flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-700"
            >
              <X className="size-3.5" /> Xóa bộ lọc
            </Link>
          </div>
        )}

        {/* Category Pills */}
        {categories.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 no-scrollbar">
            <Link
              href="/blog"
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                !categorySlug && !search && !tag
                  ? 'bg-[#006672] text-white border-[#006672] shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#006672] hover:text-[#006672]'
              }`}
            >
              Tất cả
            </Link>
            {categories.map((cat: any) => (
              <Link
                key={cat.id}
                href={`/blog?category=${cat.slug}`}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                  categorySlug === cat.slug
                    ? 'bg-[#006672] text-white border-[#006672] shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-[#006672] hover:text-[#006672]'
                }`}
              >
                {cat.name}
                <span className="ml-1.5 text-[10px] opacity-60">({cat._count?.posts ?? 0})</span>
              </Link>
            ))}
          </div>
        )}

        {/* ── HERO FEATURED POST ────────────────────────────── */}
        {heroPost && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="size-4 text-[#006672]" />
              <span className="text-xs font-extrabold text-[#006672] uppercase tracking-widest">Bài viết nổi bật</span>
            </div>
            <article className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[300px]">
                {/* Image column */}
                <div className="relative lg:col-span-3 overflow-hidden bg-gradient-to-br from-emerald-900 to-[#006672]" style={{ minHeight: '240px' }}>
                  {(heroPost.coverImage || heroPost.featuredImage) && (
                    <Image
                      src={heroPost.coverImage || heroPost.featuredImage}
                      alt={heroPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      priority
                    />
                  )}
                  {heroPost.category && (
                    <span className="absolute top-4 left-4 z-10 bg-[#006672] text-white text-[11px] font-bold px-3 py-1 rounded-full">
                      🔥 {heroPost.category.name}
                    </span>
                  )}
                </div>

                {/* Text column */}
                <div className="lg:col-span-2 p-6 lg:p-8 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-[11px] text-gray-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3.5 text-[#006672]" />
                        {heroPost.publishedAt
                          ? new Date(heroPost.publishedAt).toLocaleDateString('vi-VN', {
                              day: '2-digit',
                              month: 'long',
                              year: 'numeric',
                            })
                          : 'Mới cập nhật'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3.5 text-emerald-600" />
                        {BlogService.calculateReadingTime(heroPost.content)} phút đọc
                      </span>
                    </div>

                    <h2 className="font-[family-name:var(--font-heading)] text-xl lg:text-2xl font-bold text-gray-900 group-hover:text-[#006672] transition-colors leading-snug">
                      <Link href={`/blog/${heroPost.slug}`}>{heroPost.title}</Link>
                    </h2>

                    {heroPost.summary && (
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
                        {heroPost.summary}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-5 mt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#006672] flex items-center justify-center text-white text-xs font-bold">
                        {(heroPost.author || 'K').charAt(0)}
                      </div>
                      <span className="text-xs font-semibold text-gray-600">{heroPost.author || 'KABO Editorial'}</span>
                    </div>
                    <Link
                      href={`/blog/${heroPost.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#006672] hover:text-[#004d56] transition-colors"
                    >
                      Đọc ngay <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </div>
        )}

        {/* ── POST GRID ──────────────────────────────────────── */}
        {posts.length === 0 ? (
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
              <Link href="/blog" className="inline-flex items-center px-5 py-2.5 rounded-xl bg-[#006672] text-white text-sm font-semibold hover:bg-[#004d56] transition-colors">
                Xem tất cả bài viết
              </Link>
            )}
          </div>
        ) : (
          <>
            {gridPosts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {gridPosts.map((post: any) => {
                  const cover = post.coverImage || post.featuredImage;
                  const readingTime = BlogService.calculateReadingTime(post.content);
                  return (
                    <article
                      key={post.id}
                      className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
                    >
                      {/* Thumbnail */}
                      <Link href={`/blog/${post.slug}`} className="block relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                        {cover ? (
                          <Image
                            src={cover}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-gradient-to-br from-[#004d56] to-[#006672] flex items-center justify-center">
                            <Sparkles className="size-10 text-white/30" />
                          </div>
                        )}
                        {post.category && (
                          <span className="absolute top-3 left-3 bg-white/95 text-[#006672] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                            {post.category.name}
                          </span>
                        )}
                      </Link>

                      {/* Body */}
                      <div className="p-5 flex-1 flex flex-col">
                        <div className="flex items-center gap-3 text-[11px] text-gray-400 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="size-3 text-[#006672]" />
                            {post.publishedAt
                              ? new Date(post.publishedAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
                              : 'Mới đăng'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="size-3 text-emerald-600" />
                            {readingTime} phút
                          </span>
                        </div>

                        <h2 className="font-[family-name:var(--font-heading)] text-base font-bold text-gray-900 group-hover:text-[#006672] transition-colors leading-snug mb-2 line-clamp-2 flex-1">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h2>

                        {post.summary && (
                          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4">
                            {post.summary}
                          </p>
                        )}

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                          <span className="text-[11px] text-gray-400 font-medium">
                            <strong className="text-gray-600">{post.author || 'KABO Editorial'}</strong>
                          </span>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-[#006672] hover:text-[#004d56] transition-colors"
                          >
                            Đọc bài <ArrowRight className="size-3.5" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={`/blog?page=${p}${categorySlug ? `&category=${categorySlug}` : ''}${search ? `&search=${encodeURIComponent(search)}` : ''}${tag ? `&tag=${encodeURIComponent(tag)}` : ''}`}
                    className={`w-9 h-9 rounded-xl text-sm font-semibold flex items-center justify-center border transition-all ${
                      p === pagination.page
                        ? 'bg-[#006672] text-white border-[#006672] shadow-sm'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-[#006672] hover:text-[#006672]'
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
