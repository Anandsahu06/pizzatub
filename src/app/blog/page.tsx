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
    <div className="min-h-screen bg-brand-bg text-white flex flex-col font-body">
      <Navbar />

      <main className="flex-1 pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-surface border border-brand-border text-xs font-bold text-brand-orange mb-3">
            <Flame className="w-4 h-4 text-brand-red" />
            <span>Pizza Journal & Editorial</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Craft Stories & <span className="text-brand-orange">Dough Guides.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              className="glass-card rounded-3xl p-6 border border-brand-border flex flex-col justify-between hover:border-brand-orange/40 transition-all"
            >
              <div>
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-5">
                  <Image src={post.image} alt={post.title} fill className="object-cover" />
                </div>

                <div className="flex items-center gap-3 text-xs text-brand-muted mb-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-orange/10 border border-brand-orange/30 text-brand-orange font-bold uppercase">
                    {post.category}
                  </span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="font-display font-bold text-2xl text-white mb-2">{post.title}</h3>
                <p className="text-xs text-brand-muted leading-relaxed mb-6">{post.excerpt}</p>
              </div>

              <div className="pt-4 border-t border-brand-border flex items-center justify-between">
                <span className="text-xs text-brand-cream/80">By {post.author}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-xs font-bold text-brand-orange hover:text-white uppercase flex items-center gap-1"
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
