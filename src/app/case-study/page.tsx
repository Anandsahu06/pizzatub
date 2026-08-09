'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { Flame, Sparkles, CheckCircle2, ShieldCheck, ArrowRight, Code, Layout, Layers, Cpu, Smartphone } from 'lucide-react';
import Link from 'next/link';

export default function CaseStudyPage() {
  return (
    <div className="min-h-screen bg-brand-bg text-white flex flex-col font-body">
      <Navbar />

      <main className="flex-1 pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Case Study Banner */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-brand-orange/40 bg-gradient-to-br from-brand-card via-brand-surface to-black mb-16 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-orange/20 border border-brand-orange/30 text-brand-orange text-xs font-extrabold uppercase tracking-widest">
              <Sparkles className="w-4 h-4" />
              <span>Digital Agency Portfolio Showcase</span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight leading-[1.05]">
              PIZZA TUB: Redefining Modern <span className="text-brand-orange">Food-Commerce UI/UX.</span>
            </h1>

            <p className="text-sm sm:text-base text-brand-muted leading-relaxed">
              A comprehensive case study on building a flagship, production-grade food ecommerce platform with Next.js App Router, React 19, interactive SVG pizza canvas builders, real-time live GPS order tracking, and restaurant administration.
            </p>

            <div className="pt-4 flex flex-wrap gap-4 text-xs font-semibold">
              <span className="bg-white/5 border border-brand-border px-3 py-1.5 rounded-lg text-brand-cream">
                Client: Flagship Showcase Concept
              </span>
              <span className="bg-white/5 border border-brand-border px-3 py-1.5 rounded-lg text-brand-cream">
                Role: Full-Stack Product Architect
              </span>
              <span className="bg-white/5 border border-brand-border px-3 py-1.5 rounded-lg text-brand-cream">
                Lighthouse Score: 98/100
              </span>
            </div>
          </div>
        </div>

        {/* Section 1: Executive Overview & Challenge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-brand-border space-y-3">
            <h3 className="font-display font-bold text-2xl text-white">01. The Challenge</h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              Traditional food ordering websites are often constrained by generic templates, slow web apps, or overwhelming cluttered interfaces. The goal was to build an iconic, high-conversion brand identity for PIZZA TUB (&quot;Big Cravings. Bigger Slices.&quot;) that combines Apple-level visual craftsmanship with Framer-like micro-interactions and Stripe-level checkout speed.
            </p>
          </div>

          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-brand-border space-y-3">
            <h3 className="font-display font-bold text-2xl text-white">02. Design Philosophy</h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              We selected a dark charcoal obsidian foundation (<code className="text-brand-orange">#090909</code>) paired with warm cream typography and targeted vibrant crust red (<code className="text-brand-red">#E53935</code>) and fire orange accents. Space Grotesk provides bold editorial authority, while Inter ensures maximum legibility across mobile touch targets.
            </p>
          </div>
        </div>

        {/* Section 2: Design Tokens & Palette */}
        <div className="glass-panel p-8 rounded-3xl border border-brand-border mb-16 space-y-6">
          <h3 className="font-display font-bold text-2xl text-white">03. Design System & Tokens</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-center text-xs">
            <div className="p-3 rounded-xl bg-[#090909] border border-white/20">
              <span className="block font-bold text-white">Primary BG</span>
              <span className="text-[10px] font-mono text-brand-muted">#090909</span>
            </div>
            <div className="p-3 rounded-xl bg-[#111111] border border-white/20">
              <span className="block font-bold text-white">Card BG</span>
              <span className="text-[10px] font-mono text-brand-muted">#111111</span>
            </div>
            <div className="p-3 rounded-xl bg-[#181818] border border-white/20">
              <span className="block font-bold text-white">Surface</span>
              <span className="text-[10px] font-mono text-brand-muted">#181818</span>
            </div>
            <div className="p-3 rounded-xl bg-[#FFF7ED] text-black border border-white/20">
              <span className="block font-bold">Cream Text</span>
              <span className="text-[10px] font-mono">#FFF7ED</span>
            </div>
            <div className="p-3 rounded-xl bg-[#E53935] border border-white/20">
              <span className="block font-bold text-white">Crust Red</span>
              <span className="text-[10px] font-mono text-white">#E53935</span>
            </div>
            <div className="p-3 rounded-xl bg-[#FF6B35] border border-white/20">
              <span className="block font-bold text-white">Fire Orange</span>
              <span className="text-[10px] font-mono text-white">#FF6B35</span>
            </div>
            <div className="p-3 rounded-xl bg-[#FFC857] text-black border border-white/20">
              <span className="block font-bold">Melted Gold</span>
              <span className="text-[10px] font-mono">#FFC857</span>
            </div>
          </div>
        </div>

        {/* Section 3: Technical Features */}
        <div className="space-y-6 mb-16">
          <h3 className="font-display font-bold text-2xl text-white">04. Feature Architecture Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-2xl border border-brand-border space-y-2">
              <Code className="w-6 h-6 text-brand-orange" />
              <h4 className="font-bold text-base text-white">Interactive Pizza Canvas</h4>
              <p className="text-xs text-brand-muted leading-relaxed">
                Dynamic SVG layer rendering engine updating crust size, melted cheese blend, sauce tint, and topping scatter coordinates in real time.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-brand-border space-y-2">
              <Smartphone className="w-6 h-6 text-brand-red" />
              <h4 className="font-bold text-base text-white">1-Handed Mobile UX</h4>
              <p className="text-xs text-brand-muted leading-relaxed">
                Dedicated sticky bottom navigation bar, one-click cart drawer, and gesture-friendly step customizer built intentionally for smartphones.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-brand-border space-y-2">
              <Cpu className="w-6 h-6 text-emerald-400" />
              <h4 className="font-bold text-base text-white">Live GPS Tracker & Admin</h4>
              <p className="text-xs text-brand-muted leading-relaxed">
                Simulated 6-stage order preparation timeline, live rider coordinate updates, and restaurant management console.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Showcase Notice */}
        <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border text-center text-xs text-brand-muted">
          <p className="font-semibold text-brand-cream">
            Notice: PIZZA TUB is a concept showcase created to demonstrate world-class web design, React architecture, and food-commerce engineering.
          </p>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
