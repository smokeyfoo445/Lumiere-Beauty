
import React from 'react';
import { useStore } from '../store/useStore.ts';
import ProductCard from '../components/ProductCard.tsx';

export default function Home() {
  const { products } = useStore();
  const featured = products.slice(0, 3);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/seed/beautyhero/1920/1080" 
            alt="Luxury Beauty"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl text-white">
            <h2 className="text-xs uppercase tracking-[0.4em] mb-4 font-semibold">The Autumn Edit</h2>
            <h1 className="text-6xl md:text-8xl serif mb-8 leading-[1.1]">Elegance In Every Routine</h1>
            <p className="text-lg md:text-xl font-light mb-10 text-white/90 max-w-lg leading-relaxed">
              Discover science-backed beauty tools and rituals designed to reveal your skin's natural radiance.
            </p>
            <div className="flex space-x-4">
              <a href="#/shop" className="px-10 py-5 bg-white text-black text-xs font-bold uppercase tracking-[0.2em] hover:bg-rose-gold hover:text-white transition-all">
                Shop Collection
              </a>
              <a href="#/quiz" className="px-10 py-5 bg-transparent border border-white/50 text-white text-xs font-bold uppercase tracking-[0.2em] hover:bg-white/10 backdrop-blur-sm transition-all">
                Find Your Ritual
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-xs uppercase tracking-[0.3em] text-rose-gold mb-3">Curated For You</h2>
          <h3 className="text-4xl serif">Seasonal Favorites</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-[#fdf2f2] py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
          <div className="aspect-[4/5] overflow-hidden">
            <img 
              src="https://picsum.photos/seed/philosophy/800/1000" 
              alt="Skin Ritual" 
              className="w-full h-full object-cover luxury-shadow"
            />
          </div>
          <div className="space-y-8">
            <h2 className="text-xs uppercase tracking-[0.3em] text-rose-gold">Our Philosophy</h2>
            <h3 className="text-5xl serif leading-tight">Beyond Surface Beauty. A Deeper Ritual.</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              At Lumière, we believe skincare isn't just a chore—it's a moment of connection with oneself. Our tools are sourced from the finest manufacturers globally, combining ancient wisdom with modern dermatological science.
            </p>
            <ul className="space-y-4">
              {['Dermatologist Tested', 'Cruelty-Free Always', 'Ethically Sourced Materials'].map((item) => (
                <li key={item} className="flex items-center space-x-3 text-sm text-gray-700">
                  <svg className="w-5 h-5 text-rose-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <a href="#/about" className="inline-block pt-4 border-b border-rose-gold text-rose-gold uppercase tracking-widest text-xs font-bold hover:text-black hover:border-black transition-colors">
              Discover Our Story
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
