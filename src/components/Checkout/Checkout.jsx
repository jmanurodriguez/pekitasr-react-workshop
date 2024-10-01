// src/components/Checkout/Checkout.jsx
import { useContext } from "react";
import { Box, Text, Button, VStack, HStack, Spacer, Heading, useToast, Stack, Container, SimpleGrid, Divider } from "@chakra-ui/react";
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext"; // Importa el contexto de autenticación

export const Checkout = () => {
  const { cartState } = useContext(CartContext);
  const { currentUser } = useAuth();
  const toast = useToast();

  // Calcular el total del carrito
  const total = cartState.reduce((acc, item) => acc + (item.price ?? 0) * (item.qty ?? 1), 0);

  // Función para generar el mensaje para WhatsApp
  const generarMensajeWhatsApp = () => {
    let mensaje = "Gracias por visitar Pekitas Ecotienda.\nEn breve atenderemos tu solicitud!!!\n\nDetalles de mi compra:\n\n";
    cartState.forEach((item) => {
      mensaje += `${item.nombre} (x${item.qty}): $${(item.price * item.qty).toFixed(2)}\n`;
    });
    mensaje += `\nTotal: $${total.toFixed(2)}`;
    return encodeURIComponent(mensaje); 
  };

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

    if (!currentUser) { 
      toast({
        title: "Debes iniciar sesión para continuar.",
        description: "Por favor, inicia sesión para realizar tu compra.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const numeroWhatsApp = "5491165726162"; 
    const mensaje = generarMensajeWhatsApp();
    const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;

    window.open(url, "_blank");
  };

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Container maxW="container.lg" py={10} flex="1">
        <Stack spacing={6}>
          <Heading as="h2" size="xl" textAlign="center" color="pink.500">
            Resumen de tu Pedido
          </Heading>

          {cartState.length === 0 ? (
            <Text fontSize="lg" color="gray.600" textAlign="center">
              Tu carrito está vacío.
            </Text>
          ) : (
            <>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {cartState.map((item) => (
                  <Box
                    key={item.id}
                    borderWidth="1px"
                    borderRadius="md"
                    boxShadow="lg"
                    p={4}
                    bg="white"
                  >
                    <HStack justifyContent="space-between">
                      <Text fontSize="lg" fontWeight="bold" color="pink.600">
                        {item.nombre} (x{item.qty})
                      </Text>
                      <Text fontSize="lg" color="gray.600">
                        ${(item.price * item.qty).toFixed(2)}
                      </Text>
                    </HStack>
                  </Box>
                ))}
              </SimpleGrid>

              <Divider />

              <HStack justifyContent="space-between" py={4}>
                <Text fontSize="2xl" fontWeight="bold" color="gray.700">
                  Total:
                </Text>
                <Text fontSize="2xl" fontWeight="bold" color="pink.600">
                  ${total.toFixed(2)}
                </Text>
              </HStack>

              {!currentUser ? (
                <Text color="red.500" fontSize="lg" textAlign="center">
                  Por favor, inicia sesión para realizar la compra.
                </Text>
              ) : (
                <Button
                  size="lg"
                  colorScheme="pink"
                  w="full"
                  onClick={handleCheckout}
                  _hover={{ bg: "pink.600" }}
                >
                  Enviar Pedido por WhatsApp
                </Button>
              )}
            </>
          )}
        </Stack>
      </Container>
    </Box>
  );
};
