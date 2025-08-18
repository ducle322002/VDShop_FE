import api from './api';
import { Product, ProductFilter, ProductSort } from '../features/products';

class ProductService {
  private readonly baseUrl = '/products';

  async getProducts(
    page: number = 1,
    limit: number = 10,
    filters?: ProductFilter,
    sort?: ProductSort
  ): Promise<{ products: Product[]; total: number; page: number; limit: number }> {
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
      throw new Error('Không thể lấy danh sách sản phẩm');
    }
  }

  async getProductById(id: string): Promise<Product> {
    try {
      const response = await api.get(`${this.baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Không thể lấy thông tin sản phẩm');
    }
  }

  async getProductsByCategory(
    categoryId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{ products: Product[]; total: number; page: number; limit: number }> {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      const response = await api.get(`${this.baseUrl}/category/${categoryId}?${params}`);
      return response.data;
    } catch (error) {
      throw new Error('Không thể lấy sản phẩm theo danh mục');
    }
  }

  async searchProducts(
    query: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{ products: Product[]; total: number; page: number; limit: number }> {
    try {
      const params = new URLSearchParams({
        q: query,
        page: page.toString(),
        limit: limit.toString(),
      });

      const response = await api.get(`${this.baseUrl}/search?${params}`);
      return response.data;
    } catch (error) {
      throw new Error('Tìm kiếm sản phẩm thất bại');
    }
  }

  async getFeaturedProducts(limit: number = 8): Promise<Product[]> {
    try {
      const response = await api.get(`${this.baseUrl}/featured?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error('Không thể lấy sản phẩm nổi bật');
    }
  }

  async getNewProducts(limit: number = 8): Promise<Product[]> {
    try {
      const response = await api.get(`${this.baseUrl}/new?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error('Không thể lấy sản phẩm mới');
    }
  }

  async getBestSellingProducts(limit: number = 8): Promise<Product[]> {
    try {
      const response = await api.get(`${this.baseUrl}/best-selling?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error('Không thể lấy sản phẩm bán chạy');
    }
  }

  async getRelatedProducts(productId: string, limit: number = 4): Promise<Product[]> {
    try {
      const response = await api.get(`${this.baseUrl}/${productId}/related?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw new Error('Không thể lấy sản phẩm liên quan');
    }
  }

  async getProductReviews(productId: string, page: number = 1, limit: number = 10) {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      const response = await api.get(`${this.baseUrl}/${productId}/reviews?${params}`);
      return response.data;
    } catch (error) {
      throw new Error('Không thể lấy đánh giá sản phẩm');
    }
  }

  async addProductReview(productId: string, review: {
    rating: number;
    comment: string;
  }) {
    try {
      const response = await api.post(`${this.baseUrl}/${productId}/reviews`, review);
      return response.data;
    } catch (error) {
      throw new Error('Không thể thêm đánh giá');
    }
  }

  // Admin methods
  async createProduct(productData: Partial<Product>): Promise<Product> {
    try {
      const response = await api.post(this.baseUrl, productData);
      return response.data;
    } catch (error) {
      throw new Error('Tạo sản phẩm thất bại');
    }
  }

  async updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
    try {
      const response = await api.put(`${this.baseUrl}/${id}`, productData);
      return response.data;
    } catch (error) {
      throw new Error('Cập nhật sản phẩm thất bại');
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      await api.delete(`${this.baseUrl}/${id}`);
    } catch (error) {
      throw new Error('Xóa sản phẩm thất bại');
    }
  }
}

export default new ProductService();
