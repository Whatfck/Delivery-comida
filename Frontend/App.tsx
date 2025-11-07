import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CustomerView } from './pages/CustomerView';
import { RestaurantView } from './pages/RestaurantView';
import { DeliveryView } from './pages/DeliveryView';
import { AdminView } from './pages/AdminView';
import { UserRole } from './types';

type ViewType = 'role-selection' | 'customer' | 'restaurant' | 'delivery' | 'admin';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('role-selection');

  const handleRoleSelect = (role: ViewType) => {
    setCurrentView(role);
  };

  const handleBackToRoleSelection = () => {
    setCurrentView('role-selection');
  };

  if (currentView === 'role-selection') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">Food Delivery System</h1>
            <p className="text-xl text-white/90">Select your role to continue</p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Customer Card */}
            <button
              onClick={() => handleRoleSelect('customer')}
              className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-3xl transform hover:scale-105 transition-all duration-300 text-center group"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 transition-colors">
                <svg className="w-8 h-8 text-blue-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Customer</h3>
              <p className="text-gray-600 text-sm">Browse menu and place orders</p>
            </button>

            {/* Restaurant Card */}
            <button
              onClick={() => handleRoleSelect('restaurant')}
              className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-3xl transform hover:scale-105 transition-all duration-300 text-center group"
            >
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500 transition-colors">
                <svg className="w-8 h-8 text-orange-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Restaurant</h3>
              <p className="text-gray-600 text-sm">Manage and prepare orders</p>
            </button>

            {/* Delivery Card */}
            <button
              onClick={() => handleRoleSelect('delivery')}
              className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-3xl transform hover:scale-105 transition-all duration-300 text-center group"
            >
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500 transition-colors">
                <svg className="w-8 h-8 text-green-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Delivery</h3>
              <p className="text-gray-600 text-sm">Pick up and deliver orders</p>
            </button>

            {/* Admin Card */}
            <button
              onClick={() => handleRoleSelect('admin')}
              className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-3xl transform hover:scale-105 transition-all duration-300 text-center group"
            >
              <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-500 transition-colors">
                <svg className="w-8 h-8 text-indigo-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Admin</h3>
              <p className="text-gray-600 text-sm">Monitor and manage system</p>
            </button>
          </div>

          {/* Footer */}
          <div className="text-center mt-12">
            <p className="text-white/80 text-sm">
              Built with React + TypeScript • Full-featured delivery management system
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Back Button (Fixed) */}
      {currentView !== 'role-selection' && (
        <button
          onClick={handleBackToRoleSelection}
          className="fixed top-4 left-4 z-50 bg-white text-gray-700 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center gap-2 font-semibold hover:bg-gray-50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Change Role
        </button>
      )}

      {/* View Components */}
      {currentView === 'customer' && <CustomerView />}
      {currentView === 'restaurant' && <RestaurantView />}
      {currentView === 'delivery' && <DeliveryView />}
      {currentView === 'admin' && <AdminView />}

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;