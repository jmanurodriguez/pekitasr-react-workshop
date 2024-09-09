import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components';
import { ItemListContainer, ItemDetailContainer } from './components';
import { useProducts } from './hooks/useProducts'; // Importar el hook

export function App() {
  const { products } = useProducts(); // Obtener los productos

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ItemListContainer productos={products} />} /> 
        <Route path="/category/:categoryId" element={<ItemListContainer productos={products} />} />
        <Route path="/item/:itemId" element={<ItemDetailContainer />} />
      </Routes>
    </Router>
  );
}
