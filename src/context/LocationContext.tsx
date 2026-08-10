'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserLocation } from '@/types';
import { STORE_LOCATIONS } from '@/data/mockData';

interface LocationContextType {
  location: UserLocation;
  setLocation: (loc: Partial<UserLocation>) => void;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  detectLocation: () => Promise<boolean>;
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
    const val = pincodeOrArea.toLowerCase();
    const isServed = val.length > 0 && !val.includes('remote') && !val.includes('000000');
    return isServed;
  };

  const detectLocation = async (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        // Geolocation unsupported fallback
        setLocation({
          address: '7th Block, Koramangala 80ft Road',
          city: 'Bengaluru',
          pincode: '560095',
          area: 'Koramangala',
          isServed: true,
          estimatedDeliveryMin: 25,
          nearbyStore: STORE_LOCATIONS[1].name,
        });
        resolve(true);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            if (res.ok) {
              const data = await res.json();
              const addressObj = data.address || {};
              const area =
                addressObj.suburb ||
                addressObj.neighbourhood ||
                addressObj.residential ||
                addressObj.subdistrict ||
                'Current Location';
              const city =
                addressObj.city ||
                addressObj.town ||
                addressObj.state_district ||
                addressObj.state ||
                'Bengaluru';
              const pincode = addressObj.postcode || '560001';
              const fullAddr = `${area}, ${city}`;

              setLocation({
                address: fullAddr,
                city,
                pincode,
                area,
                isServed: true,
                estimatedDeliveryMin: Math.floor(20 + Math.random() * 10),
                nearbyStore: STORE_LOCATIONS[0].name,
              });
              resolve(true);
              return;
            }
          } catch (err) {
            console.warn('Reverse geocoding failed, using coordinates', err);
          }

          // Fallback if reverse geocoding fails
          setLocation({
            address: `GPS Location (${latitude.toFixed(2)}, ${longitude.toFixed(2)})`,
            city: 'Bengaluru',
            pincode: '560038',
            area: 'Detected Zone',
            isServed: true,
            estimatedDeliveryMin: 24,
            nearbyStore: STORE_LOCATIONS[0].name,
          });
          resolve(true);
        },
        (error) => {
          console.warn('Geolocation error or permission denied:', error.message);
          // Fallback location on permission denied/timeout
          setLocation({
            address: 'Indiranagar 100ft Road',
            city: 'Bengaluru',
            pincode: '560038',
            area: 'Indiranagar',
            isServed: true,
            estimatedDeliveryMin: 28,
            nearbyStore: STORE_LOCATIONS[0].name,
          });
          resolve(true);
        },
        { timeout: 8000, enableHighAccuracy: true }
      );
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
