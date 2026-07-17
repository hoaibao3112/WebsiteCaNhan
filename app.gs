/**
 * =====================================================================
 *  DASHBOARD HIỆU SUẤT SEO & GOOGLE ANALYTICS 4 - FULL v3
 *  (Bản nâng cấp thiết kế UI/UX Premium, Việt hóa toàn bộ giao diện)
 * =====================================================================
 * 
 * BẢNG MÀU PHONG CÁCH LOOKER STUDIO PREMIUM (BẢN CHI TIẾT)
 * 
 * 1. Tiêu đề chính toàn Dashboard: Navy đậm (#1E3A8A)
 * 2. Khối GSC (Clicks/Impressions/CTR/Position/Query): Blue (#2563EB)
 *    - Zebra nhạt chẵn: #EFF6FF
 * 3. Khối GA4 (Traffic/Bounce/Engagement/Conversion): Emerald (#059669)
 *    - Zebra nhạt chẵn: #ECFDF5
 * 4. Khối Content/Conversion (bài viết ra tiền): Violet (#7C3AED)
 *    - Zebra nhạt chẵn: #F5F3FF
 * 5. Khối Cảnh báo/Uptime: Red (#DC2626)
 *    - Zebra nhạt chẵn: #FEF2F2
 * 6. Khối Monthly Summary: Indigo (#4338CA)
 * 
 * NỀN TRANG TỔNG THỂ: #F1F5F9 (Xám xanh rất nhạt)
 * NỀN CARD KPI RIÊNG BIỆT: #FFFFFF (Trắng tinh)
 * CHỮ SỐ LIỆU CHÍNH: #0F172A (Đậm gần đen)
 * CHỮ NHÃN PHỤ/LABEL: #64748B (Xám xanh trung tính)
 * 
 * =====================================================================
 */

// =====================================================================
// 1. CONFIG - KHỞI TẠO CẤU HÌNH MẶC ĐỊNH (Sẽ bị ghi đè bởi tab Config nếu có)
// =====================================================================
const CONFIG = {
  GA4_PROPERTY_ID: "DIEN_GA4_PROPERTY_ID_VAO_DAY",
  GSC_SITE_URL: "DIEN_GSC_SITE_URL_VAO_DAY",
  LARK_WEBHOOK_URL: "DIEN_LARK_WEBHOOK_URL_VAO_DAY",
  DROP_THRESHOLD_PERCENT: 20, // 20%
  IMPORTANT_URLS: [
    "https://domain.com/",
    "https://domain.com/blog/",
  ],
  TIMEZONE: "Asia/Ho_Chi_Minh",
  API_KEY: "khoa_bao_mat_mac_dinh", // Khóa bảo mật mặc định để kết nối với Claude Desktop
  BRAND_KEYWORDS: [], // Từ khóa thương hiệu — đọc từ Config C9
};

const SHEETS = {
  DASHBOARD: "Dashboard",
  CONFIG: "Config",
  MONTHLY: "Monthly_Summary",
  GSC_RAW: "GSC_Raw",
  GA4_RAW: "GA4_Raw",
  CONTENT: "Content_Conversion",
  ALERTS: "Alerts_Log",
  README: "README",
};


// =====================================================================
// 2. SETUP - KHỞI TẠO HỆ THỐNG BAN ĐẦU
// =====================================================================
function setupDashboard() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const dashSheet = createSheetIfMissing_(ss, SHEETS.DASHBOARD, [
    ["TRANG TỔNG QUAN HIỆU SUẤT SEO & GA4", "", "", "", ""],
    ["Cập nhật lần cuối:", "", "", "", ""],
  ]);

  createSheetIfMissing_(ss, SHEETS.GSC_RAW, [
    ["Ngay", "Trang (Page)", "Clicks", "Impressions", "CTR", "Avg Position"],
  ]);

  createSheetIfMissing_(ss, SHEETS.GA4_RAW, [
    ["Ngay", "Sessions (Organic)", "Bounce Rate", "Engagement Rate", "Avg Engagement Time (s)", "Conversions"],
  ]);

  createSheetIfMissing_(ss, SHEETS.CONTENT, [
    ["Bai viet (Landing Page)", "Sessions Organic", "Conversions", "Conversion Rate", "Xep hang (theo Conversions)"],
  ]);

  createSheetIfMissing_(ss, SHEETS.ALERTS, [
    ["Thoi gian", "Loai canh bao", "Muc do", "Chi tiet", "Da gui Lark"],
  ]);

  createSheetIfMissing_(ss, SHEETS.CONFIG, [
    ["CẤU HÌNH HỆ THỐNG / SYSTEM CONFIGURATION", ""],
    [""],
    ["GA4 Property ID (Chỉ điền số)", CONFIG.GA4_PROPERTY_ID],
    ["GSC Site URL (Ví dụ sc-domain:... hoặc URL)", CONFIG.GSC_SITE_URL],
    ["Lark Webhook URL", CONFIG.LARK_WEBHOOK_URL],
    ["Ngưỡng cảnh báo sụt giảm traffic (Ví dụ: 20%)", "20%"],
    ["Danh sách URL kiểm tra uptime (cách nhau bởi dấu phẩy)", CONFIG.IMPORTANT_URLS.join(", ")],
    ["Mật mã kết nối API bảo mật (Cho Claude Desktop)", CONFIG.API_KEY],
    ["Từ khóa thương hiệu (cách nhau bởi dấu phẩy, VD: tenthuonghieu,brand)", ""],
  ]);

  createSheetIfMissing_(ss, SHEETS.MONTHLY, [
    ["BÁO CÁO HIỆU SUẤT THEO THÁNG (MONTHLY SUMMARY REPORT)", "", "", "", "", "", ""],
    [""],
    ["Tháng", "Tổng Clicks (GSC)", "Tổng Impressions (GSC)", "CTR Trung Bình", "Tổng Traffic (GA4)", "Tổng Chuyển Đổi (GA4)", "Tỷ Lệ Chuyển Đổi"],
  ]);

  // Dựng tab README hướng dẫn
  buildReadmeSheet_(ss);

  // Dọn dẹp sheet mặc định thừa
  const def = ss.getSheetByName("Sheet1") || ss.getSheetByName("Trang tính1");
  if (def && ss.getSheets().length > 1) {
    try { ss.deleteSheet(def); } catch (e) {}
  }

  styleConfigSheet_(ss); // Định dạng và khóa nhãn config
  protectManagedSheets_(ss);

  showAlert_(
    "✅ Khởi tạo các tab thành công!\n\n" +
    "👉 Bước tiếp theo: Hãy chạy hàm 'gscDashboardFull' để dựng giao diện Premium và nạp dữ liệu mẫu."
  );
}

function createSheetIfMissing_(ss, name, initialValues) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  if (initialValues && initialValues.length) {
    const maxCols = Math.max(...initialValues.map(r => r.length));
    sheet.getRange(1, 1, initialValues.length, maxCols).setValues(
      initialValues.map(row => {
        const r = row.slice();
        while (r.length < maxCols) r.push("");
        return r;
      })
    );
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function showAlert_(message) {
  try {
    SpreadsheetApp.getUi().alert(message);
  } catch (e) {
    Logger.log("[ALERT] " + message);
  }
}


// =====================================================================
// 3. SAMPLE DATA LOADER - DỮ LIỆU TĨNH MẪU (100% Cố định)
// =====================================================================
function loadSampleData(suppressAlert) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // --- GA4_Raw ---
  const ga4Sheet = ss.getSheetByName(SHEETS.GA4_RAW);
  if (!ga4Sheet) { showAlert_("Chua co tab GA4_Raw."); return; }
  ga4Sheet.getRange(2, 1, Math.max(ga4Sheet.getLastRow() - 1, 1), 6).clearContent();

  const GA4_STATIC = [
    [-21, 742, 0.442, 0.558, 88,  16],
    [-20, 789, 0.431, 0.569, 91,  18],
    [-19, 811, 0.418, 0.582, 95,  19],
    [-18, 856, 0.405, 0.595, 98,  21],
    [-17, 902, 0.397, 0.603, 103, 24],
    [-16, 934, 0.389, 0.611, 107, 26],
    [-15, 948, 0.382, 0.618, 109, 27],
    [-14, 921, 0.390, 0.610, 106, 25],
    [-13, 907, 0.394, 0.606, 104, 24],
    [-12, 915, 0.391, 0.609, 105, 25],
    [-11, 889, 0.402, 0.598, 101, 23],
    [-10, 903, 0.396, 0.604, 104, 24],
    [ -9, 918, 0.390, 0.610, 106, 25],
    [ -8, 931, 0.387, 0.613, 108, 26],
    [ -7, 842, 0.413, 0.587, 99,  21],
    [ -6, 814, 0.421, 0.579, 96,  20],
    [ -5, 798, 0.428, 0.572, 94,  19],
    [ -4, 771, 0.435, 0.565, 91,  18],
    [ -3, 754, 0.441, 0.559, 89,  17],
    [ -2, 738, 0.447, 0.553, 87,  17],
    [ -1, 671, 0.462, 0.538, 83,  15],
  ];

  const today = new Date();
  const ga4Rows = GA4_STATIC.map(r => [
    formatDate_(shiftDate_(today, r[0])),
    r[1], r[2], r[3], r[4], r[5]
  ]);
  ga4Sheet.getRange(2, 1, ga4Rows.length, 6).setValues(ga4Rows);

  // --- GSC_Raw ---
  const gscSheet = ss.getSheetByName(SHEETS.GSC_RAW);
  if (gscSheet) {
    gscSheet.getRange(2, 1, Math.max(gscSheet.getLastRow() - 1, 1), 6).clearContent();

    const GSC_PAGES = [
      { slug: "/",                 clicks: [128,  134,  119,  141,  122,  118,  98 ],
                                   impr:  [1420, 1488, 1356, 1512, 1390, 1341, 1187],
                                   pos:   [2.1, 2.0, 2.2, 1.9, 2.1, 2.3, 2.4] },
      { slug: "/dich-vu/thiet-ke-web/",
                                   clicks: [54,   61,   58,   66,   52,   49,   41 ],
                                   impr:  [712,  798,  741,  834,  688,  651,  573],
                                   pos:   [4.2, 3.9, 4.1, 3.8, 4.4, 4.6, 4.9] },
      { slug: "/blog/huong-dan-seo-2025/",
                                   clicks: [89,   94,   87,   102,  91,   85,   72 ],
                                   impr:  [980,  1041, 963,  1124, 1002, 941,  813],
                                   pos:   [3.1, 3.0, 3.2, 2.9, 3.1, 3.3, 3.5] },
      { slug: "/blog/content-marketing-la-gi/",
                                   clicks: [43,   48,   41,   52,   45,   38,   31 ],
                                   impr:  [623,  688,  602,  741,  651,  574,  489],
                                   pos:   [5.8, 5.6, 6.1, 5.4, 5.9, 6.4, 7.1] },
      { slug: "/blog/google-analytics-4/",
                                   clicks: [31,   34,   29,   38,   32,   27,   22 ],
                                   impr:  [498,  541,  476,  589,  512,  453,  387],
                                   pos:   [7.2, 7.0, 7.5, 6.8, 7.3, 7.8, 8.4] },
      { slug: "/bao-gia/",         clicks: [18,   21,   17,   24,   19,   15,   12 ],
                                   impr:  [412,  448,  391,  487,  421,  368,  314],
                                   pos:   [9.4, 9.1, 9.8, 8.9, 9.5, 10.2, 11.1] },
      { slug: "/lien-he/",         clicks: [11,   13,   10,   15,   12,   9,    7  ],
                                   impr:  [189,  204,  178,  221,  194,  165,  141],
                                   pos:   [12.3, 11.9, 12.8, 11.6, 12.4, 13.1, 14.2] },
      { slug: "/du-an/",           clicks: [7,    9,    6,    11,   8,    6,    4  ],
                                   impr:  [134,  148,  124,  167,  139,  118,  98 ],
                                   pos:   [18.7, 18.2, 19.4, 17.8, 18.9, 20.1, 22.3] },
    ];

    const gscRows = [];
    for (let dayOffset = 7; dayOffset >= 1; dayOffset--) {
      const dateStr = formatDate_(shiftDate_(today, -dayOffset));
      const idx = 7 - dayOffset;
      GSC_PAGES.forEach(p => {
        const impr = p.impr[idx];
        const clicks = p.clicks[idx];
        const ctr = clicks / impr;
        gscRows.push([dateStr, "https://domain.com" + p.slug, clicks, impr, ctr, p.pos[idx]]);
      });
    }
    gscSheet.getRange(2, 1, gscRows.length, 6).setValues(gscRows);
  }

  // --- Content_Conversion ---
  const contentSheet = ss.getSheetByName(SHEETS.CONTENT);
  if (contentSheet) {
    contentSheet.getRange(2, 1, Math.max(contentSheet.getLastRow() - 1, 1), 5).clearContent();
    const CONTENT_STATIC = [
      ["https://domain.com/blog/huong-dan-seo-2025/",            618, 24, 0.0388, 1],
      ["https://domain.com/dich-vu/thiet-ke-web/",               481, 18, 0.0374, 2],
      ["https://domain.com/bao-gia/",                            342, 12, 0.0351, 3],
      ["https://domain.com/blog/content-marketing-la-gi/",       392,  9, 0.0230, 4],
      ["https://domain.com/du-an/",                              201,  6, 0.0299, 5],
      ["https://domain.com/blog/google-analytics-4/",            274,  5, 0.0182, 6],
      ["https://domain.com/dich-vu/",                            188,  3, 0.0160, 7],
      ["https://domain.com/blog/thiet-ke-ux-ui/",               143,  1, 0.0070, 8],
    ];
    contentSheet.getRange(2, 1, CONTENT_STATIC.length, 5).setValues(CONTENT_STATIC);
  }

  // --- Alerts_Log ---
  const alertsSheet = ss.getSheetByName(SHEETS.ALERTS);
  if (alertsSheet) {
    alertsSheet.getRange(2, 1, Math.max(alertsSheet.getLastRow() - 1, 1), 5).clearContent();
    const ALERTS_STATIC = [
      [
        formatDate_(shiftDate_(today, -1)) + " 07:04",
        "Traffic giam",
        "URGENT",
        "Organic Traffic hom qua (671) giam 27.9% so voi cung thu tuan truoc (931). Keo dai 3 ngay lien tiep.",
        "Da gui"
      ],
      [
        formatDate_(shiftDate_(today, -1)) + " 13:22",
        "Loi 404",
        "URGENT",
        "- https://domain.com/blog/seo-co-ban/ → HTTP 404 (trang bi xoa nhung chua redirect)\n- https://domain.com/dich-vu/landing-page/ → HTTP 404",
        "Da gui"
      ],
      [
        formatDate_(shiftDate_(today, -3)) + " 07:03",
        "Traffic giam",
        "WATCH",
        "Organic Traffic ngay " + formatDate_(shiftDate_(today, -3)) + " (754) giam 23.3% so voi cung thu tuan truoc.",
        "Da gui"
      ],
      [
        formatDate_(shiftDate_(today, -5)) + " 07:04",
        "Traffic giam",
        "WATCH",
        "Organic Traffic ngay " + formatDate_(shiftDate_(today, -5)) + " (798) giam 20.7% so voi cung thu tuan truoc.",
        "Da gui"
      ],
      [
        formatDate_(shiftDate_(today, -9)) + " 07:05",
        "Traffic giam",
        "WATCH",
        "Organic Traffic ngay " + formatDate_(shiftDate_(today, -9)) + " (918) giam 14.1% so voi cung thu tuan truoc (1069 — sau ngay le).",
        "Da gui"
      ],
      [
        formatDate_(shiftDate_(today, -14)) + " 07:04",
        "Loi script",
        "URGENT",
        "Ham dailyUpdate gap loi: Error: Loi GA4 API. Da tu dong thu lai.",
        "Da gui"
      ],
    ];
    alertsSheet.getRange(2, 1, ALERTS_STATIC.length, 5).setValues(ALERTS_STATIC);
  }

  // --- Monthly_Summary ---
  const monthlySheet = ss.getSheetByName(SHEETS.MONTHLY);
  if (monthlySheet) {
    monthlySheet.getRange(4, 2, Math.max(monthlySheet.getLastRow() - 3, 1), 7).clearContent();
    const MONTHLY_STATIC = [
      ["Tháng 2/2026", 156, 14200, 0.0110, 9840,  198, 0.0201],
      ["Tháng 3/2026", 184, 16800, 0.0110, 11200, 242, 0.0216],
      ["Tháng 4/2026", 215, 19500, 0.0110, 12800, 294, 0.0230],
      ["Tháng 5/2026", 248, 22100, 0.0112, 14500, 348, 0.0240],
      ["Tháng 6/2026", 279, 25400, 0.0110, 16100, 388, 0.0241],
      ["Tháng 7/2026", 185, 18200, 0.0102, 10840, 235, 0.0217]
    ];
    monthlySheet.getRange(4, 2, MONTHLY_STATIC.length, 7).setValues(MONTHLY_STATIC);
  }

  SpreadsheetApp.flush();
}

