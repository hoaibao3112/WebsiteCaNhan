import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { backendTemplatesService } from '@/services/templates.service';
import TemplateDemoClient from '@/components/sections/templates/TemplateDemoClient';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const allTemplates = await backendTemplatesService.getAllTemplates();
  return allTemplates.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const template = await backendTemplatesService.getTemplateBySlug(slug);

  if (!template) {
    return { title: 'Không tìm thấy' };
  }

  return {
    title: `Demo Giao diện ${template.title} — KABO AGENCY`,
    description: `Xem bản demo hình ảnh đầy đủ của giao diện ${template.title}`,
  };
}

export default async function TemplateDemoPage({ params }: Props) {
  const { slug } = await params;
  const template = await backendTemplatesService.getTemplateBySlug(slug);

  if (!template) {
    notFound();
  }

  return (
    <TemplateDemoClient
      title={template.title}
      slug={slug}
      price={(template.price ?? 0).toString()}
      pbConfig={template.pbConfig}
      demoImages={template.demoImages}
      image={template.image}
    />
  );
}
