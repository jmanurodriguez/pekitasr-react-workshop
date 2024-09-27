// src/components/ItemDetail.jsx
import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  chakra,
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
  List,
  ListItem,
  useColorModeValue,
} from '@chakra-ui/react';
import Swal from 'sweetalert2';
import { MdLocalShipping } from 'react-icons/md';
import { CartContext } from '../context/CartContext';
import productosData from '../data/productos.json';

export default function ItemDetail() {
  const { itemId } = useParams();
  const { addItem } = useContext(CartContext);
  const [qty, setQty] = useState(1);
  
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
      Swal.fire({
        title: 'Producto agregado',
        text: `${product.nombre} ha sido agregado al carrito.`,
        imageUrl: product.imagen,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: product.nombre,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  if (!product) {
    return <Text>Producto no encontrado</Text>;
  }

  return (
    <Container maxW={'7xl'}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}>
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
              color='pink.500'
              fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
              {product.nombre}
            </Heading>
            <Text
              color={useColorModeValue('pink.500', 'pink.300')}
              fontWeight={300}
              fontSize={'2xl'}>
              ${product.precio}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={'column'}
            divider={
              <StackDivider borderColor={useColorModeValue('gray.200', 'gray.600')} />
            }>
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text
                color={useColorModeValue('pink.500', 'pink.300')}
                fontSize={'2xl'}
                fontWeight={'300'}>
                {product.descripcion}
              </Text>
            </VStack>

            <Box>
              <Text
                fontSize={{ base: '16px', lg: '18px' }}
                color={useColorModeValue('pink.500', 'pink.300')}
                fontWeight={'500'}
                textTransform={'uppercase'}
                mb={'4'}>
                Detalles del producto
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Stock disponible:
                  </Text>{' '}
                  {product.stock}
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Categorías:
                  </Text>{' '}
                  {product.categorias.join(', ')}
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
            bg={useColorModeValue('pink.500', 'gray.50')}
            color={useColorModeValue('white', 'gray.900')}
            textTransform={'uppercase'}
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}
            onClick={handleAddToCart}>
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
