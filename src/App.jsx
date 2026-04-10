import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { 
  HomePage, 
  FoodDetailsPage, 
  CartPage, 
  OrdersPage, 
  Dashboard,
  PaymentPage,
  AdminLayout, 
  AdminDashboard, 
  ManageFoodsPage, 
  ManageOrdersPage,
  Auth 
} from './pages';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <CartProvider>
      <Toaster position="bottom-right" reverseOrder={false} />
      <Routes>
        {/* Customer Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/food/:id" element={<FoodDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/auth" element={<Auth />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="foods" element={<ManageFoodsPage />} />
          <Route path="orders" element={<ManageOrdersPage />} />
          <Route path="users" element={<div className="p-8"><h1 className="text-2xl font-bold">Users Management (Coming Soon)</h1></div>} />
        </Route>

        {/* Redirects */}
        <Route path="/profile" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </CartProvider>
  );
};

export default App;