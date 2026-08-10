'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { Flame, ShieldCheck, Sparkles, Clock, Truck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function KitchenPage() {
  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#242424] flex flex-col font-body">
      <Navbar />

      <main className="flex-1 pt-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1DD] border border-[#FFC857] text-xs font-extrabold text-[#C92822]">
            <Flame className="w-4 h-4 text-[#E6392F]" />
            <span>KITCHEN SANCTUARY</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-[#242424] tracking-tight">
            Inside the <span className="text-[#E6392F]">500°C Kitchen.</span>
          </h1>
          <p className="text-xs sm:text-base text-[#6B6B6B] leading-relaxed font-medium">
            Take a peak into our state-of-the-art kitchen studios where master pizzaiolos prepare daily fresh toppings and artisan sourdough bases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="product-card-bright p-6 sm:p-8 rounded-3xl border border-[#EAE3DA] bg-white space-y-3 shadow-card">
            <ShieldCheck className="w-8 h-8 text-[#2E8B57]" />
            <h3 className="font-display font-extrabold text-xl text-[#242424]">100% Zero Synthetic Additives</h3>
            <p className="text-xs text-[#6B6B6B] leading-relaxed font-medium">
              No artificial preservatives, no palm oil, no frozen dough discs. Everything is prepared fresh daily at sunrise.
            </p>
          </div>

          <div className="product-card-bright p-6 sm:p-8 rounded-3xl border border-[#EAE3DA] bg-white space-y-3 shadow-card">
            <Clock className="w-8 h-8 text-[#FFC857]" />
            <h3 className="font-display font-extrabold text-xl text-[#242424]">Separate Veg & Non-Veg Lines</h3>
            <p className="text-xs text-[#6B6B6B] leading-relaxed font-medium">
              Dedicated dough prep tables, wood peels, cutter wheels, and baking zones for complete dietary integrity.
            </p>
          </div>

          <div className="product-card-bright p-6 sm:p-8 rounded-3xl border border-[#EAE3DA] bg-white space-y-3 shadow-card">
            <Truck className="w-8 h-8 text-[#E6392F]" />
            <h3 className="font-display font-extrabold text-xl text-[#242424]">Eco Thermal Vented Pods</h3>
            <p className="text-xs text-[#6B6B6B] leading-relaxed font-medium">
              100% recyclable biodegradable sugarcane pulp pizza boxes engineered with steam vents to keep crusts crisp.
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