// =====================================================================
// 4. ĐẶT LỊCH TRIGGER CHẠY TỰ ĐỘNG
// =====================================================================
function createTriggers() {
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));

  ScriptApp.newTrigger("dailyUpdate")
    .timeBased()
    .atHour(7)
    .everyDays(1)
    .inTimezone(CONFIG.TIMEZONE)
    .create();

  ScriptApp.newTrigger("checkUptime")
    .timeBased()
    .everyHours(6)
    .create();

  showAlert_(
    "✅ Đã đặt Trigger thành công!\n\n" +
    "• dailyUpdate: chạy lúc 7:00 AM mỗi ngày\n" +
    "• checkUptime: chạy mỗi 6 tiếng"
  );
}

function deleteAllTriggers() {
  ScriptApp.getProjectTriggers().forEach(t => ScriptApp.deleteTrigger(t));
  showAlert_("Đã xóa toàn bộ trigger.");
}


// =====================================================================
// 5. BẢO VỆ CÁC TAB TỰ ĐỘNG
// =====================================================================
function protectManagedSheets_(ss) {
  const names = [SHEETS.DASHBOARD, SHEETS.MONTHLY, SHEETS.GSC_RAW, SHEETS.GA4_RAW, SHEETS.CONTENT, SHEETS.ALERTS];
  const me = Session.getEffectiveUser();
  names.forEach(name => {
    const sheet = ss.getSheetByName(name);
    if (!sheet) return;
    try {
      sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET).forEach(p => p.remove());
      sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE).forEach(p => p.remove());
    } catch (e) {
      Logger.log("Lỗi xóa protection: " + e.message);
    }
    const protection = sheet.protect().setDescription("Tu dong quan ly boi script");
    try { protection.removeEditors(protection.getEditors()); } catch (e) {}
    try { if (protection.canDomainEdit()) protection.setDomainEdit(false); } catch (e) {}
    try { protection.addEditor(me); } catch (e) {}
  });
}

function protectManagedSheetsPublic() {
  protectManagedSheets_(SpreadsheetApp.getActiveSpreadsheet());
  showAlert_("Đã khóa lại các tab hệ thống.");
}

function unprotectManagedSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const names = [SHEETS.DASHBOARD, SHEETS.MONTHLY, SHEETS.GSC_RAW, SHEETS.GA4_RAW, SHEETS.CONTENT, SHEETS.ALERTS];
  names.forEach(name => {
    const sheet = ss.getSheetByName(name);
    if (!sheet) return;
    try {
      sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET).forEach(p => p.remove());
      sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE).forEach(p => p.remove());
    } catch (e) {
      Logger.log("Lỗi mở khóa: " + e.message);
    }
  });
  showAlert_("Đã mở khóa các tab. Hãy chạy 'protectManagedSheetsPublic' sau khi sửa xong.");
}


// =====================================================================
// 6. XÂY DỰNG GIAO DIỆN DASHBOARD GSC & GA4 PREMIUM
// =====================================================================
function buildGscDashboard(suppressAlert) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEETS.DASHBOARD);
  if (!sheet) { showAlert_("Chua co tab Dashboard. Chay setupDashboard truoc."); return; }

  // Mã màu chủ đạo chuyên nghiệp Slate & Navy
  const L = {
    BG:       "#F1F5F9",   // Nền Dashboard xám xanh nhạt Looker Studio
    CARD_BG:  "#FFFFFF",   // Nền trắng thẻ card
    CARD_HDR: "#EFF6FF",   // Nền xanh nhạt tiêu đề card
    BORDER:   "#E2E8F0",   // Màu viền card mảnh slate
    TEXT_NAVY:"#0F172A",   // Chữ số liệu chính (Dark Slate)
    TEXT_DIM: "#64748B",   // Chữ nhãn card (Slate Grey)
    HDR_BG:   "#1E3A8A",   // Nền banner chính navy đậm
    ALT_BG:   "#F8FAFC",   // Dòng xen kẽ mặc định
    LINE:     "#E2E8F0"
  };

  const ACCENTS = {
    GSC:      "#2563EB",   // Xanh dương
    GA4:      "#059669",   // Xanh ngọc (emerald)
    CONTENT:  "#7C3AED",   // Tím (violet)
    ALERTS:   "#DC2626",   // Đỏ
    MONTHLY:  "#4338CA"    // Indigo
  };

  try {
    sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET).forEach(p => p.remove());
    sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE).forEach(p => p.remove());
  } catch (e) {
    Logger.log("Lỗi xóa protection: " + e.message);
  }
  
  sheet.clear();
  sheet.clearFormats();
  sheet.getCharts().forEach(c => sheet.removeChart(c));

  // Định nghĩa độ rộng cột (Spacer: A, G, M, S)
  const colW = [15, 180, 60, 80, 80, 70, 15, 180, 60, 80, 80, 70, 15, 180, 90, 90, 90, 70, 15, 100];
  colW.forEach((w, i) => sheet.setColumnWidth(i + 1, w));

  // Phủ nền xám xanh nhạt toàn bộ Dashboard
  sheet.getRange(1, 1, 65, 20).setBackground(L.BG).setFontFamily("Roboto");

  // Thiết lập chiều cao dòng phân cấp visual rõ ràng (Card KPI cao 3 hàng)
  const rh = { 1:15, 2:50, 3:15, 4:20, 5:22, 6:22, 7:15, 8:20, 9:22, 10:22, 11:28, 12:15, 13:25, 14:24, 28:15, 29:25, 30:24, 44:15, 45:25, 46:24 };
  for (let r = 1; r <= 60; r++) sheet.setRowHeight(r, rh[r] || 22);

  // === BANNER TIÊU ĐỀ CHÍNH (Dòng 2) ===
  sheet.getRange(2, 2, 1, 17).merge()
    .setBackground(L.HDR_BG)
    .setFontColor("#FFFFFF").setFontSize(16).setFontWeight("bold")
    .setHorizontalAlignment("center").setVerticalAlignment("middle")
    .setValue("BÁO CÁO HIỆU SUẤT SEO & GOOGLE ANALYTICS 4");

  // === THẺ KPI GOOGLE SEARCH CONSOLE (GSC) - Dòng 4-6 ===
  setupKpiCard_(sheet, "B4:B6", "B4", "B5:B6", "🖱️ LƯỢT NHẤP (CLICKS)", L, ACCENTS.GSC);
  setupKpiCard_(sheet, "C4:D6", "C4:D4", "C5:D6", "👁️ LƯỢT HIỂN THỊ (IMPR)", L, ACCENTS.GSC);
  setupKpiCard_(sheet, "E4:F6", "E4:F4", "E5:F6", "🎯 CTR TRUNG BÌNH", L, ACCENTS.GSC);
  setupKpiCard_(sheet, "H4:H6", "H4", "H5:H6", "📍 VỊ TRÍ TRUNG BÌNH", L, ACCENTS.GSC);
  setupKpiCard_(sheet, "I4:J6", "I4:J4", "I5:J6", "🔍 NHẤP THƯƠNG HIỆU", L, ACCENTS.GSC);
  setupKpiCard_(sheet, "K4:L6", "K4:L4", "K5:L6", "🔍 TỪ KHÓA (QUERIES)", L, ACCENTS.GSC);
  setupKpiCard_(sheet, "N4:N6", "N4", "N5:N6", "🖱️ NHẤP 2 THÁNG TRƯỚC", L, ACCENTS.GSC);
  setupKpiCard_(sheet, "O4:P6", "O4:P4", "O5:P6", "🖱️ NHẤP THÁNG TRƯỚC", L, ACCENTS.GSC);
  setupKpiCard_(sheet, "Q4:R6", "Q4:R4", "Q5:R6", "📈 TĂNG TRƯỞNG NHẤP", L, ACCENTS.GSC);

  // === THẺ KPI GOOGLE ANALYTICS 4 (GA4) - Dòng 8-10 ===
  setupKpiCardWithSparkline_(sheet, "B8:D10", "B8:D8", "B9:B10", "C9:C10", "D9:D10", "🚀 TRAFFIC TỰ NHIÊN (GA4)", L, ACCENTS.GA4);
  setupKpiCardWithDelta_(sheet, "E8:F10", "E8:F8", "E9:E10", "F9:F10", "↩️ TỶ LỆ THOÁT (BOUNCE)", L, ACCENTS.GA4);
  setupKpiCardWithSparkline_(sheet, "H8:J10", "H8:J8", "H9:H10", "I9:I10", "J9:J10", "💬 TỶ LỆ TƯƠNG TÁC", L, ACCENTS.GA4);
  setupKpiCardWithDelta_(sheet, "K8:L10", "K8:L8", "K9:K10", "L9:L10", "⏱️ THỜI GIAN TƯƠNG TÁC", L, ACCENTS.GA4);
  setupKpiCardWithSparkline_(sheet, "N8:P10", "N8:P8", "N9:N10", "O9:O10", "P9:P10", "💰 TỶ LỆ CHUYỂN ĐỔI", L, ACCENTS.GA4);
  setupKpiCardWithDelta_(sheet, "Q8:R10", "Q8:R8", "Q9:Q10", "R9:R10", "🛡️ TRẠNG THÁI HỆ THỐNG", L, ACCENTS.GA4);

  // === DẢI CHÚ GIẢI THÔNG TIN VÀ MÀU KHU VỰC NGAY TRÊN DASHBOARD (Dòng 11) ===
  sheet.getRange(11, 2, 1, 17).merge()
    .setBackground("#F1F5F9")
    .setFontColor("#475569")
    .setFontSize(8)
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle")
    .setValue("Chú thích màu:  🟦 GSC (Search Console)   |   🟩 GA4 (Analytics)   |   🟪 Bài viết ra tiền   |   🟥 Cảnh báo & Uptime    ━━━    Trạng thái: 🟢 Ổn định  🟡 Theo dõi  🔴 Khẩn cấp")
    .setBorder(true, true, true, true, false, false, L.BORDER, SpreadsheetApp.BorderStyle.SOLID);

  // === KHUNG CHỨA BIỂU ĐỒ & BẢNG SỐ LIỆU ===
  // Hàng 13-27
  setupContainer_(sheet, "B13:F27", "B13:F13", "LƯỢT NHẤP THEO THIẾT BỊ", L, ACCENTS.GSC);
  setupContainer_(sheet, "H13:L27", "H13:L13", "XU HƯỚNG TRAFFIC & CHUYỂN ĐỔI (GA4)", L, ACCENTS.GA4);
  
  setupContainer_(sheet, "N13:R27", "N13:R13", "TOP TỪ KHÓA HIỆU QUẢ", L, ACCENTS.GSC);
  setupTableHeader_(sheet, "N14:R14", ["Từ khóa", "Lượt nhấp", "Lượt hiển thị", "Vị trí TB", "CTR"], L);
  formatTableContent_(sheet, 15, 27, 14, 18, L, "#EFF6FF"); // Zebra xanh dương nhạt GSC

  // Hàng 29-43
  setupContainer_(sheet, "B29:F43", "B29:F29", "HIỆU SUẤT THEO THIẾT BỊ", L, ACCENTS.GSC);
  setupTableHeader_(sheet, "B30:F30", ["Thiết bị", "Lượt nhấp", "Lượt hiển thị", "Vị trí TB", "CTR"], L);
  formatTableContent_(sheet, 31, 43, 2, 6, L, "#EFF6FF");

  setupContainer_(sheet, "H29:L43", "H29:L29", "HIỆU SUẤT TRANG ĐÍCH", L, ACCENTS.GSC);
  setupTableHeader_(sheet, "H30:L30", ["Trang đích", "Lượt nhấp", "Lượt hiển thị", "Vị trí TB", "CTR"], L);
  formatTableContent_(sheet, 31, 43, 8, 12, L, "#EFF6FF");

  setupContainer_(sheet, "N29:R43", "N29:R29", "TRANG TĂNG TRƯỞNG TỐT NHẤT (MoM)", L, ACCENTS.GSC);
  setupTableHeader_(sheet, "N30:R30", ["Trang đích", "Nhấp 2 tháng trước", "Nhấp tháng trước", "Tăng trưởng nhấp", "Tỷ lệ tăng trưởng"], L);
  formatTableContent_(sheet, 31, 43, 14, 18, L, "#EFF6FF");

  // Hàng 45-57
  setupContainer_(sheet, "B45:F57", "B45:F45", "TỪ KHÓA TỰ NHIÊN (UNBRANDED)", L, ACCENTS.GSC);
  setupTableHeader_(sheet, "B46:F46", ["Từ khóa", "Lượt nhấp", "Lượt hiển thị", "Vị trí TB", "CTR"], L);
  formatTableContent_(sheet, 47, 57, 2, 6, L, "#EFF6FF");

  setupContainer_(sheet, "H45:L57", "H45:L45", "TỪ KHÓA THƯƠNG HIỆU (BRANDED)", L, ACCENTS.GSC);
  setupTableHeader_(sheet, "H46:L46", ["Từ khóa", "Lượt nhấp", "Lượt hiển thị", "Vị trí TB", "CTR"], L);
  formatTableContent_(sheet, 47, 57, 8, 12, L, "#EFF6FF");

  // Bảng hiệu suất chuyển đổi bài viết (Conversion theo trang đích - N45:R57)
  setupContainer_(sheet, "N45:R57", "N45:R45", "HIỆU SUẤT CHUYỂN ĐỔI BÀI VIẾT (TOP CONVERSIONS)", L, ACCENTS.CONTENT);
  setupTableHeader_(sheet, "N46:R46", ["Trang đích", "Sessions GA4", "Chuyển đổi", "Tỷ lệ chuyển đổi", "Xếp hạng"], L);
  formatTableContent_(sheet, 47, 57, 14, 18, L, "#F5F3FF"); // Zebra tím nhạt Content

  sheet.setHiddenGridlines(true);
  SpreadsheetApp.flush();

  protectManagedSheets_(ss);

  if (!suppressAlert) {
    showAlert_("✅ Dựng khung Dashboard Premium thành công!");
  }
}

function setupKpiCard_(sheet, rangeStr, labelRangeStr, valueRangeStr, label, L, accentColor) {
  try {
    const range = sheet.getRange(rangeStr);
    range.setBackground(L.CARD_BG);
    
    // Set mảnh viền xung quanh card (top, right, bottom)
    range.setBorder(true, null, true, true, false, false, L.BORDER, SpreadsheetApp.BorderStyle.SOLID);
    // Set viền trái dày (SOLID_THICK) tô màu accent
    sheet.getRange(range.getRow(), range.getColumn(), range.getNumRows(), 1)
      .setBorder(null, true, null, null, false, false, accentColor, SpreadsheetApp.BorderStyle.SOLID_THICK);
    
    const lblRange = sheet.getRange(labelRangeStr);
    if (lblRange.getNumRows() > 1 || lblRange.getNumColumns() > 1) {
      lblRange.merge();
    }
    lblRange.setFontColor(L.TEXT_DIM).setFontSize(8).setFontWeight("bold")
      .setHorizontalAlignment("center").setVerticalAlignment("middle")
      .setValue(label);

    const valRange = sheet.getRange(valueRangeStr);
    if (valRange.getNumRows() > 1 || valRange.getNumColumns() > 1) {
      valRange.merge();
    }
    valRange.setFontColor(L.TEXT_NAVY).setFontSize(16).setFontWeight("bold")
      .setHorizontalAlignment("center").setVerticalAlignment("middle");
  } catch (e) {
    Logger.log("Lỗi setupKpiCard: " + e.message);
  }
}

