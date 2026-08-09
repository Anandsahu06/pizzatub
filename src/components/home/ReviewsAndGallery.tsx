'use client';

import React from 'react';
import { Star, ShieldCheck, Camera } from 'lucide-react';
import { REVIEWS } from '@/data/mockData';
import Image from 'next/image';

export const ReviewsAndGallery: React.FC = () => {
  const galleryImages = [
    {
      src: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
      title: 'Tub Supreme Stretch',
      tag: '@pizzatub.official',
    },
    {
      src: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=600&q=80',
      title: 'Hickory Smoked BBQ Chicken',
      tag: 'Fresh Oven Bake',
    },
    {
      src: 'https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=600&q=80',
      title: 'Cheese Overload Melt',
      tag: 'Quad Cheese',
    },
    {
      src: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80',
      title: 'Farm Fresh Harvest',
      tag: 'Zero Frozen Dough',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 space-y-16">
      {/* Customer Reviews Horizontal Scrolling Carousel */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1DD] border border-[#FFC857] text-xs font-extrabold text-[#C92822] mb-3">
              <Star className="w-3.5 h-3.5 text-[#FFC857] fill-[#FFC857]" />
              <span>VERIFIED CRAVERS</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#242424] tracking-tight">
              Customer <span className="text-[#E6392F]">Reviews.</span>
            </h2>
          </div>

          <span className="text-xs font-medium text-[#6B6B6B] hidden sm:inline-block">Swipe horizontally →</span>
        </div>

        {/* Horizontal Snap Scroll Container */}
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4 pt-1 snap-x snap-mandatory">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="product-card-bright rounded-3xl p-6 border border-[#EAE3DA] bg-white w-[320px] sm:w-[380px] shrink-0 snap-start flex flex-col justify-between shadow-card"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#EAE3DA]">
                      <Image src={rev.avatar} alt={rev.author} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-[#242424]">{rev.author}</h4>
                      <span className="text-[10px] text-[#6B6B6B]">{rev.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 text-[#FFC857]">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#FFC857]" />
                    ))}
                  </div>
                </div>

                <p className="text-xs text-[#242424] leading-relaxed mb-4">&quot;{rev.comment}&quot;</p>
              </div>

              <div className="pt-3 border-t border-[#EAE3DA] flex items-center gap-1.5 text-[11px] font-semibold text-[#2E8B57]">
                <ShieldCheck className="w-4 h-4 text-[#2E8B57]" />
                <span>{rev.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editorial Food Gallery */}
      <div>
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1DD] border border-[#FFC857] text-xs font-extrabold text-[#C92822] mb-3">
            <Camera className="w-3.5 h-3.5 text-[#E6392F]" />
            <span>COMMUNITY WALL</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#242424] tracking-tight">
            Tag Us <span className="text-[#E6392F]">#PIZZATUB</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className="relative aspect-square rounded-2xl overflow-hidden group border border-[#EAE3DA] bg-white shadow-card"
            >
              <Image src={img.src} alt={img.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFC857]">{img.tag}</span>
                <span className="font-display font-bold text-xs text-white line-clamp-1">{img.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
