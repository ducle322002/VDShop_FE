import api from './api';
import { CartItem, AddToCartRequest, UpdateCartItemRequest, RemoveFromCartRequest } from '../features/cart';

class CartService {
  private readonly baseUrl = '/cart';

  async getCart(): Promise<{ items: CartItem[]; totalItems: number; subtotal: number; total: number }> {
    try {
      const response = await api.get(this.baseUrl);
      return response.data;
    } catch (error) {
      throw new Error('Không thể lấy thông tin giỏ hàng');
    }
  }

  async addToCart(request: AddToCartRequest): Promise<CartItem> {
    try {
      const response = await api.post(this.baseUrl, request);
      return response.data;
    } catch (error) {
      throw new Error('Không thể thêm sản phẩm vào giỏ hàng');
    }
  }

  async updateCartItem(request: UpdateCartItemRequest): Promise<CartItem> {
    try {
      const response = await api.put(`${this.baseUrl}/items/${request.itemId}`, {
        quantity: request.quantity,
      });
      return response.data;
    } catch (error) {
      throw new Error('Không thể cập nhật sản phẩm trong giỏ hàng');
    }
  }

  async removeFromCart(request: RemoveFromCartRequest): Promise<void> {
    try {
      await api.delete(`${this.baseUrl}/items/${request.itemId}`);
    } catch (error) {
      throw new Error('Không thể xóa sản phẩm khỏi giỏ hàng');
    }
  }

  async clearCart(): Promise<void> {
    try {
      await api.delete(this.baseUrl);
    } catch (error) {
      throw new Error('Không thể xóa giỏ hàng');
    }
  }

  async applyDiscountCode(code: string): Promise<{ discount: number; message: string }> {
    try {
      const response = await api.post(`${this.baseUrl}/discount`, { code });
      return response.data;
    } catch (error) {
      throw new Error('Mã giảm giá không hợp lệ');
    }
  }

  async removeDiscountCode(): Promise<void> {
    try {
      await api.delete(`${this.baseUrl}/discount`);
    } catch (error) {
      throw new Error('Không thể xóa mã giảm giá');
    }
  }

  async getShippingOptions(): Promise<Array<{
    id: string;
    name: string;
    price: number;
    estimatedDays: number;
  }>> {
    try {
      const response = await api.get(`${this.baseUrl}/shipping-options`);
      return response.data;
    } catch (error) {
      throw new Error('Không thể lấy tùy chọn vận chuyển');
    }
  }

  async setShippingOption(shippingOptionId: string): Promise<void> {
    try {
      await api.put(`${this.baseUrl}/shipping`, { shippingOptionId });
    } catch (error) {
      throw new Error('Không thể chọn tùy chọn vận chuyển');
    }
  }

  // Local storage methods for offline functionality
  getLocalCart(): CartItem[] {
    try {
      const cart = localStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error('Error reading local cart:', error);
      return [];
    }
  }

  setLocalCart(items: CartItem[]): void {
    try {
      localStorage.setItem('cart', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving local cart:', error);
    }
  }

  addToLocalCart(item: CartItem): void {
    const cart = this.getLocalCart();
    const existingItem = cart.find(cartItem => cartItem.productId === item.productId);
    
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      cart.push(item);
    }
    
    this.setLocalCart(cart);
  }

  updateLocalCartItem(itemId: string, quantity: number): void {
    const cart = this.getLocalCart();
    const item = cart.find(cartItem => cartItem.id === itemId);
    
    if (item) {
      item.quantity = quantity;
      this.setLocalCart(cart);
    }
  }

  removeFromLocalCart(itemId: string): void {
    const cart = this.getLocalCart();
    const filteredCart = cart.filter(item => item.id !== itemId);
    this.setLocalCart(filteredCart);
  }

  clearLocalCart(): void {
    localStorage.removeItem('cart');
  }

  syncWithServer(): Promise<void> {
    const localCart = this.getLocalCart();
    if (localCart.length === 0) return Promise.resolve();

    // Add all local items to server cart
    return Promise.all(
      localCart.map(item => 
        this.addToCart({
          productId: item.productId,
          quantity: item.quantity,
        }).catch(error => {
          console.error('Error syncing item:', error);
        })
      )
    ).then(() => {
      // Clear local cart after successful sync
      this.clearLocalCart();
    });
  }
}

export default new CartService();
