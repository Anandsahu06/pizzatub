'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { PizzaBuilderCanvas } from '@/components/builder/PizzaBuilderCanvas';
import { CustomPizzaState } from '@/types';
import { useCart } from '@/context/CartContext';
import { Flame, Check, Sliders, ShoppingBag, ArrowRight, RotateCcw } from 'lucide-react';

export default function BuildYourPizzaPage() {
  const { addToCart } = useCart();
  const [activeStep, setActiveStep] = useState<number>(1);

  const [pizzaState, setPizzaState] = useState<CustomPizzaState>({
    size: 'Medium',
    crust: 'Classic Hand-Tossed',
    sauce: 'Signature Tomato',
    cheese: 'Fresh Mozzarella',
    toppings: ['Pepperoni', 'Sweet Corn'],
  });

  // Price calculations
  const sizePrices: Record<string, number> = {
    Regular: 299,
    Medium: 399,
    Large: 549,
    Family: 699,
  };

  const crustPrices: Record<string, number> = {
    'Classic Hand-Tossed': 0,
    'Crispy Thin Crust': 0,
    'Cheese Burst': 99,
    'Stuffed Crust': 79,
  };

  const saucePrices: Record<string, number> = {
    'Signature Tomato': 0,
    'Smoky BBQ': 20,
    'Fiery Peri Peri': 20,
    'Creamy Garlic': 25,
  };

  const cheesePrices: Record<string, number> = {
    'Fresh Mozzarella': 0,
    'Extra Cheese': 49,
    'Smoked Cheddar': 59,
  };

  const toppingPrices: Record<string, number> = {
    Pepperoni: 59,
    'Herb Chicken': 49,
    'Peri Peri Paneer': 49,
    'Sweet Corn': 29,
    'Red Onion': 29,
    'Black Olives': 39,
    Jalapeños: 39,
    'Button Mushrooms': 39,
    'Crisp Capsicum': 29,
  };

  const basePrice = sizePrices[pizzaState.size] || 399;
  const crustPrice = crustPrices[pizzaState.crust] || 0;
  const saucePrice = saucePrices[pizzaState.sauce] || 0;
  const cheesePrice = cheesePrices[pizzaState.cheese] || 0;
  const toppingsPrice = pizzaState.toppings.reduce((sum, t) => sum + (toppingPrices[t] || 35), 0);

  const totalPrice = basePrice + crustPrice + saucePrice + cheesePrice + toppingsPrice;

  const toggleTopping = (topping: string) => {
    setPizzaState((prev) => {
      const exists = prev.toppings.includes(topping);
      if (exists) {
        return { ...prev, toppings: prev.toppings.filter((t) => t !== topping) };
      } else {
        return { ...prev, toppings: [...prev.toppings, topping] };
      }
    });
  };

  const handleReset = () => {
    setPizzaState({
      size: 'Medium',
      crust: 'Classic Hand-Tossed',
      sauce: 'Signature Tomato',
      cheese: 'Fresh Mozzarella',
      toppings: [],
    });
  };

  const handleAddToCart = () => {
    addToCart({
      productId: 'custom-tub-pizza',
      name: `Custom ${pizzaState.size} ${pizzaState.crust} Pizza`,
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
      unitPrice: totalPrice,
      quantity: 1,
      size: pizzaState.size,
      crust: pizzaState.crust,
      sauce: pizzaState.sauce,
      cheese: pizzaState.cheese,
      toppings: pizzaState.toppings,
      isCustomPizza: true,
    });
  };

  const steps = [
    { num: 1, title: 'Choose Size' },
    { num: 2, title: 'Choose Crust' },
    { num: 3, title: 'Choose Sauce' },
    { num: 4, title: 'Choose Cheese' },
    { num: 5, title: 'Choose Toppings' },
  ];

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#242424] flex flex-col font-body">
      <Navbar />

      <main className="flex-1 pt-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="mb-8 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1DD] border border-[#FFC857] text-xs font-extrabold text-[#C92822] mb-3">
              <Sliders className="w-4 h-4 text-[#E6392F]" />
              <span>INTERACTIVE PIZZA STUDIO</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[#242424] tracking-tight">
              Build Your <span className="text-[#E6392F]">Tub Masterpiece.</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1 font-medium">
              Select your dough size, crust type, signature sauce, melted cheese blend & fresh toppings.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="self-center sm:self-auto px-4 py-2.5 rounded-2xl bg-white hover:bg-[#FFF1DD] border border-[#EAE3DA] text-xs font-bold text-[#242424] flex items-center gap-2 transition-all shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#E6392F]" />
            <span>Reset Selections</span>
          </button>
        </div>

        {/* Step Wizard Bar */}
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-2 p-2 mb-8 bg-white rounded-3xl border border-[#EAE3DA] shadow-md">
          {steps.map((s) => (
            <button
              key={s.num}
              onClick={() => setActiveStep(s.num)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all flex-1 justify-center ${
                activeStep === s.num
                  ? 'bg-[#E6392F] text-white shadow-md'
                  : 'text-[#6B6B6B] hover:text-[#242424] hover:bg-[#FFF8F0]'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-white/20 text-white text-[10px] flex items-center justify-center font-bold">
                {s.num}
              </span>
              <span>{s.title}</span>
            </button>
          ))}
        </div>

        {/* Builder Studio Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Canvas Preview */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE3DA] shadow-xl sticky top-28">
            <div className="text-center mb-4">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#E6392F]">Live Canvas Render</span>
              <h3 className="font-display font-bold text-xl text-[#242424]">
                {pizzaState.size} {pizzaState.crust}
              </h3>
            </div>

            {/* Interactive SVG Canvas */}
            <PizzaBuilderCanvas pizzaState={pizzaState} />

            {/* Summary Pills */}
            <div className="mt-6 pt-4 border-t border-[#EAE3DA] flex flex-wrap gap-2 justify-center text-xs">
              <span className="bg-[#FFF8F0] px-3 py-1 rounded-full border border-[#EAE3DA] text-[#6B6B6B] font-medium">
                Size: <strong className="text-[#242424]">{pizzaState.size}</strong>
              </span>
              <span className="bg-[#FFF8F0] px-3 py-1 rounded-full border border-[#EAE3DA] text-[#6B6B6B] font-medium">
                Crust: <strong className="text-[#242424]">{pizzaState.crust}</strong>
              </span>
              <span className="bg-[#FFF8F0] px-3 py-1 rounded-full border border-[#EAE3DA] text-[#6B6B6B] font-medium">
                Sauce: <strong className="text-[#242424]">{pizzaState.sauce}</strong>
              </span>
              {pizzaState.toppings.length > 0 && (
                <span className="bg-[#FFF1DD] border border-[#FFC857] px-3 py-1 rounded-full text-[#C92822] font-bold">
                  Toppings ({pizzaState.toppings.length}): {pizzaState.toppings.join(', ')}
                </span>
              )}
            </div>
          </div>

          {/* Right Configuration Controls */}
          <div className="lg:col-span-6 space-y-6">
            {/* Step 1: Size */}
            {activeStep === 1 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <h3 className="font-display font-bold text-2xl text-[#242424]">Step 1: Choose Size</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'Regular', desc: '1 Person • 4 Slices', price: 299 },
                    { name: 'Medium', desc: '2 People • 6 Slices', price: 399 },
                    { name: 'Large', desc: '3-4 People • 8 Slices', price: 549 },
                    { name: 'Family', desc: '5-6 People • 12 Slices', price: 699 },
                  ].map((sz) => (
                    <button
                      key={sz.name}
                      onClick={() => setPizzaState({ ...pizzaState, size: sz.name as any })}
                      className={`p-4 rounded-3xl border text-left transition-all ${
                        pizzaState.size === sz.name
                          ? 'bg-[#FFF1DD] border-[#E6392F] shadow-md'
                          : 'bg-white border-[#EAE3DA] hover:bg-[#FFF8F0]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display font-bold text-lg text-[#242424]">{sz.name}</span>
                        <span className="font-black text-sm text-[#E6392F]">₹{sz.price}</span>
                      </div>
                      <span className="text-xs text-[#6B6B6B] font-medium">{sz.desc}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Crust */}
            {activeStep === 2 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <h3 className="font-display font-bold text-2xl text-[#242424]">Step 2: Choose Crust</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { name: 'Classic Hand-Tossed', desc: 'Fluffy sourdough with crispy edge', price: 0 },
                    { name: 'Crispy Thin Crust', desc: 'Ultra thin biscuit crunch', price: 0 },
                    { name: 'Cheese Burst', desc: 'Overflowing molten cheddar ring', price: 99 },
                    { name: 'Stuffed Crust', desc: 'Garlic herb mozzarella stuffed crust', price: 79 },
                  ].map((crust) => (
                    <button
                      key={crust.name}
                      onClick={() => setPizzaState({ ...pizzaState, crust: crust.name as any })}
                      className={`p-4 rounded-3xl border text-left transition-all ${
                        pizzaState.crust === crust.name
                          ? 'bg-[#FFF1DD] border-[#E6392F] shadow-md'
                          : 'bg-white border-[#EAE3DA] hover:bg-[#FFF8F0]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display font-bold text-base text-[#242424]">{crust.name}</span>
                        <span className="font-black text-xs text-[#E6392F]">
                          {crust.price === 0 ? 'FREE' : `+₹${crust.price}`}
                        </span>
                      </div>
                      <span className="text-xs text-[#6B6B6B] font-medium">{crust.desc}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Sauce */}
            {activeStep === 3 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <h3 className="font-display font-bold text-2xl text-[#242424]">Step 3: Choose Sauce Base</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { name: 'Signature Tomato', desc: 'San Marzano slow-cooked reduction', price: 0 },
                    { name: 'Smoky BBQ', desc: 'Hickory smoked sweet barbecue', price: 20 },
                    { name: 'Fiery Peri Peri', desc: 'African bird eye chili reduction', price: 20 },
                    { name: 'Creamy Garlic', desc: 'Roasted garlic & herb butter blend', price: 25 },
                  ].map((sauce) => (
                    <button
                      key={sauce.name}
                      onClick={() => setPizzaState({ ...pizzaState, sauce: sauce.name as any })}
                      className={`p-4 rounded-3xl border text-left transition-all ${
                        pizzaState.sauce === sauce.name
                          ? 'bg-[#FFF1DD] border-[#E6392F] shadow-md'
                          : 'bg-white border-[#EAE3DA] hover:bg-[#FFF8F0]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display font-bold text-base text-[#242424]">{sauce.name}</span>
                        <span className="font-black text-xs text-[#E6392F]">
                          {sauce.price === 0 ? 'FREE' : `+₹${sauce.price}`}
                        </span>
                      </div>
                      <span className="text-xs text-[#6B6B6B] font-medium">{sauce.desc}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Cheese */}
            {activeStep === 4 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <h3 className="font-display font-bold text-2xl text-[#242424]">Step 4: Choose Cheese Layer</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { name: 'Fresh Mozzarella', desc: 'Whole milk stretch', price: 0 },
                    { name: 'Extra Cheese', desc: 'Double layer molten mozzarella', price: 49 },
                    { name: 'Smoked Cheddar', desc: 'Sharp aged cheddar blend', price: 59 },
                  ].map((cheese) => (
                    <button
                      key={cheese.name}
                      onClick={() => setPizzaState({ ...pizzaState, cheese: cheese.name as any })}
                      className={`p-4 rounded-3xl border text-left transition-all ${
                        pizzaState.cheese === cheese.name
                          ? 'bg-[#FFF1DD] border-[#E6392F] shadow-md'
                          : 'bg-white border-[#EAE3DA] hover:bg-[#FFF8F0]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display font-bold text-sm text-[#242424]">{cheese.name}</span>
                        <span className="font-black text-xs text-[#E6392F]">
                          {cheese.price === 0 ? 'FREE' : `+₹${cheese.price}`}
                        </span>
                      </div>
                      <span className="text-xs text-[#6B6B6B] font-medium">{cheese.desc}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 5: Toppings */}
            {activeStep === 5 && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                <h3 className="font-display font-bold text-2xl text-[#242424]">Step 5: Select Toppings</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { name: 'Pepperoni', price: 59, type: 'nonveg' },
                    { name: 'Herb Chicken', price: 49, type: 'nonveg' },
                    { name: 'Peri Peri Paneer', price: 49, type: 'veg' },
                    { name: 'Sweet Corn', price: 29, type: 'veg' },
                    { name: 'Red Onion', price: 29, type: 'veg' },
                    { name: 'Black Olives', price: 39, type: 'veg' },
                    { name: 'Jalapeños', price: 39, type: 'veg' },
                    { name: 'Button Mushrooms', price: 39, type: 'veg' },
                    { name: 'Crisp Capsicum', price: 29, type: 'veg' },
                  ].map((top) => {
                    const isSelected = pizzaState.toppings.includes(top.name);
                    return (
                      <button
                        key={top.name}
                        onClick={() => toggleTopping(top.name)}
                        className={`p-3.5 rounded-3xl border text-left transition-all relative ${
                          isSelected
                            ? 'bg-[#FFF1DD] border-[#E6392F] shadow-md'
                            : 'bg-white border-[#EAE3DA] hover:bg-[#FFF8F0]'
                        }`}
                      >
                        {isSelected && (
                          <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#E6392F] flex items-center justify-center text-white text-[10px]">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </span>
                        )}
                        <span className="font-extrabold text-xs text-[#242424] block mb-0.5">{top.name}</span>
                        <span className="text-[11px] font-black text-[#E6392F]">+₹{top.price}</span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Price Breakdown Footer Bar */}
            <div className="p-6 rounded-3xl bg-white border border-[#EAE3DA] space-y-4 shadow-lg">
              <div className="space-y-1.5 text-xs text-[#6B6B6B] font-medium">
                <div className="flex justify-between">
                  <span>Base Size ({pizzaState.size})</span>
                  <span className="text-[#242424] font-bold">₹{basePrice}</span>
                </div>
                {crustPrice > 0 && (
                  <div className="flex justify-between">
                    <span>Crust ({pizzaState.crust})</span>
                    <span className="text-[#242424] font-bold">+₹{crustPrice}</span>
                  </div>
                )}
                {saucePrice > 0 && (
                  <div className="flex justify-between">
                    <span>Sauce ({pizzaState.sauce})</span>
                    <span className="text-[#242424] font-bold">+₹{saucePrice}</span>
                  </div>
                )}
                {cheesePrice > 0 && (
                  <div className="flex justify-between">
                    <span>Cheese ({pizzaState.cheese})</span>
                    <span className="text-[#242424] font-bold">+₹{cheesePrice}</span>
                  </div>
                )}
                {toppingsPrice > 0 && (
                  <div className="flex justify-between">
                    <span>Toppings ({pizzaState.toppings.length})</span>
                    <span className="text-[#242424] font-bold">+₹{toppingsPrice}</span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t border-[#EAE3DA] text-xl font-black text-[#242424]">
                  <span>Total Pizza Price</span>
                  <span className="text-[#E6392F]">₹{totalPrice}</span>
                </div>
              </div>

              <div className="flex gap-3">
                {activeStep < 5 ? (
                  <button
                    onClick={() => setActiveStep((prev) => prev + 1)}
                    className="w-full py-4 rounded-full bg-[#FFF1DD] border border-[#FFC857] hover:bg-[#FFC857] text-[#C92822] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Next Step: {steps[activeStep]?.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleAddToCart}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-[#E6392F] to-[#C92822] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg hover:scale-102 transition-all flex items-center justify-center gap-2"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>ADD CUSTOM PIZZA TO CART (₹{totalPrice})</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
