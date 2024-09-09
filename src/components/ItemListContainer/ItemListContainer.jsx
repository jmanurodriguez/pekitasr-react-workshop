// src/components/ItemListContainer/ItemListContainer.jsx
import PropTypes from 'prop-types';
import { SimpleGrid } from '@chakra-ui/react';
import { Item } from '../Item/Item';

export function ItemListContainer({ productos = [] }) {
  return (
    <SimpleGrid columns={[1, 2, 3]} spacing={10}>
      {productos.map((producto) => (
        <Item key={producto.id} producto={producto} />
      ))}
    </SimpleGrid>
  );
}

ItemListContainer.propTypes = {
  productos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      nombre: PropTypes.string.isRequired,
      imagen: PropTypes.string.isRequired,
      precio: PropTypes.number.isRequired,
    })
  ).isRequired,
};
