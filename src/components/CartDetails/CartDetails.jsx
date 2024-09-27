//src/components/CartDetails/CartDetails.jsx
import { useContext } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  Heading,
  Divider,
  VStack,
  HStack,
  Spacer,
  Alert,
  AlertIcon,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon, AddIcon, MinusIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import Swal from 'sweetalert2'; // Importar SweetAlert

export const CartDetails = () => {
  const { cartState, addItem, removeItem, deleteItem } = useContext(CartContext);
  const navigate = useNavigate(); // Para redirigir al checkout

  // Calcular el total del carrito
  const total = cartState.reduce((acc, item) => acc + (item.price ?? 0) * (item.qty ?? 1), 0);

  // Calcular la cantidad total de productos
  const totalQty = cartState.reduce((acc, item) => acc + (item.qty ?? 0), 0);

  const handleDeleteItem = (item) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar ${item.nombre} del carrito?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem(item);
        Swal.fire(
          'Eliminado',
          `${item.nombre} ha sido eliminado del carrito.`,
          'success'
        );
      }
    });
  };

  const handleCheckout = () => {
    navigate('/checkout'); // Redirigir al checkout
  };

  return (
    <Box p={6} maxW="800px" mx="auto">
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Detalles del Carrito
      </Heading>

      {cartState.length === 0 ? (
        <Alert status="info" borderRadius="md">
          <AlertIcon />
          Tu carrito está vacío.
        </Alert>
      ) : (
        <VStack spacing={4} align="stretch">
          {cartState.map((item) => (
            <Flex
              key={item.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              alignItems="center"
              boxShadow="sm"
            >
              <Image
                src={item.imagen}
                alt={item.nombre}
                boxSize="100px"
                objectFit="cover"
                borderRadius="md"
                mr={4}
              />
              <Box flex="1">
                <Text fontSize="xl" fontWeight="bold">
                  {item.nombre}
                </Text>
                <HStack spacing={4} mt={2}>
                  <Text>Precio: ${item.price?.toFixed(2) ?? '0.00'}</Text>
                  <HStack>
                    <IconButton
                      aria-label="Disminuir cantidad"
                      icon={<MinusIcon />}
                      size="sm"
                      onClick={() => removeItem(item)}
                      isDisabled={item.qty === 1}
                    />
                    <Text>{item.qty}</Text>
                    <IconButton
                      aria-label="Aumentar cantidad"
                      icon={<AddIcon />}
                      size="sm"
                      onClick={() => addItem(item)}
                    />
                  </HStack>
                </HStack>
              </Box>
              <Spacer />
              <HStack>
                <Text fontWeight="bold">
                  Subtotal: ${(item.price * item.qty).toFixed(2)}
                </Text>
                <IconButton
                  aria-label="Eliminar producto"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  variant="outline"
                  onClick={() => handleDeleteItem(item)}
                />
              </HStack>
            </Flex>
          ))}
          <Divider />
          <Flex alignItems="center">
            <Text fontSize="2xl" fontWeight="bold">
              Total: ${total.toFixed(2)} ({totalQty} productos)
            </Text>
            <Spacer />
            <Button colorScheme="pink" onClick={handleCheckout}>
              Ir al Checkout
            </Button>
          </Flex>
        </VStack>
      )}
    </Box>
  );
};
