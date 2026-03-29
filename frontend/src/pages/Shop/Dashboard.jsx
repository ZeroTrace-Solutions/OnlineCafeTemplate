import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/authContext';
import { useTheme } from '../../context/themeContext';
import { LayoutDashboard, LogOut, Settings, Sun, Moon, Globe } from 'lucide-react';

const Dashboard = () => {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  return (
    <div className="min-h-screen flex sidebar-container">
      {/* Premium Sidebar */}
      <motion.aside
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="w-72 glass border-r h-screen sticky top-0 flex flex-col p-6 space-y-8"
      >
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <div className="w-10 h-10 primary-gradient rounded-xl" />
          <h2 className="text-xl font-bold">Enterprise UI</h2>
        </div>

        <nav className="flex-1 space-y-2">
          <SidebarItem icon={<LayoutDashboard size={20} />} label={t('dashboard')} active />
          <SidebarItem icon={<Settings size={20} />} label={t('settings')} />
        </nav>

        <div className="space-y-4 pt-6 border-t border-slate-800">
          <div className="flex items-center justify-between text-sm text-slate-400">
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => changeLanguage(i18n.language === 'en' ? 'ar' : 'en')}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors flex items-center space-x-2 rtl:space-x-reverse"
            >
              <Globe size={18} />
              <span>{i18n.language === 'en' ? 'AR' : 'EN'}</span>
            </button>
          </div>

          <button
            onClick={logout}
            className="w-full flex items-center space-x-3 rtl:space-x-reverse p-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all font-medium"
          >
            <LogOut size={20} />
            <span>{t('logout')}</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 p-10 overflow-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <motion.h1
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-4xl font-black mb-2"
            >
              {t('welcome')}, {user?.displayName || 'User'}!
            </motion.h1>
            <p className="text-slate-400">Enterprise dashboard powered by React 19 & Tailwind 4.</p>
          </div>
          <div className="p-1 px-4 rounded-full glass text-xs font-semibold uppercase tracking-widest text-primary border-primary/20">
            {user?.role} MODE
          </div>
        </header>

        <section className="dashboard-grid">
          <StatCard title="Total Revenue" value="$24,500.00" trend="+12.5%" />
          <StatCard title="Active Sessions" value="1,284" trend="+5.2%" />
          <StatCard title="Total Orders" value="856" trend="-2.4%" />
          <StatCard title="Satisfaction" value="98%" trend="+0.5%" />
        </section>

        <section className="mt-12">
          <div className="glass-card h-96 flex items-center justify-center text-slate-500 border-dashed border-2 border-slate-800">
            Main Analytics Visualization (Framer Motion Chart Placeholder)
          </div>
        </section>
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, active = false }) => (
  <button
    className={`w-full flex items-center space-x-4 rtl:space-x-reverse p-4 rounded-xl transition-all font-medium ${
      active ? 'primary-gradient text-white shadow-lg' : 'hover:bg-slate-800 text-slate-400'
    }`}
  >
    {icon}
    <span>{label}</span>
  </button>
);

const StatCard = ({ title, value, trend }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="glass-card"
  >
    <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">{title}</p>
    <div className="flex items-end justify-between">
      <h3 className="text-3xl font-bold tracking-tight">{value}</h3>
      <span className={`text-xs font-bold px-2 py-1 rounded-md ${
        trend.startsWith('+') ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
      }`}>
        {trend}
      </span>
    </div>
  </motion.div>
);

export default Dashboard;
