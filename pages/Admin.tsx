
import React, { useState } from 'react';
import { useStore } from '../store/useStore.ts';
import { rewriteProductDescription } from '../services/geminiService.ts';
import { Category, Product } from '../types.ts';

export default function Admin() {
  const { products, addProduct, deleteProduct, orders } = useStore();
  const [importUrl, setImportUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [profitMargin, setProfitMargin] = useState(100); // 100% markup default

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!importUrl) return;

    setIsImporting(true);
    // Simulate scraping
    setTimeout(async () => {
      const mockAliData = {
        name: "AliExpress Beauty Tool " + Math.floor(Math.random() * 1000),
        rawDescription: "High quality professional skin care tool for home use. 100% brand new.",
        cost: 25.00,
        image: `https://picsum.photos/seed/tool${Math.random()}/800/800`
      };

      const aiContent = await rewriteProductDescription(mockAliData.name, mockAliData.rawDescription);
      
      const salePrice = mockAliData.cost * (1 + profitMargin / 100);

      const newProduct: Product = {
        id: 'imported-' + Date.now(),
        name: aiContent?.name || mockAliData.name,
        description: aiContent?.description || mockAliData.rawDescription,
        shortDescription: aiContent?.tagline || "Professional beauty solution.",
        price: salePrice,
        costPrice: mockAliData.cost,
        category: Category.TOOLS,
        images: [mockAliData.image],
        variants: [],
        aliExpressUrl: importUrl,
        inventory: 100,
        isAiOptimized: !!aiContent,
        benefits: aiContent?.benefits || ['Easy to use', 'Durable', 'Effective'],
        routine: (aiContent?.routine as any) || 'Both'
      };

      addProduct(newProduct);
      setImportUrl('');
      setIsImporting(false);
      alert('Product imported and AI-optimized!');
    }, 2000);
  };

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl serif">Command Center</h1>
          <p className="text-gray-500 font-light mt-2">Manage your luxury beauty empire.</p>
        </div>
        <div className="flex space-x-8 text-right">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400">Total Revenue</p>
            <p className="text-2xl font-semibold">${totalRevenue.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-gray-400">Total Orders</p>
            <p className="text-2xl font-semibold">{orders.length}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        {/* Import Tool */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-8 luxury-border border shadow-sm rounded-lg">
            <h3 className="text-xl serif mb-6">Import From AliExpress</h3>
            <form onSubmit={handleImport} className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">Product URL</label>
                <input 
                  type="text" 
                  value={importUrl}
                  onChange={(e) => setImportUrl(e.target.value)}
                  placeholder="Paste AliExpress link here..."
                  className="w-full px-4 py-3 border luxury-border focus:ring-1 focus:ring-rose-gold outline-none text-sm"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-gray-500 block mb-2">Profit Margin ({profitMargin}%)</label>
                <input 
                  type="range" 
                  min="20" 
                  max="300" 
                  value={profitMargin}
                  onChange={(e) => setProfitMargin(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-rose-gold"
                />
              </div>
              <button 
                disabled={isImporting}
                className="w-full py-4 bg-rose-gold text-white text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isImporting ? 'AI is Optimizing...' : 'Scrape & Optimize'}
              </button>
            </form>
          </div>

          <div className="bg-black text-white p-8 rounded-lg">
            <h3 className="text-xl serif mb-4">Supplier Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-xs text-gray-400">Avg. Shipping Time</span>
                <span className="text-sm font-medium">12-14 Days</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-xs text-gray-400">Active Suppliers</span>
                <span className="text-sm font-medium">8 Trusted Partners</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Inventory */}
        <div className="lg:col-span-2">
          <div className="bg-white luxury-border border shadow-sm rounded-lg overflow-hidden">
            <div className="p-6 border-b luxury-border flex justify-between items-center">
              <h3 className="text-xl serif">Inventory Management</h3>
              <span className="text-xs text-gray-400">{products.length} Products Live</span>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[10px] uppercase tracking-widest text-gray-500">
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Cost</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Margin</th>
                  <th className="px-6 py-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y luxury-border text-sm">
                {products.map(p => {
                  const margin = ((p.price - p.costPrice) / p.price * 100).toFixed(0);
                  return (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 flex items-center space-x-4">
                        <img src={p.images[0]} className="w-10 h-10 object-cover" />
                        <div>
                          <p className="font-medium text-gray-900">{p.name}</p>
                          <p className="text-xs text-rose-gold">{p.category}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-500">${p.costPrice.toFixed(2)}</td>
                      <td className="px-6 py-4 font-medium">${p.price.toFixed(2)}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">
                          {margin}%
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button 
                          onClick={() => deleteProduct(p.id)}
                          className="text-red-400 hover:text-red-600 text-xs uppercase font-bold"
                        >
                          Archive
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
