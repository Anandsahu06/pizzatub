'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { STORE_LOCATIONS } from '@/data/mockData';
import { MapPin, Phone, Clock, Navigation, Search, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function LocationsPage() {
  const [searchCity, setSearchCity] = useState('');

  const filteredStores = STORE_LOCATIONS.filter(
    (s) =>
      s.name.toLowerCase().includes(searchCity.toLowerCase()) ||
      s.city.toLowerCase().includes(searchCity.toLowerCase()) ||
      s.address.toLowerCase().includes(searchCity.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#242424] flex flex-col font-body">
      <Navbar />

      <main className="flex-1 pt-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Title */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1DD] border border-[#FFC857] text-xs font-extrabold text-[#C92822] mb-3">
            <MapPin className="w-4 h-4 text-[#E6392F]" />
            <span>STORE LOCATOR</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[#242424] tracking-tight">
            Find Your Nearest <span className="text-[#E6392F]">Tub Kitchen.</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1 font-medium">
            Search by city or area to find flagship stores, kitchen hours, phone numbers, and direct delivery routes.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md mb-10">
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-[#6B6B6B]" />
          <input
            type="text"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="Search by city (Bengaluru, Mumbai, Delhi)..."
            className="w-full bg-white border border-[#EAE3DA] rounded-2xl pl-10 pr-4 py-3 text-xs text-[#242424] placeholder:text-[#6B6B6B] focus:border-[#E6392F] focus:outline-none font-medium shadow-sm"
          />
        </div>

        {/* Stores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredStores.map((store) => (
            <div
              key={store.id}
              className="product-card-bright rounded-3xl p-6 border border-[#EAE3DA] bg-white flex flex-col justify-between shadow-card hover:shadow-card-hover"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 border border-[#2E8B57] text-[#2E8B57] font-extrabold text-[10px] uppercase">
                    ● Store Open ({store.openingHours})
                  </span>
                  <span className="text-xs font-extrabold text-[#E6392F]">{store.distanceKm} km away</span>
                </div>

                <h3 className="font-display font-black text-2xl text-[#242424] mb-2">{store.name}</h3>
                <p className="text-xs text-[#6B6B6B] mb-4 leading-relaxed flex items-start gap-2 font-medium">
                  <MapPin className="w-4 h-4 text-[#E6392F] shrink-0 mt-0.5" />
                  <span>{store.address}</span>
                </p>

                <div className="space-y-2 text-xs text-[#6B6B6B] mb-6 font-medium">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#E6392F]" />
                    <span className="text-[#242424] font-bold">{store.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#E6392F]" />
                    <span>Hours: {store.openingHours}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EAE3DA] flex items-center justify-between gap-3">
                <a
                  href={`https://maps.google.com/?q=${store.lat},${store.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-2xl bg-[#FFF8F0] hover:bg-[#FFF1DD] border border-[#EAE3DA] text-xs font-bold text-[#242424] flex items-center gap-1.5 transition-all"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#E6392F]" />
                  <span>Get Directions</span>
                </a>

                <Link
                  href="/menu"
                  className="px-5 py-2.5 rounded-2xl bg-[#E6392F] hover:bg-[#C92822] text-white font-extrabold text-xs uppercase tracking-wider shadow-md flex items-center gap-1 transition-all"
                >
                  <span>ORDER FROM STORE</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
