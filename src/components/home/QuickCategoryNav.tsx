'use client';

import React from 'react';
import { PizzaCategory } from '@/types';
import { Flame, Sparkles, Utensils, GlassWater, IceCream, Tag } from 'lucide-react';

interface QuickCategoryNavProps {
  activeCategory: PizzaCategory;
  onSelectCategory: (cat: PizzaCategory) => void;
}

export const QuickCategoryNav: React.FC<QuickCategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const categories: { id: PizzaCategory; label: string; icon: any }[] = [
    { id: 'pizza', label: 'Pizza', icon: Flame },
    { id: 'combos', label: 'Combos', icon: Sparkles },
    { id: 'offers', label: 'Deals', icon: Tag },
    { id: 'sides', label: 'Sides', icon: Utensils },
    { id: 'drinks', label: 'Drinks', icon: GlassWater },
    { id: 'desserts', label: 'Desserts', icon: IceCream },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-2 px-1">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider whitespace-nowrap transition-all duration-200 shrink-0 ${
                isActive
                  ? 'bg-[#E6392F] text-white shadow-md'
                  : 'bg-white hover:bg-[#FFF1DD] text-[#242424] border border-[#EAE3DA]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#E6392F]'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
