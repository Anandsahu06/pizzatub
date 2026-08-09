'use client';

import React from 'react';
import Link from 'next/link';
import { Flame, Phone, Mail, MapPin, Globe, Camera, Share2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#EAE3DA] pt-16 pb-24 lg:pb-12 text-[#242424]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#EAE3DA]">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E6392F] to-[#C92822] flex items-center justify-center text-white shadow-md">
                <Flame className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-2xl tracking-tight text-[#242424]">
                  PIZZA <span className="text-[#E6392F]">TUB</span>
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-[#6B6B6B] -mt-1">
                  Big Cravings. Bigger Slices.
                </span>
              </div>
            </Link>

            <p className="text-xs text-[#6B6B6B] leading-relaxed max-w-sm font-medium">
              National flagship food-commerce platform delivering 72-hour cold fermented sourdough pizzas baked in 500°C brick ovens.
            </p>
          </div>

          {/* Column 1: Food Menu */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-[#242424] mb-4">Food Menu</h4>
            <ul className="space-y-2.5 text-xs text-[#6B6B6B] font-medium">
              <li><Link href="/menu" className="hover:text-[#E6392F]">Signature Pizzas</Link></li>
              <li><Link href="/build-your-pizza" className="hover:text-[#E6392F]">Build Your Pizza</Link></li>
              <li><Link href="/menu?category=combos" className="hover:text-[#E6392F]">Craver Combos</Link></li>
              <li><Link href="/offers" className="hover:text-[#E6392F]">Deals & Coupons</Link></li>
              <li><Link href="/pizza-club" className="hover:text-[#E6392F]">Pizza Club Rewards</Link></li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-[#242424] mb-4">Company</h4>
            <ul className="space-y-2.5 text-xs text-[#6B6B6B] font-medium">
              <li><Link href="/story" className="hover:text-[#E6392F]">Brand Story</Link></li>
              <li><Link href="/kitchen" className="hover:text-[#E6392F]">Our Kitchen</Link></li>
              <li><Link href="/locations" className="hover:text-[#E6392F]">Store Locator</Link></li>
              <li><Link href="/blog" className="hover:text-[#E6392F]">Pizza Journal</Link></li>
              <li><Link href="/careers" className="hover:text-[#E6392F]">Careers</Link></li>
            </ul>
          </div>

          {/* Column 3: Portals */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-[#242424] mb-4">Portals</h4>
            <ul className="space-y-2.5 text-xs text-[#6B6B6B] font-medium">
              <li><Link href="/track-order" className="hover:text-[#E6392F]">Track Live Order</Link></li>
              <li><Link href="/account" className="hover:text-[#E6392F]">Customer Account</Link></li>
              <li><Link href="/admin" className="hover:text-[#E6392F]">Admin Console</Link></li>
              <li><Link href="/case-study" className="hover:text-[#E6392F]">Agency Case Study</Link></li>
              <li><Link href="/contact" className="hover:text-[#E6392F]">Contact Support</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Rights */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B6B6B] gap-4">
          <p>© {new Date().getFullYear()} PIZZA TUB India. All rights reserved.</p>
          <div className="flex gap-6 font-medium">
            <span className="hover:text-[#242424] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#242424] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#242424] cursor-pointer">FSSAI License #1001902200984</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
