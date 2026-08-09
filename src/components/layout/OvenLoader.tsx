'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame } from 'lucide-react';

export const OvenLoader: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hasSeenLoader = sessionStorage.getItem('pizza_tub_loader_seen');
    if (hasSeenLoader) {
      setIsVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem('pizza_tub_loader_seen', 'true');
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-[999] bg-[#FFF8F0] flex flex-col items-center justify-center p-6 text-center select-none"
        >
          {/* Heat Wave Ambient Glow */}
          <div className="absolute w-[320px] h-[320px] rounded-full heat-wave-glow-bright pointer-events-none" />

          {/* Logo Badge */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative z-10 space-y-4"
          >
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#E6392F] to-[#C92822] mx-auto flex items-center justify-center shadow-2xl">
              <Flame className="w-10 h-10 text-white animate-bounce" />
            </div>

            <div>
              <h1 className="font-display font-black text-3xl sm:text-4xl text-[#242424] tracking-tight">
                PIZZA <span className="text-[#E6392F]">TUB</span>
              </h1>
              <p className="text-xs uppercase tracking-[0.3em] font-extrabold text-[#6B6B6B] mt-1">
                Fresh Out of the Oven
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