function setupKpiCardWithDelta_(sheet, rangeStr, labelRangeStr, valueRangeStr, deltaRangeStr, label, L, accentColor) {
  try {
    const range = sheet.getRange(rangeStr);
    range.setBackground(L.CARD_BG);
    
    // Set mảnh viền xung quanh card (top, right, bottom)
    range.setBorder(true, null, true, true, false, false, L.BORDER, SpreadsheetApp.BorderStyle.SOLID);
    // Set viền trái dày
    sheet.getRange(range.getRow(), range.getColumn(), range.getNumRows(), 1)
      .setBorder(null, true, null, null, false, false, accentColor, SpreadsheetApp.BorderStyle.SOLID_THICK);
    
    const lblRange = sheet.getRange(labelRangeStr);
    if (lblRange.getNumRows() > 1 || lblRange.getNumColumns() > 1) {
      lblRange.merge();
    }
    lblRange.setFontColor(L.TEXT_DIM).setFontSize(8).setFontWeight("bold")
      .setHorizontalAlignment("center").setVerticalAlignment("middle")
      .setValue(label);

    const valRange = sheet.getRange(valueRangeStr);
    if (valRange.getNumRows() > 1 || valRange.getNumColumns() > 1) {
      valRange.merge();
    }
    valRange.setFontColor(L.TEXT_NAVY).setFontSize(15).setFontWeight("bold")
      .setHorizontalAlignment("left").setVerticalAlignment("middle");

    const dltRange = sheet.getRange(deltaRangeStr);
    if (dltRange.getNumRows() > 1 || dltRange.getNumColumns() > 1) {
      dltRange.merge();
    }
    dltRange.setFontSize(8).setFontWeight("bold")
      .setHorizontalAlignment("right").setVerticalAlignment("middle");
  } catch (e) {
    Logger.log("Lỗi setupKpiCardWithDelta: " + e.message);
  }
}

function setupKpiCardWithSparkline_(sheet, rangeStr, labelRangeStr, valueRangeStr, sparklineRangeStr, deltaRangeStr, label, L, accentColor) {
  try {
    const range = sheet.getRange(rangeStr);
    range.setBackground(L.CARD_BG);
    
    // Set mảnh viền xung quanh card (top, right, bottom)
    range.setBorder(true, null, true, true, false, false, L.BORDER, SpreadsheetApp.BorderStyle.SOLID);
    // Set viền trái dày
    sheet.getRange(range.getRow(), range.getColumn(), range.getNumRows(), 1)
      .setBorder(null, true, null, null, false, false, accentColor, SpreadsheetApp.BorderStyle.SOLID_THICK);
    
    const lblRange = sheet.getRange(labelRangeStr);
    if (lblRange.getNumRows() > 1 || lblRange.getNumColumns() > 1) {
      lblRange.merge();
    }
    lblRange.setFontColor(L.TEXT_DIM).setFontSize(8).setFontWeight("bold")
      .setHorizontalAlignment("center").setVerticalAlignment("middle")
      .setValue(label);

    const valRange = sheet.getRange(valueRangeStr);
    if (valRange.getNumRows() > 1 || valRange.getNumColumns() > 1) {
      valRange.merge();
    }
    valRange.setFontColor(L.TEXT_NAVY).setFontSize(15).setFontWeight("bold")
      .setHorizontalAlignment("left").setVerticalAlignment("middle");

    const sparkRange = sheet.getRange(sparklineRangeStr);
    if (sparkRange.getNumRows() > 1 || sparkRange.getNumColumns() > 1) {
      sparkRange.merge();
    }
    sparkRange.setHorizontalAlignment("center").setVerticalAlignment("middle");

    const dltRange = sheet.getRange(deltaRangeStr);
    if (dltRange.getNumRows() > 1 || dltRange.getNumColumns() > 1) {
      dltRange.merge();
    }
    dltRange.setFontSize(8).setFontWeight("bold")
      .setHorizontalAlignment("right").setVerticalAlignment("middle");
  } catch (e) {
    Logger.log("Lỗi setupKpiCardWithSparkline: " + e.message);
  }
}

function setupContainer_(sheet, cardRange, headerRange, title, L, accentColor) {
  try {
    sheet.getRange(cardRange).setBackground(L.CARD_BG)
      .setBorder(true, true, true, true, false, false, L.BORDER, SpreadsheetApp.BorderStyle.SOLID);
    sheet.getRange(headerRange).merge()
      .setBackground(accentColor) // Màu accent đặc trưng của khối
      .setFontColor("#FFFFFF")
      .setFontSize(9)
      .setFontWeight("bold")
      .setVerticalAlignment("middle")
      .setValue("  " + title);
    
    sheet.getRange(headerRange).setBorder(null, null, true, null, null, null, L.BORDER, SpreadsheetApp.BorderStyle.SOLID);
  } catch (e) {
    Logger.log("Lỗi setupContainer: " + e.message);
  }
}

function setupTableHeader_(sheet, rangeStr, headers, L) {
  try {
    const range = sheet.getRange(rangeStr);
    range.setBackground(L.ALT_BG)
      .setFontColor("#475569")
      .setFontSize(9)
      .setFontWeight("bold")
      .setVerticalAlignment("middle");
    
    range.setValues([headers]);
    
    const startCol = range.getColumn();
    const numCols = range.getNumColumns();
    sheet.getRange(range.getRow(), startCol).setHorizontalAlignment("left");
    if (numCols > 1) {
      sheet.getRange(range.getRow(), startCol + 1, 1, numCols - 1).setHorizontalAlignment("right");
    }
    
    range.setBorder(null, null, true, null, null, null, L.BORDER, SpreadsheetApp.BorderStyle.SOLID);
  } catch (e) {
    Logger.log("Lỗi setupTableHeader: " + e.message);
  }
}

function formatTableContent_(sheet, startRow, endRow, startCol, endCol, L, evenBgColor) {
  try {
    const range = sheet.getRange(startRow, startCol, endRow - startRow + 1, endCol - startCol + 1);
    range.setFontColor("#1E293B").setFontSize(9).setVerticalAlignment("middle");
    
    sheet.getRange(startRow, startCol, endRow - startRow + 1, 1).setHorizontalAlignment("left");
    if (endCol > startCol) {
      sheet.getRange(startRow, startCol + 1, endRow - startRow + 1, endCol - startCol).setHorizontalAlignment("right");
    }
    
    const dilutedBg = evenBgColor || L.ALT_BG;
    for (let r = startRow; r <= endRow; r++) {
      const bg = r % 2 === 0 ? dilutedBg : L.CARD_BG;
      sheet.getRange(r, startCol, 1, endCol - startCol + 1).setBackground(bg);
    }
  } catch (e) {
    Logger.log("Lỗi formatTableContent: " + e.message);
  }
}

// =====================================================================
// 7. GHI SỐ LIỆU MẪU LÊN DASHBOARD GSC & GA4
// =====================================================================
function writeGscSampleData(suppressAlert) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEETS.DASHBOARD);
  if (!sheet) { showAlert_("Chua co Dashboard."); return; }

  try {
    sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET).forEach(p => p.remove());
    sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE).forEach(p => p.remove());
  } catch (e) {
    Logger.log("Lỗi xóa protection: " + e.message);
  }

  // --- 1. KPI Cards GSC (Hàng 4-6) ---
  sheet.getRange("B5").setValue(7); // Clicks
  sheet.getRange("C5").setValue(746); // Impressions
  sheet.getRange("E5").setValue(0.0094); // CTR
  sheet.getRange("H5").setValue(33.03); // Position
  sheet.getRange("I5").setValue("=SUM(I47:I50)"); // Nhấp thương hiệu (Trỏ về bảng mới dòng 47-50)
  sheet.getRange("K5").setValue("=COUNTA(N15:N24)"); // Số lượng từ khóa (Bảng mới dòng 15-24)
  sheet.getRange("N5").setValue(13); // Clicks 2 Mo Ago
  sheet.getRange("O5").setValue(9); // Clicks Mo Ago
  sheet.getRange("Q5").setValue("=O5-N5"); // Growth

  sheet.getRange("B5").setNumberFormat("#,##0");
  sheet.getRange("C5").setNumberFormat("#,##0");
  sheet.getRange("E5").setNumberFormat("0.00%");
  sheet.getRange("H5").setNumberFormat("0.00");
  sheet.getRange("I5").setNumberFormat("#,##0");
  sheet.getRange("K5").setNumberFormat("#,##0");
  sheet.getRange("N5").setNumberFormat("#,##0");
  sheet.getRange("O5").setNumberFormat("#,##0");
  sheet.getRange("Q5").setNumberFormat("+#,##0;-#,##0;0");

  // --- 2. KPI Cards GA4 (Hàng 8-10, tích hợp Sparkline) ---
  sheet.getRange("B9").setValue(671); // Sessions
  sheet.getRange("C9").setValue('=SPARKLINE(GA4_Raw!B2:B22)');
  formatDeltaCell_(sheet, "D9", "-27.9%", false);
  
  sheet.getRange("E9").setValue(0.462); // Bounce Rate
  sheet.getRange("E9").setNumberFormat("0.00%");
  formatDeltaCell_(sheet, "F9", "+19.4%", true); // invertLogic: Bounce Rate tăng là xấu
  
  sheet.getRange("H9").setValue(0.538); // Engagement Rate
  sheet.getRange("H9").setNumberFormat("0.00%");
  sheet.getRange("I9").setValue('=SPARKLINE(GA4_Raw!D2:D22)');
  formatDeltaCell_(sheet, "J9", "-12.2%", false);
  
  sheet.getRange("K9").setValue(83); // Engagement Time
  formatDeltaCell_(sheet, "L9", "-23.1%", false);
  
  sheet.getRange("N9").setValue(0.0224); // Conv Rate
  sheet.getRange("N9").setNumberFormat("0.00%");
  sheet.getRange("O9").setValue('=SPARKLINE(GA4_Raw!F2:F22)');
  formatDeltaCell_(sheet, "P9", "-19.7%", false);
  
  // Status Warning Card
  sheet.getRange("Q9").setValue("🔴 Khẩn cấp").setFontColor("#B91C1C").setBackground("#FEF2F2");
  sheet.getRange("R9").setValue("Lỗi Uptime: 2").setFontColor("#B91C1C").setFontSize(8).setFontWeight("bold");

  // Format số hàng GA4
  sheet.getRange("B9").setNumberFormat("#,##0");
  sheet.getRange("K9").setNumberFormat("#,##0");

  // --- 3. Ghi Bảng Thiết Bị (Device) ---
  const deviceData = [
    ["Desktop", 5, 538, 24.19, 0.0093],
    ["Mobile", 2, 125, 28.05, 0.0160],
    ["Tablet", 0, 3, 3.33, 0.0000]
  ];
  sheet.getRange("B31:F33").setValues(deviceData);
  sheet.getRange("C31:C33").setNumberFormat("#,##0");
  sheet.getRange("D31:D33").setNumberFormat("#,##0");
  sheet.getRange("E31:E33").setNumberFormat("0.00");
  sheet.getRange("F31:F33").setNumberFormat("0.00%");

  // --- 4. Ghi Bảng Trang Đích (Landing Page) ---
  const lpData = [
    ["https://domain.com/blog/huong-dan-seo-2025/", 9, 120, 15.4, 0.075],
    ["https://domain.com/dich-vu/thiet-ke-web/", 4, 85, 8.2, 0.047],
    ["https://domain.com/bao-gia/", 2, 42, 12.1, 0.048],
    ["https://domain.com/blog/content-marketing-la-gi/", 1, 30, 22.5, 0.033],
    ["https://domain.com/du-an/", 0, 15, 45.0, 0.000]
  ];
  sheet.getRange("H31:L35").setValues(lpData);
  sheet.getRange("I31:I35").setNumberFormat("#,##0");
  sheet.getRange("J31:J35").setNumberFormat("#,##0");
  sheet.getRange("K31:K35").setNumberFormat("0.00");
  sheet.getRange("L31:L35").setNumberFormat("0.00%");

  // --- 5. Ghi Bảng Trang Tăng Trưởng Tốt Nhất (Best Performers) ---
  const bestPerfData = [
    ["https://domain.com/blog/huong-dan-seo-2025/", 13, 9, -4, -0.3077],
    ["https://domain.com/dich-vu/thiet-ke-web/", 0, 0, 0, 0],
    ["https://domain.com/bao-gia/", 0, 0, 0, 0],
    ["https://domain.com/blog/content-marketing-la-gi/", 0, 0, 0, 0],
    ["https://domain.com/du-an/", 0, 0, 0, 0]
  ];
  sheet.getRange("N31:R35").setValues(bestPerfData);
  sheet.getRange("O31:O35").setNumberFormat("#,##0");
  sheet.getRange("P31:P35").setNumberFormat("#,##0");
  sheet.getRange("Q31:Q35").setNumberFormat("+#,##0;-#,##0;0");
  sheet.getRange("R31:R35").setNumberFormat("0.00%");

  // --- 6. Ghi Bảng Top Queries ---
  const topQueriesData = [
    ["looker studio consultant", 4, 131, 11.75, 0.0305],
    ["hire looker studio consultant", 2, 117, 28.68, 0.0171],
    ["contact looker studio consultant", 1, 112, 41.55, 0.0089],
    ["expert looker studio", 0, 61, 49.77, 0.0000],
    ["looker studio specialist", 0, 44, 45.84, 0.0000],
    ["tuan supramaniam consulting", 0, 32, 10.34, 0.0000],
    ["data studio expert", 0, 28, 73.64, 0.0000],
    ["looker studio consulting", 0, 27, 77.59, 0.0000],
    ["google data studio expert", 0, 20, 81.20, 0.0000],
    ["looker studio developer", 0, 15, 66.45, 0.0000]
  ];
  sheet.getRange("N15:R24").setValues(topQueriesData);
  sheet.getRange("O15:O24").setNumberFormat("#,##0");
  sheet.getRange("P15:P24").setNumberFormat("#,##0");
  sheet.getRange("Q15:Q24").setNumberFormat("0.00");
  sheet.getRange("R15:R24").setNumberFormat("0.00%");

  // --- 7. Ghi Bảng Unbranded Queries ---
  const unbrandedData = [
    ["huong dan tu hoc seo", 0, 117, 28.68, 0.0000],
    ["cach cai google analytics 4", 0, 61, 49.77, 0.0000],
    ["thiet ke landing page chuyen nghiep", 0, 44, 45.84, 0.0000],
    ["viet content chuan seo", 0, 32, 10.34, 0.0000],
    ["bao gia thiet ke web", 0, 28, 73.64, 0.0000],
    ["dich vu seo website", 0, 27, 77.59, 0.0000],
    ["khoa hoc seo online", 0, 20, 81.20, 0.0000],
    ["thiet ke web gia re", 0, 15, 66.45, 0.0000],
    ["tu van chien luoc seo", 0, 12, 73.50, 0.0000],
    ["viet bai chuan seo thue", 0, 8, 85.10, 0.0000]
  ];
  sheet.getRange("B47:F56").setValues(unbrandedData);
  sheet.getRange("C47:C56").setNumberFormat("#,##0");
  sheet.getRange("D47:D56").setNumberFormat("#,##0");
  sheet.getRange("E47:E56").setNumberFormat("0.00");
  sheet.getRange("F47:F56").setNumberFormat("0.00%");

  // --- 8. Ghi Bảng Branded Queries ---
  const brandedData = [
    ["website ca nhan", 3, 105, 2.15, 0.0286],
    ["thiet ke website ca nhan", 1, 26, 3.10, 0.0385],
    ["dich vu thiet ke web ca nhan", 0, 2, 4.50, 0.0000],
    ["antigravity", 0, 1, 1.20, 0.0000]
  ];
  sheet.getRange("H47:L50").setValues(brandedData);
  sheet.getRange("I47:I50").setNumberFormat("#,##0");
  sheet.getRange("J47:J50").setNumberFormat("#,##0");
  sheet.getRange("K47:K50").setNumberFormat("0.00");
  sheet.getRange("L47:L50").setNumberFormat("0.00%");

  // --- 9. Ghi Bảng Conversion Trang Đích (HIỆU SUẤT CHUYỂN ĐỔI BÀI VIẾT) ---
  const convPageData = [
    ["https://domain.com/blog/huong-dan-seo-2025/", 618, 24, 0.0388, 1],
    ["https://domain.com/dich-vu/thiet-ke-web/", 481, 18, 0.0374, 2],
    ["https://domain.com/bao-gia/", 342, 12, 0.0351, 3],
    ["https://domain.com/blog/content-marketing-la-gi/", 392, 9, 0.0230, 4],
    ["https://domain.com/du-an/", 201, 6, 0.0299, 5],
    ["https://domain.com/blog/google-analytics-4/", 274, 5, 0.0182, 6],
    ["https://domain.com/dich-vu/", 188, 3, 0.0160, 7],
    ["https://domain.com/blog/thiet-ke-ux-ui/", 143, 1, 0.0070, 8]
  ];
  const paddedConvData = [...convPageData];
  while (paddedConvData.length < 10) {
    paddedConvData.push(["", "", "", "", ""]);
  }
  sheet.getRange("N47:R56").setValues(paddedConvData);
  sheet.getRange("O47:O56").setNumberFormat("#,##0");
  sheet.getRange("P47:P56").setNumberFormat("#,##0");
  sheet.getRange("Q47:Q56").setNumberFormat("0.00%");
  sheet.getRange("R47:R56").setNumberFormat("#,##0");

  // Áp dụng định dạng màu sắc thông minh cho bảng
  applyConditionalGscFormatting_(sheet);

  // Đồng bộ số liệu trend ra cột ẩn S, T, U để vẽ biểu đồ cục bộ
  syncTrendData_(ss, sheet);

  SpreadsheetApp.flush();
  protectManagedSheets_(ss);

  if (!suppressAlert) {
    showAlert_("✅ Đã nạp dữ liệu mẫu thành công!");
  }
}

