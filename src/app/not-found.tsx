'use client';

import React from 'react';
import Link from 'next/link';
import { Flame, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#090909] text-white flex flex-col items-center justify-center p-6 text-center font-body">
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-brand-red to-brand-orange flex items-center justify-center shadow-glow mb-6 animate-bounce">
        <Flame className="w-10 h-10 text-white" />
      </div>

      <span className="font-mono font-black text-6xl text-brand-orange mb-2">404</span>

      <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-3">
        Looks like this slice got lost.
      </h1>

      <p className="text-xs sm:text-sm text-brand-muted max-w-md mb-8">
        The page you are looking for might have been eaten or moved to another delivery hub.
      </p>

      <Link
        href="/"
        className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-brand-red to-brand-orange text-white font-bold text-xs uppercase tracking-wider shadow-glow hover:scale-105 transition-all flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO HOMEPAGE</span>
      </Link>
    </div>
  );
}
