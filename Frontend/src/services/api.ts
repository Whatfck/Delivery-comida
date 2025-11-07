import type {
  ApiResponse,
  Product,
  Extra,
  Order,
  Statistics,
  Restaurant,
  User,
  OrderStatusType
} from '../../types';
import {
  mockProducts,
  mockExtras,
  mockOrders,
  mockStatistics,
  mockRestaurants,
  mockUsers,
  createMockResponse,
  createMockErrorResponse
} from './mockData';

// Configuración de la API
const API_BASE_URL = 'http://localhost:8080/api'; // Backend Spring Boot
const USE_MOCK_DATA = false; // Cambiar a false para usar backend real

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        success: false,
        data: null as T,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Authentication
  async login(username: string, password: string): Promise<ApiResponse<User>> {
    if (USE_MOCK_DATA) {
      // Simulate login delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const user = mockUsers.find(u => u.username === username);
      if (user && password === '123') { // Simple mock password
        return createMockResponse(user);
      }
      return createMockErrorResponse<User>('Invalid credentials');
    }

    return this.request<User>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  // Restaurants
  async getRestaurants(): Promise<ApiResponse<Restaurant[]>> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return createMockResponse(mockRestaurants);
    }
    return this.request<Restaurant[]>('/restaurants');
  }

  async getRestaurant(id: number): Promise<ApiResponse<Restaurant>> {
    return this.request<Restaurant>(`/restaurants/${id}`);
  }

  // Products
  async getProducts(restaurantId?: number): Promise<ApiResponse<Product[]>> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return createMockResponse(mockProducts);
    }
    const endpoint = restaurantId ? `/products?restaurantId=${restaurantId}` : '/products';
    return this.request<Product[]>(endpoint);
  }

  async getProduct(id: number): Promise<ApiResponse<Product>> {
    return this.request<Product>(`/products/${id}`);
  }

  // Extras
  async getExtras(): Promise<ApiResponse<Extra[]>> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return createMockResponse(mockExtras);
    }
    return this.request<Extra[]>('/extras');
  }

  // Orders
  async getOrders(): Promise<ApiResponse<Order[]>> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 400));
      return createMockResponse(mockOrders);
    }
    return this.request<Order[]>('/orders');
  }

  async getOrder(id: number): Promise<ApiResponse<Order>> {
    return this.request<Order>(`/orders/${id}`);
  }

  async createOrder(orderData: any): Promise<ApiResponse<Order>> {
    return this.request<Order>('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async updateOrderStatus(orderId: number, status: OrderStatusType): Promise<ApiResponse<Order>> {
    return this.request<Order>(`/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // Statistics
  async getStatistics(): Promise<ApiResponse<Statistics>> {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 300));
      return createMockResponse(mockStatistics);
    }
    return this.request<Statistics>('/statistics');
  }

  // Users
  async getUsers(): Promise<ApiResponse<User[]>> {
    return this.request<User[]>('/users');
  }

  async getUser(id: number): Promise<ApiResponse<User>> {
    return this.request<User>(`/users/${id}`);
  }
}

// Exportar instancia singleton
const apiService = new ApiService();
export default apiService;