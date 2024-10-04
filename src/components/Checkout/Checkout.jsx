import { useContext, useState, useEffect } from "react";
import { Box, Text, Button, VStack, HStack, Spacer, Heading, useToast, Stack, Container, SimpleGrid, Divider, Input } from "@chakra-ui/react";
import { CartContext } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext"; 
import { db } from "../../firebase"; 
import { doc, getDoc, setDoc } from "firebase/firestore";

export const Checkout = () => {
  const { cartState } = useContext(CartContext);
  const { currentUser } = useAuth();
  const toast = useToast();
  const [promoCode, setPromoCode] = useState("");
  const [appliedCodes, setAppliedCodes] = useState([]);
  const [totalDiscount, setTotalDiscount] = useState(0);

  const validPromoCodes = {
    "pekitas0410": 10,
    "webpekitas": 20,
  };


  useEffect(() => {
    console.log("Current user:", currentUser);
    console.log("Applied codes:", appliedCodes);
    console.log("Total discount:", totalDiscount);
  }, [currentUser, appliedCodes, totalDiscount]);

  const handleApplyPromo = async () => {
    

    if (!currentUser) {
      console.log("Usuario no autenticado");
      toast({
        title: "Debes iniciar sesión para aplicar un código promocional.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (appliedCodes.length >= 2) {
      
      toast({
        title: "Solo puedes aplicar hasta dos códigos promocionales.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (appliedCodes.includes(promoCode)) {
      
      toast({
        title: "Ya has aplicado este código promocional.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (validPromoCodes[promoCode]) {
      
      const newDiscount = validPromoCodes[promoCode];
      setTotalDiscount(prevDiscount => prevDiscount + newDiscount);
      setAppliedCodes(prevCodes => [...prevCodes, promoCode]);
      toast({
        title: `Código promocional aplicado. Descuento del ${newDiscount}%.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setPromoCode(""); 
    } else {
      
      toast({
        title: "Código promocional inválido.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const total = cartState.reduce((acc, item) => acc + (item.price ?? 0) * (item.qty ?? 1), 0);
  const totalWithDiscount = total - (total * (totalDiscount / 100)); 

  const generarMensajeWhatsApp = () => {
    let mensaje = "Gracias por visitar Pekitas Ecotienda.\nEn breve atenderemos tu solicitud!!!\n\nDetalles de mi compra:\n\n";
    cartState.forEach((item) => {
      mensaje += `${item.nombre} (x${item.qty}): $${(item.price * item.qty).toFixed(2)}\n`;
    });
    mensaje += `\nTotal: $${totalWithDiscount.toFixed(2)}`;
    return encodeURIComponent(mensaje); 
  };

  const handleCheckout = async () => {
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

    try {
     
      const userDocRef = doc(db, "users", currentUser.uid);
      const userDoc = await getDoc(userDocRef);

      await setDoc(userDocRef, {
        usedPromoCodes: [...(userDoc.data()?.usedPromoCodes || []), ...appliedCodes],
      }, { merge: true });

      
      const numeroWhatsApp = "5491165726162"; 
      const mensaje = generarMensajeWhatsApp();
      const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
      window.open(url, "_blank");

    
      setAppliedCodes([]);
      setTotalDiscount(0);

    } catch (error) {
      console.error("Error al registrar los códigos promocionales:", error);
      toast({
        title: "Error al completar la compra.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
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
                  ${totalWithDiscount.toFixed(2)}
                </Text>
              </HStack>

              <HStack>
                <Input 
                  placeholder="Código promocional"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <Button colorScheme="pink" onClick={handleApplyPromo}>
                  Aplicar
                </Button>
              </HStack>

              {appliedCodes.length > 0 && (
                <VStack align="start">
                  <Text fontWeight="bold">Códigos Promocionales Aplicados:</Text>
                  {appliedCodes.map(code => (
                    <Text key={code}>{code} (-{validPromoCodes[code]}%)</Text>
                  ))}
                  <Text fontWeight="bold">Descuento Total: {totalDiscount}%</Text>
                </VStack>
              )}

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
