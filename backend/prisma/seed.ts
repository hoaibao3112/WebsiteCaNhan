import { PrismaClient, Prisma } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

function getKaboHomepageConfig() {
  return {
    "ROOT": {
      "id": "ROOT",
      "resolvedName": "RootEditor",
      "children": [
        "hero-row", 
        "ai-row", 
        "dragdrop-row", 
        "templates-row", 
        "trust-row", 
        "feature-promo-1", 
        "feature-promo-2", 
        "feature-promo-3", 
        "testimonials-row"
      ],
      "style": {}
    },
    // 1. HERO SECTION
    "hero-row": {
      "id": "hero-row",
      "resolvedName": "RowEditor",
      "children": ["hero-col"],
      "style": { "backgroundColor": "#ffffff", "padding": { "top": 80, "bottom": 80, "left": 24, "right": 24 } },
      "customAttributes": { "section": { "widthType": "fixed", "row": { "commonStyle": { "maxWidth": 1200 } } } }
    },
    "hero-col": {
      "id": "hero-col",
      "resolvedName": "ColEditor",
      "children": ["hero-title", "hero-subtitle", "hero-btn-container", "hero-spacer", "hero-img"],
      "style": { "alignItems": "center", "textAlign": "center" },
      "customAttributes": { "col": { "md": { "flex": "100%" } } }
    },
    "hero-title": {
      "id": "hero-title",
      "resolvedName": "HeadingEditor",
      "customAttributes": { "heading": { "text": "<h1 style='font-size: 56px; font-weight: 900; color: #1e1b4b; line-height: 1.15; max-width: 900px; margin: 0 auto 16px;'>Tạo Website & Landing Page<br/>nhanh chóng</h1>" } }
    },
    "hero-subtitle": {
      "id": "hero-subtitle",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<p style='font-size: 18px; color: #6b7280; font-weight: 500; max-width: 800px; margin: 0 auto 28px;'>Kéo thả dễ dàng - Không cần lập trình - AI tự động hoá - Bứt phá doanh thu</p>" } }
    },
    "hero-btn-container": {
      "id": "hero-btn-container",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<div style='text-align: center;'><a href='/builder/home' style='display: inline-block; background-color: #a855f7; color: #ffffff; font-weight: 800; font-size: 16px; padding: 14px 40px; border-radius: 9999px; text-decoration: none; box-shadow: 0 6px 20px rgba(168, 85, 247, 0.4); transition: all 0.2s;'>Sử dụng miễn phí ngay →</a></div>" } }
    },
    "hero-spacer": {
      "id": "hero-spacer",
      "resolvedName": "SpacerEditor",
      "customAttributes": { "spacer": { "height": 40 } }
    },
    "hero-img": {
      "id": "hero-img",
      "resolvedName": "ImageEditor",
      "customAttributes": { "image": { "src": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&q=80" } }
    },

    // 2. AI SECTION
    "ai-row": {
      "id": "ai-row",
      "resolvedName": "RowEditor",
      "children": ["ai-col"],
      "style": { "backgroundColor": "#f8fafc", "padding": { "top": 80, "bottom": 80, "left": 24, "right": 24 } },
      "customAttributes": { "section": { "widthType": "fixed", "row": { "commonStyle": { "maxWidth": 1200 } } } }
    },
    "ai-col": {
      "id": "ai-col",
      "resolvedName": "ColEditor",
      "children": ["ai-title", "ai-subtitle", "ai-btn-container", "ai-spacer", "ai-img"],
      "style": { "alignItems": "center", "textAlign": "center" },
      "customAttributes": { "col": { "md": { "flex": "100%" } } }
    },
    "ai-title": {
      "id": "ai-title",
      "resolvedName": "HeadingEditor",
      "customAttributes": { "heading": { "text": "<h2 style='font-size: 38px; font-weight: 900; color: #1e1b4b; line-height: 1.25; max-width: 900px; margin: 0 auto 16px;'>Biến ý tưởng thành website chuyên nghiệp<br/>chỉ trong vài phút với <span style='background-color: #eab308; color: #000000; padding: 2px 8px; border-radius: 6px;'>AI</span></h2>" } }
    },
    "ai-subtitle": {
      "id": "ai-subtitle",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<p style='font-size: 16px; color: #6b7280; font-weight: 500; margin-bottom: 24px;'>Tạo & Chỉnh sửa website chỉ bằng cách chat với AI</p>" } }
    },
    "ai-btn-container": {
      "id": "ai-btn-container",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<div style='text-align: center;'><a href='/builder/home' style='display: inline-block; background-color: #a855f7; color: #ffffff; font-weight: 800; font-size: 15px; padding: 12px 36px; border-radius: 9999px; text-decoration: none;'>Trải nghiệm AI Editor →</a></div>" } }
    },
    "ai-spacer": {
      "id": "ai-spacer",
      "resolvedName": "SpacerEditor",
      "customAttributes": { "spacer": { "height": 40 } }
    },
    "ai-img": {
      "id": "ai-img",
      "resolvedName": "ImageEditor",
      "customAttributes": { "image": { "src": "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&q=80" } }
    },

    // 3. DRAG & DROP SECTION
    "dragdrop-row": {
      "id": "dragdrop-row",
      "resolvedName": "RowEditor",
      "children": ["dd-col"],
      "style": { "backgroundColor": "#ffffff", "padding": { "top": 80, "bottom": 80, "left": 24, "right": 24 } },
      "customAttributes": { "section": { "widthType": "fixed", "row": { "commonStyle": { "maxWidth": 1200 } } } }
    },
    "dd-col": {
      "id": "dd-col",
      "resolvedName": "ColEditor",
      "children": ["dd-title", "dd-subtitle", "dd-tabs", "dd-img", "dd-btn-container"],
      "style": { "alignItems": "center", "textAlign": "center" },
      "customAttributes": { "col": { "md": { "flex": "100%" } } }
    },
    "dd-title": {
      "id": "dd-title",
      "resolvedName": "HeadingEditor",
      "customAttributes": { "heading": { "text": "<h2 style='font-size: 38px; font-weight: 900; color: #1e1b4b; margin-bottom: 12px;'>Kéo thả dễ dàng, không cần biết code</h2>" } }
    },
    "dd-subtitle": {
      "id": "dd-subtitle",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<p style='font-size: 16px; color: #6b7280; margin-bottom: 32px;'>Kabo hỗ trợ sẵn những thứ bạn cần, từ nhu cầu cá nhân đến doanh nghiệp</p>" } }
    },
    "dd-tabs": {
      "id": "dd-tabs",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<div style='display: flex; gap: 32px; justify-content: center; font-weight: 800; font-size: 15px; margin-bottom: 32px; color: #6b7280; flex-wrap: wrap;'><span style='color: #a855f7; border-bottom: 3px solid #a855f7; padding-bottom: 6px;'>Bán hàng</span><span>Khuyến mãi</span><span>Form kết nối dữ liệu</span><span>Blog</span></div>" } }
    },
    "dd-img": {
      "id": "dd-img",
      "resolvedName": "ImageEditor",
      "customAttributes": { "image": { "src": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80" } }
    },
    "dd-btn-container": {
      "id": "dd-btn-container",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<div style='text-align: center; margin-top: 32px;'><a href='/builder/home' style='display: inline-block; background-color: #a855f7; color: #ffffff; font-weight: 800; font-size: 15px; padding: 12px 36px; border-radius: 9999px; text-decoration: none;'>Sử dụng miễn phí ngay →</a></div>" } }
    },

    // 4. TEMPLATES LIBRARY GRID
    "templates-row": {
      "id": "templates-row",
      "resolvedName": "RowEditor",
      "children": ["tpl-col"],
      "style": { "backgroundColor": "#f0f9ff", "padding": { "top": 80, "bottom": 80, "left": 24, "right": 24 } },
      "customAttributes": { "section": { "widthType": "fixed", "row": { "commonStyle": { "maxWidth": 1200 } } } }
    },
    "tpl-col": {
      "id": "tpl-col",
      "resolvedName": "ColEditor",
      "children": ["tpl-title", "tpl-subtitle", "tpl-cards-row", "tpl-btn-container"],
      "style": { "alignItems": "center", "textAlign": "center" },
      "customAttributes": { "col": { "md": { "flex": "100%" } } }
    },
    "tpl-title": {
      "id": "tpl-title",
      "resolvedName": "HeadingEditor",
      "customAttributes": { "heading": { "text": "<h2 style='font-size: 38px; font-weight: 900; color: #1e1b4b; margin-bottom: 12px;'>500+ mẫu Website & Landing Page đa dạng</h2>" } }
    },
    "tpl-subtitle": {
      "id": "tpl-subtitle",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<p style='font-size: 16px; color: #6b7280; margin-bottom: 40px;'>Dễ dàng tùy chỉnh, đáp ứng mọi nhu cầu của bạn</p>" } }
    },
    "tpl-cards-row": {
      "id": "tpl-cards-row",
      "resolvedName": "RowEditor",
      "children": ["t-card-1", "t-card-2", "t-card-3"],
      "style": { "width": "100%", "backgroundColor": "transparent" },
      "customAttributes": { "section": { "widthType": "full" } }
    },
    "t-card-1": {
      "id": "t-card-1",
      "resolvedName": "ColEditor",
      "children": ["t-img-1", "t-lbl-1"],
      "style": { "backgroundColor": "#ffffff", "borderRadius": "12px", "padding": { "top": 12, "bottom": 16, "left": 12, "right": 12 }, "margin": { "left": 12, "right": 12, "bottom": 24 } },
      "customAttributes": { "col": { "md": { "flex": "30%" } } }
    },
    "t-img-1": {
      "id": "t-img-1",
      "resolvedName": "ImageEditor",
      "customAttributes": { "image": { "src": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80" } }
    },
    "t-lbl-1": {
      "id": "t-lbl-1",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<p style='font-size: 14px; font-weight: 800; color: #1e1b4b; margin-top: 12px; text-align: left;'>Website doanh nghiệp</p>" } }
    },
    "t-card-2": {
      "id": "t-card-2",
      "resolvedName": "ColEditor",
      "children": ["t-img-2", "t-lbl-2"],
      "style": { "backgroundColor": "#ffffff", "borderRadius": "12px", "padding": { "top": 12, "bottom": 16, "left": 12, "right": 12 }, "margin": { "left": 12, "right": 12, "bottom": 24 } },
      "customAttributes": { "col": { "md": { "flex": "30%" } } }
    },
    "t-img-2": {
      "id": "t-img-2",
      "resolvedName": "ImageEditor",
      "customAttributes": { "image": { "src": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&q=80" } }
    },
    "t-lbl-2": {
      "id": "t-lbl-2",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<p style='font-size: 14px; font-weight: 800; color: #1e1b4b; margin-top: 12px; text-align: left;'>Website bán hàng</p>" } }
    },
    "t-card-3": {
      "id": "t-card-3",
      "resolvedName": "ColEditor",
      "children": ["t-img-3", "t-lbl-3"],
      "style": { "backgroundColor": "#ffffff", "borderRadius": "12px", "padding": { "top": 12, "bottom": 16, "left": 12, "right": 12 }, "margin": { "left": 12, "right": 12, "bottom": 24 } },
      "customAttributes": { "col": { "md": { "flex": "30%" } } }
    },
    "t-img-3": {
      "id": "t-img-3",
      "resolvedName": "ImageEditor",
      "customAttributes": { "image": { "src": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80" } }
    },
    "t-lbl-3": {
      "id": "t-lbl-3",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<p style='font-size: 14px; font-weight: 800; color: #1e1b4b; margin-top: 12px; text-align: left;'>Quảng bá dịch vụ</p>" } }
    },
    "tpl-btn-container": {
      "id": "tpl-btn-container",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<div style='text-align: center; margin-top: 24px;'><a href='/giao-dien-mau' style='display: inline-block; background-color: #a855f7; color: #ffffff; font-weight: 800; font-size: 15px; padding: 12px 36px; border-radius: 9999px; text-decoration: none;'>Khám phá thêm →</a></div>" } }
    },

    // 5. SOCIAL PROOF & STATS
    "trust-row": {
      "id": "trust-row",
      "resolvedName": "RowEditor",
      "children": ["trust-col"],
      "style": { "background": "linear-gradient(135deg, #1e1b4b 0%, #4c1d95 100%)", "padding": { "top": 60, "bottom": 60, "left": 24, "right": 24 } },
      "customAttributes": { "section": { "widthType": "fixed", "row": { "commonStyle": { "maxWidth": 1200 } } } }
    },
    "trust-col": {
      "id": "trust-col",
      "resolvedName": "ColEditor",
      "children": ["trust-title", "trust-stats", "trust-logos"],
      "style": { "alignItems": "center", "textAlign": "center" },
      "customAttributes": { "col": { "md": { "flex": "100%" } } }
    },
    "trust-title": {
      "id": "trust-title",
      "resolvedName": "HeadingEditor",
      "customAttributes": { "heading": { "text": "<h3 style='color: #ffffff; font-size: 16px; font-weight: bold; text-align: center; margin-bottom: 28px; text-transform: uppercase; letter-spacing: 0.15em; opacity: 0.7;'>Tin dùng bởi</h3>" } }
    },
    "trust-stats": {
      "id": "trust-stats",
      "resolvedName": "HeadingEditor",
      "customAttributes": { "heading": { "text": "<div style='display: flex; gap: 60px; justify-content: center; color: #ffffff; margin-bottom: 32px; flex-wrap: wrap;'><div style='text-align: center;'><span style='font-size: 44px; font-weight: 900;'>100.000+</span><p style='font-size: 14px; opacity: 0.8; margin-top: 4px;'>Người dùng</p></div><div style='text-align: center;'><span style='font-size: 44px; font-weight: 900;'>200.000+</span><p style='font-size: 14px; opacity: 0.8; margin-top: 4px;'>Website/Landing Page được xuất bản</p></div></div>" } }
    },
    "trust-logos": {
      "id": "trust-logos",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<div style='display: flex; gap: 36px; justify-content: center; flex-wrap: wrap; align-items: center; opacity: 0.7; color: #ffffff; font-weight: 900; font-size: 20px; letter-spacing: 0.05em;'><span>Karavan</span><span>Sói Biển</span><span>Văn Lang</span><span>CentreMall</span><span>Pinpos</span><span>Memogo</span></div>" } }
    },

    // 6. FEATURES DEMO ROWS
    "feature-promo-1": {
      "id": "feature-promo-1",
      "resolvedName": "RowEditor",
      "children": ["fp1-col-left", "fp1-col-right"],
      "style": { "padding": { "top": 80, "bottom": 80, "left": 24, "right": 24 }, "backgroundColor": "#e2f2f0" },
      "customAttributes": { "section": { "widthType": "fixed", "row": { "commonStyle": { "maxWidth": 1200 } } } }
    },
    "fp1-col-left": {
      "id": "fp1-col-left",
      "resolvedName": "ColEditor",
      "children": ["fp1-title", "fp1-features", "fp1-btn"],
      "style": { "justifyContent": "center", "padding": { "right": 24 } },
      "customAttributes": { "col": { "md": { "flex": "46%" } } }
    },
    "fp1-title": {
      "id": "fp1-title",
      "resolvedName": "HeadingEditor",
      "customAttributes": { "heading": { "text": "<h2 style='font-size: 34px; font-weight: 800; color: #115e59; margin-bottom: 20px;'>Quảng bá doanh nghiệp & dịch vụ</h2>" } }
    },
    "fp1-features": {
      "id": "fp1-features",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<ul style='font-size: 15px; color: #374151; line-height: 1.8; margin-bottom: 28px; list-style-type: disc; padding-left: 20px;'><li>Nâng tầm thương hiệu của bạn trên nền tảng số, tăng khả năng hiển thị web trên các công cụ tìm kiếm với các tính năng tối ưu SEO</li><li>Dễ dàng tiếp cận khách hàng với tính năng kết nối quảng cáo đa nền tảng Facebook Ads, Tiktok Ads, Google Ads</li><li>Top banner/ popup hiển thị thông báo quan trọng hoặc chương trình khuyến mãi đến khách hàng</li></ul>" } }
    },
    "fp1-btn": {
      "id": "fp1-btn",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<a href='/builder/home' style='display: inline-block; background-color: #14b8a6; color: #ffffff; font-weight: bold; padding: 12px 32px; border-radius: 9999px; text-decoration: none;'>Sử dụng miễn phí ngay →</a>" } }
    },
    "fp1-col-right": {
      "id": "fp1-col-right",
      "resolvedName": "ColEditor",
      "children": ["fp1-img"],
      "style": { "justifyContent": "center" },
      "customAttributes": { "col": { "md": { "flex": "46%" } } }
    },
    "fp1-img": {
      "id": "fp1-img",
      "resolvedName": "ImageEditor",
      "customAttributes": { "image": { "src": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" } }
    },

    "feature-promo-2": {
      "id": "feature-promo-2",
      "resolvedName": "RowEditor",
      "children": ["fp2-col-left", "fp2-col-right"],
      "style": { "padding": { "top": 80, "bottom": 80, "left": 24, "right": 24 }, "backgroundColor": "#eef2ff" },
      "customAttributes": { "section": { "widthType": "fixed", "row": { "commonStyle": { "maxWidth": 1200 } } } }
    },
    "fp2-col-left": {
      "id": "fp2-col-left",
      "resolvedName": "ColEditor",
      "children": ["fp2-img"],
      "style": { "justifyContent": "center" },
      "customAttributes": { "col": { "md": { "flex": "46%" } } }
    },
    "fp2-img": {
      "id": "fp2-img",
      "resolvedName": "ImageEditor",
      "customAttributes": { "image": { "src": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" } }
    },
    "fp2-col-right": {
      "id": "fp2-col-right",
      "resolvedName": "ColEditor",
      "children": ["fp2-title", "fp2-features", "fp2-btn"],
      "style": { "justifyContent": "center", "padding": { "left": 24 } },
      "customAttributes": { "col": { "md": { "flex": "46%" } } }
    },
    "fp2-title": {
      "id": "fp2-title",
      "resolvedName": "HeadingEditor",
      "customAttributes": { "heading": { "text": "<h2 style='font-size: 34px; font-weight: 800; color: #3730a3; margin-bottom: 20px;'>Website bán hàng</h2>" } }
    },
    "fp2-features": {
      "id": "fp2-features",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<ul style='font-size: 15px; color: #374151; line-height: 1.8; margin-bottom: 28px; list-style-type: disc; padding-left: 20px;'><li>Quản lý sản phẩm, quản lý đơn hàng, giỏ hàng ngay trên website</li><li>Đa dạng phương thức thanh toán: COD, chuyển khoản qua ngân hàng, VNPAY QR</li><li>Nhận thông báo đơn hàng nhanh chóng qua email</li></ul>" } }
    },
    "fp2-btn": {
      "id": "fp2-btn",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<a href='/builder/home' style='display: inline-block; background-color: #4f46e5; color: #ffffff; font-weight: bold; padding: 12px 32px; border-radius: 9999px; text-decoration: none;'>Sử dụng miễn phí ngay →</a>" } }
    },

    "feature-promo-3": {
      "id": "feature-promo-3",
      "resolvedName": "RowEditor",
      "children": ["fp3-col-left", "fp3-col-right"],
      "style": { "padding": { "top": 80, "bottom": 80, "left": 24, "right": 24 }, "backgroundColor": "#fdf2f8" },
      "customAttributes": { "section": { "widthType": "fixed", "row": { "commonStyle": { "maxWidth": 1200 } } } }
    },
    "fp3-col-left": {
      "id": "fp3-col-left",
      "resolvedName": "ColEditor",
      "children": ["fp3-title", "fp3-features", "fp3-btn"],
      "style": { "justifyContent": "center", "padding": { "right": 24 } },
      "customAttributes": { "col": { "md": { "flex": "46%" } } }
    },
    "fp3-title": {
      "id": "fp3-title",
      "resolvedName": "HeadingEditor",
      "customAttributes": { "heading": { "text": "<h2 style='font-size: 34px; font-weight: 800; color: #9d174d; margin-bottom: 20px;'>Landing page khuyến mãi</h2>" } }
    },
    "fp3-features": {
      "id": "fp3-features",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<ul style='font-size: 15px; color: #374151; line-height: 1.8; margin-bottom: 28px; list-style-type: disc; padding-left: 20px;'><li>Minigame: Giúp tăng tối đa chuyển đổi trong kinh doanh cũng như giữ chân các khách hàng tiềm năng vô cùng hiệu quả bằng các minigame hấp dẫn như Vòng quay may mắn, Truy tìm kho báu, Lật lì xì, Đập niêu</li><li>Form: Nhận thông tin của khách hàng tiềm năng chỉ sau vài cú nhấp chuột với form thông tin thân thiện với người dùng, thao tác nhanh chóng, lưu dữ liệu về Email, Google Sheets, API</li><li>Đồng hồ đếm ngược thúc đẩy khách hàng tham gia chương trình</li></ul>" } }
    },
    "fp3-btn": {
      "id": "fp3-btn",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<a href='/builder/home' style='display: inline-block; background-color: #db2777; color: #ffffff; font-weight: bold; padding: 12px 32px; border-radius: 9999px; text-decoration: none;'>Sử dụng miễn phí ngay →</a>" } }
    },
    "fp3-col-right": {
      "id": "fp3-col-right",
      "resolvedName": "ColEditor",
      "children": ["fp3-game-wheel"],
      "style": { "justifyContent": "center", "alignItems": "center" },
      "customAttributes": { "col": { "md": { "flex": "46%" } } }
    },
    "fp3-game-wheel": {
      "id": "fp3-game-wheel",
      "resolvedName": "PopupGameEditor"
    },

    // 7. TESTIMONIALS SECTION
    "testimonials-row": {
      "id": "testimonials-row",
      "resolvedName": "RowEditor",
      "children": ["tst-header-col", "tst-list-row"],
      "style": { "padding": { "top": 80, "bottom": 80, "left": 24, "right": 24 }, "backgroundColor": "#f8fafc" },
      "customAttributes": { "section": { "widthType": "fixed", "row": { "commonStyle": { "maxWidth": 1200 } } } }
    },
    "tst-header-col": {
      "id": "tst-header-col",
      "resolvedName": "ColEditor",
      "children": ["tst-title"],
      "style": { "width": "100%", "textAlign": "center", "padding": { "bottom": 40 } },
      "customAttributes": { "col": { "md": { "flex": "100%" } } }
    },
    "tst-title": {
      "id": "tst-title",
      "resolvedName": "HeadingEditor",
      "customAttributes": { "heading": { "text": "<h2 style='font-size: 36px; font-weight: 900; color: #1e1b4b;'>Ý kiến khách hàng</h2>" } }
    },
    "tst-list-row": {
      "id": "tst-list-row",
      "resolvedName": "RowEditor",
      "children": ["tc-1", "tc-2", "tc-3"],
      "style": { "width": "100%", "backgroundColor": "transparent" },
      "customAttributes": { "section": { "widthType": "full" } }
    },
    "tc-1": {
      "id": "tc-1",
      "resolvedName": "ColEditor",
      "children": ["tc-avatar-1", "tc-name-1", "tc-text-1"],
      "style": { "backgroundColor": "#ffffff", "border": "1px solid #e2e8f0", "borderRadius": "16px", "padding": { "top": 28, "bottom": 28, "left": 24, "right": 24 }, "margin": { "left": 12, "right": 12, "bottom": 24 } },
      "customAttributes": { "col": { "md": { "flex": "30%" } } }
    },
    "tc-avatar-1": {
      "id": "tc-avatar-1",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<div style='font-size: 40px; text-align: center;'>👨‍💼</div>" } }
    },
    "tc-name-1": {
      "id": "tc-name-1",
      "resolvedName": "HeadingEditor",
      "customAttributes": { "heading": { "text": "<h4 style='font-size: 16px; font-weight: 800; text-align: center; margin-top: 12px; margin-bottom: 8px; color: #1e1b4b;'>Trần Bảo Đăng</h4>" } }
    },
    "tc-text-1": {
      "id": "tc-text-1",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<p style='font-size: 13.5px; color: #4b5563; line-height: 1.6; text-align: center;'>Tôi rất thích sử dụng Kabo! Giao diện kéo thả vô cùng trực quan và dễ thao tác. Chỉ cần lựa chọn các khối, chỉnh sửa chữ là tôi đã có một trang web bán hàng chuyên nghiệp.</p>" } }
    },
    "tc-2": {
      "id": "tc-2",
      "resolvedName": "ColEditor",
      "children": ["tc-avatar-2", "tc-name-2", "tc-text-2"],
      "style": { "backgroundColor": "#ffffff", "border": "1px solid #e2e8f0", "borderRadius": "16px", "padding": { "top": 28, "bottom": 28, "left": 24, "right": 24 }, "margin": { "left": 12, "right": 12, "bottom": 24 } },
      "customAttributes": { "col": { "md": { "flex": "30%" } } }
    },
    "tc-avatar-2": {
      "id": "tc-avatar-2",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<div style='font-size: 40px; text-align: center;'>👨‍💻</div>" } }
    },
    "tc-name-2": {
      "id": "tc-name-2",
      "resolvedName": "HeadingEditor",
      "customAttributes": { "heading": { "text": "<h4 style='font-size: 16px; font-weight: 800; text-align: center; margin-top: 12px; margin-bottom: 8px; color: #1e1b4b;'>Dương Hoàng Nam</h4>" } }
    },
    "tc-text-2": {
      "id": "tc-text-2",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<p style='font-size: 13.5px; color: #4b5563; line-height: 1.6; text-align: center;'>Đội ngũ hỗ trợ tuyệt vời! Web tải siêu nhanh và chuẩn SEO. Khách hàng của tôi phản hồi rất tích cực kể từ khi chúng tôi chuyển đổi sang nền tảng web mới của Kabo.</p>" } }
    },
    "tc-3": {
      "id": "tc-3",
      "resolvedName": "ColEditor",
      "children": ["tc-avatar-3", "tc-name-3", "tc-text-3"],
      "style": { "backgroundColor": "#ffffff", "border": "1px solid #e2e8f0", "borderRadius": "16px", "padding": { "top": 28, "bottom": 28, "left": 24, "right": 24 }, "margin": { "left": 12, "right": 12, "bottom": 24 } },
      "customAttributes": { "col": { "md": { "flex": "30%" } } }
    },
    "tc-avatar-3": {
      "id": "tc-avatar-3",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<div style='font-size: 40px; text-align: center;'>👩‍💼</div>" } }
    },
    "tc-name-3": {
      "id": "tc-name-3",
      "resolvedName": "HeadingEditor",
      "customAttributes": { "heading": { "text": "<h4 style='font-size: 16px; font-weight: 800; text-align: center; margin-top: 12px; margin-bottom: 8px; color: #1e1b4b;'>Nguyễn Linh Chi</h4>" } }
    },
    "tc-text-3": {
      "id": "tc-text-3",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<p style='font-size: 13.5px; color: #4b5563; line-height: 1.6; text-align: center;'>Giao diện mobile hiển thị quá tốt, điểm tối ưu tốc độ Lighthouse đạt mức tối đa. Chúng tôi rất yên tâm khi chạy quảng cáo Facebook, doanh số chuyển đổi tăng vọt.</p>" } }
    }
  };
}

function getKaboServicesConfig() {
  return {
    "ROOT": {
      "id": "ROOT",
      "resolvedName": "RootEditor",
      "children": ["srv-hero-row", "srv-detail-row", "srv-game-row"],
      "style": {}
    },
    "srv-hero-row": {
      "id": "srv-hero-row",
      "resolvedName": "RowEditor",
      "children": ["srv-hero-col"],
      "style": { "backgroundColor": "#f0f7f8", "padding": { "top": 80, "bottom": 80, "left": 24, "right": 24 } },
      "customAttributes": { "section": { "widthType": "fixed", "row": { "commonStyle": { "maxWidth": 1200 } } } }
    },
    "srv-hero-col": {
      "id": "srv-hero-col",
      "resolvedName": "ColEditor",
      "children": ["srv-hero-tag", "srv-hero-title", "srv-hero-desc"],
      "style": { "alignItems": "center", "textAlign": "center" },
      "customAttributes": { "col": { "md": { "flex": "100%" } } }
    },
    "srv-hero-tag": {
      "id": "srv-hero-tag",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<p style='color: #006672; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 12px;'>DỊCH VỤ CỦA CHÚNG TÔI</p>" } }
    },
    "srv-hero-title": {
      "id": "srv-hero-title",
      "resolvedName": "HeadingEditor",
      "customAttributes": { "heading": { "text": "<h1 style='font-size: 48px; font-weight: 900; color: #0f0f0f;'>Giải Pháp Nâng Tầm Doanh Nghiệp</h1>" } }
    },
    "srv-hero-desc": {
      "id": "srv-hero-desc",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<p style='font-size: 16px; color: #4b5563; line-height: 1.6; max-width: 600px; margin: 16px auto 0;'>Chúng tôi cung cấp các gói giải pháp thiết kế website cao cấp chuẩn UI/UX, hỗ trợ SEO tổng thể và quảng cáo chuyển đổi tối ưu.</p>" } }
    },
    "srv-detail-row": {
      "id": "srv-detail-row",
      "resolvedName": "RowEditor",
      "children": ["srv-col-left", "srv-col-right"],
      "style": { "padding": { "top": 80, "bottom": 80, "left": 24, "right": 24 }, "backgroundColor": "#ffffff" },
      "customAttributes": { "section": { "widthType": "fixed", "row": { "commonStyle": { "maxWidth": 1200 } } } }
    },
    "srv-col-left": {
      "id": "srv-col-left",
      "resolvedName": "ColEditor",
      "children": ["srv-l-img"],
      "style": { "justifyContent": "center" },
      "customAttributes": { "col": { "md": { "flex": "46%" } } }
    },
    "srv-l-img": {
      "id": "srv-l-img",
      "resolvedName": "ImageEditor",
      "customAttributes": { "image": { "src": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" } }
    },
    "srv-col-right": {
      "id": "srv-col-right",
      "resolvedName": "ColEditor",
      "children": ["srv-r-title", "srv-r-bullet-1", "srv-r-bullet-2", "srv-r-bullet-3"],
      "style": { "justifyContent": "center", "padding": { "left": 24 } },
      "customAttributes": { "col": { "md": { "flex": "46%" } } }
    },
    "srv-r-title": {
      "id": "srv-r-title",
      "resolvedName": "HeadingEditor",
      "customAttributes": { "heading": { "text": "<h2 style='font-size: 32px; font-weight: 800; color: #006672; margin-bottom: 24px;'>Tại sao nên chọn KABO?</h2>" } }
    },
    "srv-r-bullet-1": {
      "id": "srv-r-bullet-1",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<p style='font-size: 15px; color: #374151; margin-bottom: 16px;'><strong>✓ Thiết kế độc quyền:</strong> Không dùng mẫu đại trà, giao diện hoàn toàn độc bản từ Figma truyền tải đúng thông điệp thương hiệu.</p>" } }
    },
    "srv-r-bullet-2": {
      "id": "srv-r-bullet-2",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<p style='font-size: 15px; color: #374151; margin-bottom: 16px;'><strong>✓ Tối ưu tốc độ tuyệt đối:</strong> Điểm Lighthouse đạt từ 95 trở lên giúp tối ưu hóa SEO và tăng tỉ lệ chuyển đổi.</p>" } }
    },
    "srv-r-bullet-3": {
      "id": "srv-r-bullet-3",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<p style='font-size: 15px; color: #374151;'><strong>✓ Đồng hành lâu dài:</strong> Hỗ trợ vận hành kỹ thuật, bảo mật 24/7 và cập nhật nội dung dễ dàng qua hệ thống quản trị.</p>" } }
    },
    "srv-game-row": {
      "id": "srv-game-row",
      "resolvedName": "RowEditor",
      "children": ["srv-game-col"],
      "style": { "padding": { "top": 80, "bottom": 80, "left": 24, "right": 24 }, "backgroundColor": "#f8fafc" },
      "customAttributes": { "section": { "widthType": "fixed", "row": { "commonStyle": { "maxWidth": 1200 } } } }
    },
    "srv-game-col": {
      "id": "srv-game-col",
      "resolvedName": "ColEditor",
      "children": ["srv-game-title", "srv-game-desc", "srv-game-spacer", "srv-game-pots"],
      "style": { "alignItems": "center", "textAlign": "center" },
      "customAttributes": { "col": { "md": { "flex": "100%" } } }
    },
    "srv-game-title": {
      "id": "srv-game-title",
      "resolvedName": "HeadingEditor",
      "customAttributes": { "heading": { "text": "<h2 style='font-size: 32px; font-weight: 900; color: #006672; margin-bottom: 12px;'>Đập Niêu Đất Nhận Quà Tặng!</h2>" } }
    },
    "srv-game-desc": {
      "id": "srv-game-desc",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<p style='font-size: 15px; color: #4b5563; max-width: 600px; margin: 0 auto;'>Nhấp chọn niêu đất may mắn của bạn để nhận quà tặng kèm hoặc Voucher thiết kế website trị giá lên đến 2,000,000đ.</p>" } }
    },
    "srv-game-spacer": {
      "id": "srv-game-spacer",
      "resolvedName": "SpacerEditor",
      "customAttributes": { "spacer": { "height": 24 } }
    },
    "srv-game-pots": {
      "id": "srv-game-pots",
      "resolvedName": "PotSmashingEditor",
      "customAttributes": {
        "potsmashing": {
          "desktop": { "columnCount": 6, "rowCount": 1 }
        }
      }
    }
  };
}

function getKaboProjectsConfig() {
  return {
    "ROOT": {
      "id": "ROOT",
      "resolvedName": "RootEditor",
      "children": ["prj-hero-row", "prj-list-row"],
      "style": {}
    },
    "prj-hero-row": {
      "id": "prj-hero-row",
      "resolvedName": "RowEditor",
      "children": ["prj-hero-col"],
      "style": { "backgroundColor": "#f0f7f8", "padding": { "top": 80, "bottom": 80, "left": 24, "right": 24 } },
      "customAttributes": { "section": { "widthType": "fixed", "row": { "commonStyle": { "maxWidth": 1200 } } } }
    },
    "prj-hero-col": {
      "id": "prj-hero-col",
      "resolvedName": "ColEditor",
      "children": ["prj-hero-tag", "prj-hero-title", "prj-hero-desc"],
      "style": { "alignItems": "center", "textAlign": "center" },
      "customAttributes": { "col": { "md": { "flex": "100%" } } }
    },
    "prj-hero-tag": {
      "id": "prj-hero-tag",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<p style='color: #006672; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 12px;'>CASE STUDIES</p>" } }
    },
    "prj-hero-title": {
      "id": "prj-hero-title",
      "resolvedName": "HeadingEditor",
      "customAttributes": { "heading": { "text": "<h1 style='font-size: 48px; font-weight: 900; color: #0f0f0f;'>Các Dự Án Đã Hoàn Thành</h1>" } }
    },
    "prj-hero-desc": {
      "id": "prj-hero-desc",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<p style='font-size: 16px; color: #4b5563; line-height: 1.6; max-width: 600px; margin: 16px auto 0;'>Khám phá các sản phẩm website, landing page và hệ thống Web App chất lượng cao chúng tôi đã triển khai cho đối tác.</p>" } }
    },
    "prj-list-row": {
      "id": "prj-list-row",
      "resolvedName": "RowEditor",
      "children": ["prj-col-1", "prj-col-2", "prj-col-3"],
      "style": { "padding": { "top": 80, "bottom": 80, "left": 24, "right": 24 }, "backgroundColor": "#ffffff" },
      "customAttributes": { "section": { "widthType": "fixed", "row": { "commonStyle": { "maxWidth": 1200 } } } }
    },
    "prj-col-1": {
      "id": "prj-col-1",
      "resolvedName": "ColEditor",
      "children": ["prj-img-1", "prj-t1", "prj-d1"],
      "style": { "backgroundColor": "#f8fafc", "borderRadius": "12px", "padding": { "top": 16, "bottom": 24, "left": 16, "right": 16 }, "margin": { "left": 12, "right": 12, "bottom": 24 } },
      "customAttributes": { "col": { "md": { "flex": "30%" } } }
    },
    "prj-img-1": {
      "id": "prj-img-1",
      "resolvedName": "ImageEditor",
      "customAttributes": { "image": { "src": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80" } }
    },
    "prj-t1": {
      "id": "prj-t1",
      "resolvedName": "HeadingEditor",
      "customAttributes": { "heading": { "text": "<h3 style='font-size: 18px; font-weight: 800; color: #0f0f0f; margin-top: 16px; margin-bottom: 8px;'>Lumina Portfolio</h3>" } }
    },
    "prj-d1": {
      "id": "prj-d1",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<p style='font-size: 13px; color: #6b7280;'>Website cá nhân giới thiệu sản phẩm tối giản, hiện đại và chuẩn Responsive.</p>" } }
    },
    "prj-col-2": {
      "id": "prj-col-2",
      "resolvedName": "ColEditor",
      "children": ["prj-img-2", "prj-t2", "prj-d2"],
      "style": { "backgroundColor": "#f8fafc", "borderRadius": "12px", "padding": { "top": 16, "bottom": 24, "left": 16, "right": 16 }, "margin": { "left": 12, "right": 12, "bottom": 24 } },
      "customAttributes": { "col": { "md": { "flex": "30%" } } }
    },
    "prj-img-2": {
      "id": "prj-img-2",
      "resolvedName": "ImageEditor",
      "customAttributes": { "image": { "src": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80" } }
    },
    "prj-t2": {
      "id": "prj-t2",
      "resolvedName": "HeadingEditor",
      "customAttributes": { "heading": { "text": "<h3 style='font-size: 18px; font-weight: 800; color: #0f0f0f; margin-top: 16px; margin-bottom: 8px;'>Nova Real Estate</h3>" } }
    },
    "prj-d2": {
      "id": "prj-d2",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<p style='font-size: 13px; color: #6b7280;'>Landing page giới thiệu dự án bất động sản sang trọng với tỷ lệ chuyển đổi cao.</p>" } }
    },
    "prj-col-3": {
      "id": "prj-col-3",
      "resolvedName": "ColEditor",
      "children": ["prj-img-3", "prj-t3", "prj-d3"],
      "style": { "backgroundColor": "#f8fafc", "borderRadius": "12px", "padding": { "top": 16, "bottom": 24, "left": 16, "right": 16 }, "margin": { "left": 12, "right": 12, "bottom": 24 } },
      "customAttributes": { "col": { "md": { "flex": "30%" } } }
    },
    "prj-img-3": {
      "id": "prj-img-3",
      "resolvedName": "ImageEditor",
      "customAttributes": { "image": { "src": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80" } }
    },
    "prj-t3": {
      "id": "prj-t3",
      "resolvedName": "HeadingEditor",
      "customAttributes": { "heading": { "text": "<h3 style='font-size: 18px; font-weight: 800; color: #0f0f0f; margin-top: 16px; margin-bottom: 8px;'>Apex E-Commerce</h3>" } }
    },
    "prj-d3": {
      "id": "prj-d3",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<p style='font-size: 13px; color: #6b7280;'>Website bán hàng mỹ phẩm tích hợp thanh toán tự động tiện lợi cho khách hàng.</p>" } }
    }
  };
}

function getKaboProcessConfig() {
  return {
    "ROOT": {
      "id": "ROOT",
      "resolvedName": "RootEditor",
      "children": ["prc-hero-row", "prc-steps-row"],
      "style": {}
    },
    "prc-hero-row": {
      "id": "prc-hero-row",
      "resolvedName": "RowEditor",
      "children": ["prc-hero-col"],
      "style": { "backgroundColor": "#f0f7f8", "padding": { "top": 80, "bottom": 80, "left": 24, "right": 24 } },
      "customAttributes": { "section": { "widthType": "fixed", "row": { "commonStyle": { "maxWidth": 1200 } } } }
    },
    "prc-hero-col": {
      "id": "prc-hero-col",
      "resolvedName": "ColEditor",
      "children": ["prc-hero-tag", "prc-hero-title", "prc-hero-desc"],
      "style": { "alignItems": "center", "textAlign": "center" },
      "customAttributes": { "col": { "md": { "flex": "100%" } } }
    },
    "prc-hero-tag": {
      "id": "prc-hero-tag",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<p style='color: #006672; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 12px;'>QUY TRÌNH HỢP TÁC</p>" } }
    },
    "prc-hero-title": {
      "id": "prc-hero-title",
      "resolvedName": "HeadingEditor",
      "customAttributes": { "heading": { "text": "<h1 style='font-size: 48px; font-weight: 900; color: #0f0f0f;'>Quy Trình Làm Việc Chuyên Nghiệp</h1>" } }
    },
    "prc-hero-desc": {
      "id": "prc-hero-desc",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<p style='font-size: 16px; color: #4b5563; line-height: 1.6; max-width: 600px; margin: 16px auto 0;'>Chúng tôi tối ưu hóa quy trình làm việc gồm 5 bước rõ ràng để đảm bảo sản phẩm bàn giao chất lượng nhất.</p>" } }
    },
    "prc-steps-row": {
      "id": "prc-steps-row",
      "resolvedName": "RowEditor",
      "children": ["prc-col-1", "prc-col-2", "prc-col-3"],
      "style": { "padding": { "top": 80, "bottom": 80, "left": 24, "right": 24 }, "backgroundColor": "#ffffff" },
      "customAttributes": { "section": { "widthType": "fixed", "row": { "commonStyle": { "maxWidth": 1200 } } } }
    },
    "prc-col-1": {
      "id": "prc-col-1",
      "resolvedName": "ColEditor",
      "children": ["prc-step-num1", "prc-step-t1", "prc-step-d1"],
      "style": { "backgroundColor": "#f8fafc", "border": "1px dashed #e2e8f0", "borderRadius": "12px", "padding": { "top": 24, "bottom": 24, "left": 20, "right": 20 }, "margin": { "left": 12, "right": 12, "bottom": 24 } },
      "customAttributes": { "col": { "md": { "flex": "30%" } } }
    },
    "prc-step-num1": {
      "id": "prc-step-num1",
      "resolvedName": "HeadingEditor",
      "customAttributes": { "heading": { "text": "<span style='font-size: 24px; font-weight: 950; color: #006672;'>01</span>" } }
    },
    "prc-step-t1": {
      "id": "prc-step-t1",
      "resolvedName": "HeadingEditor",
      "customAttributes": { "heading": { "text": "<h3 style='font-size: 18px; font-weight: 800; color: #0f0f0f; margin-top: 12px; margin-bottom: 8px;'>Lấy Brief & Khảo Sát</h3>" } }
    },
    "prc-step-d1": {
      "id": "prc-step-d1",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<p style='font-size: 13px; color: #6b7280;'>KABO trao đổi chi tiết để thấu hiểu nhu cầu thực tế và mục tiêu phát triển của doanh nghiệp bạn.</p>" } }
    },
    "prc-col-2": {
      "id": "prc-col-2",
      "resolvedName": "ColEditor",
      "children": ["prc-step-num2", "prc-step-t2", "prc-step-d2"],
      "style": { "backgroundColor": "#f8fafc", "border": "1px dashed #e2e8f0", "borderRadius": "12px", "padding": { "top": 24, "bottom": 24, "left": 20, "right": 20 }, "margin": { "left": 12, "right": 12, "bottom": 24 } },
      "customAttributes": { "col": { "md": { "flex": "30%" } } }
    },
    "prc-step-num2": {
      "id": "prc-step-num2",
      "resolvedName": "HeadingEditor",
      "customAttributes": { "heading": { "text": "<span style='font-size: 24px; font-weight: 950; color: #006672;'>02</span>" } }
    },
    "prc-step-t2": {
      "id": "prc-step-t2",
      "resolvedName": "HeadingEditor",
      "customAttributes": { "heading": { "text": "<h3 style='font-size: 18px; font-weight: 800; color: #0f0f0f; margin-top: 12px; margin-bottom: 8px;'>Thiết Kế Figma UI/UX</h3>" } }
    },
    "prc-step-d2": {
      "id": "prc-step-d2",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<p style='font-size: 13px; color: #6b7280;'>Dựng bản vẽ giao diện hoàn chỉnh bằng Figma độc bản để khách hàng duyệt trước khi code.</p>" } }
    },
    "prc-col-3": {
      "id": "prc-col-3",
      "resolvedName": "ColEditor",
      "children": ["prc-step-num3", "prc-step-t3", "prc-step-d3"],
      "style": { "backgroundColor": "#f8fafc", "border": "1px dashed #e2e8f0", "borderRadius": "12px", "padding": { "top": 24, "bottom": 24, "left": 20, "right": 20 }, "margin": { "left": 12, "right": 12, "bottom": 24 } },
      "customAttributes": { "col": { "md": { "flex": "30%" } } }
    },
    "prc-step-num3": {
      "id": "prc-step-num3",
      "resolvedName": "HeadingEditor",
      "customAttributes": { "heading": { "text": "<span style='font-size: 24px; font-weight: 950; color: #006672;'>03</span>" } }
    },
    "prc-step-t3": {
      "id": "prc-step-t3",
      "resolvedName": "HeadingEditor",
      "customAttributes": { "heading": { "text": "<h3 style='font-size: 18px; font-weight: 800; color: #0f0f0f; margin-top: 12px; margin-bottom: 8px;'>Lập Trình & Bàn Giao</h3>" } }
    },
    "prc-step-d3": {
      "id": "prc-step-d3",
      "resolvedName": "ParagraphEditor",
      "customAttributes": { "paragraph": { "text": "<p style='font-size: 13px; color: #6b7280;'>Tiến hành code giao diện với tốc độ tối ưu, hoàn tất kiểm thử và bàn giao sản phẩm chạy trực tiếp.</p>" } }
    }
  };
}

function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // replace spaces with -
    .replace(/[^\w\-]+/g, '') // remove all non-word chars
    .replace(/\-\-+/g, '-') // replace multiple - with single -
    .replace(/^-+/, '') // trim leading -
    .replace(/-+$/, ''); // trim trailing -
}

function getCategory(name: string): string {
  const lowerName = name.toLowerCase();
  if (
    lowerName.includes('cua hang') ||
    lowerName.includes('my pham') ||
    lowerName.includes('ban le') ||
    lowerName.includes('thoi trang') ||
    lowerName.includes('me & be') ||
    lowerName.includes('me va be') ||
    lowerName.includes('tra & ca phe') ||
    lowerName.includes('tra va ca phe') ||
    lowerName.includes('do dien tu') ||
    lowerName.includes('sach') ||
    lowerName.includes('hoa tuoi') ||
    lowerName.includes('qua tet') ||
    lowerName.includes('tiem banh') ||
    lowerName.includes('nuoc uong') ||
    lowerName.includes('phu kien') ||
    lowerName.includes('do gom') ||
    lowerName.includes('kinh mat') ||
    lowerName.includes('sieu thi') ||
    lowerName.includes('trai cay') ||
    lowerName.includes('bán lẻ') ||
    lowerName.includes('thương mại') ||
    lowerName.includes('shop') ||
    lowerName.includes('store')
  ) {
    return 'ecommerce';
  }
  if (
    lowerName.includes('phan mem') ||
    lowerName.includes('app') ||
    lowerName.includes('cong nghe') ||
    lowerName.includes('saas') ||
    lowerName.includes('software') ||
    lowerName.includes('ai')
  ) {
    return 'saas';
  }
  return 'enterprise';
}

function getCategoryLabel(category: string): string {
  if (category === 'ecommerce') return 'Thương mại Điện tử';
  if (category === 'saas') return 'SaaS & Công nghệ';
  return 'Doanh nghiệp';
}

function getDynamicData(name: string, category: string) {
  let description = `Giao diện website ${name} chuyên nghiệp, tối ưu chuẩn SEO và trải nghiệm người dùng UI/UX. Được thiết kế hiện đại, mượt mà trên mobile và tối ưu tỷ lệ chuyển đổi cao nhất.`;
  let price = 99.00;
  let tags = [name, 'Premium', 'Responsive'];
  let features = ['Tối ưu chuẩn SEO', 'Responsive 100% các thiết bị', 'Tải trang siêu tốc', 'Dễ dàng tuỳ biến'];

  if (category === 'ecommerce') {
    description = `Giao diện cửa hàng trực tuyến bán ${name} chuyên nghiệp, tích hợp giỏ hàng và thanh toán nhanh chóng. Thiết kế bắt mắt, thân thiện với người dùng và tối ưu tỷ lệ chuyển đổi đơn hàng.`;
    price = 129.00;
    tags.push('Ecommerce', 'Online Store', 'Shop');
    features = ['Giỏ hàng & Thanh toán nhanh', 'Bộ lọc sản phẩm thông minh', 'Quản lý kho hàng', 'Tích hợp thanh toán online'];
  } else if (category === 'saas') {
    description = `Giao diện giới thiệu sản phẩm công nghệ, SaaS, hoặc ứng dụng ${name}. Cấu trúc chuyên nghiệp, tích hợp bảng so sánh tính năng và bảng giá, giúp bứt phá lượt đăng ký sử dụng.`;
    price = 149.00;
    tags.push('SaaS', 'Tech', 'Software');
    features = ['Bảng so sánh tính năng', 'Bảng giá dịch vụ tương tác', 'Form đăng ký dùng thử', 'Trực quan hoá số liệu'];
  } else {
    if (name.includes('Thiệp cưới')) {
      description = `Mẫu thiệp cưới online (iWedding) cho cặp đôi ${name}. Thiết kế lãng mạn, tích hợp album ảnh, sơ đồ đường đi, nhận lời chúc mừng và xác nhận tham dự tiện lợi.`;
      price = 49.00;
      tags.push('iWedding', 'Thiệp cưới', 'Sự kiện');
      features = ['Album ảnh cưới lãng mạn', 'Đếm ngược ngày cưới', 'Xác nhận tham dự (RSVP)', 'Nhận lời chúc online'];
    } else if (name.includes('Portfolio') || name.includes('Profile')) {
      description = `Mẫu website Portfolio cá nhân giới thiệu bản thân, kỹ năng và dự án nổi bật của bạn. Thiết kế tối giản, tinh tế giúp khẳng định thương hiệu cá nhân của bạn trước nhà tuyển dụng.`;
      price = 59.00;
      tags.push('Portfolio', 'Personal', 'Branding');
      features = ['Bento grid giới thiệu dự án', 'Dark/Light mode mượt mà', 'CV tải về trực tuyến', 'Form liên hệ nhanh'];
    } else {
      price = 99.00;
      tags.push('Corporate', 'Business', 'Services');
      features = ['Bố cục doanh nghiệp chuẩn', 'Giới thiệu dịch vụ chi tiết', 'Chứng thực từ khách hàng', 'Form liên hệ tư vấn'];
    }
  }
  return { description, price, tags, features };
}

function getTemplateCoverImage(title: string, rawImage?: string): string {
  if (rawImage && !rawImage.includes('photo-1507238691740-187a5b1d37b8')) {
    return rawImage;
  }

  const name = (title || '').toLowerCase();

  if (name.includes('tiệc cưới') || name.includes('thiệp cưới') || name.includes('đám cưới') || name.includes('iwedding')) {
    return 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80';
  }
  if (name.includes('portfolio') || name.includes('profile') || name.includes('cá nhân') || name.includes('cv')) {
    return 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80';
  }
  if (name.includes('agency') || name.includes('marketing') || name.includes('coaching') || name.includes('tư vấn')) {
    return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80';
  }
  if (name.includes('tài chính') || name.includes('luật') || name.includes('đầu tư') || name.includes('ngân hàng')) {
    return 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80';
  }
  if (name.includes('thời trang') || name.includes('mẹ & bé') || name.includes('mẹ và bé') || name.includes('phụ kiện') || name.includes('kính mắt') || name.includes('bán lẻ') || name.includes('shop') || name.includes('store')) {
    return 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80';
  }
  if (name.includes('mỹ phẩm') || name.includes('làm đẹp') || name.includes('beauty')) {
    return 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80';
  }
  if (name.includes('spa') || name.includes('chăm sóc sức khoẻ') || name.includes('sức khoẻ') || name.includes('nha khoa') || name.includes('phòng khám') || name.includes('thú cưng') || name.includes('làm tóc')) {
    return 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80';
  }
  if (name.includes('nhà hàng') || name.includes('bar') || name.includes('pub') || name.includes('club') || name.includes('trà') || name.includes('cà phê') || name.includes('tiệm bánh') || name.includes('nước uống') || name.includes('đồ uống') || name.includes('ăn uống')) {
    return 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80';
  }
  if (name.includes('bất động sản') || name.includes('villa') || name.includes('homestay') || name.includes('khách sạn') || name.includes('nội thất') || name.includes('xây dựng') || name.includes('co-working')) {
    return 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80';
  }
  if (name.includes('phần mềm') || name.includes('app') || name.includes('saas') || name.includes('công nghệ') || name.includes('điện tử')) {
    return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80';
  }
  if (name.includes('du lịch') || name.includes('nghỉ dưỡng') || name.includes('khám phá') || name.includes('leo núi')) {
    return 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80';
  }
  if (name.includes('gym') || name.includes('yoga') || name.includes('thể thao')) {
    return 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80';
  }
  if (name.includes('quà tết') || name.includes('hoa') || name.includes('tâm linh') || name.includes('gốm')) {
    return 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&q=80';
  }
  if (name.includes('vận tải') || name.includes('logistics') || name.includes('xe máy')) {
    return 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80';
  }
  if (name.includes('cây cảnh') || name.includes('nông nghiệp') || name.includes('chăn nuôi') || name.includes('carbon')) {
    return 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=800&q=80';
  }
  if (name.includes('sách') || name.includes('khoá học') || name.includes('sinh viên') || name.includes('tài liệu') || name.includes('phi lợi nhuận') || name.includes('hội thảo') || name.includes('sự kiện')) {
    return 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80';
  }

  return 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80';
}

async function main() {
  console.log('🌱 Start seeding real templates...');

  const tempiPath = path.resolve(__dirname, '../../tempi_templates.json');
  console.log(`Reading template file from: ${tempiPath}`);

  if (!fs.existsSync(tempiPath)) {
    throw new Error(`Template source file not found at ${tempiPath}`);
  }

  const rawData = fs.readFileSync(tempiPath, 'utf8');
  const parsedData = JSON.parse(rawData);

  const websites = parsedData.websites || [];
  const landingPages = parsedData.landingPages || [];

  console.log(`Parsed ${websites.length} websites and ${landingPages.length} detailed landing pages.`);

  const pbConfigMap = new Map<number, any>();
  for (const lp of landingPages) {
    if (lp.id && lp.pbConfig) {
      pbConfigMap.set(lp.id, lp.pbConfig);
    }
  }

  await prisma.template.deleteMany();
  await prisma.customPage.deleteMany();
  console.log('🧹 Cleaned existing templates and custom pages in database.');

  let successCount = 0;

  for (const w of websites) {
    try {
      const templateId = String(w.id);
      const title = w.name || 'Giao diện mẫu';
      const cleanSlugTitle = slugify(title);
      const slug = cleanSlugTitle ? `${cleanSlugTitle}-${templateId}` : `template-${templateId}`;
      const category = getCategory(title);

      const dynamic = getDynamicData(title, category);
      const liveUrl = w.domain ? `https://${w.domain}` : null;
      const pbConfig = pbConfigMap.get(w.id) || null;

      const templateData: Prisma.TemplateCreateInput = {
        id: templateId,
        slug,
        title,
        category,
        description: dynamic.description,
        image: getTemplateCoverImage(title, w.thumbnail),
        price: new Prisma.Decimal(dynamic.price),
        tags: dynamic.tags,
        features: dynamic.features,
        liveUrl,
        pbConfig: pbConfig ? (pbConfig as any) : Prisma.DbNull,
      };

      await prisma.template.create({
        data: templateData,
      });

      successCount++;
    } catch (err) {
      console.error(`❌ Failed to import template ID ${w.id}:`, err instanceof Error ? err.message : err);
    }
  }

  console.log(`✅ Seeding completed. Successfully imported ${successCount}/${websites.length} templates.`);

  console.log('🌱 Seeding premium layouts for main KABO AGENCY pages...');
  
  const mainPagesToSeed = [
    { slug: 'home', title: 'Trang chủ KABO AGENCY', config: getKaboHomepageConfig() },
    { slug: 'dich-vu', title: 'Dịch vụ KABO AGENCY', config: getKaboServicesConfig() },
    { slug: 'du-an', title: 'Dự án Tiêu Biểu KABO AGENCY', config: getKaboProjectsConfig() },
    { slug: 'quy-trinh', title: 'Quy trình Làm Việc KABO AGENCY', config: getKaboProcessConfig() }
  ];

  for (const page of mainPagesToSeed) {
    try {
      await prisma.customPage.create({
        data: {
          slug: page.slug,
          title: page.title,
          templateId: 'kabo-default',
          pbConfig: page.config as any,
        }
      });
      console.log(`Created default custom page layout for: /${page.slug}`);
    } catch (err) {
      console.error(`❌ Failed to seed custom page slug ${page.slug}:`, err instanceof Error ? err.message : err);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
