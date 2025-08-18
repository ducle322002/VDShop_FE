import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, X, Laptop, Headphones, LucideIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { LoginModal } from '../../features/auth';
import { CartSidebar } from '../../features/cart';

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon | null;
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPage = location.pathname.split('/')[1] || 'home';
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const totalItems = getTotalItems();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const navItems: NavItem[] = [
    { id: 'home', label: 'Trang chủ', icon: null },
    { id: 'products', label: 'Sản phẩm', icon: null },
    { id: 'laptops', label: 'Laptop', icon: Laptop },
    { id: 'accessories', label: 'Phụ kiện', icon: Headphones },
  ];

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/home')}>
              <Laptop className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">TechStore</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(`/${item.id}`)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                    currentPage === item.id
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden lg:flex items-center space-x-2 flex-1 max-w-md mx-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  placeholder="Tìm kiếm sản phẩm..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* User */}
              {user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 text-gray-700 hover:text-blue-600 transition-colors">
                    <User className="h-6 w-6" />
                    <span className="hidden md:inline">{user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-2">
                      <button
                        onClick={() => navigate('/dashboard')}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        Dashboard
                      </button>
                      <button
                        onClick={() => navigate('/profile')}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        Hồ sơ
                      </button>
                      <button
                        onClick={() => navigate('/orders')}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                      >
                        Đơn hàng
                      </button>
                      <hr className="my-2" />
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => navigate('/register')}
                    className="flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <span className="hidden md:inline">Đăng ký</span>
                  </button>
                  <button
                    onClick={() => setIsLoginModalOpen(true)}
                    className="flex items-center space-x-2 p-2 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <User className="h-6 w-6" />
                    <span className="hidden md:inline">Đăng nhập</span>
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 text-gray-700 hover:text-blue-600"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="lg:hidden pb-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </form>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center space-x-2">
                  <Laptop className="h-6 w-6 text-blue-600" />
                  <span className="font-bold text-gray-900">TechStore</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="h-6 w-6 text-gray-400" />
                </button>
              </div>
              <nav className="p-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      navigate(`/${item.id}`);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 w-full text-left p-3 rounded-lg transition-colors ${
                      currentPage === item.id
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {item.icon && <item.icon className="h-5 w-5" />}
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Modals */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
