import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ShoppingCart, Coffee, Plus, X, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/cartContext';
import dataCenter from '../../data/dataCenter';
import { useTranslation } from 'react-i18next';

const ProductDetailModal = ({ product, onClose }) => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const [selectedSize, setSelectedSize] = useState('M');
    const { addToCart, cart } = useCart();
    
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center font-sans overflow-hidden"
        >
            {/* Immersive Dimmer (Not a hard modal background) */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-coffee-dark/60 backdrop-blur-xl" 
            />

            <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-center p-6 md:p-20 z-10">
                
                {/* 1. Immersive Header */}
                <header className={`absolute top-10 left-10 right-10 flex justify-between items-center z-50 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <button onClick={onClose} className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all active:scale-90 border border-white/10">
                        {isRTL ? <ChevronRight size={28} /> : <ChevronLeft size={28} />}
                    </button>
                    <div className="p-4 bg-white/10 border border-white/5 backdrop-blur-md rounded-2xl shadow-xl flex items-center space-x-3">
                        <ShoppingBag className="text-caramel" size={24} />
                        {cart.length > 0 && (
                            <span className="text-white font-black text-sm">{cart.length}</span>
                        )}
                    </div>
                </header>

                {/* 2. The "Scooted & Zoomed" Image Hub */}
                <div className="w-full md:w-1/2 h-full flex items-center justify-center relative">
                    <motion.img 
                        layoutId={"product-" + product.id}
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-1/2 md:h-full object-contain filter drop-shadow-[0_45px_100px_rgba(0,0,0,0.6)] z-20"
                        transition={{ type: 'spring', damping: 25, stiffness: 150 }}
                    />
                    {/* Perspective Shadow */}
                    <div className="absolute bottom-1/4 w-1/2 h-12 bg-black/40 blur-[50px] rounded-full scale-y-50 z-10" />
                </div>

                {/* 3. Sliding Detail Panel (From the Right) */}
                <motion.div 
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 100, opacity: 0 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: "circOut" }}
                    className="w-full md:w-1/2 flex flex-col justify-center space-y-8 md:space-y-12 max-w-xl"
                >
                    <div className="space-y-4">
                        <motion.h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white leading-none">
                            {t(product.name)}
                        </motion.h2>
                        <p className="text-white/40 text-sm md:text-lg leading-relaxed font-bold tracking-tight max-w-md">
                            {t(product.description)}
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div className="space-y-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-caramel opacity-80">{t('select_size')}</p>
                            <div className="flex space-x-4">
                                {['S', 'M', 'L'].map(size => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl border-2 font-black text-lg flex items-center justify-center transition-all ${
                                            selectedSize === size 
                                            ? 'bg-caramel text-coffee-dark border-caramel shadow-2xl shadow-caramel/30 scale-110' 
                                            : 'border-white/10 text-white/40 hover:text-white hover:border-white/20 backdrop-blur-md'
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-2">{t('total_amount')}</p>
                            <p className="text-5xl md:text-7xl font-black text-white drop-shadow-2xl">
                                {product.basePrice.toFixed(2)} {t('currency_symbol')}
                            </p>
                        </div>
                    </div>

                    <div className="pt-6">
                        <button 
                            onClick={() => {
                                addToCart(product, { size: { name: selectedSize, extra: 0 } }, 1);
                                onClose();
                            }}
                            className="w-full primary-gradient text-coffee-dark py-6 md:py-8 rounded-[2rem] md:rounded-[3rem] font-black text-xl md:text-3xl flex items-center justify-center space-x-6 shadow-2xl shadow-caramel/20 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            <span>{t('add_to_cart')}</span>
                            <Plus size={32} />
                        </button>
                    </div>
                </motion.div>

            </div>
        </motion.div>
    );
};

export default ProductDetailModal;
