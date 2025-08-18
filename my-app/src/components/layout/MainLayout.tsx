import React, { useState } from 'react';
import { LayoutProps } from './index';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

const MainLayout: React.FC<LayoutProps> = ({
  children,
  showHeader = true,
  showFooter = true,
  showSidebar = false,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleSearch = (query: string) => {
    // Implement search functionality
    console.log('Search query:', query);
  };

  const sidebarItems = [
    {
      id: 'home',
      label: 'Trang chủ',
      href: '/',
    },
    {
      id: 'products',
      label: 'Sản phẩm',
      href: '/products',
    },
    {
      id: 'categories',
      label: 'Danh mục',
      href: '/categories',
    },
    {
      id: 'about',
      label: 'Về chúng tôi',
      href: '/about',
    },
    {
      id: 'contact',
      label: 'Liên hệ',
      href: '/contact',
    },
  ];

  const footerLinks = [
    { label: 'Trang chủ', href: '/' },
    { label: 'Sản phẩm', href: '/products' },
    { label: 'Về chúng tôi', href: '/about' },
    { label: 'Liên hệ', href: '/contact' },
    { label: 'Chính sách', href: '/policy' },
    { label: 'Điều khoản', href: '/terms' },
    { label: 'Hỗ trợ', href: '/support' },
    { label: 'FAQ', href: '/faq' },
  ];

  const socialLinks = [
    {
      platform: 'facebook',
      href: 'https://facebook.com',
      icon: <span className="text-xl">📘</span>,
    },
    {
      platform: 'instagram',
      href: 'https://instagram.com',
      icon: <span className="text-xl">📷</span>,
    },
    {
      platform: 'youtube',
      href: 'https://youtube.com',
      icon: <span className="text-xl">📺</span>,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {showHeader && (
        <Header />
      )}

      <div className="flex flex-1">
        {showSidebar && (
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            items={sidebarItems}
          />
        )}

        <main className="flex-1">
          {children}
        </main>
      </div>

      {showFooter && (
        <Footer
          links={footerLinks}
          socialLinks={socialLinks}
          copyright="© 2024 VDShop. Tất cả quyền được bảo lưu."
        />
      )}
    </div>
  );
};

export default MainLayout;
