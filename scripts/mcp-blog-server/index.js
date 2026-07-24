import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// Cấu hình URL website và Secret API Key của bạn
const WEB_API_URL = process.env.WEB_API_URL || 'http://localhost:3000/api/v1/blogs';
const BLOG_API_SECRET_KEY = process.env.BLOG_API_SECRET_KEY || 'studiocanhan_blog_secret_8899';

// Khởi tạo MCP Server
const server = new Server(
  {
    name: 'kabo-blog-publisher',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// 1. Khai báo danh sách Tools cung cấp cho Claude Desktop
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'publish_blog_post',
        description:
          'Tự động tạo và xuất bản bài viết blog chuẩn SEO trực tiếp lên website KABO',
        inputSchema: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Tiêu đề bài viết chuẩn SEO',
            },
            slug: {
              type: 'string',
              description: 'Đường dẫn slug thân thiện SEO (VD: huong-dan-thiet-ke-web). Để trống hệ thống tự tạo.',
            },
            summary: {
              type: 'string',
              description: 'Tóm tắt ngắn gọn bài viết (1-2 câu)',
            },
            content: {
              type: 'string',
              description:
                'Nội dung bài viết dạng HTML/Markdown có thẻ H2, H3, danh sách và liên kết',
            },
            categoryName: {
              type: 'string',
              description: 'Tên danh mục bài viết (Ví dụ: Thiết Kế Web, SEO, Marketing)',
            },
            metaTitle: {
              type: 'string',
              description: 'Thẻ Meta Title chuẩn SEO (dưới 60 ký tự)',
            },
            metaDescription: {
              type: 'string',
              description: 'Thẻ Meta Description hấp dẫn (dưới 160 ký tự)',
            },
            featuredImage: {
              type: 'string',
              description: 'URL ảnh đại diện bài viết',
            },
            tags: {
              type: 'array',
              items: { type: 'string' },
              description: 'Các từ khóa/thẻ tag của bài viết',
            },
            isPublished: {
              type: 'boolean',
              description: 'True để đăng ngay lên web, False để lưu nháp (mặc định: true)',
            },
          },
          required: ['title', 'content'],
        },
      },
    ],
  };
});

// 2. Xử lý khi Claude Desktop gọi Tool `publish_blog_post`
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === 'publish_blog_post') {
    const blogData = request.params.arguments;

    try {
      // Gửi HTTP POST tới API Website của bạn
      const response = await fetch(WEB_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${BLOG_API_SECRET_KEY}`,
        },
        body: JSON.stringify({
          ...blogData,
          isPublished: blogData.isPublished ?? true,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        return {
          content: [
            {
              type: 'text',
              text: `❌ Đăng bài thất bại: ${result.error || 'Lỗi không xác định từ website server'}`,
            },
          ],
          isError: true,
        };
      }

      return {
        content: [
          {
            type: 'text',
            text: `🎉 ĐĂNG BÀI VIẾT THÀNH CÔNG!\n\n📌 Tiêu đề: ${result.data.title}\n🔗 Đường dẫn: ${result.data.postUrl}\n📅 Trạng thái: ${result.data.isPublished ? 'Đã đăng công khai' : 'Bản nháp'}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: `❌ Lỗi kết nối tới Website API (${WEB_API_URL}): ${error.message}`,
          },
        ],
        isError: true,
      };
    }
  }

  throw new Error(`Tool không tồn tại: ${request.params.name}`);
});

// 3. Khởi chạy Server qua Stdio Transport cho Claude Desktop
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('MCP Server [kabo-blog-publisher] đang chạy kết nối Claude Desktop...');
}

main().catch((error) => {
  console.error('Lỗi khởi chạy MCP Server:', error);
  process.exit(1);
});
