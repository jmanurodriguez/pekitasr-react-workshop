// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import { Home } from './pages/Home';
import { Category } from './pages/Category';
import ItemDetail from './pages/Item';
import Footer from './components/Footer/Footer'; // Importa el Footer

export function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryId" element={<Category />} />
        <Route path="/item/:itemId" element={<ItemDetail />} />
      </Routes>
      <Footer /> {/* Agrega el footer aquí */}
    </Router>
  );
}
