'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { PIZZA_ITEMS, SIDES_AND_DRINKS } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import { Star, Plus, Minus, Flame, ShieldCheck, Clock, Sparkles, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { addToCart } = useCart();

  const allItems = [...PIZZA_ITEMS, ...SIDES_AND_DRINKS];
  const item = allItems.find((p) => p.slug === slug) || PIZZA_ITEMS[0];

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<'Regular' | 'Medium' | 'Large' | 'Family'>('Medium');

  const sizePriceMultipliers: Record<string, number> = {
    Regular: 0.8,
    Medium: 1.0,
    Large: 1.35,
    Family: 1.65,
  };

  const calculatedUnitPrice = Math.round(item.price * (sizePriceMultipliers[selectedSize] || 1.0));
  const totalPrice = calculatedUnitPrice * quantity;

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#242424] flex flex-col font-body">
      <Navbar />

      <main className="flex-1 pt-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Back link */}
        <Link href="/menu" className="inline-flex items-center gap-2 text-xs font-bold text-[#6B6B6B] hover:text-[#E6392F] mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Menu</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Media Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden bg-white border border-[#EAE3DA] shadow-xl">
              <Image src={item.image} alt={item.name} fill priority className="object-cover" />
            </div>

            {/* Micro value badges */}
            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3.5 rounded-2xl bg-white border border-[#EAE3DA]">
                <Clock className="w-4 h-4 text-[#E6392F] mx-auto mb-1" />
                <span className="text-[#242424] font-bold block">{item.prepTimeMinutes} Mins</span>
                <span className="text-[10px] text-[#6B6B6B] font-bold uppercase">Prep & Bake</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-[#EAE3DA]">
                <Flame className="w-4 h-4 text-[#E6392F] mx-auto mb-1" />
                <span className="text-[#242424] font-bold block">{item.calories} kcal</span>
                <span className="text-[10px] text-[#6B6B6B] font-bold uppercase">Energy</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-white border border-[#EAE3DA]">
                <Star className="w-4 h-4 text-[#FFC857] fill-[#FFC857] mx-auto mb-1" />
                <span className="text-[#242424] font-bold block">{item.rating} ★</span>
                <span className="text-[10px] text-[#6B6B6B] font-bold uppercase">{item.reviewCount} Reviews</span>
              </div>
            </div>
          </div>

          {/* Right Product Specs & Order Form */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3.5 py-1 rounded-full bg-[#FFF1DD] border border-[#FFC857] text-[11px] font-extrabold text-[#C92822] uppercase">
                  {item.category}
                </span>
                {item.isVeg ? (
                  <span className="px-3 py-0.5 rounded-md bg-emerald-50 border border-[#2E8B57] text-[#2E8B57] text-[11px] font-extrabold">
                    100% VEG
                  </span>
                ) : (
                  <span className="px-3 py-0.5 rounded-md bg-red-50 border border-[#E6392F] text-[#E6392F] text-[11px] font-extrabold">
                    NON-VEG
                  </span>
                )}
              </div>

              <h1 className="font-display font-black text-3xl sm:text-5xl text-[#242424] tracking-tight">{item.name}</h1>
              <p className="text-sm font-extrabold text-[#E6392F] mt-1">{item.tagline}</p>
            </div>

            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed font-medium">{item.description}</p>

            {/* Ingredients */}
            <div className="p-5 rounded-2xl bg-white border border-[#EAE3DA]">
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#242424] mb-2">Ingredients Included</h4>
              <div className="flex flex-wrap gap-2">
                {item.ingredients.map((ing) => (
                  <span key={ing} className="px-3 py-1 rounded-xl bg-[#FFF8F0] border border-[#EAE3DA] text-xs font-semibold text-[#242424]">
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Size Selector if available */}
            {item.sizesAvailable && (
              <div>
                <label className="text-xs font-extrabold uppercase tracking-wider text-[#6B6B6B] block mb-2">Select Size</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['Regular', 'Medium', 'Large', 'Family'] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2.5 px-2 rounded-2xl text-xs font-extrabold border transition-all ${
                        selectedSize === sz
                          ? 'bg-[#E6392F] border-[#E6392F] text-white shadow-md'
                          : 'bg-white border-[#EAE3DA] text-[#242424] hover:bg-[#FFF1DD]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Adjuster & Total Price */}
            <div className="p-6 rounded-3xl bg-white border border-[#EAE3DA] space-y-4 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#6B6B6B] block uppercase font-extrabold">Calculated Price</span>
                  <span className="font-display font-extrabold text-3xl text-[#242424]">₹{totalPrice}</span>
                </div>

                <div className="flex items-center border border-[#EAE3DA] rounded-2xl bg-[#FFF8F0] p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 flex items-center justify-center text-[#6B6B6B] hover:text-[#E6392F] font-bold"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-black text-sm text-[#242424]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center text-[#6B6B6B] hover:text-[#E6392F] font-bold"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={() =>
                  addToCart({
                    productId: item.id,
                    name: item.name,
                    image: item.image,
                    unitPrice: calculatedUnitPrice,
                    quantity: quantity,
                    size: item.sizesAvailable ? selectedSize : undefined,
                  })
                }
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#E6392F] to-[#C92822] text-white font-extrabold text-sm uppercase tracking-wider shadow-lg hover:scale-102 transition-all flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                <span>ADD {quantity} TO CART (₹{totalPrice})</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
