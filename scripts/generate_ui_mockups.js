const fs = require('fs');
const path = require('path');

const categories = [
  {
    folder: 'spa',
    title: 'Chăm Sóc Sức Khỏe & Spa Trị Liệu',
    subtitle: 'Liệu trình massage, xông hơi & chăm sóc da cao cấp toàn diện',
    tag: 'SPA & WELLNESS',
    bgHeader: '#111827',
    primaryColor: '#059669',
    accentColor: '#10b981',
    card1: { name: 'Massage Thụy Điển', price: '490.000đ', desc: 'Thư giãn cơ thể 60 phút với tinh dầu thiên nhiên' },
    card2: { name: 'Chăm Sóc Da Mặt Gold', price: '790.000đ', desc: 'Tái tạo làn da sáng khỏe với tinh chất tinh khiết' },
    card3: { name: 'Gói Spa Couple Royal', price: '1.490.000đ', desc: 'Liệu trình đôi lãng mạn kèm trà thảo mộc' },
    url: 'kabo.agency/demo/spa-wellness'
  },
  {
    folder: 'cafe',
    title: 'Cửa Hàng Trà & Cà Phê Gourmet',
    subtitle: 'Hương vị cafe espresso nguyên chất & dòng trà hoa thượng hạng',
    tag: 'CAFE & TEA LOUNGE',
    bgHeader: '#1e1b18',
    primaryColor: '#d97706',
    accentColor: '#f59e0b',
    card1: { name: 'Espresso Arabica Cầu Đất', price: '45.000đ', desc: 'Đậm đà hương trái cây sấy & sô-cô-la đắng nhẹ' },
    card2: { name: 'Trà Oolong Thượng Hạng', price: '55.000đ', desc: 'Thanh mát ngọt hậu từ vùng cao nguyên sương mù' },
    card3: { name: 'Cold Brew Cam Sả', price: '59.000đ', desc: 'Ủ lạnh 16 tiếng sảng khoái ngày hè' },
    url: 'kabo.agency/demo/tra-ca-phe'
  },
  {
    folder: 'florist',
    title: 'Cửa Hàng Hoa Tươi & Thiệp Cưới',
    subtitle: 'Bó hoa thiết kế cao cấp, hoa chúc mừng & trang trí tiệc',
    tag: 'FLORIST BOUTIQUE',
    bgHeader: '#18181b',
    primaryColor: '#e11d48',
    accentColor: '#f43f5e',
    card1: { name: 'Bó Hoa Hồng Ecuador', price: '850.000đ', desc: '99 bông hồng đỏ thắm tượng trưng tình yêu vĩnh cửu' },
    card2: { name: 'Giỏ Hoa Tulip Hà Lan', price: '950.000đ', desc: 'Nhập khẩu 100% tươi mới phối màu pastel tinh tế' },
    card3: { name: 'Kệ Hoa Khai Trương', price: '1.500.000đ', desc: 'Thiết kế sang trọng mang lại may mắn tài lộc' },
    url: 'kabo.agency/demo/hoa-tuoi'
  },
  {
    folder: 'plant-shop',
    title: 'Cây Cảnh Nội Thất & Sân Vườn',
    subtitle: 'Mang thiên nhiên xanh mát vào không gian sống & làm việc',
    tag: 'INDOOR PLANTS & GARDEN',
    bgHeader: '#064e3b',
    primaryColor: '#16a34a',
    accentColor: '#22c55e',
    card1: { name: 'Cây Bàng Đài Loan', price: '350.000đ', desc: 'Lọc không khí tốt, thích hợp phòng khách hiện đại' },
    card2: { name: 'Cây Kim Tiền Phong Thủy', price: '290.000đ', desc: 'Chiêu tài hút lộc cho gia chủ & bàn làm việc' },
    card3: { name: 'Chậu Trầu Bà Cột', price: '420.000đ', desc: 'Dễ chăm sóc, leo giàn xanh mướt quanh năm' },
    url: 'kabo.agency/demo/cay-canh'
  },
  {
    folder: 'pottery',
    title: 'Cửa Hàng Đồ Gốm Thủ Công',
    subtitle: 'Nghệ thuật gốm sứ độc bản, ấm trà & vật dụng trang trí',
    tag: 'HANDMADE CERAMICS',
    bgHeader: '#292524',
    primaryColor: '#ea580c',
    accentColor: '#f97316',
    card1: { name: 'Bộ Ấm Trà Gốm Bát Tràng', price: '680.000đ', desc: 'Men hỏa biến thủ công độc bản nung ở 1300°C' },
    card2: { name: 'Bình Hoa Gốm Thô Art', price: '450.000đ', desc: 'Kiểu dáng tối giản phong cách Wabi-Sabi Nhật Bản' },
    card3: { name: 'Bộ Đĩa Gốm Tráng Men', price: '520.000đ', desc: 'Set 6 đĩa hoa văn thủ công cực kỳ tinh tế' },
    url: 'kabo.agency/demo/do-gom'
  },
  {
    folder: 'interior-design',
    title: 'Nhà Cửa & Thiết Kế Nội Thất',
    subtitle: 'Kiến tạo không gian sống sang trọng, tối ưu công năng',
    tag: 'INTERIOR & ARCHITECTURE',
    bgHeader: '#0f172a',
    primaryColor: '#0284c7',
    accentColor: '#38bdf8',
    card1: { name: 'Thiết Kế Căn Hộ Penthouse', price: 'Từ 250k/m²', desc: 'Phong cách Modern Luxury đẳng cấp thượng lưu' },
    card2: { name: 'Thi Bàn Giao Nội Thất Villa', price: 'Trọn gói', desc: 'Thi công gỗ tự nhiên nhập khẩu bảo hành 5 năm' },
    card3: { name: 'Cải Tạo Nhà Phố Tối Giản', price: 'Tư vấn miễn phí', desc: 'Tối ưu ánh sáng tự nhiên & mảng xanh không gian' },
    url: 'kabo.agency/demo/noi-that'
  },
  {
    folder: 'eyewear',
    title: 'Cửa Hàng Kính Mắt Thời Trang',
    subtitle: 'Gọng kính chính hãng, kính mát UV400 & đo mắt vi tính',
    tag: 'EYEWEAR & OPTICS',
    bgHeader: '#18181b',
    primaryColor: '#4f46e5',
    accentColor: '#6366f1',
    card1: { name: 'Kính Mát Aviator Titanium', price: '1.250.000đ', desc: 'Chống tia UV400 & chói phân cực Polarized' },
    card2: { name: 'Gọng Kính Cận Tối Giản', price: '650.000đ', desc: 'Chất liệu Nhựa dẻo TR90 siêu nhẹ siêu bền' },
    card3: { name: 'Tròng Kính Đổi Màu BlueControl', price: '890.000đ', desc: 'Lọc ánh sáng xanh máy tính & đổi màu ngoài trời' },
    url: 'kabo.agency/demo/kinh-mat'
  },
  {
    folder: 'restaurant',
    title: 'Nhà Hàng Ẩm Thực & Bàn Tiệc',
    subtitle: 'Thưởng thức thực đơn phong phú trong không gian ấm cúng',
    tag: 'FINE DINING & BISTRO',
    bgHeader: '#1c1917',
    primaryColor: '#dc2626',
    accentColor: '#ef4444',
    card1: { name: 'Bít Tết Thăn Nội Bò Mỹ', price: '380.000đ', desc: 'Phục vụ kèm sốt tiêu đen & khoai tây đút lò' },
    card2: { name: 'Set Hải Sản Nướng Nhập Khẩu', price: '890.000đ', desc: 'Tôm hùm, hàu Pháp & sò điệp Nhật sốt bơ tỏi' },
    card3: { name: 'Combo Rượu Vàng & Tiệc Đôi', price: '1.290.000đ', desc: 'Trọn gói 4 món cao cấp cho buổi tối lãng mạn' },
    url: 'kabo.agency/demo/nha-hang'
  },
  {
    folder: 'cosmetics',
    title: 'Cửa Hàng Mỹ Phẩm & Skincare',
    subtitle: 'Dược mỹ phẩm chính hãng 100%, an toàn cho làn da Việt',
    tag: 'BEAUTY & COSMETICS',
    bgHeader: '#27272a',
    primaryColor: '#db2777',
    accentColor: '#ec4899',
    card1: { name: 'Serum HA B5 Cấp Tẩm Đa Tầng', price: '520.000đ', desc: 'Phục hồi da hư tổn, khóa ẩm 72h mềm mịn' },
    card2: { name: 'Kem Chống Nắng Quang Phổ Rộng', price: '450.000đ', desc: 'SPF 50+ PA++++ kiềm dầu không nâng tông' },
    card3: { name: 'Set Skincare Chống Lão Hóa', price: '1.350.000đ', desc: 'Bộ 3 sản phẩm tinh chất Peptide & Niacinamide' },
    url: 'kabo.agency/demo/my-pham'
  },
  {
    folder: 'motorbike',
    title: 'Cửa Hàng Xe Máy & Phụ Kiện',
    subtitle: 'Phân phối xe tay ga, xe số & phụ tùng xe máy chính hãng',
    tag: 'MOTORBIKE DEALERSHIP',
    bgHeader: '#09090b',
    primaryColor: '#ea580c',
    accentColor: '#f97316',
    card1: { name: 'Xe Tay Ga Sport Edition 2026', price: '48.500.000đ', desc: 'Động cơ eSP+ 125cc phanh ABS an toàn tuyệt đối' },
    card2: { name: 'Mũ Bảo Hiểm Fullface Carbon', price: '1.850.000đ', desc: 'Chuẩn ECE Châu Âu siêu nhẹ & thoáng khí' },
    card3: { name: 'Gói Bảo Dưỡng Xe Trọn Gói', price: '350.000đ', desc: 'Thay nhớt máy, vệ sinh nồi & kiểm tra 12 hạng mục' },
    url: 'kabo.agency/demo/xe-may'
  },
  {
    folder: 'mother-baby',
    title: 'Cửa Hàng Mẹ & Bé Trọn Gói',
    subtitle: 'Sữa công thức, tã bỉm & đồ dùng em bé an toàn tuyệt đối',
    tag: 'MOTHER & BABY CARE',
    bgHeader: '#1e293b',
    primaryColor: '#0284c7',
    accentColor: '#38bdf8',
    card1: { name: 'Sữa Hữu Cơ Nhập Khẩu Đan Mạch', price: '680.000đ', desc: 'Bổ sung DHA & Probiotics giúp bé phát triển trí não' },
    card2: { name: 'Xe Đẩy Trẻ Em Siêu Gấp Gọn', price: '2.150.000đ', desc: 'Khung hợp kim nhôm hàng không ngả 175 độ' },
    card3: { name: 'Máy Hút Sữa Điện Đôi Rảnh Tay', price: '1.450.000đ', desc: '9 cấp độ massage mềm mại không gây đau rát' },
    url: 'kabo.agency/demo/me-va-be'
  },
  {
    folder: 'health-supplements',
    title: 'Thực Phẩm Chức Năng & Vitamins',
    subtitle: 'Sản phẩm bổ sung sức khỏe, tăng cường đề kháng nhập khẩu',
    tag: 'HEALTH & VITAMINS',
    bgHeader: '#064e3b',
    primaryColor: '#059669',
    accentColor: '#10b981',
    card1: { name: 'Viên Uống Omega-3 Dầu Cá Hồi', price: '580.000đ', desc: 'Hỗ trợ tim mạch, sáng mắt & tăng cường trí nhớ' },
    card2: { name: 'Collagen Peptide Thủy Phân 10.000mg', price: '890.000đ', desc: 'Giúp da săn chắc, làm mờ nếp nhăn hiệu quả' },
    card3: { name: 'Vitamin C 1000mg Tăng Đề Kháng', price: '320.000đ', desc: 'Bổ sung năng lượng & bảo vệ tế bào cơ thể' },
    url: 'kabo.agency/demo/thuc-pham-chuc-nang'
  }
];

