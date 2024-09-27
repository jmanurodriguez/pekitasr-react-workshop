// src/components/ItemListContainer/ItemListContainer.jsx
import { useState } from "react";
import { Box, SimpleGrid, Button, HStack, Spinner, Text } from "@chakra-ui/react";
import { Item } from "../Item/Item";

export const ItemListContainer = ({ productos }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 8;
  const totalPaginas = Math.ceil(productos.length / productosPorPagina);
  const productosPaginados = productos.slice(
    (paginaActual - 1) * productosPorPagina,
    paginaActual * productosPorPagina
  );

  const cambiarPagina = (pagina) => {
    setPaginaActual(pagina);
  };

  if (productos.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
        <Text mt={4}>Cargando productos...</Text>
      </Box>
    );
  }

  return (
    <Box maxW="1200px" mx="auto" py={10} px={4}>
      <SimpleGrid
        columns={{ base: 1, sm: 2, md: 3, lg: 4 }} 
        spacing={6}
      >
        {productosPaginados.map((producto) => (
          <Item key={producto.id} producto={producto} />
        ))}
      </SimpleGrid>

      <HStack mt={4} justify="center">
        <Button
          onClick={() => cambiarPagina(paginaActual - 1)}
          isDisabled={paginaActual === 1}
        >
          «
        </Button>
        {Array.from({ length: totalPaginas }).map((_, i) => (
          <Button
            key={i + 1}
            onClick={() => cambiarPagina(i + 1)}
            colorScheme={i + 1 === paginaActual ? "pink" : "gray"}
          >
            {i + 1}
          </Button>
        ))}
        <Button
          onClick={() => cambiarPagina(paginaActual + 1)}
          isDisabled={paginaActual === totalPaginas}
        >
          »
        </Button>
      </HStack>
    </Box>
  );
};
