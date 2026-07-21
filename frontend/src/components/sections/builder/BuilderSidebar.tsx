'use client';

import { useState, useEffect } from 'react';
import { AlignCenter, AlignLeft, AlignRight, CheckCircle, Image, Layout, Palette, Settings, Type } from 'lucide-react';

interface Props {
  selectedId: string | null;
  pbConfig: any;
  onChange: (newConfig: any) => void;
}

export default function BuilderSidebar({ selectedId, pbConfig, onChange }: Props) {
  const [selectedNode, setSelectedNode] = useState<any>(null);

  useEffect(() => {
    if (selectedId && pbConfig) {
      setSelectedNode(pbConfig[selectedId]);
    } else {
      setSelectedNode(null);
    }
  }, [selectedId, pbConfig]);

  if (!selectedNode) {
    return (
      <div className="w-[340px] border-l border-gray-200 bg-[#fafafa] p-6 flex flex-col justify-center items-center text-center text-gray-400 select-none">
        <Layout className="h-10 w-10 mb-3 text-gray-300 animate-pulse" />
        <p className="text-sm font-bold text-[#0f0f0f]/60">Chưa chọn phần tử nào</p>
        <p className="text-xs text-gray-400 max-w-[200px] mt-1 leading-relaxed">
          Hãy nhấp chọn một dòng, cột, tiêu đề hoặc hình ảnh trong trang để bắt đầu chỉnh sửa.
        </p>
      </div>
    );
  }

  const handleUpdateAttr = (keyPath: string[], value: any) => {
    const configCopy = { ...pbConfig };
    const nodeCopy = { ...configCopy[selectedId!] };
    
    // Deep clone customAttributes and styles to prevent React state mutation bugs
    nodeCopy.customAttributes = JSON.parse(JSON.stringify(nodeCopy.customAttributes || {}));
    nodeCopy.style = JSON.parse(JSON.stringify(nodeCopy.style || {}));

    let target = nodeCopy;
    for (let i = 0; i < keyPath.length - 1; i++) {
      const key = keyPath[i];
      if (!target[key]) target[key] = {};
      target[key] = { ...target[key] };
      target = target[key];
    }
    target[keyPath[keyPath.length - 1]] = value;

    configCopy[selectedId!] = nodeCopy;
    onChange(configCopy);
  };

  const getStyleVal = (styleKey: string) => {
    return selectedNode.style?.[styleKey] || '';
  };

  const isTextType = selectedNode.resolvedName === 'HeadingEditor' || selectedNode.resolvedName === 'ParagraphEditor';
  const textKey = selectedNode.resolvedName === 'HeadingEditor' ? 'heading' : 'paragraph';

  return (
    <div className="w-[340px] border-l border-gray-200 bg-white h-screen overflow-y-auto flex flex-col select-none shadow-[0_-12px_40px_rgba(0,0,0,0.03)] z-40">
      {/* Title */}
      <div className="px-5 py-4 border-b border-gray-100 bg-gray-50 flex items-center gap-2">
        <Settings className="h-4.5 w-4.5 text-[#006672]" />
        <span className="font-extrabold text-sm text-[#0f0f0f] uppercase tracking-wider">
          Thuộc tính: {selectedNode.resolvedName.replace('Editor', '')}
        </span>
      </div>

      <div className="p-5 flex flex-col gap-6 flex-1">
        {/* TEXT EDITOR ELEMENT */}
        {isTextType && (
          <div className="flex flex-col gap-3">
            <label className="text-xs font-extrabold text-[#0f0f0f] flex items-center gap-1.5 uppercase tracking-wide">
              <Type className="h-4 w-4 text-gray-500" />
              Nội dung văn bản (HTML)
            </label>
            <textarea
              className="w-full h-40 border border-gray-200 rounded-xl p-3 text-xs font-mono bg-gray-50/50 focus:bg-white focus:ring-1 focus:ring-[#006672] focus:border-[#006672] outline-none transition-all leading-relaxed"
              value={selectedNode.customAttributes?.[textKey]?.text || ''}
              onChange={(e) => handleUpdateAttr(['customAttributes', textKey, 'text'], e.target.value)}
            />
            <p className="text-[10px] text-gray-400 italic">
              *Mẹo: Bạn có thể thêm các thẻ style inline như color, font-weight, font-size trực tiếp vào HTML.
            </p>
          </div>
        )}

        {/* IMAGE EDITOR ELEMENT */}
        {selectedNode.resolvedName === 'ImageEditor' && (
          <div className="flex flex-col gap-3">
            <label className="text-xs font-extrabold text-[#0f0f0f] flex items-center gap-1.5 uppercase tracking-wide">
              <Image className="h-4 w-4 text-gray-500" />
              Đường dẫn hình ảnh
            </label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs bg-gray-50/50 focus:bg-white focus:ring-1 focus:ring-[#006672] focus:border-[#006672] outline-none transition-all"
              value={selectedNode.customAttributes?.image?.src || ''}
              onChange={(e) => handleUpdateAttr(['customAttributes', 'image', 'src'], e.target.value)}
            />
            <p className="text-[10px] text-gray-400">
              *Nhập URL hình ảnh (PNG, JPG, SVG) công khai để tải lên giao diện.
            </p>
          </div>
        )}

        {/* SPACER EDITOR ELEMENT */}
        {selectedNode.resolvedName === 'SpacerEditor' && (
          <div className="flex flex-col gap-3">
            <label className="text-xs font-extrabold text-[#0f0f0f] flex items-center gap-1.5 uppercase tracking-wide">
              Chiều cao khoảng trống (px)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="5"
                max="200"
                step="5"
                className="flex-1 accent-[#006672] cursor-pointer"
                value={selectedNode.customAttributes?.spacer?.height || 24}
                onChange={(e) => handleUpdateAttr(['customAttributes', 'spacer', 'height'], parseInt(e.target.value))}
              />
              <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md">
                {selectedNode.customAttributes?.spacer?.height || 24}px
              </span>
            </div>
          </div>
        )}

        {/* GENERAL STYLE EDITOR: Background & Colors */}
        <div className="flex flex-col gap-4 border-t border-gray-100 pt-6">
          <span className="text-xs font-extrabold text-gray-400 uppercase tracking-wider block mb-1">
            Thiết kế & Bố cục
          </span>

          {/* Background Color */}
          <div className="flex flex-col gap-2.5">
            <label className="text-xs font-bold text-gray-600 flex items-center gap-1.5">
              <Palette className="h-3.5 w-3.5" />
              Màu nền (Background Color)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                className="w-10 h-8 p-0.5 rounded border border-gray-200 cursor-pointer"
                value={getStyleVal('backgroundColor').startsWith('#') ? getStyleVal('backgroundColor') : '#ffffff'}
                onChange={(e) => handleUpdateAttr(['style', 'backgroundColor'], e.target.value)}
              />
              <input
                type="text"
                className="flex-1 border border-gray-200 rounded-lg px-2.5 py-1 text-xs font-mono outline-none"
                placeholder="transparent hoặc hex"
                value={getStyleVal('backgroundColor')}
                onChange={(e) => handleUpdateAttr(['style', 'backgroundColor'], e.target.value)}
              />
            </div>
          </div>

          {/* Background Image URL */}
          {selectedNode.resolvedName === 'RowEditor' && (
            <div className="flex flex-col gap-2.5">
              <label className="text-xs font-bold text-gray-600 flex items-center gap-1.5">
                <Image className="h-3.5 w-3.5" />
                Ảnh nền Row (URL)
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-lg px-3 py-1.5 text-xs outline-none"
                placeholder="https://..."
                value={getStyleVal('backgroundImage') || ''}
                onChange={(e) => handleUpdateAttr(['style', 'backgroundImage'], e.target.value)}
              />
            </div>
          )}

          {/* Width Limit for Row */}
          {selectedNode.resolvedName === 'RowEditor' && (
            <div className="flex flex-col gap-2.5">
              <label className="text-xs font-bold text-gray-600">
                Độ rộng cột hiển thị tối đa (px)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min="600"
                  max="1400"
                  step="50"
                  className="flex-1 accent-[#006672]"
                  value={selectedNode.customAttributes?.section?.row?.commonStyle?.maxWidth || 1200}
                  onChange={(e) => handleUpdateAttr(['customAttributes', 'section', 'row', 'commonStyle', 'maxWidth'], parseInt(e.target.value))}
                />
                <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md">
                  {selectedNode.customAttributes?.section?.row?.commonStyle?.maxWidth || 1200}px
                </span>
              </div>
            </div>
          )}

          {/* Border Radius */}
          <div className="flex flex-col gap-2.5">
            <label className="text-xs font-bold text-gray-600">
              Bo góc viền (Border Radius)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="64"
                step="4"
                className="flex-1 accent-[#006672]"
                value={parseInt(getStyleVal('borderRadius')) || 0}
                onChange={(e) => handleUpdateAttr(['style', 'borderRadius'], parseInt(e.target.value))}
              />
              <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md">
                {parseInt(getStyleVal('borderRadius')) || 0}px
              </span>
            </div>
          </div>
        </div>

        {/* Selected element details */}
        <div className="mt-auto border-t border-gray-100 pt-6 select-text">
          <div className="bg-gray-50 rounded-xl p-3 text-[10px] font-mono text-gray-400 flex flex-col gap-1">
            <div>ID: {selectedNode.id}</div>
            <div>Tag: {selectedNode.tag}</div>
            <div>Parent: {selectedNode.parentId}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
