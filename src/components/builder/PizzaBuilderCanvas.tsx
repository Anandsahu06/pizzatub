'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CustomPizzaState } from '@/types';

interface PizzaBuilderCanvasProps {
  pizzaState: CustomPizzaState;
}

export const PizzaBuilderCanvas: React.FC<PizzaBuilderCanvasProps> = ({ pizzaState }) => {
  // Sauce colors
  const sauceColors: Record<string, string> = {
    'Signature Tomato': '#D32F2F',
    'Smoky BBQ': '#4E2A1E',
    'Fiery Peri Peri': '#FF5722',
    'Creamy Garlic': '#FFF8E1',
  };

  const currentSauceColor = sauceColors[pizzaState.sauce] || '#D32F2F';

  // Topping SVG element render positions
  const toppingPositions = [
    { x: 150, y: 110 }, { x: 230, y: 130 }, { x: 180, y: 170 }, { x: 110, y: 190 },
    { x: 260, y: 200 }, { x: 150, y: 240 }, { x: 220, y: 250 }, { x: 190, y: 110 },
    { x: 120, y: 140 }, { x: 270, y: 160 }, { x: 110, y: 240 }, { x: 200, y: 210 },
  ];

  return (
    <div className="relative w-full aspect-square max-w-[440px] mx-auto flex items-center justify-center p-4">
      {/* Radiant Heat Glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-red/25 via-brand-orange/20 to-transparent blur-3xl pointer-events-none" />

      {/* SVG Canvas Container */}
      <svg
        viewBox="0 0 360 360"
        className="w-full h-full drop-shadow-2xl transition-all duration-500"
      >
        {/* Shadow Outer */}
        <circle cx="180" cy="185" r="160" fill="rgba(0, 0, 0, 0.5)" filter="blur(10px)" />

        {/* Outer Crust Base */}
        <circle
          cx="180"
          cy="180"
          r="160"
          fill="#D48C46"
          stroke="#A86120"
          strokeWidth="6"
        />

        {/* Crust Blistering Details */}
        <circle cx="180" cy="180" r="150" fill="#E69D54" />
        <circle cx="120" cy="60" r="8" fill="#8C4A13" opacity="0.45" />
        <circle cx="280" cy="120" r="10" fill="#8C4A13" opacity="0.35" />
        <circle cx="90" cy="240" r="12" fill="#8C4A13" opacity="0.45" />
        <circle cx="240" cy="290" r="9" fill="#8C4A13" opacity="0.35" />

        {/* Crust Type Special Visual Rings */}
        {pizzaState.crust === 'Cheese Burst' && (
          <circle cx="180" cy="180" r="142" fill="none" stroke="#FFD54F" strokeWidth="10" opacity="0.85" />
        )}
        {pizzaState.crust === 'Stuffed Crust' && (
          <circle cx="180" cy="180" r="144" fill="none" stroke="#FFF59D" strokeWidth="8" strokeDasharray="12 6" opacity="0.9" />
        )}

        {/* Sauce Layer */}
        <circle
          cx="180"
          cy="180"
          r="135"
          fill={currentSauceColor}
          style={{ transition: 'fill 0.4s ease' }}
        />

        {/* Cheese Layer */}
        <circle cx="180" cy="180" r="128" fill="#FFF59D" opacity="0.88" />
        <circle cx="180" cy="180" r="120" fill="#FFFDE7" opacity="0.95" />

        {/* Cheese Blend Specks */}
        {pizzaState.cheese === 'Extra Cheese' && (
          <circle cx="180" cy="180" r="124" fill="#FFE082" opacity="0.7" />
        )}
        {pizzaState.cheese === 'Smoked Cheddar' && (
          <circle cx="180" cy="180" r="124" fill="#FFB74D" opacity="0.65" />
        )}

        {/* Melted Cheese Specks */}
        <g opacity="0.55">
          <circle cx="160" cy="120" r="5" fill="#FBC02D" />
          <circle cx="210" cy="150" r="7" fill="#FBC02D" />
          <circle cx="140" cy="210" r="6" fill="#FBC02D" />
          <circle cx="230" cy="220" r="5" fill="#FBC02D" />
          <circle cx="190" cy="250" r="6" fill="#FBC02D" />
        </g>

        {/* Toppings Dynamic Layers */}
        {pizzaState.toppings.map((topping, tIdx) => {
          return (
            <g key={topping}>
              {toppingPositions.slice(0, 10).map((pos, pIdx) => {
                const offsetX = (tIdx * 12 + pIdx * 7) % 24 - 12;
                const offsetY = (tIdx * 9 + pIdx * 11) % 24 - 12;
                const cx = pos.x + offsetX;
                const cy = pos.y + offsetY;

                if (topping === 'Pepperoni') {
                  return (
                    <g key={pIdx}>
                      <circle cx={cx} cy={cy} r="14" fill="#B71C1C" stroke="#780000" strokeWidth="2" />
                      <circle cx={cx - 3} cy={cy - 3} r="3" fill="#D32F2F" opacity="0.6" />
                    </g>
                  );
                }

                if (topping === 'Herb Chicken') {
                  return (
                    <rect
                      key={pIdx}
                      x={cx - 10}
                      y={cy - 8}
                      width="18"
                      height="14"
                      rx="4"
                      fill="#D7CCC8"
                      stroke="#8D6E63"
                      strokeWidth="1.5"
                    />
                  );
                }

                if (topping === 'Peri Peri Paneer') {
                  return (
                    <rect
                      key={pIdx}
                      x={cx - 9}
                      y={cy - 9}
                      width="16"
                      height="16"
                      rx="3"
                      fill="#FFF"
                      stroke="#FF5722"
                      strokeWidth="2"
                    />
                  );
                }

                if (topping === 'Sweet Corn') {
                  return (
                    <circle key={pIdx} cx={cx} cy={cy} r="5" fill="#FFEB3B" stroke="#FBC02D" strokeWidth="1" />
                  );
                }

                if (topping === 'Red Onion') {
                  return (
                    <path
                      key={pIdx}
                      d={`M ${cx - 10} ${cy} A 10 10 0 0 1 ${cx + 10} ${cy}`}
                      fill="none"
                      stroke="#8E24AA"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  );
                }

                if (topping === 'Black Olives') {
                  return (
                    <circle key={pIdx} cx={cx} cy={cy} r="7" fill="#212121" stroke="#424242" strokeWidth="3" />
                  );
                }

                if (topping === 'Jalapeños') {
                  return (
                    <circle key={pIdx} cx={cx} cy={cy} r="8" fill="#2E7D32" stroke="#1B5E20" strokeWidth="2" />
                  );
                }

                if (topping === 'Button Mushrooms') {
                  return (
                    <g key={pIdx}>
                      <path d={`M ${cx - 8} ${cy} Q ${cx} ${cy - 12} ${cx + 8} ${cy} Z`} fill="#BDBDBD" />
                      <rect x={cx - 3} y={cy} width="6" height="7" fill="#E0E0E0" />
                    </g>
                  );
                }

                if (topping === 'Crisp Capsicum') {
                  return (
                    <rect
                      key={pIdx}
                      x={cx - 12}
                      y={cy - 4}
                      width="20"
                      height="7"
                      rx="3"
                      fill="#4CAF50"
                      stroke="#2E7D32"
                      strokeWidth="1.5"
                    />
                  );
                }

                return null;
              })}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
