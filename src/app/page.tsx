'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { Hero } from '@/components/home/Hero';
import { LocationBar } from '@/components/home/LocationBar';
import { QuickCategoryNav } from '@/components/home/QuickCategoryNav';
import { SignaturePizzas } from '@/components/home/SignaturePizzas';
import { AiRecommender } from '@/components/home/AiRecommender';
import { ComboDeals } from '@/components/home/ComboDeals';
import { StorySection } from '@/components/home/StorySection';
import { ReviewsAndGallery } from '@/components/home/ReviewsAndGallery';
import { FaqAccordion } from '@/components/home/FaqAccordion';
import { PizzaCategory } from '@/types';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<PizzaCategory>('pizza');

  const handleSelectCategory = (cat: PizzaCategory) => {
    setActiveCategory(cat);
    if (cat !== 'pizza') {
      router.push('/menu');
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg text-white flex flex-col font-body">
      {/* Header Navigation */}
      <Navbar />

      <main className="flex-1">
        {/* SECTION 1: HERO */}
        <Hero />

        {/* SECTION 2: LOCATION DELIVERY BAR */}
        <LocationBar />

        {/* SECTION 3: FAST CATEGORY NAV */}
        <QuickCategoryNav
          activeCategory={activeCategory}
          onSelectCategory={handleSelectCategory}
        />

        {/* SECTION 4: SIGNATURE PIZZAS SHOWCASE */}
        <SignaturePizzas />

        {/* SECTION 5: AI CRAVING RECOMMENDER */}
        <AiRecommender />

        {/* SECTION 6: HIGH-CONVERSION COMBOS */}
        <ComboDeals />

        {/* SECTION 7: STORY & KITCHEN CRAFT */}
        <StorySection />

        {/* SECTION 8: REVIEWS & COMMUNITY GALLERY */}
        <ReviewsAndGallery />

        {/* SECTION 9: FAQ ACCORDION */}
        <FaqAccordion />
      </main>

      {/* Footer & Mobile Navigation */}
      <Footer />
      <MobileNav />
    </div>
  );
}
