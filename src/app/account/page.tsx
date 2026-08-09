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
    <div className="min-h-screen bg-brand-bg text-white flex flex-col font-body">
      <Navbar />

      <main className="flex-1 pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Profile Banner */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-brand-border bg-gradient-to-br from-brand-card to-brand-surface mb-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-red to-brand-orange flex items-center justify-center text-white font-extrabold text-2xl shadow-glow">
                AK
              </div>
              <div>
                <h1 className="font-display font-black text-2xl sm:text-3xl text-white">Anand Kumar</h1>
                <p className="text-xs text-brand-muted mt-0.5">anand.kumar@example.com • +91 98765 43210</p>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-yellow/10 border border-brand-yellow/30 text-brand-yellow text-[11px] font-bold mt-2">
                  <Award className="w-3.5 h-3.5" />
                  <span>{tier} Member ({points} Pts)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/track-order"
                className="px-4 py-2.5 rounded-xl bg-brand-surface hover:bg-white/10 border border-brand-border text-xs font-bold text-brand-cream uppercase tracking-wider transition-all"
              >
                Track Active Order
              </Link>
            </div>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex border-b border-brand-border mb-8 overflow-x-auto no-scrollbar gap-6">
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
                className={`pb-3 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border-b-2 transition-all shrink-0 ${
                  isActive ? 'border-brand-red text-brand-red' : 'border-transparent text-brand-muted hover:text-white'
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
              <div className="glass-card rounded-2xl p-12 text-center text-brand-muted">
                <ShoppingBag className="w-12 h-12 text-brand-muted/40 mx-auto mb-3" />
                <h3 className="font-display font-bold text-lg text-white mb-1">No orders placed yet</h3>
                <p className="text-xs text-brand-muted mb-6">Your order history will appear here once you place your first pizza craving!</p>
                <Link
                  href="/menu"
                  className="px-6 py-3 rounded-xl bg-brand-red text-white text-xs font-bold uppercase shadow-glow"
                >
                  Start Ordering Now
                </Link>
              </div>
            ) : (
              orders.map((ord) => (
                <div
                  key={ord.id}
                  className="glass-card rounded-2xl p-6 border border-brand-border flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-sm text-brand-orange">{ord.id}</span>
                      <span className="text-xs text-brand-muted">• {ord.createdAt}</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 font-bold text-[10px] uppercase">
                        {ord.currentStatusIndex === 5 ? 'Delivered' : 'In Progress'}
                      </span>
                    </div>

                    <div className="space-y-1">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="text-xs text-brand-cream flex items-center gap-2">
                          <span className="font-bold text-white">{it.quantity}x</span>
                          <span>{it.name}</span>
                          {it.size && <span className="text-[10px] text-brand-muted">({it.size})</span>}
                        </div>
                      ))}
                    </div>

                    <div className="text-xs text-brand-muted flex items-center gap-4 pt-1">
                      <span>Total: <strong className="text-white">₹{ord.total}</strong></span>
                      <span>Payment: <strong className="text-white uppercase">{ord.paymentMethod}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 border-t md:border-t-0 border-brand-border pt-4 md:pt-0">
                    <Link
                      href="/track-order"
                      className="px-4 py-2.5 rounded-xl bg-brand-surface hover:bg-white/10 border border-brand-border text-xs font-bold text-brand-cream uppercase"
                    >
                      Track Order
                    </Link>

                    <button
                      onClick={() => handleReorder(ord.items)}
                      className="px-5 py-2.5 rounded-xl bg-brand-red hover:bg-brand-red-hover text-white font-bold text-xs shadow-glow flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>REORDER AGAIN</span>
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
            <div className="glass-card rounded-2xl p-6 border border-brand-border space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-md bg-brand-orange/20 text-brand-orange font-bold text-[10px] uppercase">
                  Home (Primary)
                </span>
                <button className="text-xs text-brand-orange underline">Edit</button>
              </div>
              <h4 className="font-bold text-white text-base">Anand Kumar</h4>
              <p className="text-xs text-brand-muted leading-relaxed">
                Flat 402, Sunshine Heights, 100 Feet Road, Indiranagar, Bengaluru - 560038
              </p>
              <p className="text-xs text-brand-muted">Phone: +91 98765 43210</p>
            </div>

            <div className="glass-card rounded-2xl p-6 border border-dashed border-brand-border flex flex-col items-center justify-center text-center p-8">
              <MapPin className="w-8 h-8 text-brand-muted/40 mb-2" />
              <button className="text-xs font-bold text-brand-orange uppercase hover:underline">
                + Add New Address
              </button>
            </div>
          </div>
        )}

        {/* Tab Content: Rewards */}
        {activeTab === 'rewards' && (
          <div className="glass-card rounded-2xl p-8 border border-brand-border space-y-4">
            <h3 className="font-display font-bold text-2xl text-white">Your Pizza Club Perks</h3>
            <p className="text-xs text-brand-muted">You currently have {points} active Pizza Points.</p>
            <Link href="/pizza-club" className="inline-block px-5 py-2.5 rounded-xl bg-brand-orange text-white text-xs font-bold uppercase shadow-glow">
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
