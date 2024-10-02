import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading } from '@chakra-ui/react';
import { ItemListContainer } from '../components';
import productosData from '../data/productos.json';

export function ItemListContainer() {
  const { categoryId } = useParams();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    if (categoryId) {
      const productosFiltrados = productosData.filter(producto =>
        producto.categorias.includes(categoryId)
      );
      setProductos(productosFiltrados);
    } else {
      setProductos(productosData);
    }
  }, [categoryId]);

  return (
    <Box p={4}>
      <Heading as="h1" mb={4}>
        {categoryId ? `Categoría: ${categoryId}` : 'Catálogo de Productos'}
      </Heading>
      <ItemListContainer productos={productos} />
    </Box>
  );
}
