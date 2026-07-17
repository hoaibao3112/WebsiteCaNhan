export interface Project {
  id: string;
  slug: string;
  title: string;
  category: 'all' | 'landing' | 'ecommerce' | 'enterprise' | 'saas';
  categoryLabel: string;
  description: string;
  image: string;
  tags: string[];
  featured: boolean;
  size: 'large' | 'small';
}

export interface Template {
  id: string;
  slug: string;
  title: string;
  category: 'all' | 'saas' | 'ecommerce' | 'enterprise';
  categoryLabel: string;
  description: string;
  image: string;
  tags: string[];
  features: string[];
  demoImages: string[];
}
