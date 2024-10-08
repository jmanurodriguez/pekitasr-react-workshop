import {
    Box,
    Heading,
    Image,
    Text,
    Divider,
    HStack,
    Tag,
    useColorModeValue,
    Container,
    Flex,
    Icon,
  } from '@chakra-ui/react';
  import { FaLeaf } from 'react-icons/fa';
  import { MdOutlineCrueltyFree } from 'react-icons/md';
  import { LuVegan } from "react-icons/lu";


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
  
  const BlogAuthor = ({ date, name }) => {
    return (
      <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
        <Text fontWeight="bold" color="pink.500">{name}</Text>
        <Text color="gray.500">—</Text>
        <Text>{new Date(date).toLocaleDateString()}</Text>
      </HStack>
    );
  };
  
  export const AboutUs = () => {
    return (
      <Box as="section" w="100%" m="0" p="0"> 
        
        <Banner /> 
  
        <Container maxW={'7xl'} p="12" mt="0">
          <Heading as="h1" color="pink.500" textAlign="center">
            Sobre Pekitas Ecotienda
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
                  Nuestra historia
                </Text>
              </Heading>
              <Text
                as="p"
                marginTop="2"
                color={useColorModeValue('gray.700', 'gray.200')}
                fontSize="lg"
              >
                Pekitas Ecotienda es más que una simple tienda, es una visión y un compromiso con el futuro de nuestro planeta. Fundada por la emprendedora y especialista en artes visuales, Gabriela Rodríguez, Pekitas Ecotienda es el resultado de una pasión por la belleza natural y un profundo respeto por el medio ambiente. Gabriela, con su amplio conocimiento y experiencia en las artes visuales, ha creado una gama de productos que no solo son estéticamente agradables, sino también amigables con el medio ambiente. Cada producto en Pekitas Ecotienda es natural, sostenible y biodegradable y veganos, lo que significa que no solo es bueno para ti, sino también para nuestro planeta.
              </Text>
              <BlogAuthor name="Pekitas Team" date={new Date()} />
            </Box>
          </Box>
    
         
          <Flex justifyContent="center" alignItems="center" my={10}>
            <Divider borderColor="pink.500" width="40%" />
            <Icon as={FaLeaf} color="pink.500" mx={2} boxSize={8} />
            <Icon as={MdOutlineCrueltyFree} color="pink.500" mx={2} boxSize={8} />
            <Icon as={LuVegan} color="pink.500" mx={2} boxSize={8} />
            <Divider borderColor="pink.500" width="40%" />
          </Flex>
    
          
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
    
            <Box flex="1" paddingLeft={{ base: '0', md: '5' }} textAlign="left">
              <BlogTags tags={['Sostenibilidad', 'Compromiso']} />
              <Heading fontSize="xl" marginTop="2" color="pink.500">
                <Text textDecoration="none" _hover={{ textDecoration: 'none' }}>
                  Cuidando el Planeta
                </Text>
              </Heading>
              <Text as="p" fontSize="lg" marginTop="2" color="gray.700">
                Nuestro compromiso es reducir la huella ambiental ofreciendo productos que respetan la naturaleza. Desde empaques biodegradables hasta cosméticos naturales, buscamos el equilibrio entre calidad y responsabilidad.En Pekitas Ecotienda, creemos que cada pequeña elección que hacemos puede tener un gran impacto en el mundo que nos rodea. Por eso, nos esforzamos por ofrecer productos que te ayuden a vivir de una manera más sostenible y consciente. Desde cosméticos hasta productos de cuidado personal, cada artículo en nuestra tienda ha sido cuidadosamente seleccionado y creado con el objetivo de reducir nuestro impacto en el medio ambiente
              </Text>
              <BlogAuthor name="Pekitas Team" date={new Date()} />
            </Box>
          </Flex>
        </Container>
      </Box>
    );
  };
  