// src/hooks/useProductById.jsx
import { useState, useEffect } from "react";
import productosData from "../data/productos.json";

export const useProductById = (id) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const foundProduct = productosData.find((producto) => producto.id === id);

    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      setError(true);
    }
    setLoading(false);
  }, [id]);

  return { product, loading, error };
};