// Tô màu định dạng % thay đổi (Tương thích tốt locale VN, màu sắc soft hài hòa)
// invertLogic = true: tăng (n dương) là XẤU (dùng cho Bounce Rate)
function formatDeltaCell_(sheet, rangeStr, pctText, invertLogic) {
  try {
    const cell = sheet.getRange(rangeStr);
    if (!pctText || pctText === "-") {
      cell.setValue("-").setBackground("#FFFFFF").setFontColor("#94A3B8"); // Slate-400
      return;
    }
    
    cell.setValue(pctText);
    const n = parseFloat(pctText.replace("%", ""));
    if (isNaN(n)) {
      cell.setBackground("#FFFFFF").setFontColor("#94A3B8");
      return;
    }

    // invertLogic = true: tăng là xấu (Bounce Rate). Truyền rõ ràng từ nơi gọi.
    let isBad = n < 0;
    if (invertLogic === true) {
      isBad = n > 0;
    }
    
    if (isBad) {
      const absVal = Math.abs(n);
      if (absVal >= CONFIG.DROP_THRESHOLD_PERCENT) {
        cell.setBackground("#FEF2F2").setFontColor("#B91C1C"); // Soft Red
      } else {
        cell.setBackground("#FEF9C3").setFontColor("#A16207"); // Soft Yellow
      }
    } else {
      cell.setBackground("#F0FDF4").setFontColor("#15803D"); // Soft Green
    }
  } catch (e) {
    Logger.log("Lỗi formatDeltaCell: " + e.message);
  }
}

// Tô màu có điều kiện cho bảng số liệu GSC
function applyConditionalGscFormatting_(sheet) {
  try {
    const rules = [];

    const ctrRanges = [
      sheet.getRange("F31:F43"), // Device CTR
      sheet.getRange("L31:L43"), // LP CTR
      sheet.getRange("R15:R24"), // Top Queries CTR
      sheet.getRange("R31:R43"), // Best Performers Growth
      sheet.getRange("F47:F57"), // Unbranded CTR
      sheet.getRange("L47:L57"), // Branded CTR
      sheet.getRange("Q47:Q56")  // LP Conv Rate (MỚI)
    ];

    // CTR cao >= 1.5% -> Xanh lá soft
    rules.push(SpreadsheetApp.newConditionalFormatRule()
      .whenNumberGreaterThan(0.015)
      .setBackground("#F0FDF4").setFontColor("#15803D")
      .setRanges(ctrRanges).build());

    // CTR trung bình 0.5% -> 1.5% -> Vàng soft
    rules.push(SpreadsheetApp.newConditionalFormatRule()
      .whenNumberBetween(0.005, 0.015)
      .setBackground("#FEF9C3").setFontColor("#A16207")
      .setRanges(ctrRanges).build());

    // CTR thấp < 0.5% -> Đỏ soft
    rules.push(SpreadsheetApp.newConditionalFormatRule()
      .whenNumberLessThan(0.005)
      .setBackground("#FEF2F2").setFontColor("#B91C1C")
      .setRanges(ctrRanges).build());

    // Lượt nhấp / Sessions > 0 -> Xanh dương nhạt
    const clicksRanges = [
      sheet.getRange("C31:C33"),
      sheet.getRange("I31:I35"),
      sheet.getRange("O15:O24"),
      sheet.getRange("C47:C56"),
      sheet.getRange("I47:I50"),
      sheet.getRange("O47:O56"), // Sessions GA4
      sheet.getRange("P47:P56")  // Conversions GA4
    ];
    rules.push(SpreadsheetApp.newConditionalFormatRule()
      .whenNumberGreaterThan(0)
      .setBackground("#EFF6FF").setFontColor("#1D4ED8")
      .setRanges(clicksRanges).build());

    // Vị trí trung bình tốt (<= 10) = Xanh, kém (>30) = Đỏ nhạt
    const posRanges = [
      sheet.getRange("E31:E33"),
      sheet.getRange("K31:K35"),
      sheet.getRange("Q15:Q24"),
      sheet.getRange("E47:E56"),
      sheet.getRange("K47:K50")
    ];
    rules.push(SpreadsheetApp.newConditionalFormatRule()
      .whenNumberLessThanOrEqualTo(10)
      .setBackground("#F0FDF4").setFontColor("#15803D")
      .setRanges(posRanges).build());
    rules.push(SpreadsheetApp.newConditionalFormatRule()
      .whenNumberGreaterThan(30)
      .setBackground("#FEF2F2").setFontColor("#B91C1C")
      .setRanges(posRanges).build());

    // Clicks Growth (Q5) tăng trưởng -> Xanh lá, sụt giảm -> Đỏ
    rules.push(SpreadsheetApp.newConditionalFormatRule()
      .whenNumberGreaterThan(0)
      .setFontColor("#15803D")
      .setRanges([sheet.getRange("Q5:R5")]).build());

    rules.push(SpreadsheetApp.newConditionalFormatRule()
      .whenNumberLessThan(0)
      .setFontColor("#B91C1C")
      .setRanges([sheet.getRange("Q5:R5")]).build());

    sheet.setConditionalFormatRules(rules);
  } catch (e) {
    Logger.log("Lỗi applyConditionalGscFormatting: " + e.message);
  }
}

// Vẽ biểu đồ trên Dashboard
function _buildGscCharts_(ss, sheet) {
  try {
    // Biểu đồ 1: Donut Chart - Clicks by Device (B14:F27)
    const donutChart = sheet.newChart()
      .setChartType(Charts.ChartType.PIE)
      .addRange(sheet.getRange("B30:C33")) // Bao gồm tiêu đề dòng 30
      .setNumHeaders(1)
      .setOption("title", "")
      .setOption("pieHole", 0.45)
      .setOption("backgroundColor", "#FFFFFF")
      .setOption("width", 440).setOption("height", 290)
      .setPosition(14, 2, 10, 10)
      .build();
    sheet.insertChart(donutChart);

    // Xác định số dòng dữ liệu trend thực tế ở cột ẩn S
    let numRows = 22; // Mặc định 21 ngày + 1 tiêu đề
    try {
      const lastTrendRow = Math.max(sheet.getRange("S14").getNextDataCell(SpreadsheetApp.Direction.DOWN).getRow(), 15);
      if (lastTrendRow > 14 && lastTrendRow < 1000) {
        numRows = lastTrendRow - 13;
      }
    } catch(err) {
      Logger.log("Lỗi tìm dòng trend: " + err.message);
    }

    // Biểu đồ 2: Trend Chart - line chart (H14:L27) đọc từ cột ẩn S, T, U để tránh lỗi chéo tab
    const trendChart = sheet.newChart()
      .setChartType(Charts.ChartType.LINE)
      .addRange(sheet.getRange(14, 19, numRows, 2)) // Cột S (Ngay), Cột T (Sessions)
      .addRange(sheet.getRange(14, 21, numRows, 1)) // Cột U (Conversions)
      .setNumHeaders(1)
      .setOption("useFirstColumnAsDomain", true)
      .setOption("title", "")
      .setOption("backgroundColor", "#FFFFFF")
      .setOption("width", 440).setOption("height", 290)
      .setPosition(14, 8, 10, 10)
      .build();
    sheet.insertChart(trendChart);
  } catch (e) {
    Logger.log("Lỗi vẽ biểu đồ Dashboard: " + e.message);
  }
}

// Đồng bộ dữ liệu trend GA4 ra các cột ẩn S, T, U trên Dashboard để vẽ biểu đồ ổn định
function syncTrendData_(ss, sheet) {
  try {
    const ga4RawSheet = ss.getSheetByName(SHEETS.GA4_RAW);
    if (!ga4RawSheet) return;

    const lastGa4Row = ga4RawSheet.getLastRow();
    if (lastGa4Row >= 2) {
      const dates = ga4RawSheet.getRange(2, 1, lastGa4Row - 1, 1).getValues();
      const sessions = ga4RawSheet.getRange(2, 2, lastGa4Row - 1, 1).getValues();
      const conversions = ga4RawSheet.getRange(2, 6, lastGa4Row - 1, 1).getValues();
      
      const trendData = [];
      for (let i = 0; i < dates.length; i++) {
        trendData.push([dates[i][0], sessions[i][0], conversions[i][0]]);
      }
      
      // Xóa dữ liệu cũ cột S, T, U
      sheet.getRange("S14:U100").clearContent();
      
      // Ghi dữ liệu mới
      sheet.getRange("S14:U14").setValues([["Ngay", "Sessions", "Conversions"]]);
      sheet.getRange(15, 19, trendData.length, 3).setValues(trendData);
      
      // Định dạng ngày cho cột S
      sheet.getRange(15, 19, trendData.length, 1).setNumberFormat("dd/MM/yyyy");
      
      // Ẩn cột S, T, U để giữ thẩm mỹ Dashboard
      sheet.hideColumns(19, 3);
    }
  } catch (e) {
    Logger.log("Lỗi đồng bộ dữ liệu biểu đồ: " + e.message);
  }
}


function rebuildDarkCharts() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEETS.DASHBOARD);
  if (!sheet) { showAlert_("Chua co Dashboard."); return; }
  
  SpreadsheetApp.flush();
  
  try {
    sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET).forEach(p => p.remove());
    sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE).forEach(p => p.remove());
  } catch (e) {
    Logger.log("Lỗi xóa protection: " + e.message);
  }
  
  sheet.getCharts().forEach(c => sheet.removeChart(c));
  
  _buildGscCharts_(ss, sheet);
  protectManagedSheets_(ss);
  showAlert_("✅ Đã vẽ lại các biểu đồ!");
}
// darkDashboardFull() và fullSetupAndStyle() đã được hợp nhất vào gscDashboardFull() để tránh trùng lặp

// Hàm khởi chạy tổng hợp toàn bộ hệ thống bằng 1-Click
function gscDashboardFull() {
  setupDashboard();
  readConfigFromSheet_();
  loadSampleData(true);
  
  buildGscDashboard(true);
  writeGscSampleData(true);
  
  // Vẽ biểu đồ sau khi dữ liệu mẫu được nạp đầy đủ
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEETS.DASHBOARD);
  if (sheet) {
    try {
      sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET).forEach(p => p.remove());
      sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE).forEach(p => p.remove());
    } catch (e) {
      Logger.log("Lỗi xóa protection: " + e.message);
    }
    sheet.getCharts().forEach(c => sheet.removeChart(c));
    _buildGscCharts_(ss, sheet);
    protectManagedSheets_(ss);
  }
  
  styleAllSheets(true);
  showAlert_("📊 HOÀN TẤT TRONG 1 CLICK!\n\nDashboard GSC & GA4 và toàn bộ các tab báo cáo đã sẵn sàng!");
}


// =====================================================================
// 8. ĐỊNH DẠNG TẤT CẢ CÁC TAB RAW
// =====================================================================
function styleAllSheets(suppressAlert) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  styleGscRaw_(ss);
  styleGa4Raw_(ss);
  styleContentConversion_(ss);
  styleAlertsLog_(ss);
  styleMonthlySummary_(ss);
  styleConfigSheet_(ss);
  setSheetTabColors_(ss);

  // Protect all managed sheets after styling is complete
  protectManagedSheets_(ss);

  if (!suppressAlert) {
    showAlert_(
      "✅ Đã định dạng làm đẹp tất cả các tab thành công!"
    );
  }
}

function styleMonthlySummary_(ss) {
  const sheet = ss.getSheetByName(SHEETS.MONTHLY);
  if (!sheet) return;

  try {
    sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET).forEach(p => p.remove());
    sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE).forEach(p => p.remove());
  } catch (e) {
    Logger.log("Lỗi xóa protection: " + e.message);
  }

  try {
    sheet.getRange(1, 1, 60, 20).setBackground("#F8FAFC");
    sheet.getRange(1, 2, 60, 7).setBackground("#FFFFFF");

    sheet.setColumnWidth(1, 15);
    sheet.setColumnWidth(2, 100);
    sheet.setColumnWidth(3, 120);
    sheet.setColumnWidth(4, 130);
    sheet.setColumnWidth(5, 110);
    sheet.setColumnWidth(6, 120);
    sheet.setColumnWidth(7, 120);
    sheet.setColumnWidth(8, 120);
    sheet.setColumnWidth(9, 15);
    sheet.setColumnWidth(10, 520);
  } catch (e) { Logger.log("Lỗi size/bg: " + e.message); }

  try {
    sheet.getRange("B1:H1").merge()
      .setBackground("#4338CA") // Indigo accent
      .setFontColor("#FFFFFF")
      .setFontSize(11)
      .setFontWeight("bold")
      .setHorizontalAlignment("center")
      .setVerticalAlignment("middle")
      .setValue("BÁO CÁO HIỆU SUẤT THEO THÁNG (MONTHLY SUMMARY REPORT)");
    sheet.setRowHeight(1, 35);
    sheet.setRowHeight(2, 10);
  } catch (e) { Logger.log("Lỗi banner: " + e.message); }

  try {
    sheet.getRange("B3:H3").setBackground("#EEF2F6")
      .setFontColor("#4338CA")
      .setFontSize(9)
      .setFontWeight("bold")
      .setVerticalAlignment("middle")
      .setBorder(true, true, true, true, false, false, "#CBD5E0", SpreadsheetApp.BorderStyle.SOLID);
    sheet.setRowHeight(3, 24);

    sheet.getRange("B3").setHorizontalAlignment("left");
    sheet.getRange("C3:H3").setHorizontalAlignment("right");
  } catch (e) { Logger.log("Lỗi table header: " + e.message); }

  formatTableContent_(sheet, 4, 9, 2, 8, { CARD_BG: "#FFFFFF", ALT_BG: "#F8FAFC" });
  
  try {
    sheet.getRange("C4:D9").setNumberFormat("#,##0");
    sheet.getRange("E4:E9").setNumberFormat("0.00%");
    sheet.getRange("F4:G9").setNumberFormat("#,##0");
    sheet.getRange("H4:H9").setNumberFormat("0.00%");

    sheet.getRange("B3:H9").setBorder(true, true, true, true, true, true, "#E2E8F0", SpreadsheetApp.BorderStyle.SOLID);
    sheet.setHiddenGridlines(true);
  } catch (e) { Logger.log("Lỗi format cells: " + e.message); }

  try {
    sheet.getCharts().forEach(c => sheet.removeChart(c));
    _buildMonthlySummaryCharts_(ss, sheet);
  } catch (e) { Logger.log("Lỗi biểu đồ Monthly: " + e.message); }

  protectManagedSheets_(ss);
}

