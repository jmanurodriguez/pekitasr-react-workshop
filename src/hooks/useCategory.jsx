// src/hooks/useCategory.jsx
import { useState, useEffect } from "react";
import productosData from "../data/productos.json";

export const useCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Extraer categorías de los productos
    const categoriasUnicas = [
      ...new Set(productosData.flatMap((producto) => producto.categorias)),
    ];
    setCategories(categoriasUnicas);
  }, []);

  return { categories };
};
