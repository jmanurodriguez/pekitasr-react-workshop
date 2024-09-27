import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './pages/Home';
import { Category } from './pages/Category';
import ItemDetail from './pages/ItemDetail';
import { CartDetails } from './components/CartDetails';
import Footer from './components/Footer/Footer';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext'; 
import { PromoModal } from './components/PromoModal/PromoModal'; 
import { Contact } from "./pages/Contact";
import { Checkout } from './components/Checkout/Checkout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';  
import { SimpleCookiePreference } from "./components/SimpleCookiePreference";
import { ChakraProvider } from '@chakra-ui/react';

export function App() {
  const handleCookieAccept = () => {
    console.log('Cookies aceptadas');
    // Aquí puedes habilitar funcionalidades que dependen de cookies
  };

  const handleCookieCancel = () => {
    console.log('Cookies rechazadas');
    // Aquí puedes deshabilitar funcionalidades que dependen de cookies
  };

  return (
    <ChakraProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <SimpleCookiePreference 
              onAccept={handleCookieAccept}
              onCancel={handleCookieCancel}
            />
            <PromoModal />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:categoryId" element={<Category />} />
              <Route path="/item/:itemId" element={<ItemDetail />} />
              <Route path="/cart" element={<CartDetails />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
            <Footer />
          </Router>
        </CartProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
