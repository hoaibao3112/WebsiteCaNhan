/**
 * MCP Tool Definition & Helper
 * Dùng file này làm mẫu hoặc tích hợp trực tiếp vào MCP Server riêng của bạn.
 */

export const PUBLISH_BLOG_POST_MCP_TOOL = {
  name: 'publish_blog_post',
  description: 'Tự động tạo và xuất bản bài viết blog chuẩn SEO lên trang web',
  inputSchema: {
    type: 'object',
    properties: {
      title: {
        type: 'string',
        description: 'Tiêu đề bài viết chuẩn SEO',
      },
      slug: {
        type: 'string',
        description: 'Đường dẫn slug thân thiện SEO (Ví dụ: huong-dan-thiet-ke-web-2026). Nếu bỏ trống hệ thống tự tạo từ tiêu đề.',
      },
      summary: {
        type: 'string',
        description: 'Tóm tắt ngắn gọn bài viết (1-2 câu)',
      },
      content: {
        type: 'string',
        description: 'Nội dung bài viết chi tiết dạng Markdown hoặc HTML đầy đủ tiêu đề H2, H3, danh sách và liên kết',
      },
      categoryName: {
        type: 'string',
        description: 'Tên danh mục bài viết (Ví dụ: Thiết Kế Web, SEO, Công Nghệ)',
      },
      metaTitle: {
        type: 'string',
        description: 'Tiêu đề thẻ Meta Title chuẩn SEO (dưới 60 ký tự)',
      },
      metaDescription: {
        type: 'string',
        description: 'Mô tả thẻ Meta Description thu hút click (dưới 160 ký tự)',
      },
      featuredImage: {
        type: 'string',
        description: 'URL ảnh đại diện bài viết (Unsplash hoặc hình ảnh có sẵn)',
      },
      tags: {
        type: 'array',
        items: { type: 'string' },
        description: 'Mảng chứa các từ khóa/thẻ tag của bài viết',
      },
      isPublished: {
        type: 'boolean',
        description: 'True để đăng ngay lên trang web, False để lưu bản nháp',
      },
    },
    required: ['title', 'content'],
  },
};

/**
 * Hàm gọi API gửi bài viết từ MCP Server về Web Backend
 */
export async function executePublishBlogPost(
  webServerUrl: string,
  secretKey: string,
  blogData: Record<string, any>
) {
  const endpoint = `${webServerUrl.replace(/\/$/, '')}/api/v1/blogs`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${secretKey}`,
    },
    body: JSON.stringify(blogData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || `HTTP error! Status: ${response.status}`);
  }

  return data;
}
