import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const CategorySelector = ({ categories, selectedCategory, onSelect }) => {
  const { t } = useTranslation();
  return (
    <footer className="fixed bottom-0 left-0 right-0 p-6 z-50 pb-[max(2.5rem,env(safe-area-inset-bottom))] pointer-events-none">
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="bg-coffee-dark/80 backdrop-blur-2xl p-2 rounded-full flex justify-between gap-2 border border-white/10 shadow-2xl max-w-[95%] sm:max-w-sm mx-auto overflow-x-auto no-scrollbar pointer-events-auto"
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={`flex-shrink-0 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${selectedCategory === cat.id
                ? 'primary-gradient text-coffee-dark scale-105 shadow-xl shadow-caramel/20'
                : 'text-white/30 hover:text-white'
              }`}
          >
            {t(cat.name)}
          </button>
        ))}
      </motion.div>
    </footer>
  );
};

export default CategorySelector;
