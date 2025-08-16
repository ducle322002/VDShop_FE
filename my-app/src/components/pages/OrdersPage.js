import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Package, Truck, CheckCircle, Clock, Eye, Star } from 'lucide-react';

const OrdersPage = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock orders data
  const orders = [
    {
      id: 'ORD001',
      date: '2024-08-15',
      status: 'delivered',
      total: 25000000,
      items: [
        { id: 1, name: 'Laptop Dell XPS 13', price: 25000000, quantity: 1, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&h=100&fit=crop' }
      ]
    },
    {
      id: 'ORD002',
      date: '2024-08-10',
      status: 'shipped',
      total: 1500000,
      items: [
        { id: 2, name: 'Tai nghe Sony WH-1000XM4', price: 800000, quantity: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop' },
        { id: 3, name: 'Chuột gaming Logitech G502', price: 700000, quantity: 1, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop' }
      ]
    },
    {
      id: 'ORD003',
      date: '2024-08-05',
      status: 'processing',
      total: 5000000,
      items: [
        { id: 4, name: 'Màn hình Dell UltraSharp 27"', price: 5000000, quantity: 1, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=100&h=100&fit=crop' }
      ]
    },
    {
      id: 'ORD004',
      date: '2024-07-28',
      status: 'delivered',
      total: 3200000,
      items: [
        { id: 5, name: 'Bàn phím cơ Logitech G Pro', price: 3200000, quantity: 1, image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=100&h=100&fit=crop' }
      ]
    }
  ];

  const getStatusInfo = (status) => {
    switch (status) {
      case 'processing':
        return { label: 'Đang xử lý', icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
      case 'shipped':
        return { label: 'Đang giao', icon: Truck, color: 'text-blue-600', bgColor: 'bg-blue-100' };
      case 'delivered':
        return { label: 'Đã giao', icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-100' };
      case 'cancelled':
        return { label: 'Đã hủy', icon: Package, color: 'text-red-600', bgColor: 'bg-red-100' };
      default:
        return { label: 'Không xác định', icon: Package, color: 'text-gray-600', bgColor: 'bg-gray-100' };
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  const getStatusCount = (status) => {
    return orders.filter(order => order.status === status).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Về Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Đơn hàng của tôi</h1>
          <p className="text-gray-600 mt-2">Theo dõi và quản lý đơn hàng của bạn</p>
        </div>

        {/* Status Filter */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Lọc theo trạng thái</h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setSelectedStatus('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedStatus === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tất cả ({orders.length})
            </button>
            <button
              onClick={() => setSelectedStatus('processing')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedStatus === 'processing'
                  ? 'bg-yellow-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Đang xử lý ({getStatusCount('processing')})
            </button>
            <button
              onClick={() => setSelectedStatus('shipped')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedStatus === 'shipped'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Đang giao ({getStatusCount('shipped')})
            </button>
            <button
              onClick={() => setSelectedStatus('delivered')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedStatus === 'delivered'
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Đã giao ({getStatusCount('delivered')})
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => {
              const statusInfo = getStatusInfo(order.status);
              return (
                <div key={order.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  {/* Order Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`${statusInfo.bgColor} p-2 rounded-lg`}>
                          <statusInfo.icon className={`h-5 w-5 ${statusInfo.color}`} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Đơn hàng #{order.id}</h3>
                          <p className="text-sm text-gray-600">{formatDate(order.date)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">{formatPrice(order.total)}</p>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color}`}>
                          {statusInfo.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{item.name}</h4>
                            <p className="text-sm text-gray-600">Số lượng: {item.quantity}</p>
                            <p className="text-sm text-gray-600">{formatPrice(item.price)}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Actions */}
                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                      <div className="flex space-x-3">
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                          <Eye className="h-4 w-4 mr-2" />
                          Xem chi tiết
                        </button>
                        {order.status === 'delivered' && (
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                            <Star className="h-4 w-4 mr-2" />
                            Đánh giá
                          </button>
                        )}
                      </div>
                      {order.status === 'delivered' && (
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Mua lại
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16">
              <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">Không có đơn hàng nào</h3>
              <p className="text-gray-600">
                {selectedStatus === 'all' 
                  ? 'Bạn chưa có đơn hàng nào'
                  : `Không có đơn hàng nào ở trạng thái "${getStatusInfo(selectedStatus).label}"`
                }
              </p>
              {selectedStatus !== 'all' && (
                <button
                  onClick={() => setSelectedStatus('all')}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Xem tất cả đơn hàng
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
