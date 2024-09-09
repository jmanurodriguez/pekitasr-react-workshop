// src/pages/Home.jsx
import { ItemListContainer } from "../components"; // Importamos desde components
import { useProducts } from "../hooks/useProducts"; // Hook adaptado

export const Home = () => {
  const { products, loading } = useProducts();

  if (loading) {
    return <div>Cargando productos...</div>; // Mostrar un mensaje de carga
  }

  return <ItemListContainer productos={products} />; // Usamos productos
};
