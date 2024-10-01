import {
    Box,
    Heading,
    Image,
    Text,
    Divider,
    HStack,
    Tag,
    WrapItem,
    useColorModeValue,
    Container,
    Flex,
    Icon,
  } from '@chakra-ui/react';
  import { FaLeaf } from 'react-icons/fa';  // Usamos un ícono que encaja con el estilo eco-friendly
  
  // Componente para los tags
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
  
  // Componente para mostrar el autor
  const BlogAuthor = ({ date, name }) => {
    return (
      <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
        <Text fontWeight="bold" color="pink.500">{name}</Text>
        <Text color="gray.500">—</Text>
        <Text>{new Date(date).toLocaleDateString()}</Text>
      </HStack>
    );
  };
  
  // Página 'Sobre Nosotros'
  export const AboutUs = () => {
    return (
      <Container maxW={'7xl'} p="12">
        <Heading as="h1" color="pink.500" textAlign="center">
          Sobre Pekitas Ecotienda
        </Heading>
  
        {/* Primera sección con el logo */}
        <Box
          marginTop={{ base: '1', sm: '5' }}
          display="flex"
          flexDirection={{ base: 'column', sm: 'row' }}
          justifyContent="space-between"
        >
          <Box
            display="flex"
            flex="1"
            marginRight="3"
            position="relative"
            alignItems="center"
          >
            <Box
              width={{ base: '100%', sm: '85%' }}
              zIndex="2"
              marginLeft={{ base: '0', sm: '5%' }}
              marginTop="5%"
            >
              <Box textDecoration="none" _hover={{ textDecoration: 'none' }}>
                <Image
                  borderRadius="full"
                  border="2px solid white"
                  src="https://i.ibb.co/d4QdwVQ/pekitas-logo-1.webp"
                  alt="Pekitas Ecotienda"
                  objectFit="contain"
                  boxShadow="lg"
                  bg="white"
                  padding="10px"
                />
              </Box>
            </Box>
            <Box zIndex="1" width="100%" position="absolute" height="100%">
              <Box
                bgGradient={useColorModeValue(
                  'radial(pink.600 1px, transparent 1px)',
                  'radial(pink.300 1px, transparent 1px)'
                )}
                backgroundSize="20px 20px"
                opacity="0.4"
                height="100%"
              />
            </Box>
          </Box>
  
          <Box
            display="flex"
            flex="1"
            flexDirection="column"
            justifyContent="center"
            marginTop={{ base: '3', sm: '0' }}
          >
            <BlogTags tags={['Eco-friendly', 'Sostenible']} />
            <Heading marginTop="1" color="pink.500">
              <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
                Productos eco-amigables
              </Text>
            </Heading>
            <Text
              as="p"
              marginTop="2"
              color={useColorModeValue('gray.700', 'gray.200')}
              fontSize="lg"
            >
              En Pekitas Ecotienda, nuestra misión es ofrecer productos sostenibles que cuiden del planeta y de ti. Nos especializamos en productos eco-amigables, hechos con materiales responsables y amigables con el medio ambiente.
            </Text>
            <BlogAuthor name="Pekitas Team" date={new Date()} />
          </Box>
        </Box>
  
        {/* Separador lindo */}
        <Flex justifyContent="center" alignItems="center" my={10}>
          <Divider borderColor="pink.500" width="40%" />
          <Icon as={FaLeaf} color="pink.500" mx={2} boxSize={8} />
          <Divider borderColor="pink.500" width="40%" />
        </Flex>
  
        {/* Segunda sección: Imagen a la izquierda, texto a la derecha */}
        <Heading as="h2" marginTop="5" color="pink.500" textAlign="center">
          Nuestro Compromiso
        </Heading>
        <Divider marginTop="5" />
        <Flex
          marginTop="5"
          flexDirection={{ base: 'column', md: 'row' }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box flex="1" marginRight={{ base: '0', md: '5' }} marginBottom={{ base: '5', md: '0' }}>
            <Box borderRadius="lg" overflow="hidden" boxShadow="lg">
              <Image
                transform="scale(1.0)"
                src="https://i.ibb.co/SvzmqmF/sales-31-11zon.webp"
                alt="Compromiso con el planeta"
                objectFit="cover"
                width="100%"
                transition="0.3s ease-in-out"
                _hover={{ transform: 'scale(1.05)' }}
              />
            </Box>
          </Box>
  
          {/* Texto al lado derecho de la imagen */}
          <Box flex="1" paddingLeft={{ base: '0', md: '5' }} textAlign="left">
            <BlogTags tags={['Sostenibilidad', 'Compromiso']} />
            <Heading fontSize="xl" marginTop="2" color="pink.500">
              <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
                Cuidando el Planeta
              </Text>
            </Heading>
            <Text as="p" fontSize="lg" marginTop="2" color="gray.700">
              Nuestro compromiso es reducir la huella ambiental ofreciendo productos que respetan la naturaleza. Desde empaques biodegradables hasta cosméticos naturales, buscamos el equilibrio entre calidad y responsabilidad.
            </Text>
            <BlogAuthor name="Pekitas Team" date={new Date()} />
          </Box>
        </Flex>
      </Container>
    );
  };
  