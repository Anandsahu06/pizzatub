'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { Flame, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Code, Layout, Layers, Cpu, Smartphone } from 'lucide-react';
import Link from 'next/link';

export default function CaseStudyPage() {
  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#242424] flex flex-col font-body">
      <Navbar />

      <main className="flex-1 pt-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Case Study Banner */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-[#EAE3DA] mb-16 shadow-xl relative overflow-hidden text-[#242424]">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1DD] border border-[#FFC857] text-[#C92822] text-xs font-extrabold uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>Digital Agency Portfolio Showcase</span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl text-[#242424] tracking-tight leading-[1.05]">
              PIZZA TUB: Redefining Modern <span className="text-[#E6392F]">Food-Commerce UI/UX.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#6B6B6B] leading-relaxed font-medium">
              A comprehensive case study on building a flagship, production-grade food ecommerce platform with Next.js App Router, React 19, interactive SVG pizza canvas builders, real-time live GPS order tracking, and restaurant administration.
            </p>

            <div className="pt-4 flex flex-wrap gap-4 text-xs font-bold">
              <span className="bg-[#FFF8F0] border border-[#EAE3DA] px-3.5 py-1.5 rounded-xl text-[#242424]">
                Client: Flagship Showcase Concept
              </span>
              <span className="bg-[#FFF8F0] border border-[#EAE3DA] px-3.5 py-1.5 rounded-xl text-[#242424]">
                Role: Full-Stack Product Architect
              </span>
              <span className="bg-[#FFF8F0] border border-[#EAE3DA] px-3.5 py-1.5 rounded-xl text-[#242424]">
                Lighthouse Score: 98/100
              </span>
            </div>
          </div>
        </div>

        {/* Section 1: Executive Overview & Challenge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE3DA] space-y-3 shadow-card">
            <h3 className="font-display font-black text-2xl text-[#242424]">01. The Challenge</h3>
            <p className="text-xs text-[#6B6B6B] leading-relaxed font-medium">
              Traditional food ordering websites are often constrained by generic templates, slow web apps, or overwhelming cluttered interfaces. The goal was to build an iconic, high-conversion brand identity for PIZZA TUB (&quot;Big Cravings. Bigger Slices.&quot;) that combines Apple-level visual craftsmanship with Framer-like micro-interactions and Stripe-level checkout speed.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE3DA] space-y-3 shadow-card">
            <h3 className="font-display font-black text-2xl text-[#242424]">02. Design Philosophy</h3>
            <p className="text-xs text-[#6B6B6B] leading-relaxed font-medium">
              We selected a warm cream foundation (<code className="text-[#E6392F]">#FFF8F0</code>) paired with crisp white containers (<code className="text-[#242424]">#FFFFFF</code>), high-contrast charcoal typography, and vibrant crust red (<code className="text-[#E6392F]">#E6392F</code>) accents for optimal appetite appeal.
            </p>
          </div>
        </div>

        {/* Section 2: Design Tokens & Palette */}
        <div className="bg-white p-8 rounded-3xl border border-[#EAE3DA] mb-16 space-y-6 shadow-card">
          <h3 className="font-display font-black text-2xl text-[#242424]">03. Design System & Tokens</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center text-xs">
            <div className="p-3 rounded-2xl bg-[#FFF8F0] border border-[#EAE3DA]">
              <span className="block font-bold text-[#242424]">Primary BG</span>
              <span className="text-[10px] font-mono text-[#6B6B6B]">#FFF8F0</span>
            </div>
            <div className="p-3 rounded-2xl bg-white border border-[#EAE3DA]">
              <span className="block font-bold text-[#242424]">Card BG</span>
              <span className="text-[10px] font-mono text-[#6B6B6B]">#FFFFFF</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#FFF1DD] border border-[#FFC857]">
              <span className="block font-bold text-[#C92822]">Surface</span>
              <span className="text-[10px] font-mono text-[#C92822]">#FFF1DD</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#242424] text-white">
              <span className="block font-bold">Charcoal</span>
              <span className="text-[10px] font-mono">#242424</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#E6392F] text-white">
              <span className="block font-bold">Action Red</span>
              <span className="text-[10px] font-mono">#E6392F</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#2E8B57] text-white">
              <span className="block font-bold">Veg Green</span>
              <span className="text-[10px] font-mono">#2E8B57</span>
            </div>
            <div className="p-3 rounded-2xl bg-[#FFC857] text-[#242424]">
              <span className="block font-bold">Offer Gold</span>
              <span className="text-[10px] font-mono">#FFC857</span>
            </div>
          </div>
        </div>

        {/* Section 3: Technical Features */}
        <div className="space-y-6 mb-16">
          <h3 className="font-display font-black text-2xl text-[#242424]">04. Feature Architecture Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-[#EAE3DA] space-y-2 shadow-card">
              <Code className="w-6 h-6 text-[#E6392F]" />
              <h4 className="font-bold text-base text-[#242424]">Interactive Pizza Canvas</h4>
              <p className="text-xs text-[#6B6B6B] leading-relaxed font-medium">
                Dynamic SVG layer rendering engine updating crust size, melted cheese blend, sauce tint, and topping scatter coordinates in real time.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#EAE3DA] space-y-2 shadow-card">
              <Smartphone className="w-6 h-6 text-[#E6392F]" />
              <h4 className="font-bold text-base text-[#242424]">1-Handed Mobile UX</h4>
              <p className="text-xs text-[#6B6B6B] leading-relaxed font-medium">
                Dedicated sticky bottom navigation bar, one-click cart drawer, and gesture-friendly step customizer built intentionally for smartphones.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#EAE3DA] space-y-2 shadow-card">
              <Cpu className="w-6 h-6 text-[#2E8B57]" />
              <h4 className="font-bold text-base text-[#242424]">Live GPS Tracker & Admin</h4>
              <p className="text-xs text-[#6B6B6B] leading-relaxed font-medium">
                Simulated 6-stage order preparation timeline, live rider coordinate updates, and restaurant management console.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Showcase Notice */}
        <div className="p-6 rounded-3xl bg-white border border-[#EAE3DA] text-center text-xs text-[#6B6B6B] font-medium shadow-sm">
          <p className="font-bold text-[#242424]">
            Notice: PIZZA TUB is a concept showcase created to demonstrate world-class web design, React architecture, and food-commerce engineering.
          </p>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
