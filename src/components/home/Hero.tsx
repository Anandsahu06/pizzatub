'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Star, Clock, Sparkles, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const Hero: React.FC = () => {
  return (
    <section className="relative bg-[#FFF8F0] pt-10 pb-16 overflow-hidden border-b border-[#EAE3DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Promotional Banner Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-left"
          >
            {/* Promo Tagline Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1DD] border border-[#FFC857] text-xs font-bold text-[#C92822]">
              <Flame className="w-4 h-4 text-[#E6392F] animate-bounce" />
              <span>NATIONAL PIZZA DELIVERY SHOWCASE</span>
            </div>

            {/* Stacked Editorial Headline */}
            <div className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-[#242424] tracking-tight leading-[0.95]">
              <div className="text-[#242424]">BIG CRAVINGS.</div>
              <div className="text-[#E6392F]">BIGGER SLICES.</div>
            </div>

            {/* Subtext */}
            <p className="text-base sm:text-xl text-[#6B6B6B] max-w-xl font-medium leading-relaxed">
              Hot, fresh and loaded with your favorite toppings. Crafted with 72-hour dough fermentation and baked to golden perfection.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/menu"
                className="px-8 py-4 rounded-full bg-[#E6392F] hover:bg-[#C92822] text-white font-extrabold text-sm uppercase tracking-wider shadow-md hover:scale-105 transition-all flex items-center justify-center gap-2.5 group"
              >
                <Sparkles className="w-4 h-4" />
                <span>ORDER NOW</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/build-your-pizza"
                className="px-8 py-4 rounded-full bg-white hover:bg-[#FFF1DD] border border-[#EAE3DA] text-[#242424] font-extrabold text-sm uppercase tracking-wider transition-all text-center"
              >
                BUILD YOUR PIZZA
              </Link>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-6 border-t border-[#EAE3DA] flex items-center gap-8 text-xs font-semibold text-[#6B6B6B]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2E8B57]" />
                <span>100% Fresh Dough</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#E6392F]" />
                <span>25-35 Min Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#FFC857] fill-[#FFC857]" />
                <span>4.8 ★ Rating</span>
              </div>
            </div>
          </motion.div>

          {/* Right Appetizing Pizza Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative w-full max-w-[460px] aspect-square rounded-3xl overflow-visible">
              
              {/* Pizza Card Container */}
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-[#EAE3DA] shadow-xl bg-white group">
                <Image
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80"
                  alt="Tub Supreme Loaded Pizza"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-[#EAE3DA] flex items-center justify-between shadow-lg">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#E6392F]">Signature Bestseller</span>
                    <h3 className="font-display font-bold text-lg text-[#242424]">Tub Supreme Loaded</h3>
                  </div>
                  <span className="font-display font-black text-xl text-[#E6392F]">₹499</span>
                </div>
              </div>

              {/* Floating Badge 1: 30 MIN DELIVERY */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 z-20 bg-white border border-[#EAE3DA] px-3.5 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-xl bg-[#FFF1DD] flex items-center justify-center text-[#E6392F] font-bold">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#242424] block">30 MIN DELIVERY</span>
                  <span className="text-[9px] text-[#6B6B6B]">Steaming Hot Pod</span>
                </div>
              </motion.div>

              {/* Floating Badge 2: 4.8 ★ RATING */}
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -top-4 -right-4 z-20 bg-white border border-[#EAE3DA] px-3.5 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-xl bg-[#FFF1DD] flex items-center justify-center text-[#FFC857] font-bold">
                  <Star className="w-4 h-4 fill-[#FFC857]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#242424] block">4.8 ★ RATING</span>
                  <span className="text-[9px] text-[#6B6B6B]">Google Craver Reviews</span>
                </div>
              </motion.div>

              {/* Floating Badge 3: 100% FRESH */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                className="absolute -bottom-4 right-6 z-20 bg-white border border-[#EAE3DA] px-3.5 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-[#2E8B57] font-bold">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-[#242424] block">100% FRESH</span>
                  <span className="text-[9px] text-[#2E8B57] font-semibold">Zero Frozen Dough</span>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
