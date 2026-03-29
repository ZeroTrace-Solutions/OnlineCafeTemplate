import React from 'react';
import { motion } from 'framer-motion';

const SeedGenerator = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              y: -100, 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
              rotate: Math.random() * 360,
              opacity: 0 
            }}
            animate={{ 
              y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 100, 
              rotate: Math.random() * 720,
              opacity: [0, 0.4, 0.4, 0] 
            }}
            transition={{ 
              duration: 10 + Math.random() * 20, 
              repeat: Infinity, 
              delay: Math.random() * 20,
              ease: "linear"
            }}
            className="coffee-seed opacity-30 scale-75"
          />
        ))}
      </div>
    );
};

export default SeedGenerator;
