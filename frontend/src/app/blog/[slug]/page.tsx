import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SafeImage from '@/components/ui/SafeImage';
import Script from 'next/script';
import { BlogService, getBlogCoverImage } from '@/services/blog.service';
import {
  Calendar,
  Tag,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Twitter,
  Link2,
  ListOrdered,
  Clock,
  ArrowLeft,
  Share2,
  BookOpen,
} from 'lucide-react';

const NAVBAR_HEIGHT = 68;
const DEFAULT_ACCOUNT_ID = process.env.DEFAULT_ACCOUNT_ID || 'default-account';
export const revalidate = 60;

interface BlogDetailPageProps {
  params: { slug: string };
}

function extractTocAndProcessContent(contentHtml: string, contentImages: string[] = []) {
  const toc: { id: string; text: string; level: number }[] = [];
  let index = 1;

  const existingImgs = (contentHtml.match(/<img[^>]+>/gi) || []).map((img) => {
    const srcMatch = img.match(/src=["']([^"']+)["']/i);
    return srcMatch ? srcMatch[1] : '';
  });

  const unusedImages = contentImages.filter((imgUrl) => !existingImgs.includes(imgUrl));
  let unusedImgIdx = 0;

  const modifiedContent = contentHtml.replace(
    /<h([23])([^>]*)>(.*?)<\/h\1>/gi,
    (match, levelStr, attrs, innerText) => {
      const level = parseInt(levelStr, 10);
      const cleanText = innerText.replace(/<[^>]+>/g, '').trim();
      const slug = cleanText
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const id = `heading-${index++}-${slug || 'sec'}`;
      toc.push({ id, text: cleanText, level });

      let headingHtml = `<h${levelStr}${attrs} id="${id}">${innerText}</h${levelStr}>`;

      if (level === 2 && unusedImgIdx < unusedImages.length && index > 2) {
        const imgUrl = unusedImages[unusedImgIdx++];
        headingHtml = `<div class="my-8 overflow-hidden rounded-2xl border border-border shadow-sm"><img src="${imgUrl}" alt="${cleanText}" class="w-full h-auto object-cover block" /></div>` + headingHtml;
      }

      return headingHtml;
    }
  );

  return { toc, modifiedContent };
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const post = await BlogService.getPostBySlug(DEFAULT_ACCOUNT_ID, params.slug);
  if (!post) return { title: 'Không Tìm Thấy Bài Viết' };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.laixechienthangdongthap.com';
  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.summary || post.title;
  const coverImg = getBlogCoverImage(post.title, post.category?.slug, post.coverImage || post.featuredImage);

  return {
    title: `${title} | KABO Tech & SEO`,
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
  const coverImg = getBlogCoverImage(post.title, post.category?.slug, post.coverImage || post.featuredImage);

  const { toc, modifiedContent } = extractTocAndProcessContent(post.content, post.contentImages || []);

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
    <div className="min-h-screen bg-white text-foreground" style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}>
      <Script
        id="json-ld-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy="beforeInteractive"
      />

      {/* ══ ARTICLE HERO ════════════════════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-primary-surface via-white to-primary-surface">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 pt-10 pb-8">
          {/* Breadcrumb / Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary font-medium transition-colors mb-8 group"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Quay lại Blog
          </Link>

          {/* Meta row */}
          <div className="flex items-center gap-3.5 mb-6 flex-wrap animate-fade-in-up">
            {post.category && (
              <Link
                href={`/blog?category=${post.category.slug}`}
                className="section-label hover:bg-primary hover:text-white transition-all"
              >
                {post.category.name}
              </Link>
            )}
            <span className="text-muted text-sm flex items-center gap-1.5 font-medium">
              <Calendar className="size-4 text-primary" />
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })
                : 'Đã xuất bản'}
            </span>
            <span className="text-muted text-sm flex items-center gap-1.5 font-medium">
              <Clock className="size-4 text-muted" />
              {readingTime} phút đọc
            </span>
          </div>

          {/* Title */}
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-8 leading-tight tracking-tight max-w-4xl animate-fade-in-up-delay-1">
            {post.title}
          </h1>

          {/* Author info */}
          <div className="flex items-center gap-4 animate-fade-in-up-delay-2">
            <div className="size-12 rounded-full overflow-hidden border-2 border-border bg-primary-surface flex items-center justify-center text-primary font-bold text-base shrink-0">
              {(post.author || 'K').charAt(0)}
            </div>
            <div>
              <p className="font-bold text-sm text-foreground">{post.author || 'KABO Editorial'}</p>
              <p className="text-xs text-muted">Technical Lead & SEO Specialist</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FEATURED COVER IMAGE ════════════════════════════════════════════ */}
      {coverImg && (
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 -mt-2 mb-12">
          <div className="w-full h-[320px] md:h-[520px] rounded-2xl overflow-hidden border border-border relative shadow-[var(--shadow-soft-float)] animate-scale-in">
            <SafeImage
              src={coverImg}
              fallbackSrc={coverImg}
              alt={post.title}
              fill
              priority
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* ══ MAIN CONTENT LAYOUT ════════════════════════════════════════════ */}
      <main className="max-w-[1280px] mx-auto px-6 lg:px-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* MAIN CONTENT AREA */}
          <article className="w-full lg:w-2/3 min-w-0">

            {/* Table of Contents */}
            {toc.length > 0 && (
              <div className="card-lumina !rounded-2xl p-7 md:p-8 mb-12">
                <h4 className="font-heading font-bold text-lg text-foreground mb-5 flex items-center gap-2.5">
                  <ListOrdered className="size-5 text-primary" /> Mục lục bài viết
                </h4>
                <nav className="flex flex-col gap-2.5">
                  {toc.map((item, idx) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`border-l-2 text-sm transition-all hover:text-primary hover:border-primary ${
                        item.level === 3 ? 'pl-8 text-muted' : 'pl-4 text-foreground/80 font-medium'
                      } ${idx === 0 ? 'border-primary font-semibold text-primary' : 'border-border'}`}
                    >
                      {idx + 1}. {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Summary Box */}
            {post.summary && (
              <div className="bg-primary-surface border-l-4 border-primary p-6 rounded-r-2xl mb-10 text-muted text-base md:text-lg leading-relaxed italic">
                {post.summary}
              </div>
            )}

            {/* Article Content Body */}
            <div
              className="article-content text-base md:text-lg leading-relaxed text-muted
                prose max-w-none
                prose-headings:text-foreground prose-headings:font-bold prose-headings:font-heading
                prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-5 prose-h2:pt-3
                prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
                prose-p:text-muted prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-primary prose-a:font-semibold hover:prose-a:underline
                prose-strong:text-foreground
                prose-ul:list-disc prose-ul:pl-6 prose-li:mb-3
                prose-img:rounded-2xl prose-img:border prose-img:border-border prose-img:my-8 prose-img:w-full prose-img:object-cover"
              dangerouslySetInnerHTML={{ __html: modifiedContent }}
            />

            {/* Tags Section */}
            {post.tags && post.tags.length > 0 && (
              <div className="my-10 pt-8 border-t border-border flex flex-wrap items-center gap-2.5">
                <Tag className="size-4 text-muted mr-1" />
                {post.tags.map((t: string, i: number) => (
                  <Link
                    key={i}
                    href={`/blog?tag=${encodeURIComponent(t)}`}
                    className="filter-tab !text-xs"
                  >
                    #{t}
                  </Link>
                ))}
              </div>
            )}

            {/* Prev / Next Article Navigation Cards */}
            <div className="my-12 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {previousPost ? (
                <Link
                  href={`/blog/${previousPost.slug}`}
                  className="group card-lumina !rounded-2xl flex items-center gap-4 p-5"
                >
                  <div className="p-3 rounded-xl bg-primary-surface group-hover:bg-primary group-hover:text-white text-primary transition-colors shrink-0">
                    <ChevronLeft className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-bold text-muted uppercase tracking-wider block mb-1">← BÀI TRƯỚC</span>
                    <h4 className="text-xs md:text-sm font-bold text-foreground group-hover:text-primary line-clamp-2 leading-snug transition-colors">
                      {previousPost.title}
                    </h4>
                  </div>
                </Link>
              ) : (
                <div className="flex items-center gap-3 p-5 rounded-2xl border border-dashed border-border bg-primary-surface/30 text-xs md:text-sm text-muted">
                  <ChevronLeft className="size-5" /> Đang ở bài viết cũ nhất
                </div>
              )}

              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="group card-lumina !rounded-2xl flex items-center justify-between gap-4 p-5 text-right"
                >
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-bold text-muted uppercase tracking-wider block mb-1">BÀI TIẾP →</span>
                    <h4 className="text-xs md:text-sm font-bold text-foreground group-hover:text-primary line-clamp-2 leading-snug transition-colors">
                      {nextPost.title}
                    </h4>
                  </div>
                  <div className="p-3 rounded-xl bg-primary-surface group-hover:bg-primary group-hover:text-white text-primary transition-colors shrink-0">
                    <ChevronRight className="size-5" />
                  </div>
                </Link>
              ) : (
                <div className="flex items-center justify-end gap-3 p-5 rounded-2xl border border-dashed border-border bg-primary-surface/30 text-xs md:text-sm text-muted text-right">
                  Đang ở bài viết mới nhất <ChevronRight className="size-5" />
                </div>
              )}
            </div>

          </article>

          {/* SIDEBAR */}
          <aside className="w-full lg:w-1/3 shrink-0">
            <div className="sticky top-28 flex flex-col gap-8">

              {/* 1. Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="card-lumina !rounded-2xl p-6">
                  <h5 className="font-heading text-lg font-bold text-foreground mb-5 pb-4 border-b border-border flex items-center gap-2">
                    <BookOpen className="size-4 text-primary" />
                    Bài viết liên quan
                  </h5>
                  <div className="flex flex-col gap-5">
                    {relatedPosts.map((item: any) => {
                      const thumb = getBlogCoverImage(item.title, undefined, item.coverImage || item.featuredImage);
                      return (
                        <Link key={item.id} className="group flex gap-4 items-center" href={`/blog/${item.slug}`}>
                          <div className="size-[72px] shrink-0 rounded-xl overflow-hidden border border-border relative bg-primary-surface">
                            <SafeImage
                              src={thumb}
                              fallbackSrc={thumb}
                              alt={item.title}
                              fill
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h6 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                              {item.title}
                            </h6>
                            <p className="text-[11px] text-muted mt-1.5 flex items-center gap-1">
                              <Calendar className="size-3 text-primary" />
                              {item.publishedAt
                                ? new Date(item.publishedAt).toLocaleDateString('vi-VN', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                  })
                                : 'Mới cập nhật'}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* 2. Social Share Box */}
              <div className="card-lumina !rounded-2xl p-6">
                <h5 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
                  <Share2 className="size-4 text-primary" />
                  Chia sẻ bài viết
                </h5>
                <div className="flex items-center gap-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-11 flex items-center justify-center border border-border rounded-xl hover:bg-primary hover:text-white hover:border-primary text-muted transition-all"
                    aria-label="Facebook"
                  >
                    <Facebook className="size-4" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="size-11 flex items-center justify-center border border-border rounded-xl hover:bg-primary hover:text-white hover:border-primary text-muted transition-all"
                    aria-label="Twitter"
                  >
                    <Twitter className="size-4" />
                  </a>
                  <a
                    href={articleUrl}
                    className="size-11 flex items-center justify-center border border-border rounded-xl hover:bg-primary hover:text-white hover:border-primary text-muted transition-all"
                    aria-label="Copy Link"
                  >
                    <Link2 className="size-4" />
                  </a>
                </div>
              </div>

            </div>
          </aside>

        </div>
      </main>

      {/* ══ BOTTOM NEWSLETTER SECTION ══════════════════════════════════════ */}
      <section className="relative bg-gradient-to-br from-primary-surface via-surface to-primary-surface py-24 border-t border-border overflow-hidden">
        {/* Decorative */}
        <div className="absolute top-0 right-[10%] w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-[5%] w-[250px] h-[250px] bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 text-center">
          <span className="section-label mb-6 inline-flex">
            <BookOpen className="size-3.5" /> NEWSLETTER
          </span>
          <h2 className="font-heading text-2xl md:text-4xl font-bold text-foreground mb-5">
            Nâng tầm hiện diện số của bạn
          </h2>
          <p className="text-sm md:text-base text-muted max-w-2xl mx-auto mb-12 leading-relaxed">
            Gia nhập cộng đồng 10,000+ nhà phát triển và chuyên gia Marketing đang theo dõi bản tin từ KABO.
          </p>
          <form className="flex flex-col md:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Địa chỉ email của bạn"
              className="input-lumina flex-grow !rounded-full !px-5"
            />
            <button
              type="submit"
              className="btn-primary !text-sm shrink-0"
            >
              Đăng ký bản tin
            </button>
          </form>
          <p className="text-xs text-muted mt-5 italic">
            Chúng tôi tôn trọng sự riêng tư của bạn. Không bao giờ gửi thư rác.
          </p>
        </div>
      </section>
    </div>
  );
}
