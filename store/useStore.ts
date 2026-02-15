
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, Order, Category, SkinQuizResult } from '../types.ts';
import { INITIAL_PRODUCTS } from '../constants.ts';

interface AppState {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  isCartOpen: boolean;
  skinQuizResult: SkinQuizResult | null;
  
  // Actions
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  setCartOpen: (open: boolean) => void;
  setQuizResult: (result: SkinQuizResult) => void;
  placeOrder: (order: Order) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      products: INITIAL_PRODUCTS,
      cart: [],
      orders: [],
      isCartOpen: false,
      skinQuizResult: null,

      addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
      updateProduct: (product) => set((state) => ({ 
        products: state.products.map(p => p.id === product.id ? product : p) 
      })),
      deleteProduct: (id) => set((state) => ({
        products: state.products.filter(p => p.id !== id)
      })),
      addToCart: (product, quantity = 1) => set((state) => {
        const existing = state.cart.find(item => item.id === product.id);
        if (existing) {
          return {
            cart: state.cart.map(item => 
              item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
            )
          };
        }
        return { cart: [...state.cart, { ...product, quantity }] };
      }),
      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter(item => item.id !== id)
      })),
      updateCartQuantity: (id, quantity) => set((state) => ({
        cart: state.cart.map(item => item.id === id ? { ...item, quantity: Math.max(0, quantity) } : item)
          .filter(item => item.quantity > 0)
      })),
      setCartOpen: (open) => set({ isCartOpen: open }),
      setQuizResult: (result) => set({ skinQuizResult: result }),
      placeOrder: (order) => set((state) => ({ 
        orders: [order, ...state.orders],
        cart: [] 
      })),
    }),
    {
      name: 'lumiere-storage',
    }
  )
);
