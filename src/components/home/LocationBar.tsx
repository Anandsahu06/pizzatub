'use client';

import React from 'react';
import { MapPin, ChevronRight, Clock, Navigation } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';

export const LocationBar: React.FC = () => {
  const { location, setIsLocationModalOpen, detectLocation } = useLocation();
  const [isDetecting, setIsDetecting] = React.useState(false);

  const handleDetect = async () => {
    setIsDetecting(true);
    await detectLocation();
    setIsDetecting(false);
  };

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-12">
      <div className="bg-white p-5 rounded-3xl border border-[#EAE3DA] shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Delivery Address Input / Label */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-12 h-12 rounded-2xl bg-[#FFF1DD] border border-[#FFC857] flex items-center justify-center shrink-0">
            <MapPin className="w-6 h-6 text-[#E6392F]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-extrabold text-[#6B6B6B]">
                Where should we deliver?
              </span>
              <span className="w-2 h-2 rounded-full bg-[#2E8B57]" />
              <span className="text-[11px] text-[#2E8B57] font-bold uppercase tracking-wider">
                Store Open
              </span>
            </div>
            <h3 className="font-display font-bold text-[#242424] text-base sm:text-lg">
              {location.address}, {location.city}
            </h3>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-[#EAE3DA] pt-3 md:pt-0">
          <button
            onClick={handleDetect}
            disabled={isDetecting}
            className="px-4 py-2.5 rounded-2xl bg-[#FFF8F0] hover:bg-[#FFF1DD] border border-[#EAE3DA] text-xs font-bold text-[#242424] flex items-center gap-1.5 transition-colors"
          >
            <Navigation className="w-4 h-4 text-[#E6392F]" />
            <span>{isDetecting ? 'Detecting...' : 'Use Current Location'}</span>
          </button>

          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="px-5 py-2.5 rounded-2xl bg-[#E6392F] hover:bg-[#C92822] text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md"
          >
            <span>Enter Address</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
