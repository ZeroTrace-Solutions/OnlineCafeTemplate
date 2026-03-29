import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  ShoppingBag, 
  Coffee, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search,
  Globe
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../../components/Common/LanguageToggle';

const AdminLayout = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === 'ar';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { name: 'dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'users', path: '/admin/users', icon: Users },
    { name: 'orders', path: '/admin/orders', icon: ShoppingBag },
    { name: 'products', path: '/admin/products', icon: Coffee },
  ];

  return (
    <div className={`min-h-screen bg-[#0a0a0a] text-white font-sans flex ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 z-[101] w-72 bg-[#121212] border-caramel/10 transition-transform duration-300 md:relative md:translate-x-0
        ${isRTL ? 'right-0 border-l' : 'left-0 border-r'}
        ${isSidebarOpen 
          ? 'translate-x-0' 
          : isRTL ? 'translate-x-full' : '-translate-x-full'} 
      `}>
        <div className="flex flex-col h-full p-6">
          <div className={`flex items-center gap-4 mb-12 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl primary-gradient flex items-center justify-center shadow-lg shadow-caramel/20 p-1.5 overflow-hidden">
              <img src="/logo.png" className="w-full h-full object-contain" alt="Logo" />
            </div>
            <span className="text-xl font-black uppercase tracking-tighter">{t('hub_admin')}</span>
          </div>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) => `
                  flex items-center gap-4 px-4 py-4 rounded-2xl transition-all font-bold text-sm uppercase tracking-widest
                  ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}
                  ${isActive 
                    ? 'bg-caramel text-coffee-dark shadow-lg shadow-caramel/20 scale-[1.02]' 
                    : 'text-white/40 hover:text-white hover:bg-white/5'}
                `}
              >
                <item.icon size={20} />
                <span>{t(item.name)}</span>
              </NavLink>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/5">
            <button 
              onClick={() => navigate('/')}
              className={`flex items-center gap-4 px-4 py-4 w-full rounded-2xl text-white/40 hover:text-red-400 hover:bg-red-500/5 transition-all font-bold text-sm uppercase tracking-widest ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}
            >
              <LogOut size={20} />
              <span>{t('logout')}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Header */}
        <header className={`h-20 border-b border-white/5 bg-[#0d0d0d]/80 backdrop-blur-xl flex items-center justify-between px-4 md:px-10 shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 md:hidden text-white/40 hover:text-white transition-colors"
            >
              <Menu size={24} />
            </button>
            <div className={`hidden md:flex items-center bg-white/5 border border-white/10 rounded-xl px-4 py-2 w-80 focus-within:border-caramel/50 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Search size={18} className="text-white/20" />
              <input 
                type="text" 
                placeholder={t('quick_search')} 
                className={`bg-transparent border-none outline-none text-sm w-full font-medium ${isRTL ? 'pr-3 text-right' : 'pl-3 text-left'}`}
              />
            </div>
          </div>

          <div className={`flex items-center gap-2 md:gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
            <LanguageToggle />
            <div className={`flex items-center gap-2 md:gap-3 ${isRTL ? 'flex-row-reverse text-right' : 'text-left'} ${isRTL ? 'border-r pr-2 md:pr-4' : 'border-l pl-2 md:pl-4'} border-white/5`}>
              <div className="hidden lg:block">
                <p className="text-sm font-black text-white leading-none text-nowrap">{t('admin_hub')}</p>
                <p className="text-[10px] font-bold text-caramel uppercase tracking-widest mt-1">{t('super_user')}</p>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-caramel/20 flex items-center justify-center border border-caramel/20 text-caramel font-black text-xs md:text-sm shrink-0">
                AH
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-10 no-scrollbar">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
