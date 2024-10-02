import { useParams } from "react-router-dom";
import { ItemListContainer } from "../components";
import { useProductsByCategory } from "../hooks/useProductsByCategory";

export const Category = () => {
  const { categoryId } = useParams();
  const { products } = useProductsByCategory(categoryId); 


  return (
    <>
      {products.length > 0 ? (
        <ItemListContainer productos={products} />
      ) : (
        <div>No hay productos en esta categoría</div>
      )}
    </>
  );
};
