import React from 'react';
import { Navbar } from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { PromoModal } from './components/PromoModal/PromoModal'; 
import { MainRoutes } from './routes/MainRoutes'; // 

export function App() {
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
