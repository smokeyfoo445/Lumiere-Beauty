
import React, { useState } from 'react';
import { useParams } from '../hooks/useParams.ts';
import { useStore } from '../store/useStore.ts';

export default function ProductPage() {
  const { id } = useParams();
  const { products, addToCart, setCartOpen } = useStore();
  const product = products.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isResultsOpen, setIsResultsOpen] = useState(false);

  if (!product) return <div className="p-20 text-center">Product not found</div>;

  const handleAddToCart = () => {
    addToCart(product);
    setCartOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 overflow-hidden">
            <img 
              src={product.images[selectedImage]} 
              alt={product.name} 
              className="w-full h-full object-cover transition-opacity duration-500"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setSelectedImage(idx)}
                className={`aspect-square border-2 ${selectedImage === idx ? 'border-rose-gold' : 'border-transparent'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-10">
          <div>
            <nav className="flex mb-4 text-[10px] uppercase tracking-widest text-gray-400">
              <a href="#/">Home</a>
              <span className="mx-2">/</span>
              <a href="#/shop">{product.category}</a>
            </nav>
            <h1 className="text-4xl md:text-5xl serif mb-4">{product.name}</h1>
            <p className="text-2xl font-light text-gray-900">${product.price.toFixed(2)}</p>
          </div>

          <div className="prose prose-sm text-gray-600 max-w-none">
            <p className="leading-relaxed text-lg font-light">{product.description}</p>
          </div>

          {/* Results Section (Collapsible) */}
          {product.results && product.results.length > 0 && (
            <div className="border-t border-b luxury-border py-6">
              <button 
                onClick={() => setIsResultsOpen(!isResultsOpen)}
                className="w-full flex justify-between items-center group"
              >
                <span className="text-xs uppercase tracking-[0.2em] font-bold group-hover:text-rose-gold transition-colors">
                  Real Results: Before & After
                </span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${isResultsOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isResultsOpen && (
                <div className="mt-8 space-y-8 animate-fade-in">
                  {product.results.map((result, idx) => (
                    <div key={idx} className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="relative">
                          <img src={result.before} alt="Before" className="w-full aspect-square object-cover" />
                          <span className="absolute bottom-2 left-2 bg-black/50 text-white text-[8px] uppercase tracking-widest px-1.5 py-0.5 backdrop-blur-sm">Before</span>
                        </div>
                        <div className="relative">
                          <img src={result.after} alt="After" className="w-full aspect-square object-cover" />
                          <span className="absolute bottom-2 left-2 bg-rose-gold/80 text-white text-[8px] uppercase tracking-widest px-1.5 py-0.5 backdrop-blur-sm">After</span>
                        </div>
                      </div>
                      {result.caption && (
                        <p className="text-xs italic text-gray-500 text-center px-4 leading-relaxed">
                          "{result.caption}"
                        </p>
                      )}
                    </div>
                  ))}
                  <div className="pt-4 text-center">
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                      *Results may vary. Based on verified customer submissions.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="space-y-6 pt-6">
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 text-[10px] uppercase font-bold tracking-widest rounded-full ${
                product.routine === 'AM' ? 'bg-orange-100 text-orange-700' :
                product.routine === 'PM' ? 'bg-indigo-100 text-indigo-700' :
                'bg-emerald-100 text-emerald-700'
              }`}>
                {product.routine === 'Both' ? 'AM + PM Ritual' : `${product.routine} Ritual`}
              </span>
              <span className="text-xs text-gray-400 italic">Recommended usage</span>
            </div>

            <button 
              onClick={handleAddToCart}
              className="w-full py-5 bg-black text-white text-xs font-bold uppercase tracking-[0.3em] hover:bg-gray-800 transition-colors shadow-lg"
            >
              Add To Routine
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t luxury-border">
            <div className="space-y-4">
              <h4 className="text-xs uppercase tracking-widest font-bold">Key Benefits</h4>
              <ul className="space-y-3">
                {product.benefits.map((b, i) => (
                  <li key={i} className="flex items-start space-x-3 text-sm text-gray-600">
                    <span className="text-rose-gold font-bold">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4 p-6 bg-rose-50/50 luxury-border border">
              <h4 className="text-xs uppercase tracking-widest font-bold text-rose-gold">Why We Love It</h4>
              <p className="text-sm italic text-gray-600 leading-relaxed">
                "This has completely transformed my evening wind-down. The luxury feel of the materials combined with visible results makes it an essential for anyone serious about skin health."
              </p>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-rose-gold">★</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
