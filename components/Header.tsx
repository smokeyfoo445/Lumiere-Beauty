
import React from 'react';
import { useStore } from '../store/useStore';

const Header: React.FC = () => {
  const { cart, setCartOpen } = useStore();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b luxury-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-1 flex items-center">
            <nav className="hidden md:flex space-x-8">
              <a href="#/" className="text-sm font-medium text-gray-700 hover:text-rose-gold uppercase tracking-widest transition-colors">Home</a>
              <a href="#/shop" className="text-sm font-medium text-gray-700 hover:text-rose-gold uppercase tracking-widest transition-colors">Shop</a>
              <a href="#/quiz" className="text-sm font-medium text-gray-700 hover:text-rose-gold uppercase tracking-widest transition-colors">Skin Quiz</a>
            </nav>
          </div>

          <div className="flex-shrink-0 flex items-center">
            <a href="#/" className="text-3xl font-bold tracking-tighter serif">LUMIÈRE</a>
          </div>

          <div className="flex-1 flex items-center justify-end space-x-6">
            <a href="#/admin" className="text-xs uppercase tracking-tighter text-gray-400 hover:text-gray-900">Admin</a>
            <button 
              onClick={() => setCartOpen(true)}
              className="relative p-2 text-gray-700 hover:text-rose-gold transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-rose-gold rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
