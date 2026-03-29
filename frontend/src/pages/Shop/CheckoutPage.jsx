import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, ShoppingBag, CheckCircle2, ChevronRight, X, ChevronLeft, Coffee, CreditCard, MapPin, User, Phone, Home, Wallet } from 'lucide-react';
import { useCart } from '../../context/cartContext';
import { useAuth } from '../../context/authContext';
import { useGuest } from '../../context/guestContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../../components/Common/LanguageToggle';
import bgImage from '../../assets/images/background.png';

const CheckoutPage = () => {
    const { t, i18n } = useTranslation();
    const { cart, subtotal, clearCart, setOrders } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    
    const isRTL = i18n.language === 'ar';
    const [isSuccess, setIsSuccess] = useState(false);
    const [fulfillment, setFulfillment] = useState('delivery');
    const [paymentMethod, setPaymentMethod] = useState('credit');
    const [showAuthModal, setShowAuthModal] = useState(false);

    useEffect(() => {
        if (!user) {
            setShowAuthModal(true);
        }
    }, [user]);
    
    const [formData, setFormData] = useState({
        name: user?.displayName || '',
        phone: '',
        address: ''
    });

    const tax = subtotal * 0.10;
    const total = subtotal + tax;

    const handleOrder = () => {
        if (!user) {
            setShowAuthModal(true);
            return;
        }

        if (!formData.name || !formData.phone || (fulfillment === 'delivery' && !formData.address)) {
            alert(t('fill_all_fields'));
            return;
        }

        const newOrder = {
            id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
            date: t('just_now'),
            total: total,
            type: fulfillment,
            status: 'preparing',
            payment: paymentMethod,
            customer: formData,
            items: cart.map(item => ({
                name: item.product.name,
                price: item.pricePerUnit,
                qty: item.quantity
            }))
        };
        
        setOrders(prev => [newOrder, ...prev]);
        setIsSuccess(true);
    };

    const finalizeOrder = () => { 
        clearCart(); 
        navigate('/orders'); 
    };

    if (isSuccess) {
        return (
            <div className="min-h-[100dvh] bg-coffee-dark flex flex-col items-center justify-center p-8 text-white font-sans overflow-hidden">
                <div className="fixed inset-0 z-0">
                    <img src={bgImage} className="w-full h-full object-cover opacity-40 brightness-75" />
                    <div className="absolute inset-0 bg-coffee-dark/50 backdrop-blur-[4px]" />
                </div>

                <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0">
                    <span className="text-[6rem] md:text-[20rem] font-black uppercase tracking-tighter text-white opacity-[0.03] select-none block leading-none">
                        {t('receipt')}
                    </span>
                </div>

                <motion.div 
                    initial={{ scale: 0.8, opacity: 0, y: 100 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    className="w-full max-w-xl p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] bg-white/5 border border-white/10 backdrop-blur-3xl shadow-2xl space-y-8 md:space-y-12 relative z-10"
                >
                    <div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
                        <motion.div 
                            initial={{ scale: 0 }} 
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', damping: 10, stiffness: 200, delay: 0.2 }}
                            className="w-16 h-16 md:w-24 md:h-24 primary-gradient rounded-full flex items-center justify-center shadow-2xl shadow-caramel/30"
                        >
                            <CheckCircle2 size={32} className="md:w-12 md:h-12 text-coffee-dark" />
                        </motion.div>
                        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">{t('order_success')}</h2>
                        <p className="text-caramel/80 text-sm md:text-lg font-bold tracking-widest uppercase">{t('thank_you')}</p>
                    </div>

                    <div className="space-y-6 max-h-40 overflow-y-auto no-scrollbar pr-2 border-t border-white/10 pt-8">
                        {cart.map(item => (
                            <div key={item.cartItemId} className={`flex justify-between items-center text-sm font-bold opacity-60 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <span>{item.quantity}x {t(item.product.name)}</span>
                                <span>{(item.pricePerUnit * item.quantity).toFixed(2)} {t('currency_symbol')}</span>
                            </div>
                        ))}
                    </div>

                    <div className="pt-6 md:pt-8 space-y-3 md:space-y-4 border-t border-white/10">
                        <div className={`flex justify-between items-center text-white/40 text-xs md:text-sm font-bold uppercase tracking-widest ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <span>{t('subtotal_tax')}</span>
                            <span>{total.toFixed(2)} {t('currency_symbol')}</span>
                        </div>
                        <div className={`flex justify-between items-center text-3xl md:text-5xl font-black text-caramel drop-shadow-2xl leading-none ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <span>{t('total')}</span>
                            <span>{total.toFixed(2)} {t('currency_symbol')}</span>
                        </div>
                    </div>

                    <button 
                        onClick={finalizeOrder}
                        className="w-full primary-gradient text-coffee-dark py-6 md:py-8 rounded-[2.5rem] font-black text-xl md:text-2xl shadow-2xl shadow-caramel/20 active:scale-95 transition-all"
                    >
                        {t('back_to_menu')}
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-[100dvh] bg-coffee-dark text-white flex flex-col p-6 md:p-12 font-sans overflow-hidden">
            <div className="fixed inset-0 z-[-1] overflow-hidden bg-coffee-dark">
                <img src={bgImage} className="w-full h-[105dvh] object-cover brightness-[0.2] contrast-[1.2]" />
                <div className="absolute inset-0 backdrop-blur-[4px] bg-coffee-dark/40" />
            </div>

            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0">
                <span className="text-[6rem] md:text-[20rem] font-black uppercase tracking-tighter text-white opacity-[0.03] select-none block leading-none">
                    {t('checkout_title')}
                </span>
            </div>

            <header className="relative flex justify-between items-center mb-8 md:mb-16 z-20">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="p-3 md:p-4 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-2xl text-white transition-all active:scale-90">
                        {isRTL ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
                    </button>
                    <LanguageToggle />
                </div>
                <div className={`flex items-center gap-2 md:gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full primary-gradient shadow-xl shadow-caramel/20 flex items-center justify-center">
                        <Coffee size={18} className="text-coffee-dark" />
                    </div>
                    <span className="font-black uppercase tracking-tighter text-lg md:text-xl text-white">{t('checkout_title')}</span>
                </div>
                <div className="w-10 md:w-14" />
            </header>

            <div className="relative flex-1 max-w-4xl mx-auto w-full z-10 space-y-8 md:space-y-12 pb-32 pt-2 md:pt-8">
                <h1 className={`text-4xl md:text-6xl font-black text-white leading-tight ${isRTL ? 'text-right' : 'text-left'}`}>{t('review_pay')}</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="col-span-1 md:col-span-2 space-y-4 md:space-y-6">
                        <p className={`text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-white/20 ${isRTL ? 'text-right' : 'text-left'}`}>{t('fulfillment_method')}</p>
                        <div className={`flex flex-col md:flex-row gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <button 
                                onClick={() => setFulfillment('delivery')}
                                className={`flex-1 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border-2 transition-all flex items-center justify-between group ${
                                    fulfillment === 'delivery' 
                                    ? 'bg-caramel/20 border-caramel shadow-2xl shadow-caramel/20' 
                                    : 'bg-white/5 border-white/5 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 hover:bg-white/10'
                                } ${isRTL ? 'flex-row-reverse' : ''}`}
                            >
                                <div className={`space-y-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                                    <h3 className="text-xl md:text-3xl font-black">{t('delivery')}</h3>
                                    <p className="text-[10px] md:text-xs font-bold text-white/40">{t('express_courier')} • 15-25 {t('minutes')}</p>
                                </div>
                                <Truck size={40} className={fulfillment === 'delivery' ? 'text-caramel' : 'text-white/20'} />
                            </button>
                            <button 
                                onClick={() => setFulfillment('takeaway')}
                                className={`flex-1 p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border-2 transition-all flex items-center justify-between group ${
                                    fulfillment === 'takeaway' 
                                    ? 'bg-caramel/20 border-caramel shadow-2xl shadow-caramel/20' 
                                    : 'bg-white/5 border-white/5 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 hover:bg-white/10'
                                } ${isRTL ? 'flex-row-reverse' : ''}`}
                            >
                                <div className={`space-y-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                                    <h3 className="text-xl md:text-3xl font-black">{t('takeaway')}</h3>
                                    <p className="text-[10px] md:text-xs font-bold text-white/40">{t('pickup_counter')} • 5-10 {t('minutes')}</p>
                                </div>
                                <ShoppingBag size={40} className={fulfillment === 'takeaway' ? 'text-caramel' : 'text-white/20'} />
                            </button>
                        </div>
                    </div>

                    <div className="space-y-10">
                        <div className={`space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-white/20">{t('customer_details')}</p>
                            <div className="space-y-3">
                                <div className="relative group">
                                    <User className={`absolute top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-caramel transition-colors ${isRTL ? 'right-4' : 'left-4'}`} size={18} />
                                    <input 
                                        type="text" 
                                        placeholder={t('full_name')}
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className={`w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-[12px] font-bold text-white focus:border-caramel focus:bg-white/10 transition-all outline-none ${isRTL ? 'pr-12 text-right' : 'pl-12 text-left'}`}
                                    />
                                </div>
                                <div className="relative group">
                                    <Phone className={`absolute top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-caramel transition-colors ${isRTL ? 'right-4' : 'left-4'}`} size={18} />
                                    <input 
                                        type="tel" 
                                        placeholder={t('phone_number')}
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        className={`w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-[12px] font-bold text-white focus:border-caramel focus:bg-white/10 transition-all outline-none ${isRTL ? 'pr-12 text-right' : 'pl-12 text-left'}`}
                                    />
                                </div>
                                {fulfillment === 'delivery' && (
                                    <div className="relative group">
                                        <Home className={`absolute top-5 text-white/20 group-focus-within:text-caramel transition-colors ${isRTL ? 'right-4' : 'left-4'}`} size={18} />
                                        <textarea 
                                            placeholder={t('street_address')}
                                            value={formData.address}
                                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                                            className={`w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-[12px] font-bold text-white focus:border-caramel focus:bg-white/10 transition-all outline-none min-h-[100px] ${isRTL ? 'pr-12 text-right' : 'pl-12 text-left'}`}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={`space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                            <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-white/20">{t('payment_selection')}</p>
                            <div className={`flex gap-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <button 
                                    onClick={() => setPaymentMethod('credit')}
                                    className={`flex-1 p-4 rounded-2xl border-2 font-black text-[11px] tracking-widest transition-all ${paymentMethod === 'credit' ? 'bg-caramel text-coffee-dark border-caramel' : 'bg-white/5 text-white/40 border-white/10'}`}
                                >
                                    {t('credit_card')}
                                </button>
                                <button 
                                    onClick={() => setPaymentMethod('cash')}
                                    className={`flex-1 p-4 rounded-2xl border-2 font-black text-[11px] tracking-widest transition-all ${paymentMethod === 'cash' ? 'bg-caramel text-coffee-dark border-caramel' : 'bg-white/5 text-white/40 border-white/10'}`}
                                >
                                    {t('cash_on', { method: t(fulfillment) })}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <AnimatePresence mode="wait">
                            {paymentMethod === 'credit' ? (
                                <motion.div 
                                    key="card" 
                                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }} 
                                    animate={{ opacity: 1, x: 0 }} 
                                    exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                                    className={`p-6 md:p-10 rounded-[2rem] md:rounded-[4rem] bg-white/10 backdrop-blur-3xl border border-white/20 flex flex-col justify-between h-56 md:h-72 group relative overflow-hidden transition-all hover:bg-white/15`}
                                >
                                    <CreditCard className={`text-caramel opacity-20 absolute -bottom-2 md:-bottom-4 md:w-[200px] md:h-[200px] ${isRTL ? '-right-2 md:-right-4' : '-left-2 md:-left-4'}`} size={140} />
                                    <div className={`flex justify-between items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                                        <div className="w-12 h-8 md:w-16 md:h-10 bg-white/10 rounded-lg md:rounded-xl border border-white/10" />
                                        <span className="font-black text-[10px] md:text-xs uppercase text-white/40">{t('card_brand')}</span>
                                    </div>
                                    <div className={`space-y-2 md:space-y-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                                        <p className={`text-xl md:text-2xl font-black text-white tracking-[0.2em] uppercase ${isRTL ? 'flex-row-reverse' : ''}`}>**** **** **** 4242</p>
                                        <div className={`flex justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                                            <span className="text-[10px] md:text-xs font-black text-white/40">{t('card_owner')}</span>
                                            <span className="text-[10px] md:text-xs font-black text-white/40">12/28</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="cash" 
                                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }} 
                                    animate={{ opacity: 1, x: 0 }} 
                                    exit={{ opacity: 0, x: isRTL ? 20 : -20 }}
                                    className="p-6 md:p-10 rounded-[2rem] md:rounded-[4rem] bg-white/5 backdrop-blur-2xl border border-white/10 border-dashed flex flex-col items-center justify-center space-y-4 h-56 md:h-72"
                                >
                                    <Wallet className="text-caramel/40" size={64} />
                                    <div className="text-center">
                                        <h3 className="text-xl md:text-2xl font-black text-white">{t('cash_on', { method: t(fulfillment) })}</h3>
                                        <p className="text-white/20 text-[10px] font-black">{t('no_info_needed')}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="p-6 md:p-10 rounded-[2rem] md:rounded-[4rem] bg-white/5 backdrop-blur-2xl border border-white/5 space-y-10">
                            <div className="space-y-6">
                                <div className={`flex justify-between items-center text-xs md:text-sm font-black text-white/40 uppercase tracking-widest ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    <span>{t('subtotal_tax')}</span>
                                    <span>{subtotal.toFixed(2)} {t('currency_symbol')}</span>
                                </div>
                                <div className={`flex justify-between items-center text-xs md:text-sm font-black text-white/40 uppercase tracking-widest ${isRTL ? 'flex-row-reverse' : ''}`}>
                                    <span>{t('tax')}</span>
                                    <span>{tax.toFixed(2)} {t('currency_symbol')}</span>
                                </div>
                            </div>
                            <div className={`flex justify-between items-end ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <div className={`space-y-0.5 md:space-y-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                                    <p className="text-[10px] font-black uppercase text-caramel">{t('final_total')}</p>
                                    <p className="text-4xl md:text-6xl font-black text-white leading-none">{total.toFixed(2)} {t('currency_symbol')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="fixed bottom-0 left-0 right-0 p-8 z-50 flex justify-center">
                <button 
                  onClick={handleOrder}
                  className={`w-full max-w-4xl py-6 md:py-8 primary-gradient text-coffee-dark rounded-[3rem] font-black text-xl md:text-2xl flex items-center justify-center gap-6 shadow-2xl shadow-caramel/20 hover:scale-[1.02] active:scale-95 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                    <span>{t('place_order')}</span>
                    {isRTL ? <ChevronLeft size={32} /> : <ChevronRight size={32} />}
                </button>
            </footer>

            <AnimatePresence>
                {showAuthModal && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-coffee-dark/90 backdrop-blur-xl" 
                        />
                        
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 50 }}
                            className="w-full max-w-sm p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-3xl shadow-[0_0_100px_rgba(212,163,115,0.1)] relative z-10 text-center space-y-8"
                        >
                            <div className="w-20 h-20 primary-gradient rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-caramel/20">
                                <Coffee size={36} className="text-coffee-dark" />
                            </div>
                            
                            <div className="space-y-2">
                                <h2 className="text-3xl font-black text-white">{t('join_us')}</h2>
                                <p className="text-white/40 text-xs font-bold leading-relaxed">
                                    {t('track_loyalty')}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <button 
                                    onClick={() => navigate('/login', { state: { mode: 'signup' }})}
                                    className="w-full py-5 primary-gradient text-coffee-dark rounded-2xl font-black text-sm uppercase shadow-xl"
                                >
                                    {t('create_new_account')}
                                </button>
                                <button 
                                    onClick={() => navigate('/login', { state: { mode: 'login' }})}
                                    className="w-full py-5 bg-white/5 border border-white/10 text-white/40 hover:text-white rounded-2xl font-black text-sm uppercase"
                                >
                                    {t('have_account_login')}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CheckoutPage;
