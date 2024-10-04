import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  SimpleGrid,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  Text,
  Stack,
  StackDivider,
  List,
  ListItem,
  useColorModeValue,
} from '@chakra-ui/react';
import Swal from 'sweetalert2';
import { CartContext } from '../context/CartContext';
import productosData from '../data/productos.json';

export default function ItemDetail() {
  const { itemId } = useParams();
  const { addItem } = useContext(CartContext);
  const [qty, setQty] = useState(1);
  const navigate = useNavigate(); 

  const product = productosData.find((p) => p.id === itemId);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        nombre: product.nombre,
        price: product.precio || 0,
        imagen: product.imagen,
        qty,
      });

      const screenWidth = window.innerWidth;
      const imageSize = screenWidth < 768 ? 200 : 400;

      Swal.fire({
        title: 'Producto agregado',
        text: `${product.nombre} ha sido agregado al carrito.`,
        imageUrl: product.imagen,
        imageWidth: imageSize,
        imageHeight: imageSize * (200 / 400),
        imageAlt: product.nombre,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const handleIncrement = () => {
    if (qty < product.stock) {
      setQty(qty + 1);
    }
  };

  const handleDecrement = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const handleVolverAProductos = () => {
    navigate('/#productos'); 
  };

  if (!product) {
    return <Text>Producto no encontrado</Text>;
  }

  return (
    <Container maxW={'7xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={'md'}
            alt={product.nombre}
            src={product.imagen}
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
              fontWeight={600}
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}
              color="pink.400"
            >
              {product.nombre}
            </Heading>
            <Text
              color={useColorModeValue('gray.900', 'gray.400')}
              fontWeight={300}
              fontSize={'2xl'}
            >
              ${product.precio}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />
            }
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue('gray.500', 'gray.400')}
                fontSize={'2xl'}
                fontWeight={'300'}
              >
                {product.descripcion}
              </Text>
            </VStack>

            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('yellow.500', 'yellow.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}
              >
                Detalles del Producto
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Stock disponible:
                  </Text>{' '}
                  {product.stock> 0 ? 'Sí' : 'Sin stock'}
                </ListItem>
              </List>
            </Box>
          </Stack>

          <Stack direction="row" alignItems="center">
            <Button onClick={handleDecrement} disabled={qty <= 1}>
              -
            </Button>
            <Text fontSize="lg">{qty}</Text>
            <Button onClick={handleIncrement} disabled={qty >= product.stock}>
              +
            </Button>
          </Stack>

          <Button
            rounded={'none'}
            w={'full'}
            mt={8}
            size={'lg'}
            py={'7'}
            bg={useColorModeValue('pink.400', 'gray.50')}
            color={useColorModeValue('white', 'gray.900')}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}
            onClick={handleAddToCart}
          >
            Agregar al carrito
          </Button>

          
          <Button
            rounded={'none'}
            w={'full'}
            mt={4} 
            size={'lg'}
            py={'7'}
            bgGradient='linear(to-br, pink.400, pink.900)'
            color={useColorModeValue('white', 'gray.900')}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
              bg: useColorModeValue('pink.500', 'gray.100'),
            }}
            onClick={handleVolverAProductos}
            
          >
            Volver a Productos
          </Button>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
