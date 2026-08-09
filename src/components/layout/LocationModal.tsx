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
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative z-10 w-full max-w-lg bg-brand-card border border-brand-border rounded-2xl p-6 shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-brand-border pb-4 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-brand-red" />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg text-white">Where should we deliver?</h3>
                <p className="text-xs text-brand-muted">Enter location for live store availability & ETA</p>
              </div>
            </div>
            <button
              onClick={() => setIsLocationModalOpen(false)}
              className="p-2 rounded-full text-brand-muted hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current Saved Location */}
          <div className="p-3.5 rounded-xl bg-brand-surface border border-brand-border mb-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-brand-muted">Active Zone</span>
                <p className="text-sm font-semibold text-white">{location.address}, {location.city}</p>
              </div>
            </div>
            <span className="text-xs font-bold text-brand-orange bg-brand-orange/10 px-2.5 py-1 rounded-full border border-brand-orange/30">
              {location.estimatedDeliveryMin} Mins
            </span>
          </div>

          {/* Auto Detect Button */}
          <button
            onClick={handleAutoDetect}
            disabled={isDetecting}
            className="w-full mb-4 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-glow hover:opacity-95 transition-all"
          >
            <Navigation className={`w-4 h-4 ${isDetecting ? 'animate-spin' : ''}`} />
            {isDetecting ? 'Detecting current GPS location...' : 'Use My Current Location'}
          </button>

          {/* Manual Address Form */}
          <form onSubmit={handleManualSubmit} className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-brand-muted" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter building, street name, or pincode..."
                className="w-full bg-brand-surface border border-brand-border rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:border-brand-orange focus:outline-none placeholder:text-brand-muted font-body"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-brand-surface border border-brand-border hover:border-brand-orange text-brand-cream text-xs font-bold uppercase tracking-wider transition-all"
            >
              Check Delivery Serviceability
            </button>
          </form>

          {/* Feedback Banner */}
          {feedbackMsg && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-4 p-3 rounded-xl border flex items-start gap-2.5 text-xs font-medium ${
                feedbackMsg.isServed
                  ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                  : 'bg-red-950/40 border-red-800 text-red-300'
              }`}
            >
              {feedbackMsg.isServed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              )}
              <span>{feedbackMsg.text}</span>
            </motion.div>
          )}

          {/* Popular Zones */}
          <div className="mt-5 pt-4 border-t border-brand-border">
            <p className="text-[11px] uppercase tracking-wider text-brand-muted font-semibold mb-2">Delivery Hubs</p>
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
                  className="px-2.5 py-1 rounded-lg bg-brand-surface hover:bg-white/10 text-xs text-brand-cream border border-brand-border transition-colors"
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
