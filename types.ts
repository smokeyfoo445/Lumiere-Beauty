
export enum Category {
  SKINCARE = 'Skincare',
  MAKEUP = 'Makeup',
  TOOLS = 'Tools',
  HAIR = 'Hair',
  BODY = 'Body'
}

export interface BeforeAfterResult {
  before: string;
  after: string;
  caption?: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  photoUrl?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  costPrice: number;
  category: Category;
  images: string[];
  variants: Variant[];
  aliExpressUrl: string;
  inventory: number;
  isAiOptimized: boolean;
  benefits: string[];
  routine: 'AM' | 'PM' | 'Both';
  ingredients?: string[];
  results?: BeforeAfterResult[];
  reviews?: Review[];
}

export interface Variant {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedVariantId?: string;
}

export interface Order {
  id: string;
  customerEmail: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  trackingNumber?: string;
  createdAt: string;
}

export interface SkinQuizResult {
  skinType: 'oily' | 'dry' | 'combination' | 'normal';
  concerns: string[];
}
