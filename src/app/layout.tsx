import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import { OvenLoader } from '@/components/layout/OvenLoader';

export const metadata: Metadata = {
  title: 'PIZZA TUB — Big Cravings. Bigger Slices.',
  description: 'Flagship food-commerce platform offering 72-hour cold-fermented sourdough pizzas, custom interactive pizza builder, 30-minute hot delivery, and Pizza Club rewards.',
  keywords: ['Pizza Tub', 'Sourdough Pizza', 'Pizza Builder', 'Food Delivery', 'Pizza Delivery Bengaluru Mumbai Delhi', 'Handcrafted Pizza'],
  openGraph: {
    title: 'PIZZA TUB — Big Cravings. Bigger Slices.',
    description: 'Freshly baked 500°C brick oven pizzas delivered piping hot in 30 minutes.',
    url: 'https://pizzatub.in',
    siteName: 'PIZZA TUB',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'PIZZA TUB Signature Pizza',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PIZZA TUB — Big Cravings. Bigger Slices.',
    description: 'Freshly baked 500°C brick oven pizzas delivered piping hot in 30 minutes.',
    images: ['https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-brand-bg text-white font-body antialiased selection:bg-brand-red selection:text-white">
        <Providers>
          <OvenLoader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
