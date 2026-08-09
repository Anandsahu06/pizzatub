'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flame, Search, ShoppingBag, MapPin, User, Menu as MenuIcon, X, Clock, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLocation } from '@/context/LocationContext';
import { SearchModal } from '@/components/layout/SearchModal';
import { LocationModal } from '@/components/layout/LocationModal';
import { CartDrawer } from '@/components/layout/CartDrawer';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { itemCount, total, setIsCartOpen } = useCart();
  const { location, setIsLocationModalOpen } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Menu', href: '/menu' },
    { name: 'Deals', href: '/offers' },
    { name: 'Combos', href: '/menu?category=combos' },
    { name: 'Build Your Pizza', href: '/build-your-pizza' },
    { name: 'Pizza Club', href: '/pizza-club' },
    { name: 'Locations', href: '/locations' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#FFFFFF] border-b border-[#EAE3DA] shadow-sm">
        {/* Main Navigation Row */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          
          {/* Left: PIZZA TUB Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#E6392F] to-[#C92822] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300">
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

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xs font-bold uppercase tracking-wider transition-colors relative py-1 ${
                    isActive ? 'text-[#E6392F]' : 'text-[#242424] hover:text-[#E6392F]'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#E6392F] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Commerce Action Buttons */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="p-2.5 rounded-xl bg-[#FFF8F0] hover:bg-[#FFF1DD] border border-[#EAE3DA] text-[#242424] transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Sign In / Account */}
            <Link
              href="/account"
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FFF8F0] hover:bg-[#FFF1DD] border border-[#EAE3DA] text-xs font-bold text-[#242424] transition-colors"
            >
              <User className="w-4 h-4 text-[#E6392F]" />
              <span>Sign In</span>
            </Link>

            {/* Cart Button: Cart · 2 items · ₹748 (Rounded Red Button) */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#E6392F] hover:bg-[#C92822] text-white font-extrabold text-xs shadow-md transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Cart · {itemCount} item{itemCount !== 1 ? 's' : ''} · ₹{total}</span>
            </button>

            {/* Mobile Drawer Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-[#FFF8F0] border border-[#EAE3DA] text-[#242424]"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Delivery Context Bar Below Header */}
        <div className="bg-[#FFF8F0] border-t border-[#EAE3DA] py-2 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-medium text-[#242424]">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#E6392F]" />
              <span>Deliver to: <strong className="font-bold text-[#242424]">{location.area}, {location.city}</strong></span>
              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="text-[#E6392F] font-bold hover:underline ml-1 text-[11px]"
              >
                Change
              </button>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-[#6B6B6B]">
              <Clock className="w-3.5 h-3.5 text-[#2E8B57]" />
              <span>Estimated Delivery: <strong className="text-[#2E8B57] font-bold">{location.estimatedDeliveryMin} min</strong></span>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-[#EAE3DA] p-5 space-y-3">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-bold text-[#242424] hover:text-[#E6392F] py-1.5"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="pt-3 border-t border-[#EAE3DA] flex gap-2">
              <Link
                href="/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#FFF8F0] text-center text-xs font-bold text-[#242424] border border-[#EAE3DA]"
              >
                My Account
              </Link>
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#FFF1DD] text-center text-xs font-bold text-[#E6392F]"
              >
                Admin Console
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Modals */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <LocationModal />
      <CartDrawer />
    </>
  );
};
