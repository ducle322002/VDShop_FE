import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Laptop Dell XPS 13',
    price: 25000000,
    originalPrice: 28000000,
    description: 'Laptop cao cấp với màn hình InfinityEdge, hiệu năng mạnh mẽ',
    image: 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
    category: 'laptop',
    featured: true,
    rating: 4.8,
    reviewCount: 156,
    inStock: true,
    discount: 11
  },
  {
    id: '2',
    name: 'MacBook Pro M2',
    price: 35000000,
    description: 'Laptop Apple với chip M2, hiệu năng đỉnh cao',
    image: 'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'laptop',
    featured: true,
    rating: 4.9,
    reviewCount: 203,
    inStock: true
  },
  {
    id: '3',
    name: 'Chuột Gaming Logitech G502',
    price: 1200000,
    originalPrice: 1500000,
    description: 'Chuột gaming chuyên nghiệp với 11 nút có thể lập trình',
    image: 'https://images.pexels.com/photos/7915257/pexels-photo-7915257.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'accessory',
    featured: true,
    rating: 4.7,
    reviewCount: 89,
    inStock: true,
    discount: 20
  },
  {
    id: '4',
    name: 'Bàn phím cơ Corsair K70',
    price: 2800000,
    description: 'Bàn phím cơ cao cấp với switch Cherry MX Red',
    image: 'https://images.pexels.com/photos/7915258/pexels-photo-7915258.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'accessory',
    featured: false,
    rating: 4.6,
    reviewCount: 67,
    inStock: true
  },
  {
    id: '5',
    name: 'Laptop ASUS ROG Strix',
    price: 22000000,
    originalPrice: 25000000,
    description: 'Laptop gaming mạnh mẽ với GPU RTX 4060',
    image: 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
    category: 'laptop',
    featured: true,
    rating: 4.7,
    reviewCount: 134,
    inStock: true,
    discount: 12
  },
  {
    id: '6',
    name: 'Tai nghe Sony WH-1000XM4',
    price: 4500000,
    description: 'Tai nghe chống ồn chủ động cao cấp',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'accessory',
    featured: false,
    rating: 4.8,
    reviewCount: 98,
    inStock: true
  },
  {
    id: '7',
    name: 'Màn hình LG 27GL850',
    price: 8500000,
    description: 'Màn hình gaming 27 inch với độ phân giải 2K',
    image: 'https://images.pexels.com/photos/7915259/pexels-photo-7915259.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'monitor',
    featured: false,
    rating: 4.6,
    reviewCount: 76,
    inStock: true
  },
  {
    id: '8',
    name: 'Laptop Lenovo ThinkPad X1',
    price: 30000000,
    description: 'Laptop doanh nhân cao cấp với thiết kế bền bỉ',
    image: 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
    category: 'laptop',
    featured: false,
    rating: 4.7,
    reviewCount: 112,
    inStock: true
  }
];
