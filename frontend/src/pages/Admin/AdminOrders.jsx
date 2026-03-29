import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  ChevronRight, 
  XCircle, 
  CheckCircle2, 
  Clock, 
  Truck, 
  Coffee, 
  Search, 
  Filter, 
  MapPin, 
  Phone, 
  AlertCircle, 
  DollarSign, 
  CreditCard, 
  MoreVertical,
  ChevronDown
} from 'lucide-react';
import dataCenter from '../../data/dataCenter';
import { useTranslation } from 'react-i18next';

const AdminOrders = () => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const [orders, setOrders] = useState(dataCenter.orders);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const updateOrderStatus = (id, newStatus) => {
        setOrders(orders.map(order => 
            order.id === id ? { ...order, status: newStatus } : order
        ));
    };

    const statusOptions = ['preparing', 'ready', 'delivering', 'delivered', 'rejected'];

    const filteredOrders = orders.filter(order => {
        const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
        const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             order.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const getStatusStyles = (status) => {
        switch(status) {
            case 'delivered': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'rejected': return 'bg-red-500/10 text-red-400 border-red-500/20';
            case 'preparing': return 'bg-caramel/10 text-caramel border-caramel/20';
            case 'ready': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'delivering': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
            default: return 'bg-white/5 text-white/40 border-white/10';
        }
    };

    return (
        <div className={`space-y-10 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className={`flex flex-col md:flex-row justify-between items-start md:items-end gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="space-y-2">
                    <h2 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase tracking-tighter">
                        {t('orders_management')}
                    </h2>
                    <p className="text-white/40 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                        {t('manage_orders_desc')}
                    </p>
                </div>
                <div className={`flex flex-wrap gap-4 w-full md:w-auto ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="relative flex-1 md:w-80">
                        <Search size={18} className={`absolute top-1/2 -translate-y-1/2 text-white/20 ${isRTL ? 'right-4' : 'left-4'}`} />
                        <input 
                            type="text" 
                            placeholder={t('search_orders_placeholder')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className={`w-full bg-white/5 border border-white/10 rounded-2xl p-4 transition-all focus:border-caramel/50 outline-none text-sm font-bold ${isRTL ? 'pr-12 text-right' : 'pl-12 text-left'}`}
                        />
                    </div>
                </div>
            </div>

            {/* Filter Scrollable */}
            <div className={`flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {['all', ...statusOptions].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`px-6 py-3 rounded-xl font-black text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap transition-all border-2 ${
                            filterStatus === status 
                            ? 'bg-caramel text-coffee-dark border-caramel shadow-lg shadow-caramel/20 scale-[1.05]' 
                            : 'bg-white/5 text-white/40 border-transparent hover:border-white/10'
                        }`}
                    >
                        {t(status)}
                    </button>
                ))}
            </div>

            {/* Orders List */}
            <div className="space-y-6">
                <AnimatePresence mode="popLayout">
                    {filteredOrders.map((order, idx) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white/5 border border-white/5 p-6 md:p-10 rounded-[3rem] backdrop-blur-3xl group hover:bg-white/10 transition-colors"
                        >
                            <div className={`flex flex-col lg:flex-row gap-8 ${isRTL ? 'lg:flex-row-reverse' : ''}`}>
                                {/* Order ID & Icon */}
                                <div className={`flex items-center lg:flex-col lg:items-start justify-between lg:justify-start gap-4 lg:w-48 shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-caramel">
                                        {order.type === 'delivery' ? <Truck size={32} /> : <Coffee size={32} />}
                                    </div>
                                    <div className={`space-y-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                                        <p className="text-sm font-black text-white">{order.id}</p>
                                        <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{order.date}</p>
                                    </div>
                                </div>

                                {/* Customer & Details */}
                                <div className={`flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${isRTL ? 'text-right' : 'text-left'}`}>
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-caramel uppercase tracking-[0.4em]">{t('customer')}</p>
                                            <h4 className="text-xl font-black text-white">{order.customer.name}</h4>
                                            <div className={`flex items-center gap-2 text-white/40 text-[11px] font-bold uppercase tracking-widest ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                <Phone size={12} />
                                                <span>{order.customer.phone}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-[10px] font-black text-caramel uppercase tracking-[0.4em]">{t('items')}</p>
                                        <div className="space-y-2">
                                            {order.items.map((item, i) => (
                                                <div key={i} className={`flex justify-between items-center text-[12px] font-bold ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                    <span className="text-white/60">{item.qty}x {t(item.name)}</span>
                                                    <span className="text-white/40">{item.price} {t('currency_symbol')}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <p className="text-[10px] font-black text-caramel uppercase tracking-[0.4em]">{t('summary')}</p>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-2xl font-black text-white leading-none">{order.total} {t('currency_symbol')}</p>
                                            <div className={`flex items-center gap-2 mt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                {order.payment === 'credit' ? <CreditCard size={14} className="text-white/40" /> : <DollarSign size={14} className="text-white/40" />}
                                                <span className="text-[10px] font-black uppercase text-white/40 tracking-widest">{t(order.payment)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Status & Actions */}
                                <div className="space-y-6 lg:w-48 shrink-0">
                                    <div className={`flex flex-col gap-4 ${isRTL ? 'items-end' : 'items-start'}`}>
                                        <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${getStatusStyles(order.status)}`}>
                                            {t(order.status)}
                                        </span>
                                        
                                        <div className="relative w-full">
                                            <select 
                                                value={order.status}
                                                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                className={`w-full bg-[#1a1a1a] border border-white/5 p-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-white/60 focus:text-white outline-none appearance-none transition-all cursor-pointer ${isRTL ? 'pr-4 pl-10 text-right' : 'pl-4 pr-10 text-left'}`}
                                            >
                                                {statusOptions.map(opt => (
                                                    <option key={opt} value={opt} className="bg-[#1a1a1a]">{t(opt)}</option>
                                                ))}
                                            </select>
                                            <div className={`absolute top-1/2 -translate-y-1/2 pointer-events-none text-white/20 ${isRTL ? 'left-4' : 'right-4'}`}>
                                                <ChevronDown size={14} />
                                            </div>
                                        </div>

                                        {order.status !== 'rejected' && order.status !== 'delivered' && (
                                            <button 
                                                onClick={() => updateOrderStatus(order.id, 'rejected')}
                                                className={`w-full flex items-center justify-center gap-2 py-3 bg-red-500/10 text-red-500 border border-red-500/10 hover:bg-red-500/20 rounded-xl transition-all font-black text-[10px] uppercase tracking-widest ${isRTL ? 'flex-row-reverse' : ''}`}
                                            >
                                                <XCircle size={14} />
                                                <span>{t('reject_order')}</span>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            
            {filteredOrders.length === 0 && (
                <div className="p-20 flex flex-col items-center justify-center opacity-20 space-y-6">
                    <ShoppingBag size={80} strokeWidth={1} />
                    <p className="font-black uppercase tracking-widest text-xs md:text-sm">{t('no_orders_match')}</p>
                </div>
            )}
        </div>
    );
};

export default AdminOrders;
