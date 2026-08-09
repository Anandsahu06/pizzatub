'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { BLOG_POSTS } from '@/data/mockData';
import { ArrowLeft, Clock, User, Share2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const post = BLOG_POSTS.find((b) => b.slug === slug) || BLOG_POSTS[0];

  return (
    <div className="min-h-screen bg-brand-bg text-white flex flex-col font-body">
      <Navbar />

      <main className="flex-1 pt-28 pb-24 max-w-4xl mx-auto px-4 w-full">
        <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-semibold text-brand-muted hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Journal</span>
        </Link>

        <div className="space-y-6 mb-8">
          <div className="flex items-center gap-3 text-xs">
            <span className="px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange font-bold uppercase">
              {post.category}
            </span>
            <span className="text-brand-muted">• {post.date}</span>
            <span className="text-brand-muted">• {post.readTime}</span>
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 text-xs text-brand-cream border-y border-brand-border py-4">
            <User className="w-4 h-4 text-brand-orange" />
            <span>Written by <strong className="text-white">{post.author}</strong></span>
          </div>
        </div>

        <div className="relative w-full aspect-video rounded-3xl overflow-hidden glass-panel border border-brand-border mb-10">
          <Image src={post.image} alt={post.title} fill className="object-cover" />
        </div>

        <div
          className="prose prose-invert max-w-none text-brand-cream/90 text-sm leading-relaxed space-y-4"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
