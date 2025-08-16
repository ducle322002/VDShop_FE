import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Headphones, Laptop2, Mouse, Monitor } from 'lucide-react';
import { mockProducts } from '../../data/mockData';
import { ProductCard } from '../products';
// Product interface is used implicitly in the component

const HomePage = () => {
  const navigate = useNavigate();
  const featuredProducts = mockProducts.filter(p => p.featured);
  const laptops = mockProducts.filter(p => p.category === 'laptop');
  const accessories = mockProducts.filter(p => p.category === 'accessory');

  const categories = [
    { id: 'laptops', name: 'Laptop', icon: Laptop2, count: laptops.length, color: '#3b82f6' },
    { id: 'accessories', name: 'Phụ kiện', icon: Mouse, count: accessories.length, color: '#10b981' },
    { id: 'monitors', name: 'Màn hình', icon: Monitor, count: 12, color: '#8b5cf6' },
    { id: 'audio', name: 'Audio', icon: Headphones, count: 8, color: '#f97316' },
  ];

  const features = [
    {
      icon: Truck,
      title: 'Giao hàng miễn phí',
      description: 'Miễn phí giao hàng cho đơn hàng trên 1.000.000đ'
    },
    {
      icon: Shield,
      title: 'Bảo hành chính hãng',
      description: 'Bảo hành chính hãng từ 12-36 tháng'
    },
    {
      icon: Headphones,
      title: 'Hỗ trợ 24/7',
      description: 'Đội ngũ tư vấn chuyên nghiệp 24/7'
    },
    {
      icon: Star,
      title: 'Chất lượng đảm bảo',
      description: 'Cam kết 100% hàng chính hãng'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div>
              <h1 className="hero-title">
                Laptop & Phụ Kiện
                <span style={{ display: 'block', color: '#bfdbfe' }}>Chất Lượng Cao</span>
              </h1>
              <p className="hero-subtitle">
                Khám phá bộ sưu tập laptop và phụ kiện công nghệ hàng đầu với giá cả cạnh tranh 
                và dịch vụ chuyên nghiệp.
              </p>
              <div className="hero-buttons">
                <button
                  onClick={() => navigate('/products')}
                  className="hero-button primary"
                >
                  <span>Khám phá ngay</span>
                  <ArrowRight style={{ marginLeft: '8px' }} size={20} />
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="hero-button secondary"
                >
                  Liên hệ tư vấn
                </button>
              </div>
            </div>
            <div className="hero-image">
              <img
                src="https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Hero"
              />
              <div className="rating-badge">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Star className="star" size={20} />
                  <span style={{ fontWeight: '600' }}>4.9/5</span>
                  <span style={{ marginLeft: '8px', color: '#6b7280' }}>từ 1000+ đánh giá</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Danh mục sản phẩm</h2>
            <p className="section-description">
              Tìm kiếm sản phẩm phù hợp với nhu cầu của bạn
            </p>
          </div>

          <div className="categories-grid">
            {categories.map((category) => (
                              <button
                  key={category.id}
                  onClick={() => navigate(`/${category.id}`)}
                  className="category-card"
                >
                <div 
                  className="category-icon"
                  style={{ backgroundColor: category.color }}
                >
                  <category.icon size={32} color="white" />
                </div>
                <h3 className="category-name">{category.name}</h3>
                <p className="category-count">{category.count} sản phẩm</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header-flex">
            <div>
              <h2 className="section-title">Sản phẩm nổi bật</h2>
              <p style={{ color: '#6b7280' }}>Những sản phẩm được yêu thích nhất</p>
            </div>
            <button
              onClick={() => navigate('/products')}
              className="view-all-button"
            >
              <span>Xem tất cả</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={(product) => console.log('Viewing product:', product)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Tại sao chọn chúng tôi?</h2>
            <p className="section-description">
              Cam kết mang đến trải nghiệm mua sắm tốt nhất cho khách hàng
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <div className="feature-icon">
                  <feature.icon size={32} color="#2563eb" />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <h2 className="newsletter-title">Đăng ký nhận tin khuyến mãi</h2>
          <p className="newsletter-description">
            Nhận thông báo về sản phẩm mới và ưu đãi đặc biệt
          </p>
          <div className="newsletter-form">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="newsletter-input"
            />
            <button className="newsletter-button">
              Đăng ký
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
