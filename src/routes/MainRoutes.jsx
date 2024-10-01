import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Home } from '../pages/Home';
import { Category } from '../pages/Category';
import ItemDetail from '../pages/ItemDetail';
import { CartDetails } from '../components/CartDetails';
import { Checkout } from '../components/Checkout/Checkout';
import { Contact } from '../pages/Contact';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { UpcomingProducts } from '../pages/UpcomingProducts'; // Importamos la nueva página

export const MainRoutes = () => {
  const { currentUser } = useAuth(); // Obtén el usuario actual del contexto

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:categoryId" element={<Category />} />
      <Route 
        path="/item/:itemId" 
        element={currentUser ? <ItemDetail /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/cart" 
        element={currentUser ? <CartDetails /> : <Navigate to="/login" />} 
      />
      <Route 
        path="/checkout" 
        element={currentUser ? <Checkout /> : <Navigate to="/login" />} 
      />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/upcoming-products" element={<UpcomingProducts />} /> {/* Añadir nueva ruta */}
    </Routes>
  );
};
