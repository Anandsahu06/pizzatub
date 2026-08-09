'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Utensils, Navigation, Gift, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export const MobileNav: React.FC = () => {
  const pathname = usePathname();
  const { itemCount, total, setIsCartOpen } = useCart();

  const mobileTabs = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Menu', href: '/menu', icon: Utensils },
    { name: 'Orders', href: '/track-order', icon: Navigation },
    { name: 'Pizza Club', href: '/pizza-club', icon: Gift },
    { name: 'Account', href: '/account', icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EAE3DA] px-3 py-2 shadow-2xl">
      {/* Floating Sticky Cart Bar above bottom nav if items exist */}
      {itemCount > 0 && (
        <div className="mb-2">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full py-3 px-4 rounded-2xl bg-[#E6392F] text-white font-extrabold text-xs flex items-center justify-between shadow-lg"
          >
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-white text-[#E6392F] font-black text-[10px] flex items-center justify-center">
                {itemCount}
              </span>
              <span>View Active Order</span>
            </div>
            <span className="font-black">₹{total} →</span>
          </button>
        </div>
      )}

      {/* Nav Buttons Grid */}
      <div className="grid grid-cols-5 gap-1 text-center">
        {mobileTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href;

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-colors ${
                isActive ? 'text-[#E6392F] font-bold' : 'text-[#6B6B6B] hover:text-[#242424]'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[10px] tracking-tight font-semibold">{tab.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
