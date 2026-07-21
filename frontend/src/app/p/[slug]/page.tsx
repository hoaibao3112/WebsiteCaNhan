'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { customPagesService } from '@/services/custom-pages.service';
import BuilderCanvas from '@/components/sections/builder/BuilderCanvas';

export default function PublishedPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState<any>(null);

  useEffect(() => {
    async function loadPage() {
      try {
        setLoading(true);
        const data = await customPagesService.getPageBySlug(slug);
        if (data) {
          setPageData(data);
        } else {
          notFound();
        }
      } catch (err) {
        console.error('Error loading published page:', err);
        notFound();
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadPage();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 text-[#006672] animate-spin mb-4" />
        <p className="text-sm font-semibold text-gray-500">Đang tải trang...</p>
      </div>
    );
  }

  if (!pageData) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-white">
      <BuilderCanvas
        pbConfig={pageData.pbConfig}
        selectedId={null}
        allowEdit={false}
      />
    </div>
  );
}
