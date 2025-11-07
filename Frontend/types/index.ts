// Enums
export const OrderStatus = {
  RECEIVED: 'RECEIVED',
  PREPARING: 'PREPARING',
  READY: 'READY',
  ON_THE_WAY: 'ON_THE_WAY',
  DELIVERED: 'DELIVERED'
} as const;

export type OrderStatusType = typeof OrderStatus[keyof typeof OrderStatus];

export const UserRole = {
  CUSTOMER: 'CUSTOMER',
  RESTAURANT: 'RESTAURANT',
  DELIVERY: 'DELIVERY',
  ADMIN: 'ADMIN'
} as const;

export type UserRoleType = typeof UserRole[keyof typeof UserRole];

// Interfaces base
export interface Product {
  id: number;
  name: string;
  basePrice: number;
  description?: string;
  category?: string;
}

export interface Extra {
  id: number;
  name: string;
  price: number;
  description?: string;
}

export interface ProductWithExtras {
  product: Product;
  extras: Extra[];
  quantity: number;
  totalPrice: number;
}

export interface Customer {
  name: string;
  phone: string;
  email?: string;
}

export interface Restaurant {
  id: number;
  name: string;
  description: string;
  phone: string;
  address: string;
}

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  phone: string;
  role: UserRoleType;
}

export interface OrderItem {
  id: number;
  product: Product;
  extras: Extra[];
  quantity: number;
  subtotal: number;
}

export interface Order {
  id: number;
  customer: Customer;
  restaurant?: Restaurant;
  items: OrderItem[];
  status: OrderStatusType;
  totalAmount: number;
  deliveryAddress: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Statistics {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  ordersByStatus: Record<OrderStatusType, number>;
  recentOrders: Order[];
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// Notification types
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  userRole: UserRoleType;
}

// Form types
export interface OrderFormData {
  customer: Customer;
  deliveryAddress: string;
  notes?: string;
}

// Hook types
export interface UseNotificationsReturn {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
}