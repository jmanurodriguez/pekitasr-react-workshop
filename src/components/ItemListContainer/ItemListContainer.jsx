// src/components/ItemListContainer/ItemListContainer.jsx
import { SimpleGrid, Box, Center } from '@chakra-ui/react';
import { Item } from '../Item/Item';

export function ItemListContainer({ productos }) {
  return (
    <Center py={10}> 
      <SimpleGrid columns={[1, 2, 3]} spacing={10} p={5} maxW="1200px" width="100%">
        {productos.map((producto) => (
          <Box 
            key={producto.id}
            boxShadow="md"
            _hover={{ boxShadow: 'lg', transform: 'scale(1.02)', transition: '0.3s ease-in-out' }}
          >
            <Item producto={producto} />
          </Box>
        ))}
      </SimpleGrid>
    </Center>
  );
}
