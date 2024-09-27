// src/containers/HomeContainer.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { HomeUI } from '../components/HomeUI';

export const HomeContainer = () => {
  const { products, loading, error } = useProducts();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (location.hash) {
        const id = location.hash.replace('#', ''); // Elimina el símbolo '#'
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    handleScroll(); // Llamar la función al montarse el componente
  }, [location]);

  return (
    <HomeUI products={products} loading={loading} error={error} />
  );
};
