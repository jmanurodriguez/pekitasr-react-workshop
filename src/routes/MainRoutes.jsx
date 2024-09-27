//src/routes/MainRoutes.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Category } from '../pages/Category';
import ItemDetail from '../pages/ItemDetail';
import { CartDetails } from '../components/CartDetails';
import { Checkout } from '../pages/Checkout';  // Importa el componente de Checkout

export const MainRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryId" element={<Category />} />
        <Route path="/item/:itemId" element={<ItemDetail />} />
        <Route path="/cart" element={<CartDetails />} />
        <Route path="/checkout" element={<Checkout />} /> {/* Nueva ruta para el Checkout */}
      </Routes>
    </Router>
  );
};
