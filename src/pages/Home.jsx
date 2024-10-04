import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ItemListContainer } from "../components";
import { useProducts } from "../hooks/useProducts";
import {
  Text,
  Spinner,
  Center,
  Box,
  Flex,
  Image,
  Heading,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { Hero } from "../components/Hero/Hero";
import { Banner } from "../components/Banner";
import { ProductCarousel } from "../components/ProductCarousel/ProductCarousel";

export const Home = () => {
  const { products, loading } = useProducts();
  const location = useLocation();

  const textColor = useColorModeValue("gray.700", "gray.200");

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
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
    <Box maxW="100%" overflowX="hidden">
      <Banner />
      <Hero />

      <ProductCarousel products={products} />

      <Box
        id="sobre-nosotros"
        px={{ base: 4, md: 12 }}
        py={{ base: 6, md: 12 }}
        maxW="7xl"
        mx="auto"
      >
        <Heading as="h1" mb={6} color="pink.500">
          Bienvenidos a Pekitas Ecotienda
        </Heading>
        <Flex
          direction={{ base: "column", md: "row" }}
          alignItems="center"
          justifyContent="center"
        >
          <Box
            flex="1"
            position="relative"
            alignItems="center"
            marginRight={{ base: 0, md: 3 }}
            mb={{ base: 4, md: 0 }}
            zIndex="2"
          >
            <Image
              borderRadius="lg"
              src="https://res.cloudinary.com/dpcpcnqmq/image/upload/v1722728852/homesprai_sekfvv.jpg"
              alt="Sobre Nosotros"
              objectFit="cover"
              width="100%"
              maxW="100%"
              transition="0.3s ease-in-out"
              _hover={{ transform: "scale(1.05)" }}
            />
          </Box>

          <Box
            flex="1"
            flexDirection="column"
            justifyContent="center"
            mt={{ base: 4, md: 0 }}
          >
            <Heading as="h2" size="xl" color="pink.500" mb={4}>
              ¡Súmate a un cambio natural!
            </Heading>
            <Text fontSize="lg" color={textColor} mb={4} textAlign="justify">
              Pekitas Ecotienda es mucho más que una simple tienda de productos;
              es una visión comprometida con el futuro del planeta. Desde sus
              inicios, la tienda se ha enfocado en promover un estilo de vida
              consciente, seleccionando productos que reflejan su compromiso con
              el medio ambiente y las futuras generaciones. Cada producto en
              Pekitas es cuidadosamente elegido para asegurar que sea orgánico,
              libre de químicos dañinos y respetuoso con el entorno.
              
            </Text>
          </Box>
        </Flex>
      </Box>

      <Divider my={6} />

      <Box id="productos" px={{ base: 4, md: 12 }} maxW="7xl" mx="auto">
        <Heading as="h1" mb={6} color="pink.500" textAlign="center">
          Nuestros Productos
        </Heading>
        <ItemListContainer productos={products} />
      </Box>
    </Box>
  );
};
