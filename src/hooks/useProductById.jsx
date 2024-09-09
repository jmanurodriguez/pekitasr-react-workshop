// src/hooks/useProductById.jsx
import { useState, useEffect } from "react";
import productosData from "../data/productos.json";

export const useProductById = (id) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulamos la obtención del producto por ID
    const foundProduct = productosData.find((producto) => producto.id === id);

    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      console.error(`Producto con ID ${id} no encontrado`);
    }

    setLoading(false);
  }, [id]);

  return { product, loading };
};
