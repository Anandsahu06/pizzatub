'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { useOrders } from '@/context/OrderContext';
import { CheckCircle2, Clock, Phone, Navigation, ShieldCheck, Flame, Bike } from 'lucide-react';
import Image from 'next/image';

export default function TrackOrderPage() {
  const { activeOrder } = useOrders();

  const timelineSteps = [
    { title: 'Order Confirmed', desc: 'Kitchen received your ticket' },
    { title: 'Pizza Being Prepared', desc: 'Dough stretched & topped' },
    { title: 'In The Oven', desc: 'Baked at 500°C brick hearth' },
    { title: 'Ready & Packed', desc: 'Insulated thermal pod sealed' },
    { title: 'Out For Delivery', desc: 'Rider en-route to your door' },
    { title: 'Delivered', desc: 'Steaming hot slice enjoyed!' },
  ];

  const currentStepIndex = activeOrder ? activeOrder.currentStatusIndex : 2;

  return (
    <div className="min-h-screen bg-brand-bg text-white flex flex-col font-body">
      <Navbar />

      <main className="flex-1 pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-surface border border-brand-border text-xs font-bold text-brand-orange mb-3">
            <Navigation className="w-4 h-4 text-brand-red animate-spin-slow" />
            <span>Real-Time Order Tracking</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Track Your <span className="text-brand-red">Tub Delivery.</span>
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-1">
            Order ID: <strong className="text-brand-orange font-mono">{activeOrder?.id || 'TUB-849201'}</strong> • Live kitchen status & rider coordinates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Timeline Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-brand-border space-y-6 bg-brand-surface">
              <div className="flex items-center justify-between pb-4 border-b border-brand-border">
                <div>
                  <span className="text-[10px] text-brand-muted uppercase font-semibold">Live Status</span>
                  <h3 className="font-display font-bold text-xl text-white">
                    {timelineSteps[currentStepIndex]?.title}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-semibold text-emerald-400 uppercase">Estimated ETA</span>
                  <div className="font-display font-extrabold text-2xl text-brand-orange">
                    {activeOrder ? `${activeOrder.estimatedDeliveryMin} Mins` : '24 Mins'}
                  </div>
                </div>
              </div>

              {/* Status Timeline Steps */}
              <div className="relative pl-6 space-y-6 border-l-2 border-brand-border ml-2">
                {timelineSteps.map((step, idx) => {
                  const isDone = idx <= currentStepIndex;
                  const isCurrent = idx === currentStepIndex;

                  return (
                    <div key={idx} className="relative">
                      {/* Circle Indicator */}
                      <div
                        className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                          isCurrent
                            ? 'bg-brand-red text-white ring-4 ring-brand-red/30 animate-pulse'
                            : isDone
                            ? 'bg-emerald-500 text-white'
                            : 'bg-brand-card border border-brand-border text-brand-muted'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                      </div>

                      <div>
                        <h4 className={`font-bold text-sm ${isCurrent ? 'text-brand-orange font-extrabold' : isDone ? 'text-white' : 'text-brand-muted'}`}>
                          {step.title}
                        </h4>
                        <p className="text-xs text-brand-muted mt-0.5">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Rider Card */}
            <div className="glass-card p-6 rounded-2xl border border-brand-border flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-brand-border">
                  <Image
                    src={activeOrder?.riderPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                    alt="Rider"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-brand-orange">Assigned Delivery Fleet</span>
                  <h4 className="font-bold text-base text-white">{activeOrder?.riderName || 'Vikram Singh'}</h4>
                  <p className="text-xs text-brand-muted">Thermal Pod Carrier #482</p>
                </div>
              </div>

              <a
                href={`tel:${activeOrder?.riderPhone || '+919876543210'}`}
                className="p-3 rounded-xl bg-brand-surface hover:bg-white/10 border border-brand-border text-brand-cream hover:text-white"
                title="Call Rider"
              >
                <Phone className="w-5 h-5 text-brand-orange" />
              </a>
            </div>
          </div>

          {/* Right Simulated Route Map Canvas */}
          <div className="lg:col-span-6 glass-panel p-6 rounded-3xl border border-brand-border space-y-4 bg-brand-card shadow-2xl relative min-h-[480px] flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between border-b border-brand-border pb-3">
              <div className="flex items-center gap-2">
                <Bike className="w-5 h-5 text-brand-orange" />
                <h3 className="font-display font-bold text-base text-white">Live GPS Delivery Simulator</h3>
              </div>
              <span className="text-[10px] text-brand-muted uppercase font-semibold">Simulated Real-Time Track</span>
            </div>

            {/* Interactive Animated Route Graphics */}
            <div className="relative flex-1 rounded-2xl bg-black/80 border border-brand-border p-6 flex flex-col justify-between overflow-hidden">
              {/* Grid Roads Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

              {/* Store Origin Node */}
              <div className="relative z-10 flex items-center gap-3 bg-brand-surface/90 backdrop-blur-md p-3 rounded-xl border border-brand-border max-w-xs">
                <div className="w-8 h-8 rounded-lg bg-brand-red/20 flex items-center justify-center text-brand-red font-bold text-xs">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-brand-muted">Store Location</span>
                  <p className="text-xs font-bold text-white">Pizza Tub Indiranagar Studio</p>
                </div>
              </div>

              {/* Animated Rider Marker */}
              <div className="relative z-10 my-12 flex justify-center">
                <div className="px-4 py-2 rounded-full bg-gradient-to-r from-brand-red to-brand-orange text-white font-extrabold text-xs shadow-glow flex items-center gap-2 animate-pulse">
                  <Bike className="w-4 h-4" />
                  <span>Rider is {currentStepIndex >= 4 ? '2 mins away' : 'in kitchen transit'}</span>
                </div>
              </div>

              {/* Customer Destination Node */}
              <div className="relative z-10 flex items-center gap-3 bg-brand-surface/90 backdrop-blur-md p-3 rounded-xl border border-brand-border max-w-xs self-end">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">
                  🏠
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-brand-muted">Delivery Destination</span>
                  <p className="text-xs font-bold text-white">{activeOrder?.deliveryAddress || 'Indiranagar 100ft Road'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
