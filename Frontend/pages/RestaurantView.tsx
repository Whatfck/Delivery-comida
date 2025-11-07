import React, { useState, useEffect } from 'react';
import { OrderList } from '../components/orders/OrderList';
import { OrderStatus as OrderStatusComponent } from '../components/orders/OrderStatus';
import { NotificationPanel } from '../components/notifications/NotificationPanel';
import { useNotifications } from '../hooks/useNotifications';
import apiService from '../services/api';
import type { Order } from '../types';
import { OrderStatus, UserRole } from '../types';

export const RestaurantView: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = 
    useNotifications({ userRole: UserRole.RESTAURANT });

  useEffect(() => {
    loadOrders();
    
    // Poll for new orders every 10 seconds
    const interval = setInterval(loadOrders, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadOrders = async () => {
    try {
      const response = await apiService.getOrders();
      if (response.success) {
        setOrders(response.data);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectOrder = (order: Order) => {
    setSelectedOrder(order);
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

  const activeOrders = orders.filter(o => 
    o.status !== OrderStatus.DELIVERED
  );

  const completedOrders = orders.filter(o => 
    o.status === OrderStatus.DELIVERED
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 text-white p-2 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Restaurant Dashboard</h1>
                <p className="text-sm text-gray-600">Manage incoming orders</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Stats */}
              <div className="flex gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">{activeOrders.length}</p>
                  <p className="text-xs text-gray-600">Active Orders</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{completedOrders.length}</p>
                  <p className="text-xs text-gray-600">Completed</p>
                </div>
              </div>

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
        {selectedOrder ? (
          <div>
            <button
              onClick={() => setSelectedOrder(null)}
              className="mb-6 text-orange-500 hover:text-orange-700 flex items-center gap-2 font-semibold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Orders
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Order Details */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Details</h2>
                
                <div className="space-y-4">
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
                      <div className="flex justify-between">
                        <span className="text-gray-600">Address:</span>
                        <span className="font-semibold text-gray-800 text-right">{selectedOrder.deliveryAddress}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Order Items</h3>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-800">{item.product.name}</h4>
                              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                            </div>
                            <span className="font-bold text-green-600">${item.subtotal.toFixed(2)}</span>
                          </div>
                          
                          {item.extras.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-gray-200">
                              <p className="text-xs text-gray-600 font-semibold mb-1">Extras:</p>
                              <ul className="text-sm text-gray-700 space-y-1">
                                {item.extras.map(extra => (
                                  <li key={extra.id}>+ {extra.name} (+${extra.price.toFixed(2)})</li>
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
                      <h3 className="font-semibold text-gray-800 mb-2">Special Instructions</h3>
                      <p className="text-sm text-gray-700 italic">"{selectedOrder.notes}"</p>
                    </div>
                  )}

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
                  canUpdateStatus={selectedOrder.status !== OrderStatus.DELIVERED}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Active Orders */}
            {activeOrders.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Active Orders</h2>
                <OrderList
                  orders={activeOrders}
                  onSelectOrder={handleSelectOrder}
                  isLoading={isLoading}
                />
              </div>
            )}

            {/* Completed Orders */}
            {completedOrders.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Completed Orders</h2>
                <OrderList
                  orders={completedOrders}
                  onSelectOrder={handleSelectOrder}
                />
              </div>
            )}

            {/* Empty State */}
            {orders.length === 0 && !isLoading && (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <svg className="w-20 h-20 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No Orders Yet</h3>
                <p className="text-gray-600">New orders will appear here automatically</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};