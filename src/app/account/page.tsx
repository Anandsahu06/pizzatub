'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { useOrders } from '@/context/OrderContext';
import { useCart } from '@/context/CartContext';
import { useLoyalty } from '@/context/LoyaltyContext';
import { User, ShoppingBag, MapPin, Gift, RotateCcw, ChevronRight, Award, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function AccountPage() {
  const { orders } = useOrders();
  const { addToCart, setIsCartOpen } = useCart();
  const { points, tier } = useLoyalty();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses' | 'rewards'>('orders');

  const handleReorder = (orderItems: any[]) => {
    orderItems.forEach((item) => {
      addToCart({
        productId: item.productId,
        name: item.name,
        image: item.image,
        unitPrice: item.unitPrice,
        quantity: item.quantity,
        size: item.size,
        crust: item.crust,
        sauce: item.sauce,
        cheese: item.cheese,
        toppings: item.toppings,
      });
    });
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#242424] flex flex-col font-body">
      <Navbar />

      <main className="flex-1 pt-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Profile Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE3DA] shadow-xl mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#E6392F] to-[#C92822] flex items-center justify-center text-white font-black text-2xl shadow-md shrink-0">
                AK
              </div>
              <div>
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-[#242424]">Anand Kumar</h1>
                <p className="text-xs text-[#6B6B6B] mt-0.5 font-medium">anand.kumar@example.com • +91 98765 43210</p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF1DD] border border-[#FFC857] text-[#C92822] text-xs font-extrabold mt-2">
                  <Award className="w-3.5 h-3.5 text-[#E6392F]" />
                  <span>{tier} Member ({points} Pts)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-center">
              <Link
                href="/track-order"
                className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-[#FFF8F0] hover:bg-[#FFF1DD] border border-[#EAE3DA] text-xs font-extrabold text-[#242424] uppercase tracking-wider text-center transition-all shadow-sm"
              >
                Track Active Order
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex border-b border-[#EAE3DA] mb-8 overflow-x-auto no-scrollbar gap-4 sm:gap-6">
          {[
            { id: 'orders', label: 'Order History', icon: ShoppingBag },
            { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
            { id: 'rewards', label: 'Rewards & Points', icon: Gift },
            { id: 'profile', label: 'Profile Settings', icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all shrink-0 whitespace-nowrap ${
                  isActive ? 'border-[#E6392F] text-[#E6392F]' : 'border-transparent text-[#6B6B6B] hover:text-[#242424]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center text-[#6B6B6B] border border-[#EAE3DA] shadow-sm">
                <ShoppingBag className="w-12 h-12 text-[#6B6B6B] mx-auto mb-3 opacity-40" />
                <h3 className="font-display font-black text-lg text-[#242424] mb-1">No orders placed yet</h3>
                <p className="text-xs text-[#6B6B6B] mb-6 font-medium">Your order history will appear here once you place your first pizza craving!</p>
                <Link
                  href="/menu"
                  className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#E6392F] to-[#C92822] text-white text-xs font-extrabold uppercase tracking-wider shadow-lg hover:scale-105 transition-all inline-block"
                >
                  Start Ordering Now
                </Link>
              </div>
            ) : (
              orders.map((ord) => (
                <div
                  key={ord.id}
                  className="product-card-bright rounded-3xl p-6 border border-[#EAE3DA] bg-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-card"
                >
                  <div className="space-y-3 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono font-black text-sm text-[#E6392F]">{ord.id}</span>
                      <span className="text-xs text-[#6B6B6B] font-medium">• {ord.createdAt}</span>
                      <span className="px-3 py-0.5 rounded-full bg-emerald-50 border border-[#2E8B57] text-[#2E8B57] font-extrabold text-[10px] uppercase">
                        {ord.currentStatusIndex === 5 ? 'Delivered' : 'In Progress'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="text-xs text-[#242424] flex items-center gap-2 font-medium">
                          <span className="font-extrabold text-[#E6392F]">{it.quantity}x</span>
                          <span>{it.name}</span>
                          {it.size && <span className="text-[10px] text-[#6B6B6B] font-bold">({it.size})</span>}
                        </div>
                      ))}
                    </div>

                    <div className="text-xs text-[#6B6B6B] flex items-center gap-4 pt-1 font-medium">
                      <span>Total: <strong className="text-[#242424] font-extrabold">₹{ord.total}</strong></span>
                      <span>Payment: <strong className="text-[#242424] font-extrabold uppercase">{ord.paymentMethod}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 border-t md:border-t-0 border-[#EAE3DA] pt-4 md:pt-0">
                    <Link
                      href="/track-order"
                      className="px-4 py-2.5 rounded-2xl bg-[#FFF8F0] hover:bg-[#FFF1DD] border border-[#EAE3DA] text-xs font-bold text-[#242424] uppercase"
                    >
                      Track Order
                    </Link>

                    <button
                      onClick={() => handleReorder(ord.items)}
                      className="px-5 py-2.5 rounded-2xl bg-[#E6392F] hover:bg-[#C92822] text-white font-extrabold text-xs shadow-md flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>REORDER</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab Content: Addresses */}
        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-[#EAE3DA] shadow-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#FFF1DD] border border-[#FFC857] text-[#C92822] font-extrabold text-[10px] uppercase">
                  Home (Primary)
                </span>
                <button className="text-xs text-[#E6392F] font-bold underline">Edit</button>
              </div>
              <h4 className="font-black text-[#242424] text-base">Anand Kumar</h4>
              <p className="text-xs text-[#6B6B6B] leading-relaxed font-medium">
                Flat 402, Sunshine Heights, 100 Feet Road, Indiranagar, Bengaluru - 560038
              </p>
              <p className="text-xs text-[#6B6B6B] font-medium">Phone: +91 98765 43210</p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-dashed border-[#EAE3DA] flex flex-col items-center justify-center text-center">
              <MapPin className="w-8 h-8 text-[#6B6B6B] mb-2 opacity-50" />
              <button className="text-xs font-extrabold text-[#E6392F] uppercase hover:underline">
                + Add New Address
              </button>
            </div>
          </div>
        )}

        {/* Tab Content: Rewards */}
        {activeTab === 'rewards' && (
          <div className="bg-white rounded-3xl p-8 border border-[#EAE3DA] shadow-card space-y-4">
            <h3 className="font-display font-extrabold text-2xl text-[#242424]">Your Pizza Club Perks</h3>
            <p className="text-xs text-[#6B6B6B] font-medium">You currently have {points} active Pizza Points.</p>
            <Link href="/pizza-club" className="inline-block px-6 py-3 rounded-full bg-[#E6392F] hover:bg-[#C92822] text-white text-xs font-extrabold uppercase tracking-wider shadow-md">
              Go to Rewards Store →
            </Link>
          </div>
        )}
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
