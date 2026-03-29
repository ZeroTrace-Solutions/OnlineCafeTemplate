import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Coffee, 
  Trash2, 
  Edit3, 
  Plus, 
  X, 
  Image as ImageIcon, 
  CloudUpload, 
  CheckCircle2, 
  AlertCircle,
  Scissors,
  Sparkles,
  Zap,
  DollarSign,
  Tag,
  AlignLeft,
  LayoutGrid
} from 'lucide-react';
import dataCenter from '../../data/dataCenter';
import { useTranslation } from 'react-i18next';

const AdminProducts = () => {
    const { t, i18n } = useTranslation();
    const isRTL = i18n.language === 'ar';
    const [products, setProducts] = useState(dataCenter.products);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        basePrice: '',
        categoryId: 'c1',
        image: null,
        imageMethod: 'direct' // 'direct', 'bg-remove', 'transparent'
    });

    const categories = dataCenter.categories;

    const [isRemovingBg, setIsRemovingBg] = useState(false);
    const [bgRemoved, setBgRemoved] = useState(false);

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({ 
                name: product.name, 
                description: product.description, 
                basePrice: product.basePrice, 
                categoryId: product.categoryId,
                image: product.image,
                imageMethod: 'direct'
            });
        } else {
            setEditingProduct(null);
            setFormData({ name: '', description: '', basePrice: '', categoryId: 'c1', image: null, imageMethod: 'direct' });
        }
        setBgRemoved(false);
        setIsModalOpen(true);
    };

    const handleSave = () => {
        if (editingProduct) {
            setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...formData, basePrice: parseFloat(formData.basePrice) } : p));
        } else {
            const newProd = { 
                id: `p${products.length + 1}`, 
                ...formData, 
                basePrice: parseFloat(formData.basePrice),
                customizations: { size: [{ name: 'medium', extra: 0 }], sugar: ['none', 'medium'] } 
            };
            setProducts([...products, newProd]);
        }
        setIsModalOpen(false);
    };

    const simulateBgRemove = () => {
        if (!formData.image) return;
        setIsRemovingBg(true);
        setTimeout(() => {
            setIsRemovingBg(false);
            setBgRemoved(true);
            setFormData({ ...formData, imageMethod: 'bg-remove' });
        }, 2500);
    };

    const handleDelete = (id) => {
        if (window.confirm(t('delete_confirm'))) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    return (
        <div className={`space-y-10 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className={`flex flex-col md:flex-row justify-between items-start md:items-end gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className="space-y-2">
                    <h2 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase tracking-tighter">
                        {t('products')}
                    </h2>
                    <p className="text-white/40 font-bold uppercase tracking-widest text-[10px] md:text-xs">
                        {t('manage_products_desc')}
                    </p>
                </div>
                <button 
                    onClick={() => handleOpenModal()}
                    className={`flex items-center gap-3 px-8 py-5 primary-gradient text-coffee-dark rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-caramel/20 hover:scale-[1.05] active:scale-95 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}
                >
                    <Plus size={18} />
                    <span>{t('add_new_product')}</span>
                </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((prod, idx) => (
                    <motion.div
                        key={prod.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white/5 border border-white/5 p-6 rounded-[3rem] backdrop-blur-3xl group relative overflow-hidden"
                    >
                        <div className="relative aspect-square bg-white/5 rounded-[2rem] mb-6 flex items-center justify-center overflow-hidden transition-all group-hover:bg-white/10 group-hover:scale-[1.02]">
                            <img src={prod.image} alt={prod.name} className="w-full h-full object-contain drop-shadow-2xl scale-[1.15]" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
                                <button 
                                    onClick={() => handleOpenModal(prod)}
                                    className="p-4 bg-white text-coffee-dark rounded-2xl hover:bg-caramel transition-colors shadow-xl"
                                >
                                    <Edit3 size={18} />
                                </button>
                                <button 
                                    onClick={() => handleDelete(prod.id)}
                                    className="p-4 bg-red-500/20 text-red-400 rounded-2xl border border-red-500/20 hover:bg-red-500 hover:text-white transition-all shadow-xl"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className={`flex justify-between items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <div className="space-y-1">
                                    <span className="px-2 py-0.5 bg-caramel/10 text-caramel rounded-md font-black text-[9px] uppercase border border-caramel/20">
                                        {t(categories.find(c => c.id === prod.categoryId)?.name || 'category')}
                                    </span>
                                    <h4 className="text-xl font-black text-white">{t(prod.name)}</h4>
                                </div>
                                <p className="text-xl font-black text-caramel">{prod.basePrice} {t('currency_symbol')}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-12 overflow-y-auto">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-black/95 backdrop-blur-2xl" 
                        />
                        
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 50 }}
                            className="w-full max-w-4xl max-h-[90vh] bg-[#0d0d0d] border border-white/10 rounded-[2.5rem] md:rounded-[4rem] p-6 md:p-14 relative z-10 overflow-y-auto no-scrollbar"
                        >
                            <div className={`flex justify-between items-center mb-8 md:mb-10 ${isRTL ? 'flex-row-reverse' : ''}`}>
                                <h3 className="text-2xl md:text-5xl font-black">{editingProduct ? t('edit_product') : t('add_product')}</h3>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 md:p-3 bg-white/5 rounded-xl md:rounded-2xl hover:bg-white/10 text-white/40"><X size={20} /></button>
                            </div>

                            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 ${isRTL ? 'text-right' : 'text-left'}`}>
                                <div className="space-y-8">
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black text-caramel uppercase tracking-[0.4em] mb-2">{t('product_image')}</p>
                                        <div className="relative aspect-square bg-white/5 border-2 border-dashed border-white/10 rounded-[3rem] flex flex-col items-center justify-center p-8 text-center group overflow-hidden">
                                            {formData.image ? (
                                                <>
                                                    <img src={formData.image} className={`w-full h-full object-contain transform transition-transform duration-1000 ${isRemovingBg ? 'scale-90 blur-xl grayscale' : 'scale-110'} ${bgRemoved ? 'drop-shadow-[0_0_20px_rgba(212,163,115,0.4)]' : ''}`} alt="Preview" />
                                                    {isRemovingBg && (
                                                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md">
                                                            <Sparkles size={40} className="text-caramel animate-pulse scale-150 mb-6" />
                                                            <div className="space-y-2">
                                                                <p className="text-xs font-black uppercase tracking-widest text-caramel">{t('removing_bg_ai')}</p>
                                                                <div className="w-32 h-1 bg-white/10 rounded-full mx-auto overflow-hidden">
                                                                    <motion.div initial={{ x: '-100%' }} animate={{ x: '100%' }} transition={{ duration: 1.5, repeat: Infinity }} className="w-full h-full bg-caramel" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <button onClick={() => setFormData({ ...formData, image: null })} className="absolute top-4 right-4 p-2 bg-red-500 rounded-xl text-white shadow-xl opacity-0 group-hover:opacity-100 transition-all"><X size={16} /></button>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="w-20 h-20 bg-caramel/20 rounded-[2rem] flex items-center justify-center text-caramel mb-6 group-hover:scale-110 transition-transform">
                                                        <CloudUpload size={32} />
                                                    </div>
                                                    <p className="text-sm font-bold text-white/40">{t('drag_drop_image')}</p>
                                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => setFormData({ ...formData, image: URL.createObjectURL(e.target.files[0]) })} />
                                                </>
                                            )}
                                        </div>

                                        {formData.image && (
                                            <div className="grid grid-cols-2 gap-4 mt-6">
                                                <button 
                                                    onClick={simulateBgRemove}
                                                    disabled={isRemovingBg || bgRemoved}
                                                    className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${bgRemoved ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-caramel/10 text-caramel border border-caramel/20 hover:bg-caramel hover:text-coffee-dark shadow-lg shadow-caramel/10'}`}
                                                >
                                                    {bgRemoved ? <CheckCircle2 size={14} /> : <Zap size={14} />}
                                                    <span>{bgRemoved ? t('bg_removed') : t('remove_bg_ai')}</span>
                                                </button>
                                                <button className={`flex items-center justify-center gap-2 py-4 bg-white/5 text-white/40 border border-white/5 hover:border-white/20 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all`}>
                                                    <ImageIcon size={14} />
                                                    <span>{t('native_png')}</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="space-y-3">
                                            <p className="text-[10px] font-black text-caramel uppercase tracking-[0.4em]">{t('product_name')}</p>
                                            <div className="relative group">
                                                <Tag className={`absolute top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-caramel transition-colors ${isRTL ? 'right-4' : 'left-4'}`} size={18} />
                                                <input 
                                                    type="text" 
                                                    placeholder="e.g. Iced Latte"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                    className={`w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-[12px] font-bold text-white focus:border-caramel focus:bg-white/10 transition-all outline-none ${isRTL ? 'pr-12 text-right' : 'pl-12 text-left'}`}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <p className="text-[10px] font-black text-caramel uppercase tracking-[0.4em]">{t('category')}</p>
                                            <div className={`flex gap-3 overflow-x-auto no-scrollbar ${isRTL ? 'flex-row-reverse' : ''}`}>
                                                {categories.map(c => (
                                                    <button 
                                                        key={c.id} 
                                                        onClick={() => setFormData({ ...formData, categoryId: c.id })}
                                                        className={`px-6 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest whitespace-nowrap transition-all border-2 ${formData.categoryId === c.id ? 'bg-caramel text-coffee-dark border-caramel' : 'bg-white/5 text-white/40 border-transparent hover:border-white/10'}`}
                                                    >
                                                        {t(c.name)}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <p className="text-[10px] font-black text-caramel uppercase tracking-[0.4em]">{t('base_price')}</p>
                                            <div className="relative group">
                                                <DollarSign className={`absolute top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-caramel transition-colors ${isRTL ? 'right-4' : 'left-4'}`} size={18} />
                                                <input 
                                                    type="number" 
                                                    placeholder="0.00"
                                                    value={formData.basePrice}
                                                    onChange={(e) => setFormData({...formData, basePrice: e.target.value})}
                                                    className={`w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-[12px] font-bold text-white focus:border-caramel focus:bg-white/10 transition-all outline-none ${isRTL ? 'pr-12 text-right' : 'pl-12 text-left'}`}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <p className="text-[10px] font-black text-caramel uppercase tracking-[0.4em]">{t('description')}</p>
                                            <div className="relative group">
                                                <AlignLeft className={`absolute top-5 text-white/20 group-focus-within:text-caramel transition-colors ${isRTL ? 'right-4' : 'left-4'}`} size={18} />
                                                <textarea 
                                                    placeholder="Enter a catchy description..."
                                                    value={formData.description}
                                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                                    className={`w-full bg-white/5 border border-white/10 p-5 rounded-2xl text-[12px] font-bold text-white focus:border-caramel focus:bg-white/10 transition-all outline-none min-h-[120px] ${isRTL ? 'pr-12 text-right' : 'pl-12 text-left'}`}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={handleSave}
                                        className="w-full py-6 primary-gradient text-coffee-dark rounded-[2rem] font-black text-xl shadow-2xl shadow-caramel/20 hover:scale-[1.02] active:scale-95 transition-all"
                                    >
                                        {t('save_product')}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminProducts;
