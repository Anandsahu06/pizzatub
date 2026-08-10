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
    <div className="min-h-screen bg-[#FFF8F0] text-[#242424] flex flex-col font-body">
      <Navbar />

      <main className="flex-1 pt-12 pb-24 max-w-4xl mx-auto px-4 w-full">
        <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-[#6B6B6B] hover:text-[#E6392F] mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Journal</span>
        </Link>

        <div className="space-y-6 mb-8">
          <div className="flex items-center gap-3 text-xs font-medium">
            <span className="px-3 py-1 rounded-full bg-[#FFF1DD] border border-[#FFC857] text-[#C92822] font-extrabold uppercase">
              {post.category}
            </span>
            <span className="text-[#6B6B6B]">• {post.date}</span>
            <span className="text-[#6B6B6B]">• {post.readTime}</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl text-[#242424] tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 text-xs text-[#6B6B6B] border-y border-[#EAE3DA] py-4 font-medium">
            <User className="w-4 h-4 text-[#E6392F]" />
            <span>Written by <strong className="text-[#242424] font-bold">{post.author}</strong></span>
          </div>
        </div>

        <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-white border border-[#EAE3DA] mb-10 shadow-xl">
          <Image src={post.image} alt={post.title} fill className="object-cover" />
        </div>

        <div
          className="prose max-w-none text-[#242424] text-sm sm:text-base leading-relaxed space-y-4 font-medium"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
