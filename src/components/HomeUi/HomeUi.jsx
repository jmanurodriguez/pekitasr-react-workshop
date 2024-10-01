// src/components/HomeUI.jsx
import {
    Text, Spinner, Center, Box, Flex, Image, Heading, Divider, HStack, useColorModeValue
  } from '@chakra-ui/react';
  import { ItemListContainer } from './ItemListContainer';
  import { Hero } from './Hero';
  import { Banner } from './Banner';
  import { BlogAuthor } from './BlogAuthor';
  
  const PromoImage = () => (
    <Center my={10}>
      <Box maxW="450px" boxShadow="lg" borderRadius="lg" overflow="hidden">
        <Image
          src="https://res-console.cloudinary.com/dpcpcnqmq/media_explorer_thumbnails/276cb8e2e00dc05db44018385c7c98a5/detailed"
          alt="Imagen Promocional"
          objectFit="cover"
          borderRadius="md"
          _hover={{ transform: 'scale(1.05)', transition: '0.5s' }}
          loading="lazy"
        />
      </Box>
    </Center>
  );
  
  export const HomeUI = ({ products, loading, error }) => {
    const textColor = useColorModeValue("gray.700", "gray.200");
  
    if (loading) {
      return (
        <Center height="100vh">
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="teal.500" size="xl" />
          <Text ml={3} fontSize="xl">Cargando productos...</Text>
        </Center>
      );
    }
  
    if (error) {
      return (
        <Center height="100vh">
          <Text ml={3} fontSize="xl" color="red.500">
            Hubo un error al cargar los productos. Intente de nuevo más tarde.
          </Text>
        </Center>
      );
    }
  
    return (
      <Box>
        <Banner />
        <Hero />
        <Box id="sobre-nosotros" p="12" maxW="7xl" mx="auto">
          <Heading as="h1" mb={6} color="pink.500">Conoce más sobre nosotros</Heading>
          <Flex direction={{ base: 'column', md: 'row' }} justifyContent="space-between">
            <Box flex="1" marginRight="3" zIndex="2">
              <Image
                borderRadius="lg"
                src="https://ejemplo.com/sobre_nosotros.jpg"
                alt="Sobre Nosotros"
                objectFit="cover"
                width="100%"
                transition="0.3s ease-in-out"
                _hover={{ transform: 'scale(1.05)' }}
              />
            </Box>
            <Box flex="1" flexDirection="column" justifyContent="center" mt={{ base: '3', md: '0' }}>
              <Heading as="h2" size="xl" color="pink.500" mb={4}>Sobre Nosotros</Heading>
              <Text fontSize="lg" color={textColor} mb={4}>
                Pekitas Ecotienda es más que una simple tienda...
              </Text>
              <BlogAuthor name="Gabriela Rodríguez" date="2021-04-06" />
            </Box>
          </Flex>
        </Box>
        <Divider my={6} />
        <ItemListContainer productos={products} />
        <PromoImage />
      </Box>
    );
  };
  