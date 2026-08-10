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
    <div className="min-h-screen bg-[#FFF8F0] text-[#242424] flex flex-col font-body">
      <Navbar />

      <main className="flex-1 pt-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Title */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1DD] border border-[#FFC857] text-xs font-extrabold text-[#C92822] mb-3">
            <MessageSquare className="w-4 h-4 text-[#E6392F]" />
            <span>SUPPORT DESK</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[#242424] tracking-tight">
            Talk to <span className="text-[#E6392F]">Pizza Tub.</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1 font-medium">
            Need help with an order, party catering, or franchise query? Send us a message!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Info cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-6 rounded-3xl border border-[#EAE3DA] space-y-3 shadow-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FFF1DD] border border-[#FFC857] flex items-center justify-center text-[#E6392F]">
                  <Phone className="w-5 h-5 text-[#E6392F]" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#242424]">Direct Phone Support</h4>
                  <p className="text-xs text-[#E6392F] font-black">+91 80 4920 1888</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#EAE3DA] space-y-3 shadow-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FFF1DD] border border-[#FFC857] flex items-center justify-center text-[#E6392F]">
                  <Mail className="w-5 h-5 text-[#E6392F]" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#242424]">Email Desk</h4>
                  <p className="text-xs text-[#E6392F] font-black">support@pizzatub.in</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-[#EAE3DA] space-y-3 shadow-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FFF1DD] border border-[#FFC857] flex items-center justify-center text-[#C92822]">
                  <MapPin className="w-5 h-5 text-[#E6392F]" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-[#242424]">HQ Studio</h4>
                  <p className="text-xs text-[#6B6B6B] font-medium">100 Feet Road, Indiranagar, Bengaluru</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE3DA] shadow-xl">
            {submitted ? (
              <div className="py-12 text-center text-[#2E8B57] space-y-2">
                <CheckCircle2 className="w-12 h-12 mx-auto text-[#2E8B57]" />
                <h3 className="font-display font-extrabold text-2xl text-[#242424]">Message Received!</h3>
                <p className="text-xs text-[#6B6B6B] font-medium">Our customer delight team will reply within 15 minutes.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-display font-extrabold text-xl text-[#242424] mb-4">Send an Inquiry</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    className="bg-[#FFF8F0] border border-[#EAE3DA] rounded-2xl p-3.5 text-xs text-[#242424] focus:border-[#E6392F] focus:outline-none font-medium"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    className="bg-[#FFF8F0] border border-[#EAE3DA] rounded-2xl p-3.5 text-xs text-[#242424] focus:border-[#E6392F] focus:outline-none font-medium"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Order ID (Optional)"
                  className="w-full bg-[#FFF8F0] border border-[#EAE3DA] rounded-2xl p-3.5 text-xs text-[#242424] focus:border-[#E6392F] focus:outline-none font-medium"
                />
                <textarea
                  required
                  rows={4}
                  placeholder="How can we assist your pizza craving?"
                  className="w-full bg-[#FFF8F0] border border-[#EAE3DA] rounded-2xl p-3.5 text-xs text-[#242424] focus:border-[#E6392F] focus:outline-none font-medium"
                />
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#E6392F] to-[#C92822] hover:from-[#C92822] hover:to-[#E6392F] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg hover:scale-102 transition-all flex items-center justify-center gap-2"
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
