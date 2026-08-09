'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Flame, Check, RefreshCw, ShoppingBag, ArrowRight, Star } from 'lucide-react';
import { PizzaItem } from '@/types';
import { PIZZA_ITEMS } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';

export const AiRecommender: React.FC = () => {
  const { addToCart } = useCart();

  const [mood, setMood] = useState<'Cheesy' | 'Spicy' | 'Light' | 'Loaded'>('Spicy');
  const [preference, setPreference] = useState<'Veg' | 'Non-Veg'>('Non-Veg');
  const [hunger, setHunger] = useState<'Snack' | 'Hungry' | 'Very Hungry'>('Hungry');

  const [recommendation, setRecommendation] = useState<{
    pizza: PizzaItem;
    reason: string;
  } | null>(null);

  const handleGenerate = () => {
    let matched: PizzaItem = PIZZA_ITEMS[0];
    let reason = 'The ultimate balance of rich toppings and hand-cranked sourdough crust.';

    if (mood === 'Cheesy') {
      matched = PIZZA_ITEMS.find((p) => p.id === 'cheese-overload') || PIZZA_ITEMS[4];
      reason = '4 molten layers of Provolone, Parmesan, Mozzarella & Creamy Gouda.';
    } else if (mood === 'Spicy' && preference === 'Non-Veg') {
      matched = PIZZA_ITEMS.find((p) => p.id === 'fire-chicken') || PIZZA_ITEMS[1];
      reason = 'Fire-grilled habanero chicken with peri-peri garlic glaze to ignite your taste buds.';
    } else if (mood === 'Spicy' && preference === 'Veg') {
      matched = PIZZA_ITEMS.find((p) => p.id === 'peri-peri-paneer') || PIZZA_ITEMS[5];
      reason = 'African bird eye chili-marinated cottage cheese with charred crisp peppers.';
    } else if (mood === 'Light') {
      matched = PIZZA_ITEMS.find((p) => p.id === 'garden-fresh') || PIZZA_ITEMS[2];
      reason = 'Farm-fresh vegetables drizzled with extra virgin cold-pressed garlic oil.';
    } else {
      matched = PIZZA_ITEMS.find((p) => p.id === 'tub-supreme') || PIZZA_ITEMS[0];
      reason = 'Heavyweight multi-layer loaded feast designed for intense appetite.';
    }

    setRecommendation({ pizza: matched, reason });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EAE3DA] shadow-xl relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFF1DD] rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Form */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1DD] border border-[#FFC857] text-xs font-extrabold text-[#C92822]">
              <Sparkles className="w-4 h-4 text-[#E6392F]" />
              <span>AI CRAVING SOMMELIER</span>
            </div>

            <div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#242424] tracking-tight">
                Not sure what to order tonight?
              </h2>
              <p className="text-xs sm:text-sm text-[#6B6B6B] mt-2 font-medium">
                Tell us your current mood, hunger level, and dietary preference. Our algorithmic sommelier will recommend your ideal slice.
              </p>
            </div>

            {/* Quiz Options */}
            <div className="space-y-5 pt-2">
              {/* Mood */}
              <div>
                <label className="text-xs uppercase tracking-wider font-extrabold text-[#6B6B6B] block mb-2.5">
                  1. What is your flavor mood?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {(['Cheesy', 'Spicy', 'Light', 'Loaded'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMood(m)}
                      className={`py-2.5 px-3.5 rounded-2xl text-xs font-extrabold border transition-all duration-200 cursor-pointer ${
                        mood === m
                          ? 'bg-[#E6392F] text-white border-[#E6392F] shadow-md scale-102'
                          : 'bg-[#FFF8F0] hover:bg-[#FFF1DD] border-[#EAE3DA] text-[#242424] hover:scale-102'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preference */}
              <div>
                <label className="text-xs uppercase tracking-wider font-extrabold text-[#6B6B6B] block mb-2.5">
                  2. Dietary Preference
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {(['Veg', 'Non-Veg'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPreference(p)}
                      className={`py-2.5 px-3.5 rounded-2xl text-xs font-extrabold border transition-all duration-200 cursor-pointer ${
                        preference === p
                          ? 'bg-[#2E8B57] text-white border-[#2E8B57] shadow-md scale-102'
                          : 'bg-[#FFF8F0] hover:bg-[#FFF1DD] border-[#EAE3DA] text-[#242424] hover:scale-102'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hunger */}
              <div>
                <label className="text-xs uppercase tracking-wider font-extrabold text-[#6B6B6B] block mb-2.5">
                  3. Appetite Scale
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {(['Snack', 'Hungry', 'Very Hungry'] as const).map((h) => (
                    <button
                      key={h}
                      type="button"
                      onClick={() => setHunger(h)}
                      className={`py-2.5 px-3.5 rounded-2xl text-xs font-extrabold border transition-all duration-200 cursor-pointer ${
                        hunger === h
                          ? 'bg-[#FFC857] text-[#242424] border-[#FFC857] shadow-md scale-102'
                          : 'bg-[#FFF8F0] hover:bg-[#FFF1DD] border-[#EAE3DA] text-[#242424] hover:scale-102'
                      }`}
                    >
                      {h}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Trigger Button */}
            <div className="pt-3">
              <button
                onClick={handleGenerate}
                className="w-full sm:w-auto px-9 py-4 rounded-full bg-gradient-to-r from-[#E6392F] to-[#C92822] hover:from-[#C92822] hover:to-[#E6392F] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer group"
              >
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>GENERATE MY MATCH</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Recommendation Result Card */}
          <div className="lg:col-span-5 flex justify-center">
            {recommendation ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full rounded-3xl bg-white p-6 border border-[#EAE3DA] shadow-xl relative"
              >
                <span className="inline-block px-3 py-1 rounded-full bg-[#FFF1DD] text-[#C92822] text-[10px] font-extrabold uppercase tracking-widest mb-3 border border-[#FFC857]">
                  ✨ Tonight&apos;s Match
                </span>

                <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-4 border border-[#EAE3DA]">
                  <Image
                    src={recommendation.pizza.image}
                    alt={recommendation.pizza.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/90 text-[11px] font-bold text-[#242424] shadow-sm">
                    <Star className="w-3 h-3 text-[#FFC857] fill-[#FFC857]" />
                    <span>{recommendation.pizza.rating}</span>
                  </div>
                </div>

                <h3 className="font-display font-black text-2xl text-[#242424] mb-1">
                  {recommendation.pizza.name}
                </h3>
                <p className="text-xs text-[#E6392F] font-bold mb-2">
                  ₹{recommendation.pizza.price} • {recommendation.pizza.prepTimeMinutes} Mins Prep
                </p>

                <p className="text-xs text-[#6B6B6B] italic mb-5 leading-relaxed font-medium">
                  &quot;{recommendation.reason}&quot;
                </p>

                <button
                  onClick={() =>
                    addToCart({
                      productId: recommendation.pizza.id,
                      name: recommendation.pizza.name,
                      image: recommendation.pizza.image,
                      unitPrice: recommendation.pizza.price,
                      quantity: 1,
                      size: hunger === 'Very Hungry' ? 'Large' : 'Medium',
                    })
                  }
                  className="w-full py-3.5 rounded-2xl bg-[#E6392F] hover:bg-[#C92822] text-white font-extrabold text-xs uppercase tracking-wider shadow-md hover:scale-102 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>ADD MATCH TO CART</span>
                </button>
              </motion.div>
            ) : (
              <div className="w-full h-80 rounded-3xl bg-[#FFF8F0] border-2 border-dashed border-[#EAE3DA] flex flex-col items-center justify-center p-6 text-center">
                <Sparkles className="w-10 h-10 text-[#E6392F] mb-3 animate-pulse" />
                <p className="text-sm font-extrabold text-[#242424]">Select your preferences</p>
                <p className="text-xs text-[#6B6B6B] mt-1 font-medium max-w-xs">
                  Click &quot;GENERATE MY MATCH&quot; to reveal your pizza Sommelier pick.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
