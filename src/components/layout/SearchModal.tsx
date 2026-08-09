'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Flame, ChevronRight } from 'lucide-react';
import { PIZZA_ITEMS, SIDES_AND_DRINKS, COMBO_ITEMS } from '@/data/mockData';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const allProducts = [...PIZZA_ITEMS, ...SIDES_AND_DRINKS];

  const filteredPizzas = query.trim() === '' 
    ? [] 
    : allProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.description.toLowerCase().includes(query.toLowerCase()) ||
        p.ingredients.some(i => i.toLowerCase().includes(query.toLowerCase()))
      );

  const filteredCombos = query.trim() === ''
    ? []
    : COMBO_ITEMS.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[990] flex items-start justify-center pt-16 sm:pt-24 px-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.96 }}
          className="relative z-10 w-full max-w-2xl bg-brand-card border border-brand-border rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Search Header */}
          <div className="flex items-center gap-3 p-4 border-b border-brand-border bg-brand-surface">
            <Search className="w-5 h-5 text-brand-orange shrink-0" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Tub Supreme, Peri Peri, Wings, Combos..."
              className="w-full bg-transparent text-white text-base sm:text-lg focus:outline-none placeholder:text-brand-muted font-body"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-full text-brand-muted hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-brand-cream tracking-wide uppercase"
            >
              ESC
            </button>
          </div>

          {/* Quick Tags when empty */}
          {query.trim() === '' && (
            <div className="p-6">
              <div className="text-xs uppercase tracking-widest font-semibold text-brand-muted mb-3 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-brand-orange" />
                Popular Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {['Tub Supreme', 'Fire Chicken', 'Cheese Burst', 'Garlic Tub Sticks', 'Choco Lava Cake', 'Movie Night Combo'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-3 py-1.5 rounded-full bg-brand-surface hover:bg-brand-red/20 border border-brand-border hover:border-brand-red text-xs font-medium text-brand-cream transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results List */}
          {query.trim() !== '' && (
            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
              {filteredPizzas.length === 0 && filteredCombos.length === 0 ? (
                <div className="py-12 text-center text-brand-muted">
                  <p className="text-base font-medium">No craving matches found for &quot;{query}&quot;.</p>
                  <p className="text-xs mt-1">Try searching for &quot;Pepperoni&quot;, &quot;Paneer&quot;, or &quot;Combo&quot;.</p>
                </div>
              ) : (
                <>
                  {filteredPizzas.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-brand-surface hover:bg-white/5 border border-brand-border transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white group-hover:text-brand-orange transition-colors">
                              {product.name}
                            </span>
                            {product.isVeg ? (
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" title="Vegetarian" />
                            ) : (
                              <span className="w-2.5 h-2.5 rounded-full bg-brand-red" title="Non-Vegetarian" />
                            )}
                          </div>
                          <p className="text-xs text-brand-muted line-clamp-1">{product.tagline}</p>
                          <p className="text-xs font-semibold text-brand-cream mt-0.5">₹{product.price}</p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          addToCart({
                            productId: product.id,
                            name: product.name,
                            image: product.image,
                            unitPrice: product.price,
                            quantity: 1,
                            size: product.sizesAvailable ? 'Medium' : undefined,
                          });
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-brand-red hover:bg-brand-red-hover text-white text-xs font-semibold shadow-glow transition-all"
                      >
                        + ADD
                      </button>
                    </div>
                  ))}

                  {filteredCombos.map((combo) => (
                    <div
                      key={combo.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-brand-surface to-brand-card border border-brand-orange/30 group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                          <Image src={combo.image} alt={combo.name} fill className="object-cover" />
                        </div>
                        <div>
                          <span className="font-semibold text-white">{combo.name}</span>
                          <p className="text-xs text-brand-muted line-clamp-1">{combo.description}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-bold text-brand-orange">₹{combo.price}</span>
                            <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800">
                              SAVE ₹{combo.savings}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Link
                        href="/menu"
                        onClick={onClose}
                        className="p-2 rounded-lg bg-brand-orange text-white hover:bg-brand-orange/80 text-xs font-semibold flex items-center gap-1"
                      >
                        VIEW <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
