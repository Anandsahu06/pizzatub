'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Flame, Plus, Sliders, ArrowRight } from 'lucide-react';
import { PIZZA_ITEMS } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export const SignaturePizzas: React.FC = () => {
  const { addToCart } = useCart();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1DD] border border-[#FFC857] text-xs font-extrabold text-[#C92822] mb-3">
            <Flame className="w-3.5 h-3.5 text-[#E6392F]" />
            <span>POPULAR CRAVINGS</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#242424] tracking-tight">
            Everyone&apos;s <span className="text-[#E6392F]">Ordering.</span>
          </h2>
        </div>

        <Link
          href="/menu"
          className="text-xs font-extrabold text-[#E6392F] hover:underline uppercase tracking-wider flex items-center gap-1 transition-colors"
        >
          <span>Explore Full Catalogue</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PIZZA_ITEMS.slice(0, 6).map((pizza, index) => (
          <motion.div
            key={pizza.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="product-card-bright rounded-3xl p-5 border border-[#EAE3DA] bg-white flex flex-col justify-between shadow-card hover:shadow-card-hover group"
          >
            <div>
              {/* Product Image */}
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-4 bg-[#FFF8F0]">
                <Image
                  src={pizza.image}
                  alt={pizza.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {pizza.isBestSeller && (
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#FFC857] text-[#242424] font-black text-[9px] uppercase tracking-wider shadow-sm">
                    BEST SELLER
                  </span>
                )}
                <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/90 text-[11px] font-bold text-[#242424] shadow-sm">
                  <Star className="w-3 h-3 text-[#FFC857] fill-[#FFC857]" />
                  <span>{pizza.rating}</span>
                </div>
              </div>

              {/* Title & Veg Indicator */}
              <div className="flex items-center justify-between mb-1.5">
                <h3 className="font-display font-bold text-lg text-[#242424] group-hover:text-[#E6392F] transition-colors">
                  {pizza.name}
                </h3>
                {pizza.isVeg ? (
                  <span className="w-4 h-4 border border-[#2E8B57] rounded p-0.5 flex items-center justify-center shrink-0" title="Vegetarian">
                    <span className="w-2 h-2 rounded-full bg-[#2E8B57]" />
                  </span>
                ) : (
                  <span className="w-4 h-4 border border-[#E6392F] rounded p-0.5 flex items-center justify-center shrink-0" title="Non-Vegetarian">
                    <span className="w-2 h-2 rounded-full bg-[#E6392F]" />
                  </span>
                )}
              </div>

              <p className="text-xs text-[#6B6B6B] line-clamp-2 leading-relaxed mb-4">
                {pizza.description}
              </p>
            </div>

            {/* Price & Action Button */}
            <div className="pt-3 border-t border-[#EAE3DA] flex items-center justify-between">
              <span className="font-display font-black text-xl text-[#242424]">₹{pizza.price}</span>

              <div className="flex items-center gap-2">
                <Link
                  href="/build-your-pizza"
                  className="p-2.5 rounded-xl bg-[#FFF8F0] hover:bg-[#FFF1DD] border border-[#EAE3DA] text-[#242424]"
                  title="Customize"
                >
                  <Sliders className="w-4 h-4" />
                </Link>

                <button
                  onClick={() =>
                    addToCart({
                      productId: pizza.id,
                      name: pizza.name,
                      image: pizza.image,
                      unitPrice: pizza.price,
                      quantity: 1,
                      size: 'Medium',
                    })
                  }
                  className="px-5 py-2.5 rounded-xl bg-[#E6392F] hover:bg-[#C92822] text-white text-xs font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1.5 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>ADD</span>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
