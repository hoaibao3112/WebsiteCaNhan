import { env } from '@/config/env.validation';
import type { CustomPage } from '@/types';

export const customPagesService = {
  async getPageBySlug(slug: string): Promise<CustomPage | null> {
    try {
      const url = `${env.NEXT_PUBLIC_API_URL}/api/custom-pages/${slug}`;
      const res = await fetch(url, {
        headers: {
          'x-api-key': env.API_KEY,
        },
        next: { revalidate: 60 },
      });

      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error(`Failed to fetch custom page ${slug}: ${res.statusText}`);
      }

      return await res.json() as CustomPage;
    } catch (error: unknown) {
      if ((error as { digest?: string })?.digest === 'DYNAMIC_SERVER_USAGE') {
        throw error;
      }
      console.error('Error fetching custom page:', error);
      return null;
    }
  },

  async createPage(data: {
    slug: string;
    title: string;
    templateId: string;
    pbConfig: Record<string, unknown>;
  }): Promise<CustomPage | null> {
    try {
      const url = `${env.NEXT_PUBLIC_API_URL}/api/custom-pages`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.API_KEY,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`Failed to create custom page: ${res.statusText}`);
      }

      return await res.json() as CustomPage;
    } catch (error) {
      console.error('Error creating custom page:', error);
      return null;
    }
  },

  async updatePage(
    slug: string,
    data: { title?: string; pbConfig?: Record<string, unknown> },
  ): Promise<CustomPage | null> {
    try {
      const url = `${env.NEXT_PUBLIC_API_URL}/api/custom-pages/${slug}`;
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.API_KEY,
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`Failed to update custom page: ${res.statusText}`);
      }

      return await res.json() as CustomPage;
    } catch (error) {
      console.error('Error updating custom page:', error);
      return null;
    }
  },
};
