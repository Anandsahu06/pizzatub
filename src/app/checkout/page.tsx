'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { useCart } from '@/context/CartContext';
import { useLocation } from '@/context/LocationContext';
import { useOrders } from '@/context/OrderContext';
import { MapPin, CreditCard, ShieldCheck, CheckCircle2, ArrowRight, Lock, Sparkles, Tag, ShoppingBag } from 'lucide-react';
import Image from 'next/image';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, discountAmount, deliveryFee, total, clearCart, appliedCoupon, applyCoupon, removeCoupon } = useCart();
  const { location } = useLocation();
  const { createOrder } = useOrders();

  const [step, setStep] = useState<number>(1);
  const [addressType, setAddressType] = useState<'Home' | 'Work' | 'Other'>('Home');
  const [customAddress, setCustomAddress] = useState(location.address || '100 Feet Road, Indiranagar');
  const [deliveryNote, setDeliveryNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'NetBanking' | 'COD'>('UPI');
  const [promoInput, setPromoInput] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFF8F0] text-[#242424] flex flex-col font-body">
        <Navbar />
        <main className="flex-1 pt-24 pb-24 max-w-xl mx-auto px-4 text-center">
          <div className="bg-white p-10 rounded-3xl border border-[#EAE3DA] shadow-xl">
            <ShoppingBag className="w-12 h-12 text-[#E6392F] mx-auto mb-4" />
            <h2 className="font-display font-black text-2xl text-[#242424] mb-2">Your cart is empty</h2>
            <p className="text-xs text-[#6B6B6B] mb-6 font-medium">Add items from our menu before proceeding to checkout.</p>
            <button
              onClick={() => router.push('/menu')}
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#E6392F] to-[#C92822] text-white text-xs font-extrabold uppercase shadow-lg hover:scale-105 transition-all"
            >
              Explore Menu
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setIsProcessingPayment(true);

    // Simulate Gateway processing delay
    setTimeout(() => {
      const newOrder = createOrder(
        cart,
        subtotal,
        deliveryFee,
        discountAmount,
        total,
        `${customAddress} (${addressType})`,
        paymentMethod
      );

      clearCart();
      setIsProcessingPayment(false);
      router.push(`/order-confirmation?id=${newOrder.id}`);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#242424] flex flex-col font-body">
      <Navbar />

      <main className="flex-1 pt-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1DD] border border-[#FFC857] text-xs font-extrabold text-[#C92822] mb-3">
            <ShieldCheck className="w-4 h-4 text-[#2E8B57]" />
            <span>256-BIT SSL ENCRYPTED EXPRESS CHECKOUT</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-[#242424] tracking-tight">
            Checkout <span className="text-[#E6392F]">& Order Placement.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Steps */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Delivery Address */}
            <div className="bg-white rounded-3xl p-6 border border-[#EAE3DA] shadow-card space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#E6392F] text-white font-black text-xs flex items-center justify-center">1</span>
                <h3 className="font-display font-bold text-lg text-[#242424]">Delivery Address</h3>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2">
                {(['Home', 'Work', 'Other'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setAddressType(t)}
                    className={`py-2.5 px-3 rounded-2xl text-xs font-extrabold border transition-all ${
                      addressType === t
                        ? 'bg-[#E6392F] text-white border-[#E6392F] shadow-md'
                        : 'bg-[#FFF8F0] border-[#EAE3DA] text-[#242424] hover:bg-[#FFF1DD]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <label className="text-xs text-[#6B6B6B] block mb-1 font-bold">Street Address / Landmark</label>
                <textarea
                  value={customAddress}
                  onChange={(e) => setCustomAddress(e.target.value)}
                  rows={2}
                  className="w-full bg-[#FFF8F0] border border-[#EAE3DA] rounded-2xl p-3 text-xs text-[#242424] focus:border-[#E6392F] focus:outline-none font-medium"
                />
              </div>
            </div>

            {/* Step 2: Delivery Instructions */}
            <div className="bg-white rounded-3xl p-6 border border-[#EAE3DA] shadow-card space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#FFC857] text-[#242424] font-black text-xs flex items-center justify-center">2</span>
                <h3 className="font-display font-bold text-lg text-[#242424]">Kitchen & Rider Instructions</h3>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                {['Ring Doorbell', 'Leave at Gate', 'Avoid Call', 'Extra Chili Flakes'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setDeliveryNote((prev) => (prev.includes(tag) ? prev : `${prev} ${tag}`.trim()))}
                    className="p-3 rounded-2xl bg-[#FFF8F0] border border-[#EAE3DA] text-[#242424] hover:border-[#E6392F] hover:bg-[#FFF1DD] text-left transition-all"
                  >
                    + {tag}
                  </button>
                ))}
              </div>

              <input
                type="text"
                value={deliveryNote}
                onChange={(e) => setDeliveryNote(e.target.value)}
                placeholder="Optional instructions for kitchen chef or rider..."
                className="w-full bg-[#FFF8F0] border border-[#EAE3DA] rounded-2xl p-3 text-xs text-[#242424] focus:border-[#E6392F] focus:outline-none font-medium"
              />
            </div>

            {/* Step 3: Payment Method */}
            <div className="bg-white rounded-3xl p-6 border border-[#EAE3DA] shadow-card space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-full bg-[#2E8B57] text-white font-black text-xs flex items-center justify-center">3</span>
                <h3 className="font-display font-bold text-lg text-[#242424]">Select Payment Method</h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'UPI', label: 'UPI (GPay / PhonePe)', sub: 'Instant 1-Tap Pay' },
                  { id: 'Card', label: 'Credit / Debit Card', sub: 'Visa, Mastercard, RuPay' },
                  { id: 'NetBanking', label: 'Net Banking', sub: 'All major banks' },
                  { id: 'COD', label: 'Cash on Delivery', sub: 'Pay cash to rider' },
                ].map((pm) => (
                  <button
                    key={pm.id}
                    onClick={() => setPaymentMethod(pm.id as any)}
                    className={`p-4 rounded-3xl border text-left transition-all ${
                      paymentMethod === pm.id
                        ? 'bg-[#FFF1DD] border-[#E6392F] shadow-md'
                        : 'bg-[#FFF8F0] border-[#EAE3DA] hover:bg-white'
                    }`}
                  >
                    <span className="font-extrabold text-sm text-[#242424] block">{pm.label}</span>
                    <span className="text-[10px] text-[#6B6B6B] font-bold">{pm.sub}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Order Summary Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-[#EAE3DA] shadow-xl space-y-6">
              <h3 className="font-display font-bold text-xl text-[#242424] pb-3 border-b border-[#EAE3DA]">
                Order Summary ({cart.length} items)
              </h3>

              {/* Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-xs font-medium">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-[#E6392F]">{item.quantity}x</span>
                      <div>
                        <span className="text-[#242424] font-bold block">{item.name}</span>
                        {item.size && <span className="text-[10px] text-[#6B6B6B] font-bold">{item.size}</span>}
                      </div>
                    </div>
                    <span className="font-bold text-[#242424]">₹{item.unitPrice * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Price Calculations */}
              <div className="space-y-2 text-xs text-[#6B6B6B] pt-4 border-t border-[#EAE3DA] font-medium">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="text-[#242424] font-bold">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#2E8B57] font-bold">
                    <span>Coupon Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="text-[#242424] font-bold">{deliveryFee === 0 ? <span className="text-[#2E8B57] font-black uppercase text-[10px]">FREE</span> : `₹${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[#EAE3DA] text-2xl font-black text-[#242424]">
                  <span>To Pay</span>
                  <span className="text-[#E6392F]">₹{total}</span>
                </div>
              </div>

              {/* Order Placement Trigger */}
              <button
                onClick={handlePlaceOrder}
                disabled={isProcessingPayment}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#E6392F] to-[#C92822] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg hover:scale-102 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessingPayment ? (
                  <>
                    <Sparkles className="w-5 h-5 animate-spin" />
                    <span>Connecting Payment Gateway...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>PLACE ORDER (₹{total})</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
