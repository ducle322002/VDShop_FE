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

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
