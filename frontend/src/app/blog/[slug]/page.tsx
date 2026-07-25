import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { BlogService } from '@/services/blog.service';
import {
  Calendar,
  ArrowLeft,
  ArrowRight,
  Tag,
  Share2,
  Sparkles,
  Clock,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Rss,
  Facebook,
  Twitter,
  Link2,
} from 'lucide-react';

const NAVBAR_HEIGHT = 68;
const DEFAULT_ACCOUNT_ID = process.env.DEFAULT_ACCOUNT_ID || 'default-account';
export const revalidate = 60;

interface BlogDetailPageProps {
  params: { slug: string };
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const post = await BlogService.getPostBySlug(DEFAULT_ACCOUNT_ID, params.slug);
  if (!post) return { title: 'Không Tìm Thấy Bài Viết' };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.laixechienthangdongthap.com';
  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.summary || post.title;
  const coverImg = post.coverImage || post.featuredImage || `${siteUrl}/logo-kabo.jpg`;

  return {
    title: `${title} — KABO Blog`,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      images: [{ url: coverImg, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [coverImg] },
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const post = await BlogService.getPostBySlug(DEFAULT_ACCOUNT_ID, params.slug);
  if (!post) notFound();

  const [{ previousPost, nextPost }, relatedPosts] = await Promise.all([
    BlogService.getPreviousAndNextPosts(DEFAULT_ACCOUNT_ID, post.id, post.publishedAt),
    BlogService.getRelatedPosts(DEFAULT_ACCOUNT_ID, post.id, post.categoryId, 3),
  ]);

  const readingTime = BlogService.calculateReadingTime(post.content);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.laixechienthangdongthap.com';
  const articleUrl = `${siteUrl}/blog/${post.slug}`;
  const coverImg = post.coverImage || post.featuredImage;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.summary || post.metaDescription || post.title,
    image: coverImg ? [coverImg] : [`${siteUrl}/logo-kabo.jpg`],
    datePublished: post.publishedAt?.toISOString() || post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    author: { '@type': 'Person', name: post.author || 'KABO Editorial Team', url: siteUrl },
    publisher: {
      '@type': 'Organization',
      name: 'KABO AGENCY',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/logo-kabo.jpg` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
  };

  return (
    <div className="min-h-screen bg-[#f5f7f8]" style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}>
      <Script
        id="json-ld-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy="beforeInteractive"
      />

      {/* ── TOP NAV BAR ───────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200/80">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/" className="hover:text-[#006672] transition-colors font-medium">Trang chủ</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-[#006672] transition-colors font-medium">Blog</Link>
          <span>/</span>
          <span className="text-gray-600 font-medium line-clamp-1 max-w-xs">{post.title}</span>
        </div>
      </div>

      {/* ── ARTICLE HERO ──────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200/80 py-10">
        <div className="max-w-6xl mx-auto px-4 md:px-6">

          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#006672] hover:text-[#004d56] mb-6 transition-colors"
          >
            <ArrowLeft className="size-3.5" /> Quay lại Blog
          </Link>

          {/* Category + meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {post.category && (
              <span className="bg-emerald-50 text-[#006672] text-[11px] font-extrabold tracking-wider px-3 py-1 rounded-full border border-emerald-200 uppercase">
                {post.category.name}
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="size-3.5 text-[#006672]" />
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString('vi-VN', {
                    day: '2-digit', month: 'long', year: 'numeric',
                  })
                : 'Đã xuất bản'}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="size-3.5 text-emerald-500" />
              {readingTime} phút đọc
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-5 max-w-4xl"
            style={{ fontFamily: 'var(--font-heading, Georgia, serif)' }}
          >
            {post.title}
          </h1>

          {/* Author row */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#006672] to-[#004d56] flex items-center justify-center text-white text-sm font-extrabold shrink-0">
                {(post.author || 'K').charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">{post.author || 'KABO Tech Team'}</p>
                <p className="text-[11px] text-gray-400">Biên tập viên & SEO Chuyên gia</p>
              </div>
            </div>

            {/* Share */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-medium mr-1">Chia sẻ:</span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
                target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center transition-colors"
                aria-label="Chia sẻ Facebook"
              >
                <Facebook className="size-3.5" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(post.title)}`}
                target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center transition-colors"
                aria-label="Chia sẻ Twitter"
              >
                <Twitter className="size-3.5" />
              </a>
              <a
                href={articleUrl}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
                aria-label="Copy link"
              >
                <Link2 className="size-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN 2-COLUMN LAYOUT ─────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">

          {/* ── LEFT: Article Content ───────────────────────────────────── */}
          <article>

            {/* Cover Image */}
            {coverImg && (
              <div
                className="relative w-full rounded-2xl overflow-hidden mb-8 shadow-md"
                style={{ paddingTop: '52.5%' /* ~19:10 */ }}
              >
                <Image
                  src={coverImg}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            )}

            {/* Summary / Intro */}
            {post.summary && (
              <div className="flex gap-3 p-5 bg-emerald-50 border-l-[3px] border-[#006672] rounded-r-xl mb-6">
                <BookOpen className="size-5 text-[#006672] shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 leading-relaxed italic">{post.summary}</p>
              </div>
            )}

            {/* Article Body */}
            <div
              className="prose prose-sm sm:prose-base max-w-none
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
                prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-2
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:my-3
                prose-a:text-[#006672] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900
                prose-ul:my-3 prose-li:my-1
                prose-img:rounded-xl prose-img:shadow-sm prose-img:my-4
                prose-blockquote:border-l-[#006672] prose-blockquote:bg-emerald-50/50 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 md:p-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Content Images Gallery */}
            {post.contentImages && post.contentImages.length > 0 && (
              <div className="mt-6 bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6">
                <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Sparkles className="size-4 text-[#006672]" /> Bộ Ảnh Minh Họa
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {post.contentImages.map((imgUrl: string, idx: number) => (
                    <div
                      key={idx}
                      className="relative rounded-xl overflow-hidden shadow-sm group"
                      style={{ paddingTop: '62.5%' /* 16:10 */ }}
                    >
                      <Image
                        src={imgUrl}
                        alt={`Hình minh họa ${idx + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap items-center gap-2">
                <Tag className="size-3.5 text-gray-400" />
                {post.tags.map((t: string, i: number) => (
                  <Link
                    key={i}
                    href={`/blog?tag=${encodeURIComponent(t)}`}
                    className="bg-white border border-gray-200 hover:border-[#006672] hover:text-[#006672] text-gray-600 text-xs font-semibold px-3 py-1 rounded-lg transition-colors"
                  >
                    #{t}
                  </Link>
                ))}
              </div>
            )}

            {/* Share row bottom */}
            <div className="mt-6 pt-5 border-t border-gray-200 flex items-center justify-between flex-wrap gap-3">
              <span className="text-sm text-gray-500">Bài viết có hữu ích? Chia sẻ với bạn bè!</span>
              <div className="flex items-center gap-2">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#006672] hover:bg-[#004d56] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
                >
                  <Share2 className="size-3.5" /> Chia sẻ bài viết
                </a>
              </div>
            </div>

            {/* Prev / Next Navigation */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {previousPost ? (
                <Link
                  href={`/blog/${previousPost.slug}`}
                  className="group flex items-center gap-3 bg-white p-4 rounded-xl border border-gray-200 hover:border-[#006672]/40 hover:shadow-sm transition-all"
                >
                  <div className="p-2 rounded-lg bg-emerald-50 group-hover:bg-[#006672] text-[#006672] group-hover:text-white transition-colors shrink-0">
                    <ChevronLeft className="size-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">Bài trước</span>
                    <span className="text-xs font-bold text-gray-800 group-hover:text-[#006672] line-clamp-2 leading-snug transition-colors">
                      {previousPost.title}
                    </span>
                  </div>
                </Link>
              ) : (
                <div className="flex items-center gap-2 p-4 rounded-xl border border-dashed border-gray-200 text-xs text-gray-400">
                  <ChevronLeft className="size-4" /> Bài viết cũ nhất
                </div>
              )}

              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="group flex items-center justify-end gap-3 bg-white p-4 rounded-xl border border-gray-200 hover:border-[#006672]/40 hover:shadow-sm transition-all text-right"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-0.5">Bài tiếp</span>
                    <span className="text-xs font-bold text-gray-800 group-hover:text-[#006672] line-clamp-2 leading-snug transition-colors">
                      {nextPost.title}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-emerald-50 group-hover:bg-[#006672] text-[#006672] group-hover:text-white transition-colors shrink-0">
                    <ChevronRight className="size-4" />
                  </div>
                </Link>
              ) : (
                <div className="flex items-center justify-end gap-2 p-4 rounded-xl border border-dashed border-gray-200 text-xs text-gray-400 text-right">
                  Bài viết mới nhất <ChevronRight className="size-4" />
                </div>
              )}
            </div>
          </article>

          {/* ── RIGHT: Sticky Sidebar ───────────────────────────────────── */}
          <aside className="space-y-5 lg:sticky lg:top-[84px] self-start">

            {/* Table of Contents */}
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-5">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-gray-900 mb-3 flex items-center gap-2">
                <BookOpen className="size-3.5 text-[#006672]" /> Mục lục bài viết
              </h3>
              <nav className="space-y-1">
                {/* Static TOC items — dynamic TOC needs client component */}
                <p className="text-xs text-gray-400 italic">Các mục tiêu đề trong bài sẽ hiện ở đây.</p>
              </nav>
            </div>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-5">
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-gray-900 mb-4 flex items-center gap-2">
                  <Sparkles className="size-3.5 text-[#006672]" /> Bài viết liên quan
                </h3>
                <div className="space-y-4">
                  {relatedPosts.map((item: any) => {
                    const thumb = item.coverImage || item.featuredImage;
                    return (
                      <Link
                        key={item.id}
                        href={`/blog/${item.slug}`}
                        className="group flex items-start gap-3"
                      >
                        {/* Thumbnail */}
                        <div
                          className="relative shrink-0 rounded-lg overflow-hidden"
                          style={{ width: '72px', height: '54px', background: 'linear-gradient(135deg, #004d56, #006672)' }}
                        >
                          {thumb && (
                            <Image src={thumb} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          {item.category && (
                            <span className="text-[10px] font-bold text-[#006672] block mb-0.5">{item.category.name}</span>
                          )}
                          <p className="text-xs font-semibold text-gray-800 group-hover:text-[#006672] line-clamp-2 leading-snug transition-colors">
                            {item.title}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <Link
                  href="/blog"
                  className="mt-4 flex items-center justify-center gap-1 text-xs font-bold text-[#006672] hover:text-[#004d56] transition-colors pt-3 border-t border-gray-100"
                >
                  Xem tất cả bài viết <ArrowRight className="size-3.5" />
                </Link>
              </div>
            )}

            {/* Newsletter */}
            <div
              className="rounded-2xl p-5 text-white"
              style={{ background: 'linear-gradient(135deg, #003d45, #006672)' }}
            >
              <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 text-emerald-300 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3">
                <Rss className="size-3" /> BẢN TIN
              </div>
              <h4 className="font-bold text-sm text-white mb-2 leading-snug">
                Đăng ký nhận<br />bản tin KABO Tech
              </h4>
              <p className="text-white/60 text-[11px] leading-relaxed mb-3">
                Kiến thức web, SEO, Marketing gửi thẳng hộp thư hàng tuần.
              </p>
              <form className="space-y-2">
                <input
                  type="email"
                  placeholder="email@cua-ban.com"
                  className="w-full px-3 py-2.5 rounded-lg text-xs text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <button
                  type="submit"
                  className="w-full bg-emerald-400 hover:bg-emerald-300 text-gray-900 font-extrabold text-xs py-2.5 rounded-lg transition-colors"
                >
                  Đăng ký ngay
                </button>
              </form>
            </div>

            {/* More posts CTA */}
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-5">
              <h4 className="text-xs font-bold text-gray-700 mb-3">
                Dịch vụ Thiết Kế Web chuẩn SEO & Marketing tại KABO
              </h4>
              <Link
                href="/dich-vu"
                className="flex items-center justify-center gap-1.5 bg-[#006672] hover:bg-[#004d56] text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors"
              >
                Xem chi tiết <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </aside>
        </div>

        {/* ── RELATED POSTS — full width grid below ────────────────────── */}
        {relatedPosts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[11px] font-extrabold text-[#006672] uppercase tracking-widest block mb-0.5">CÓ THỂ BẠN QUAN TÂM</span>
                <h3
                  className="text-xl font-extrabold text-gray-900"
                  style={{ fontFamily: 'var(--font-heading, Georgia, serif)' }}
                >
                  Bài Viết Liên Quan
                </h3>
              </div>
              <Link href="/blog" className="inline-flex items-center gap-1 text-xs font-bold text-[#006672] hover:text-[#004d56] transition-colors">
                Xem tất cả <ArrowRight className="size-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedPosts.map((item: any) => {
                const itemCover = item.coverImage || item.featuredImage;
                return (
                  <article
                    key={item.id}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex flex-col"
                  >
                    <Link
                      href={`/blog/${item.slug}`}
                      className="block relative overflow-hidden shrink-0"
                      style={{ paddingTop: '56.25%' }}
                    >
                      <div className="absolute inset-0">
                        {itemCover ? (
                          <Image
                            src={itemCover}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-400"
                          />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #004d56, #006672)' }}
                          >
                            <Sparkles className="size-8 text-white/20" />
                          </div>
                        )}
                      </div>
                      {item.category && (
                        <span className="absolute top-3 left-3 z-10 bg-white/95 text-[#006672] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
                          {item.category.name}
                        </span>
                      )}
                    </Link>
                    <div className="p-5 flex-1 flex flex-col">
                      <h4
                        className="text-sm font-bold text-gray-900 group-hover:text-[#006672] line-clamp-2 leading-snug mb-3 transition-colors flex-1"
                        style={{ fontFamily: 'var(--font-heading, Georgia, serif)' }}
                      >
                        <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                      </h4>
                      <Link
                        href={`/blog/${item.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#006672] hover:text-[#004d56] transition-colors mt-auto"
                      >
                        Đọc bài viết <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── NEWSLETTER BOTTOM CTA ─────────────────────────────────────────── */}
      <section
        className="mt-8 py-14 px-4"
        style={{ background: 'linear-gradient(135deg, #002d33 0%, #004d56 60%, #006672 100%)' }}
      >
        <div className="max-w-xl mx-auto text-center">
          <h2
            className="text-2xl font-extrabold text-white mb-2"
            style={{ fontFamily: 'var(--font-heading, Georgia, serif)' }}
          >
            Nâng tầm hiện diện số của bạn
          </h2>
          <p className="text-white/60 text-sm mb-6">
            Giải pháp công nghệ 10,000+ nhà phát triển tin dùng — chuyên gia Marketing đồng hành từ KABO.
          </p>
          <form className="flex items-center gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Địa chỉ email của bạn"
              className="flex-1 px-4 py-3 rounded-xl text-sm text-gray-800 bg-white focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 bg-emerald-400 hover:bg-emerald-300 text-gray-900 font-extrabold text-sm px-5 py-3 rounded-xl transition-colors"
            >
              Đăng ký bản tin
            </button>
          </form>
          <p className="text-white/30 text-[11px] mt-3">
            Copyright © {new Date().getFullYear()} KABO Agency. All rights reserved.
          </p>
        </div>
      </section>
    </div>
  );
}
