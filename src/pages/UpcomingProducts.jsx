import {
  Box,
  Heading,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Container,
  Flex,
  Icon,
} from '@chakra-ui/react';
import { FaLeaf } from 'react-icons/fa';
import { Banner } from "../components/Banner";

const BlogTags = ({ tags, marginTop }) => {
  return (
    <HStack spacing={2} marginTop={marginTop}>
      {tags.map((tag) => (
        <Tag size={'md'} variant="solid" colorScheme="pink" key={tag}>
          {tag}
        </Tag>
      ))}
    </HStack>
  );
};

const BlogAuthor = ({ date }) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Text color="gray.500" fontSize="sm">
        {new Date(date).toLocaleDateString()}
      </Text>
    </HStack>
  );
};

export const UpcomingProducts = () => {
  return (
    <Box as="section" w="100%" m="0" p="0">
      <Banner />

      <Container maxW="7xl" p="12">
        <Heading as="h1" color="pink.500" textAlign="center" mb={10}>
          Próximos Productos
        </Heading>

        {/* Primer Producto */}
        <Flex
          direction={{ base: 'column', md: 'row' }}
          alignItems="center"
          mb={20} // Aumentamos el margen inferior
        >
          {/* Imagen a la izquierda */}
          <Box flex="1" mr={{ base: 0, md: 10 }} mb={{ base: 6, md: 0 }}> {/* Aumentamos mr en md */}
            <Image
              borderRadius="lg"
              src="https://res.cloudinary.com/dpcpcnqmq/image/upload/v1727786226/101c6f1a-fcab-46c7-a2e3-de4d6032da50_gr6zmf.jpg"
              alt="Producto próximo"
              objectFit="cover"
              w="100%"
              h="100%"
              maxH="400px"
              transition="0.3s ease-in-out"
              _hover={{ transform: 'scale(1.05)' }}
            />
          </Box>

          {/* Detalles del producto */}
          <Box flex="1">
            <BlogTags tags={['Próximamente', 'Nuevo']} />
            <Heading marginTop="1" color="pink.400">
              Jabones Saponificados
            </Heading>
            <Text
              as="p"
              marginTop="2"
              color="gray.700"
              fontSize="lg"
              textAlign="justify"
            >
              Jabones saponificados que limpian, nutren y cuidan tu piel. Sin ingredientes de origen animal, respetuosos con el medio ambiente y sin testeo en animales. Enriquecidos con aditivos naturales y vegetales. Fabricados con una selección de aceites vegetales, limpian la piel suavemente y generan una espuma exquisita. Y lo más importante, están realizados con mucho amor.
            </Text>
            <BlogAuthor date={new Date()} />
          </Box>
        </Flex>

        {/* Segundo Producto */}
        <Flex
          direction={{ base: 'column', md: 'row' }}
          alignItems="center"
          mb={50} // Aumentamos el margen inferior
        >
          {/* Detalles del producto */}
          <Box flex="1" order={{ base: 2, md: 1 }}>
            <Heading marginTop="1" color="pink.400">
              Hidratante Natural
            </Heading>
            <Text
              as="p"
              marginTop="2"
              color="gray.700"
              fontSize="lg"
              textAlign="justify"
            >
              Nuestros jabones saponificados, limpian, nutren y cuidan tu piel.  sin ingredientes de origen animalhidratante natural está formulada con ingredientes orgánicos que nutren y revitalizan tu piel. Libre de químicos agresivos y perfecta para todo tipo de piel.
            </Text>
            <BlogAuthor date={new Date()} />
          </Box>

          {/* Imagen a la derecha */}
          <Box
            flex="1"
            ml={{ base: 0, md: 10 }} 
            mb={{ base: 6, md: 0 }}
            order={{ base: 1, md: 2 }}
          >
            <Image
              borderRadius="lg"
              src="https://res.cloudinary.com/dpcpcnqmq/image/upload/v1727786227/5b7c882f-6a16-4da6-9c70-5328fbd746cb_bsnqtc.jpg"
              alt="Segundo Producto próximo"
              objectFit="cover"
              w="100%"
              h="100%"
              maxH="400px"
              transition="0.3s ease-in-out"
              _hover={{ transform: 'scale(1.05)' }}
            />
          </Box>
        </Flex>

        {/* Divisor con ícono */}
        <Flex justifyContent="center" alignItems="center" my={20}> 
          <Divider borderColor="pink.500" width="40%" />
          <Icon as={FaLeaf} color="pink.500" mx={2} boxSize={8} />
          <Divider borderColor="pink.500" width="40%" />
        </Flex>

        {/* Tercer Producto */}
        <Flex
          direction={{ base: 'column', md: 'row' }}
          alignItems="center"
          mb={20} // Aumentamos el margen inferior
        >
          {/* Imagen a la izquierda */}
          <Box flex="1" mr={{ base: 0, md: 10 }} mb={{ base: 6, md: 0 }}> 
            <Image
              borderRadius="lg"
              src="https://res-console.cloudinary.com/dpcpcnqmq/thumbnails/v1/image/upload/v1727830306/dXJ1Y3VtX3Fva3k3Yg==/drilldown" 
              alt="Oleo Urucum"
              objectFit="cover"
              w="100%"
              h="100%"
              maxH="400px"
              transition="0.3s ease-in-out"
              _hover={{ transform: 'scale(1.05)' }}
            />
          </Box>

          
          <Box flex="1">
            <BlogTags tags={['Próximamente', 'Especial']} />
            <Heading marginTop="1" color="pink.400">
            Oleo Urucum
            </Heading>
            <Text
              as="p"
              marginTop="2"
              color="gray.700"
              fontSize="lg"
              textAlign="justify"
            >
             Oleo de urucum, es una materia prima versátil que nutre, hidrata y realza el tono de tu piel, brindando una apariencia luminosa y saludable. Beneficios: acelerador del bronceado, antioxidante, hidratación profunda, textura ligera y no grasa, piel mas radiante.
            </Text>
            <BlogAuthor date={new Date()} />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};
