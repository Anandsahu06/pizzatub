'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Tag, CheckCircle2, ArrowRight } from 'lucide-react';
import { COMBO_ITEMS } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export const ComboDeals: React.FC = () => {
  const { addToCart } = useCart();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1DD] border border-[#FFC857] text-xs font-extrabold text-[#C92822] mb-3">
          <Tag className="w-3.5 h-3.5 text-[#E6392F]" />
          <span>EXCLUSIVE PROMOTIONS</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#242424] tracking-tight">
          Hot Deals & <span className="text-[#E6392F]">Combos.</span>
        </h2>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {COMBO_ITEMS.map((combo, index) => (
          <motion.div
            key={combo.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="product-card-bright rounded-3xl p-6 border border-[#EAE3DA] bg-white flex flex-col justify-between shadow-card hover:shadow-card-hover"
          >
            <div>
              {/* Image Header */}
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 border border-[#EAE3DA]">
                <Image src={combo.image} alt={combo.name} fill className="object-cover" />
                <span className="absolute top-2.5 left-2.5 px-3 py-1 rounded-full bg-[#E6392F] text-white font-extrabold text-[10px] uppercase tracking-wider shadow-md">
                  {combo.badge}
                </span>
                <span className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[#2E8B57] text-white font-bold text-[10px]">
                  SAVE ₹{combo.savings}
                </span>
              </div>

              <h3 className="font-display font-black text-xl text-[#242424] mb-2">{combo.name}</h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed mb-4">{combo.description}</p>

              {/* Items included list */}
              <div className="space-y-1.5 mb-6">
                {combo.itemsIncluded.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-[#242424]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2E8B57] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-4 border-t border-[#EAE3DA] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#6B6B6B] line-through block">₹{combo.originalPrice}</span>
                <span className="font-display font-black text-2xl text-[#E6392F]">₹{combo.price}</span>
              </div>

              <button
                onClick={() =>
                  addToCart({
                    productId: combo.id,
                    name: combo.name,
                    image: combo.image,
                    unitPrice: combo.price,
                    quantity: 1,
                  })
                }
                className="px-5 py-3 rounded-2xl bg-[#E6392F] hover:bg-[#C92822] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5"
              >
                <span>CLAIM DEAL</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