function _buildMonthlySummaryCharts_(ss, sheet) {
  try {
    const chart = sheet.newChart()
      .setChartType(Charts.ChartType.COLUMN)
      .addRange(sheet.getRange("B3:C9"))
      .addRange(sheet.getRange("F3:F9"))
      .setNumHeaders(1)
      .setOption("useFirstColumnAsDomain", true)
      .setOption("title", "Xu huong Clicks & Traffic theo thang")
      .setOption("backgroundColor", "#FFFFFF")
      .setOption("chartArea", { left: 50, top: 40, width: "85%", height: "70%" })
      .setOption("legend", { position: "top", textStyle: { color: "#475569", fontSize: 9 } })
      .setOption("colors", ["#818CF8", "#4338CA"]) // Indigo colors
      .setOption("hAxis", { textStyle: { color: "#64748B", fontSize: 8 } })
      .setOption("vAxis", { textStyle: { color: "#64748B", fontSize: 8 }, minValue: 0 })
      .setOption("width", 500).setOption("height", 290)
      .setPosition(1, 10, 10, 10)
      .build();
    sheet.insertChart(chart);
  } catch (e) {
    Logger.log("Lỗi _buildMonthlySummaryCharts: " + e.message);
  }
}

function styleGscRaw_(ss) {
  const sheet = ss.getSheetByName(SHEETS.GSC_RAW);
  if (!sheet) return;

  try {
    sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET).forEach(p => p.remove());
    sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE).forEach(p => p.remove());
  } catch (e) {
    Logger.log("Lỗi xóa protection: " + e.message);
  }

  const lastRow = Math.max(sheet.getLastRow(), 1);
  const lastCol = 6;

  try {
    sheet.getRange(1, 1, lastRow, lastCol).setBackground("#FFFFFF").setFontColor("#1E293B");

    const header = sheet.getRange(1, 1, 1, lastCol);
    header.setBackground("#2563EB") // Blue
      .setFontColor("#FFFFFF")
      .setFontWeight("bold")
      .setFontSize(11)
      .setHorizontalAlignment("center")
      .setVerticalAlignment("middle");
    sheet.setRowHeight(1, 32);
  } catch (e) { Logger.log("Lỗi style header: " + e.message); }

  try {
    sheet.setColumnWidth(1, 100);
    sheet.setColumnWidth(2, 340);
    sheet.setColumnWidth(3, 90);
    sheet.setColumnWidth(4, 110);
    sheet.setColumnWidth(5, 90);
    sheet.setColumnWidth(6, 110);
  } catch (e) { Logger.log("Lỗi size cột: " + e.message); }

  if (lastRow > 1) {
    try {
      for (let r = 2; r <= lastRow; r++) {
        const bg = r % 2 === 0 ? "#EFF6FF" : "#FFFFFF"; // Xen kẽ xanh dương nhạt GSC
        sheet.getRange(r, 1, 1, lastCol).setBackground(bg).setFontColor("#334155").setFontSize(10);
        sheet.setRowHeight(r, 22);
      }
      sheet.getRange(2, 1, lastRow - 1, 1).setHorizontalAlignment("center");
      sheet.getRange(2, 2, lastRow - 1, 1).setHorizontalAlignment("left");
      sheet.getRange(2, 3, lastRow - 1, 4).setHorizontalAlignment("right");
    } catch (e) { Logger.log("Lỗi style row data: " + e.message); }

    try {
      sheet.getRange(2, 3, lastRow - 1, 1).setNumberFormat("#,##0"); // Clicks
      sheet.getRange(2, 4, lastRow - 1, 1).setNumberFormat("#,##0"); // Impressions
      sheet.getRange(2, 5, lastRow - 1, 1).setNumberFormat("0.00%"); // CTR
      sheet.getRange(2, 6, lastRow - 1, 1).setNumberFormat("0.00");  // Position
    } catch (e) { Logger.log("Lỗi định dạng số: " + e.message); }

    try {
      const ctrRules = [
        SpreadsheetApp.newConditionalFormatRule()
          .whenNumberGreaterThanOrEqualTo(0.08)
          .setBackground("#F0FDF4").setFontColor("#15803D").setBold(true)
          .setRanges([sheet.getRange(2, 5, lastRow - 1, 1)]).build(),
        SpreadsheetApp.newConditionalFormatRule()
          .whenNumberLessThan(0.02)
          .setBackground("#FEF2F2").setFontColor("#B91C1C")
          .setRanges([sheet.getRange(2, 5, lastRow - 1, 1)]).build(),
        SpreadsheetApp.newConditionalFormatRule()
          .whenNumberLessThanOrEqualTo(5)
          .setBackground("#EFF6FF").setFontColor("#1D4ED8").setBold(true)
          .setRanges([sheet.getRange(2, 6, lastRow - 1, 1)]).build(),
        SpreadsheetApp.newConditionalFormatRule()
          .whenNumberGreaterThan(20)
          .setBackground("#FEF9C3").setFontColor("#A16207")
          .setRanges([sheet.getRange(2, 6, lastRow - 1, 1)]).build(),
      ];
      sheet.setConditionalFormatRules(ctrRules);
    } catch (e) { Logger.log("Lỗi set conditional format: " + e.message); }
  }

  try {
    sheet.getRange(1, 1, lastRow, lastCol)
      .setBorder(true, true, true, true, true, false, "#BFDBFE", SpreadsheetApp.BorderStyle.SOLID);
    sheet.getRange(1, 1, 1, lastCol)
      .setBorder(null, null, true, null, null, null, "#2563EB", SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
    sheet.setFrozenRows(1);
  } catch (e) { Logger.log("Lỗi viền/frozen: " + e.message); }
}

function styleGa4Raw_(ss) {
  const sheet = ss.getSheetByName(SHEETS.GA4_RAW);
  if (!sheet) return;

  try {
    sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET).forEach(p => p.remove());
    sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE).forEach(p => p.remove());
  } catch (e) {
    Logger.log("Lỗi xóa protection: " + e.message);
  }

  const lastRow = Math.max(sheet.getLastRow(), 1);
  const lastCol = 6;

  try {
    sheet.getRange(1, 1, lastRow, lastCol).setBackground("#FFFFFF").setFontColor("#1E293B");

    sheet.getRange(1, 1, 1, lastCol)
      .setBackground("#059669") // Emerald GA4
      .setFontColor("#FFFFFF")
      .setFontWeight("bold")
      .setFontSize(11)
      .setHorizontalAlignment("center")
      .setVerticalAlignment("middle");
    sheet.setRowHeight(1, 32);
  } catch (e) { Logger.log("Lỗi style header: " + e.message); }

  try {
    sheet.setColumnWidth(1, 110);
    sheet.setColumnWidth(2, 150);
    sheet.setColumnWidth(3, 130);
    sheet.setColumnWidth(4, 150);
    sheet.setColumnWidth(5, 190);
    sheet.setColumnWidth(6, 120);
  } catch (e) { Logger.log("Lỗi size cột: " + e.message); }

  if (lastRow > 1) {
    try {
      for (let r = 2; r <= lastRow; r++) {
        const bg = r % 2 === 0 ? "#ECFDF5" : "#FFFFFF"; // Xen kẽ xanh ngọc GA4
        sheet.getRange(r, 1, 1, lastCol).setBackground(bg).setFontSize(10);
        sheet.setRowHeight(r, 22);
      }
      sheet.getRange(2, 1, lastRow - 1, 1).setHorizontalAlignment("center");
      sheet.getRange(2, 2, lastRow - 1, 5).setHorizontalAlignment("right");
    } catch (e) { Logger.log("Lỗi style row data: " + e.message); }

    try {
      sheet.getRange(2, 2, lastRow - 1, 1).setNumberFormat("#,##0"); // Sessions
      sheet.getRange(2, 3, lastRow - 1, 1).setNumberFormat("0.00%"); // Bounce Rate
      sheet.getRange(2, 4, lastRow - 1, 1).setNumberFormat("0.00%"); // Engagement Rate
      sheet.getRange(2, 5, lastRow - 1, 1).setNumberFormat("#,##0"); // Avg Time
      sheet.getRange(2, 6, lastRow - 1, 1).setNumberFormat("#,##0"); // Conversions
    } catch (e) { Logger.log("Lỗi định dạng số: " + e.message); }

    try {
      const sessionRange = sheet.getRange(2, 2, lastRow - 1, 1);
      const engRange = sheet.getRange(2, 4, lastRow - 1, 1);
      const bounceRange = sheet.getRange(2, 3, lastRow - 1, 1);
      const convRange = sheet.getRange(2, 6, lastRow - 1, 1);

      sheet.setConditionalFormatRules([
        SpreadsheetApp.newConditionalFormatRule()
          .whenNumberGreaterThan(900).setBackground("#F0FDF4").setFontColor("#15803D").setBold(true)
          .setRanges([sessionRange]).build(),
        SpreadsheetApp.newConditionalFormatRule()
          .whenNumberLessThan(500).setBackground("#FEF9C3").setFontColor("#A16207")
          .setRanges([sessionRange]).build(),
        SpreadsheetApp.newConditionalFormatRule()
          .whenNumberGreaterThanOrEqualTo(0.60)
          .setBackground("#F0FDF4").setFontColor("#15803D").setBold(true)
          .setRanges([engRange]).build(),
        SpreadsheetApp.newConditionalFormatRule()
          .whenNumberLessThan(0.40)
          .setBackground("#FEF2F2").setFontColor("#B91C1C")
          .setRanges([engRange]).build(),
        SpreadsheetApp.newConditionalFormatRule()
          .whenNumberGreaterThan(0.60)
          .setBackground("#FEF2F2").setFontColor("#B91C1C")
          .setRanges([bounceRange]).build(),
        SpreadsheetApp.newConditionalFormatRule()
          .whenNumberLessThan(0.30)
          .setBackground("#F0FDF4").setFontColor("#15803D")
          .setRanges([bounceRange]).build(),
        SpreadsheetApp.newConditionalFormatRule()
          .whenNumberGreaterThan(20).setBackground("#ECFDF5").setFontColor("#059669").setBold(true)
          .setRanges([convRange]).build(),
      ]);
    } catch (e) { Logger.log("Lỗi set conditional format: " + e.message); }
  }

  try {
    sheet.getRange(1, 1, lastRow, lastCol)
      .setBorder(true, true, true, true, true, false, "#A7F3D0", SpreadsheetApp.BorderStyle.SOLID);
    sheet.getRange(1, 1, 1, lastCol)
      .setBorder(null, null, true, null, null, null, "#059669", SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
    sheet.setFrozenRows(1);
  } catch (e) { Logger.log("Lỗi viền/frozen: " + e.message); }
}

function styleContentConversion_(ss) {
  const sheet = ss.getSheetByName(SHEETS.CONTENT);
  if (!sheet) return;

  try {
    sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET).forEach(p => p.remove());
    sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE).forEach(p => p.remove());
  } catch (e) {
    Logger.log("Lỗi xóa protection: " + e.message);
  }

  const lastRow = Math.max(sheet.getLastRow(), 1);
  const lastCol = 5;

  try {
    sheet.getRange(1, 1, lastRow, lastCol).setBackground("#FFFFFF").setFontColor("#1E293B");

    sheet.getRange(1, 1, 1, lastCol)
      .setBackground("#7C3AED") // Violet Content
      .setFontColor("#FFFFFF")
      .setFontWeight("bold")
      .setFontSize(11)
      .setHorizontalAlignment("center")
      .setVerticalAlignment("middle");
    sheet.setRowHeight(1, 32);
  } catch (e) { Logger.log("Lỗi style header: " + e.message); }

  try {
    sheet.setColumnWidth(1, 370);
    sheet.setColumnWidth(2, 130);
    sheet.setColumnWidth(3, 120);
    sheet.setColumnWidth(4, 150);
    sheet.setColumnWidth(5, 110);
  } catch (e) { Logger.log("Lỗi size cột: " + e.message); }

  if (lastRow > 1) {
    try {
      const medals = ["#F3E8FF", "#F1F5F9", "#FAE8FF"]; // Soft violet gold/silver/bronze
      const medalText = ["#6B21A8", "#475569", "#86198F"];
      for (let r = 2; r <= lastRow; r++) {
        const rank = r - 1;
        let bg = r % 2 === 0 ? "#F5F3FF" : "#FFFFFF"; // Xen kẽ tím nhạt
        let fc = "#334155";
        if (rank <= 3) { bg = medals[rank - 1]; fc = medalText[rank - 1]; }
        sheet.getRange(r, 1, 1, lastCol).setBackground(bg).setFontColor(fc).setFontSize(10);
        if (rank <= 3) sheet.getRange(r, 1, 1, lastCol).setFontWeight("bold");
        sheet.setRowHeight(r, 24);
      }
      sheet.getRange(2, 1, lastRow - 1, 1).setHorizontalAlignment("left");
      sheet.getRange(2, 2, lastRow - 1, 4).setHorizontalAlignment("right");
      sheet.getRange(2, 5, lastRow - 1, 1).setHorizontalAlignment("center");
    } catch (e) { Logger.log("Lỗi style row data: " + e.message); }

    try {
      sheet.getRange(2, 2, lastRow - 1, 1).setNumberFormat("#,##0"); // Sessions
      sheet.getRange(2, 3, lastRow - 1, 1).setNumberFormat("#,##0"); // Conversions
      sheet.getRange(2, 4, lastRow - 1, 1).setNumberFormat("0.00%"); // Conv Rate
      sheet.getRange(2, 5, lastRow - 1, 1).setNumberFormat("#,##0"); // Rank
    } catch (e) { Logger.log("Lỗi định dạng số: " + e.message); }

    try {
      const convRateRange = sheet.getRange(2, 4, lastRow - 1, 1);
      sheet.setConditionalFormatRules([
        SpreadsheetApp.newConditionalFormatRule()
          .whenNumberGreaterThanOrEqualTo(0.03)
          .setBackground("#F5F3FF").setFontColor("#7C3AED").setBold(true)
          .setRanges([convRateRange]).build(),
        SpreadsheetApp.newConditionalFormatRule()
          .whenNumberLessThan(0.01)
          .setBackground("#FEF2F2").setFontColor("#B91C1C")
          .setRanges([convRateRange]).build(),
      ]);
    } catch (e) { Logger.log("Lỗi set conditional format: " + e.message); }
  }

  try {
    sheet.getRange(1, 1, lastRow, lastCol)
      .setBorder(true, true, true, true, true, false, "#DDD6FE", SpreadsheetApp.BorderStyle.SOLID);
    sheet.getRange(1, 1, 1, lastCol)
      .setBorder(null, null, true, null, null, null, "#7C3AED", SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
    sheet.setFrozenRows(1);
  } catch (e) { Logger.log("Lỗi viền/frozen: " + e.message); }
}

function styleAlertsLog_(ss) {
  const sheet = ss.getSheetByName(SHEETS.ALERTS);
  if (!sheet) return;

  try {
    sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET).forEach(p => p.remove());
    sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE).forEach(p => p.remove());
  } catch (e) {
    Logger.log("Lỗi xóa protection: " + e.message);
  }

  const lastRow = Math.max(sheet.getLastRow(), 1);
  const lastCol = 5;

  try {
    sheet.getRange(1, 1, lastRow, lastCol).setBackground("#FFFFFF").setFontColor("#1E293B");

    sheet.getRange(1, 1, 1, lastCol)
      .setBackground("#DC2626") // Red Alerts
      .setFontColor("#FFFFFF")
      .setFontWeight("bold")
      .setFontSize(11)
      .setHorizontalAlignment("center")
      .setVerticalAlignment("middle");
    sheet.setRowHeight(1, 32);
  } catch (e) { Logger.log("Lỗi style header: " + e.message); }

  try {
    sheet.setColumnWidth(1, 170);
    sheet.setColumnWidth(2, 140);
    sheet.setColumnWidth(3, 100);
    sheet.setColumnWidth(4, 400);
    sheet.setColumnWidth(5, 100);
  } catch (e) { Logger.log("Lỗi size cột: " + e.message); }

  if (lastRow > 1) {
    try {
      for (let r = 2; r <= lastRow; r++) {
        sheet.setRowHeight(r, 24);
        sheet.getRange(r, 1, 1, lastCol).setFontSize(10).setWrap(false);
      }
      sheet.getRange(2, 1, lastRow - 1, 1).setHorizontalAlignment("center");
      sheet.getRange(2, 3, lastRow - 1, 1).setHorizontalAlignment("center").setFontWeight("bold");
      sheet.getRange(2, 5, lastRow - 1, 1).setHorizontalAlignment("center");
    } catch (e) { Logger.log("Lỗi style row data: " + e.message); }

    try {
      const fullRange = sheet.getRange(2, 1, lastRow - 1, lastCol);
      const urgentCell = sheet.getRange(2, 3, lastRow - 1, 1);
      const rules = [
        SpreadsheetApp.newConditionalFormatRule()
          .whenFormulaSatisfied('=REGEXMATCH($C2,"URGENT")')
          .setBackground("#FEF2F2").setFontColor("#B91C1C")
          .setRanges([fullRange]).build(),
        SpreadsheetApp.newConditionalFormatRule()
          .whenTextContains("URGENT")
          .setBackground("#FEE2E2").setFontColor("#B91C1C").setBold(true)
          .setRanges([urgentCell]).build(),
        SpreadsheetApp.newConditionalFormatRule()
          .whenFormulaSatisfied('=REGEXMATCH($C2,"WATCH")')
          .setBackground("#FEF9C3").setFontColor("#A16207")
          .setRanges([fullRange]).build(),
        SpreadsheetApp.newConditionalFormatRule()
          .whenTextContains("WATCH")
          .setBackground("#FEF08A").setFontColor("#A16207").setBold(true)
          .setRanges([urgentCell]).build(),
        SpreadsheetApp.newConditionalFormatRule()
          .whenTextContains("Da gui")
          .setBackground("#F0FDF4").setFontColor("#15803D")
          .setRanges([sheet.getRange(2, 5, lastRow - 1, 1)]).build(),
      ];
      sheet.setConditionalFormatRules(rules);
    } catch (e) { Logger.log("Lỗi set conditional format: " + e.message); }
  }

  try {
    sheet.getRange(1, 1, lastRow, lastCol)
      .setBorder(true, true, true, true, true, false, "#FCA5A5", SpreadsheetApp.BorderStyle.SOLID);
    sheet.getRange(1, 1, 1, lastCol)
      .setBorder(null, null, true, null, null, null, "#DC2626", SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
    sheet.setFrozenRows(1);
  } catch (e) { Logger.log("Lỗi viền/frozen: " + e.message); }
}

