'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface LoyaltyContextType {
  points: number;
  tier: 'Dough' | 'Cheese' | 'Supreme';
  addPoints: (amountSpent: number) => void;
  redeemReward: (costPoints: number) => boolean;
  claimedRewards: string[];
}

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

export const LoyaltyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [points, setPoints] = useState<number>(340); // Initial welcome points
  const [claimedRewards, setClaimedRewards] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('pizzatub_loyalty');
      if (saved) {
        const parsed = JSON.parse(saved);
        setPoints(parsed.points ?? 340);
        setClaimedRewards(parsed.claimedRewards ?? []);
      }
    } catch (e) {
      console.error('Failed to load loyalty data', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('pizzatub_loyalty', JSON.stringify({ points, claimedRewards }));
    } catch (e) {
      console.error('Failed to save loyalty data', e);
    }
  }, [points, claimedRewards]);

  // Points calculation: Every ₹100 spent = 10 Pizza Points
  const addPoints = (amountSpent: number) => {
    const earned = Math.floor(amountSpent / 10);
    setPoints((prev) => prev + earned);
  };

  const redeemReward = (costPoints: number) => {
    if (points >= costPoints) {
      setPoints((prev) => prev - costPoints);
      return true;
    }
    return false;
  };

  let tier: 'Dough' | 'Cheese' | 'Supreme' = 'Dough';
  if (points >= 1000) {
    tier = 'Supreme';
  } else if (points >= 400) {
    tier = 'Cheese';
  }

  return (
    <LoyaltyContext.Provider value={{ points, tier, addPoints, redeemReward, claimedRewards }}>
      {children}
    </LoyaltyContext.Provider>
  );
};

export const useLoyalty = () => {
  const context = useContext(LoyaltyContext);
  if (!context) throw new Error('useLoyalty must be used within a LoyaltyProvider');
  return context;
};
