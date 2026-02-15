
import React, { useState } from 'react';
import { useParams } from '../hooks/useParams.ts';
import { useStore } from '../store/useStore.ts';
import { Review } from '../types.ts';

export default function ProductPage() {
  const { id } = useParams();
  const { products, addToCart, setCartOpen, addReview } = useStore();
  const product = products.find(p => p.id === id);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isResultsOpen, setIsResultsOpen] = useState(false);

  // Review form state
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewName, setReviewName] = useState('');
  const [reviewPhoto, setReviewPhoto] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!product) return <div className="p-20 text-center">Product not found</div>;

  const handleAddToCart = () => {
    addToCart(product);
    setCartOpen(true);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setReviewPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;

    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      const newReview: Review = {
        id: `rev-${Date.now()}`,
        userName: reviewName,
        rating: reviewRating,
        comment: reviewComment,
        photoUrl: reviewPhoto || undefined,
        createdAt: new Date().toISOString(),
      };

      addReview(product.id, newReview);
      
      // Reset form
      setReviewName('');
      setReviewComment('');
      setReviewRating(5);
      setReviewPhoto(null);
      setIsSubmitting(false);
    }, 800);
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

      {/* Reviews Section */}
      <div className="mt-24 space-y-16 border-t luxury-border pt-16">
        <div className="text-center">
          <h2 className="text-xs uppercase tracking-[0.3em] text-rose-gold mb-3">Community Speak</h2>
          <h3 className="text-4xl serif">Customer Reviews</h3>
        </div>

        <div className="grid lg:grid-cols-3 gap-16">
          {/* Review List */}
          <div className="lg:col-span-2 space-y-12">
            {!product.reviews || product.reviews.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 luxury-border border border-dashed rounded-lg">
                <p className="text-gray-400 italic">Be the first to share your Lumière ritual.</p>
              </div>
            ) : (
              <div className="space-y-10">
                {product.reviews.map((review) => (
                  <div key={review.id} className="border-b luxury-border pb-10 last:border-0">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-rose-gold/10 rounded-full flex items-center justify-center text-rose-gold serif text-lg">
                          {review.userName.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-bold uppercase tracking-widest">{review.userName}</p>
                          <p className="text-[10px] text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-0.5">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < review.rating ? "text-rose-gold" : "text-gray-200"}>★</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-4 gap-6">
                      <div className="md:col-span-3">
                        <p className="text-gray-600 leading-relaxed font-light">{review.comment}</p>
                      </div>
                      {review.photoUrl && (
                        <div className="aspect-square bg-gray-100 overflow-hidden rounded">
                          <img src={review.photoUrl} alt="Review" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Review Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 luxury-border border shadow-sm sticky top-24">
              <h4 className="text-xl serif mb-6">Write a Review</h4>
              <form onSubmit={handleSubmitReview} className="space-y-6">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 block mb-3">Your Rating</label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className={`text-2xl transition-colors ${star <= reviewRating ? 'text-rose-gold' : 'text-gray-200'}`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={reviewName}
                      onChange={(e) => setReviewName(e.target.value)}
                      className="w-full px-4 py-3 border luxury-border focus:ring-1 focus:ring-rose-gold outline-none text-sm font-light"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Share your experience..."
                      rows={4}
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="w-full px-4 py-3 border luxury-border focus:ring-1 focus:ring-rose-gold outline-none text-sm font-light resize-none"
                      required
                    ></textarea>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-widest text-gray-500 block mb-3">Share a Photo</label>
                  <div className="relative border-2 border-dashed luxury-border rounded-lg p-4 text-center hover:border-rose-gold transition-colors">
                    {reviewPhoto ? (
                      <div className="relative">
                        <img src={reviewPhoto} className="h-20 w-auto mx-auto rounded" alt="Preview" />
                        <button 
                          type="button" 
                          onClick={() => setReviewPhoto(null)}
                          className="absolute -top-2 -right-2 bg-white rounded-full shadow-sm p-1 text-red-500"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <svg className="mx-auto h-8 w-8 text-gray-300" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="flex text-xs text-gray-500 justify-center">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-rose-gold hover:text-black">
                            <span>Upload photo</span>
                            <input type="file" className="sr-only" onChange={handlePhotoUpload} accept="image/*" />
                          </label>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-black text-white text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isSubmitting ? 'Publishing...' : 'Publish Review'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
