'use client';

import React from 'react';
import Link from 'next/link';
import { Flame, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#242424] flex flex-col items-center justify-center p-6 text-center font-body">
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#E6392F] to-[#C92822] flex items-center justify-center shadow-lg mb-6 animate-bounce text-white">
        <Flame className="w-10 h-10" />
      </div>

      <span className="font-mono font-black text-6xl text-[#E6392F] mb-2">404</span>

      <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[#242424] tracking-tight mb-3">
        Looks like this slice got lost.
      </h1>

      <p className="text-xs sm:text-sm text-[#6B6B6B] max-w-md mb-8 font-medium">
        The page you are looking for might have been eaten or moved to another delivery hub.
      </p>

      <Link
        href="/"
        className="px-8 py-4 rounded-full bg-gradient-to-r from-[#E6392F] to-[#C92822] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg hover:scale-105 transition-all flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>BACK TO HOMEPAGE</span>
      </Link>
    </div>
  );
}
