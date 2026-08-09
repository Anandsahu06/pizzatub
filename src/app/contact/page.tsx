'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { Phone, Mail, MapPin, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-brand-bg text-white flex flex-col font-body">
      <Navbar />

      <main className="flex-1 pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-surface border border-brand-border text-xs font-bold text-brand-orange mb-3">
            <MessageSquare className="w-4 h-4 text-brand-red" />
            <span>Support Desk</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Talk to <span className="text-brand-red">Pizza Tub.</span>
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-1">
            Need help with an order, party catering, or franchise query? Send us a message!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Info cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-card p-6 rounded-2xl border border-brand-border space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Direct Phone Support</h4>
                  <p className="text-xs text-brand-orange font-semibold">+91 80 4920 1888</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-brand-border space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center text-brand-orange">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Email Desk</h4>
                  <p className="text-xs text-brand-orange font-semibold">support@pizzatub.in</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-brand-border space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-yellow/10 border border-brand-yellow/30 flex items-center justify-center text-brand-yellow">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">HQ Studio</h4>
                  <p className="text-xs text-brand-muted">100 Feet Road, Indiranagar, Bengaluru</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-brand-border bg-brand-surface">
            {submitted ? (
              <div className="py-12 text-center text-emerald-400 space-y-2">
                <CheckCircle2 className="w-12 h-12 mx-auto" />
                <h3 className="font-display font-bold text-2xl text-white">Message Received!</h3>
                <p className="text-xs text-brand-muted">Our customer delight team will reply within 15 minutes.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-display font-bold text-xl text-white mb-4">Send an Inquiry</h3>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    className="bg-brand-card border border-brand-border rounded-xl p-3 text-xs text-white focus:border-brand-orange focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    className="bg-brand-card border border-brand-border rounded-xl p-3 text-xs text-white focus:border-brand-orange focus:outline-none"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Order ID (Optional)"
                  className="w-full bg-brand-card border border-brand-border rounded-xl p-3 text-xs text-white focus:border-brand-orange focus:outline-none"
                />
                <textarea
                  required
                  rows={4}
                  placeholder="How can we assist your pizza craving?"
                  className="w-full bg-brand-card border border-brand-border rounded-xl p-3 text-xs text-white focus:border-brand-orange focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-red to-brand-orange text-white font-bold text-xs uppercase tracking-wider shadow-glow hover:scale-102 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
