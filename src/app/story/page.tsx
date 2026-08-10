'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { Flame, Clock, Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function StoryPage() {
  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#242424] flex flex-col font-body">
      <Navbar />

      <main className="flex-1 pt-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1DD] border border-[#FFC857] text-xs font-extrabold text-[#C92822]">
            <Flame className="w-4 h-4 text-[#E6392F]" />
            <span>OUR CRAFT PHILOSOPHY</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-[#242424] tracking-tight">
            From Dough to <span className="text-[#E6392F]">Doorstep.</span>
          </h1>
          <p className="text-xs sm:text-base text-[#6B6B6B] leading-relaxed font-medium">
            We believe pizza isn&apos;t just fast food — it is an art of patience, high-temp chemistry, and uncompromised ingredients.
          </p>
        </div>

        {/* Story Section 1: The Dough */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 relative aspect-video rounded-3xl overflow-hidden bg-white border border-[#EAE3DA] shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80"
              alt="Dough Fermentation"
              fill
              className="object-cover"
            />
          </div>
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-mono font-black text-[#E6392F] uppercase">Chapter 01</span>
            <h2 className="font-display font-black text-3xl text-[#242424]">The 72-Hour Cold Fermentation Secret</h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed font-medium">
              Standard commercial pizzerias use fast-acting instant yeast that bakes dough in under 2 hours, resulting in heavy, bloating crusts. At Pizza Tub, our organic wheat dough undergoes a mandatory 72-hour cold maturation at 4°C. Natural enzymes break down complex starches into digestible sugars, producing a light, airy, blistered crust with complex sourdough aroma.
            </p>
          </div>
        </div>

        {/* Story Section 2: The Oven */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1 space-y-4">
            <span className="text-xs font-mono font-black text-[#E6392F] uppercase">Chapter 02</span>
            <h2 className="font-display font-black text-3xl text-[#242424]">500°C Blazing Stone Hearth</h2>
            <p className="text-xs sm:text-sm text-[#6B6B6B] leading-relaxed font-medium">
              When dough meets our custom-built stone hearth oven at 500°C, magic happens in 90 seconds. High heat flash-bakes the crust, sealing in natural moisture while creating dark leopard spots (leopard-pattern blistering) that define authentic wood-fired flavor.
            </p>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2 relative aspect-video rounded-3xl overflow-hidden bg-white border border-[#EAE3DA] shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=800&q=80"
              alt="Brick Oven Fire"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
