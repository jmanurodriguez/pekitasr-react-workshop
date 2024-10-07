import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { PromoModal } from './components/PromoModal/PromoModal'; 

import { MainRoutes } from './routes/MainRoutes'; 
import { createProductsFirestore } from './services/products.service';
import productosData from './data/productos.json';  

export function App() {

  useEffect(() => {

    createProductsFirestore('products', productosData);
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <PromoModal />
        <Navbar />
        <MainRoutes /> 
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
}

