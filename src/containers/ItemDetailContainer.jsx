// src/containers/ItemDetailContainer.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Image, Text } from '@chakra-ui/react';
import productosData from '../data/productos.json';

export function ItemDetailContainer() {
  const { itemId } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const item = productosData.find(producto => producto.id === itemId);
    setProducto(item);
  }, [itemId]);

  return (
    producto ? (
      <Box p={4}>
        <Heading as="h1" mb={4}>{producto.nombre}</Heading>
        <Image src={producto.imagen} alt={producto.nombre} />
        <Text mt={4} fontSize="xl">${producto.precio}</Text>
        <Text mt={4}>{producto.descripcion}</Text>
      </Box>
    ) : (
      <Text>Producto no encontrado</Text>
    )
  );
}
