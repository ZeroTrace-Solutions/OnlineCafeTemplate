import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
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
      <PreviewBanner />
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

const PreviewBanner = () => {
  const { t } = useTranslation();
  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-[2000] px-4 py-2 bg-gradient-to-r from-caramel/90 to-caramel backdrop-blur-md flex items-center justify-center border-b border-black/10 shadow-lg pointer-events-none select-none"
    >
      <div className="flex items-center space-x-2">
        <div className="w-1.5 h-1.5 rounded-full bg-coffee-dark animate-pulse" />
        <span className="text-coffee-dark font-black uppercase tracking-[0.2em] text-[8px] md:text-[10px] text-center drop-shadow-sm">
          {t('preview_mode')}
        </span>
      </div>
    </motion.div>
  );
};

import { useTranslation } from 'react-i18next';

const LoadingScreen = () => {
  const { t } = useTranslation();
  return (
    <div className="h-screen w-screen bg-[#120c0a] flex items-center justify-center p-12">
      <div className="flex flex-col items-center space-y-8">
        <div className="relative w-24 h-24 flex items-center justify-center">
            <div className="absolute inset-0 primary-gradient rounded-3xl blur-2xl opacity-20 animate-pulse" />
            <img src="/logo.png" className="w-20 h-20 object-contain animate-pulse-slow relative z-10" alt="Logo" />
        </div>
        <div className="space-y-2 text-center">
            <div className="w-12 h-1 bg-caramel/20 mx-auto rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="h-full bg-caramel"
                />
            </div>
            <span className="text-caramel font-black uppercase tracking-[0.4em] text-[10px] block pt-2">{t('brewing')}</span>
        </div>
      </div>
    </div>
  );
};

export default App;
