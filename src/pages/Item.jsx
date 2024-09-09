import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
} from '@chakra-ui/react';
import { MdLocalShipping } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import productosData from '../data/productos.json'; 

export default function ItemDetail() {
  const { itemId } = useParams();  // Asegúrate de que el parámetro es correcto
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    // Verifica que el producto exista y que el id coincida
    const item = productosData.find(producto => producto.id === itemId); 
    setProducto(item); // Actualiza el estado con el producto encontrado
  }, [itemId]);

  if (!producto) {
    return <Text>Producto no encontrado</Text>; // Si no encuentra el producto, muestra este mensaje
  }

  // Si encuentra el producto, renderiza sus detalles
  return (
    <Container maxW={'7xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}>
        <Flex>
          <Image
            rounded={'md'}
            alt={producto.nombre}
            src={producto.imagen}
            fit={'cover'}
            align={'center'}
            w={'100%'}
            h={{ base: '100%', sm: '400px', lg: '500px' }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={'header'}>
            <Heading
              lineHeight={1.1}
              color={useColorModeValue('pink.500', 'gray.500')}
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
              {producto.nombre}
            </Heading>
            <Text
              color={useColorModeValue('pink.600', 'pink.400')}
              fontWeight={300}
              fontSize={'2xl'}>
              ${producto.precio} ARS
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider borderColor={useColorModeValue('pink.500', 'gray.600')} />
            }>
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue('gray.500', 'gray.400')}
                fontSize={'2xl'}
                fontWeight={'300'}>
                {producto.descripcion || 'lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet'}
              </Text>
            </VStack>
            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Detalles del producto
              </Text>
              <List spacing={2}>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Categorías:
                  </Text>{' '}
                  {producto.categorias.join(', ')}
                </ListItem>
              </List>
            </Box>
          </Stack>

          <Button
            rounded={'none'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            bg={useColorModeValue('pink.600', 'gray.50')}
            color={useColorModeValue('white', 'gray.900')}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}>
            Agregar al carrito
          </Button>

          <Stack direction="row" alignItems="center" justifyContent={'center'}>
            <MdLocalShipping />
            <Text>Entrega en 2-3 días hábiles</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
