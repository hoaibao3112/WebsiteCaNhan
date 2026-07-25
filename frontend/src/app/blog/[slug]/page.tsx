import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import SafeImage from '@/components/ui/SafeImage';
import Script from 'next/script';
import { BlogService } from '@/services/blog.service';
import {
  Calendar,
  Tag,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Twitter,
  Link2,
  ListOrdered,
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
        headingHtml = `<div class="my-8 overflow-hidden rounded-2xl border border-[#bfc8c8] shadow-sm"><img src="${imgUrl}" alt="${cleanText}" class="w-full h-auto object-cover block" /></div>` + headingHtml;
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
  const coverImg = post.coverImage || post.featuredImage || `${siteUrl}/logo-kabo.jpg`;

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
  const coverImg = post.coverImage || post.featuredImage;

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
    <div className="min-h-screen bg-[#f9f9f9] text-[#1a1c1c]" style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}>
      <Script
        id="json-ld-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        strategy="beforeInteractive"
      />

      <main className="max-w-[1280px] mx-auto px-6 lg:px-8 py-16">

        {/* ARTICLE HEADER */}
        <header className="mb-12">
          <div className="flex items-center gap-3.5 mb-5 flex-wrap">
            {post.category && (
              <span className="bg-[#90efef] text-[#006e6e] px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
                {post.category.name}
              </span>
            )}
            <span className="text-[#3f4848] text-xs md:text-sm flex items-center gap-1.5 font-medium">
              <Calendar className="size-4 text-[#006a6a]" />
              {post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })
                : 'Đã xuất bản'}
            </span>
            <span className="text-[#3f4848] text-xs md:text-sm font-medium">
              • {readingTime} phút đọc
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-5.5xl font-bold text-[#003434] mb-8 leading-tight tracking-tight">
            {post.title}
          </h1>

          {/* Author info */}
          <div className="flex items-center gap-4 pt-6 border-t border-[#e2e2e2]">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#bfc8c8] bg-[#eeeeed] flex items-center justify-center text-[#003434] font-bold text-lg shrink-0 shadow-sm">
              {(post.author || 'K').charAt(0)}
            </div>
            <div>
              <p className="font-bold text-base text-[#003434]">{post.author || 'KABO Editorial'}</p>
              <p className="text-xs md:text-sm text-[#3f4848]">Technical Lead &amp; SEO Specialist</p>
            </div>
          </div>
        </header>

        {/* FEATURED COVER IMAGE */}
        {coverImg && (
          <div className="w-full h-[340px] md:h-[540px] rounded-2xl overflow-hidden mb-16 border border-[#bfc8c8] relative shadow-sm">
            <SafeImage
              src={coverImg}
              alt={post.title}
              fill
              priority
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* MAIN CONTENT AREA */}
          <article className="w-full lg:w-2/3 min-w-0">

            {/* Table of Contents */}
            {toc.length > 0 && (
              <div className="bg-[#f4f3f3] p-7 md:p-8 rounded-2xl border border-[#bfc8c8] mb-12 shadow-sm">
                <h4 className="font-bold text-xl text-[#003434] mb-5 flex items-center gap-2.5">
                  <ListOrdered className="size-6 text-[#006a6a]" /> Mục lục bài viết
                </h4>
                <nav className="flex flex-col gap-3">
                  {toc.map((item, idx) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`border-l-2 text-sm md:text-base transition-all hover:text-[#003434] hover:border-[#006a6a] ${
                        item.level === 3 ? 'pl-8 text-[#6f7978]' : 'pl-4 text-[#3f4848] font-medium'
                      } ${idx === 0 ? 'border-[#006a6a] font-semibold text-[#003434]' : 'border-transparent'}`}
                    >
                      {idx + 1}. {item.text}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            {/* Summary Box */}
            {post.summary && (
              <div className="bg-emerald-50/90 border-l-4 border-[#006a6a] p-6 rounded-r-2xl mb-10 text-[#3f4848] text-base md:text-lg leading-relaxed italic shadow-sm">
                {post.summary}
              </div>
            )}

            {/* Article Content Body */}
            <div
              className="article-content text-base md:text-lg leading-relaxed text-[#3f4848] space-y-7
                prose max-w-none
                prose-headings:text-[#003434] prose-headings:font-bold
                prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-5 prose-h2:text-[#003434] prose-h2:pt-3
                prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-[#004d4d]
                prose-p:text-[#3f4848] prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-[#006a6a] prose-a:font-semibold hover:prose-a:underline
                prose-strong:text-[#003434]
                prose-ul:list-disc prose-ul:pl-6 prose-li:mb-3
                prose-img:rounded-2xl prose-img:border prose-img:border-[#bfc8c8] prose-img:my-8 prose-img:w-full prose-img:object-cover"
              dangerouslySetInnerHTML={{ __html: modifiedContent }}
            />

            {/* Tags Section */}
            {post.tags && post.tags.length > 0 && (
              <div className="my-10 pt-8 border-t border-[#bfc8c8] flex flex-wrap items-center gap-2.5">
                <Tag className="size-4 text-[#6f7978] mr-1" />
                {post.tags.map((t: string, i: number) => (
                  <Link
                    key={i}
                    href={`/blog?tag=${encodeURIComponent(t)}`}
                    className="bg-white border border-[#bfc8c8] hover:border-[#006a6a] hover:text-[#006a6a] text-[#3f4848] text-xs md:text-sm font-semibold px-4 py-2 rounded-xl transition-colors shadow-sm"
                  >
                    #{t}
                  </Link>
                ))}
              </div>
            )}

            {/* Prev / Next Article Navigation Cards */}
            <div className="my-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {previousPost ? (
                <Link
                  href={`/blog/${previousPost.slug}`}
                  className="group flex items-center gap-4 bg-white p-6 rounded-2xl border border-[#bfc8c8] hover:border-[#006a6a] hover:shadow-lg transition-all"
                >
                  <div className="p-3.5 rounded-xl bg-[#f4f3f3] group-hover:bg-[#003434] group-hover:text-white text-[#003434] transition-colors shrink-0">
                    <ChevronLeft className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-bold text-[#6f7978] uppercase tracking-wider block mb-1">← BÀI TRƯỚC</span>
                    <h4 className="text-xs md:text-sm font-bold text-[#003434] group-hover:text-[#006a6a] line-clamp-2 leading-snug transition-colors">
                      {previousPost.title}
                    </h4>
                  </div>
                </Link>
              ) : (
                <div className="flex items-center gap-3 p-6 rounded-2xl border border-dashed border-[#bfc8c8] bg-white text-xs md:text-sm text-[#6f7978]">
                  <ChevronLeft className="size-5" /> Đang ở bài viết cũ nhất
                </div>
              )}

              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="group flex items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#bfc8c8] hover:border-[#006a6a] hover:shadow-lg transition-all text-right"
                >
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-bold text-[#6f7978] uppercase tracking-wider block mb-1">BÀI TIẾP →</span>
                    <h4 className="text-xs md:text-sm font-bold text-[#003434] group-hover:text-[#006a6a] line-clamp-2 leading-snug transition-colors">
                      {nextPost.title}
                    </h4>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#f4f3f3] group-hover:bg-[#003434] group-hover:text-white text-[#003434] transition-colors shrink-0">
                    <ChevronRight className="size-5" />
                  </div>
                </Link>
              ) : (
                <div className="flex items-center justify-end gap-3 p-6 rounded-2xl border border-dashed border-[#bfc8c8] bg-white text-xs md:text-sm text-[#6f7978] text-right">
                  Đang ở bài viết mới nhất <ChevronRight className="size-5" />
                </div>
              )}
            </div>

          </article>

          {/* SIDEBAR */}
          <aside className="w-full lg:w-1/3 shrink-0">
            <div className="sticky top-28 flex flex-col gap-9">

              {/* 1. Related Posts (Bài viết liên quan) */}
              {relatedPosts.length > 0 && (
                <div className="bg-white p-7 rounded-2xl border border-[#bfc8c8] shadow-sm">
                  <h5 className="text-xl font-bold text-[#003434] mb-6 pb-4 border-b border-[#e2e2e2]">Bài viết liên quan</h5>
                  <div className="flex flex-col gap-6">
                    {relatedPosts.map((item: any) => {
                      const thumb = item.coverImage || item.featuredImage;
                      return (
                        <Link key={item.id} className="group flex gap-4 items-center" href={`/blog/${item.slug}`}>
                          <div className="w-20 h-20 shrink-0 rounded-xl overflow-hidden border border-[#bfc8c8] relative bg-[#003434]">
                            <SafeImage
                              src={thumb || ''}
                              alt={item.title}
                              fill
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h6 className="font-bold text-xs md:text-sm text-[#1a1c1c] group-hover:text-[#006a6a] transition-colors line-clamp-2 leading-snug">
                              {item.title}
                            </h6>
                            <p className="text-[11px] text-[#6f7978] mt-1.5">
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
              <div className="bg-white p-7 rounded-2xl border border-[#bfc8c8] shadow-sm">
                <h5 className="text-sm font-bold text-[#003434] mb-4">Chia sẻ bài viết này:</h5>
                <div className="flex items-center gap-3">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 flex items-center justify-center border border-[#bfc8c8] rounded-xl hover:bg-[#003434] hover:text-white text-[#003434] transition-colors shadow-sm"
                    aria-label="Facebook"
                  >
                    <Facebook className="size-4" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center border border-[#bfc8c8] rounded-xl hover:bg-[#003434] hover:text-white text-[#003434] transition-colors shadow-sm"
                    aria-label="Twitter"
                  >
                    <Twitter className="size-4" />
                  </a>
                  <a
                    href={articleUrl}
                    className="w-11 h-11 flex items-center justify-center border border-[#bfc8c8] rounded-xl hover:bg-[#003434] hover:text-white text-[#003434] transition-colors shadow-sm"
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

      {/* BOTTOM NEWSLETTER SECTION */}
      <section className="bg-[#eeeeed] py-24 mt-20 border-t border-[#e2e2e2] clear-both">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-[#003434] mb-5">
            Nâng tầm hiện diện số của bạn
          </h2>
          <p className="text-sm md:text-base text-[#3f4848] max-w-2xl mx-auto mb-12 leading-relaxed">
            Gia nhập cộng đồng 10,000+ nhà phát triển và chuyên gia Marketing đang theo dõi bản tin từ KABO.
          </p>
          <form className="flex flex-col md:flex-row gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Địa chỉ email của bạn"
              className="flex-grow p-4.5 rounded-xl border border-[#bfc8c8] focus:border-[#006a6a] outline-none text-sm bg-white"
            />
            <button
              type="submit"
              className="bg-[#003434] text-white px-9 py-4.5 rounded-xl font-bold hover:bg-[#006a6a] transition-all text-sm shrink-0 shadow-sm"
            >
              Đăng ký bản tin
            </button>
          </form>
          <p className="text-xs text-[#6f7978] mt-5 italic">
            Chúng tôi tôn trọng sự riêng tư của bạn. Không bao giờ gửi thư rác.
          </p>
        </div>
      </section>
    </div>
  );
}
