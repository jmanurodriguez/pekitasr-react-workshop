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
} from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export function Item({ producto }) {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg={useColorModeValue("white", "gray.800")}
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
        h="250px"
      />

      <Box p="6">
        <Flex alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="green">
            Nuevo
          </Badge>
          <Text
            color={useColorModeValue("gray.500", "gray.400")}
            fontSize="sm"
            ml="2"
          >
            {producto.categorias.join(", ")}
          </Text>
        </Flex>

        <VStack spacing={2} align="start" mt={3}>
          <Text
            fontWeight="bold"
            fontSize="lg"
            as="h4"
            textAlign="left"
            lineHeight="tight"
            noOfLines={1}
            color={useColorModeValue("gray.800", "white")}
          >
            {producto.nombre}
          </Text>

          {producto.descripcion && ( // Verificación antes de usar slice
            <Text fontSize="md" color={useColorModeValue("gray.600", "gray.300")}>
              {producto.descripcion.slice(0, 50)}...
            </Text>
          )}

          <Text fontWeight="bold" fontSize="xl" color="pink.500">
            ${producto.precio}
          </Text>
        </VStack>

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
    id: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    imagen: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    descripcion: PropTypes.string, // No es requerido para evitar el error
    categorias: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};
