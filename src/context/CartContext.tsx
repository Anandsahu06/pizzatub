'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, PromoCode } from '@/types';
import { PROMO_CODES } from '@/data/mockData';

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  appliedCoupon: PromoCode | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  subtotal: number;
  discountAmount: number;
  deliveryFee: number;
  total: number;
  itemCount: number;
  lastAddedItem: CartItem | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [appliedCoupon, setAppliedCoupon] = useState<PromoCode | null>(null);
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('pizzatub_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage', e);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pizzatub_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cart]);

  const addToCart = (itemData: Omit<CartItem, 'id'>) => {
    // Generate unique ID based on options
    const customHash = itemData.isCustomPizza 
      ? `${itemData.productId}-${itemData.size}-${itemData.crust}-${itemData.sauce}-${(itemData.toppings || []).sort().join('-')}`
      : `${itemData.productId}-${itemData.size || 'default'}`;
    
    const existingIndex = cart.findIndex((i) => i.id === customHash);

    let updatedCart: CartItem[];
    let addedItem: CartItem;

    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += itemData.quantity;
      addedItem = updatedCart[existingIndex];
    } else {
      addedItem = { ...itemData, id: customHash };
      updatedCart = [...cart, addedItem];
    }

    setCart(updatedCart);
    setLastAddedItem(addedItem);
    setIsCartOpen(true);

    setTimeout(() => {
      setLastAddedItem(null);
    }, 2500);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const codeUpper = code.trim().toUpperCase();
    const found = PROMO_CODES.find((c) => c.code === codeUpper);

    if (!found) {
      return { success: false, message: 'Invalid promo code.' };
    }

    const currentSubtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

    if (currentSubtotal < found.minOrderValue) {
      return { success: false, message: `Minimum order value for ${found.code} is ₹${found.minOrderValue}.` };
    }

    setAppliedCoupon(found);
    return { success: true, message: `Promo code ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrderValue) {
    if (appliedCoupon.discountType === 'flat') {
      discountAmount = appliedCoupon.discountValue;
    } else {
      discountAmount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
    }
  }

  const deliveryFee = subtotal > 500 || subtotal === 0 ? 0 : 49;
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        subtotal,
        discountAmount,
        deliveryFee,
        total,
        itemCount,
        lastAddedItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
