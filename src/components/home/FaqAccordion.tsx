'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How fast is Pizza Tub delivery?',
      answer: 'Our average delivery time is 25 to 35 minutes. All pizzas are baked fresh upon receiving your order and dispatched in thermal insulation pods to guarantee steaming hot crust.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept UPI (Google Pay, PhonePe, Paytm), All major Credit/Debit Cards, Net Banking, Mobile Wallets, and Cash on Delivery (COD).',
    },
    {
      question: 'Can I customize my pizza toppings and crust?',
      answer: 'Yes! Use our interactive "Build Your Pizza" tool to select your size, crust (including Cheese Burst and Stuffed Crust), sauce, and over 12 fresh topping options.',
    },
    {
      question: 'Do you offer 100% Pure Vegetarian options?',
      answer: 'Absolutely. We maintain strict separate preparation counters, dedicated oven pans, and green-marked utensils for all vegetarian orders.',
    },
    {
      question: 'How does the Pizza Club loyalty program work?',
      answer: 'Every ₹100 spent earns you 10 Pizza Club points. You can redeem points for free drinks, side appetizers, or full signature pizzas on your next checkout.',
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1DD] border border-[#FFC857] text-xs font-extrabold text-[#C92822] mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-[#E6392F]" />
          <span>HELP CENTER</span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-[#242424] tracking-tight">
          Frequently Asked <span className="text-[#E6392F]">Questions.</span>
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="bg-white border border-[#EAE3DA] rounded-2xl overflow-hidden shadow-sm transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between font-display font-bold text-base text-[#242424] hover:text-[#E6392F] transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-[#E6392F] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-xs sm:text-sm text-[#6B6B6B] leading-relaxed border-t border-[#EAE3DA] pt-3 font-medium">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};
