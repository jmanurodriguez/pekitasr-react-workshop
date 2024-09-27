//src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './pages/Home';
import { Category } from './pages/Category';
import ItemDetail from './pages/ItemDetail';
import { CartDetails } from './components/CartDetails';
import Footer from './components/Footer/Footer';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';  // Asegúrate de envolver la app
import { PromoModal } from './components/PromoModal/PromoModal'; 
import { Contact } from "./pages/Contact";
import { Checkout } from './components/Checkout/Checkout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';  // Agregar la página de registro

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
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
  );
}
