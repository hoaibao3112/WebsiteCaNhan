/**
 * =====================================================================
 *  AIZEN BLOG AUTOMATION - GOOGLE SHEET INITIALIZATION & FORMATTING
 *  (Bản nâng cấp thiết kế UI/UX Premium - Tích hợp Tự động hóa Cron & Hẹn giờ đăng)
 * =====================================================================
 * 
 * Hướng dẫn sử dụng:
 * 1. Tạo một trang tính Google Sheet mới tinh ở bất kỳ tài khoản Google nào.
 * 2. Trên thanh công cụ, chọn: Tiện ích mở rộng (Extensions) ➔ Apps Script.
 * 3. Xóa hết mã code hiện tại trong editor, copy và paste toàn bộ đoạn code dưới đây vào.
 * 4. Bấm nút Lưu (hình đĩa mềm) ➔ Bấm nút Chạy (Run / hình tam giác) để tạo cấu trúc.
 * 5. Xem hướng dẫn lên lịch chạy tự động ở cuối file này để kích hoạt chạy ngầm 24/7.
 */

// Tên các trang tính mặc định
const SHEET_NAMES = {
  AUTOMATION: "Blog_Automation",
  CONFIG: "Config"
};

/**
 * Hàm khởi tạo chính - Chạy hàm này để thiết lập toàn bộ hệ thống
 */
function initializeBlogAutomationSystem() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  // 1. Khởi tạo & Định dạng Tab Cấu hình (Config)
  setupConfigTab(ss);
  
  // 2. Khởi tạo & Định dạng Tab Database bài viết (Blog_Automation)
  setupBlogAutomationTab(ss);
  
  // 3. Hiển thị thông báo thành công
  SpreadsheetApp.getUi().alert(
    "🎉 KHỞI TẠO HỆ THỐNG THÀNH CÔNG!\n\n" +
    "📋 Các tab đã được tạo và định dạng:\n" +
    "1. Config: Nơi cấu hình thông số và xem Quy tắc đặt tên ảnh.\n" +
    "2. Blog_Automation: Bảng quản lý hàng đợi đăng bài & Hẹn giờ đăng.\n\n" +
    "Hãy mở sheet để xem giao diện mới của bạn. Chúc bạn tự động hóa vui vẻ! 🚀"
  );
}

/**
 * Thiết lập và định dạng tab Config
 */
