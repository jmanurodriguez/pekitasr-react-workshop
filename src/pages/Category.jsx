// src/pages/Category.jsx
import { useParams } from "react-router-dom"; // Aseguramos que venga de react-router-dom
import { ItemListContainer } from "../components"; // Importamos desde components
import { useProductsByCategory } from "../hooks/useProductsByCategory"; // Hook adaptado

export const Category = () => {
  const { categoryId } = useParams();

  const { products } = useProductsByCategory(categoryId);

  return <ItemListContainer productos={products} />; // Usamos productos
};
