'use client';

import PotSmashingGame from './PotSmashingGame';
import PopupLuckyWheel from './PopupLuckyWheel';

interface Props {
  pbConfig: any;
  selectedId: string | null;
  onSelectNode?: (id: string) => void;
  allowEdit?: boolean;
}

// Inline CSS mapper for Page Builder node styles
export function mapStyles(styleObj: any) {
  if (!styleObj) return {};
  
  const desktopStyles = styleObj.desktop || {};
  const padding = styleObj.padding || {};
  const margin = styleObj.margin || {};
  
  const mapped: any = {
    ...styleObj,
    ...desktopStyles,
  };

  // Convert spacing objects to standard inline styles
  if (typeof padding === 'object') {
    if (padding.top !== undefined) mapped.paddingTop = `${padding.top}px`;
    if (padding.bottom !== undefined) mapped.paddingBottom = `${padding.bottom}px`;
    if (padding.left !== undefined) mapped.paddingLeft = `${padding.left}px`;
    if (padding.right !== undefined) mapped.paddingRight = `${padding.right}px`;
  }

  if (typeof margin === 'object') {
    if (margin.top !== undefined) mapped.marginTop = `${margin.top}px`;
    if (margin.bottom !== undefined) mapped.marginBottom = `${margin.bottom}px`;
    if (margin.left !== undefined) mapped.marginLeft = `${margin.left}px`;
    if (margin.right !== undefined) mapped.marginRight = `${margin.right}px`;
  }

  // Cover numeric values to px
  if (typeof mapped.borderRadius === 'number') mapped.borderRadius = `${mapped.borderRadius}px`;
  if (typeof mapped.height === 'number') mapped.height = `${mapped.height}px`;
  if (typeof mapped.width === 'number') mapped.width = `${mapped.width}px`;

  // Map background Image URL format
  if (mapped.backgroundImage && !mapped.backgroundImage.startsWith('url(')) {
    mapped.backgroundImage = `url(${mapped.backgroundImage})`;
  }

  // Clean sub-properties that React style tag doesn't support
  delete mapped.desktop;
  delete mapped.mobile;
  delete mapped.padding;
  delete mapped.margin;
  delete mapped.backgroundVideo;
  delete mapped.bgImagePercent;
  delete mapped.bgImageWidth;

  return mapped;
}

