'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { BLOG_POSTS } from '@/data/mockData';
import { Flame, Clock, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#242424] flex flex-col font-body">
      <Navbar />

      <main className="flex-1 pt-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1DD] border border-[#FFC857] text-xs font-extrabold text-[#C92822] mb-3">
            <Flame className="w-4 h-4 text-[#E6392F]" />
            <span>PIZZA JOURNAL & EDITORIAL</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[#242424] tracking-tight">
            Craft Stories & <span className="text-[#E6392F]">Dough Guides.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              className="product-card-bright rounded-3xl p-6 border border-[#EAE3DA] bg-white flex flex-col justify-between shadow-card hover:shadow-card-hover"
            >
              <div>
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-5 border border-[#EAE3DA]">
                  <Image src={post.image} alt={post.title} fill className="object-cover" />
                </div>

                <div className="flex items-center gap-3 text-xs text-[#6B6B6B] mb-2 font-medium">
                  <span className="px-3 py-1 rounded-full bg-[#FFF1DD] border border-[#FFC857] text-[#C92822] font-extrabold uppercase">
                    {post.category}
                  </span>
                  <span className="font-bold">{post.readTime}</span>
                </div>

                <h3 className="font-display font-black text-2xl text-[#242424] mb-2">{post.title}</h3>
                <p className="text-xs text-[#6B6B6B] leading-relaxed mb-6 font-medium">{post.excerpt}</p>
              </div>

              <div className="pt-4 border-t border-[#EAE3DA] flex items-center justify-between">
                <span className="text-xs text-[#6B6B6B] font-bold">By {post.author}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-extrabold text-[#E6392F] hover:underline uppercase flex items-center gap-1"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
