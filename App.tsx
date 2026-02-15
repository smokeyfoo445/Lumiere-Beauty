
import React, { useEffect, useState } from 'react';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import CartDrawer from './components/CartDrawer.tsx';
import ChatBot from './components/ChatBot.tsx';
import Home from './pages/Home.tsx';
import ProductPage from './pages/ProductPage.tsx';
import Admin from './pages/Admin.tsx';
import Quiz from './pages/Quiz.tsx';

const App: React.FC = () => {
  const [currentHash, setCurrentHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    const path = currentHash.replace('#', '') || '/';
    
    if (path === '/') return <Home />;
    if (path.startsWith('/product/')) return <ProductPage />;
    if (path === '/admin') return <Admin />;
    if (path === '/quiz') return <Quiz />;
    
    return <Home />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fffafb]">
      <Header />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
      <CartDrawer />
      <ChatBot />
    </div>
  );
};

export default App;
