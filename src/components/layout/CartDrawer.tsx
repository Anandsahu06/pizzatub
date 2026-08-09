'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, Trash2, Tag, ArrowRight, Sparkles, Truck, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discountAmount,
    deliveryFee,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;
    const result = applyCoupon(couponCode);
    setCouponFeedback(result);
  };

  // Free delivery threshold: ₹500
  const freeDeliveryThreshold = 500;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[995] flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Drawer Container */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 26, stiffness: 220 }}
          className="relative z-10 w-full max-w-md bg-[#FFF8F0] border-l border-[#EAE3DA] h-full flex flex-col shadow-2xl"
        >
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#EAE3DA] flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E6392F] to-[#C92822] flex items-center justify-center text-white shadow-md">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-[#242424]">Your Tub Craving</h3>
                <p className="text-xs text-[#6B6B6B] font-medium">{cart.length} item{cart.length !== 1 ? 's' : ''} selected</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-[#6B6B6B] hover:text-[#E6392F] font-semibold transition-colors px-2 py-1"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full text-[#6B6B6B] hover:text-[#242424] hover:bg-[#FFF8F0] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Free Delivery Meter */}
          {cart.length > 0 && (
            <div className="px-5 py-3.5 bg-[#FFF1DD] border-b border-[#FFC857]/40 space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold">
                <div className="flex items-center gap-1.5 text-[#242424]">
                  <Truck className="w-4 h-4 text-[#E6392F]" />
                  {remainingForFreeDelivery > 0 ? (
                    <span>Add <strong className="text-[#E6392F]">₹{remainingForFreeDelivery}</strong> more for FREE delivery</span>
                  ) : (
                    <span className="text-[#2E8B57] font-extrabold">🎉 You&apos;ve unlocked FREE Express Delivery!</span>
                  )}
                </div>
                <span className="text-[10px] text-[#6B6B6B] font-bold">{freeDeliveryProgress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#EAE3DA] overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#FFC857] to-[#2E8B57] transition-all duration-500"
                  style={{ width: `${freeDeliveryProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#6B6B6B]">
                <div className="w-20 h-20 rounded-full bg-white border border-[#EAE3DA] flex items-center justify-center mb-4 shadow-md">
                  <ShoppingBag className="w-10 h-10 text-[#E6392F]" />
                </div>
                <h4 className="font-display text-lg font-bold text-[#242424] mb-1">Your cart is empty</h4>
                <p className="text-xs text-[#6B6B6B] max-w-xs mb-6 font-medium">
                  Add some Tub Supreme pizzas or create your custom pizza masterpiece!
                </p>
                <Link
                  href="/menu"
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#E6392F] to-[#C92822] text-white text-xs font-extrabold uppercase tracking-wider shadow-md hover:scale-105 transition-all"
                >
                  Explore Food Menu
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-3xl bg-white border border-[#EAE3DA] flex gap-3.5 relative group hover:border-[#E6392F]/40 shadow-sm transition-all"
                >
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-[#FFF8F0] border border-[#EAE3DA]">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h4 className="font-bold text-sm text-[#242424]">{item.name}</h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#6B6B6B] hover:text-[#E6392F] p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-[11px] text-[#6B6B6B] mt-0.5 space-y-0.5 font-medium">
                      {item.size && <span className="inline-block bg-[#FFF8F0] px-2 py-0.5 rounded-md border border-[#EAE3DA] text-[#242424] mr-1.5">{item.size}</span>}
                      {item.crust && <span className="inline-block bg-[#FFF8F0] px-2 py-0.5 rounded-md border border-[#EAE3DA] text-[#242424]">{item.crust}</span>}
                      {item.toppings && item.toppings.length > 0 && (
                        <p className="line-clamp-1 text-[10px] text-[#6B6B6B]">
                          Toppings: {item.toppings.join(', ')}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="font-display font-black text-sm text-[#242424]">₹{item.unitPrice * item.quantity}</span>

                      <div className="flex items-center border border-[#EAE3DA] rounded-xl bg-[#FFF8F0]">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 flex items-center justify-center text-[#6B6B6B] hover:text-[#E6392F] font-bold"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-[#242424]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 flex items-center justify-center text-[#6B6B6B] hover:text-[#E6392F] font-bold"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Coupon Input & Subtotal Footer */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#EAE3DA] bg-white space-y-4 shadow-lg">
              {/* Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#2E8B57]" />
                      <span className="font-bold text-[#2E8B57]">Promo Code {appliedCoupon.code} Applied</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-[#2E8B57] hover:underline font-semibold text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-3 w-4 h-4 text-[#6B6B6B]" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Promo code (e.g. FIRST50)"
                        className="w-full bg-[#FFF8F0] border border-[#EAE3DA] rounded-2xl pl-9 pr-3 py-2.5 text-xs text-[#242424] uppercase placeholder:normal-case placeholder:text-[#6B6B6B] focus:border-[#E6392F] focus:outline-none font-medium"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-2xl bg-[#FFF1DD] hover:bg-[#FFC857] border border-[#FFC857]/60 text-xs font-extrabold text-[#C92822] uppercase tracking-wide transition-all"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponFeedback && (
                  <p className={`text-[11px] mt-1 font-semibold ${couponFeedback.success ? 'text-[#2E8B57]' : 'text-[#E6392F]'}`}>
                    {couponFeedback.message}
                  </p>
                )}
              </div>

              {/* Price Calculations */}
              <div className="space-y-1.5 text-xs text-[#6B6B6B] font-medium">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#242424] font-bold">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#2E8B57] font-bold">
                    <span>Discount Applied</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Delivery Fee</span>
                  <span className="text-[#242424] font-bold">
                    {deliveryFee === 0 ? <span className="text-[#2E8B57] font-black uppercase text-[10px]">FREE</span> : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between pt-2.5 border-t border-[#EAE3DA] text-base font-black text-[#242424]">
                  <span>Total Amount</span>
                  <span className="text-[#E6392F] font-display">₹{total}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                onClick={() => setIsCartOpen(false)}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#E6392F] to-[#C92822] hover:from-[#C92822] hover:to-[#E6392F] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:scale-102 transition-all group"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
