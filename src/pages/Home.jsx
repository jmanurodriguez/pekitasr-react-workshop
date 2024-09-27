//src/pages/Home.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ItemListContainer } from "../components";
import { useProducts } from "../hooks/useProducts";
import {
  Text, Spinner, Center, Box, Flex, Image, Heading, Divider,
  useColorModeValue, HStack
} from '@chakra-ui/react';
import { Hero } from '../components/Hero/Hero';
import { Banner } from '../components/Banner';
import { ProductCarousel } from '../components/ProductCarousel/ProductCarousel'; // Asegúrate de que la ruta sea correcta

export const Home = () => {
  const { products, loading } = useProducts();
  const location = useLocation();

  const textColor = useColorModeValue("gray.700", "gray.200");

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  if (loading) {
    return (
      <Center height="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="teal.500"
          size="xl"
        />
        <Text ml={3} fontSize="xl">
          Cargando productos...
        </Text>
      </Center>
    );
  }

  return (
    <Box>
      <Banner />
      <Hero />

      {/* Sección de carrusel de productos */}
      <ProductCarousel products={products} /> {/* Asegúrate de pasar los productos */}

      {/* Sección Sobre Nosotros */}
      <Box id="sobre-nosotros" p="12" maxW="7xl" mx="auto">
        <Heading as="h1" mb={6} color="pink.500">
          Conoce más sobre nosotros
        </Heading>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justifyContent="space-between"
        >
          <Box
            flex="1"
            position="relative"
            alignItems="center"
            marginRight="3"
            zIndex="2"
          >
            <Image
              borderRadius="lg"
              src="https://res.cloudinary.com/dpcpcnqmq/image/upload/v1722728852/homesprai_sekfvv.jpg"
              alt="Sobre Nosotros"
              objectFit="cover"
              width="100%"
              transition="0.3s ease-in-out"
              _hover={{ transform: 'scale(1.05)' }}
            />
          </Box>

          <Box
            flex="1"
            flexDirection="column"
            justifyContent="center"
            mt={{ base: '3', md: '0' }}
          >
            <Heading as="h2" size="xl" color="pink.500" mb={4}>
              Sobre Nosotros
            </Heading>
            <Text fontSize="lg" color={textColor} mb={4}>
              Pekitas Ecotienda es más que una simple tienda, es una visión y un
              compromiso con el futuro de nuestro planeta...
            </Text>
          </Box>
        </Flex>
      </Box>

      <Divider my={6} />

      {/* Listado de Productos */}
      <Box id="productos">
        <Heading as="h1" mb={6} color="pink.500" textAlign="center">
          Nuestros Productos
        </Heading>
        <ItemListContainer productos={products} />
      </Box>
    </Box>
  );
};