function setupConfigTab(ss) {
  let sheet = ss.getSheetByName(SHEET_NAMES.CONFIG);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAMES.CONFIG);
  } else {
    sheet.clear(); // Xóa dữ liệu cũ để định dạng lại từ đầu nếu chạy lại
  }
  
  // Thiết lập tiêu đề, thông số cấu hình và quy tắc đặt tên ảnh trực tiếp trên Sheet
  const configData = [
    ["CẤU HÌNH HỆ THỐNG - BLOG AUTOMATION", "", ""],
    ["", "", ""],
    ["THÔNG SỐ CẤU HÌNH", "GIÁ TRỊ THIẾT LẬP", "MÔ TẢ / HƯỚNG DẪN"],
    ["Drive Folder ID (cho-xu-ly)", "1VSWZ7qKVkHcOVeC0jx1xKJRLX6HDzsm", "Mã ID thư mục Google Drive chứa ảnh đang chờ quét đăng bài"],
    ["Drive Folder ID (da-xong)", "1-RWoX0-tCUeEdx_Rl2VJbNj41ShzVdAs", "Mã ID thư mục mẹ BlogAuto hoặc thư mục lưu trữ ảnh đã xử lý xong"],
    ["Lark Webhook URL", "", "Đường link Webhook Lark để gửi thông báo cảnh báo lỗi"],
    ["Haravan Shop URL", "", "Ví dụ: aizenworld.myharavan.com (Không chứa https://)"],
    ["Haravan Access Token", "", "Mã Token kết nối API quản trị của Haravan"],
    ["", "", ""], // Dòng trống ngăn cách
    ["QUY TẮC ĐẶT TÊN FILE ẢNH (BẮT BUỘC ĐỂ KHỚP NỐI TỰ ĐỘNG)", "", ""],
    ["VỊ TRÍ HIỂN THỊ", "TÊN FILE QUY ƯỚC", "LƯU Ý QUAN TRỌNG"],
    ["Ảnh bìa chính (Thumbnail)", "{article_id}_anh1.png", "Bắt buộc phải có để hiển thị ảnh đại diện ngoài trang chủ. Chấp nhận đuôi .png, .jpg, .webp"],
    ["Ảnh phụ 1 (Thân bài)", "{article_id}_anh2.png", "Hệ thống tự động nhúng vào đoạn giữa nội dung bài viết"],
    ["Ảnh phụ 2 (Thân bài)", "{article_id}_anh3.png", "Hệ thống tự động nhúng vào đoạn gần cuối bài viết"],
    ["Ví dụ thực tế", "1003057949_anh1.png", "Mã số 1003057949 lấy ở cột A tab Blog_Automation. Không được đổi tên hay viết hoa tùy tiện"]
  ];
  
  sheet.getRange(1, 1, configData.length, 3).setValues(configData);
  
  // ---- Định dạng Giao diện Tab Config ----
  sheet.getRange("A1:C1").merge().setFontWeight("bold").setFontSize(14).setFontColor("#FFFFFF").setBackground("#0F172A").setHorizontalAlignment("center").setVerticalAlignment("middle");
  sheet.setRowHeight(1, 44);
  
  const tableHeader = sheet.getRange("A3:C3");
  tableHeader.setFontWeight("bold").setFontSize(11).setFontColor("#FFFFFF").setBackground("#334155").setHorizontalAlignment("center").setVerticalAlignment("middle");
  sheet.setRowHeight(3, 34);
  
  sheet.getRange("A4:A8").setFontWeight("bold").setFontColor("#1E293B").setBackground("#F8FAFC");
  sheet.getRange("B4:B8").setFontFamily("Courier New").setFontSize(11).setFontColor("#2563EB").setBackground("#F1F5F9");
  sheet.getRange("C4:C8").setFontColor("#64748B").setFontStyle("italic");
  sheet.getRange("A3:C8").setBorder(true, true, true, true, true, true, "#E2E8F0", SpreadsheetApp.BorderStyle.SOLID);
  
  sheet.getRange("A10:C10").merge().setFontWeight("bold").setFontSize(13).setFontColor("#FFFFFF").setBackground("#1E3A8A").setHorizontalAlignment("center").setVerticalAlignment("middle");
  sheet.setRowHeight(10, 38);
  
  const nameRuleHeader = sheet.getRange("A11:C11");
  nameRuleHeader.setFontWeight("bold").setFontSize(11).setFontColor("#FFFFFF").setBackground("#3B82F6").setHorizontalAlignment("center").setVerticalAlignment("middle");
  sheet.setRowHeight(11, 30);
  
  sheet.getRange("A12:A15").setFontWeight("bold").setFontColor("#1E293B").setBackground("#EFF6FF");
  sheet.getRange("B12:B15").setFontFamily("Courier New").setFontSize(11).setFontWeight("bold").setFontColor("#DC2626").setBackground("#FEF2F2");
  sheet.getRange("C12:C15").setFontColor("#475569");
  sheet.getRange("A11:C15").setBorder(true, true, true, true, true, true, "#BFDBFE", SpreadsheetApp.BorderStyle.SOLID);
  
  sheet.setColumnWidth(1, 260);
  sheet.setColumnWidth(2, 350);
  sheet.setColumnWidth(3, 480);
  
  sheet.getRange("A1:C15").setWrap(true);
}

/**
 * Thiết lập và định dạng tab Blog_Automation (Bổ sung cột N: Lên lịch xuất bản)
 */
