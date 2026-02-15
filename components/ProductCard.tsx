
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group relative">
      <a href={`#/product/${product.id}`} className="block overflow-hidden bg-gray-100 aspect-square">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.isAiOptimized && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 text-[10px] uppercase tracking-widest font-semibold text-rose-gold">
            Editor's Pick
          </span>
        )}
      </a>
      <div className="mt-4 text-center">
        <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-1">{product.category}</p>
        <h3 className="text-lg serif group-hover:text-rose-gold transition-colors">
          <a href={`#/product/${product.id}`}>{product.name}</a>
        </h3>
        <p className="mt-1 text-sm text-gray-600 font-light">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
