//src/components/Checkout/Checkout.jsx
import { useContext } from "react";
import { Box, Text, Button, VStack, HStack, Spacer, Heading, useToast } from "@chakra-ui/react";
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext"; // Importa el contexto de autenticación

export const Checkout = () => {
  const { cartState } = useContext(CartContext);
  const { currentUser } = useAuth(); // Cambiado a currentUser
  const toast = useToast();

  // Calcular el total del carrito
  const total = cartState.reduce((acc, item) => acc + (item.price ?? 0) * (item.qty ?? 1), 0);

  // Función para generar el mensaje para WhatsApp
  const generarMensajeWhatsApp = () => {
    let mensaje = "Detalles de mi compra:\n\n";
    cartState.forEach((item) => {
      mensaje += `${item.nombre} (x${item.qty}): $${(item.price * item.qty).toFixed(2)}\n`;
    });
    mensaje += `\nTotal: $${total.toFixed(2)}`;
    return encodeURIComponent(mensaje); // Codificar el mensaje para URL
  };

  // Función para manejar el clic en Checkout
  const handleCheckout = () => {
    if (cartState.length === 0) {
      toast({
        title: "Tu carrito está vacío.",
        description: "Agrega productos antes de realizar la compra.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!currentUser) { // Cambiado a currentUser
      toast({
        title: "Debes iniciar sesión para continuar.",
        description: "Por favor, inicia sesión para realizar tu compra.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const numeroWhatsApp = "5491165726162"; // Número de WhatsApp en formato internacional
    const mensaje = generarMensajeWhatsApp();
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;

    // Abrir WhatsApp con el mensaje predefinido
    window.open(url, "_blank");
  };

  return (
    <Box p={6} maxW="800px" mx="auto">
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Detalles del Carrito
      </Heading>

      {cartState.length === 0 ? (
        <Text>Tu carrito está vacío.</Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {cartState.map((item) => (
            <HStack key={item.id} p={4} borderWidth="1px" borderRadius="md" boxShadow="sm">
              <Text>{item.nombre} (x{item.qty})</Text>
              <Spacer />
              <Text fontWeight="bold">${(item.price * item.qty).toFixed(2)}</Text>
            </HStack>
          ))}
          <Spacer />
          <HStack>
            <Text fontSize="2xl" fontWeight="bold">
              Total: ${total.toFixed(2)}
            </Text>
          </HStack>

          {/* Mostrar mensaje para iniciar sesión si no está autenticado */}
          {!currentUser ? (
            <Text color="red.500" mt={4}>
              Por favor, inicia sesión para realizar la compra.
            </Text>
          ) : (
            <Button colorScheme="pink" onClick={handleCheckout} mt={4}>
              Enviar Pedido por WhatsApp
            </Button>
          )}
        </VStack>
      )}
    </Box>
  );
};
