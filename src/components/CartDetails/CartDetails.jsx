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
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { DeleteIcon, AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import Swal from 'sweetalert2';

export const CartDetails = () => {
  const { cartState, addItem, removeItem, deleteItem } = useContext(CartContext);
  const navigate = useNavigate();
  const total = cartState.reduce((acc, item) => acc + (item.price ?? 0) * (item.qty ?? 1), 0);
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
    navigate('/checkout');
  };

  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });
  const textColor = useColorModeValue("gray.800", "white");
  const bgColor = useColorModeValue("white", "gray.800");
  const highlightColor = useColorModeValue("pink.500", "pink.300");
  const mutedTextColor = useColorModeValue("gray.600", "gray.400");

  return (
    <Box p={6} maxW="1200px" mx="auto">
      <Heading 
        as="h2" 
        size="lg" 
        mb={6} 
        textAlign="center" 
        color={highlightColor} 
        fontFamily="'Roboto', sans-serif"
      >
        Detalles del Carrito
      </Heading>

      {cartState.length === 0 ? (
        <Alert status="info" borderRadius="md">
          <AlertIcon />
          Tu carrito está vacío.
        </Alert>
      ) : (
        <VStack spacing={4} align="stretch" bg={bgColor} p={4} borderRadius="lg" boxShadow="md">
          {cartState.map((item) => (
            <Flex
              key={item.id}
              p={4}
              borderWidth="1px"
              borderRadius="md"
              alignItems="center"
              boxShadow="sm"
              direction={{ base: "column", md: "row" }}
              textAlign={{ base: "center", md: "left" }}
            >
              <Image
                src={item.imagen}
                alt={item.nombre}
                boxSize={{ base: "150px", md: "100px" }}
                objectFit="cover"
                borderRadius="md"
                mb={{ base: 4, md: 0 }}
              />

              <Box flex="1">
                <Text fontSize="lg" fontWeight="bold" color={highlightColor}>  
                  {item.nombre}
                </Text>
                <HStack spacing={4} mt={2} justify={{ base: "center", md: "flex-start" }}>
                  <Text fontSize="sm" color={mutedTextColor}>Precio: ${item.price?.toFixed(2) ?? '0.00'}</Text>
                  <HStack>
                    <IconButton
                      aria-label="Disminuir cantidad"
                      icon={<MinusIcon />}
                      size={buttonSize}
                      onClick={() => removeItem(item)}
                      isDisabled={item.qty === 1}
                    />
                    <Text fontSize="md" color={textColor}>{item.qty}</Text>
                    <IconButton
                      aria-label="Aumentar cantidad"
                      icon={<AddIcon />}
                      size={buttonSize}
                      onClick={() => addItem(item)}
                    />
                  </HStack>
                </HStack>
              </Box>

              <Spacer />

              <HStack justify={{ base: "center", md: "flex-end" }} mt={{ base: 4, md: 0 }}>
                <Text fontWeight="bold" color={highlightColor}>
                  Subtotal: ${(item.price * item.qty).toFixed(2)}
                </Text>
                <IconButton
                  aria-label="Eliminar producto"
                  icon={<DeleteIcon />}
                  colorScheme="red"
                  variant="outline"
                  size={buttonSize}
                  onClick={() => handleDeleteItem(item)}
                />
              </HStack>
            </Flex>
          ))}

          <Divider />

          <Flex alignItems="center" direction={{ base: "column", md: "row" }} textAlign="center">
            <Text fontSize="2xl" fontWeight="bold" color={highlightColor}>
              Total: ${total.toFixed(2)} ({totalQty} productos)
            </Text>
            <Spacer />
            <Button colorScheme="pink" onClick={handleCheckout} size={buttonSize} mt={{ base: 4, md: 0 }}>
              Ir al Checkout
            </Button>
          </Flex>
        </VStack>
      )}
    </Box>
  );
};
