import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mockProducts } from '../../data/mockData';
import { ProductCard } from '../products';
import { useCart } from '../../contexts/CartContext';
import { Product } from '../../types';

interface ProductsPageProps {
  category?: string;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ category }) => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    
    let products = mockProducts;
    
    // Filter by category if provided
    if (category) {
      products = products.filter(p => p.category === category);
    }
    
    // Filter by search query if provided
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredProducts(products);
    setLoading(false);
  }, [category, searchParams]);

  const handleViewProduct = (product: Product): void => {
    console.log('Viewing product:', product);
    // Here you can implement navigation to product detail page
  };

  const handleAddToCart = (product: Product): void => {
    addToCart(product, 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  const getPageTitle = (): string => {
    if (category === 'laptop') return 'Laptop';
    if (category === 'accessory') return 'Phụ kiện';
    if (category === 'monitor') return 'Màn hình';
    if (category === 'audio') return 'Audio';
    return 'Tất cả sản phẩm';
  };

  const getPageDescription = (): string => {
    if (category === 'laptop') return 'Khám phá bộ sưu tập laptop chất lượng cao';
    if (category === 'accessory') return 'Phụ kiện công nghệ đa dạng, chất lượng';
    if (category === 'monitor') return 'Màn hình gaming và công việc chuyên nghiệp';
    if (category === 'audio') return 'Tai nghe và loa chất lượng cao';
    return 'Tìm kiếm sản phẩm phù hợp với nhu cầu của bạn';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {getPageTitle()}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {getPageDescription()}
          </p>
          {searchParams.get('search') && (
            <p className="text-lg text-blue-600 mt-4">
              Kết quả tìm kiếm cho: "{searchParams.get('search')}"
            </p>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard
                  product={product}
                  onViewDetails={handleViewProduct}
                />
                <button
                  onClick={() => handleAddToCart(product)}
                  className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors opacity-0 group-hover:opacity-100"
                >
                  Thêm vào giỏ
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">Không tìm thấy sản phẩm</h3>
            <p className="text-gray-500">
              {searchParams.get('search') 
                ? `Không có sản phẩm nào phù hợp với "${searchParams.get('search')}"`
                : 'Không có sản phẩm nào trong danh mục này'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
