import api from './api';
import { Order, OrderFilter, OrderSort } from '../features/orders';

class OrderService {
  private readonly baseUrl = '/orders';

  async getOrders(
    page: number = 1,
    limit: number = 10,
    filters?: OrderFilter,
    sort?: OrderSort
  ): Promise<{ orders: Order[]; total: number; page: number; limit: number }> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(filters && { filters: JSON.stringify(filters) }),
        ...(sort && { sort: JSON.stringify(sort) }),
      });

      const response = await api.get(`${this.baseUrl}?${params}`);
      return response.data;
    } catch (error) {
      throw new Error('Không thể lấy danh sách đơn hàng');
    }
  }

  async getOrderById(id: string): Promise<Order> {
    try {
      const response = await api.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Không thể lấy thông tin đơn hàng');
    }
  }

  async getOrderByNumber(orderNumber: string): Promise<Order> {
    try {
      const response = await api.get(`${this.baseUrl}/number/${orderNumber}`);
      return response.data;
    } catch (error) {
      throw new Error('Không thể lấy thông tin đơn hàng');
    }
  }

  async createOrder(orderData: {
    items: Array<{ productId: string; quantity: number }>;
    shippingAddress: any;
    billingAddress: any;
    paymentMethod: any;
    notes?: string;
  }): Promise<Order> {
    try {
      const response = await api.post(this.baseUrl, orderData);
      return response.data;
    } catch (error) {
      throw new Error('Tạo đơn hàng thất bại');
    }
  }

  async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    try {
      const response = await api.put(`${this.baseUrl}/${orderId}/status`, { status });
      return response.data;
    } catch (error) {
      throw new Error('Cập nhật trạng thái đơn hàng thất bại');
    }
  }

  async cancelOrder(orderId: string, reason?: string): Promise<Order> {
    try {
      const response = await api.put(`${this.baseUrl}/${orderId}/cancel`, { reason });
      return response.data;
    } catch (error) {
      throw new Error('Hủy đơn hàng thất bại');
    }
  }

  async getOrderTracking(orderId: string): Promise<{
    orderId: string;
    status: string;
    trackingNumber?: string;
    estimatedDelivery?: string;
    updates: Array<{
      status: string;
      timestamp: string;
      location?: string;
      description?: string;
    }>;
  }> {
    try {
      const response = await api.get(`${this.baseUrl}/${orderId}/tracking`);
      return response.data;
    } catch (error) {
      throw new Error('Không thể lấy thông tin theo dõi đơn hàng');
    }
  }

  async getOrderHistory(userId: string, page: number = 1, limit: number = 10): Promise<{
    orders: Order[];
    total: number;
    page: number;
    limit: number;
  }> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      const response = await api.get(`${this.baseUrl}/user/${userId}?${params}`);
      return response.data;
    } catch (error) {
      throw new Error('Không thể lấy lịch sử đơn hàng');
    }
  }

  async requestRefund(orderId: string, reason: string, items?: string[]): Promise<{
    refundId: string;
    status: string;
    message: string;
  }> {
    try {
      const response = await api.post(`${this.baseUrl}/${orderId}/refund`, {
        reason,
        items,
      });
      return response.data;
    } catch (error) {
      throw new Error('Yêu cầu hoàn tiền thất bại');
    }
  }

  async getRefundStatus(refundId: string): Promise<{
    refundId: string;
    status: string;
    amount: number;
    reason: string;
    createdAt: string;
    processedAt?: string;
  }> {
    try {
      const response = await api.get(`/refunds/${refundId}`);
      return response.data;
    } catch (error) {
      throw new Error('Không thể lấy trạng thái hoàn tiền');
    }
  }

  // Admin methods
  async getAllOrders(
    page: number = 1,
    limit: number = 50,
    filters?: OrderFilter,
    sort?: OrderSort
  ): Promise<{ orders: Order[]; total: number; page: number; limit: number }> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(filters && { filters: JSON.stringify(filters) }),
        ...(sort && { sort: JSON.stringify(sort) }),
      });

      const response = await api.get(`${this.baseUrl}/admin?${params}`);
      return response.data;
    } catch (error) {
      throw new Error('Không thể lấy danh sách đơn hàng');
    }
  }

  async updateOrder(orderId: string, orderData: Partial<Order>): Promise<Order> {
    try {
      const response = await api.put(`${this.baseUrl}/${orderId}`, orderData);
      return response.data;
    } catch (error) {
      throw new Error('Cập nhật đơn hàng thất bại');
    }
  }

  async deleteOrder(orderId: string): Promise<void> {
    try {
      await api.delete(`${this.baseUrl}/${orderId}`);
    } catch (error) {
      throw new Error('Xóa đơn hàng thất bại');
    }
  }

  async getOrderAnalytics(dateRange: { start: string; end: string }): Promise<{
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    ordersByStatus: Record<string, number>;
    revenueByDate: Array<{ date: string; revenue: number }>;
  }> {
    try {
      const response = await api.get(`${this.baseUrl}/analytics`, { params: dateRange });
      return response.data;
    } catch (error) {
      throw new Error('Không thể lấy thống kê đơn hàng');
    }
  }
}

export default new OrderService();
