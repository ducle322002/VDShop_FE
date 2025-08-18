import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Eye } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails, onAddToCart }) => {
  const navigate = useNavigate();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('View details clicked for product:', product.id);
    
    if (onViewDetails) {
      onViewDetails(product);
    } else {
      console.log('Navigating to:', `/product/${product.id}`);
      navigate(`/product/${product.id}`);
    }
  };

  return (
    <div className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group z-0">
      {/* Product Image */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold z-10">
            -{product.discount}%
          </div>
        )}
        
        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute top-3 right-3 bg-gray-500 text-white px-2 py-1 rounded text-xs font-semibold z-10">
            Hết hàng
          </div>
        )}
        
        {/* View Details Button */}
        <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <button
            onClick={handleViewDetails}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200 hover:scale-105"
          >
            <Eye size={16} />
            <span>Xem chi tiết</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <div className="text-gray-500 text-xs uppercase tracking-wider mb-2">
          {product.category}
        </div>
        
        {/* Product Name */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-gray-500 text-sm">
            ({product.reviewCount})
          </span>
        </div>
        
        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        
        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {product.description}
        </p>
        
        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleViewDetails}
            className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors duration-200 ${
              product.inStock 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-400 text-gray-600 cursor-not-allowed'
            }`}
            disabled={!product.inStock}
          >
            Xem chi tiết
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (onAddToCart) {
                onAddToCart(product);
              } else {
                console.log('Add to cart clicked for product:', product.id);
              }
            }}
            className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors duration-200 ${
              product.inStock 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-gray-400 text-gray-600 cursor-not-allowed'
            }`}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Thêm vào giỏ' : 'Hết hàng'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
