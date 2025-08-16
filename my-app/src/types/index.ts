export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  category: string;
  featured: boolean;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  discount?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  color: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}