function setupBlogAutomationTab(ss) {
  let sheet = ss.getSheetByName(SHEET_NAMES.AUTOMATION);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAMES.AUTOMATION);
  } else {
    sheet.clear();
  }
  
  // Thiết lập 14 cột tiêu đề (Thêm cột N: Scheduled Publish At)
  const headers = [
    [
      "Haravan Article ID", 
      "Title", 
      "Author", 
      "Status", 
      "Handle", 
      "Summary", 
      "Tags", 
      "Image Prompt 1", 
      "Image Prompt 2", 
      "Image Prompt 3", 
      "Image URLs", 
      "Created At", 
      "Published At",
      "Scheduled Publish At" // Cột N (14): Hẹn giờ xuất bản bài
    ]
  ];
  
  sheet.getRange("A1:N1").setValues(headers);
  
  // ---- Định dạng Giao diện Tab Blog_Automation ----
  const headerRange = sheet.getRange("A1:N1");
  headerRange.setFontWeight("bold").setBackground("#0F172A").setFontColor("#FFFFFF").setFontSize(11).setHorizontalAlignment("center").setVerticalAlignment("middle");
  sheet.setRowHeight(1, 46);
  
  const dataGrid = sheet.getRange("A2:N100");
  dataGrid.setFontSize(11).setVerticalAlignment("top").setBorder(true, true, true, true, true, true, "#E2E8F0", SpreadsheetApp.BorderStyle.SOLID);
  
  for (let i = 2; i <= 100; i++) {
    const rowRange = sheet.getRange("A" + i + ":N" + i);
    sheet.setRowHeight(i, 80);
    if (i % 2 === 0) {
      rowRange.setBackground("#FFFFFF");
    } else {
      rowRange.setBackground("#F8FAFC");
    }
  }
  
  sheet.getRange("A2:A100").setFontFamily("Courier New").setFontSize(10).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle");
  sheet.getRange("E2:E100").setFontFamily("Courier New").setFontSize(10);
  sheet.getRange("D2:D100").setHorizontalAlignment("center").setVerticalAlignment("middle");
  sheet.getRange("G2:G100").setHorizontalAlignment("center");
  sheet.getRange("L2:N100").setHorizontalAlignment("center").setVerticalAlignment("middle"); // Định dạng căn giữa cột ngày tháng & hẹn giờ
  
  // Nổi bật cột N (Scheduled Publish At) để Admin dễ thấy
  sheet.getRange("N2:N100").setFontColor("#9333EA").setFontWeight("bold"); // Màu tím phong cách
  
  const columnWidths = {
    1: 150,  // A: ID
    2: 250,  // B: Title
    3: 100,  // C: Author
    4: 130,  // D: Status
    5: 150,  // E: Handle
    6: 280,  // F: Summary
    7: 120,  // G: Tags
    8: 380,  // H: Image Prompt 1
    9: 380,  // I: Image Prompt 2
    10: 380, // J: Image Prompt 3
    11: 180, // K: Image URLs
    12: 130, // L: Created At
    13: 130, // M: Published At
    14: 160  // N: Scheduled Publish At (Cột hẹn giờ rộng 160px)
  };
  
  for (const [colIndex, width] of Object.entries(columnWidths)) {
    sheet.setColumnWidth(parseInt(colIndex), width);
  }
  
  sheet.getRange("B:B").setWrap(true);
  sheet.getRange("F:F").setWrap(true);
  sheet.getRange("H:J").setWrap(true);
  sheet.getRange("K:K").setWrap(true);
  
  sheet.setFrozenRows(1);
  setupConditionalFormatting(sheet);
}

function setupConditionalFormatting(sheet) {
  const statusRange = sheet.getRange("D2:D100");
  sheet.clearConditionalFormatRules();
  
  const rulePending = SpreadsheetApp.newConditionalFormatRule().whenTextContains("pending_image").setBackground("#FEF3C7").setFontColor("#B45309").setRanges([statusRange]).build();
  const ruleAttached = SpreadsheetApp.newConditionalFormatRule().whenTextContains("image_attached").setBackground("#DBEAFE").setFontColor("#1D4ED8").setRanges([statusRange]).build();
  const rulePublished = SpreadsheetApp.newConditionalFormatRule().whenTextContains("published").setBackground("#D1FAE5").setFontColor("#047857").setRanges([statusRange]).build();
  
  sheet.setConditionalFormatRules([rulePending, ruleAttached, rulePublished]);
}

