import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { BlogService } from '@/services/blog.service';
import { Calendar, ArrowLeft, Tag, Share2, Sparkles, BookOpen } from 'lucide-react';

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

        {/* Tags & Footer */}
        <footer className="mt-10 pt-8 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
          {post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="size-4 text-gray-400" />
              {post.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200/60"
                >
                  #{tag}
                </span>
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
      </article>
    </div>
  );
}
