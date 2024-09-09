// src/pages/Item.jsx (o donde estés usando ItemDetailContainer)
import { useParams } from "react-router-dom";
import { useProductById } from "../hooks/useProductById";
import { ItemDetailContainer } from "../components";

export const Item = () => {
  const { id } = useParams();
  const { product, loading } = useProductById(id);

  if (loading) {
    return <div>Cargando producto...</div>;
  }

  return <ItemDetailContainer producto={product} />;
};
