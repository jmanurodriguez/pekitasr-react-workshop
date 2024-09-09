import PropTypes from 'prop-types';
import { Box, Image, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export function Item({ producto }) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
      <Image src={producto.imagen} alt={producto.nombre} />
      <Text mt={2} fontSize="xl">{producto.nombre}</Text>
      <Text color="pink.500" mt={2}>${producto.precio}</Text>
      <Link to={`/item/${producto.id}`}>
        <Button colorScheme="pink" mt={4}>Ver Detalle</Button>
      </Link>
    </Box>
  );
}

Item.propTypes = {
  producto: PropTypes.shape({
    id: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    imagen: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
  }).isRequired,
};
