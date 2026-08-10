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
    <div className="min-h-screen bg-[#FFF8F0] text-[#242424] flex flex-col font-body">
      <Navbar />

      <main className="flex-1 pt-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1DD] border border-[#FFC857] text-xs font-extrabold text-[#C92822] mb-3">
            <Navigation className="w-4 h-4 text-[#E6392F]" />
            <span>REAL-TIME ORDER TRACKING</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[#242424] tracking-tight">
            Track Your <span className="text-[#E6392F]">Tub Delivery.</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1 font-medium">
            Order ID: <strong className="text-[#E6392F] font-mono">{activeOrder?.id || 'TUB-849201'}</strong> • Live kitchen status & rider coordinates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Timeline Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE3DA] shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#EAE3DA]">
                <div>
                  <span className="text-[10px] text-[#6B6B6B] uppercase font-bold">Live Status</span>
                  <h3 className="font-display font-extrabold text-xl text-[#242424]">
                    {timelineSteps[currentStepIndex]?.title}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-extrabold text-[#2E8B57] uppercase">Estimated ETA</span>
                  <div className="font-display font-black text-2xl text-[#E6392F]">
                    {activeOrder ? `${activeOrder.estimatedDeliveryMin} Mins` : '24 Mins'}
                  </div>
                </div>
              </div>

              {/* Status Timeline Steps */}
              <div className="relative pl-6 space-y-6 border-l-2 border-[#EAE3DA] ml-2">
                {timelineSteps.map((step, idx) => {
                  const isDone = idx <= currentStepIndex;
                  const isCurrent = idx === currentStepIndex;

                  return (
                    <div key={idx} className="relative">
                      {/* Circle Indicator */}
                      <div
                        className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                          isCurrent
                            ? 'bg-[#E6392F] text-white ring-4 ring-[#E6392F]/20 animate-pulse'
                            : isDone
                            ? 'bg-[#2E8B57] text-white'
                            : 'bg-[#FFF8F0] border border-[#EAE3DA] text-[#6B6B6B]'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                      </div>

                      <div>
                        <h4 className={`font-bold text-sm ${isCurrent ? 'text-[#E6392F] font-black' : isDone ? 'text-[#242424]' : 'text-[#6B6B6B]'}`}>
                          {step.title}
                        </h4>
                        <p className="text-xs text-[#6B6B6B] mt-0.5 font-medium">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Rider Card */}
            <div className="bg-white p-6 rounded-3xl border border-[#EAE3DA] flex items-center justify-between shadow-card">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#EAE3DA]">
                  <Image
                    src={activeOrder?.riderPhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
                    alt="Rider"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#E6392F]">Assigned Delivery Fleet</span>
                  <h4 className="font-extrabold text-base text-[#242424]">{activeOrder?.riderName || 'Vikram Singh'}</h4>
                  <p className="text-xs text-[#6B6B6B] font-medium">Thermal Pod Carrier #482</p>
                </div>
              </div>

              <a
                href={`tel:${activeOrder?.riderPhone || '+919876543210'}`}
                className="p-3.5 rounded-2xl bg-[#FFF8F0] hover:bg-[#FFF1DD] border border-[#EAE3DA] text-[#E6392F] transition-all shadow-sm"
                title="Call Rider"
              >
                <Phone className="w-5 h-5 text-[#E6392F]" />
              </a>
            </div>
          </div>

          {/* Right Simulated Route Map Canvas */}
          <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-[#EAE3DA] space-y-4 shadow-xl relative min-h-[480px] flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#EAE3DA] pb-3">
              <div className="flex items-center gap-2">
                <Bike className="w-5 h-5 text-[#E6392F]" />
                <h3 className="font-display font-extrabold text-base text-[#242424]">Live GPS Delivery Simulator</h3>
              </div>
              <span className="text-[10px] text-[#6B6B6B] uppercase font-bold">Simulated Real-Time Track</span>
            </div>

            {/* Interactive Animated Route Graphics */}
            <div className="relative flex-1 rounded-2xl bg-[#FFF8F0] border border-[#EAE3DA] p-6 flex flex-col justify-between overflow-hidden">
              {/* Grid Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(#24242410_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

              {/* Store Origin Node */}
              <div className="relative z-10 flex items-center gap-3 bg-white p-3 rounded-2xl border border-[#EAE3DA] max-w-xs shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-[#FFF1DD] border border-[#FFC857] flex items-center justify-center text-[#E6392F] font-bold text-xs">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#6B6B6B]">Store Location</span>
                  <p className="text-xs font-bold text-[#242424]">Pizza Tub Indiranagar Studio</p>
                </div>
              </div>

              {/* Animated Rider Marker */}
              <div className="relative z-10 my-12 flex justify-center">
                <div className="px-4 py-2 rounded-full bg-gradient-to-r from-[#E6392F] to-[#C92822] text-white font-extrabold text-xs shadow-lg flex items-center gap-2 animate-pulse">
                  <Bike className="w-4 h-4" />
                  <span>Rider is {currentStepIndex >= 4 ? '2 mins away' : 'in kitchen transit'}</span>
                </div>
              </div>

              {/* Customer Destination Node */}
              <div className="relative z-10 flex items-center gap-3 bg-white p-3 rounded-2xl border border-[#EAE3DA] max-w-xs self-end shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-[#2E8B57] flex items-center justify-center text-[#2E8B57] font-bold text-xs">
                  🏠
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#6B6B6B]">Delivery Destination</span>
                  <p className="text-xs font-bold text-[#242424]">{activeOrder?.deliveryAddress || 'Indiranagar 100ft Road'}</p>
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
