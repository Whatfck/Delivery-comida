import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CustomerView } from './pages/CustomerView';
import { RestaurantView } from './pages/RestaurantView';
import { DeliveryView } from './pages/DeliveryView';
import { AdminView } from './pages/AdminView';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* Navigation Header */}
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500 text-white p-2 rounded-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Food Delivery MVP</h1>
                  <p className="text-sm text-gray-600">Sistema de Delivery de Comida</p>
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href="/customer"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  👤 Cliente
                </a>
                <a
                  href="/restaurant"
                  className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  🍽️ Restaurante
                </a>
                <a
                  href="/delivery"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  🚚 Delivery
                </a>
                <a
                  href="/admin"
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                >
                  📊 Admin
                </a>
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          {/* Default route redirects to customer view */}
          <Route path="/" element={<Navigate to="/customer" replace />} />

          {/* Customer routes */}
          <Route path="/customer" element={<CustomerView />} />

          {/* Restaurant routes */}
          <Route path="/restaurant" element={<RestaurantView />} />

          {/* Delivery routes */}
          <Route path="/delivery" element={<DeliveryView />} />

          {/* Admin routes */}
          <Route path="/admin" element={<AdminView />} />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/customer" replace />} />
        </Routes>

        {/* Toast notifications */}
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
          theme="light"
        />
      </div>
    </Router>
  );
}

export default App;
