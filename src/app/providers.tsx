'use client';

import React from 'react';
import { CartProvider } from '@/context/CartContext';
import { LocationProvider } from '@/context/LocationContext';
import { OrderProvider } from '@/context/OrderContext';
import { LoyaltyProvider } from '@/context/LoyaltyContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LocationProvider>
      <CartProvider>
        <OrderProvider>
          <LoyaltyProvider>{children}</LoyaltyProvider>
        </OrderProvider>
      </CartProvider>
    </LocationProvider>
  );
}
