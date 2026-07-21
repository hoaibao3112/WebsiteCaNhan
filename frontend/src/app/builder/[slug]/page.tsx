'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, Monitor, Smartphone, Save, Eye, Sparkles, Loader2, Check 
} from 'lucide-react';
import { backendTemplatesService } from '@/services/templates.service';
import { customPagesService } from '@/services/custom-pages.service';
import BuilderCanvas from '@/components/sections/builder/BuilderCanvas';
import BuilderSidebar from '@/components/sections/builder/BuilderSidebar';

export default function BuilderPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const [title, setTitle] = useState('');
  const [pbConfig, setPbConfig] = useState<any>(null);
  const [templateId, setTemplateId] = useState('');
  const [isCustomPage, setIsCustomPage] = useState(false);

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        // 1. Try loading as an existing customized page
        let page = await customPagesService.getPageBySlug(slug);
        
        if (page) {
          setTitle(page.title);
          setPbConfig(page.pbConfig);
          setTemplateId(page.templateId);
          setIsCustomPage(true);
        } else {
          // 2. Fall back to loading as a base template configuration to clone
          const baseTemplate = await backendTemplatesService.getTemplateBySlug(slug);
          if (baseTemplate) {
            setTitle(`${baseTemplate.title} (Customized)`);
            setPbConfig(baseTemplate.pbConfig || {});
            setTemplateId(baseTemplate.id);
            setIsCustomPage(false);
          } else {
            console.error('Template or Page not found');
            router.push('/giao-dien-mau');
          }
        }
      } catch (err) {
        console.error('Error loading builder data:', err);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadData();
    }
  }, [slug, router]);

  const handleSave = async () => {
    if (!pbConfig) return;
    try {
      setSaving(true);
      setSaveSuccess(false);

      if (isCustomPage) {
        // Save updates to the existing customized page
        await customPagesService.updatePage(slug, {
          title,
          pbConfig,
        });
      } else {
        // Create a new custom page clone
        const customSlug = `${slug}-custom-${Math.floor(1000 + Math.random() * 9000)}`;
        const newPage = await customPagesService.createPage({
          slug: customSlug,
          title,
          templateId,
          pbConfig,
        });

        if (newPage) {
          setIsCustomPage(true);
          // Redirect to the newly created builder URL
          router.replace(`/builder/${customSlug}`);
        }
      }
      
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving custom page:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 text-[#006672] animate-spin mb-4" />
        <p className="text-sm font-bold text-gray-500">Đang tải cấu trúc layout...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col h-screen overflow-hidden">
      {/* Visual Editor Header/Action Bar */}
      <header className="bg-white border-b border-gray-200 h-16 px-6 flex items-center justify-between z-50 shadow-[0_2px_12px_rgba(0,0,0,0.02)] shrink-0 select-none">
        
        {/* Left: Back Link & Page Title */}
        <div className="flex items-center gap-4">
          <Link
            href="/giao-dien-mau"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-600 hover:text-gray-900"
            title="Quay lại thư viện"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex flex-col">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-sm font-black text-[#0f0f0f] focus:outline-none focus:border-b focus:border-[#006672] bg-transparent border-b border-transparent py-0.5 max-w-[240px]"
            />
            <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="h-3 w-3 text-[#006672]" /> Trình dựng trang Kabo
            </span>
          </div>
        </div>

        {/* Center: Viewport toggle controls */}
        <div className="flex items-center p-1 bg-gray-100 rounded-xl border border-gray-200">
          <button
            onClick={() => setViewport('desktop')}
            className={`p-2 rounded-lg transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer ${
              viewport === 'desktop'
                ? 'bg-white text-[#006672] shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Monitor className="h-4 w-4" />
            Máy tính
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={`p-2 rounded-lg transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer ${
              viewport === 'mobile'
                ? 'bg-white text-[#006672] shadow-sm'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <Smartphone className="h-4 w-4" />
            Di động
          </button>
        </div>

        {/* Right: Preview & Save actions */}
        <div className="flex items-center gap-3">
          {/* Public Preview Button */}
          {isCustomPage && (
            <Link
              href={`/p/${slug}`}
              target="_blank"
              className="btn-secondary text-xs py-2 px-4 flex items-center gap-2"
            >
              <Eye className="h-4 w-4" />
              Xem Trang Thật
            </Link>
          )}

          {/* Save Layout Button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className={`text-xs py-2.5 px-4 font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              saveSuccess
                ? 'bg-green-600 text-white'
                : 'bg-[#006672] hover:bg-[#004d56] text-white shadow-md'
            }`}
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : saveSuccess ? (
              <Check className="h-4 w-4" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {saving ? 'Đang lưu...' : saveSuccess ? 'Đã lưu thành công!' : 'Lưu Giao Diện'}
          </button>
        </div>
      </header>

      {/* Main Workspace split */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Editor Area (Center Scrollable Canvas) */}
        <div className="flex-1 overflow-y-auto p-8 flex justify-center items-start bg-gray-50">
          <div
            className="transition-all duration-300 bg-white shadow-xl min-h-[85vh] border border-gray-200"
            style={{
              width: viewport === 'desktop' ? '100%' : '375px',
              maxWidth: viewport === 'desktop' ? '1200px' : '375px',
              borderRadius: viewport === 'desktop' ? '16px' : '24px',
            }}
          >
            {pbConfig && (
              <BuilderCanvas
                pbConfig={pbConfig}
                selectedId={selectedId}
                onSelectNode={setSelectedId}
                allowEdit={true}
              />
            )}
          </div>
        </div>

        {/* Right: Property Settings Sidebar */}
        <BuilderSidebar
          selectedId={selectedId}
          pbConfig={pbConfig}
          onChange={setPbConfig}
        />
      </div>
    </div>
  );
}