/**
 * =====================================================================
 *  PHẦN CHẠY TỰ ĐỘNG - CRON JOB HOẠT ĐỘNG 24/7 (CÓ HẸN GIỜ ĐĂNG BÀI)
 * =====================================================================
 */
function runBlogAutomationCron() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const configSheet = ss.getSheetByName(SHEET_NAMES.CONFIG);
  const autoSheet = ss.getSheetByName(SHEET_NAMES.AUTOMATION);
  
  if (!configSheet || !autoSheet) return;
  
  // 1. Đọc các thông số cấu hình từ tab Config
  const configValues = configSheet.getRange("B4:B8").getValues();
  const folderPendingId = configValues[0][0].trim(); // Thư mục cho-xu-ly
  const folderDoneId = configValues[1][0].trim();    // Thư mục da-xong
  const larkWebhookUrl = configValues[2][0].trim();
  const haravanShopUrl = configValues[3][0].trim();
  const haravanToken = configValues[4][0].trim();
  
  if (!folderPendingId || !haravanShopUrl || !haravanToken) {
    logAlert_(larkWebhookUrl, "⚠️ Hệ thống blog thiếu thông số cấu hình quan trọng (Folder ID hoặc Haravan Token)!");
    return;
  }
  
  // 2. Lấy danh sách hàng đợi bài viết (14 cột dữ liệu bao gồm cả cột Hẹn giờ N)
  const dataRange = autoSheet.getRange(2, 1, autoSheet.getLastRow() - 1, 14);
  const data = dataRange.getValues();
  
  let folderPending;
  try {
    folderPending = DriveApp.getFolderById(folderPendingId);
  } catch(e) {
    logAlert_(larkWebhookUrl, "❌ Không tìm thấy thư mục Google Drive 'cho-xu-ly' theo ID đã nhập!");
    return;
  }
  
  const now = new Date();
  
  // Duyệt qua từng dòng trong bảng tính
  for (let i = 0; i < data.length; i++) {
    const rowNum = i + 2; // Hàng thực tế
    const articleId = data[i][0].toString().trim(); // Cột A: Haravan Article ID
    const title = data[i][1];
    const status = data[i][3]; // Cột D: Status
    const scheduledTimeVal = data[i][13]; // Cột N: Scheduled Publish At (index 13)
    
    // ---------------- KHÂU 1: GHÉP ẢNH TỰ ĐỘNG (PENDING_IMAGE) ----------------
    if (status === "pending_image" && articleId) {
      const files = folderPending.getFiles();
      let img1Id = "", img2Id = "", img3Id = "";
      let file1Obj = null, file2Obj = null, file3Obj = null;
      
      while (files.hasNext()) {
        const file = files.next();
        const fileName = file.getName().toLowerCase();
        
        if (fileName.indexOf(articleId) === 0) {
          if (fileName.includes("anh1")) {
            img1Id = file.getId();
            file1Obj = file;
          } else if (fileName.includes("anh2")) {
            img2Id = file.getId();
            file2Obj = file;
          } else if (fileName.includes("anh3")) {
            img3Id = file.getId();
            file3Obj = file;
          }
        }
      }
      
      if (img1Id) {
        const directLink1 = "https://drive.google.com/uc?id=" + img1Id + "&export=download";
        const directLink2 = img2Id ? "https://drive.google.com/uc?id=" + img2Id + "&export=download" : "";
        const directLink3 = img3Id ? "https://drive.google.com/uc?id=" + img3Id + "&export=download" : "";
        
        const allImageLinks = [directLink1, directLink2, directLink3].filter(Boolean).join(", ");
        
        // Cập nhật ảnh vào nháp (giữ bản nháp published: false)
        const success = updateHaravanArticle_(haravanShopUrl, haravanToken, articleId, directLink1, directLink2, directLink3);
        
        if (success) {
          autoSheet.getRange(rowNum, 4).setValue("image_attached"); // Cột D
          autoSheet.getRange(rowNum, 11).setValue(allImageLinks);    // Cột K
          
          moveFileToDoneFolder_(file1Obj, folderDoneId);
          if (file2Obj) moveFileToDoneFolder_(file2Obj, folderDoneId);
          if (file3Obj) moveFileToDoneFolder_(file3Obj, folderDoneId);
          
          logAlert_(larkWebhookUrl, "✅ **Tự động gắn ảnh thành công!**\nBài viết: *" + title + "* (ID: " + articleId + ") đã được gắn ảnh nháp thành công.");
        } else {
          logAlert_(larkWebhookUrl, "❌ Lỗi khi cập nhật hình ảnh lên API Haravan cho bài viết ID: " + articleId);
        }
      }
    }
    
    // ---------------- KHÂU 2: HẸN GIỜ ĐĂNG BÀI TỰ ĐỘNG (SCHEDULED PUBLISH AT) ----------------
    // Nếu trạng thái đang là image_attached (đã có ảnh) và có điền ngày giờ hẹn giờ cột N
    if (status === "image_attached" && articleId) {
      
      if (scheduledTimeVal && scheduledTimeVal !== "") {
        const scheduledTime = new Date(scheduledTimeVal);
        
        // Kiểm tra nếu thời gian hiện tại đã vượt qua hoặc bằng thời gian hẹn giờ
        if (now >= scheduledTime) {
          const publishedSuccess = publishHaravanArticleDirectly_(haravanShopUrl, haravanToken, articleId);
          
          if (publishedSuccess) {
            autoSheet.getRange(rowNum, 4).setValue("published"); // Cột D: Status
            autoSheet.getRange(rowNum, 13).setValue(now);        // Cột M: Published At
            logAlert_(larkWebhookUrl, "⏰🚀 **Tự động đăng bài theo lịch hẹn giờ!**\nBài viết: *" + title + "* (ID: " + articleId + ") đã tự động xuất bản thành công vào lúc " + Utilities.formatDate(now, "GMT+7", "HH:mm:ss dd/MM/yyyy"));
          } else {
            logAlert_(larkWebhookUrl, "❌ Lỗi kích hoạt xuất bản bài viết hẹn giờ cho bài ID: " + articleId);
          }
        }
      } else {
        // Nếu không hẹn giờ, hệ thống vẫn đồng bộ bình thường nếu Admin vào Haravan bấm bằng tay
        const isPublished = checkHaravanPublishedStatus_(haravanShopUrl, haravanToken, articleId);
        if (isPublished) {
          autoSheet.getRange(rowNum, 4).setValue("published"); // Cột D
          autoSheet.getRange(rowNum, 13).setValue(now);        // Cột M
          logAlert_(larkWebhookUrl, "🚀 **Bài viết đã lên sóng!**\nBài viết: *" + title + "* (ID: " + articleId + ") đã được Admin xuất bản chính thức trên website.");
        }
      }
    }
  }
}

