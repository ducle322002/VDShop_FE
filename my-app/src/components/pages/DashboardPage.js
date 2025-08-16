import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ArrowLeft, User, ShoppingBag, CreditCard, Settings, LogOut } from 'lucide-react';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/home');
  };

  const dashboardItems = [
    {
      icon: User,
      title: 'Hồ sơ cá nhân',
      description: 'Cập nhật thông tin cá nhân',
      onClick: () => navigate('/profile'),
      color: 'bg-blue-500'
    },
    {
      icon: ShoppingBag,
      title: 'Đơn hàng',
      description: 'Xem lịch sử đơn hàng',
      onClick: () => navigate('/orders'),
      color: 'bg-green-500'
    },
    {
      icon: CreditCard,
      title: 'Thanh toán',
      description: 'Quản lý phương thức thanh toán',
      onClick: () => navigate('/payment'),
      color: 'bg-purple-500'
    },
    {
      icon: Settings,
      title: 'Cài đặt',
      description: 'Tùy chỉnh tài khoản',
      onClick: () => navigate('/settings'),
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/home')}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Về trang chủ
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Chào mừng trở lại, {user?.name}!</p>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
              <p className="text-gray-600">{user?.email}</p>
              <p className="text-sm text-gray-500 capitalize">Vai trò: {user?.role}</p>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardItems.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 text-left hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`${item.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                <item.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tổng đơn hàng</h3>
            <p className="text-3xl font-bold text-blue-600">12</p>
            <p className="text-sm text-gray-500">Trong tháng này</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Tổng chi tiêu</h3>
            <p className="text-3xl font-bold text-green-600">2.5M</p>
            <p className="text-sm text-gray-500">VND</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Điểm tích lũy</h3>
            <p className="text-3xl font-bold text-purple-600">1,250</p>
            <p className="text-sm text-gray-500">Điểm</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Hoạt động gần đây</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Đặt hàng thành công</p>
                <p className="text-xs text-gray-500">Laptop Dell XPS 13 - 2 giờ trước</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Cập nhật hồ sơ</p>
                <p className="text-xs text-gray-500">Thay đổi số điện thoại - 1 ngày trước</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">Đăng nhập</p>
                <p className="text-xs text-gray-500">Từ thiết bị mới - 2 ngày trước</p>
              </div>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-6 py-3 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
