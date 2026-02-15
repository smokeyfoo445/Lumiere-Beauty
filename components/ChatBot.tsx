
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { useStore } from '../store/useStore.ts';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Welcome to Lumière Concierge. I am your personal beauty advisor. How may I assist with your ritual today?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { products } = useStore();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      // Contextual information about our products to help the AI answer
      const productContext = products.map(p => 
        `Product: ${p.name}, Category: ${p.category}, Price: $${p.price}, Benefits: ${p.benefits.join(', ')}`
      ).join('\n');

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })).concat([{ role: 'user', parts: [{ text: userMessage }] }]),
        config: {
          systemInstruction: `You are the Lumière Concierge, a luxury beauty expert for Lumière Beauty. 
          Your tone is sophisticated, elegant, and helpful. 
          You provide expert advice on skincare routines, beauty tools, and product recommendations.
          Refer to the following product catalog when making suggestions:
          ${productContext}
          Always encourage a sense of self-care and luxury rituals. If asked about shipping or support, tell them our specialists handle everything with the utmost care (12-14 days shipping).`,
          temperature: 0.7,
        },
      });

      const aiText = response.text || "I apologize, I am momentarily unavailable to assist. Please try again shortly.";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm having a bit of trouble connecting to my beauty database. Please forgive me." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 md:w-96 h-[500px] bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden border luxury-border animate-fade-in">
          {/* Header */}
          <div className="bg-rose-gold p-6 text-white flex justify-between items-center">
            <div>
              <h3 className="serif text-xl">Lumière Concierge</h3>
              <p className="text-[10px] uppercase tracking-widest opacity-80">Personal Beauty Advisor</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#fffafb]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-black text-white rounded-t-xl rounded-bl-xl shadow-sm' 
                    : 'bg-white text-gray-700 rounded-t-xl rounded-br-xl luxury-shadow border luxury-border font-light'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-t-xl rounded-br-xl border luxury-border luxury-shadow flex space-x-1 items-center h-10">
                  <div className="w-1.5 h-1.5 bg-rose-gold rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-rose-gold rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-rose-gold rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 bg-white border-t luxury-border flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="How can I help you glow?"
              className="flex-1 bg-gray-50 border luxury-border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-rose-gold transition-all"
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-rose-gold text-white p-2 rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9-7-9-7V9l-9 7 9 7v-5z" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-rose-gold transition-all duration-300 transform hover:scale-110 active:scale-95 group"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        ) : (
          <div className="relative">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-gold"></span>
            </span>
          </div>
        )}
      </button>
    </div>
  );
};

export default ChatBot;
