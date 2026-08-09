export type PizzaCategory = 'pizza' | 'combos' | 'sides' | 'drinks' | 'desserts' | 'offers';

export interface PizzaItem {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number; // in INR ₹
  originalPrice?: number;
  image: string;
  category: PizzaCategory;
  isVeg: boolean;
  isSpicy?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  rating: number;
  reviewCount: number;
  prepTimeMinutes: number;
  calories: number;
  ingredients: string[];
  sizesAvailable?: ('Regular' | 'Medium' | 'Large' | 'Family')[];
}

export interface ComboItem {
  id: string;
  slug: string;
  name: string;
  description: string;
  itemsIncluded: string[];
  price: number;
  originalPrice: number;
  savings: number;
  image: string;
  badge?: string;
  isVeg: boolean;
}

export interface CartItem {
  id: string; // Unique cart item ID (combines product ID + custom options hash)
  productId: string;
  name: string;
  image: string;
  size?: 'Regular' | 'Medium' | 'Large' | 'Family';
  crust?: string;
  sauce?: string;
  cheese?: string;
  toppings?: string[];
  unitPrice: number;
  quantity: number;
  isCustomPizza?: boolean;
}

export interface CustomPizzaState {
  size: 'Regular' | 'Medium' | 'Large' | 'Family';
  crust: 'Classic Hand-Tossed' | 'Crispy Thin Crust' | 'Cheese Burst' | 'Stuffed Crust';
  sauce: 'Signature Tomato' | 'Smoky BBQ' | 'Fiery Peri Peri' | 'Creamy Garlic';
  cheese: 'Fresh Mozzarella' | 'Extra Cheese' | 'Smoked Cheddar';
  toppings: string[];
}

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderValue: number;
  description: string;
}

export interface UserLocation {
  address: string;
  city: string;
  pincode: string;
  area: string;
  isServed: boolean;
  estimatedDeliveryMin: number;
  nearbyStore: string;
}

export interface OrderStatusStep {
  status: 'Order Confirmed' | 'Pizza Being Prepared' | 'In The Oven' | 'Ready' | 'Out For Delivery' | 'Delivered';
  time: string;
  completed: boolean;
  current: boolean;
}

export interface TrackedOrder {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  deliveryAddress: string;
  paymentMethod: string;
  currentStatusIndex: number;
  estimatedDeliveryMin: number;
  riderName: string;
  riderPhone: string;
  riderPhoto: string;
  riderLat: number;
  riderLng: number;
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  openingHours: string;
  distanceKm: number;
  isOpen: boolean;
  lat: number;
  lng: number;
}

export interface ReviewItem {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  tag: string;
  verifiedOrder: boolean;
  photoUrl?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  contentHtml: string;
}

export interface AdminMetrics {
  todayOrders: number;
  todayRevenue: number;
  activeOrdersCount: number;
  avgDeliveryMin: number;
  avgOrderValue: number;
}
