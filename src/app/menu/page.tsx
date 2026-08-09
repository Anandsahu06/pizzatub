'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { PIZZA_ITEMS, SIDES_AND_DRINKS, COMBO_ITEMS } from '@/data/mockData';
import { PizzaCategory, PizzaItem } from '@/types';
import { useCart } from '@/context/CartContext';
import { Search, Filter, Star, Plus, Flame, Sparkles, X, CheckCircle2, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function MenuPage() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<PizzaCategory>('pizza');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterVeg, setFilterVeg] = useState<boolean | null>(null);
  const [filterSpicyOnly, setFilterSpicyOnly] = useState(false);
  const [filterUnder300, setFilterUnder300] = useState(false);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');

  const [selectedProductModal, setSelectedProductModal] = useState<PizzaItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<'Regular' | 'Medium' | 'Large' | 'Family'>('Medium');
  const [modalQty, setModalQty] = useState(1);

  const categories: { id: PizzaCategory; label: string }[] = [
    { id: 'pizza', label: 'Signature Pizzas' },
    { id: 'combos', label: 'Loaded Combos' },
    { id: 'sides', label: 'Starters & Sides' },
    { id: 'drinks', label: 'Craft Drinks' },
    { id: 'desserts', label: 'Desserts & Sweets' },
  ];

  // Combine items
  const allItems = useMemo(() => {
    return [...PIZZA_ITEMS, ...SIDES_AND_DRINKS];
  }, []);

  const filteredItems = useMemo(() => {
    return allItems.filter((item) => {
      // Category check
      if (selectedCategory !== 'offers' && item.category !== selectedCategory) return false;

      // Search query
      if (
        searchQuery &&
        !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Veg filter
      if (filterVeg !== null && item.isVeg !== filterVeg) return false;

      // Spicy filter
      if (filterSpicyOnly && !item.isSpicy) return false;

      // Under 300 filter
      if (filterUnder300 && item.price >= 300) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviewCount - a.reviewCount; // Popular
    });
  }, [allItems, selectedCategory, searchQuery, filterVeg, filterSpicyOnly, filterUnder300, sortBy]);

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#242424] flex flex-col font-body">
      <Navbar />

      <main className="flex-1 pt-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Title */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1DD] border border-[#FFC857] text-xs font-extrabold text-[#C92822] mb-3">
            <Flame className="w-3.5 h-3.5 text-[#E6392F]" />
            <span>FULL FOOD CATALOGUE</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[#242424] tracking-tight">
            Explore the <span className="text-[#E6392F]">Tub Menu.</span>
          </h1>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-5 rounded-3xl border border-[#EAE3DA] shadow-md mb-10 space-y-4">
          {/* Search + Category Tabs */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-[#6B6B6B]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search menu items & ingredients..."
                className="w-full bg-[#FFF8F0] border border-[#EAE3DA] rounded-2xl pl-10 pr-4 py-2.5 text-xs text-[#242424] placeholder:text-[#6B6B6B] focus:border-[#E6392F] focus:outline-none font-medium"
              />
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-[#E6392F] text-white shadow-md'
                      : 'bg-[#FFF8F0] text-[#242424] hover:bg-[#FFF1DD] border border-[#EAE3DA]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Secondary Quick Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#EAE3DA] text-xs font-semibold">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[#6B6B6B] font-bold mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-[#E6392F]" /> Filters:
              </span>

              {/* Veg / Non-Veg Toggles */}
              <button
                onClick={() => setFilterVeg(filterVeg === true ? null : true)}
                className={`px-3.5 py-1.5 rounded-full border font-extrabold flex items-center gap-1.5 transition-all ${
                  filterVeg === true
                    ? 'bg-emerald-50 border-[#2E8B57] text-[#2E8B57]'
                    : 'bg-[#FFF8F0] border-[#EAE3DA] text-[#242424] hover:bg-[#FFF1DD]'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#2E8B57]" />
                <span>Veg Only</span>
              </button>

              <button
                onClick={() => setFilterVeg(filterVeg === false ? null : false)}
                className={`px-3.5 py-1.5 rounded-full border font-extrabold flex items-center gap-1.5 transition-all ${
                  filterVeg === false
                    ? 'bg-red-50 border-[#E6392F] text-[#E6392F]'
                    : 'bg-[#FFF8F0] border-[#EAE3DA] text-[#242424] hover:bg-[#FFF1DD]'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#E6392F]" />
                <span>Non-Veg Only</span>
              </button>

              {/* Spicy Filter */}
              <button
                onClick={() => setFilterSpicyOnly(!filterSpicyOnly)}
                className={`px-3.5 py-1.5 rounded-full border font-extrabold transition-all ${
                  filterSpicyOnly
                    ? 'bg-[#FFF1DD] border-[#E6392F] text-[#E6392F]'
                    : 'bg-[#FFF8F0] border-[#EAE3DA] text-[#242424] hover:bg-[#FFF1DD]'
                }`}
              >
                🔥 Spicy
              </button>

              {/* Under 300 Filter */}
              <button
                onClick={() => setFilterUnder300(!filterUnder300)}
                className={`px-3.5 py-1.5 rounded-full border font-extrabold transition-all ${
                  filterUnder300
                    ? 'bg-[#FFF1DD] border-[#FFC857] text-[#242424]'
                    : 'bg-[#FFF8F0] border-[#EAE3DA] text-[#242424] hover:bg-[#FFF1DD]'
                }`}
              >
                ⚡ Under ₹300
              </button>
            </div>

            {/* Sorting Selector */}
            <div className="flex items-center gap-2">
              <span className="text-[#6B6B6B] font-bold">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FFF8F0] border border-[#EAE3DA] rounded-xl px-3 py-1.5 text-xs text-[#242424] font-bold focus:outline-none"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rating</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* COMBOS SPECIAL SECTION if category === combos */}
        {selectedCategory === 'combos' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {COMBO_ITEMS.map((combo) => (
              <div
                key={combo.id}
                className="product-card-bright rounded-3xl p-6 border border-[#EAE3DA] bg-white flex flex-col justify-between shadow-card"
              >
                <div>
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-4 border border-[#EAE3DA]">
                    <Image src={combo.image} alt={combo.name} fill className="object-cover" />
                  </div>
                  <h3 className="font-display font-black text-2xl text-[#242424] mb-2">{combo.name}</h3>
                  <p className="text-xs text-[#6B6B6B] mb-4 font-medium">{combo.description}</p>
                </div>

                <div className="pt-4 border-t border-[#EAE3DA] flex items-center justify-between">
                  <div>
                    <span className="font-display font-black text-2xl text-[#E6392F]">₹{combo.price}</span>
                    <span className="text-xs text-[#6B6B6B] line-through ml-2">₹{combo.originalPrice}</span>
                  </div>
                  <button
                    onClick={() =>
                      addToCart({
                        productId: combo.id,
                        name: combo.name,
                        image: combo.image,
                        unitPrice: combo.price,
                        quantity: 1,
                      })
                    }
                    className="px-5 py-2.5 rounded-2xl bg-[#E6392F] hover:bg-[#C92822] text-white font-extrabold text-xs shadow-md"
                  >
                    ADD COMBO
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* REGULAR PRODUCTS GRID */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="product-card-bright rounded-3xl p-5 border border-[#EAE3DA] bg-white flex flex-col justify-between shadow-card hover:shadow-card-hover group"
              >
                <div>
                  <div
                    onClick={() => {
                      setSelectedProductModal(item);
                      setModalQty(1);
                    }}
                    className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 cursor-pointer bg-[#FFF8F0]"
                  >
                    <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 text-xs font-bold text-[#242424] shadow-sm">
                      <Star className="w-3.5 h-3.5 text-[#FFC857] fill-[#FFC857]" />
                      <span>{item.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <Link href={`/menu/${item.slug}`} className="font-display font-bold text-xl text-[#242424] group-hover:text-[#E6392F] transition-colors">
                      {item.name}
                    </Link>
                    {item.isVeg ? (
                      <span className="w-4 h-4 border border-[#2E8B57] rounded p-0.5 flex items-center justify-center shrink-0 mt-1" title="Vegetarian">
                        <span className="w-2 h-2 rounded-full bg-[#2E8B57]" />
                      </span>
                    ) : (
                      <span className="w-4 h-4 border border-[#E6392F] rounded p-0.5 flex items-center justify-center shrink-0 mt-1" title="Non-Vegetarian">
                        <span className="w-2 h-2 rounded-full bg-[#E6392F]" />
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#6B6B6B] line-clamp-2 mb-4 leading-relaxed font-medium">{item.description}</p>
                </div>

                <div className="pt-3 border-t border-[#EAE3DA] flex items-center justify-between">
                  <span className="font-display font-black text-xl text-[#242424]">₹{item.price}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSelectedProductModal(item);
                        setModalQty(1);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-[#FFF8F0] hover:bg-[#FFF1DD] border border-[#EAE3DA] text-xs font-bold text-[#242424]"
                    >
                      Details
                    </button>
                    <button
                      onClick={() =>
                        addToCart({
                          productId: item.id,
                          name: item.name,
                          image: item.image,
                          unitPrice: item.price,
                          quantity: 1,
                          size: item.sizesAvailable ? 'Medium' : undefined,
                        })
                      }
                      className="px-4 py-2 rounded-xl bg-[#E6392F] hover:bg-[#C92822] text-white font-extrabold text-xs shadow-md flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      <span>ADD</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProductModal && (
          <div className="fixed inset-0 z-[990] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProductModal(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative z-10 w-full max-w-xl bg-white border border-[#EAE3DA] rounded-3xl p-6 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto text-[#242424]"
            >
              <button
                onClick={() => setSelectedProductModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full text-[#6B6B6B] hover:text-[#242424] bg-[#FFF8F0] border border-[#EAE3DA]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 border border-[#EAE3DA]">
                <Image src={selectedProductModal.image} alt={selectedProductModal.name} fill className="object-cover" />
              </div>

              <div className="flex items-center justify-between mb-2">
                <h3 className="font-display font-bold text-2xl text-[#242424]">{selectedProductModal.name}</h3>
                <span className="font-display font-black text-2xl text-[#E6392F]">₹{selectedProductModal.price}</span>
              </div>

              <p className="text-xs text-[#6B6B6B] leading-relaxed mb-6 font-medium">{selectedProductModal.description}</p>

              {/* Nutrition & Specs */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#FFF8F0] border border-[#EAE3DA] text-center text-xs mb-6 font-medium">
                <div>
                  <span className="text-[10px] text-[#6B6B6B] uppercase block font-bold">Calories</span>
                  <span className="font-bold text-[#242424]">{selectedProductModal.calories || 750} kcal</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B6B6B] uppercase block font-bold">Prep Time</span>
                  <span className="font-bold text-[#242424]">{selectedProductModal.prepTimeMinutes || 18} mins</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#6B6B6B] uppercase block font-bold">Rating</span>
                  <span className="font-bold text-[#FFC857]">{selectedProductModal.rating} ★</span>
                </div>
              </div>

              {/* Ingredients List */}
              <div className="mb-6">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#242424] mb-2">Fresh Ingredients</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProductModal.ingredients.map((ing) => (
                    <span key={ing} className="px-3 py-1 rounded-xl bg-[#FFF8F0] border border-[#EAE3DA] text-xs font-semibold text-[#242424]">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => {
                  addToCart({
                    productId: selectedProductModal.id,
                    name: selectedProductModal.name,
                    image: selectedProductModal.image,
                    unitPrice: selectedProductModal.price,
                    quantity: modalQty,
                    size: selectedProductModal.sizesAvailable ? selectedSize : undefined,
                  });
                  setSelectedProductModal(null);
                }}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#E6392F] to-[#C92822] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg hover:scale-102 transition-all flex items-center justify-center gap-2"
              >
                <span>ADD TO CART (₹{selectedProductModal.price * modalQty})</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
      <MobileNav />
    </div>
  );
}
