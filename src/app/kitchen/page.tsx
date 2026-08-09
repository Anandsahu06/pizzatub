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
    <div className="min-h-screen bg-brand-bg text-white flex flex-col font-body">
      <Navbar />

      <main className="flex-1 pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-surface border border-brand-border text-xs font-bold text-brand-orange">
            <Flame className="w-4 h-4 text-brand-red" />
            <span>KITCHEN SANCTUARY</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight">
            Inside the <span className="text-brand-orange">500°C Kitchen.</span>
          </h1>
          <p className="text-xs sm:text-base text-brand-muted leading-relaxed">
            Take a peak into our state-of-the-art kitchen studios where master pizzaiolos prepare daily fresh toppings and artisan sourdough bases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-brand-border space-y-3">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
            <h3 className="font-display font-bold text-xl text-white">100% Zero Synthetic Additives</h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              No artificial preservatives, no palm oil, no frozen dough discs. Everything is prepared fresh daily at sunrise.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-brand-border space-y-3">
            <Clock className="w-8 h-8 text-brand-orange" />
            <h3 className="font-display font-bold text-xl text-white">Separate Veg & Non-Veg Lines</h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Dedicated dough prep tables, wood peels, cutter wheels, and baking zones for complete dietary integrity.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-brand-border space-y-3">
            <Truck className="w-8 h-8 text-brand-red" />
            <h3 className="font-display font-bold text-xl text-white">Eco Thermal Vented Pods</h3>
            <p className="text-xs text-brand-muted leading-relaxed">
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
