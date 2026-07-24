import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { BlogService } from '@/services/blog.service';
import { Calendar, Tag, ArrowRight, BookOpen, Search, Sparkles } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-[#f8fafb] pt-28 pb-20">
      {/* Header Banner */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#004d56] to-[#006672] text-white py-16 px-6 lg:px-10 rounded-b-3xl shadow-lg">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-4">
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
        </div>
      </section>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-6 lg:px-10 mt-12">
        {/* Categories Bar */}
        {categories.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            <Link
              href="/blog"
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all shrink-0 ${
                !categorySlug
                  ? 'bg-[#006672] text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              Tất cả bài viết
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/blog?category=${cat.slug}`}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all shrink-0 ${
                  categorySlug === cat.slug
                    ? 'bg-[#006672] text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {cat.name} ({cat._count.posts})
              </Link>
            ))}
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
            {posts.map((post) => (
              <article
                key={post.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Thumbnail */}
                <Link href={`/blog/${post.slug}`} className="relative aspect-[16/10] bg-gray-100 overflow-hidden block">
                  {post.featuredImage ? (
                    <Image
                      src={post.featuredImage}
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
                    <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#006672] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      {post.category.name}
                    </span>
                  )}
                </Link>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3.5" />
                        {post.publishedAt
                          ? new Date(post.publishedAt).toLocaleDateString('vi-VN', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            })
                          : 'Vừa cập nhật'}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#006672] transition-colors line-clamp-2 leading-snug mb-3">
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
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      {post.tags.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-medium">
                          #{t}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-bold text-[#006672] hover:text-[#004d56] transition-colors"
                    >
                      Đọc tiếp <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
              <Link
                key={p}
                href={`/blog?page=${p}${categorySlug ? `&category=${categorySlug}` : ''}`}
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
