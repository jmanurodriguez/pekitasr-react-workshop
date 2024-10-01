import {
  Box,
  Heading,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  useColorModeValue,
  Container,
  VStack,
} from '@chakra-ui/react';

const BlogTags = ({ tags, marginTop }) => {
  return (
    <HStack spacing={2} marginTop={marginTop}>
      {tags.map((tag) => (
        <Tag size={'md'} variant="solid" colorScheme="pink" key={tag}> {/* Cambiado a 'pink' */}
          {tag}
        </Tag>
      ))}
    </HStack>
  );
};

const BlogAuthor = ({ date }) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Text>{new Date(date).toLocaleDateString()}</Text>
    </HStack>
  );
};

export const UpcomingProducts = () => {
  return (
    <Container maxW={'7xl'} p="12">
      <Heading as="h1" color="pink.500"> {/* Título en color rosa */}
        Próximos Productos
      </Heading>
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
                borderRadius="lg"
                src="https://res-console.cloudinary.com/dpcpcnqmq/thumbnails/v1/image/upload/v1727786227/NWI3Yzg4MmYtNmExNi00ZGE2LTljNzAtNTMyOGZiZDc0NmNiX2JzbnF0Yw==/drilldown"
                alt="Producto próximo"
                objectFit="contain"
              />
            </Box>
          </Box>
          <Box zIndex="1" width="100%" position="absolute" height="100%">
            <Box
              bgGradient={useColorModeValue(
                'radial(pink.500 1px, transparent 1px)', // Cambiado a rosa
                'radial(pink.300 1px, transparent 1px)',
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
          <BlogTags tags={['Próximamente', 'Nuevo']} />
          <Heading marginTop="1" color="pink.400">
            <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
              Título del Producto
            </Text>
          </Heading>
          <Text
            as="p"
            marginTop="2"
            color={useColorModeValue('gray.700', 'gray.200')}
            fontSize="lg"
          >
            Descripción de un producto próximo que estará disponible pronto.
          </Text>
          <BlogAuthor date={new Date()} />
        </Box>
      </Box>
      <Heading as="h2" marginTop="5" color="pink.500">
        Más Productos Próximos
      </Heading>
      <Divider marginTop="5" />
      <Wrap spacing="30px" marginTop="5">
        <WrapItem width={{ base: '100%', sm: '45%', md: '45%', lg: '30%' }}>
          <Box w="100%">
            <Box borderRadius="lg" overflow="hidden">
              <Box textDecoration="none" _hover={{ textDecoration: 'none' }}>
                <Image
                  transform="scale(1.0)"
                  src="https://res-console.cloudinary.com/dpcpcnqmq/thumbnails/v1/image/upload/v1727786226/MTAxYzZmMWEtZmNhYi00NmM3LWEyZTMtZGU0ZDYwMzJkYTUwX2dyNnptZg==/drilldown"
                  alt="Próximo producto"
                  objectFit="contain"
                  width="100%"
                  transition="0.3s ease-in-out"
                  _hover={{
                    transform: 'scale(1.05)',
                  }}
                />
              </Box>
            </Box>
            <BlogTags tags={['Próximamente', 'Nuevo']} marginTop={3} />
            <Heading fontSize="xl" marginTop="2" color="pink.400">
              <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
                Otro Producto Próximo
              </Text>
            </Heading>
            <Text as="p" fontSize="md" marginTop="2">
              Este es otro emocionante producto que será lanzado próximamente. ¡Mantente al tanto para más actualizaciones!
            </Text>
            <BlogAuthor date={new Date()} />
          </Box>
        </WrapItem>
      </Wrap>
    </Container>
  );
};
