//src/components/ItemDetailContainer/ItemDetailContainer.jsx  
import { useState, useContext } from "react";
import Swal from "sweetalert2"; // Asegúrate de tener SweetAlert2 instalado
import { Box, Text, Button, Heading, VStack, Stack } from '@chakra-ui/react';
import { CartContext } from '../context/CartContext'; // Asegúrate de usar el CartContext correcto
import productosData from '../data/productos.json';

export default function ItemDetail() {
  const { itemId } = useParams();
  const { addItem } = useContext(CartContext);
  const [count, setCount] = useState(1);  // Estado para manejar la cantidad

  const producto = productosData.find((p) => p.id === itemId);

  // Aumentar cantidad
  const handleIncrement = () => {
    if (count < producto.stock) {
      setCount(count + 1);
    }
  };

  // Disminuir cantidad
  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  // Agregar al carrito y mostrar SweetAlert
  const handleAddToCart = () => {
    if (producto) {
      addItem({
        id: producto.id,
        nombre: producto.nombre,
        price: producto.precio,
        imagen: producto.imagen,
        qty: count  // Agregar con la cantidad seleccionada
      });
      // Mostrar SweetAlert
      Swal.fire({
        title: 'Producto agregado con éxito',
        text: `Has agregado ${count} ${producto.nombre} al carrito.`,
        icon: 'success',
        confirmButtonText: 'Continuar',
        timer: 1500
      });
    }
  };

  if (!producto) {
    return <Text>Producto no encontrado</Text>;
  }

  return (
    <Box p={6} maxW="900px" mx="auto" bg="white" borderRadius="md" boxShadow="lg" mt={10}>
      <Stack direction={{ base: 'column', md: 'row' }} spacing={10}>
        <Image
          src={producto.imagen}
          alt={producto.nombre}
          borderRadius="md"
          objectFit="cover"
          boxSize={{ base: '100%', md: '400px' }}
          boxShadow="md"
        />
        <VStack align="start" spacing={4}>
          <Heading as="h2" size="xl" textAlign="center" color="gray.700">
            {producto.nombre}
          </Heading>
          <Text fontSize="2xl" fontWeight="bold" color="pink.600">
            ${producto.precio}
          </Text>
          <Text fontSize="md" color="gray.600">
            {producto.descripcion}
          </Text>

          {/* Control de cantidad */}
          <HStack mt={4}>
            <Button onClick={handleDecrement} disabled={count <= 1}>
              -
            </Button>
            <Text fontSize="lg">{count}</Text>
            <Button onClick={handleIncrement} disabled={count >= producto.stock}>
              +
            </Button>
          </HStack>

          {/* Botón para agregar al carrito */}
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
