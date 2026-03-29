import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ChevronLeft, 
    ChevronRight, 
    Coffee, 
    ShoppingBag, 
    Minus, 
    Plus, 
    Trash2 
} from 'lucide-react';
import { useCart } from '../../context/cartContext';
import LanguageToggle from '../../components/Common/LanguageToggle';
import bgImage from '../../assets/images/background.png';

const CartPage = () => {
    const { t, i18n } = useTranslation();
    const { cart, removeFromCart, updateQuantity, subtotal } = useCart();
    const navigate = useNavigate();

    const isRTL = i18n.language === 'ar';
    const tax = subtotal * 0.10;
    const total = subtotal + tax;

    return (
        <div className="min-h-[100dvh] bg-coffee-dark text-white flex flex-col p-6 md:p-12 font-sans overflow-hidden selection:bg-caramel selection:text-coffee-dark">
            <div className="fixed inset-0 z-[-1] overflow-hidden bg-coffee-dark">
                <img
                    src={bgImage}
                    className="w-full h-[105dvh] object-cover brightness-[0.2] contrast-[1.2]"
                    alt="Background"
                />
                <div className="absolute inset-0 backdrop-blur-[4px] bg-coffee-dark/40" />
            </div>

            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0">
                <span className="text-[6rem] md:text-[20rem] font-black uppercase tracking-tighter text-white opacity-[0.03] select-none block leading-none">
                    {t('my_order')}
                </span>
            </div>

            <header className="relative flex justify-between items-center mb-12 z-20">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate('/')}
                        className="p-4 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full text-white transition-all active:scale-90"
                    >
                        {isRTL ? <ChevronRight size={28} /> : <ChevronLeft size={28} />}
                    </button>
                    <LanguageToggle />
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full primary-gradient shadow-xl shadow-caramel/20 flex items-center justify-center">
                        <Coffee size={20} className="text-coffee-dark" />
                    </div>
                    <span className="font-black uppercase tracking-tighter text-xl text-white hidden md:inline">{t('bag')}</span>
                </div>
                <div className="w-14 h-14" />
            </header>

            <div className="relative flex-1 space-y-8 overflow-y-auto no-scrollbar pb-20 z-10 max-w-4xl mx-auto w-full">
                {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center space-y-6 opacity-20">
                        <ShoppingBag size={80} strokeWidth={1} />
                        <p className="font-black uppercase tracking-[0.4em] text-xs">{t('bag_empty')}</p>
                        <button
                            onClick={() => navigate('/')}
                            className="px-8 py-4 border border-white/20 rounded-2xl hover:bg-white/5 transition-all font-bold"
                        >
                            {t('go_menu')}
                        </button>
                    </div>
                ) : (
                    <AnimatePresence mode="popLayout">
                        {cart.map((item) => (
                            <motion.div
                                key={item.cartItemId}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, x: isRTL ? 100 : -100 }}
                                className={`flex items-center gap-6 p-6 md:p-8 rounded-[3rem] bg-white/5 border border-white/5 backdrop-blur-2xl hover:bg-white/10 transition-colors group ${isRTL ? 'flex-row-reverse' : ''}`}
                            >
                                <div className="w-20 h-20 md:w-28 md:h-28 bg-white/5 rounded-[1.5rem] md:rounded-[2.5rem] flex items-center justify-center flex-shrink-0 relative">
                                    <img src={item.product.image} alt={t(item.product.name)} className="w-full h-full object-contain drop-shadow-2xl scale-110 md:scale-125" />
                                </div>
                                <div className={`flex-1 flex flex-col justify-between md:flex-row md:items-center gap-2 md:gap-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                                    <div className="space-y-1">
                                        <p className="font-black text-xl md:text-3xl text-white leading-tight">{t(item.product.name)}</p>
                                        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse justify-start' : 'justify-start'}`}>
                                            <span className="px-2 py-0.5 bg-caramel/10 text-caramel text-[8px] md:text-[10px] font-black uppercase rounded-lg border border-caramel/20">
                                                {t(item.selectedVariants?.size || 'medium')}
                                            </span>
                                            <span className="text-white/40 text-[10px] md:text-xs font-black uppercase tracking-widest">
                                                {(item.pricePerUnit * item.quantity).toFixed(2)} {t('currency_symbol')}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={`flex items-center gap-4 md:gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                        <div className={`flex items-center bg-black/20 rounded-xl md:rounded-2xl p-1 md:p-2 border border-white/5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                            <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} className="p-1 md:p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-all"><Minus size={14} /></button>
                                            <span className="w-8 md:w-12 text-center text-sm md:text-lg font-black text-white">{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)} className="p-1 md:p-2 hover:bg-white/10 rounded-lg text-white/40 hover:text-white transition-all"><Plus size={14} /></button>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.cartItemId)}
                                            className="p-3 md:p-4 hover:bg-red-500/10 rounded-xl md:rounded-2xl text-white/20 hover:text-red-400 transition-all border border-transparent hover:border-red-500/20"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>

            {cart.length > 0 && (
                <footer className="relative mt-auto pt-6 pb-6 md:pb-10 z-20 max-w-4xl mx-auto w-full">
                    <div className={`flex flex-col md:flex-row gap-6 md:gap-8 items-center justify-between p-6 md:p-10 rounded-[2rem] md:rounded-[4rem] bg-white/5 border border-white/10 backdrop-blur-3xl shadow-2xl ${isRTL ? 'md:flex-row-reverse' : ''}`}>
                        <div className={`flex flex-col md:flex-row gap-4 md:gap-12 items-center text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
                            <div className="space-y-0.5">
                                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-white/20">{t('tax')}</p>
                                <p className="text-sm md:text-xl font-black text-white/60">{tax.toFixed(2)} {t('currency_symbol')}</p>
                            </div>
                            <div className="w-px h-10 bg-white/10 hidden md:block" />
                            <div className="space-y-0.5">
                                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-caramel">{t('total_amount')}</p>
                                <p className="text-3xl md:text-5xl font-black text-white">{total.toFixed(2)} {t('currency_symbol')}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/checkout')}
                            className={`w-full md:w-auto px-8 md:px-12 py-5 md:py-8 primary-gradient text-coffee-dark rounded-[1.5rem] md:rounded-[2.5rem] font-black text-lg md:text-2xl flex items-center justify-center gap-4 md:gap-6 shadow-2xl shadow-caramel/20 hover:scale-[1.02] active:scale-95 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}
                        >
                            <span>{t('checkout')}</span>
                            {isRTL ? <ChevronLeft size={24} className="md:w-8 md:h-8" /> : <ChevronRight size={24} className="md:w-8 md:h-8" />}
                        </button>
                    </div>
                </footer>
            )}
        </div>
    );
};

export default CartPage;
