import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, ShoppingBag, Coffee, Plus, ChevronLeft, ChevronRight, ShoppingCart, Trash2, Minus, X, Mouse } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/cartContext';
import dataCenter from '../../data/dataCenter';
import { useTranslation } from 'react-i18next';
import LanguageToggle from '../../components/Common/LanguageToggle';

// Components
import SeedGenerator from '../../components/Common/SeedGenerator';
import ProductStackItem from '../../components/Landing/ProductStackItem';
import CategorySelector from '../../components/Landing/CategorySelector';
import bgImage from '../../assets/images/background.png';

const LandingPage = () => {
  const { t, i18n } = useTranslation();
  const [showIntro, setShowIntro] = useState(() => !sessionStorage.getItem('coffeeIntroShown'));
  const [selectedCategory, setSelectedCategory] = useState('c1');
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeProduct, setActiveProduct] = useState(null);
  const [pairedItem, setPairedItem] = useState(null);
  const [selections, setSelections] = useState({}); // Dynamic choices (size, sugar, etc.)
  const { cart, addToCart, subtotal } = useCart();
  const navigate = useNavigate();

  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => {
        setShowIntro(false);
        sessionStorage.setItem('coffeeIntroShown', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  const filteredProducts = dataCenter.products.filter(p => p.categoryId === selectedCategory);

  const nextProduct = () => setActiveIdx((prev) => (prev + 1) % filteredProducts.length);
  const prevProduct = () => setActiveIdx((prev) => (prev - 1 + filteredProducts.length) % filteredProducts.length);

  // Initialize/Reset selections when product opens
  const openProduct = (product) => {
    const initial = {};
    if (product.customizations) {
      Object.entries(product.customizations).forEach(([key, options]) => {
        initial[key] = options[0]?.name || options[0];
      });
    }
    setSelections(initial);
    setActiveProduct(product);
  };

  const calculateTotalPrice = () => {
    if (!activeProduct) return 0;
    let extra = 0;
    if (activeProduct.customizations?.size) {
      const selectedSize = activeProduct.customizations.size.find(s => s.name === selections.size);
      extra = selectedSize?.extra || 0;
    }
    return activeProduct.basePrice + extra;
  };

  // Scroll/Wheel handling for Desktop - Optimized
  const [isWheeling, setIsWheeling] = useState(false);
  const handleWheel = (e) => {
    if (activeProduct || isWheeling) return;

    // Threshold to prevent micro-jitters
    if (Math.abs(e.deltaY) < 30) return;

    setIsWheeling(true);
    if (e.deltaY > 0) nextProduct();
    else prevProduct();

    setTimeout(() => setIsWheeling(false), 200); // 200ms debounce
  };

  return (
    <div className="h-[100dvh] text-white font-sans overflow-hidden selection:bg-caramel selection:text-coffee-dark relative bg-transparent">
      
      <AnimatePresence mode="wait">
        {showIntro ? (
          <motion.div
            key="intro"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              filter: "blur(20px)",
              scale: 1.1,
              transition: { duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }
            }}
            className="fixed inset-0 z-[1000] bg-coffee-dark flex flex-col items-center justify-center p-10 select-none pointer-events-none"
          >
            <div className="absolute inset-0 overflow-hidden">
                <img src={bgImage} className="w-full h-full object-cover opacity-20 brightness-50 scale-110" />
                <div className="absolute inset-0 bg-coffee-dark/80 backdrop-blur-3xl" />
                
                {/* Floating Coffee Seeds Parallax Effect */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ 
                      x: Math.random() * 100 + "%", 
                      y: "110%", 
                      rotate: 0,
                      opacity: 0 
                    }}
                    animate={{ 
                      y: "-10%", 
                      rotate: 360,
                      opacity: [0, 0.15, 0]
                    }}
                    transition={{ 
                      duration: 4 + Math.random() * 4, 
                      repeat: Infinity, 
                      delay: Math.random() * 2,
                      ease: "linear"
                    }}
                    className="absolute w-12 h-12 md:w-20 md:h-20 opacity-10 pointer-events-none"
                  >
                    <Coffee size="100%" className="text-caramel/20" />
                  </motion.div>
                ))}
            </div>

            <div className="relative z-10 text-center space-y-8 md:space-y-12">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                  animate={{ scale: 1, opacity: 1, rotate: 0 }}
                  transition={{ duration: 1, ease: "backOut" }}
                  className="w-24 h-24 md:w-56 md:h-56 primary-gradient rounded-[2.5rem] md:rounded-[4rem] mx-auto flex items-center justify-center shadow-2xl shadow-caramel/20 mb-4 md:mb-8 p-4 md:p-8"
                >
                  <img src="/logo.png" className="w-full h-full object-contain animate-pulse-slow drop-shadow-2xl" alt="Logo" />
                </motion.div>

                <div className="space-y-4 md:space-y-6">
                  <div className="overflow-hidden">
                      <motion.h1 
                          initial={{ y: 100, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 1.2, ease: "easeOut" }}
                          className="text-4xl md:text-[7rem] font-black tracking-tighter uppercase leading-none"
                      >
                          {t('welcome_title')}
                      </motion.h1>
                  </div>
                  <div className="overflow-hidden">
                      <motion.p
                          initial={{ y: 50, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
                          className="text-caramel text-xs md:text-2xl font-black uppercase tracking-[0.4em] md:tracking-[0.6em] opacity-80"
                      >
                          {t('welcome_subtitle')}
                      </motion.p>
                  </div>
                </div>

                <div className="relative w-32 md:w-64 h-1 bg-white/5 mx-auto rounded-full mt-12 overflow-hidden">
                    <motion.div
                        initial={{ left: "-100%" }}
                        animate={{ left: "100%" }}
                        transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity }}
                        className="absolute top-0 bottom-0 w-1/2 bg-caramel/40 blur-sm"
                    />
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3, ease: "linear" }}
                        className="absolute inset-y-0 left-0 bg-caramel shadow-[0_0_15px_rgba(212,163,115,0.6)]"
                    />
                </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="landing-content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            {/* 0. Contextual Background Image Backdrop (Fixed) - Sharp Clarity */}
            <div className="fixed inset-0 z-0">
                <img src={bgImage} className="w-full h-full object-cover opacity-40 brightness-75 transition-opacity duration-1000" />
                <div className="absolute inset-0 bg-coffee-dark/50 backdrop-blur-[4px]" />
            </div>

            {/* 1. Global Navigation Layer (Top-most) */}
            <header className="fixed top-0 left-0 right-0 px-6 py-8 flex justify-between items-center z-[110]">
              <div className="flex items-center gap-3">
                  <button 
                    onClick={() => activeProduct ? setActiveProduct(null) : null}
                    className="p-3 bg-white/5 border border-white/10 rounded-2xl shadow-xl active:scale-90 transition-all backdrop-blur-md"
                  >
                    {activeProduct ? (
                      isRTL ? <ChevronRight size={28} /> : <ChevronLeft size={28} />
                    ) : (
                      <ChevronUp className="rotate-[-90deg] rtl:rotate-90" size={28} />
                    )}
                  </button>
                  <LanguageToggle />
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl primary-gradient shadow-xl shadow-caramel/20 flex items-center justify-center p-1.5 overflow-hidden">
                  <img src="/logo.png" className="w-full h-full object-contain" alt="Logo" />
                </div>
                <span className="font-black uppercase tracking-tighter text-xl text-white hidden md:inline">{t('COFFEE HUB')}</span>
              </div>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => navigate('/orders')}
                  className="p-3 bg-white/5 border border-white/10 rounded-2xl shadow-xl active:scale-90 transition-all text-white/40 hover:text-caramel backdrop-blur-md"
                >
                  <ShoppingBag size={24} />
                </button>
                <button className="relative p-3 bg-white/5 border border-white/10 rounded-2xl shadow-xl group transition-all active:scale-90 backdrop-blur-md" onClick={() => navigate('/cart')}>
                  <ShoppingCart size={24} className="text-caramel" />
                  {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-caramel text-coffee-dark text-[11px] font-black rounded-full flex items-center justify-center border-2 border-coffee-dark">
                      {cart.length}
                    </span>
                  )}
                </button>
              </div>
            </header>

            {/* 2. Content Layer (Middle) */}
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pt-20 pb-20">
              <SeedGenerator count={20} />
              
              <div className="relative w-full h-full flex items-center justify-center animate-fade-in">
                
                {/* State A: Product Queue */}
                {!activeProduct && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                     
                     <AnimatePresence>
                       {pairedItem && (
                          <motion.div 
                            initial={{ x: isRTL ? 100 : -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: isRTL ? 100 : -100, opacity: 0 }}
                            className={`absolute top-1/2 -translate-y-[65%] z-[100] flex flex-col items-center space-y-4 md:space-y-10 ${isRTL ? 'right-0 md:right-24' : 'left-0 md:left-24'}`}
                          >
                             <div className="relative group scale-75 md:scale-100">
                                <div className="w-48 h-48 md:w-80 md:h-80 flex items-center justify-center">
                                   <motion.img 
                                     initial={{ scale: 0.8 }}
                                     animate={{ scale: 1 }}
                                     src={pairedItem.image} 
                                     className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)] md:drop-shadow-[0_45px_100px_rgba(0,0,0,0.6)]" 
                                   />
                                </div>
                                <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'}`}>
                                   <button 
                                       onClick={() => setPairedItem(null)}
                                       className="p-2 bg-white/5 hover:bg-white/10 text-white/30 rounded-full border border-white/10 transition-all hover:scale-110 active:scale-95"
                                   >
                                       <X size={16}/>
                                   </button>
                                </div>
                             </div>
                             
                             <div className="text-center space-y-2 md:space-y-4 scale-90 md:scale-100">
                                <div className="space-y-0 md:space-y-1">
                                   <p className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-caramel">{t('matching_for')}</p>
                                   <h3 className="text-lg md:text-3xl font-black text-white tracking-tighter leading-none max-w-[80px] md:max-w-none mx-auto">{t(pairedItem.name)}</h3>
                                </div>
                                
                                <button 
                                   onClick={() => {
                                       setPairedItem(null);
                                       navigate('/cart');
                                   }}
                                   className="px-4 py-2 md:px-6 md:py-3 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/40 hover:text-white hover:bg-white/10 transition-all active:scale-95"
                                >
                                   {t('just_this')}
                                </button>
                             </div>
                          </motion.div>
                       )}
                     </AnimatePresence>

                     <div className={`px-6 py-4 text-center z-[110] relative transition-all duration-700 ${pairedItem
                        ? `mb-10 ${isRTL ? '-translate-x-[15%]' : 'translate-x-[15%]'} -translate-y-24 scale-90 md:scale-100 md:mb-20 md:translate-y-0 md:translate-x-0`
                        : 'mb-20'
                        }`}>
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={filteredProducts[activeIdx]?.id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="space-y-4 relative z-10"
                          >
                            <h2 className="text-3xl md:text-7xl font-black tracking-tighter leading-none">{t(filteredProducts[activeIdx]?.name)}</h2>
                            <p className="text-caramel/60 text-xs md:text-sm font-black uppercase tracking-[0.4em]">{t('premium_brew')}</p>
                          </motion.div>
                        </AnimatePresence>
                     </div>

                     <div 
                       onWheel={handleWheel}
                       className={`relative w-full h-80 flex items-center justify-center cursor-ns-resize transition-all duration-700 ${pairedItem ? (isRTL ? '-translate-x-[15%] md:-translate-x-0' : 'translate-x-[15%] md:translate-x-0') + ' scale-90 md:scale-100' : ''}`}
                     >
                       <div className={`absolute ${isRTL ? 'left-4 md:left-14' : 'right-4 md:right-14'} top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 md:gap-5 z-[120] pointer-events-none opacity-50 md:opacity-60 transition-opacity scale-100 md:scale-125`}>
                          <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
                            <ChevronUp size={24} className="text-white/60" />
                          </motion.div>
                          <div className="flex flex-col items-center gap-2 md:gap-4">
                             <div className="w-7 h-11 md:w-9 md:h-14 border-2 border-white/30 rounded-full flex flex-col items-center p-1 md:p-1.5">
                                <motion.div 
                                  animate={{ y: [0, 8, 0] }}
                                  transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                  className="w-1 h-3 md:w-1.5 md:h-4 bg-caramel rounded-full shadow-[0_0_8px_rgba(212,163,115,0.4)]"
                                />
                             </div>
                             <span className={`[writing-mode:vertical-lr] text-[9px] md:text-[12px] font-black uppercase tracking-[0.4em] drop-shadow-lg ${isRTL ? 'rotate-180' : ''}`}>
                               {isRTL ? 'اسحب للتصفح' : 'SWIPE TO EXPLORE'}
                             </span>
                          </div>
                          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
                            <ChevronDown size={24} className="text-white/60" />
                          </motion.div>
                       </div>
                        {filteredProducts.map((product, idx) => {
                          const relativeIdx = (idx - activeIdx + filteredProducts.length) % filteredProducts.length;
                          if (relativeIdx > 3) return null; 
                          return (
                            <ProductStackItem 
                              key={product.id}
                              product={product}
                              position={relativeIdx}
                              onClick={() => openProduct(product)}
                              onSwipeNext={nextProduct}
                              onSwipePrev={prevProduct}
                            />
                          );
                        })}
                     </div>
                  </div>
                )}

                <AnimatePresence>
                  {activeProduct && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-[60] flex flex-col md:flex-row items-center justify-start md:justify-center p-3 md:p-12 overflow-hidden"
                    >
                      <motion.div 
                          onClick={() => setActiveProduct(null)}
                          className="absolute inset-0 bg-coffee-dark/80 cursor-pointer z-0 backdrop-blur-[6px]" 
                      />
                      
                      <div className="w-full md:w-1/2 h-[30vh] md:h-full flex items-center justify-center relative pointer-events-none z-10 pt-4 md:pt-0">
                        <motion.img 
                          layoutId={"product-" + activeProduct.id}
                          src={activeProduct.image} 
                          alt={t(activeProduct.name)}
                          className="w-full h-full object-contain filter drop-shadow-[0_45px_100px_rgba(0,0,0,0.6)]"
                          transition={{ type: 'spring', damping: 25, stiffness: 150 }}
                        />
                      </div>

                      <motion.div 
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 120, delay: 0.1 }}
                        className={`w-full md:w-1/2 flex-1 md:h-full flex flex-col justify-start md:justify-center space-y-4 md:space-y-8 px-6 md:px-12 overflow-y-auto no-scrollbar z-20 pb-4 md:pb-0 pt-4 md:pt-0 ${isRTL ? 'text-right' : 'text-left'}`}
                      >
                        <div className={`space-y-1 md:space-y-4 text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
                           <h2 className="text-2xl md:text-7xl font-black text-white leading-[0.8] drop-shadow-2xl">
                            {t(activeProduct.name)}
                           </h2>
                           <p className={`text-white/40 text-[9px] md:text-sm font-bold tracking-tight max-w-sm border-caramel/30 mx-auto md:mx-0 ${isRTL ? 'border-r-2 pr-4 md:pr-6' : 'border-l-2 pl-4 md:pl-6'}`}>
                            {t(activeProduct.description)}
                           </p>
                        </div>

                        <div className="flex-1 space-y-6 md:space-y-8 overflow-y-auto no-scrollbar py-2">
                           {activeProduct.customizations && Object.entries(activeProduct.customizations).map(([key, options]) => (
                              <div key={key} className="space-y-3 mx-auto md:mx-0">
                                 <p className={`text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-caramel text-center ${isRTL ? 'md:text-right' : 'md:text-left'}`}>
                                     {t('select')} {t(key)}
                                 </p>
                                 <div className={`flex flex-wrap justify-center gap-2 md:gap-4 ${isRTL ? 'md:justify-end' : 'md:justify-start'}`}>
                                    {options.map((opt) => {
                                       const name = opt.name || opt;
                                       const isSelected = selections[key] === name;
                                       return (
                                          <button
                                             key={name}
                                             onClick={() => setSelections(prev => ({...prev, [key]: name}))}
                                             className={`px-4 py-2 md:px-8 md:py-4 rounded-xl md:rounded-2xl border-2 font-bold text-[10px] md:text-lg flex flex-col items-center justify-center transition-all active:scale-95 ${
                                                isSelected ? 'border-caramel bg-caramel/10 text-caramel shadow-lg shadow-caramel/20' : 'border-white/5 text-white/40'
                                             }`}
                                          >
                                             <span>{t(name)}</span>
                                             {opt.extra > 0 && <span className="text-[7px] md:text-[10px] opacity-60">+{opt.extra} {t('currency_symbol')}</span>}
                                          </button>
                                       );
                                    })}
                                 </div>
                              </div>
                           ))}
                        </div>

                        <div className={`pt-4 border-t border-white/5 flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                           <div className={isRTL ? 'text-right' : 'text-left'}>
                              <p className="text-[7px] md:text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-0.5">{t('final_total_label')}</p>
                              <p className="text-3xl md:text-6xl font-black text-white leading-none">{calculateTotalPrice().toFixed(2)} {t('currency_symbol')}</p>
                           </div>
                           <button 
                              onClick={() => {
                              addToCart(activeProduct, selections, 1);
                              
                              const isDrink = activeProduct.categoryId === 'c1' || activeProduct.categoryId === 'c2';
                              const isDessert = activeProduct.categoryId === 'c3';

                              if (isDrink && !pairedItem) {
                                 setSelectedCategory('c3');
                                 setPairedItem(activeProduct);
                                 setActiveIdx(0);
                              } else if (isDessert && !pairedItem) {
                                 setSelectedCategory('c1');
                                 setPairedItem(activeProduct);
                                 setActiveIdx(0);
                              } else {
                                 setPairedItem(null);
                              }

                              setActiveProduct(null);
                              }}
                              className={`flex-1 primary-gradient text-coffee-dark py-4 md:py-6 rounded-[1rem] md:rounded-[2.5rem] font-black text-sm md:text-2xl shadow-2xl shadow-caramel/20 hover:scale-[1.02] active:scale-95 transition-all text-center ${isRTL ? 'mr-6' : 'ml-6'}`}
                           >
                              {t('add_to_cart')}
                           </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* 3. Bottom Layer (Category Nav) */}
            {!activeProduct && (
              <CategorySelector 
                categories={dataCenter.categories}
                selectedCategory={selectedCategory}
                onSelect={(id) => { setSelectedCategory(id); setActiveIdx(0); }}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;