function setSheetTabColors_(ss) {
  const colors = {
    [SHEETS.DASHBOARD]: "#2563EB",
    [SHEETS.MONTHLY]:   "#4338CA",
    [SHEETS.GSC_RAW]:   "#2563EB",
    [SHEETS.GA4_RAW]:   "#059669",
    [SHEETS.CONTENT]:   "#7C3AED",
    [SHEETS.ALERTS]:    "#DC2626",
    [SHEETS.README]:    "#64748B",
  };
  Object.entries(colors).forEach(([name, color]) => {
    const sheet = ss.getSheetByName(name);
    if (sheet) sheet.setTabColor(color);
  });
}

// fullSetupAndStyle() đã được hợp nhất vào gscDashboardFull() — xem menu 'Thiết lập Dashboard'


// =====================================================================
// 9. TAB README - HƯỚNG DẪN CHI TIẾT
// =====================================================================
function buildReadmeSheet_(ss) {
  let sheet = ss.getSheetByName(SHEETS.README);
  if (!sheet) sheet = ss.insertSheet(SHEETS.README);
  sheet.clear();

  const content = [
    ["📋 HƯỚNG DẪN SỬ DỤNG DASHBOARD SEO & GOOGLE ANALYTICS 4"],
    [""],
    ["━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"],
    ["🚀 BƯỚC 1 — ĐIỀN CẤU HÌNH TẠI TAB CONFIG (Bắt buộc)"],
    ["━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"],
    [""],
    ["GA4 Property ID:", "Điền Property ID dạng số của Google Analytics 4 (tại cột C dòng 3)"],
    ["GSC Site URL:", "Điền URL đầy đủ hoặc sc-domain của GSC (tại cột C dòng 4)"],
    ["Lark Webhook URL:", "Điền link Lark Webhook gửi cảnh báo tự động (tại cột C dòng 5)"],
    ["Ngưỡng cảnh báo sụt giảm:", "Phần trăm traffic sụt giảm để báo động (ví dụ: 20% tại cột C dòng 6)"],
    ["Danh sách URL uptime:", "Các link web cần kiểm tra lỗi 404/500, cách nhau bằng dấu phẩy"],
    ["Khóa API Claude Desktop:", "Mật mã dùng để Claude đọc số liệu Sheets của bạn từ xa (tại cột C dòng 8)"],
    [""],
    ["━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"],
    ["🔐 BƯỚC 2 — CẬP NHẬT appsscript.json (Làm 1 lần)"],
    ["━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"],
    [""],
    ["Trong Apps Script: Settings > Show appsscript.json in editor"],
    ["Mở file appsscript.json, dán toàn bộ nội dung cấu hình ở cuối file này vào."],
    [""],
    ["━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"],
    ["🔌 BƯỚC 3 — KẾT NỐI VỚI CLAUDE DESKTOP"],
    ["━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"],
    [""],
    ["1. Vào Deploy > New Deployment > Chọn Web App."],
    ["2. Cấu hình: Execute as: Me | Who has access: Anyone."],
    ["3. Copy lấy URL Web App được cấp."],
    ["4. Gửi URL kèm khóa bảo mật (ở tab Config) cho Claude Desktop để đọc dữ liệu từ xa."],
    [""],
    ["━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"],
    ["▶️ THỨ TỰ CHẠY HÀM KHI CÀI ĐẶT"],
    ["━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"],
    [""],
    ["👉", "gscDashboardFull     → CHẠY 1-CLICK: Tự động khởi tạo cấu trúc, nạp số liệu mẫu và dựng giao diện đẹp mắt."],
    ["B1.", "createTriggers       → Đặt lịch tự động: Chạy dailyUpdate 7h sáng + kiểm tra uptime mỗi 6 giờ."],
    ["B2.", "dailyUpdate          → Chạy thử dữ liệu thật sau khi đã cấu hình tab Config thành công."],
    [""],
  ];

  sheet.getRange(1, 1, content.length, 2).setValues(
    content.map(row => {
      if (row.length === 1) return [row[0], ""];
      return row;
    })
  );

  sheet.getRange("A1").setFontSize(14).setFontWeight("bold").setFontColor("#2C5282").setBackground("#EBF4FF");
  sheet.setRowHeight(1, 36);

  const headerRows = [3, 14, 21, 29];
  headerRows.forEach(row => {
    if (row <= content.length) {
      sheet.getRange(row, 1, 1, 2).setFontWeight("bold").setBackground("#2D3748").setFontColor("#FFFFFF");
    }
  });

  sheet.setColumnWidth(1, 220);
  sheet.setColumnWidth(2, 520);
  sheet.setFrozenRows(1);
}

function rebuildReadme() {
  buildReadmeSheet_(SpreadsheetApp.getActiveSpreadsheet());
  showAlert_("Đã làm mới tab README.");
}


// =====================================================================
// 10. DAILY UPDATE - CẬP NHẬT DỮ LIỆU THỰC TẾ HÀNG NGÀY
// =====================================================================
function dailyUpdate() {
  try {
    readConfigFromSheet_();
    dailyUpdate_impl_();
  } catch (err) {
    handleScriptError_("dailyUpdate", err);
    throw err;
  }
}

function dailyUpdate_impl_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const today = new Date();
  const yesterday = shiftDate_(today, -1);

  // --- Dữ liệu theo ngày (21 ngày) cho KPI cards ---
  const gscDaily  = fetchGscDaily_(shiftDate_(today, -21), yesterday);
  const gscByPage = fetchGscByPage_(shiftDate_(yesterday, -6), yesterday, 100);
  writeGscRaw_(ss, gscByPage);

  const ga4Daily  = fetchGa4Daily_(shiftDate_(today, -21), yesterday);
  writeGa4Raw_(ss, ga4Daily);

  const ga4ByPage = fetchGa4ByPage_(shiftDate_(yesterday, -6), yesterday);
  writeContentConversion_(ss, ga4ByPage);

  // --- Dữ liệu bổ sung cho các bảng Dashboard ---
  // Query data (dùng chung cho Top Queries + Branded/Unbranded — tránh gọi API 2 lần cho cùng data)
  const allQueries = fetchGscByQuery_(shiftDate_(yesterday, -6), yesterday, 500);
  writeDashboardTopQueries_(ss, allQueries.slice(0, 10));

  // Device breakdown (B31:F33)
  const deviceData = fetchGscByDevice_(shiftDate_(yesterday, -6), yesterday);
  writeDashboardDeviceTable_(ss, deviceData);

  // Branded / Unbranded (B47:F56 và H47:L50)
  writeDashboardBrandedUnbranded_(ss, allQueries);

  // Best Performers MoM (N31:R35) — so sánh tháng hiện tại vs tháng trước
  // Dùng fetchGscByPageTotal_ (dimension "page" duy nhất) thay vì "date"+"page" để tránh
  // rowLimit bị cắt bớt khi 1 tháng có nhiều trang x nhiều ngày (vd 20 trang x 30 ngay = 600 dong).
  const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const prevMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const prevMonthEnd   = new Date(today.getFullYear(), today.getMonth(), 0);
  const thisMonthPages = fetchGscByPageTotal_(thisMonthStart, yesterday, 200);
  const prevMonthPages = fetchGscByPageTotal_(prevMonthStart, prevMonthEnd, 200);
  writeDashboardBestPerformers_(ss, thisMonthPages, prevMonthPages);

  updateDashboardSheet_(ss, gscDaily, ga4Daily);

  // Gửi cảnh báo Lark nếu traffic sụt giảm sâu
  const trafficAlert = evaluateTrafficDropLevel_(ga4Daily);
  if (trafficAlert.level !== "OK") {
    logAlert_(ss, "Traffic giam", trafficAlert.level, trafficAlert.message);
    sendLarkAlert_(trafficAlert.level, "📉 Cảnh báo sụt giảm Traffic", trafficAlert.message);
  }

  Logger.log("dailyUpdate hoàn tất lúc " + new Date());
}

function checkUptime() {
  try {
    readConfigFromSheet_();
    checkUptime_impl_();
  } catch (err) {
    handleScriptError_("checkUptime", err);
    throw err;
  }
}

function checkUptime_impl_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const broken = [];
  CONFIG.IMPORTANT_URLS.forEach(url => {
    try {
      const res = callApiWithRetry_(() => {
        return UrlFetchApp.fetch(url, { muteHttpExceptions: true, followRedirects: true, timeoutSeconds: 15 });
      }, 3);
      const code = res.getResponseCode();
      if (code >= 400) broken.push({ url, code });
    } catch (e) {
      broken.push({ url, code: "LOI_KET_NOI: " + e.message });
    }
  });

  if (broken.length > 0) {
    const detail = broken.map(b => `- ${b.url} → HTTP ${b.code}`).join("\n");
    logAlert_(ss, "Loi 404/500", "URGENT", detail);
    sendLarkAlert_("URGENT", "🚨 Phát hiện URL lỗi trên website", detail);
  }
}

function handleScriptError_(fnName, err) {
  const message = `Hàm "${fnName}" bị lỗi khi chạy tự động.\n` +
    `Chi tiết: ${err && err.message ? err.message : err}\n` +
    `Kiểm tra: Sai thông tin Config, token hết hạn, hoặc hết hạn mức API.`;
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    logAlert_(ss, "Loi script", "URGENT", message);
  } catch (e) { Logger.log("Khong ghi duoc log: " + e.message); }
  try {
    sendLarkAlert_("URGENT", "🛠️ Hệ thống SEO Dashboard gặp lỗi kỹ thuật", message);
  } catch (e) { Logger.log("Khong ghi duoc Lark: " + e.message); }
}


// =====================================================================
// 11. GOOGLE SEARCH CONSOLE API (Đã tích hợp Retry Logic)
// =====================================================================
function fetchGscDaily_(startDate, endDate) {
  const rows = callSearchConsole_({ startDate: formatDate_(startDate), endDate: formatDate_(endDate), dimensions: ["date"], rowLimit: 25000 });
  return rows.map(r => ({ date: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position }))
    .sort((a, b) => a.date < b.date ? -1 : 1);
}

function fetchGscByPage_(startDate, endDate, limit) {
  const rows = callSearchConsole_({ startDate: formatDate_(startDate), endDate: formatDate_(endDate), dimensions: ["date", "page"], rowLimit: limit || 100 });
  return rows.map(r => ({ date: r.keys[0], page: r.keys[1], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position }));
}

/**
 * Fetch GSC tổng hợp theo trang (page) DUY NHẤT (không kèm ngày).
 * Dùng cho so sánh MoM (Best Performers) để tránh rowLimit bị cắt bớt
 * khi dùng dimension ["date","page"] trên khoảng thời gian dài (vd 1 tháng).
 * Trả về [{page, clicks}]
 */
function fetchGscByPageTotal_(startDate, endDate, limit) {
  const rows = callSearchConsole_({
    startDate: formatDate_(startDate),
    endDate: formatDate_(endDate),
    dimensions: ["page"],
    rowLimit: limit || 200,
  });
  return rows.map(r => ({ page: r.keys[0], clicks: r.clicks }));
}

/**
 * Fetch GSC theo query (từ khóa), tổng hợp theo khoảng ngày.
 * Trả về [{query, clicks, impressions, ctr, position}]
 */
function fetchGscByQuery_(startDate, endDate, limit) {
  const rows = callSearchConsole_({
    startDate: formatDate_(startDate),
    endDate: formatDate_(endDate),
    dimensions: ["query"],
    rowLimit: limit || 100,
  });
  return rows
    .map(r => ({
      query:       r.keys[0],
      clicks:      r.clicks,
      impressions: r.impressions,
      ctr:         r.ctr,
      position:    r.position,
    }))
    .sort((a, b) => b.clicks - a.clicks);
}

/**
 * Fetch GSC theo thiết bị (device).
 * Trả về [{device, clicks, impressions, ctr, position}]
 */
function fetchGscByDevice_(startDate, endDate) {
  const rows = callSearchConsole_({
    startDate: formatDate_(startDate),
    endDate: formatDate_(endDate),
    dimensions: ["device"],
    rowLimit: 10,
  });
  return rows
    .map(r => ({
      device:      r.keys[0],
      clicks:      r.clicks,
      impressions: r.impressions,
      ctr:         r.ctr,
      position:    r.position,
    }))
    .sort((a, b) => b.clicks - a.clicks);
}

/**
 * Ghi bảng Top Queries lên Dashboard (N15:R24)
 */
function writeDashboardTopQueries_(ss, queries) {
  const sheet = ss.getSheetByName(SHEETS.DASHBOARD);
  if (!sheet) return;
  try {
    sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET).forEach(p => p.remove());
  } catch (e) {}
  const top10 = queries.slice(0, 10);
  const rows = top10.map(q => [
    q.query,
    Number(q.clicks)      || 0,
    Number(q.impressions) || 0,
    Number(q.position)    || 0,
    Number(q.ctr)         || 0,
  ]);
  while (rows.length < 10) rows.push(["", "", "", "", ""]);
  sheet.getRange("N15:R24").setValues(rows);
  sheet.getRange("O15:O24").setNumberFormat("#,##0");
  sheet.getRange("P15:P24").setNumberFormat("#,##0");
  sheet.getRange("Q15:Q24").setNumberFormat("0.00");
  sheet.getRange("R15:R24").setNumberFormat("0.00%");
}

/**
 * Ghi bảng Device breakdown lên Dashboard (B31:F33)
 */
function writeDashboardDeviceTable_(ss, devices) {
  const sheet = ss.getSheetByName(SHEETS.DASHBOARD);
  if (!sheet) return;
  try {
    sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET).forEach(p => p.remove());
  } catch (e) {}
  const order = ["DESKTOP", "MOBILE", "TABLET"];
  // Sắp xếp theo thứ tự Desktop → Mobile → Tablet
  const sorted = order.map(d => {
    const found = devices.find(r => r.device.toUpperCase() === d);
    return found
      ? [found.device, found.clicks, found.impressions, Number(found.position).toFixed(2), found.ctr]
      : [d.charAt(0) + d.slice(1).toLowerCase(), 0, 0, 0, 0];
  });
  sheet.getRange("B31:F33").setValues(sorted);
  sheet.getRange("C31:C33").setNumberFormat("#,##0");
  sheet.getRange("D31:D33").setNumberFormat("#,##0");
  sheet.getRange("E31:E33").setNumberFormat("0.00");
  sheet.getRange("F31:F33").setNumberFormat("0.00%");
}

