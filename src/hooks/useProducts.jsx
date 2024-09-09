import { useState, useEffect } from "react";
import productosData from "../data/productos.json";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Nueva variable para manejar errores

  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      // Simulación de la obtención de todos los productos
      setProducts(productosData);
    } catch (err) {
      setError('Error al cargar los productos');
    } finally {
      setLoading(false);
    }
  }, []);

  // El return debe estar dentro de la función useProducts
  return { products, loading, error };
};
