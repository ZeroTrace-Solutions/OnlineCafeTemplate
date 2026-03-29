import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
    ChevronLeft, 
    ChevronRight, 
    Coffee, 
    Package, 
    Truck, 
    CheckCircle2, 
    MapPin, 
    Receipt, 
    Send,
    ShoppingCart
} from 'lucide-react';
import { useCart } from '../../context/cartContext';
import LanguageToggle from '../../components/Common/LanguageToggle';
import bgImage from '../../assets/images/background.png';

const OrdersPage = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { orders, setOrders } = useCart();
    const [selectedOrder, setSelectedOrder] = useState(null);

    const isRTL = i18n.language === 'ar';

    const getStatusSteps = (type) => {
        // Use internal keys for logic
        if (type === 'delivery' || type === 'توصيل') return ['preparing', 'delivering', 'delivered'];
        return ['preparing', 'ready', 'picked_up'];
    };

    const getStatusIndex = (order) => {
        const steps = getStatusSteps(order.type);
        return steps.indexOf(order.status);
    };

    // Live Simulator: Advance statuses automatically
    useEffect(() => {
        const interval = setInterval(() => {
            setOrders(prevOrders => prevOrders.map(order => {
                const steps = getStatusSteps(order.type);
                const currentIdx = steps.indexOf(order.status);
                // Ensure we handle previously saved Arabic statuses by defaulting them to idx 0 if not found
                const safeIdx = currentIdx === -1 ? 0 : currentIdx;
                
                if (safeIdx < steps.length - 1 && Math.random() > 0.6) {
                    return { ...order, status: steps[safeIdx + 1] };
                }
                return order;
            }));
        }, 8000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (selectedOrder) {
            const updated = orders.find(o => o.id === selectedOrder.id);
            if (updated && updated.status !== selectedOrder.status) {
                setSelectedOrder(updated);
            }
        }
    }, [orders, selectedOrder]);

    const getMapCoords = (status, type) => {
        const steps = getStatusSteps(type);
        const idx = steps.indexOf(status);
        const safeIdx = idx === -1 ? 0 : idx;
        if (safeIdx === 0) return { x: 50, y: 50 };
        if (safeIdx === 1) return { x: 200, y: 150 };
        return { x: 350, y: 250 };
    };

    return (
        <div className="min-h-[100dvh] bg-transparent text-white p-6 md:p-12 font-sans overflow-hidden relative">
            <div className="fixed inset-0 z-0">
                <img src={bgImage} className="w-full h-full object-cover opacity-40 brightness-75 transition-opacity duration-1000" />
                <div className="absolute inset-0 bg-coffee-dark/50 backdrop-blur-2xl" />
            </div>

            <div className="relative z-10 w-full h-full max-w-7xl mx-auto">

                <header className="relative z-10 flex items-center justify-between mb-6 md:mb-12">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/')}
                            className="p-3 md:p-4 bg-white/5 border border-white/10 rounded-2xl text-white hover:bg-white/10 transition-all active:scale-95 shadow-xl"
                        >
                            {isRTL ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                        </button>
                        <LanguageToggle />
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl primary-gradient shadow-xl shadow-caramel/20 flex items-center justify-center p-1.5 overflow-hidden mb-2">
                            <img src="/logo.png" className="w-full h-full object-contain" alt="Logo" />
                        </div>
                        <h1 className="text-lg md:text-2xl font-black uppercase tracking-widest text-center hidden md:block">{t('orders_title')}</h1>
                    </div>
                    <div className="w-10 md:w-24" />
                </header>

                <div className="relative z-10 max-w-5xl mx-auto flex-1 w-full flex flex-col items-center justify-start overflow-hidden pt-2 md:pt-8">

                    <AnimatePresence mode="wait">
                        {!selectedOrder ? (
                            <motion.div
                                key="list"
                                initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: isRTL ? -50 : 50 }}
                                className="w-full space-y-4 overflow-y-auto no-scrollbar pr-2"
                            >
                                {orders.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center space-y-6 opacity-20 py-20">
                                        <Package size={80} strokeWidth={1} />
                                        <p className="font-black uppercase tracking-widest text-xs">{t('no_active_orders')}</p>
                                        <button onClick={() => navigate('/')} className="px-8 py-4 border border-white/20 rounded-2xl font-bold uppercase tracking-widest text-[10px]">{t('start_ordering')}</button>
                                    </div>
                                ) : (
                                    orders.map((order, idx) => (
                                        <motion.div
                                            key={order.id}
                                            layoutId={order.id}
                                            onClick={() => setSelectedOrder(order)}
                                            className={`bg-white/5 border border-white/10 rounded-[2rem] p-5 md:p-8 backdrop-blur-[8px] hover:bg-white/10 transition-all cursor-pointer flex justify-between items-center group active:scale-[0.98] ${isRTL ? 'flex-row-reverse' : ''}`}
                                        >
                                            <div className={`flex-1 min-w-0 flex flex-col space-y-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                                                <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                    <span className="px-2 py-0.5 bg-caramel/10 text-caramel rounded-md font-black text-[8px] md:text-[9px] uppercase border border-caramel/20 shrink-0">
                                                        {t(order.type)}
                                                    </span>
                                                    <span className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest truncate">{order.id}</span>
                                                </div>
                                                <h2 className="text-base md:text-2xl font-black text-white leading-tight">
                                                    {(() => {
                                                        const count = order.items.length;
                                                        const limit = 2;
                                                        if (count <= limit) return order.items.map(i => t(i.name)).join(t('and'));
                                                        const slice = order.items.slice(0, limit);
                                                        return slice.map(i => t(i.name)).join(t('and')) + t('and_x_more', { count: count - limit });
                                                    })()}
                                                </h2>
                                                <p className="text-white/40 text-[8px] md:text-[9px] font-bold uppercase tracking-widest">{order.date}</p>
                                            </div>
                                            <div className={`flex items-center gap-4 md:gap-8 shrink-0 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                <div className={`flex flex-col gap-1 ${isRTL ? 'items-end' : 'items-start'}`}>
                                                    <p className="text-lg md:text-2xl font-black text-caramel leading-none">{order.total.toFixed(2)}<span className="text-[10px] md:text-xs ml-1">{t('currency_symbol')}</span></p>
                                                    <motion.span
                                                        key={order.status}
                                                        initial={{ opacity: 0, y: -5 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className={`text-[7px] md:text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full text-center whitespace-nowrap ${order.status === 'delivered' || order.status === 'picked_up'
                                                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                                : 'bg-caramel/20 text-caramel border border-caramel/30 animate-pulse'
                                                            }`}
                                                    >
                                                        {t(order.status)}
                                                    </motion.span>
                                                </div>
                                                <div className={`transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 translate-x-1 group-hover:-translate-x-1' : ''}`}>
                                                    <ChevronRight size={20} className="text-white/20 group-hover:text-caramel transition-colors" />
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="detail"
                                initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: isRTL ? 50 : -50 }}
                                className={`w-full h-full flex flex-col md:flex-row gap-6 overflow-y-auto no-scrollbar ${isRTL ? 'md:flex-row-reverse' : ''}`}
                            >
                                <div className="w-full md:w-1/2 p-8 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-[4px] flex flex-col justify-between">
                                    <div className="space-y-6">
                                        <div className={`flex justify-between items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                                            <h2 className={`text-2xl font-black ${isRTL ? 'text-right' : 'text-left'}`}>{t('receipt')}</h2>
                                            <button onClick={() => setSelectedOrder(null)} className="text-white/30 hover:text-white transition-colors">
                                                {isRTL ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
                                            </button>
                                        </div>
                                        <div className="space-y-3">
                                            {selectedOrder.items.map((item, i) => (
                                                <div key={i} className={`flex justify-between items-center text-white/60 font-bold uppercase tracking-wider text-sm ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                    <span>{item.qty}x {t(item.name)}</span>
                                                    <span>{item.price.toFixed(2)} {t('currency_symbol')}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="pt-6 border-t border-white/10 space-y-2">
                                        <div className={`flex justify-between text-white/40 text-xs font-black uppercase tracking-widest ${isRTL ? 'flex-row-reverse' : ''}`}>
                                            <span>{t('subtotal_tax')}</span>
                                            <span>{selectedOrder.total.toFixed(2)} {t('currency_symbol')}</span>
                                        </div>
                                        <div className={`flex justify-between text-3xl font-black text-caramel ${isRTL ? 'flex-row-reverse' : ''}`}>
                                            <span>{t('total')}</span>
                                            <span>{selectedOrder.total.toFixed(2)} {t('currency_symbol')}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full md:w-1/2 space-y-6 flex flex-col h-full justify-between">
                                    <div className="p-8 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-[8px] space-y-8">
                                        <div className="flex justify-between items-center">
                                            <p className={`text-[10px] font-black uppercase tracking-[0.4em] text-caramel w-full ${isRTL ? 'text-right' : 'text-left'}`}>{t('track_order')}</p>
                                        </div>
                                        <div className={`flex justify-between relative ${isRTL ? 'flex-row-reverse' : ''}`}>
                                            <div className="absolute top-4 left-4 right-4 h-1 bg-white/10 z-0" />
                                            {getStatusSteps(selectedOrder.type).map((step, idx) => {
                                                const isActive = idx <= getStatusIndex(selectedOrder);
                                                return (
                                                    <div key={step} className="relative z-10 flex flex-col items-center gap-4">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isActive ? 'primary-gradient shadow-lg shadow-caramel/30 text-coffee-dark' : 'bg-white/10 text-white/20'}`}>
                                                            {idx === 0 ? <Coffee size={14} /> : idx === 1 ? (selectedOrder.type === 'delivery' || selectedOrder.type === 'توصيل' ? <Truck size={14} /> : <Send size={14} />) : <CheckCircle2 size={14} />}
                                                        </div>
                                                        <span className={`text-[8px] font-black uppercase tracking-widest ${isActive ? 'text-caramel' : 'text-white/20'}`}>{t(step)}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {(() => {
                                        const isFinished = selectedOrder.status === 'delivered' || selectedOrder.status === 'picked_up' || selectedOrder.status === 'تم التوصيل' || selectedOrder.status === 'تم الاستلام';
                                        const themeColor = isFinished ? '#10b981' : '#d4a373';
                                        
                                        return (
                                            <div className="flex-1 p-8 bg-white/10 border border-white/10 rounded-[2rem] backdrop-blur-[8px] relative overflow-hidden group">
                                                <div className="absolute inset-0 opacity-20">
                                                    <svg viewBox="0 0 400 300" className={`w-full h-full fill-none ${isRTL ? 'scale-x-[-1]' : ''}`}>
                                                        <motion.path 
                                                            animate={{ stroke: isFinished ? '#10b981' : 'rgba(255,255,255,0.5)' }}
                                                            d="M50 50 C 100 20, 200 150, 350 250" 
                                                            strokeDasharray="10 5" 
                                                            strokeWidth="2" 
                                                        />
                                                        
                                                        <circle cx="50" cy="50" r="4" fill="white" opacity="0.2" />
                                                        <circle cx="350" cy="250" r="4" fill="white" opacity="0.2" />
                                                        
                                                        <motion.circle 
                                                            animate={{ 
                                                                cx: getMapCoords(selectedOrder.status, selectedOrder.type).x,
                                                                cy: getMapCoords(selectedOrder.status, selectedOrder.type).y,
                                                                fill: themeColor
                                                            }}
                                                            transition={{ type: 'spring', damping: 20, stiffness: 50 }}
                                                            r="8" 
                                                            className="shadow-xl"
                                                        />
                                                        {!isFinished && (
                                                            <motion.circle 
                                                                animate={{ 
                                                                    cx: getMapCoords(selectedOrder.status, selectedOrder.type).x,
                                                                    cy: getMapCoords(selectedOrder.status, selectedOrder.type).y,
                                                                    scale: [1, 2, 1],
                                                                    opacity: [0.5, 0, 0.5]
                                                                }}
                                                                transition={{ duration: 2, repeat: Infinity }}
                                                                r="15" 
                                                                stroke={themeColor} 
                                                                strokeWidth="1"
                                                            />
                                                        )}
                                                    </svg>
                                                </div>
                                                <div className={`relative z-10 h-full flex flex-col justify-end gap-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                                                    <div className={`flex items-center gap-3 text-white/60 font-black text-xs uppercase tracking-widest ${isRTL ? 'justify-end' : 'justify-start'}`}>
                                                        <MapPin size={16} className={isFinished ? "text-emerald-500" : "text-caramel animate-bounce"} />
                                                        <span>{isFinished ? (isRTL ? 'تم الوصول للوجهة' : 'Destination Reached') : (isRTL ? 'تتبع مباشر' : 'Live Tracking')}</span>
                                                    </div>
                                                    <p className="text-white text-sm font-bold uppercase tracking-tighter leading-tight">
                                                        {selectedOrder.status === 'preparing' || selectedOrder.status === 'جاري التحضير' ? t('preparing_order') : 
                                                         selectedOrder.status === 'delivering' || selectedOrder.status === 'قيد التوصيل' ? (isRTL ? 'الطلب في طريقه إليك عبر مندوبنا' : 'Our courier is on the way to you') :
                                                         selectedOrder.status === 'ready' || selectedOrder.status === 'جاهز للاستلام' ? (isRTL ? 'قهوتك ساخنة وجاهزة في الفرع' : 'Your coffee is hot and ready at the counter') :
                                                         (isRTL ? '☕ استمتع بقهوتك الطازجة!' : '☕ Enjoy your fresh coffee!')}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })()}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;