export default function BuilderCanvas({
  pbConfig,
  selectedId,
  onSelectNode,
  allowEdit = true,
}: Props) {
  if (!pbConfig) return null;

  // Recursive renderer function
  const renderNode = (id: string) => {
    const node = pbConfig[id];
    if (!node) return null;

    const styles = mapStyles(node.style);

    switch (node.resolvedName) {
      case 'RootEditor':
        return (
          <div 
            key={id} 
            style={{ ...styles, minHeight: '100vh', width: '100%' }}
            className="flex flex-col relative"
          >
            {node.children?.map((childId: string) => renderNode(childId))}
          </div>
        );

      case 'RowEditor': {
        const isFullWidth = node.customAttributes?.section?.widthType === 'full';
        const maxWidth = node.customAttributes?.section?.row?.commonStyle?.maxWidth || 1200;
        return (
          <section
            key={id}
            style={{ ...styles, display: 'flex', flexDirection: 'column', width: '100%' }}
            className={`relative w-full ${
              allowEdit ? 'hover:outline-1 hover:outline-dashed hover:outline-cyan-400/60 transition-all' : ''
            } ${selectedId === id && allowEdit ? 'outline-2 outline-cyan-500 outline-offset-[-2px]' : ''}`}
            onClick={(e) => {
              if (!allowEdit) return;
              e.stopPropagation();
              onSelectNode?.(id);
            }}
          >
            {/* Label for selected item */}
            {selectedId === id && allowEdit && (
              <div className="absolute top-1 left-1 bg-cyan-500 text-white text-[9px] px-1 py-0.5 rounded font-black z-30 select-none shadow">
                ROW
              </div>
            )}
            <div 
              className="mx-auto w-full flex flex-wrap" 
              style={{ maxWidth: isFullWidth ? '100%' : `${maxWidth}px` }}
            >
              {node.children?.map((childId: string) => renderNode(childId))}
            </div>
          </section>
        );
      }

      case 'ColEditor': {
        const flexBasis = node.customAttributes?.col?.md?.flex || '100%';
        return (
          <div
            key={id}
            style={{ ...styles, flex: `1 1 ${flexBasis}`, display: 'flex', flexDirection: 'column' }}
            className={`relative ${
              allowEdit ? 'hover:outline-1 hover:outline-dashed hover:outline-cyan-400/60 transition-all' : ''
            } ${selectedId === id && allowEdit ? 'outline-2 outline-cyan-500 outline-offset-[-2px]' : ''}`}
            onClick={(e) => {
              if (!allowEdit) return;
              e.stopPropagation();
              onSelectNode?.(id);
            }}
          >
            {selectedId === id && allowEdit && (
              <div className="absolute top-1 left-1 bg-cyan-500 text-white text-[9px] px-1 py-0.5 rounded font-black z-30 select-none shadow">
                COLUMN
              </div>
            )}
            {node.children?.map((childId: string) => renderNode(childId))}
          </div>
        );
      }

      case 'HeadingEditor': {
        const htmlText = node.customAttributes?.heading?.text || 'Heading text...';
        return (
          <div
            key={id}
            style={styles}
            className={`relative p-2 ${
              allowEdit ? 'hover:outline-1 hover:outline-dashed hover:outline-cyan-400/60 cursor-text' : ''
            } ${selectedId === id && allowEdit ? 'outline-2 outline-cyan-500' : ''}`}
            onClick={(e) => {
              if (!allowEdit) return;
              e.stopPropagation();
              onSelectNode?.(id);
            }}
          >
            {selectedId === id && allowEdit && (
              <div className="absolute top-0.5 left-0.5 bg-cyan-500 text-white text-[9px] px-1 py-0.5 rounded font-black z-30 select-none shadow">
                HEADING
              </div>
            )}
            <div dangerouslySetInnerHTML={{ __html: htmlText }} />
          </div>
        );
      }

      case 'ParagraphEditor': {
        const htmlText = node.customAttributes?.paragraph?.text || 'Paragraph text...';
        return (
          <div
            key={id}
            style={styles}
            className={`relative p-2 ${
              allowEdit ? 'hover:outline-1 hover:outline-dashed hover:outline-cyan-400/60 cursor-text' : ''
            } ${selectedId === id && allowEdit ? 'outline-2 outline-cyan-500' : ''}`}
            onClick={(e) => {
              if (!allowEdit) return;
              e.stopPropagation();
              onSelectNode?.(id);
            }}
          >
            {selectedId === id && allowEdit && (
              <div className="absolute top-0.5 left-0.5 bg-cyan-500 text-white text-[9px] px-1 py-0.5 rounded font-black z-30 select-none shadow">
                PARAGRAPH
              </div>
            )}
            <div dangerouslySetInnerHTML={{ __html: htmlText }} />
          </div>
        );
      }

      case 'ImageEditor': {
        const src = node.customAttributes?.image?.src || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&q=80';
        return (
          <div
            key={id}
            style={styles}
            className={`relative ${
              allowEdit ? 'hover:outline-1 hover:outline-dashed hover:outline-cyan-400/60 cursor-pointer' : ''
            } ${selectedId === id && allowEdit ? 'outline-2 outline-cyan-500' : ''}`}
            onClick={(e) => {
              if (!allowEdit) return;
              e.stopPropagation();
              onSelectNode?.(id);
            }}
          >
            {selectedId === id && allowEdit && (
              <div className="absolute top-1 left-1 bg-cyan-500 text-white text-[9px] px-1 py-0.5 rounded font-black z-30 select-none shadow">
                IMAGE
              </div>
            )}
            <img 
              src={src} 
              alt="Custom Page element" 
              className="max-w-full h-auto object-contain mx-auto select-none pointer-events-none" 
            />
          </div>
        );
      }

      case 'SpacerEditor': {
        const height = node.customAttributes?.spacer?.height || 24;
        return (
          <div
            key={id}
            style={{ height: `${height}px`, width: '100%' }}
            className={`relative ${
              allowEdit ? 'hover:outline-1 hover:outline-dashed hover:outline-cyan-400/60 cursor-row-resize' : ''
            } ${selectedId === id && allowEdit ? 'outline-2 outline-cyan-500' : ''}`}
            onClick={(e) => {
              if (!allowEdit) return;
              e.stopPropagation();
              onSelectNode?.(id);
            }}
          >
            {selectedId === id && allowEdit && (
              <div className="absolute top-0.5 left-0.5 bg-cyan-500 text-white text-[9px] px-1 py-0.5 rounded font-black z-30 select-none shadow">
                SPACER
              </div>
            )}
          </div>
        );
      }

      case 'PotSmashingEditor': {
        const attrs = node.customAttributes?.potsmashing || {};
        return (
          <div
            key={id}
            className={`relative w-full p-4 ${
              allowEdit ? 'hover:outline-1 hover:outline-dashed hover:outline-cyan-400/60' : ''
            } ${selectedId === id && allowEdit ? 'outline-2 outline-cyan-500' : ''}`}
            onClick={(e) => {
              if (!allowEdit) return;
              e.stopPropagation();
              onSelectNode?.(id);
            }}
          >
            {selectedId === id && allowEdit && (
              <div className="absolute top-1 left-1 bg-cyan-500 text-white text-[9px] px-1 py-0.5 rounded font-black z-30 select-none shadow">
                GAME ĐẬP NIÊU
              </div>
            )}
            <PotSmashingGame
              imageInit={attrs.imageInit?.src}
              imageResult={attrs.imageResult?.src}
              columnCount={attrs.desktop?.columnCount || 6}
              rowCount={attrs.desktop?.rowCount || 2}
              allowEdit={allowEdit}
            />
          </div>
        );
      }

      case 'PopupGameEditor':
        return (
          <div
            key={id}
            className={`relative w-full p-4 ${
              allowEdit ? 'hover:outline-1 hover:outline-dashed hover:outline-cyan-400/60' : ''
            } ${selectedId === id && allowEdit ? 'outline-2 outline-cyan-500' : ''}`}
            onClick={(e) => {
              if (!allowEdit) return;
              e.stopPropagation();
              onSelectNode?.(id);
            }}
          >
            {selectedId === id && allowEdit && (
              <div className="absolute top-1 left-1 bg-cyan-500 text-white text-[9px] px-1 py-0.5 rounded font-black z-30 select-none shadow">
                GAME VÒNG QUAY
              </div>
            )}
            <PopupLuckyWheel allowEdit={allowEdit} />
          </div>
        );

      default:
        // Render fallback container if children exist
        if (node.children && node.children.length > 0) {
          return (
            <div key={id}>
              {node.children.map((childId: string) => renderNode(childId))}
            </div>
          );
        }
        return null;
    }
  };

  return renderNode('ROOT');
}
