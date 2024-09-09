// src/hooks/useProductsByCategory.jsx
import { useState, useEffect } from "react";
import productosData from "../data/productos.json";

export const useProductsByCategory = (categoryId) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (categoryId) {
      // Filtramos los productos por categoría
      const filteredProducts = productosData.filter((producto) =>
        producto.categorias.includes(categoryId)
      );
      setProducts(filteredProducts);
    } else {
      // Si no hay categoría, devolvemos todos los productos
      setProducts(productosData);
    }
  }, [categoryId]);

  return { products };
};