/**
 * Hàm gọi API Haravan để xuất bản (Publish) bài viết trực tiếp
 */
function publishHaravanArticleDirectly_(shopUrl, token, articleId) {
  const url = "https://" + shopUrl + "/admin/articles/" + articleId + ".json";
  
  const payload = {
    "article": {
      "id": parseInt(articleId),
      "published": true // Kích hoạt công khai bài viết lên web
    }
  };
  
  const putOptions = {
    "method": "put",
    "headers": {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    },
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true
  };
  
  try {
    const response = UrlFetchApp.fetch(url, putOptions);
    return response.getResponseCode() === 200;
  } catch(e) {
    Logger.log("Error publishing article: " + e.toString());
    return false;
  }
}

/**
 * Hàm gọi API Haravan để cập nhật hình ảnh nháp
 */
function updateHaravanArticle_(shopUrl, token, articleId, img1, img2, img3) {
  const url = "https://" + shopUrl + "/admin/articles/" + articleId + ".json";
  
  const getOptions = {
    "method": "get",
    "headers": {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    },
    "muteHttpExceptions": true
  };
  
  try {
    const response = UrlFetchApp.fetch(url, getOptions);
    if (response.getResponseCode() !== 200) return false;
    
    const articleData = JSON.parse(response.getContentText()).article;
    let bodyHtml = articleData.body_html || "";
    
    let additionalImagesHtml = "";
    if (img2) {
      additionalImagesHtml += '<p style="text-align: center;"><img src="' + img2 + '" alt="Hình minh họa 1" style="max-width:100%; height:auto;" /></p>';
    }
    if (img3) {
      additionalImagesHtml += '<p style="text-align: center;"><img src="' + img3 + '" alt="Hình minh họa 2" style="max-width:100%; height:auto;" /></p>';
    }
    
    bodyHtml += additionalImagesHtml;
    
    const payload = {
      "article": {
        "id": parseInt(articleId),
        "image_src": img1, 
        "body_html": bodyHtml
      }
    };
    
    const putOptions = {
      "method": "put",
      "headers": {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      },
      "payload": JSON.stringify(payload),
      "muteHttpExceptions": true
    };
    
    const updateResponse = UrlFetchApp.fetch(url, putOptions);
    return updateResponse.getResponseCode() === 200;
    
  } catch(e) {
    Logger.log("Error updating Haravan: " + e.toString());
    return false;
  }
}

