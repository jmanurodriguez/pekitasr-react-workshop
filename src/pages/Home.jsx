// src/pages/Home.jsx
import { ItemListContainer } from "../components"; 
import { useProducts } from "../hooks/useProducts";
import { Text, Spinner, Center } from '@chakra-ui/react';

export const Home = () => {
  const { products, loading } = useProducts();

  if (loading) {
    return (
      <Center height="100vh">
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="teal.500" size="xl" />
        <Text ml={3} fontSize="xl">Cargando productos...</Text>
      </Center>
    );
  }

  return <ItemListContainer productos={products} />;
};
