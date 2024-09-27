//src/components/ItemDetail.jsx
import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Image, Text, Button, Heading, VStack, Stack } from '@chakra-ui/react';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import { CartContext } from '../context/CartContext'; 
import productosData from '../data/productos.json';

export default function ItemDetail() {
  const { itemId } = useParams();
  const { addItem } = useContext(CartContext); 
  const [qty, setQty] = useState(1); 

  const product = productosData.find((p) => p.id === itemId);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        nombre: product.nombre,
        price: product.precio || 0, 
        imagen: product.imagen,
        qty,
      });

      // SweetAlert: Confirmación de que se agregó el producto
      Swal.fire({
        title: 'Producto agregado',
        text: `${product.nombre} ha sido agregado al carrito.`,
        imageUrl: product.imagen,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: product.nombre,
        icon: 'success',
        timer: 2000, // Desaparece automáticamente después de 2 segundos
        showConfirmButton: false,
      });
    }
  };

  if (!product) {
    return <Text>Producto no encontrado</Text>;
  }

  return (
    <Box p={6} maxW="900px" mx="auto" bg="white" borderRadius="md" boxShadow="lg" mt={10}>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={10}>
        <Image
          src={product.imagen}
          alt={product.nombre}
          borderRadius="md"
          objectFit="cover"
          boxSize={{ base: '100%', md: '400px' }} 
          boxShadow="md"
        />
        <VStack align="start" spacing={4}>
          <Heading as="h2" size="xl" textAlign="center" color="gray.700">
            {product.nombre}
          </Heading>
          <Text fontSize="2xl" fontWeight="bold" color="pink.600">
            ${product.precio}
          </Text>
          <Text fontSize="md" color="gray.600">
            {product.descripcion}
          </Text>
          <Button
            onClick={handleAddToCart}
            colorScheme="pink"
            size="lg"
            w="full"
            mt={4}
            _hover={{ bg: "pink.700" }}
          >
            Agregar al carrito
          </Button>
        </VStack>
      </Stack>
    </Box>
  );
}
