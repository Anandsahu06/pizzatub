'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { useLoyalty } from '@/context/LoyaltyContext';
import { Gift, Award, Sparkles, CheckCircle2, Flame, ArrowRight } from 'lucide-react';

export default function PizzaClubPage() {
  const { points, tier, redeemReward } = useLoyalty();
  const [feedback, setFeedback] = useState<string | null>(null);

  const rewardsList = [
    { id: 'rew-1', name: 'Free Extra Cheese Topping', cost: 100, desc: 'Add double melted mozzarella to any pizza.' },
    { id: 'rew-2', name: 'Free Craft Soda (500ml)', cost: 150, desc: 'Choice of Wild Berry or Peach Cold Brew.' },
    { id: 'rew-3', name: 'Free Garlic Tub Sticks', cost: 250, desc: 'Cheese stuffed garlic bread batons.' },
    { id: 'rew-4', name: '₹200 OFF Order Voucher', cost: 400, desc: 'Flat ₹200 discount on your next checkout.' },
    { id: 'rew-5', name: 'Free Medium Signature Pizza', cost: 700, desc: 'Choice of Tub Supreme or Fire Chicken.' },
  ];

  const handleRedeem = (rewardName: string, cost: number) => {
    const success = redeemReward(cost);
    if (success) {
      setFeedback(`Successfully redeemed ${rewardName}! Voucher code added to your account.`);
    } else {
      setFeedback(`Not enough points to redeem ${rewardName}. Order more pizza to earn points!`);
    }
    setTimeout(() => setFeedback(null), 3500);
  };

  const nextTierPoints = tier === 'Dough' ? 400 : tier === 'Cheese' ? 1000 : 2000;
  const progressPercent = Math.min(100, Math.round((points / nextTierPoints) * 100));

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#242424] flex flex-col font-body">
      <Navbar />

      <main className="flex-1 pt-12 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF1DD] border border-[#FFC857] text-xs font-extrabold text-[#C92822] mb-3">
            <Gift className="w-4 h-4 text-[#E6392F]" />
            <span>VIP REWARDS CLUB</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-[#242424] tracking-tight">
            Pizza Club <span className="text-[#E6392F]">Loyalty Perks.</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] mt-1 font-medium">
            Every ₹100 spent = 10 Pizza Points. Level up from Dough to Supreme tier for exclusive rewards!
          </p>
        </div>

        {/* User Loyalty Status Dashboard Card */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EAE3DA] shadow-xl mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Points Counter */}
            <div className="text-center md:text-left border-b md:border-b-0 md:border-r border-[#EAE3DA] pb-6 md:pb-0 md:pr-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">Your Points Balance</span>
              <div className="font-display font-black text-4xl sm:text-5xl text-[#E6392F] mt-1">{points}</div>
              <span className="text-[11px] text-[#6B6B6B] font-medium mt-1 block">Points never expire</span>
            </div>

            {/* Current Tier */}
            <div className="text-center md:text-left border-b md:border-b-0 md:border-r border-[#EAE3DA] pb-6 md:pb-0 md:pr-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B6B6B]">Active Member Tier</span>
              <div className="font-display font-bold text-2xl text-[#242424] mt-1 flex items-center justify-center md:justify-start gap-2">
                <Award className="w-6 h-6 text-[#FFC857]" />
                <span>{tier} Tier</span>
              </div>
              <span className="text-[11px] text-[#2E8B57] font-bold mt-1 block">
                {tier === 'Supreme' ? '★ Max Level Unlocked!' : `Next Tier: ${tier === 'Dough' ? 'Cheese' : 'Supreme'}`}
              </span>
            </div>

            {/* Progress Gauge */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-2">
                <span className="text-[#6B6B6B]">Progress to Next Tier</span>
                <span className="text-[#242424] font-bold">{points} / {nextTierPoints} Pts</span>
              </div>
              <div className="w-full h-3 rounded-full bg-[#FFF8F0] border border-[#EAE3DA] overflow-hidden p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#FFC857] to-[#2E8B57] transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-[10px] text-[#6B6B6B] font-medium mt-1.5 block text-right">
                {nextTierPoints - points} points needed to level up
              </span>
            </div>
          </div>
        </div>

        {/* Feedback alert */}
        {feedback && (
          <div className="mb-8 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-[#2E8B57] flex items-center gap-2 shadow-sm">
            <CheckCircle2 className="w-4 h-4 text-[#2E8B57]" />
            <span>{feedback}</span>
          </div>
        )}

        {/* Rewards Marketplace */}
        <div className="mb-10">
          <h2 className="font-display font-extrabold text-2xl text-[#242424] mb-6">Redeemable Rewards Store</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rewardsList.map((rew) => {
              const canAfford = points >= rew.cost;

              return (
                <div
                  key={rew.id}
                  className="product-card-bright rounded-3xl p-6 border border-[#EAE3DA] bg-white flex flex-col justify-between shadow-card"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded-full bg-[#FFF1DD] border border-[#FFC857] text-[#C92822] font-extrabold text-xs">
                        {rew.cost} PTS
                      </span>
                      <Gift className="w-4 h-4 text-[#E6392F]" />
                    </div>

                    <h3 className="font-display font-bold text-lg text-[#242424] mb-1.5">{rew.name}</h3>
                    <p className="text-xs text-[#6B6B6B] mb-5 leading-relaxed font-medium">{rew.desc}</p>
                  </div>

                  <button
                    onClick={() => handleRedeem(rew.name, rew.cost)}
                    disabled={!canAfford}
                    className={`w-full py-3 rounded-2xl font-extrabold text-xs uppercase tracking-wider transition-all ${
                      canAfford
                        ? 'bg-[#FFF1DD] hover:bg-[#FFC857] border border-[#FFC857]/60 text-[#C92822] shadow-sm cursor-pointer'
                        : 'bg-[#FFF8F0] text-[#6B6B6B] border border-[#EAE3DA] font-semibold cursor-not-allowed'
                    }`}
                  >
                    {canAfford ? 'REDEEM REWARD' : `NEED ${rew.cost - points} MORE PTS`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
