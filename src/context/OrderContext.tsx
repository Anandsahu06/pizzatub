'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { TrackedOrder, CartItem } from '@/types';

interface OrderContextType {
  orders: TrackedOrder[];
  activeOrder: TrackedOrder | null;
  createOrder: (
    items: CartItem[],
    subtotal: number,
    deliveryFee: number,
    discount: number,
    total: number,
    deliveryAddress: string,
    paymentMethod: string
  ) => TrackedOrder;
  getOrderById: (id: string) => TrackedOrder | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<TrackedOrder[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('pizzatub_orders');
      if (saved) {
        setOrders(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load orders', e);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('pizzatub_orders', JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders', e);
    }
  }, [orders]);

  // Simulate active order progression automatically over time
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prevOrders) =>
        prevOrders.map((ord) => {
          if (ord.currentStatusIndex < 5) {
            return {
              ...ord,
              currentStatusIndex: ord.currentStatusIndex + 1,
              // Update simulated rider GPS coordinates slightly towards delivery location
              riderLat: ord.riderLat + 0.0015,
              riderLng: ord.riderLng + 0.0012,
            };
          }
          return ord;
        })
      );
    }, 20000); // Progress status every 20 seconds for demo responsiveness

    return () => clearInterval(interval);
  }, []);

  const createOrder = (
    items: CartItem[],
    subtotal: number,
    deliveryFee: number,
    discount: number,
    total: number,
    deliveryAddress: string,
    paymentMethod: string
  ): TrackedOrder => {
    const newOrder: TrackedOrder = {
      id: `TUB-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items,
      subtotal,
      deliveryFee,
      discount,
      total,
      deliveryAddress,
      paymentMethod,
      currentStatusIndex: 0, // Order Confirmed
      estimatedDeliveryMin: 28,
      riderName: 'Vikram Singh',
      riderPhone: '+91 98765 43210',
      riderPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      riderLat: 12.9716,
      riderLng: 77.6412,
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const getOrderById = (id: string) => {
    return orders.find((o) => o.id === id);
  };

  const activeOrder = orders.length > 0 ? orders[0] : null;

  return (
    <OrderContext.Provider value={{ orders, activeOrder, createOrder, getOrderById }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error('useOrders must be used within an OrderProvider');
  return context;
};