function generateSVG(c) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <defs>
    <linearGradient id="gradHero_${c.folder}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${c.bgHeader}" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>
    <linearGradient id="gradBtn_${c.folder}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="${c.primaryColor}" />
      <stop offset="100%" stop-color="${c.accentColor}" />
    </linearGradient>
    <filter id="shadow_${c.folder}" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="10" stdDeviation="15" flood-color="#000000" flood-opacity="0.15" />
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="1200" height="800" fill="#f8fafc" />

  <!-- Browser Window Top Bar -->
  <rect width="1200" height="42" fill="#e2e8f0" />
  <circle cx="25" cy="21" r="6" fill="#ef4444" />
  <circle cx="43" cy="21" r="6" fill="#f59e0b" />
  <circle cx="61" cy="21" r="6" fill="#10b981" />

  <!-- URL Address Bar -->
  <rect x="180" y="8" width="840" height="26" rx="6" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" />
  <text x="600" y="25" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" fill="#64748b" text-anchor="middle">🔒 https://${c.url}</text>

  <!-- Website Header Navigation Bar -->
  <rect y="42" width="1200" height="70" fill="#ffffff" stroke="#f1f5f9" stroke-width="1" />
  <!-- Logo -->
  <rect x="50" y="60" width="36" height="34" rx="8" fill="url(#gradBtn_${c.folder})" />
  <text x="96" y="83" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="900" fill="#0f172a">${c.tag.split(' ')[0]} <tspan fill="${c.primaryColor}">STUDIO</tspan></text>

  <!-- Menu Links -->
  <text x="680" y="83" font-family="sans-serif" font-size="14" font-weight="700" fill="${c.primaryColor}">Trang Chủ</text>
  <text x="770" y="83" font-family="sans-serif" font-size="14" font-weight="500" fill="#64748b">Sản Phẩm</text>
  <text x="860" y="83" font-family="sans-serif" font-size="14" font-weight="500" fill="#64748b">Dịch Vụ</text>
  <text x="940" y="83" font-family="sans-serif" font-size="14" font-weight="500" fill="#64748b">Liên Hệ</text>
  <rect x="1020" y="58" width="130" height="38" rx="20" fill="url(#gradBtn_${c.folder})" />
  <text x="1085" y="82" font-family="sans-serif" font-size="13" font-weight="800" fill="#ffffff" text-anchor="middle">Đặt Hàng Ngay</text>

  <!-- Hero Section -->
  <rect y="112" width="1200" height="340" fill="url(#gradHero_${c.folder})" />
  
  <!-- Hero Content Left -->
  <rect x="50" y="142" width="170" height="26" rx="13" fill="${c.primaryColor}" opacity="0.25" />
  <text x="135" y="159" font-family="sans-serif" font-size="11" font-weight="800" fill="${c.accentColor}" text-anchor="middle">✨ ${c.tag}</text>

  <text x="50" y="215" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="32" font-weight="900" fill="#ffffff">${c.title}</text>
  <text x="50" y="250" font-family="sans-serif" font-size="16" fill="#94a3b8">${c.subtitle}</text>

  <!-- Hero CTA Buttons -->
  <rect x="50" y="285" width="180" height="48" rx="24" fill="url(#gradBtn_${c.folder})" filter="url(#shadow_${c.folder})" />
  <text x="140" y="315" font-family="sans-serif" font-size="15" font-weight="800" fill="#ffffff" text-anchor="middle">Khám Phá Ngay →</text>

  <rect x="245" y="285" width="160" height="48" rx="24" fill="none" stroke="#ffffff" stroke-width="2" opacity="0.6" />
  <text x="325" y="315" font-family="sans-serif" font-size="15" font-weight="700" fill="#ffffff" text-anchor="middle">Xem Báo Giá</text>

  <!-- Hero Right Card Showcase Mockup -->
  <g filter="url(#shadow_${c.folder})">
    <rect x="700" y="150" width="450" height="260" rx="16" fill="#ffffff" opacity="0.95" />
    <rect x="720" y="170" width="410" height="140" rx="12" fill="${c.primaryColor}" opacity="0.1" />
    <circle cx="925" cy="240" r="35" fill="${c.primaryColor}" opacity="0.8" />
    <polygon points="920,225 940,240 920,255" fill="#ffffff" />
    <text x="730" y="340" font-family="sans-serif" font-size="18" font-weight="900" fill="#0f172a">Giao diện Website Chuyên Nghiệp</text>
    <text x="730" y="365" font-family="sans-serif" font-size="13" fill="#64748b">Chuẩn SEO, tối ưu tốc độ & tương thích mọi thiết bị</text>
    <rect x="730" y="380" width="120" height="18" rx="9" fill="${c.primaryColor}" />
    <text x="790" y="393" font-family="sans-serif" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">DEMO UI LIVE</text>
  </g>

  <!-- Cards Showcase Title -->
  <text x="600" y="490" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="900" fill="#0f172a" text-anchor="middle">DANH MỤC NỔI BẬT & BẢNG GIÁ DỊCH VỤ</text>
  <rect x="560" y="505" width="80" height="4" rx="2" fill="${c.primaryColor}" />

  <!-- 3 Cards Layout Section -->
  <!-- Card 1 -->
  <g filter="url(#shadow_${c.folder})">
    <rect x="50" y="530" width="345" height="230" rx="16" fill="#ffffff" />
    <rect x="50" y="530" width="345" height="110" rx="16" fill="${c.primaryColor}" opacity="0.12" />
    <text x="70" y="590" font-family="sans-serif" font-size="18" font-weight="800" fill="${c.primaryColor}">${c.card1.name}</text>
    <text x="70" y="665" font-family="sans-serif" font-size="13" fill="#64748b">${c.card1.desc}</text>
    <text x="70" y="730" font-family="sans-serif" font-size="20" font-weight="900" fill="#0f172a">${c.card1.price}</text>
    <rect x="270" y="705" width="105" height="34" rx="17" fill="url(#gradBtn_${c.folder})" />
    <text x="322" y="727" font-family="sans-serif" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">Chọn Mua</text>
  </g>

  <!-- Card 2 -->
  <g filter="url(#shadow_${c.folder})">
    <rect x="427" y="530" width="345" height="230" rx="16" fill="#ffffff" stroke="${c.primaryColor}" stroke-width="2" />
    <rect x="427" y="530" width="345" height="110" rx="14" fill="${c.primaryColor}" opacity="0.2" />
    <rect x="670" y="545" width="85" height="22" rx="11" fill="${c.primaryColor}" />
    <text x="712" y="560" font-family="sans-serif" font-size="10" font-weight="800" fill="#ffffff" text-anchor="middle">BÁN CHẠY</text>
    <text x="447" y="590" font-family="sans-serif" font-size="18" font-weight="800" fill="${c.primaryColor}">${c.card2.name}</text>
    <text x="447" y="665" font-family="sans-serif" font-size="13" fill="#64748b">${c.card2.desc}</text>
    <text x="447" y="730" font-family="sans-serif" font-size="20" font-weight="900" fill="#0f172a">${c.card2.price}</text>
    <rect x="647" y="705" width="105" height="34" rx="17" fill="url(#gradBtn_${c.folder})" />
    <text x="700" y="727" font-family="sans-serif" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">Chọn Mua</text>
  </g>

  <!-- Card 3 -->
  <g filter="url(#shadow_${c.folder})">
    <rect x="805" y="530" width="345" height="230" rx="16" fill="#ffffff" />
    <rect x="805" y="530" width="345" height="110" rx="16" fill="${c.primaryColor}" opacity="0.12" />
    <text x="825" y="590" font-family="sans-serif" font-size="18" font-weight="800" fill="${c.primaryColor}">${c.card3.name}</text>
    <text x="825" y="665" font-family="sans-serif" font-size="13" fill="#64748b">${c.card3.desc}</text>
    <text x="825" y="730" font-family="sans-serif" font-size="20" font-weight="900" fill="#0f172a">${c.card3.price}</text>
    <rect x="1025" y="705" width="105" height="34" rx="17" fill="url(#gradBtn_${c.folder})" />
    <text x="1077" y="727" font-family="sans-serif" font-size="12" font-weight="800" fill="#ffffff" text-anchor="middle">Chọn Mua</text>
  </g>
</svg>`;
}

for (const c of categories) {
  const dir = path.join(__dirname, '../frontend/public/demo', c.folder);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const svgPath = path.join(dir, 'hero.svg');
  fs.writeFileSync(svgPath, generateSVG(c), 'utf8');
  console.log(`✅ Generated UI mockup SVG for ${c.folder} at ${svgPath}`);
}
