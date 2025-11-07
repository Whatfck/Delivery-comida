import React, { useState, useEffect } from 'react';
import { OrderList } from '../components/orders/OrderList';
import { OrderStatus as OrderStatusComponent } from '../components/orders/OrderStatus';
import { StatsDashboard } from '../components/statistics/StatsDashboard';
import { NotificationPanel } from '../components/notifications/NotificationPanel';
import { useNotifications } from '../hooks/useNotifications';
import apiService from '../services/api';
import type { Order, Statistics } from '../../types';
import { OrderStatus, UserRole } from '../../types';

type ViewMode = 'dashboard' | 'orders' | 'order-detail';

export const AdminView: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard');
  const [orders, setOrders] = useState<Order[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = 
    useNotifications({ userRole: UserRole.ADMIN });

  useEffect(() => {
    loadData();
    
    const interval = setInterval(loadData, 15000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    try {
      const [ordersResponse, statsResponse] = await Promise.all([
        apiService.getOrders(),
        apiService.getStatistics()
      ]);

      if (ordersResponse.success) {
        setOrders(ordersResponse.data);
      }

      if (statsResponse.success) {
        setStatistics(statsResponse.data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(order);
    setViewMode('order-detail');
  };

  const handleUpdateStatus = async (newStatus: OrderStatus) => {
    if (!selectedOrder) return;

    try {
      const response = await apiService.updateOrderStatus(selectedOrder.id, newStatus);
      if (response.success) {
        setSelectedOrder(response.data);
        setOrders(orders.map(o => o.id === response.data.id ? response.data : o));
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    }
  };

  const getOrderStatusCount = (status: OrderStatus): number => {
    return orders.filter(o => o.status === status).length;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-500 text-white p-2 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Complete business overview</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Navigation */}
              <nav className="flex gap-2">
                <button
                  onClick={() => setViewMode('dashboard')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    viewMode === 'dashboard'
                      ? 'bg-indigo-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setViewMode('orders')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    viewMode === 'orders' || viewMode === 'order-detail'
                      ? 'bg-indigo-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  All Orders
                </button>
              </nav>

              <NotificationPanel
                notifications={notifications}
                unreadCount={unreadCount}
                onMarkAsRead={markAsRead}
                onMarkAllAsRead={markAllAsRead}
                onClear={clearNotifications}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Dashboard View */}
        {viewMode === 'dashboard' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-blue-600">{getOrderStatusCount(OrderStatus.RECEIVED)}</p>
                <p className="text-xs text-gray-600 mt-1">Received</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-yellow-600">{getOrderStatusCount(OrderStatus.PREPARING)}</p>
                <p className="text-xs text-gray-600 mt-1">Preparing</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-purple-600">{getOrderStatusCount(OrderStatus.READY)}</p>
                <p className="text-xs text-gray-600 mt-1">Ready</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-orange-600">{getOrderStatusCount(OrderStatus.ON_THE_WAY)}</p>
                <p className="text-xs text-gray-600 mt-1">Delivering</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-green-600">{getOrderStatusCount(OrderStatus.DELIVERED)}</p>
                <p className="text-xs text-gray-600 mt-1">Delivered</p>
              </div>
            </div>

            {/* Statistics Dashboard */}
            {statistics ? (
              <StatsDashboard statistics={statistics} isLoading={isLoading} />
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <svg className="animate-spin h-10 w-10 text-indigo-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <p className="text-gray-600">Loading statistics...</p>
              </div>
            )}

            {/* Recent Orders */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Recent Orders</h2>
                <button
                  onClick={() => setViewMode('orders')}
                  className="text-indigo-500 hover:text-indigo-700 font-semibold flex items-center gap-2"
                >
                  View All
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <OrderList
                orders={orders.slice(0, 5)}
                onSelectOrder={handleSelectOrder}
                isLoading={isLoading}
              />
            </div>
          </div>
        )}

        {/* Orders View */}
        {viewMode === 'orders' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">All Orders</h2>
            <OrderList
              orders={orders}
              onSelectOrder={handleSelectOrder}
              isLoading={isLoading}
            />
          </div>
        )}

        {/* Order Detail View */}
        {viewMode === 'order-detail' && selectedOrder && (
          <div>
            <button
              onClick={() => setViewMode('orders')}
              className="mb-6 text-indigo-500 hover:text-indigo-700 flex items-center gap-2 font-semibold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Orders
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Complete Order Details */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Order #{selectedOrder.id}</h2>
                
                <div className="space-y-6">
                  {/* Customer Info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-3">Customer Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-semibold text-gray-800">{selectedOrder.customer.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-semibold text-gray-800">{selectedOrder.customer.phone}</span>
                      </div>
                      {selectedOrder.customer.email && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Email:</span>
                          <span className="font-semibold text-gray-800">{selectedOrder.customer.email}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Address:</span>
                        <span className="font-semibold text-gray-800 text-right">{selectedOrder.deliveryAddress}</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Order Items</h3>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-800">{item.product.name}</h4>
                              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                              <p className="text-sm text-gray-600">Unit Price: ${item.product.basePrice.toFixed(2)}</p>
                            </div>
                            <span className="font-bold text-green-600">${item.subtotal.toFixed(2)}</span>
                          </div>
                          
                          {item.extras.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-gray-200">
                              <p className="text-xs text-gray-600 font-semibold mb-1">Extras:</p>
                              <ul className="text-sm text-gray-700 space-y-1">
                                {item.extras.map(extra => (
                                  <li key={extra.id} className="flex justify-between">
                                    <span>+ {extra.name}</span>
                                    <span className="font-semibold">+${extra.price.toFixed(2)}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {selectedOrder.notes && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-800 mb-2">Order Notes</h3>
                      <p className="text-sm text-gray-700 italic">"{selectedOrder.notes}"</p>
                    </div>
                  )}

                  {/* Timestamps */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-3">Timestamps</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Created:</span>
                        <span className="font-semibold text-gray-800">
                          {new Date(selectedOrder.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Updated:</span>
                        <span className="font-semibold text-gray-800">
                          {new Date(selectedOrder.updatedAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-800">Total Amount</span>
                      <span className="text-2xl font-bold text-green-600">${selectedOrder.totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Status */}
              <div>
                <OrderStatusComponent
                  order={selectedOrder}
                  onUpdateStatus={handleUpdateStatus}
                  canUpdateStatus={true}
                />
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};