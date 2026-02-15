
import React from 'react';
import { useStore } from '../store/useStore';

const CartDrawer: React.FC = () => {
  const { isCartOpen, setCartOpen, cart, updateCartQuantity, removeFromCart } = useStore();
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setCartOpen(false)}></div>
      
      <div className="fixed inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full animate-slide-in-right">
          <div className="px-6 py-6 border-b luxury-border flex items-center justify-between">
            <h2 className="text-xl serif tracking-tight">Shopping Bag</h2>
            <button onClick={() => setCartOpen(false)} className="text-gray-400 hover:text-black">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <p className="text-gray-400">Your bag is currently empty.</p>
                <a href="#/shop" onClick={() => setCartOpen(false)} className="px-8 py-3 bg-rose-gold text-white text-xs uppercase tracking-widest hover:opacity-90 transition-opacity">
                  Discover Our Collection
                </a>
              </div>
            ) : (
              <ul className="divide-y luxury-border">
                {cart.map((item) => (
                  <li key={item.id} className="py-6 flex">
                    <div className="flex-shrink-0 w-24 h-24 overflow-hidden bg-gray-50">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-4 flex-1 flex flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3 className="serif text-sm">{item.name}</h3>
                          <p className="ml-4 font-light text-sm">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">{item.category}</p>
                      </div>
                      <div className="flex-1 flex items-end justify-between text-sm">
                        <div className="flex items-center space-x-3 border px-2 py-1 rounded">
                          <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="text-gray-500 hover:text-black">-</button>
                          <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="text-gray-500 hover:text-black">+</button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="font-medium text-rose-gold hover:text-black text-xs uppercase tracking-tighter"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t luxury-border px-6 py-6 space-y-4">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p className="serif">Subtotal</p>
                <p className="font-light">${subtotal.toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-xs text-gray-500 italic">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <a
                  href="#/checkout"
                  onClick={() => setCartOpen(false)}
                  className="flex justify-center items-center px-6 py-4 border border-transparent bg-black text-white text-xs font-semibold uppercase tracking-[0.2em] shadow-sm hover:bg-gray-800 transition-colors"
                >
                  Checkout Now
                </a>
              </div>
              <div className="mt-4 flex justify-center text-sm text-center text-gray-500">
                <p>
                  or{' '}
                  <button
                    type="button"
                    className="text-rose-gold font-medium hover:text-black"
                    onClick={() => setCartOpen(false)}
                  >
                    Continue Shopping<span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
