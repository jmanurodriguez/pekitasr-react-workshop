// src/components/Item/Item.jsx
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
} from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export function Item({ producto }) {
  const categorias = Array.isArray(producto.categorias) 
    ? producto.categorias.slice(0, 2)  // Mostrar solo las primeras 2 categorías
    : [producto.categorias];

  return (
    <Box
      borderWidth="3px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg={useColorModeValue("white", "gray.800")}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      _hover={{
        transform: "scale(1.05)",
        transition: "0.3s ease-in-out",
        boxShadow: "2xl",
      }}
    >
      <Image
        src={producto.imagen}
        alt={producto.nombre}
        objectFit="cover"
        w="100%"
        h={{ base: "200px", md: "250px" }}
      />

      <Box p="4" flex="1">
        <Flex alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="green">
            Nuevo
          </Badge>
          <Text
            color={useColorModeValue("gray.500", "gray.400")}
            fontSize="sm"
            ml="2"
            noOfLines={1}  // Asegurarnos de que el texto de categorías ocupe solo 1 línea
          >
            {categorias.join(", ")}{/* Unimos las categorías */}
          </Text>
        </Flex>

        <VStack spacing={2} align="start" mt={3}>
          <Text
            fontWeight="bold"
            fontSize={{ base: "md", md: "lg" }}
            as="h4"
            textAlign="left"
            lineHeight="tight"
            noOfLines={1}
            color={useColorModeValue("gray.800", "white")}
          >
            {producto.nombre}
          </Text>

          {producto.descripcion && (
            <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.300")}>
              {producto.descripcion.slice(0, 50)}...
            </Text>
          )}

          <Text fontSize="sm" color={useColorModeValue("gray.500", "gray.400")}>
            Stock disponible: {producto.stock}
          </Text>

          <Text fontWeight="bold" fontSize="xl" color="pink.500">
            ${producto.precio}
          </Text>
        </VStack>

        <Spacer />

        <Link to={`/item/${producto.id}`}>
          <Button
            mt={4}
            w="full"
            colorScheme="pink"
            textTransform="uppercase"
            _hover={{ bg: "pink.600" }}
          >
            Ver Detalle
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

Item.propTypes = {
  producto: PropTypes.shape({
    id: PropTypes.oneOfType([ 
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    nombre: PropTypes.string.isRequired,
    imagen: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    descripcion: PropTypes.string, 
    stock: PropTypes.number.isRequired,
    categorias: PropTypes.oneOfType([ 
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string
    ]).isRequired, 
  }).isRequired,
};
