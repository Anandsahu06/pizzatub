'use client';

import React, { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { useOrders } from '@/context/OrderContext';
import { CheckCircle2, Flame, Navigation, Clock } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get('id') || 'TUB-849201';
  const { getOrderById, activeOrder } = useOrders();

  const currentOrder = getOrderById(orderId) || activeOrder;

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E6392F', '#FFC857', '#2E8B57'],
      });
    } catch (e) {
      // fallback safe
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EAE3DA] text-center relative overflow-hidden shadow-xl mb-8 text-[#242424]"
    >
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#E6392F] to-[#C92822] flex items-center justify-center text-white mx-auto mb-6 shadow-md">
        <CheckCircle2 className="w-10 h-10" />
      </div>

      <span className="inline-block px-3.5 py-1 rounded-full bg-emerald-50 border border-[#2E8B57] text-[#2E8B57] text-xs font-extrabold uppercase tracking-wider mb-3">
        ● Payment Success & Order Confirmed
      </span>

      <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[#242424] tracking-tight">
        Your pizza is officially on its way!
      </h1>

      <p className="text-xs sm:text-sm text-[#6B6B6B] mt-2 max-w-md mx-auto font-medium">
        Order ID: <strong className="text-[#E6392F] font-mono">{orderId}</strong>. Our pizzaiolos are heating the stone hearth oven right now.
      </p>

      <div className="mt-8 p-6 rounded-2xl bg-[#FFF8F0] border border-[#EAE3DA] text-left grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs font-medium">
        <div>
          <span className="text-[10px] text-[#6B6B6B] uppercase block font-extrabold">Estimated Arrival</span>
          <span className="font-bold text-[#242424] text-sm flex items-center gap-1.5 mt-0.5">
            <Clock className="w-4 h-4 text-[#E6392F]" />
            <span>28 Mins</span>
          </span>
        </div>
        <div>
          <span className="text-[10px] text-[#6B6B6B] uppercase block font-extrabold">Amount Paid</span>
          <span className="font-black text-[#2E8B57] text-sm mt-0.5 block">
            ₹{currentOrder?.total || 748}
          </span>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <span className="text-[10px] text-[#6B6B6B] uppercase block font-extrabold">Delivery Address</span>
          <span className="font-bold text-[#242424] text-xs truncate block mt-0.5">
            {currentOrder?.deliveryAddress || 'Indiranagar, Blr'}
          </span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
        <Link
          href="/track-order"
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#E6392F] to-[#C92822] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all flex items-center justify-center gap-2"
        >
          <Navigation className="w-4 h-4 animate-pulse" />
          <span>TRACK LIVE ORDER MAP</span>
        </Link>

        <Link
          href="/menu"
          className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#FFF8F0] hover:bg-[#FFF1DD] border border-[#EAE3DA] text-[#242424] font-extrabold text-xs uppercase tracking-wider text-center transition-all shadow-sm"
        >
          Order Again
        </Link>
      </div>
    </motion.div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#242424] flex flex-col font-body">
      <Navbar />

      <main className="flex-1 pt-12 pb-24 max-w-3xl mx-auto px-4 w-full">
        <Suspense
          fallback={
            <div className="bg-white p-12 rounded-3xl text-center text-[#6B6B6B] border border-[#EAE3DA] shadow-md">
              <Flame className="w-8 h-8 text-[#E6392F] animate-bounce mx-auto mb-2" />
              <span className="font-bold">Loading Order Details...</span>
            </div>
          }
        >
          <OrderConfirmationContent />
        </Suspense>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
