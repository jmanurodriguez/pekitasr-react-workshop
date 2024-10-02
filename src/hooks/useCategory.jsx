import { useState, useEffect } from "react";
import productosData from "../data/productos.json"; 

export const useCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const uniqueCategories = [
      ...new Set(productosData.flatMap((producto) => producto.categorias)),
    ];
    setCategories(uniqueCategories);
  }, []);

  return { categories };
};
