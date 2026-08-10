'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, CheckCircle2, AlertCircle, Search, X } from 'lucide-react';
import { useLocation } from '@/context/LocationContext';

export const LocationModal: React.FC = () => {
  const { location, setLocation, isLocationModalOpen, setIsLocationModalOpen, detectLocation, checkServiceability } = useLocation();
  const [searchInput, setSearchInput] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ isServed: boolean; text: string } | null>(null);

  if (!isLocationModalOpen) return null;

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    const serviceable = checkServiceability(searchInput);
    if (serviceable) {
      setLocation({
        address: searchInput,
        area: searchInput.split(',')[0] || 'Selected Delivery Zone',
        isServed: true,
        estimatedDeliveryMin: Math.floor(22 + Math.random() * 12),
      });
      setFeedbackMsg({ isServed: true, text: `Delivering to ${searchInput}. Estimated 25-30 mins!` });
      setTimeout(() => {
        setIsLocationModalOpen(false);
        setFeedbackMsg(null);
      }, 1000);
    } else {
      setFeedbackMsg({
        isServed: false,
        text: "Sorry, we're not delivering here yet. Check nearby Indiranagar, Koramangala, or Bandra stores!",
      });
    }
  };

  const handleAutoDetect = async () => {
    setIsDetecting(true);
    await detectLocation();
    setIsDetecting(false);
    setFeedbackMsg({ isServed: true, text: 'Location updated automatically via GPS!' });
    setTimeout(() => {
      setIsLocationModalOpen(false);
      setFeedbackMsg(null);
    }, 1000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[990] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsLocationModalOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative z-10 w-full max-w-lg bg-[#FFF8F0] border border-[#EAE3DA] rounded-3xl p-6 sm:p-7 shadow-2xl overflow-hidden text-[#242424]"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#EAE3DA] pb-4 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FFF1DD] border border-[#FFC857] flex items-center justify-center text-[#C92822]">
                <MapPin className="w-5 h-5 text-[#E6392F]" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-xl text-[#242424]">Where should we deliver?</h3>
                <p className="text-xs text-[#6B6B6B] font-medium">Enter location for live store availability & ETA</p>
              </div>
            </div>
            <button
              onClick={() => setIsLocationModalOpen(false)}
              className="p-2 rounded-full text-[#6B6B6B] hover:text-[#242424] hover:bg-[#FFF1DD] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current Saved Location */}
          <div className="p-4 rounded-2xl bg-white border border-[#EAE3DA] mb-5 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[#2E8B57] animate-pulse" />
              <div>
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#6B6B6B]">ACTIVE ZONE</span>
                <p className="text-sm font-bold text-[#242424]">{location.address}, {location.city}</p>
              </div>
            </div>
            <span className="text-xs font-black text-[#242424] bg-[#FFF1DD] px-3 py-1 rounded-full border border-[#FFC857]">
              {location.estimatedDeliveryMin} Mins
            </span>
          </div>

          {/* Auto Detect Button */}
          <button
            onClick={handleAutoDetect}
            disabled={isDetecting}
            className="w-full mb-4 py-3.5 px-4 rounded-full bg-gradient-to-r from-[#E6392F] to-[#C92822] hover:from-[#C92822] hover:to-[#E6392F] text-white font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:scale-102 transition-all disabled:opacity-60"
          >
            <Navigation className={`w-4 h-4 ${isDetecting ? 'animate-spin' : ''}`} />
            <span>{isDetecting ? 'Detecting current GPS location...' : 'Use My Current Location'}</span>
          </button>

          {/* Manual Address Form */}
          <form onSubmit={handleManualSubmit} className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-[#6B6B6B]" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter building, street name, or pincode..."
                className="w-full bg-white border border-[#EAE3DA] rounded-2xl pl-10 pr-4 py-3 text-xs text-[#242424] focus:border-[#E6392F] focus:outline-none placeholder:text-[#6B6B6B] font-medium shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-[#FFF1DD] hover:bg-[#FFC857] border border-[#FFC857]/60 text-[#C92822] text-xs font-extrabold uppercase tracking-wider transition-all shadow-sm"
            >
              Check Delivery Serviceability
            </button>
          </form>

          {/* Feedback Banner */}
          {feedbackMsg && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-3.5 rounded-2xl border flex items-start gap-2.5 text-xs font-bold ${
                feedbackMsg.isServed
                  ? 'bg-emerald-50 border-[#2E8B57] text-[#2E8B57]'
                  : 'bg-red-50 border-[#E6392F] text-[#E6392F]'
              }`}
            >
              {feedbackMsg.isServed ? (
                <CheckCircle2 className="w-4 h-4 text-[#2E8B57] shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-[#E6392F] shrink-0 mt-0.5" />
              )}
              <span>{feedbackMsg.text}</span>
            </motion.div>
          )}

          {/* Popular Zones */}
          <div className="mt-5 pt-4 border-t border-[#EAE3DA]">
            <p className="text-[11px] uppercase tracking-wider text-[#6B6B6B] font-extrabold mb-2.5">DELIVERY HUBS</p>
            <div className="flex flex-wrap gap-2">
              {['Indiranagar, Blr', 'Koramangala, Blr', 'Bandra West, Mum', 'Connaught Place, Delhi'].map((zone) => (
                <button
                  key={zone}
                  onClick={() => {
                    setSearchInput(zone);
                    setLocation({
                      address: zone,
                      city: zone.includes('Blr') ? 'Bengaluru' : zone.includes('Mum') ? 'Mumbai' : 'Delhi',
                      isServed: true,
                      estimatedDeliveryMin: 26,
                    });
                    setIsLocationModalOpen(false);
                  }}
                  className="px-3 py-1.5 rounded-full bg-white hover:bg-[#FFF1DD] text-xs font-bold text-[#242424] border border-[#EAE3DA] transition-colors shadow-sm"
                >
                  {zone}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
