//src/pages/Home.jsx
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
  HStack,
} from "@chakra-ui/react";
import { Hero } from "../components/Hero/Hero";
import { Banner } from "../components/Banner";
import { ProductCarousel } from "../components/ProductCarousel/ProductCarousel"; // Asegúrate de que la ruta sea correcta

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
    <Box>
      <Banner />
      <Hero />

      <ProductCarousel products={products} />
      <Box id="sobre-nosotros" p="12" maxW="7xl" mx="auto">
        <Heading as="h1" mb={6} color="pink.500">
          Bienvenidos a Pekitas Ecotienda
        </Heading>
        <Flex
          direction={{ base: "column", md: "row" }}
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
              _hover={{ transform: "scale(1.05)" }}
            />
          </Box>

          <Box
            flex="1"
            flexDirection="column"
            justifyContent="center"
            mt={{ base: "3", md: "0" }}
          >
            <Heading as="h2" size="xl" color="pink.500" mb={4}>
              Sumate a un cambio natural!!!
            </Heading>
            <Text fontSize="lg" color={textColor} mb={4}>Pekitas
              Ecotienda es mucho más que una simple tienda de productos; es una
              visión comprometida con el futuro del planeta. Desde sus inicios,
              la tienda se ha enfocado en promover un estilo de vida consciente,
              seleccionando productos que reflejan su compromiso con el medio
              ambiente y las futuras generaciones. Cada producto en Pekitas es
              cuidadosamente elegido para asegurar que sea orgánico, libre de
              químicos dañinos y respetuoso con el entorno. Esta selección no es
              solo comercial, sino un esfuerzo para fomentar el consumo
              responsable y reducir la huella ecológica. A diferencia de las
              tiendas convencionales, Pekitas se dedica a ofrecer alternativas
              sostenibles, que no solo benefician a sus clientes, sino también
              al planeta. La misión de Pekitas va más allá de la venta de
              productos; busca educar a sus clientes sobre prácticas ecológicas
              y saludables, ofreciendo productos para el cuidado personal,
              alimentos y artículos para el hogar que son beneficiosos para el
              bienestar individual y el medio ambiente. Al comprar en Pekitas
              Ecotienda, no solo adquieres un producto de calidad, sino que te
              unes a una comunidad comprometida con el cambio hacia un consumo
              responsable y sostenible.
            </Text>
          </Box>
        </Flex>
      </Box>

      <Divider my={6} />

      <Box id="productos">
        <Heading as="h1" mb={6} color="pink.500" textAlign="center">
          Nuestros Productos
        </Heading>
        <ItemListContainer productos={products} />
      </Box>
    </Box>
  );
};
