
import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { Category } from '../types';

const Quiz: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<any>({});
  const { products, setQuizResult } = useStore();
  const [results, setResults] = useState<any>(null);

  const questions = [
    {
      id: 'skinType',
      question: "How would you describe your skin's afternoon personality?",
      options: [
        { label: "Dry & Tight", value: 'dry' },
        { label: "Shiny in the T-Zone", value: 'combination' },
        { label: "Consistently Oily", value: 'oily' },
        { label: "Balanced & Calm", value: 'normal' }
      ]
    },
    {
      id: 'concern',
      question: "What is your primary skin goal right now?",
      options: [
        { label: "Banish Breakouts", value: 'acne' },
        { label: "Reverse Time & Fine Lines", value: 'aging' },
        { label: "Brighten Dullness", value: 'glow' },
        { label: "Deep Clean & Detox", value: 'cleaning' }
      ]
    }
  ];

  const handleNext = (value: string) => {
    const newAnswers = { ...answers, [questions[step].id]: value };
    setAnswers(newAnswers);
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate results
      setQuizResult({
        skinType: newAnswers.skinType,
        concerns: [newAnswers.concern]
      });
      
      // Basic recommendation logic
      const recommended = products.filter(p => {
        if (newAnswers.concern === 'aging' && p.id === 'ali-1') return true;
        if (newAnswers.concern === 'cleaning' && p.id === 'ali-2') return true;
        return p.category === Category.TOOLS;
      });
      
      setResults(recommended);
      setStep(step + 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      {step < questions.length ? (
        <div className="space-y-12 animate-fade-in">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-rose-gold">Step {step + 1} of {questions.length}</p>
            <h2 className="text-4xl md:text-5xl serif leading-tight">{questions[step].question}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {questions[step].options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleNext(opt.value)}
                className="p-8 border-2 luxury-border hover:border-rose-gold transition-all bg-white hover:bg-rose-50/30 text-lg serif group"
              >
                <span className="group-hover:text-rose-gold transition-colors">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-12 animate-fade-in">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl serif">Your Custom Ritual</h2>
            <p className="text-gray-500 max-w-lg mx-auto">Based on your skin's needs, we've curated a routine to help you achieve that Lumière glow.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {results?.map((p: any) => (
              <div key={p.id} className="bg-white p-8 luxury-border border text-left flex flex-col justify-between">
                <div>
                  <img src={p.images[0]} className="w-full aspect-video object-cover mb-6" />
                  <h4 className="text-xs uppercase tracking-widest text-rose-gold mb-2">Recommended for you</h4>
                  <h3 className="text-2xl serif mb-4">{p.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-3">{p.description}</p>
                </div>
                <a 
                  href={`#/product/${p.id}`} 
                  className="mt-8 block text-center py-4 bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-rose-gold transition-colors"
                >
                  View My Match
                </a>
              </div>
            ))}
          </div>
          
          <button onClick={() => setStep(0)} className="text-gray-400 hover:text-black text-xs uppercase tracking-widest font-bold">
            Start Over
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
