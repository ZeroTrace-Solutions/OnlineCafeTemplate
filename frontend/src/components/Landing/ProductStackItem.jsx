import React from 'react';
import { motion } from 'framer-motion';

const ProductStackItem = ({ product, position, onClick, onSwipeNext, onSwipePrev }) => {
  // Scaling and position calculation for the 3D effect
  const scale = 1 - position * 0.15;
  const yOffset = position * -80;
  const opacity = 1 - position * 0.4;
  const zIndex = 10 - position;

  const handleDragEnd = (_, info) => {
    if (info.offset.y < -50) onSwipeNext();
    if (info.offset.y > 50) onSwipePrev();
  };

  return (
    <motion.div
      layout
      drag={position === 0 ? "y" : false}
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={0.4}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, scale: 0.8, y: 100 }}
      animate={{ 
        opacity, 
        scale, 
        y: yOffset,
        zIndex,
        transition: { type: 'spring', stiffness: 300, damping: 25 }
      }}
      exit={{ opacity: 0, scale: 1.2, y: 300 }}
      whileHover={position === 0 ? { scale: 1.05 } : {}}
      onClick={onClick}
      className={`absolute w-72 h-72 md:w-96 md:h-96 cursor-pointer flex items-center justify-center ${position !== 0 ? 'pointer-events-none' : ''}`}
    >
      <div className={`relative w-full h-full flex items-center justify-center select-none ${position !== 0 ? 'grayscale-[0.5] contrast-[0.8]' : ''}`}>
        {/* Shadow floor */}
        <div className="absolute bottom-4 w-1/2 h-4 bg-black/20 blur-2xl rounded-full transform scale-x-125" />
        
        {/* Product Image */}
        <motion.img 
             draggable={false}
             layoutId={"product-" + product.id}
             src={product.image} 
             alt={product.name}
             className="w-full h-full object-contain drop-shadow-2xl select-none"
             initial={{ filter: 'drop-shadow(0 0 0px rgba(0,0,0,0))' }}
             animate={{ filter: `drop-shadow(0 ${20 - position * 10}px ${40 - position * 20}px rgba(0,0,0,${0.3 - position * 0.1}))` }}
        />
      </div>
    </motion.div>
  );
};

export default ProductStackItem;
