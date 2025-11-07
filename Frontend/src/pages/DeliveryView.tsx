import React, { useState, useEffect } from 'react';
import { OrderList } from '../components/orders/OrderList';
import { OrderStatus as OrderStatusComponent } from '../components/orders/OrderStatus';
import { NotificationPanel } from '../components/notifications/NotificationPanel';
import { useNotifications } from '../hooks/useNotifications';
import apiService from '../services/api';
import type { Order } from '../../types';
import { OrderStatus, UserRole } from '../../types';

export const DeliveryView: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = 
    useNotifications({ userRole: UserRole.DELIVERY });

  useEffect(() => {
    loadOrders();
    
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

  const readyOrders = orders.filter(o => o.status === OrderStatus.READY);
  const deliveringOrders = orders.filter(o => o.status === OrderStatus.ON_THE_WAY);
  const deliveredOrders = orders.filter(o => o.status === OrderStatus.DELIVERED);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-500 text-white p-2 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Delivery Dashboard</h1>
                <p className="text-sm text-gray-600">Manage deliveries</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Stats */}
              <div className="flex gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{readyOrders.length}</p>
                  <p className="text-xs text-gray-600">Ready to Pick</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">{deliveringOrders.length}</p>
                  <p className="text-xs text-gray-600">Delivering</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{deliveredOrders.length}</p>
                  <p className="text-xs text-gray-600">Delivered</p>
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
              className="mb-6 text-green-500 hover:text-green-700 flex items-center gap-2 font-semibold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Deliveries
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Delivery Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Delivery Information</h2>
                
                {/* Customer Info Card */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6">
                  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Customer Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide">Name</p>
                      <p className="text-lg font-semibold text-gray-800">{selectedOrder.customer.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase tracking-wide">Phone</p>
                      <a 
                        href={`tel:${selectedOrder.customer.phone}`}
                        className="text-lg font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-2"
                      >
                        {selectedOrder.customer.phone}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Delivery Address Card */}
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 mb-6">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Delivery Address
                  </h3>
                  <p className="text-gray-800 font-semibold text-lg leading-relaxed">
                    {selectedOrder.deliveryAddress}
                  </p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(selectedOrder.deliveryAddress)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    Open in Maps
                  </a>
                </div>

                {/* Order Items Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">Order Items ({selectedOrder.items.length})</h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm bg-white p-2 rounded">
                        <span className="text-gray-700">{item.quantity}x {item.product.name}</span>
                        <span className="font-semibold text-gray-800">${item.subtotal.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-300 flex justify-between items-center">
                    <span className="font-bold text-gray-800">Total Amount</span>
                    <span className="text-xl font-bold text-green-600">${selectedOrder.totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                {selectedOrder.notes && (
                  <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Special Instructions
                    </h3>
                    <p className="text-sm text-gray-700 italic">"{selectedOrder.notes}"</p>
                  </div>
                )}
              </div>

              {/* Order Status */}
              <div>
                <OrderStatusComponent
                  order={selectedOrder}
                  onUpdateStatus={handleUpdateStatus}
                  canUpdateStatus={
                    selectedOrder.status === OrderStatus.READY || 
                    selectedOrder.status === OrderStatus.ON_THE_WAY
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Ready to Pick Up */}
            {readyOrders.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="bg-purple-500 text-white p-2 rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  Ready for Pickup
                </h2>
                <OrderList
                  orders={readyOrders}
                  onSelectOrder={handleSelectOrder}
                />
              </div>
            )}

            {/* Currently Delivering */}
            {deliveringOrders.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <span className="bg-orange-500 text-white p-2 rounded-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                    </svg>
                  </span>
                  Currently Delivering
                </h2>
                <OrderList
                  orders={deliveringOrders}
                  onSelectOrder={handleSelectOrder}
                />
              </div>
            )}

            {/* Delivered Orders */}
            {deliveredOrders.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Completed Deliveries</h2>
                <OrderList
                  orders={deliveredOrders.slice(0, 5)}
                  onSelectOrder={handleSelectOrder}
                />
              </div>
            )}

            {/* Empty State */}
            {readyOrders.length === 0 && deliveringOrders.length === 0 && !isLoading && (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <svg className="w-20 h-20 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="text-xl font-bold text-gray-800 mb-2">No Active Deliveries</h3>
                <p className="text-gray-600">New delivery orders will appear here</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};