// src/components/ItemDetailContainer/ItemDetailContainer.jsx
import { Box, Heading, Image, Text, Button, Center, VStack } from "@chakra-ui/react";

export function ItemDetailContainer({ producto }) {
  return (
    <Center py={10}>
      <VStack boxShadow="lg" p={5} maxW="lg" spacing={5}>
       
        <Image 
          src={producto.imagen} 
          alt={producto.nombre} 
          borderRadius="md" 
          boxSize={{ base: "200px", md: "300px" }} 
          objectFit="cover" 
        />
        <Heading as="h1">{producto.nombre}</Heading>
        <Text fontSize="xl" color="gray.500">${producto.precio}</Text>
        <Text>{producto.descripcion}</Text>
        <Button colorScheme="teal" size="lg">Agregar al carrito</Button>
      </VStack>
    </Center>
  );
}
