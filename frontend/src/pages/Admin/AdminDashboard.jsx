import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, DollarSign, Ban, Activity, ArrowUpRight, ArrowDownRight, Coffee, ShoppingBag, Clock } from 'lucide-react';
import dataCenter from '../../data/dataCenter';
import { useTranslation } from 'react-i18next';

const AdminDashboard = () => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const { stats, orders } = dataCenter;

    const cards = [
        { title: 'total_revenue', value: `${stats.revenue.toLocaleString()} ${t('currency_symbol')}`, icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-400/10', trend: +12.5 },
        { title: 'active_users', value: stats.monthly_active_users, icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10', trend: +5.2 },
        { title: 'rejected_orders', value: stats.rejected_orders, icon: Ban, color: 'text-red-400', bg: 'bg-red-400/10', trend: -2.1 },
        { title: 'growth_rate', value: `${stats.growth_rate}%`, icon: TrendingUp, color: 'text-caramel', bg: 'bg-caramel/10', trend: +1.5 },
    ];

    const chartMax = Math.max(...stats.login_stats.map(s => s.count));

    return (
        <div className={`space-y-10 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="space-y-2">
                <h2 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase tracking-tighter">
                    {t('dashboard')}
                </h2>
                <p className="text-white/40 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                    {t('store_overview')}
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white/5 border border-white/5 p-6 rounded-[2rem] backdrop-blur-3xl hover:bg-white/10 transition-colors group"
                    >
                        <div className={`flex justify-between items-start mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <div className={`p-4 rounded-2xl ${card.bg} ${card.color}`}>
                                <card.icon size={24} />
                            </div>
                            <div className={`flex items-center gap-1 font-black text-xs ${card.trend > 0 ? 'text-emerald-400' : 'text-red-400'} ${isRTL ? 'flex-row-reverse' : ''}`}>
                                {card.trend > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                <span>{Math.abs(card.trend)}%</span>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">{t(card.title)}</p>
                            <p className="text-3xl font-black text-white">{card.value}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Login Stats Chart */}
                <div className="lg:col-span-2 bg-white/5 border border-white/5 p-8 rounded-[3rem] backdrop-blur-3xl">
                    <div className={`flex justify-between items-center mb-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="space-y-1">
                            <h3 className="text-xl font-black uppercase tracking-widest">{t('login_activity')}</h3>
                            <p className="text-white/20 text-[10px] font-bold uppercase tracking-widest">{t('current_month_stats')}</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="w-3 h-3 rounded-full bg-caramel shadow-lg shadow-caramel/50" />
                            <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">{t('active_users')}</span>
                        </div>
                    </div>
                    
                    <div className="h-64 flex items-end gap-3 md:gap-6 px-2">
                        {stats.login_stats.map((item, idx) => (
                            <div key={idx} className="flex-1 flex flex-col items-center gap-4 group">
                                <div className="relative w-full flex-1 flex flex-col justify-end">
                                    <motion.div 
                                        initial={{ height: 0 }}
                                        animate={{ height: `${(item.count / chartMax) * 100}%` }}
                                        className="w-full bg-caramel/20 group-hover:bg-caramel/40 transition-colors rounded-t-xl relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-caramel shadow-[0_0_10px_rgba(212,163,115,0.5)]" />
                                    </motion.div>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-caramel text-coffee-dark font-black text-[10px] px-2 py-1 rounded-md pointer-events-none">
                                        {item.count}
                                    </div>
                                </div>
                                <span className="text-[8px] font-black uppercase text-white/20 tracking-tighter truncate w-full text-center">{item.day}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white/5 border border-white/5 p-8 rounded-[3rem] backdrop-blur-3xl flex flex-col h-full">
                    <h3 className={`text-xl font-black uppercase tracking-widest mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>{t('recent_orders')}</h3>
                    <div className="space-y-6 flex-1 overflow-y-auto no-scrollbar pr-2">
                        {orders.slice(0, 5).map((order, idx) => (
                            <div key={idx} className={`flex items-center gap-4 group ${isRTL ? 'flex-row-reverse text-right' : 'text-left'}`}>
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border border-white/5 transition-colors group-hover:bg-white/5 ${
                                    order.status === 'delivered' ? 'text-emerald-400 bg-emerald-400/10' : 
                                    order.status === 'rejected' ? 'text-red-400 bg-red-400/10' : 
                                    'text-caramel bg-caramel/10'
                                }`}>
                                    {order.type === 'delivery' ? <ShoppingBag size={20} /> : <Coffee size={20} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-black text-white truncate">{order.customer.name}</p>
                                    <div className={`flex items-center gap-2 mt-0.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                        <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{order.id}</span>
                                        <span className="w-1 h-1 rounded-full bg-white/10" />
                                        <span className="text-[9px] font-black text-caramel uppercase tracking-widest">{order.total} {t('currency_symbol')}</span>
                                    </div>
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest">{order.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
