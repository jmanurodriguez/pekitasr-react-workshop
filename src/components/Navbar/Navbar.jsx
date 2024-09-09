import { Link } from 'react-router-dom';
import { Flex, Spacer, Text, Button } from '@chakra-ui/react';
import { CardWidget } from '../CardWidget/CardWidget';

export const Navbar = () => {
  return (
    <Flex as="nav" bg="primary" p={4} align="center">
      <Link to="/">
        <Text fontSize="2xl" fontWeight="bold" color="white">
          Pekitas Ecotienda
        </Text>
      </Link>
      <Spacer />
      <Link to="/category/cuidado-personal">
        <Button colorScheme="pink">Cuidado Personal</Button>
      </Link>
      <Link to="/category/higiene">
        <Button colorScheme="pink" ml={4}>Higiene</Button>
      </Link>
      <Link to="/category/eco-friendly">
        <Button colorScheme="pink" ml={4}>Eco Friendly</Button>
      </Link>
      <Link to="/cart">
        <CardWidget />
      </Link>
    </Flex>
  );
};
