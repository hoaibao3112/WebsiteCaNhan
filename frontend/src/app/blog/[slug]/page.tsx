import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { BlogService } from '@/services/blog.service';
import { Calendar, ArrowLeft, ArrowRight, Tag, Share2, Sparkles, BookOpen, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const DEFAULT_ACCOUNT_ID = process.env.DEFAULT_ACCOUNT_ID || 'default-account';

export const revalidate = 60; // ISR 60 seconds

interface BlogDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const post = await BlogService.getPostBySlug(DEFAULT_ACCOUNT_ID, params.slug);

  if (!post) {
    return {
      title: 'Không Tìm Thấy Bài Viết',
      description: 'Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị gỡ bỏ.',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.laixechienthangdongthap.com';
  const url = `${siteUrl}/blog/${post.slug}`;
  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.summary || post.title;
  const image = post.featuredImage || `${siteUrl}/logo-kabo.jpg`;

  return {
    title: `${title} — Kabo Agency Blog`,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = await BlogService.getPostBySlug(DEFAULT_ACCOUNT_ID, params.slug);

  if (!post) {
    notFound();
  }

  const [{ previousPost, nextPost }, relatedPosts] = await Promise.all([
    BlogService.getPreviousAndNextPosts(DEFAULT_ACCOUNT_ID, post.id, post.publishedAt),
    BlogService.getRelatedPosts(DEFAULT_ACCOUNT_ID, post.id, post.categoryId, 3),
  ]);

  const readingTime = BlogService.calculateReadingTime(post.content);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.laixechienthangdongthap.com';
  const articleUrl = `${siteUrl}/blog/${post.slug}`;

  // JSON-LD Schema.org cho Bài Viết chuẩn SEO Google
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary || post.metaDescription || post.title,
    image: post.featuredImage ? [post.featuredImage] : [`${siteUrl}/logo-kabo.jpg`],
    datePublished: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: {
      '@type': 'Organization',
      name: 'KABO AGENCY',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'KABO AGENCY',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo-kabo.jpg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
  };

  return (
    <div className="min-h-screen bg-[#f8fafb] pt-28 pb-20">
      {/* Schema.org Injection */}
      <Script
        id="json-ld-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy="beforeInteractive"
      />

      <article className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#006672] hover:text-[#004d56] mb-8 transition-colors"
        >
          <ArrowLeft className="size-4" /> Quay lại danh sách bài viết
        </Link>

        {/* Header Content */}
        <header className="space-y-6 mb-10">
          {post.category && (
            <span className="inline-block bg-[#006672]/10 text-[#006672] text-xs font-extrabold tracking-wider px-3.5 py-1.5 rounded-full uppercase">
              {post.category.name}
            </span>
          )}

          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-b border-gray-200 pb-6">
            <span className="flex items-center gap-2">
              <Calendar className="size-4 text-[#006672]" />
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })
                : 'Đã xuất bản'}
            </span>
            <span className="flex items-center gap-2 text-gray-600 font-medium">
              <Clock className="size-4 text-emerald-600" />
              {readingTime} phút đọc
            </span>
            <span className="flex items-center gap-2 text-gray-600 font-medium">
              <BookOpen className="size-4 text-[#006672]" />
              KABO Editorial Team
            </span>
          </div>

          {post.summary && (
            <div className="p-6 bg-emerald-50/60 border-l-4 border-[#006672] rounded-r-2xl text-gray-700 text-base md:text-lg italic leading-relaxed">
              {post.summary}
            </div>
          )}
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-12 shadow-lg border border-gray-100">
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Body Content */}
        <div
          className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-[#006672] prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl prose-img:shadow-md bg-white p-8 md:p-12 rounded-3xl border border-gray-200/80 shadow-sm"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags & Share Footer */}
        <footer className="mt-10 pt-8 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
          {post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="size-4 text-gray-400" />
              {post.tags.map((t: string, idx: number) => (
                <Link
                  key={idx}
                  href={`/blog?tag=${encodeURIComponent(t)}`}
                  className="bg-gray-100 hover:bg-emerald-50 hover:text-[#006672] text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200/60 transition-colors"
                >
                  #{t}
                </Link>
              ))}
            </div>
          )}

          <div className="flex items-center gap-3">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#006672] text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-[#004d56] transition-colors"
            >
              <Share2 className="size-3.5" /> Chia sẻ bài viết
            </a>
          </div>
        </footer>

        {/* Khối Điều Hướng: Bài Viết Trước Đó & Bài Viết Tiếp Theo */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">
            Điều Hướng Bài Viết
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bài viết trước đó (Previous Post) */}
            {previousPost ? (
              <Link
                href={`/blog/${previousPost.slug}`}
                className="group bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md hover:border-[#006672]/30 transition-all flex items-start gap-4"
              >
                <div className="p-2.5 rounded-xl bg-emerald-50 text-[#006672] group-hover:bg-[#006672] group-hover:text-white transition-colors shrink-0">
                  <ChevronLeft className="size-5" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-gray-400 block mb-1">
                    ← BÀI VIẾT TRƯỚC ĐÓ
                  </span>
                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#006672] line-clamp-2 leading-snug transition-colors">
                    {previousPost.title}
                  </h4>
                </div>
              </Link>
            ) : (
              <div className="bg-gray-50/50 p-5 rounded-2xl border border-dashed border-gray-200 flex items-center gap-3 text-xs text-gray-400">
                <ChevronLeft className="size-4" /> Đang ở bài viết cũ nhất
              </div>
            )}

            {/* Bài viết tiếp theo (Next Post) */}
            {nextPost ? (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="group bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md hover:border-[#006672]/30 transition-all flex items-start justify-between gap-4 text-right"
              >
                <div>
                  <span className="text-xs font-semibold text-gray-400 block mb-1">
                    BÀI VIẾT KẾ TIẾP →
                  </span>
                  <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#006672] line-clamp-2 leading-snug transition-colors">
                    {nextPost.title}
                  </h4>
                </div>
                <div className="p-2.5 rounded-xl bg-emerald-50 text-[#006672] group-hover:bg-[#006672] group-hover:text-white transition-colors shrink-0">
                  <ChevronRight className="size-5" />
                </div>
              </Link>
            ) : (
              <div className="bg-gray-50/50 p-5 rounded-2xl border border-dashed border-gray-200 flex items-center justify-end gap-3 text-xs text-gray-400 text-right">
                Đang ở bài viết mới nhất <ChevronRight className="size-4" />
              </div>
            )}
          </div>
        </div>

        {/* Khối Bài Viết Liên Quan (Related Articles Grid) */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-gray-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-extrabold text-[#006672] uppercase tracking-wider block mb-1">
                  CÓ THỂ BẠN QUAN TÂM
                </span>
                <h3 className="text-2xl font-bold text-gray-900">Bài Viết Liên Quan</h3>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-1 text-sm font-bold text-[#006672] hover:text-[#004d56] transition-colors"
              >
                Xem tất cả <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((item: any) => (
                <article
                  key={item.id}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-lg transition-all flex flex-col"
                >
                  <Link href={`/blog/${item.slug}`} className="relative aspect-[16/10] bg-gray-100 block overflow-hidden">
                    {item.featuredImage ? (
                      <Image
                        src={item.featuredImage}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#006672] to-[#004d56] flex items-center justify-center text-white">
                        <Sparkles className="size-8 text-emerald-300 opacity-60" />
                      </div>
                    )}
                  </Link>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {item.category && (
                        <span className="text-[11px] font-bold text-[#006672] block mb-2">
                          {item.category.name}
                        </span>
                      )}
                      <h4 className="text-base font-bold text-gray-900 group-hover:text-[#006672] line-clamp-2 leading-snug mb-2 transition-colors">
                        <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                      </h4>
                    </div>

                    <Link
                      href={`/blog/${item.slug}`}
                      className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#006672] hover:text-[#004d56] transition-colors"
                    >
                      Đọc bài viết <ArrowRight className="size-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}

