
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t luxury-border py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold tracking-tighter serif">LUMIÈRE</h2>
          <p className="text-sm text-gray-500 leading-relaxed font-light">
            Luxury skincare rituals curated for the modern individual. Experience the intersection of technology and self-care.
          </p>
        </div>
        
        <div className="space-y-6">
          <h4 className="text-xs uppercase tracking-widest font-bold">The Collection</h4>
          <ul className="space-y-4 text-sm text-gray-600 font-light">
            <li><a href="#/shop" className="hover:text-rose-gold transition-colors">Tools & Devices</a></li>
            <li><a href="#/shop" className="hover:text-rose-gold transition-colors">Vanity Organizers</a></li>
            <li><a href="#/shop" className="hover:text-rose-gold transition-colors">Skincare Routine</a></li>
            <li><a href="#/quiz" className="hover:text-rose-gold transition-colors">Gift Sets</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs uppercase tracking-widest font-bold">Support</h4>
          <ul className="space-y-4 text-sm text-gray-600 font-light">
            <li><a href="#" className="hover:text-rose-gold transition-colors">Shipping Policy</a></li>
            <li><a href="#" className="hover:text-rose-gold transition-colors">Track Your Order</a></li>
            <li><a href="#" className="hover:text-rose-gold transition-colors">Returns & Refunds</a></li>
            <li><a href="#" className="hover:text-rose-gold transition-colors">FAQ</a></li>
          </ul>
        </div>

        <div className="space-y-6">
          <h4 className="text-xs uppercase tracking-widest font-bold">The Lumière Letter</h4>
          <p className="text-sm text-gray-500 font-light">Join our circle for exclusive early access and beauty rituals.</p>
          <div className="flex border-b luxury-border pb-2">
            <input 
              type="email" 
              placeholder="Your Email" 
              className="bg-transparent border-none outline-none text-sm w-full font-light"
            />
            <button className="text-xs uppercase tracking-widest font-bold text-rose-gold hover:text-black">Join</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-8 border-t luxury-border flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-gray-400">
        <p>© 2024 Lumière Beauty. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-black">Privacy Policy</a>
          <a href="#" className="hover:text-black">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
