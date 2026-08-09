'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { PROMO_CODES, COMBO_ITEMS } from '@/data/mockData';
import { Tag, Copy, Check, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function OffersPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#242424] flex flex-col font-body">
      <Navbar />

      <main className="flex-1 pt-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Title */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1DD] border border-[#FFC857] text-xs font-extrabold text-[#C92822] mb-3">
            <Tag className="w-4 h-4 text-[#E6392F]" />
            <span>EXCLUSIVE CRAVER DEALS</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[#242424] tracking-tight">
            Offers & Promo <span className="text-[#E6392F]">Coupons.</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1 font-medium">
            Copy any code below and paste it at checkout for instant discounts on your order.
          </p>
        </div>

        {/* Coupon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {PROMO_CODES.map((promo) => {
            const isCopied = copiedCode === promo.code;

            return (
              <div
                key={promo.code}
                className="product-card-bright rounded-3xl p-6 border border-[#EAE3DA] bg-white flex flex-col justify-between relative group hover:shadow-card-hover transition-all shadow-card"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-[#FFF1DD] text-[#C92822] font-extrabold text-xs border border-[#FFC857]">
                      {promo.discountType === 'flat' ? `FLAT ₹${promo.discountValue} OFF` : `${promo.discountValue}% OFF`}
                    </span>
                    <span className="text-[11px] text-[#6B6B6B] font-bold">Min Order: ₹{promo.minOrderValue}</span>
                  </div>

                  <h3 className="font-display font-black text-2xl text-[#242424] mb-2">{promo.code}</h3>
                  <p className="text-xs text-[#6B6B6B] mb-6 leading-relaxed font-medium">{promo.description}</p>
                </div>

                <div className="pt-4 border-t border-[#EAE3DA] flex items-center justify-between gap-3">
                  <div className="px-3.5 py-2 rounded-xl bg-[#FFF8F0] border border-dashed border-[#EAE3DA] text-xs font-mono font-black text-[#242424]">
                    {promo.code}
                  </div>

                  <button
                    onClick={() => handleCopy(promo.code)}
                    className={`px-5 py-2.5 rounded-2xl font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                      isCopied
                        ? 'bg-[#2E8B57] text-white shadow-md'
                        : 'bg-[#FFF1DD] hover:bg-[#FFC857] border border-[#FFC857]/60 text-[#C92822]'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>COPIED!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#E6392F]" />
                        <span>COPY CODE</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Featured Combos Banner */}
        <div className="bg-white rounded-3xl p-8 border border-[#EAE3DA] shadow-lg text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-xs font-extrabold text-[#E6392F] uppercase tracking-wider block mb-1">
              WANT BIGGER SAVINGS WITHOUT CODES?
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl text-[#242424]">
              Check out our pre-bundled Movie Night & Family Combos!
            </h3>
          </div>

          <Link
            href="/menu"
            className="px-7 py-4 rounded-full bg-gradient-to-r from-[#E6392F] to-[#C92822] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all shrink-0 flex items-center gap-2"
          >
            <span>Explore Combo Deals</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
