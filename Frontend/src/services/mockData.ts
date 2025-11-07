import type {
  Product,
  Extra,
  Order,
  Statistics,
  Restaurant,
  User,
  Notification
} from '../../types';
import { OrderStatus, UserRole } from '../../types';

// Mock data for development
export const mockProducts: Product[] = [
  {
    id: 1,
    name: 'Hamburguesa',
    basePrice: 8.00,
    description: 'Deliciosa hamburguesa con carne premium',
    category: 'Principales'
  },
  {
    id: 2,
    name: 'Pizza',
    basePrice: 12.00,
    description: 'Pizza artesanal con ingredientes frescos',
    category: 'Principales'
  },
  {
    id: 3,
    name: 'Ensalada',
    basePrice: 6.00,
    description: 'Ensalada fresca con vegetales orgánicos',
    category: 'Ligeros'
  }
];

export const mockExtras: Extra[] = [
  {
    id: 1,
    name: 'Extra Queso',
    price: 2.50,
    description: 'Queso cheddar derretido'
  },
  {
    id: 2,
    name: 'Extra Carne',
    price: 4.00,
    description: 'Porción adicional de carne premium'
  },
  {
    id: 3,
    name: 'Extra Vegetales',
    price: 1.50,
    description: 'Mezcla de vegetales frescos'
  },
  {
    id: 4,
    name: 'Extra Salsa',
    price: 1.00,
    description: 'Salsa especial de la casa'
  }
];

export const mockRestaurants: Restaurant[] = [
  {
    id: 1,
    name: 'Pizza Palace',
    description: 'Pizzas artesanales',
    phone: '555-0101',
    address: 'Calle Principal 123'
  },
  {
    id: 2,
    name: 'Burger King',
    description: 'Hamburguesas gourmet',
    phone: '555-0102',
    address: 'Avenida Central 456'
  },
  {
    id: 3,
    name: 'Green Salad',
    description: 'Ensaladas frescas',
    phone: '555-0103',
    address: 'Plaza Verde 789'
  }
];

export const mockUsers: User[] = [
  {
    id: 1,
    username: 'admin',
    name: 'Administrador',
    email: 'admin@delivery.com',
    phone: '555-0000',
    role: UserRole.ADMIN
  },
  {
    id: 2,
    username: 'juan',
    name: 'Juan Pérez',
    email: 'juan@email.com',
    phone: '555-1111',
    role: UserRole.CUSTOMER
  },
  {
    id: 3,
    username: 'maria',
    name: 'María García',
    email: 'maria@email.com',
    phone: '555-2222',
    role: UserRole.CUSTOMER
  }
];

export const mockOrders: Order[] = [
  {
    id: 1,
    customer: {
      name: 'Juan Pérez',
      phone: '555-1111',
      email: 'juan@email.com'
    },
    restaurant: mockRestaurants[0],
    items: [
      {
        id: 1,
        product: mockProducts[0],
        extras: [mockExtras[0], mockExtras[3]],
        quantity: 1,
        subtotal: 11.50
      }
    ],
    status: OrderStatus.READY,
    totalAmount: 11.50,
    deliveryAddress: 'Calle Ficticia 123',
    notes: 'Sin cebolla por favor',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T11:00:00Z'
  },
  {
    id: 2,
    customer: {
      name: 'María García',
      phone: '555-2222',
      email: 'maria@email.com'
    },
    restaurant: mockRestaurants[1],
    items: [
      {
        id: 2,
        product: mockProducts[1],
        extras: [mockExtras[1]],
        quantity: 2,
        subtotal: 32.00
      }
    ],
    status: OrderStatus.ON_THE_WAY,
    totalAmount: 32.00,
    deliveryAddress: 'Avenida Imaginaria 456',
    createdAt: '2024-01-15T11:15:00Z',
    updatedAt: '2024-01-15T11:45:00Z'
  }
];

export const mockStatistics: Statistics = {
  totalOrders: 25,
  totalRevenue: 387.50,
  averageOrderValue: 15.50,
  ordersByStatus: {
    [OrderStatus.RECEIVED]: 2,
    [OrderStatus.PREPARING]: 3,
    [OrderStatus.READY]: 5,
    [OrderStatus.ON_THE_WAY]: 8,
    [OrderStatus.DELIVERED]: 7
  },
  recentOrders: mockOrders.slice(0, 5)
};

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'info',
    title: 'Nuevo pedido',
    message: 'Pedido #1 recibido de Juan Pérez',
    timestamp: new Date('2024-01-15T10:30:00Z'),
    read: false,
    userRole: UserRole.RESTAURANT
  },
  {
    id: '2',
    type: 'success',
    title: 'Pedido listo',
    message: 'Pedido #1 está listo para entrega',
    timestamp: new Date('2024-01-15T11:00:00Z'),
    read: false,
    userRole: UserRole.DELIVERY
  },
  {
    id: '3',
    type: 'warning',
    title: 'Pedido demorado',
    message: 'Pedido #2 puede tener demora de 10 minutos',
    timestamp: new Date('2024-01-15T11:30:00Z'),
    read: true,
    userRole: UserRole.CUSTOMER
  }
];

// Mock API responses
export const createMockResponse = <T>(data: T, success: boolean = true): { success: boolean; data: T } => ({
  success,
  data
});

export const createMockErrorResponse = <T>(message: string): { success: boolean; data: T; error: string } => ({
  success: false,
  data: null as T,
  error: message
});