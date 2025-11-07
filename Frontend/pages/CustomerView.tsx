import React, { useState, useEffect } from 'react';
import { ProductCard } from '../components/products/ProductCard';
import { ProductCustomizer } from '../components/products/ProductCustomizer';
import { OrderForm } from '../components/orders/OrderForm';
import { OrderSummary } from '../components/orders/OrderSummary';
import { OrderStatus } from '../components/orders/OrderStatus';
import { NotificationPanel } from '../components/notifications/NotificationPanel';
import { useNotifications } from '../hooks/useNotifications';
import apiService from '../services/api';
import type { Product, Extra, ProductWithExtras, Customer, Order } from '../types';
import { UserRole } from '../types';

type ViewStep = 'menu' | 'customer-info' | 'summary' | 'order-placed';

export const CustomerView: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<ViewStep>('menu');
  const [products, setProducts] = useState<Product[]>([]);
  const [extras, setExtras] = useState<Extra[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [orderItems, setOrderItems] = useState<ProductWithExtras[]>([]);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [notes, setNotes] = useState('');
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { notifications, unreadCount, markAsRead, markAllAsRead, clearNotifications } = 
    useNotifications({ userRole: UserRole.CUSTOMER });

  useEffect(() => {
    loadProducts();
    loadExtras();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await apiService.getProducts();
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const loadExtras = async () => {
    try {
      const response = await apiService.getExtras();
      if (response.success) {
        setExtras(response.data);
      }
    } catch (error) {
      console.error('Error loading extras:', error);
    }
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleAddToOrder = (productWithExtras: ProductWithExtras) => {
    setOrderItems([...orderItems, productWithExtras]);
    setSelectedProduct(null);
  };

  const handleRemoveItem = (index: number) => {
    setOrderItems(orderItems.filter((_, i) => i !== index));
  };

  const handleCustomerSubmit = (customerData: Customer, orderNotes: string) => {
    setCustomer(customerData);
    setNotes(orderNotes);
    setCurrentStep('summary');
  };

  const handleConfirmOrder = async () => {
    if (!customer) return;

    setIsLoading(true);
    try {
      const orderData = {
        customer,
        items: orderItems.map(item => ({
          productId: item.product.id,
          extraIds: item.extras.map(e => e.id),
          quantity: item.quantity
        })),
        notes
      };

      const response = await apiService.createOrder(orderData);
      if (response.success) {
        setPlacedOrder(response.data);
        setCurrentStep('order-placed');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartNewOrder = () => {
    setCurrentStep('menu');
    setOrderItems([]);
    setCustomer(null);
    setNotes('');
    setPlacedOrder(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-500 text-white p-2 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Food Delivery</h1>
                <p className="text-sm text-gray-600">Order your favorite meals</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Cart Badge */}
              {currentStep === 'menu' && orderItems.length > 0 && (
                <button
                  onClick={() => setCurrentStep('customer-info')}
                  className="relative bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Checkout ({orderItems.length})
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                    {orderItems.length}
                  </span>
                </button>
              )}

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
        {/* Menu View */}
        {currentStep === 'menu' && (
          <div>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-800">Our Menu</h2>
              <p className="text-gray-600 mt-2">Choose your favorite dishes and customize them</p>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-12">
                <svg className="animate-spin h-12 w-12 text-blue-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <p className="text-gray-600">Loading menu...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={handleSelectProduct}
                  />
                ))}
              </div>
            )}

            {/* Current Order Summary */}
            {orderItems.length > 0 && (
              <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-xl p-4 max-w-sm">
                <h3 className="font-bold text-gray-800 mb-2">Current Order</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto mb-3">
                  {orderItems.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-700">{item.quantity}x {item.product.name}</span>
                      <span className="font-semibold text-gray-800">${item.totalPrice.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-2 flex justify-between items-center">
                  <span className="font-bold text-gray-800">Total:</span>
                  <span className="font-bold text-green-600 text-lg">
                    ${orderItems.reduce((sum, item) => sum + item.totalPrice, 0).toFixed(2)}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Customer Info View */}
        {currentStep === 'customer-info' && (
          <div className="max-w-2xl mx-auto">
            <button
              onClick={() => setCurrentStep('menu')}
              className="mb-6 text-blue-500 hover:text-blue-700 flex items-center gap-2 font-semibold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Menu
            </button>
            <OrderForm
              onSubmit={handleCustomerSubmit}
              onCancel={() => setCurrentStep('menu')}
            />
          </div>
        )}

        {/* Summary View */}
        {currentStep === 'summary' && customer && (
          <div className="max-w-3xl mx-auto">
            <OrderSummary
              items={orderItems}
              customer={customer}
              notes={notes}
              onRemoveItem={handleRemoveItem}
              onConfirm={handleConfirmOrder}
              onCancel={() => setCurrentStep('customer-info')}
              isLoading={isLoading}
            />
          </div>
        )}

        {/* Order Placed View */}
        {currentStep === 'order-placed' && placedOrder && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8 text-center mb-6">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h2>
              <p className="text-gray-600 mb-6">Your order has been received and is being processed</p>
              <div className="bg-gray-50 rounded-lg p-4 inline-block">
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="text-2xl font-bold text-blue-600">#{placedOrder.id}</p>
              </div>
            </div>

            <OrderStatus order={placedOrder} />

            <button
              onClick={handleStartNewOrder}
              className="w-full mt-6 px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
            >
              Start New Order
            </button>
          </div>
        )}
      </main>

      {/* Product Customizer Modal */}
      {selectedProduct && (
        <ProductCustomizer
          product={selectedProduct}
          availableExtras={extras}
          onAddToOrder={handleAddToOrder}
          onCancel={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};