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
    <div className="min-h-screen bg-brand-bg text-white flex flex-col font-body">
      <Navbar />

      <main className="flex-1 pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-surface border border-brand-border text-xs font-bold text-brand-orange">
            <Briefcase className="w-4 h-4 text-brand-red" />
            <span>Join Our Team</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white tracking-tight">
            Build the Future of <span className="text-brand-red">Food Tech.</span>
          </h1>
          <p className="text-xs sm:text-base text-brand-muted leading-relaxed">
            We are hiring pizzaiolos, logistics managers, and frontend craft engineers passionate about perfection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.map((job, idx) => (
            <div key={idx} className="glass-card rounded-2xl p-6 border border-brand-border flex flex-col justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-brand-border text-[10px] text-brand-orange font-bold uppercase">
                  {job.dept}
                </span>
                <h3 className="font-display font-bold text-xl text-white mt-2 mb-1">{job.title}</h3>
                <p className="text-xs text-brand-muted mb-4">{job.loc} • {job.type}</p>
              </div>

              <button
                onClick={() => setAppliedRole(job.title)}
                className="w-full py-2.5 rounded-xl bg-brand-red hover:bg-brand-red-hover text-white text-xs font-bold uppercase shadow-glow"
              >
                APPLY FOR ROLE
              </button>
            </div>
          ))}
        </div>

        {appliedRole && (
          <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-800 text-xs font-semibold text-emerald-400 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Application modal opened for {appliedRole}. Resume received!</span>
            </div>
            <button onClick={() => setAppliedRole(null)} className="text-white underline">Close</button>
          </div>
        )}
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