/**
 * Hàm kiểm tra bài viết đã xuất bản hay chưa trên Haravan
 */
function checkHaravanPublishedStatus_(shopUrl, token, articleId) {
  const url = "https://" + shopUrl + "/admin/articles/" + articleId + ".json";
  const options = {
    "method": "get",
    "headers": {
      "Authorization": "Bearer " + token,
      "Content-Type": "application/json"
    },
    "muteHttpExceptions": true
  };
  
  try {
    const response = UrlFetchApp.fetch(url, options);
    if (response.getResponseCode() === 200) {
      const article = JSON.parse(response.getContentText()).article;
      return article.published_at !== null && article.published_at !== "";
    }
  } catch(e) {
    Logger.log("Error checking Haravan status: " + e.toString());
  }
  return false;
}

/**
 * Di chuyển file ảnh đã đăng sang thư mục da-xong
 */
function moveFileToDoneFolder_(file, doneFolderId) {
  if (!file || !doneFolderId) return;
  try {
    const doneFolder = DriveApp.getFolderById(doneFolderId);
    file.moveTo(doneFolder);
  } catch(e) {
    Logger.log("Error moving file: " + e.toString());
  }
}

/**
 * Gửi tin nhắn thông báo về Lark
 */
function logAlert_(webhookUrl, message) {
  if (!webhookUrl) return;
  const payload = {
    "msg_type": "text",
    "content": {
      "text": message
    }
  };
  
  const options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload),
    "muteHttpExceptions": true
  };
  
  try {
    UrlFetchApp.fetch(webhookUrl, options);
  } catch(e) {
    Logger.log("Error sending Lark alert: " + e.toString());
  }
}

/**
 * =====================================================================
 *  ⏰ HƯỚNG DẪN HẸN GIỜ ĐĂNG BÀI TRỰC TIẾP TRÊN GOOGLE SHEET:
 * =====================================================================
 * 
 * Khi anh muốn lên lịch đăng tự động bài viết nào đó:
 * 
 * 1. Mở tab `Blog_Automation`.
 * 2. Tìm đến bài viết muốn hẹn giờ.
 * 3. Kéo chuột sang cột N (`Scheduled Publish At`).
 * 4. Điền ngày giờ theo đúng định dạng:
 *    ➔ Ví dụ: 2026-07-20 09:00:00 (Nghĩa là đăng vào lúc 9h sáng ngày 20/07/2026)
 * 5. Khi đến thời điểm 9:00 ngày 20/07, hàm chạy ngầm (được setup kích hoạt mỗi 10 phút)
 *    sẽ tự động kích hoạt API xuất bản bài viết lên Haravan và đổi trạng thái thành `published`!
 * 6. Để trống cột N nếu sếp muốn tự duyệt tay trên giao diện Haravan.
 */
