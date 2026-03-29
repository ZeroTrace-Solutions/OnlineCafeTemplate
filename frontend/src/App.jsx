import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/authContext';

// Lazy loading pages for optimized performance
const LandingPage = lazy(() => import('./pages/Shop/LandingPage'));
const CartPage = lazy(() => import('./pages/Shop/CartPage'));
const CheckoutPage = lazy(() => import('./pages/Shop/CheckoutPage'));
const OrdersPage = lazy(() => import('./pages/Shop/OrdersPage'));
const Login = lazy(() => import('./pages/Shop/Login'));

// Admin Pages
const AdminLayout = lazy(() => import('./pages/Admin/AdminLayout'));
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard'));
const AdminUsers = lazy(() => import('./pages/Admin/AdminUsers'));
const AdminOrders = lazy(() => import('./pages/Admin/AdminOrders'));
const AdminProducts = lazy(() => import('./pages/Admin/AdminProducts'));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* Main Landing & Menu */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />

          {/* Auth Flow */}
          <Route path="/login" element={<Login />} />

          {/* Admin Suite */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="products" element={<AdminProducts />} />
          </Route>

          {/* Standard Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

import { useTranslation } from 'react-i18next';

const LoadingScreen = () => {
  const { t } = useTranslation();
  return (
    <div className="h-screen w-screen bg-[#120c0a] flex items-center justify-center p-12">
      <div className="flex flex-col items-center space-y-8 animate-fade-in">
        <div className="w-16 h-16 primary-gradient rounded-full blur-2xl opacity-20 border-caramel absolute shadow-2xl" />
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-caramel relative" />
        <span className="text-caramel font-black uppercase tracking-widest text-[10px]">{t('brewing')}</span>
      </div>
    </div>
  );
};

export default App;
