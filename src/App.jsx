import React, { useEffect } from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { Navbar } from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { MainRoutes } from './routes/MainRoutes'; 
import { createProductsFirestore } from './services/products.service';
import productosData from './data/productos.json';
import { Box, IconButton, Tooltip } from '@chakra-ui/react';
import { FaWhatsapp } from 'react-icons/fa';

// Definimos un tema personalizado
const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        margin: 0,
        padding: 0,
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
      },
    },
  },
});

export function App() {
  useEffect(() => {
    const initializeProducts = async () => {
      try {
        await createProductsFirestore('products', productosData);
      } catch (error) {
        console.error("Error al inicializar productos:", error);
      }
    };

    initializeProducts();
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = "1234567890"; // Número de demostración
    const message = encodeURIComponent("Hola, me interesa saber más sobre sus productos! 🌱");
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <CartProvider>
          <Box minHeight="100vh" display="flex" flexDirection="column">
            <Navbar />
            <Box flex="1">
              <MainRoutes />
            </Box>
            <Footer />
            
            {/* Botón flotante de WhatsApp */}
            <Box
              position="fixed"
              bottom={{ base: "20px", md: "40px" }}
              right={{ base: "20px", md: "40px" }}
              zIndex={1000}
            >
              <Tooltip label="¡Contáctanos por WhatsApp!" placement="left">
                <IconButton
                  onClick={handleWhatsAppClick}
                  icon={<FaWhatsapp />}
                  isRound={true}
                  size="lg"
                  fontSize="30px"
                  bg="green.400"
                  color="white"
                  _hover={{
                    bg: "green.500",
                    transform: "scale(1.1)",
                  }}
                  transition="all 0.3s"
                  boxShadow="lg"
                  aria-label="Contactar por WhatsApp"
                />
              </Tooltip>
            </Box>
          </Box>
        </CartProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

