
import { Category, Product } from './types.ts';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'ali-1',
    name: 'LumiGlow LED Therapy Mask',
    description: 'Advanced 7-color light therapy for salon-quality skincare at home. Target acne, wrinkles, and hyperpigmentation with medical-grade LEDs.',
    shortDescription: 'The future of facial rejuvenation.',
    price: 129.99,
    costPrice: 45.00,
    category: Category.TOOLS,
    images: ['https://picsum.photos/seed/ledmask/800/800', 'https://picsum.photos/seed/led2/800/800'],
    variants: [{ id: 'v1', name: 'Original White', price: 129.99, stock: 50 }],
    aliExpressUrl: 'https://aliexpress.com/item/1005008626035616.html',
    inventory: 50,
    isAiOptimized: true,
    benefits: ['Reduces fine lines', 'Kills acne bacteria', 'Brightens skin tone'],
    routine: 'PM',
    results: [
      {
        before: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=400&h=400',
        after: 'https://images.unsplash.com/photo-1512431119117-4124962ca4d0?auto=format&fit=crop&q=80&w=400&h=400',
        caption: 'Visible reduction in redness after 4 weeks of daily PM use.'
      },
      {
        before: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=400&h=400',
        after: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400&h=400',
        caption: 'Texture refinement and tone evening reported after 15 sessions.'
      }
    ]
  },
  {
    id: 'ali-2',
    name: 'Sonic Makeup Brush Purifier',
    description: 'Keep your brushes pristine with our ultrasonic cleaning technology. Removes 99% of bacteria and makeup residue in seconds.',
    shortDescription: 'Professional brush hygiene made simple.',
    price: 49.99,
    costPrice: 18.50,
    category: Category.TOOLS,
    images: ['https://picsum.photos/seed/cleaner/800/800'],
    variants: [{ id: 'v2', name: 'Pearl Pink', price: 49.99, stock: 120 }],
    aliExpressUrl: 'https://aliexpress.com/item/1005007336014767.html',
    inventory: 120,
    isAiOptimized: true,
    benefits: ['Extends brush life', 'Prevents breakouts', 'Easy USB charging'],
    routine: 'Both'
  },
  {
    id: 'ali-3',
    name: 'Atelier Rotating Vanity Organizer',
    description: '360-degree silent rotation storage for your entire collection. Crystal-clear luxury design to display your favorite serums and palettes.',
    shortDescription: 'Elegance for your dressing table.',
    price: 64.99,
    costPrice: 22.00,
    category: Category.BODY,
    images: ['https://picsum.photos/seed/vanity/800/800'],
    variants: [{ id: 'v3', name: 'Clear Crystal', price: 64.99, stock: 85 }],
    aliExpressUrl: 'https://aliexpress.com/item/1005007449621980.html',
    inventory: 85,
    isAiOptimized: true,
    benefits: ['Space saving', 'Adjustable layers', 'Waterproof design'],
    routine: 'Both'
  }
];
