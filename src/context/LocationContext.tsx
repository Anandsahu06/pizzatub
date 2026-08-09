'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserLocation } from '@/types';
import { STORE_LOCATIONS } from '@/data/mockData';

interface LocationContextType {
  location: UserLocation;
  setLocation: (loc: Partial<UserLocation>) => void;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  detectLocation: () => Promise<void>;
  checkServiceability: (pincodeOrArea: string) => boolean;
}

const DEFAULT_LOCATION: UserLocation = {
  address: '100 Feet Road, Indiranagar',
  city: 'Bengaluru',
  pincode: '560038',
  area: 'Indiranagar',
  isServed: true,
  estimatedDeliveryMin: 28,
  nearbyStore: STORE_LOCATIONS[0].name,
};

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocationState] = useState<UserLocation>(DEFAULT_LOCATION);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('pizzatub_location');
      if (saved) {
        setLocationState(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load location', e);
    }
  }, []);

  const setLocation = (newLoc: Partial<UserLocation>) => {
    const updated = { ...location, ...newLoc };
    setLocationState(updated);
    try {
      localStorage.setItem('pizzatub_location', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save location', e);
    }
  };

  const checkServiceability = (pincodeOrArea: string) => {
    // Demo serviceability logic: 560038, 560095, 400050, 110001 or any input containing "Indiranagar", "Koramangala", "Bandra", "CP", "Delhi", "Bengaluru", "Mumbai"
    const val = pincodeOrArea.toLowerCase();
    const isServed = val.length > 0 && !val.includes('remote') && !val.includes('000000');
    return isServed;
  };

  const detectLocation = async () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setLocation({
          address: '7th Block, Koramangala 80ft Road',
          city: 'Bengaluru',
          pincode: '560095',
          area: 'Koramangala',
          isServed: true,
          estimatedDeliveryMin: 25,
          nearbyStore: STORE_LOCATIONS[1].name,
        });
        resolve();
      }, 1200);
    });
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        isLocationModalOpen,
        setIsLocationModalOpen,
        detectLocation,
        checkServiceability,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) throw new Error('useLocation must be used within a LocationProvider');
  return context;
};
