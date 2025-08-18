// Products Feature Module
export { default as ProductCard } from './ProductCard';
export { default as ProductDetail } from './ProductDetail';
export { default as ProductsPage } from './ProductsPage';
export { default as ProductDetailPage } from './ProductDetailPage';

// Product Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  brand: string;
  rating: number;
  reviewCount: number;
  stock: number;
  isAvailable: boolean;
  tags: string[];
  specifications?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description?: string;
  image?: string;
  parentId?: string;
  children?: ProductCategory[];
}

export interface ProductFilter {
  category?: string;
  brand?: string;
  priceRange?: [number, number];
  rating?: number;
  availability?: boolean;
  search?: string;
}

export interface ProductSort {
  field: 'name' | 'price' | 'rating' | 'createdAt';
  direction: 'asc' | 'desc';
}
