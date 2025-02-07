import {
  Box,
  Image,
  Badge,
  Button,
  Flex,
  Text,
  useColorModeValue,
  VStack,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FiShoppingCart } from 'react-icons/fi';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export function Item({ producto }) {
  const categorias = Array.isArray(producto.categorias) 
    ? producto.categorias.slice(0, 2)  
    : [producto.categorias];

  return (
    <MotionBox
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      borderWidth="1px"
      borderRadius="2xl"
      overflow="hidden"
      bg={useColorModeValue("white", "gray.800")}
      position="relative"
      boxShadow="lg"
      _hover={{
        boxShadow: "2xl",
      }}
    >
      {/* Ribbon para productos nuevos */}
      {producto.isNew && (
        <Box
          position="absolute"
          top="0"
          right="0"
          bg="pink.400"
          color="white"
          px={3}
          py={1}
          borderBottomLeftRadius="md"
          fontSize="sm"
          fontWeight="bold"
          zIndex="1"
        >
          NUEVO
        </Box>
      )}

      {/* Contenedor de la imagen con overlay */}
      <Box position="relative" overflow="hidden">
        <Image
          src={producto.imagen}
          alt={producto.nombre}
          objectFit="cover"
          w="100%"
          h={{ base: "200px", md: "250px" }}
          transition="transform 0.3s ease"
          _hover={{ transform: 'scale(1.1)' }}
        />
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="blackAlpha.300"
          opacity="0"
          transition="opacity 0.3s"
          _groupHover={{ opacity: 1 }}
        />
      </Box>

      <Box p={4}>
        {/* Categorías */}
        <Flex gap={2} mb={2} flexWrap="wrap">
          {categorias.map((categoria, index) => (
            <Badge
              key={index}
              colorScheme="pink"
              variant="subtle"
              borderRadius="full"
              px={2}
              fontSize="xs"
            >
              {categoria}
            </Badge>
          ))}
        </Flex>

        {/* Información del producto */}
        <VStack align="start" spacing={2}>
          <Text
            fontSize="xl"
            fontWeight="semibold"
            lineHeight="tight"
            noOfLines={2}
            color={useColorModeValue("gray.700", "white")}
          >
            {producto.nombre}
          </Text>

          <Text 
            fontSize="sm" 
            color={useColorModeValue("gray.600", "gray.300")}
            noOfLines={2}
          >
            {producto.descripcion}
          </Text>

          {/* Precio y stock */}
          <Flex w="100%" justify="space-between" align="center">
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color="pink.500"
            >
              ${producto.precio}
            </Text>
            <Badge
              colorScheme={producto.stock > 0 ? "green" : "red"}
              variant="subtle"
              borderRadius="full"
            >
              {producto.stock > 0 ? 'En Stock' : 'Sin stock'}
            </Badge>
          </Flex>

          {/* Botón de acción */}
          <Link to={`/item/${producto.id}`} style={{ width: '100%' }}>
            <Button
              w="full"
              colorScheme="pink"
              variant="solid"
              leftIcon={<FiShoppingCart />}
              isDisabled={producto.stock <= 0}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
              transition="all 0.2s"
            >
              {producto.stock > 0 ? 'Ver Detalle' : 'Sin Stock'}
            </Button>
          </Link>
        </VStack>
      </Box>
    </MotionBox>
  );
}

Item.propTypes = {
  producto: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nombre: PropTypes.string.isRequired,
    imagen: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    descripcion: PropTypes.string,
    stock: PropTypes.number.isRequired,
    categorias: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string
    ]),
    isNew: PropTypes.bool
  }).isRequired,
};
