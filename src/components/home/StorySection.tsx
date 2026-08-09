'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Flame, Award, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const StorySection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EAE3DA] shadow-xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1DD] border border-[#FFC857] text-xs font-extrabold text-[#C92822]">
              <Flame className="w-4 h-4 text-[#E6392F]" />
              <span>THE PIZZA TUB PROMISE</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-[#242424] tracking-tight leading-tight">
              Artisan Quality. <span className="text-[#E6392F]">National Scale.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#6B6B6B] leading-relaxed font-medium">
              We started Pizza Tub with one simple belief: great pizza shouldn&apos;t require compromising on speed or quality. Our signature 72-hour sourdough cold fermentation process creates a crust that is light, digestible, and packed with authentic brick-oven flavor.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#FFF8F0] border border-[#EAE3DA]">
                <ShieldCheck className="w-6 h-6 text-[#2E8B57] mb-1" />
                <h4 className="font-bold text-sm text-[#242424]">Zero Synthetic Additives</h4>
                <p className="text-[11px] text-[#6B6B6B]">100% natural mozzarella & fresh vine tomatoes</p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFF8F0] border border-[#EAE3DA]">
                <Award className="w-6 h-6 text-[#E6392F] mb-1" />
                <h4 className="font-bold text-sm text-[#242424]">500°C Stone Hearth</h4>
                <p className="text-[11px] text-[#6B6B6B]">Baked in under 180 seconds for crisp crust</p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/story"
                className="inline-flex items-center gap-2 text-xs font-extrabold text-[#E6392F] hover:underline uppercase tracking-wider"
              >
                <span>Read Full Kitchen Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-square max-w-[440px] mx-auto rounded-3xl overflow-hidden border border-[#EAE3DA] shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=800&q=80"
              alt="Artisan Pizza Making Process"
              fill
              className="object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  );
};
