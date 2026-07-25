import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BlogService } from '@/services/blog.service';
import { Calendar, Tag, ArrowRight, BookOpen, Search, Sparkles, Clock, X } from 'lucide-react';

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

export const revalidate = 60; // ISR 60 seconds

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
    BlogService.getPosts(DEFAULT_ACCOUNT_ID, {
      page,
      limit: 9,
      categorySlug,
      tag,
      search,
    }),
    BlogService.getCategories(DEFAULT_ACCOUNT_ID),
  ]);

  const heroPost = page === 1 && !categorySlug && !tag && !search && posts.length > 0 ? posts[0] : null;
  const gridPosts = heroPost ? posts.slice(1) : posts;

  return (
    <div className="min-h-screen bg-[#f8fafb] pt-28 pb-20">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#004d56] to-[#006672] text-white py-16 px-6 lg:px-10 rounded-b-3xl shadow-lg">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold tracking-wide text-emerald-200 border border-white/10">
            <Sparkles className="size-3.5 text-emerald-300" />
            <span>KABO BLOG & INSIGHTS</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Góc Chia Sẻ Kiến Thức Web & SEO
          </h1>
          <p className="text-base md:text-lg text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Cập nhật liên tục bài viết kinh nghiệm thiết kế website, chiến lược Marketing số và công nghệ mới nhất.
          </p>

          {/* Search Bar Form */}
          <form action="/blog" method="GET" className="max-w-xl mx-auto pt-2">
            <div className="relative flex items-center bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-1.5 focus-within:bg-white focus-within:text-gray-900 transition-all">
              <Search className="size-5 text-emerald-200 ml-3 shrink-0" />
              <input
                type="text"
                name="search"
                defaultValue={search || ''}
                placeholder="Tìm kiếm bài viết (ví dụ: SEO, Next.js, Bán hàng)..."
                className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder:text-emerald-100/70 focus:outline-none focus:text-gray-900 focus:placeholder:text-gray-400"
              />
              {categorySlug && <input type="hidden" name="category" value={categorySlug} />}
              <button
                type="submit"
                className="bg-emerald-400 hover:bg-emerald-300 text-gray-900 font-bold text-xs px-4 py-2.5 rounded-xl transition-colors shrink-0"
              >
                Tìm kiếm
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-6 lg:px-10 mt-12">
        {/* Active Filter Indicators */}
        {(search || categorySlug || tag) && (
          <div className="flex flex-wrap items-center gap-2 mb-6 bg-emerald-50 border border-emerald-200/80 p-3.5 rounded-2xl text-sm">
            <span className="font-semibold text-emerald-900">Đang lọc theo:</span>
            {search && (
              <span className="bg-white text-[#006672] px-3 py-1 rounded-lg text-xs font-bold border border-emerald-200 flex items-center gap-1">
                Từ khóa: "{search}"
              </span>
            )}
            {categorySlug && (
              <span className="bg-white text-[#006672] px-3 py-1 rounded-lg text-xs font-bold border border-emerald-200 flex items-center gap-1">
                Danh mục: {categorySlug}
              </span>
            )}
            {tag && (
              <span className="bg-white text-[#006672] px-3 py-1 rounded-lg text-xs font-bold border border-emerald-200 flex items-center gap-1">
                Thẻ: #{tag}
              </span>
            )}
            <Link
              href="/blog"
              className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-700 bg-white px-3 py-1 rounded-lg border border-red-100"
            >
              <X className="size-3.5" /> Xóa bộ lọc
            </Link>
          </div>
        )}

        {/* Categories Bar */}
        {categories.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            <Link
              href="/blog"
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all shrink-0 ${
                !categorySlug && !search && !tag
                  ? 'bg-[#006672] text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Tất cả bài viết
            </Link>
            {categories.map((cat: any) => (
              <Link
                key={cat.id}
                href={`/blog?category=${cat.slug}${search ? `&search=${encodeURIComponent(search)}` : ''}`}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all shrink-0 ${
                  categorySlug === cat.slug
                    ? 'bg-[#006672] text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat.name} ({cat._count?.posts || 0})
              </Link>
            ))}
          </div>
        )}

        {/* Hero Featured Article (for page 1 without filters) */}
        {heroPost && (
          <div className="mb-14">
            <article className="group bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-md hover:shadow-2xl transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 gap-0">
              <Link href={`/blog/${heroPost.slug}`} className="relative lg:col-span-7 aspect-[16/10] lg:aspect-auto bg-gray-900 block overflow-hidden">
                {heroPost.coverImage || heroPost.featuredImage ? (
                  <Image
                    src={heroPost.coverImage || heroPost.featuredImage}
                    alt={heroPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.95]"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#004d56] to-[#006672] flex items-center justify-center text-white">
                    <Sparkles className="size-16 text-emerald-300 opacity-60" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                {heroPost.category && (
                  <span className="absolute top-6 left-6 bg-[#006672] text-white text-xs font-extrabold px-4 py-1.5 rounded-full shadow-lg border border-white/20 tracking-wider">
                    🔥 BÀI VIẾT NỔI BẬT — {heroPost.category.name}
                  </span>
                )}
              </Link>

              <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-gray-500 mb-4">
                    <span className="flex items-center gap-1.5 text-[#006672] font-bold bg-emerald-50 px-2.5 py-1 rounded-md">
                      <Calendar className="size-3.5" />
                      {heroPost.publishedAt
                        ? new Date(heroPost.publishedAt).toLocaleDateString('vi-VN', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                          })
                        : 'Mới cập nhật'}
                    </span>
                    <span className="flex items-center gap-1 text-gray-500">
                      <Clock className="size-3.5 text-emerald-600" />
                      {BlogService.calculateReadingTime(heroPost.content)} phút đọc
                    </span>
                  </div>

                  <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3.5xl font-extrabold text-gray-900 group-hover:text-[#006672] transition-colors leading-[1.25] mb-4">
                    <Link href={`/blog/${heroPost.slug}`}>{heroPost.title}</Link>
                  </h2>

                  {heroPost.summary && (
                    <p className="text-sm md:text-base text-gray-600 line-clamp-4 leading-relaxed mb-6">
                      {heroPost.summary}
                    </p>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-[#006672] text-white font-bold text-xs flex items-center justify-center">
                      {(heroPost.author || 'K').charAt(0)}
                    </span>
                    <span className="text-xs font-semibold text-gray-700">
                      {heroPost.author || 'KABO Editorial'}
                    </span>
                  </div>
                  <Link
                    href={`/blog/${heroPost.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#006672] hover:text-[#004d56] transition-colors group-hover:translate-x-1 duration-300"
                  >
                    Đọc ngay <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </article>
          </div>
        )}

        {/* Empty State */}
        {posts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200/80 shadow-sm max-w-md mx-auto my-12">
            <div className="w-16 h-16 bg-emerald-50 text-[#006672] rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="size-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Chưa có bài viết nào</h3>
            <p className="text-sm text-gray-500 mb-6">
              {search || categorySlug || tag
                ? 'Không tìm thấy bài viết phù hợp với bộ lọc của bạn.'
                : 'Các bài viết tuyệt vời đang được biên soạn và sẽ tự động cập nhật ngay.'}
            </p>
            {(search || categorySlug || tag) && (
              <Link
                href="/blog"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-[#006672] text-white text-sm font-medium hover:bg-[#004d56] transition-colors"
              >
                Xem tất cả bài viết
              </Link>
            )}
          </div>
        ) : (
          /* Grid Bài Viết */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridPosts.map((post: any) => {
              const readingTime = BlogService.calculateReadingTime(post.content);
              const cover = post.coverImage || post.featuredImage;
              return (
                <article
                  key={post.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Thumbnail Cover Image */}
                  <Link href={`/blog/${post.slug}`} className="relative aspect-[16/10] bg-gray-900 overflow-hidden block">
                    {cover ? (
                      <Image
                        src={cover}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#006672] to-[#004d56] flex items-center justify-center p-6 text-white text-center">
                        <Sparkles className="size-10 text-emerald-300 opacity-60 mb-2" />
                      </div>
                    )}
                    {post.category && (
                      <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#006672] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                        {post.category.name}
                      </span>
                    )}
                  </Link>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                        <span className="flex items-center gap-1 font-medium text-gray-600">
                          <Calendar className="size-3.5 text-[#006672]" />
                          {post.publishedAt
                            ? new Date(post.publishedAt).toLocaleDateString('vi-VN', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                              })
                            : 'Vừa cập nhật'}
                        </span>
                        <span className="flex items-center gap-1 text-gray-500 font-medium">
                          <Clock className="size-3.5 text-emerald-600" />
                          {readingTime} phút
                        </span>
                      </div>

                      <h2 className="font-[family-name:var(--font-heading)] text-xl font-bold text-gray-900 group-hover:text-[#006672] transition-colors line-clamp-2 leading-snug mb-3">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h2>

                      {post.summary && (
                        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4">
                          {post.summary}
                        </p>
                      )}
                    </div>

                    {/* Footer Card */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                      <span className="text-xs text-gray-500 font-medium">
                        Bởi <strong className="text-gray-700">{post.author || 'KABO Editorial'}</strong>
                      </span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-sm font-bold text-[#006672] hover:text-[#004d56] transition-colors group-hover:translate-x-0.5 duration-200"
                      >
                        Đọc bài <ArrowRight className="size-4" />
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
          <div className="flex justify-center items-center gap-2 mt-12">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/blog?page=${p}${categorySlug ? `&category=${categorySlug}` : ''}${search ? `&search=${encodeURIComponent(search)}` : ''}${tag ? `&tag=${encodeURIComponent(tag)}` : ''}`}
                className={`w-10 h-10 rounded-xl font-semibold text-sm flex items-center justify-center transition-all ${
                  p === pagination.page
                    ? 'bg-[#006672] text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {p}
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

