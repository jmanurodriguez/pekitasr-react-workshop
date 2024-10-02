import { useState, useEffect } from "react";
import productosData from "../data/productos.json";

export const useProductsByCategory = (categoryId) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (categoryId) {
      const filteredProducts = productosData.filter((producto) =>
        producto.categorias.includes(categoryId)
      );
      setProducts(filteredProducts);
    } else {
      setProducts([]);
    }
  }, [categoryId]);

  return { products };
};