/**
 * Tách branded / unbranded từ danh sách query, ghi lên Dashboard:
 *   Unbranded → B47:F56
 *   Branded   → H47:L50 (tối đa 4 dòng)
 * Brand keywords lấy từ CONFIG.BRAND_KEYWORDS (mảng lowercase).
 */
function writeDashboardBrandedUnbranded_(ss, queries) {
  const sheet = ss.getSheetByName(SHEETS.DASHBOARD);
  if (!sheet) return;
  try {
    sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET).forEach(p => p.remove());
  } catch (e) {}

  const brandKws = (CONFIG.BRAND_KEYWORDS || []).map(k => k.toLowerCase().trim()).filter(Boolean);

  const isBranded = q => {
    if (!brandKws.length) return false;
    const lower = q.toLowerCase();
    return brandKws.some(kw => lower.includes(kw));
  };

  const branded   = queries.filter(q => isBranded(q.query));
  const unbranded = queries.filter(q => !isBranded(q.query));

  // Unbranded (B47:F56) — tối đa 10 dòng
  const unbRows = unbranded.slice(0, 10).map(q => [
    q.query,
    Number(q.clicks)      || 0,
    Number(q.impressions) || 0,
    Number(q.position)    || 0,
    Number(q.ctr)         || 0,
  ]);
  while (unbRows.length < 10) unbRows.push(["", "", "", "", ""]);
  sheet.getRange("B47:F56").setValues(unbRows);
  sheet.getRange("C47:C56").setNumberFormat("#,##0");
  sheet.getRange("D47:D56").setNumberFormat("#,##0");
  sheet.getRange("E47:E56").setNumberFormat("0.00");
  sheet.getRange("F47:F56").setNumberFormat("0.00%");

  // Branded (H47:L50) — tối đa 4 dòng
  const bRows = branded.slice(0, 4).map(q => [
    q.query,
    Number(q.clicks)      || 0,
    Number(q.impressions) || 0,
    Number(q.position)    || 0,
    Number(q.ctr)         || 0,
  ]);
  while (bRows.length < 4) bRows.push(["", "", "", "", ""]);
  sheet.getRange("H47:L50").setValues(bRows);
  sheet.getRange("I47:I50").setNumberFormat("#,##0");
  sheet.getRange("J47:J50").setNumberFormat("#,##0");
  sheet.getRange("K47:K50").setNumberFormat("0.00");
  sheet.getRange("L47:L50").setNumberFormat("0.00%");

  // Cập nhật KPI Branded Clicks (I5) — tổng clicks branded
  const totalBrandedClicks = branded.reduce((sum, q) => sum + (Number(q.clicks) || 0), 0);
  sheet.getRange("I5").setValue(totalBrandedClicks);
}

/**
 * Tính growth MoM theo Landing Page, ghi lên Best Performers (N31:R35).
 * thisMonthRows / prevMonthRows: mảng từ fetchGscByPage_ (có page, clicks).
 */
function writeDashboardBestPerformers_(ss, thisMonthRows, prevMonthRows) {
  const sheet = ss.getSheetByName(SHEETS.DASHBOARD);
  if (!sheet) return;
  try {
    sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET).forEach(p => p.remove());
  } catch (e) {}

  // Tổng hợp clicks theo page cho mỗi tháng
  const aggregateByPage = rows => {
    const map = {};
    rows.forEach(r => {
      if (!r.page) return;
      map[r.page] = (map[r.page] || 0) + (Number(r.clicks) || 0);
    });
    return map;
  };

  const thisMap = aggregateByPage(thisMonthRows);
  const prevMap = aggregateByPage(prevMonthRows);

  // Tính growth cho tất cả page có dữ liệu tháng này
  const performers = Object.entries(thisMap)
    .map(([page, thisClicks]) => {
      const prevClicks = prevMap[page] || 0;
      const growth = thisClicks - prevClicks;
      const rate   = prevClicks > 0 ? growth / prevClicks : (thisClicks > 0 ? 1 : 0);
      return { page, prevClicks, thisClicks, growth, rate };
    })
    .sort((a, b) => b.rate - a.rate) // Sắp theo tỷ lệ tăng trưởng cao nhất
    .slice(0, 5);

  const outputRows = performers.map(p => [
    p.page,
    p.prevClicks,
    p.thisClicks,
    p.growth,
    p.rate,
  ]);
  while (outputRows.length < 5) outputRows.push(["", "", "", "", ""]);

  sheet.getRange("N31:R35").setValues(outputRows);
  sheet.getRange("O31:O35").setNumberFormat("#,##0");
  sheet.getRange("P31:P35").setNumberFormat("#,##0");
  sheet.getRange("Q31:Q35").setNumberFormat("+#,##0;-#,##0;0");
  sheet.getRange("R31:R35").setNumberFormat("0.00%");
}

function callSearchConsole_(body) {
  const url = "https://www.googleapis.com/webmasters/v3/sites/" + encodeURIComponent(CONFIG.GSC_SITE_URL) + "/searchAnalytics/query";
  
  const res = callApiWithRetry_(() => {
    return UrlFetchApp.fetch(url, {
      method: "post", contentType: "application/json",
      headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken() },
      payload: JSON.stringify(body), muteHttpExceptions: true,
    });
  }, 4);

  const json = JSON.parse(res.getContentText() || "{}");
  if (json.error) throw new Error("Loi GSC API: " + JSON.stringify(json.error));
  return json.rows || [];
}


// =====================================================================
// 12. GOOGLE ANALYTICS 4 API (Đã tích hợp Retry Logic)
// =====================================================================
function fetchGa4Daily_(startDate, endDate) {
  const report = runGa4Report_({
    dateRanges: [{ startDate: formatDate_(startDate), endDate: formatDate_(endDate) }],
    dimensions: [{ name: "date" }],
    metrics: [{ name: "sessions" }, { name: "bounceRate" }, { name: "engagementRate" }, { name: "averageSessionDuration" }, { name: "conversions" }],
    dimensionFilter: organicFilter_(),
  });
  return report.map(r => ({ date: r.date, sessions: r.sessions, bounceRate: r.bounceRate, engagementRate: r.engagementRate, avgEngagementTime: r.averageSessionDuration, conversions: r.conversions }))
    .sort((a, b) => a.date < b.date ? -1 : 1);
}

function fetchGa4ByPage_(startDate, endDate) {
  return runGa4Report_({
    dateRanges: [{ startDate: formatDate_(startDate), endDate: formatDate_(endDate) }],
    dimensions: [{ name: "landingPagePlusQueryString" }],
    metrics: [{ name: "sessions" }, { name: "conversions" }],
    dimensionFilter: organicFilter_(), limit: 200,
  }).map(r => ({ page: r.landingPagePlusQueryString, sessions: r.sessions, conversions: r.conversions }))
    .sort((a, b) => b.conversions - a.conversions);
}

function organicFilter_() {
  return { filter: { fieldName: "sessionDefaultChannelGroup", stringFilter: { value: "Organic Search", matchType: "EXACT" } } };
}

function runGa4Report_(reportBody) {
  const url = "https://analyticsdata.googleapis.com/v1beta/properties/" + CONFIG.GA4_PROPERTY_ID + ":runReport";
  
  const res = callApiWithRetry_(() => {
    return UrlFetchApp.fetch(url, {
      method: "post", contentType: "application/json",
      headers: { Authorization: "Bearer " + ScriptApp.getOAuthToken() },
      payload: JSON.stringify(reportBody), muteHttpExceptions: true,
    });
  }, 4);

  const json = JSON.parse(res.getContentText() || "{}");
  if (json.error) throw new Error("Loi GA4 API: " + JSON.stringify(json.error));
  if (!json.rows) return [];
  const dimHeaders = (json.dimensionHeaders || []).map(h => h.name);
  const metHeaders = (json.metricHeaders || []).map(h => h.name);
  return json.rows.map(row => {
    const obj = {};
    row.dimensionValues.forEach((v, i) => obj[dimHeaders[i]] = v.value);
    row.metricValues.forEach((v, i) => obj[metHeaders[i]] = parseFloat(v.value));
    return obj;
  });
}


// =====================================================================
// 13. GHI DỮ LIỆU ĐANG HOẠT ĐỘNG VÀO SHEET RAW
// =====================================================================
function writeGscRaw_(ss, rows) {
  const sheet = ss.getSheetByName(SHEETS.GSC_RAW);
  sheet.getRange(2, 1, Math.max(sheet.getMaxRows() - 1, 1), 6).clearContent();
  if (!rows.length) return;
  sheet.getRange(2, 1, rows.length, 6).setValues(
    rows.map(r => [
      r.date, 
      r.page, 
      Number(r.clicks) || 0, 
      Number(r.impressions) || 0, 
      Number(r.ctr) || 0, 
      Number(r.position) || 0
    ])
  );
}

function writeGa4Raw_(ss, rows) {
  const sheet = ss.getSheetByName(SHEETS.GA4_RAW);
  sheet.getRange(2, 1, Math.max(sheet.getMaxRows() - 1, 1), 6).clearContent();
  if (!rows.length) return;
  sheet.getRange(2, 1, rows.length, 6).setValues(
    rows.map(r => [
      r.date, 
      Number(r.sessions) || 0, 
      Number(r.bounceRate) || 0, 
      Number(r.engagementRate) || 0, 
      Number(r.avgEngagementTime) || 0, 
      Number(r.conversions) || 0
    ])
  );
}

function writeContentConversion_(ss, rows) {
  const sheet = ss.getSheetByName(SHEETS.CONTENT);
  sheet.getRange(2, 1, Math.max(sheet.getMaxRows() - 1, 1), 5).clearContent();
  if (!rows.length) return;
  sheet.getRange(2, 1, rows.length, 5).setValues(
    rows.map((r, i) => [
      r.page, 
      Number(r.sessions) || 0, 
      Number(r.conversions) || 0, 
      r.sessions > 0 ? r.conversions / r.sessions : 0, 
      i + 1
    ])
  );
}

// Cập nhật số liệu động lên Dashboard hàng ngày
function updateDashboardSheet_(ss, gscDaily, ga4Daily) {
  const sheet = ss.getSheetByName(SHEETS.DASHBOARD);
  if (!sheet) return;

  sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET).forEach(p => p.remove());

  // Banner thời gian cập nhật
  const timeStr = Utilities.formatDate(new Date(), CONFIG.TIMEZONE, "dd/MM/yyyy HH:mm");
  sheet.getRange(2, 2).setValue("BÁO CÁO HIỆU SUẤT SEO & GOOGLE ANALYTICS 4  |  CẬP NHẬT: " + timeStr);

  // --- 1. Tính toán số liệu GSC ---
  const totalClicks = gscDaily.reduce((sum, r) => sum + r.clicks, 0);
  const totalImpr = gscDaily.reduce((sum, r) => sum + r.impressions, 0);
  const avgCtr = totalImpr > 0 ? totalClicks / totalImpr : 0;
  const avgPos = gscDaily.length > 0 ? gscDaily.reduce((sum, r) => sum + r.position, 0) / gscDaily.length : 0;

  // Ghi số liệu lên thẻ KPI GSC (Hàng 4-6)
  sheet.getRange("B5").setValue(totalClicks);
  sheet.getRange("C5").setValue(totalImpr);
  sheet.getRange("E5").setValue(avgCtr);
  sheet.getRange("H5").setValue(avgPos);

  // Lưu ý: I5 (Nhấp thương hiệu) đã được ghi trực tiếp bởi writeDashboardBrandedUnbranded_()
  // với TỔNG SỐ ĐẦY ĐỦ (không giới hạn 4 dòng hiển thị trong bảng Branded H47:L50).
  // Không ghi đè lại bằng formula "=SUM(I47:I50)" ở đây vì sẽ làm mất số liệu
  // của các từ khóa thương hiệu vượt quá 4 dòng hiển thị.
  sheet.getRange("K5").setValue("=COUNTA(N15:N24)"); // Số lượng từ khóa (Bảng mới dòng 15-24)
  sheet.getRange("Q5").setValue("=O5-N5"); // Tăng trưởng nhấp

  // --- 2. Tính toán số liệu GA4 ---
  const sessions = lastAndSameWeekdayField_(ga4Daily, "sessions");
  const bounce   = lastAndSameWeekdayField_(ga4Daily, "bounceRate");
  const engage   = lastAndSameWeekdayField_(ga4Daily, "engagementRate");
  const engTime  = lastAndSameWeekdayField_(ga4Daily, "avgEngagementTime");
  const convRate = computeConversionRate_(ga4Daily);

  // Ghi số liệu lên thẻ KPI GA4 (Hàng 8-10, kèm Sparklines động)
  sheet.getRange("B9").setValue(sessions.current);
  sheet.getRange("C9").setValue('=SPARKLINE(GA4_Raw!B2:B' + (ga4Daily.length + 1) + ')');
  formatDeltaCell_(sheet, "D9", sessions.pctText, false);

  sheet.getRange("E9").setValue(bounce.current);
  sheet.getRange("E9").setNumberFormat("0.00%");
  formatDeltaCell_(sheet, "F9", bounce.pctText, true); // invertLogic: Bounce Rate tăng là xấu

  sheet.getRange("H9").setValue(engage.current);
  sheet.getRange("H9").setNumberFormat("0.00%");
  sheet.getRange("I9").setValue('=SPARKLINE(GA4_Raw!D2:D' + (ga4Daily.length + 1) + ')');
  formatDeltaCell_(sheet, "J9", engage.pctText, false);

  sheet.getRange("K9").setValue(engTime.current);
  formatDeltaCell_(sheet, "L9", engTime.pctText, false);

  sheet.getRange("N9").setValue(convRate.current);
  sheet.getRange("N9").setNumberFormat("0.00%");
  sheet.getRange("O9").setValue('=SPARKLINE(GA4_Raw!F2:F' + (ga4Daily.length + 1) + ')');
  formatDeltaCell_(sheet, "P9", convRate.pctText, false);

  // Trạng thái cảnh báo sụt giảm traffic
  const trafficAlert = evaluateTrafficDropLevel_(ga4Daily);
  let statusText = "🟢 Bình thường";
  let statusBg = "#F0FDF4";
  let statusFg = "#15803D";
  if (trafficAlert.level === "WATCH") {
    statusText = "🟡 Theo dõi";
    statusBg = "#FEF9C3";
    statusFg = "#A16207";
  } else if (trafficAlert.level === "URGENT") {
    statusText = "🔴 Khẩn cấp";
    statusBg = "#FEF2F2";
    statusFg = "#B91C1C";
  }
  sheet.getRange("Q9").setValue(statusText).setBackground(statusBg).setFontColor(statusFg);

  // Cảnh báo Uptime/Index lỗi nếu có từ Alerts_Log
  let errorText = "Index: 🟢 Tốt";
  let errorFg = "#15803D";
  const alertsSheet = ss.getSheetByName(SHEETS.ALERTS);
  if (alertsSheet) {
    const lastAlertRow = alertsSheet.getLastRow();
    if (lastAlertRow >= 2) {
      const todayStr = formatDate_(new Date());
      const alertRows = alertsSheet.getRange(2, 1, lastAlertRow - 1, 3).getValues();
      const todayErrors = alertRows.filter(r => r[0].indexOf(todayStr) === 0 && r[2] === "URGENT");
      if (todayErrors.length > 0) {
        errorText = `⚠️ Lỗi Uptime: ${todayErrors.length}`;
        errorFg = "#B91C1C";
      }
    }
  }
  sheet.getRange("R9").setValue(errorText).setFontColor(errorFg).setFontSize(8).setFontWeight("bold");

  // Cập nhật số liệu động cho bảng Landing Page
  const gscRawSheet = ss.getSheetByName(SHEETS.GSC_RAW);
  if (gscRawSheet) {
    const lastRow = gscRawSheet.getLastRow();
    if (lastRow >= 2) {
      const data = gscRawSheet.getRange(2, 1, lastRow - 1, 6).getValues();
      const pageMap = {};
      data.forEach(row => {
        const page = row[1];
        const clicks = Number(row[2]) || 0;
        const impr = Number(row[3]) || 0;
        const pos = Number(row[5]) || 0;
        
        if (!pageMap[page]) {
          pageMap[page] = { page, clicks: 0, impr: 0, posSum: 0, count: 0 };
        }
        pageMap[page].clicks += clicks;
        pageMap[page].impr += impr;
        pageMap[page].posSum += pos;
        pageMap[page].count += 1;
      });
      
      const sortedPages = Object.values(pageMap)
        .sort((a, b) => b.clicks - a.clicks)
        .slice(0, 5);
        
      const outputRows = sortedPages.map(p => [
        p.page,
        p.clicks,
        p.impr,
        p.count > 0 ? p.posSum / p.count : 0,
        p.impr > 0 ? p.clicks / p.impr : 0
      ]);
      
      while (outputRows.length < 5) {
        outputRows.push(["", "", "", "", ""]);
      }
      
      sheet.getRange("H31:L35").setValues(outputRows);
    }
  }

  // MỚI: Cập nhật động số liệu Conversion theo Landing Page lên Dashboard
  const contentConversionSheet = ss.getSheetByName(SHEETS.CONTENT);
  if (contentConversionSheet) {
    const lastRow = contentConversionSheet.getLastRow();
    if (lastRow >= 2) {
      const data = contentConversionSheet.getRange(2, 1, Math.min(lastRow - 1, 10), 5).getValues();
      while (data.length < 10) {
        data.push(["", "", "", "", ""]);
      }
      sheet.getRange("N47:R56").setValues(data);
      sheet.getRange("O47:O56").setNumberFormat("#,##0");
      sheet.getRange("P47:P56").setNumberFormat("#,##0");
      sheet.getRange("Q47:Q56").setNumberFormat("0.00%");
      sheet.getRange("R47:R56").setNumberFormat("#,##0");
    }
  }

  // Đồng bộ số liệu trend ra cột ẩn S, T, U để vẽ biểu đồ cục bộ
  syncTrendData_(ss, sheet);

  // Khởi tạo lại biểu đồ để làm mới dải dữ liệu
  sheet.getCharts().forEach(c => sheet.removeChart(c));
  _buildGscCharts_(ss, sheet);

  protectManagedSheets_(ss);
}

