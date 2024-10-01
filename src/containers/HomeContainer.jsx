import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { HomeUI } from '../components/HomeUI';
import { createProductsFirestore } from '../services/products.service';  
import productosData from '../data/productos.json';  

export const HomeContainer = () => {
  const { products, loading, error } = useProducts();
  const location = useLocation();

  
  useEffect(() => {
    const cargarProductos = async () => {
      try {
        await createProductsFirestore('products', productosData);  
        
      } catch (error) {
        console.error('Error al cargar productos:', error);
      }
    };

    cargarProductos();  
  }, []); 

  useEffect(() => {
    const handleScroll = () => {
      if (location.hash) {
        const id = location.hash.replace('#', ''); 
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    handleScroll(); 
  }, [location]);

  return (
    <HomeUI products={products} loading={loading} error={error} />
  );
};
