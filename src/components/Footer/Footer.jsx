//src/components/Footer/Footer.jsx
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
  Image,
} from '@chakra-ui/react';
import { FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const SocialButton = ({ children, label, href }) => (
  <chakra.button
    bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
    rounded={'full'}
    w={8}
    h={8}
    cursor={'pointer'}
    as={'a'}
    href={href}
    display={'inline-flex'}
    alignItems={'center'}
    justifyContent={'center'}
    transition={'background 0.3s ease'}
    _hover={{
      bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
    }}>
    <VisuallyHidden>{label}</VisuallyHidden>
    {children}
  </chakra.button>
);

export default function Footer() {
  return (
    <Box bg={'pink.500'} color={'white'}>
      <Container as={Stack} maxW={'6xl'} py={4} spacing={4} justify={'center'} align={'center'}>
        <figure>
          <a href="#">
            <Image
              src="https://i.ibb.co/d4QdwVQ/pekitas-logo-1.webp"
              alt="Logo de Pekitas Ecotienda"
              boxSize="100px"
              border="1px solid white" // Borde blanco
              borderRadius="full" // Hace el borde redondeado
              objectFit="contain"
              filter="brightness(0) invert(1)"
              loading="lazy"
            />
          </a>
        </figure>
        <Stack direction={'row'} spacing={6}>
          <Box as="a" href={'#'} color="white">
            Home
          </Box>
          <Box as="a" href={'#'} color="white">
            About
          </Box>
          <Box as="a" href={'#'} color="white">
            Blog
          </Box>
          <Box as="a" href={'#'} color="white">
            Contact
          </Box>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('pink.600', 'pink.700')}
      >
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Text>© 2023 Pekitas Ecotienda. Todos los derechos reservados</Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'Twitter'} href={'#'}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={'YouTube'} href={'#'}>
              <FaYoutube />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'#'}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