function computeConversionRate_(ga4Daily) {
  return lastAndSameWeekdayField_(ga4Daily.map(d => ({ date: d.date, rate: d.sessions > 0 ? d.conversions / d.sessions : 0 })), "rate");
}

function statusFromPct_(pctText) {
  if (!pctText || pctText === "-") return "🟢 OK";
  const n = parseFloat(pctText);
  if (isNaN(n)) return "🟢 OK";
  if (n <= -CONFIG.DROP_THRESHOLD_PERCENT) return "🔴 KHAN CAP";
  if (n < 0) return "🟡 THEO DOI";
  return "🟢 OK";
}


// =====================================================================
// 14. TÍNH TOÁN XU HƯỚNG SỤT GIẢM TRAFFIC
// =====================================================================
function lastAndSameWeekdayField_(arr, field) {
  if (!arr.length) return { current: 0, prev: 0, pctText: "-" };
  const current = arr[arr.length - 1][field] || 0;
  const prevIdx = arr.length - 8;
  const prev = prevIdx >= 0 ? (arr[prevIdx][field] || 0) : null;
  let pctText = "-";
  if (prev !== null && prev !== 0) {
    const diff = current - prev;
    const sign = diff > 0 ? "+" : "";
    pctText = sign + ((diff / prev) * 100).toFixed(1) + "%";
  }
  return { current, prev, pctText };
}

function pctText_(v) { return (v * 100).toFixed(1) + "%"; }
function round1_(v)  { return Math.round(v * 10) / 10; }

function evaluateTrafficDropLevel_(ga4Daily) {
  const n = ga4Daily.length;
  if (n < 15) return { level: "OK", message: "Chua du du lieu (can >=15 ngay)." };
  const dropAt = idxFromEnd => {
    const cur = ga4Daily[n - 1 - idxFromEnd];
    const prev = ga4Daily[n - 1 - idxFromEnd - 7];
    if (!cur || !prev || prev.sessions === 0) return null;
    return ((prev.sessions - cur.sessions) / prev.sessions) * 100;
  };
  const thresh = CONFIG.DROP_THRESHOLD_PERCENT;
  const isDrop = v => v !== null && v > thresh;
  const d0 = dropAt(0), d1 = dropAt(1), d2 = dropAt(2);
  if (isDrop(d0) && isDrop(d1) && isDrop(d2))
    return { level: "URGENT", message: `Traffic giam >${thresh}% so cung thu tuan truoc, keo dai 3 ngay (hom nay: -${d0.toFixed(1)}%).` };
  if (isDrop(d0) && isDrop(d1))
    return { level: "URGENT", message: `Traffic giam >${thresh}% so cung thu tuan truoc, keo dai 2 ngay (hom nay: -${d0.toFixed(1)}%).` };
  if (isDrop(d0))
    return { level: "WATCH", message: `Traffic hom nay giam ${d0.toFixed(1)}% so cung thu tuan truoc. Theo doi them.` };
  return { level: "OK", message: "Traffic on dinh." };
}


// =====================================================================
// 15. HỆ THỐNG GỬI CẢNH BÁO WEBHOOK LARK
// =====================================================================
function logAlert_(ss, type, level, detail) {
  const sheet = ss.getSheetByName(SHEETS.ALERTS);
  sheet.appendRow([new Date().toLocaleString("vi-VN"), type, level, detail, "Da gui"]);
}

function sendLarkAlert_(level, title, detail) {
  if (!CONFIG.LARK_WEBHOOK_URL || CONFIG.LARK_WEBHOOK_URL.indexOf("DIEN_") === 0) {
    Logger.log("Chua cau hinh LARK_WEBHOOK_URL - bo qua.");
    return;
  }
  const icon = level === "URGENT" ? "🔴 KHAN CAP" : "🟡 THEO DOI";
  const text = `${icon}\n${title}\n\n${detail}\n\nThoi gian: ${new Date().toLocaleString("vi-VN")}`;
  try {
    UrlFetchApp.fetch(CONFIG.LARK_WEBHOOK_URL, {
      method: "post", contentType: "application/json",
      payload: JSON.stringify({ msg_type: "text", content: { text } }),
      muteHttpExceptions: true,
    });
  } catch (e) {
    Logger.log("Loi gui Lark: " + e.message);
  }
}


// =====================================================================
// 16. TIỆN ÍCH NGÀY THÁNG VÀ RETRY LOGIC API
// =====================================================================
function formatDate_(d) { return Utilities.formatDate(d, CONFIG.TIMEZONE, "yyyy-MM-dd"); }
function shiftDate_(d, days) { const nd = new Date(d); nd.setDate(nd.getDate() + days); return nd; }

function removeDefaultSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const managed = Object.values(SHEETS);
  let removed = 0;
  ss.getSheets().forEach(sheet => {
    const name = sheet.getName();
    if (!managed.includes(name) && /^(Sheet1|Trang tính1|Trang tinh1)$/i.test(name) && ss.getSheets().length > 1) {
      if (sheet.getLastRow() === 0 && sheet.getLastColumn() === 0) {
        ss.deleteSheet(sheet);
        removed++;
      }
    }
  });
  showAlert_(removed > 0 ? `Da xoa ${removed} tab thua.` : "Khong tim thay tab thua.");
}

function readConfigFromSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEETS.CONFIG);
  if (!sheet) return;

  // Đọc C3:C9 — C9 là Brand Keywords (dòng mới)
  const data = sheet.getRange("C3:C9").getValues();
  
  if (data[0][0]) CONFIG.GA4_PROPERTY_ID = String(data[0][0]).trim();
  if (data[1][0]) CONFIG.GSC_SITE_URL = String(data[1][0]).trim();
  if (data[2][0]) CONFIG.LARK_WEBHOOK_URL = String(data[2][0]).trim();
  
  if (data[3][0]) {
    const threshold = parseFloat(data[3][0]);
    if (!isNaN(threshold)) {
      CONFIG.DROP_THRESHOLD_PERCENT = threshold <= 1 ? threshold * 100 : threshold;
    }
  }
  
  if (data[4][0]) {
    CONFIG.IMPORTANT_URLS = String(data[4][0]).split(",")
      .map(url => url.trim())
      .filter(url => url.length > 0);
  }

  if (data[5][0]) CONFIG.API_KEY = String(data[5][0]).trim();

  // C9: Từ khóa thương hiệu (cách nhau bởi dấu phẩy)
  if (data[6][0]) {
    CONFIG.BRAND_KEYWORDS = String(data[6][0]).split(",")
      .map(kw => kw.trim().toLowerCase())
      .filter(kw => kw.length > 0);
  }
}

function styleConfigSheet_(ss) {
  const sheet = ss.getSheetByName(SHEETS.CONFIG);
  if (!sheet) return;

  try {
    sheet.getProtections(SpreadsheetApp.ProtectionType.SHEET).forEach(p => p.remove());
    sheet.getProtections(SpreadsheetApp.ProtectionType.RANGE).forEach(p => p.remove());
  } catch (e) {
    Logger.log("Lỗi xóa protection: " + e.message);
  }

  // Khôi phục nhãn cột B tránh lệch hàng (bao gồm dòng C9: Brand Keywords)
  try {
    const labels = [
      ["GA4 Property ID (Chỉ điền số)"],
      ["GSC Site URL (Ví dụ sc-domain:... hoặc URL)"],
      ["Lark Webhook URL"],
      ["Ngưỡng cảnh báo sụt giảm traffic (Ví dụ: 20%)"],
      ["Danh sách URL kiểm tra uptime (cách nhau bởi dấu phẩy)"],
      ["Mật mã kết nối API bảo mật (Cho Claude Desktop)"],
      ["Từ khóa thương hiệu (cách nhau bởi dấu phẩy, VD: tenthuonghieu,brand)"],
    ];
    sheet.getRange("B3:B9").setValues(labels);
  } catch (e) {
    Logger.log("Lỗi ghi nhãn config: " + e.message);
  }

  try {
    sheet.getRange(1, 1, 30, 10).setBackground("#F4F7FC");
    sheet.getRange(1, 2, 30, 2).setBackground("#FFFFFF");

    sheet.setColumnWidth(1, 15);
    sheet.setColumnWidth(2, 350);
    sheet.setColumnWidth(3, 450);
    sheet.setColumnWidth(4, 15);
  } catch (e) { Logger.log("Lỗi style layout: " + e.message); }

  try {
    sheet.getRange("B1:C1").merge()
      .setBackground("#1E3A8A")
      .setFontColor("#FFFFFF")
      .setFontSize(11)
      .setFontWeight("bold")
      .setHorizontalAlignment("center")
      .setVerticalAlignment("middle")
      .setValue("CẤU HÌNH HỆ THỐNG (SYSTEM CONFIGURATION)");
    sheet.setRowHeight(1, 35);
  } catch (e) { Logger.log("Lỗi style title: " + e.message); }

  try {
    const labelRange = sheet.getRange("B3:B9");
    labelRange.setFontColor("#4A5568")
      .setFontSize(9)
      .setFontWeight("bold")
      .setVerticalAlignment("middle")
      .setBackground("#F8FAFC");
    
    const inputRange = sheet.getRange("C3:C9");
    inputRange.setFontColor("#1A365D")
      .setFontSize(9)
      .setVerticalAlignment("middle")
      .setHorizontalAlignment("left");
    
    sheet.getRange("B3:C9").setBorder(true, true, true, true, true, true, "#CBD5E0", SpreadsheetApp.BorderStyle.SOLID);
    sheet.setHiddenGridlines(true);
  } catch (e) { Logger.log("Lỗi format cells: " + e.message); }

  const protection = sheet.protect().setDescription("Bao ve cau hinh nhan");
  const me = Session.getEffectiveUser();
  try { protection.removeEditors(protection.getEditors()); } catch (e) {}
  try { if (protection.canDomainEdit()) protection.setDomainEdit(false); } catch (e) {}
  try { protection.addEditor(me); } catch (e) {}
  
  // Cho phép chỉnh sửa C3:C9 (bao gồm cả dòng Brand Keywords mới)
  const editRange = sheet.getRange("C3:C9");
  protection.setUnprotectedRanges([editRange]);
}

function callApiWithRetry_(apiCallFn, maxRetries) {
  let retries = maxRetries || 3;
  let delay = 2000;
  
  for (let i = 0; i < retries; i++) {
    try {
      return apiCallFn();
    } catch (e) {
      if (i === retries - 1) {
        throw e;
      }
      Logger.log(`API call loi: ${e.message || e}. Thu lai sau ${delay / 1000} giay...`);
      Utilities.sleep(delay);
      delay *= 2;
    }
  }
}

// =====================================================================
// 17. ĐẦU CUỐI API CHO CLAUDE DESKTOP KẾT NỐI (MỚI)
// =====================================================================
function doGet(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const token = (e && e.parameter && e.parameter.token) ? String(e.parameter.token).trim() : "";
  
  // Đọc mã bảo mật API thực tế từ tab Config dòng 8
  const configSheet = ss.getSheetByName(SHEETS.CONFIG);
  let secureToken = "";
  if (configSheet) {
    secureToken = String(configSheet.getRange("C8").getValue()).trim();
  }
  // Nếu chưa cấu hình token trong tab Config, fallback sang CONFIG.API_KEY
  // Nhưng nếu CONFIG.API_KEY vẫn là giá trị mặc định placeholder → DENY
  if (!secureToken) {
    secureToken = (CONFIG.API_KEY && CONFIG.API_KEY.indexOf("DIEN_") !== 0 && CONFIG.API_KEY !== "khoa_bao_mat_mac_dinh")
      ? CONFIG.API_KEY
      : "";
  }

  // === BẢO MẬT: DENY mặc định ===
  // Từ chối nếu:
  //   (a) secureToken chưa được cấu hình (rỗng / placeholder)
  //   (b) token request không khớp chính xác
  if (!secureToken || token !== secureToken) {
    return ContentService.createTextOutput(JSON.stringify({ 
      error: "Xác thực thất bại. Hãy cung cấp token hợp lệ trong ?token=... và đảm bảo ô C8 trong tab Config đã được điền."
    })).setMimeType(ContentService.MimeType.JSON);
  }
  
  const action = e.parameter.action || "stats";
  let responseData = {};
  
  if (action === "stats") {
    // Đọc số liệu KPI tổng hợp trực tiếp trên Dashboard
    const sheet = ss.getSheetByName(SHEETS.DASHBOARD);
    if (sheet) {
      responseData = {
        updateTime: sheet.getRange(2, 2).getValue(),
        gsc: {
          clicks: sheet.getRange("B5").getValue(),
          impressions: sheet.getRange("C5").getValue(),
          ctr: sheet.getRange("E5").getValue(),
          position: sheet.getRange("H5").getValue(),
          brandedClicks: sheet.getRange("I5").getValue(),
          queriesCount: sheet.getRange("K5").getValue(),
          growth: sheet.getRange("Q5").getValue()
        },
        ga4: {
          sessions: sheet.getRange("B9").getValue(),
          bounceRate: sheet.getRange("E9").getValue(),
          engagementRate: sheet.getRange("H9").getValue(),
          avgEngagementTime: sheet.getRange("K9").getValue(),
          conversionRate: sheet.getRange("N9").getValue(),
          systemStatus: sheet.getRange("Q9").getValue(),
          uptimeStatus: sheet.getRange("R9").getValue()
        }
      };
    }
  } else if (action === "conversions") {
    // Đọc số liệu trang bài viết ra tiền
    const sheet = ss.getSheetByName(SHEETS.CONTENT);
    if (sheet) {
      const lastRow = sheet.getLastRow();
      if (lastRow >= 2) {
        const values = sheet.getRange(2, 1, lastRow - 1, 5).getValues();
        responseData = values.map(r => ({
          page: r[0],
          sessions: r[1],
          conversions: r[2],
          conversionRate: r[3],
          rank: r[4]
        }));
      }
    }
  } else if (action === "alerts") {
    // Đọc danh sách log cảnh báo mới nhất
    const sheet = ss.getSheetByName(SHEETS.ALERTS);
    if (sheet) {
      const lastRow = sheet.getLastRow();
      if (lastRow >= 2) {
        const values = sheet.getRange(2, 1, Math.min(lastRow - 1, 20), 5).getValues();
        responseData = values.map(r => ({
          time: r[0],
          type: r[1],
          level: r[2],
          detail: r[3],
          sentLark: r[4]
        }));
      }
    }
  } else {
    responseData = { error: "Yêu cầu hành động (action) không hợp lệ. Các hành động khả dụng: stats, conversions, alerts." };
  }
  
  return ContentService.createTextOutput(JSON.stringify(responseData))
    .setMimeType(ContentService.MimeType.JSON);
}
