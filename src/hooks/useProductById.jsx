//src/hooks/useProductById.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { Box, Image, Text, Button, Heading, VStack, Stack } from "@chakra-ui/react";
import { useProductById } from "../hooks/useProductById"; // Asegúrate de usar el hook correcto

const ItemDetail = () => {
  const { itemId } = useParams();
  const { product, loading } = useProductById(itemId);

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  if (!product) {
    return <Text>Producto no encontrado</Text>;
  }

  return (
    <Box p={6} maxW="900px" mx="auto" bg="white" borderRadius="md" boxShadow="lg" mt={10}>
      <Stack direction={{ base: "column", md: "row" }} spacing={10}>
        <Image
          src={product.imagen}
          alt={product.nombre}
          borderRadius="md"
          objectFit="cover"
          boxSize={{ base: "100%", md: "400px" }}
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
          <Button colorScheme="pink" size="lg" w="full" mt={4} _hover={{ bg: "pink.700" }}>
            Agregar al carrito
          </Button>
        </VStack>
      </Stack>
    </Box>
  );
};

export default ItemDetail;
