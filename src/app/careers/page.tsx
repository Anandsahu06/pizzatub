'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { Flame, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CareersPage() {
  const [appliedRole, setAppliedRole] = useState<string | null>(null);

  const jobs = [
    { title: 'Master Pizzaiolo', dept: 'Kitchen Operations', loc: 'Bengaluru Flagship', type: 'Full-time' },
    { title: 'Fleet Logistics Captain', dept: 'Delivery Operations', loc: 'Mumbai Studio', type: 'Full-time' },
    { title: 'Food Commerce Product Designer', dept: 'Digital Agency', loc: 'Remote / Bengaluru', type: 'Full-time' },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#242424] flex flex-col font-body">
      <Navbar />

      <main className="flex-1 pt-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1DD] border border-[#FFC857] text-xs font-extrabold text-[#C92822]">
            <Briefcase className="w-4 h-4 text-[#E6392F]" />
            <span>JOIN OUR TEAM</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-[#242424] tracking-tight">
            Build the Future of <span className="text-[#E6392F]">Food Tech.</span>
          </h1>
          <p className="text-xs sm:text-base text-[#6B6B6B] leading-relaxed font-medium">
            We are hiring pizzaiolos, logistics managers, and frontend craft engineers passionate about perfection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.map((job, idx) => (
            <div key={idx} className="product-card-bright rounded-3xl p-6 border border-[#EAE3DA] bg-white flex flex-col justify-between shadow-card">
              <div>
                <span className="px-3 py-1 rounded-full bg-[#FFF1DD] border border-[#FFC857] text-[10px] text-[#C92822] font-extrabold uppercase">
                  {job.dept}
                </span>
                <h3 className="font-display font-black text-xl text-[#242424] mt-3 mb-1">{job.title}</h3>
                <p className="text-xs text-[#6B6B6B] mb-5 font-medium">{job.loc} • {job.type}</p>
              </div>

              <button
                onClick={() => setAppliedRole(job.title)}
                className="w-full py-3 rounded-2xl bg-[#E6392F] hover:bg-[#C92822] text-white text-xs font-extrabold uppercase shadow-md transition-all"
              >
                APPLY FOR ROLE
              </button>
            </div>
          ))}
        </div>

        {appliedRole && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-[#2E8B57] text-xs font-extrabold text-[#2E8B57] flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#2E8B57]" />
              <span>Application received for {appliedRole}! Our talent team will contact you.</span>
            </div>
            <button onClick={() => setAppliedRole(null)} className="text-[#242424] underline">Close</button>
          </div>
        )}
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
