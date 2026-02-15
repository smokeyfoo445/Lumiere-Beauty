
import { useState, useEffect } from 'react';

export const useParams = () => {
  const [params, setParams] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const parts = hash.split('/');
      
      if (parts[1] === 'product' && parts[2]) {
        setParams({ id: parts[2] });
      } else {
        setParams({});
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return params;
};
