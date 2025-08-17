import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Eye } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails }) => {
  const navigate = useNavigate();
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails(product);
    } else {
      navigate(`/product/${product.id}`);
    }
  };

  return (
    <div className="product-card">
      {/* Product Image */}
      <div className="product-image">
        <img
          src={product.image}
          alt={product.name}
          className="product-img"
        />
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="discount-badge">
            -{product.discount}%
          </div>
        )}
        
        {/* Stock Status */}
        {!product.inStock && (
          <div className="stock-badge">
            Hết hàng
          </div>
        )}
        
        {/* View Details Button */}
        <div className="view-details-overlay">
          <button
            onClick={handleViewDetails}
            className="view-details-button"
          >
            <Eye size={16} />
            <span>Xem chi tiết</span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="product-info">
        {/* Category */}
        <div className="product-category">
          {product.category}
        </div>
        
        {/* Product Name */}
        <h3 className="product-name">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.floor(product.rating) ? 'star-filled' : 'star-empty'}
              />
            ))}
          </div>
          <span className="review-count">
            ({product.reviewCount})
          </span>
        </div>
        
        {/* Price */}
        <div className="product-price">
          <span className="current-price">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="original-price">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        
        {/* Description */}
        <p className="product-description">
          {product.description}
        </p>
        
        {/* Action Button */}
        <button
          onClick={handleViewDetails}
          className={`product-button ${!product.inStock ? 'disabled' : ''}`}
          disabled={!product.inStock}
        >
          {product.inStock ? 'Xem chi tiết' : 'Hết hàng'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
