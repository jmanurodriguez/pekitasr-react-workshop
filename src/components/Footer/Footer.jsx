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
import { FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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
    <Box bg={'pink.400'} color={'white'}>
      <Container as={Stack} maxW={'6xl'} py={4} spacing={4} justify={'center'} align={'center'}>
        <figure>
          <Link to="/">
            <Image
              src="https://placehold.co/100x100/pink/white/png?text=Demo+Logo"
              alt="Logo Demo"
              boxSize="100px"
              border="1px solid white"
              borderRadius="full"
              objectFit="contain"
              filter="brightness(0) invert(1)"
              loading="lazy"
            />
          </Link>
        </figure>
        <Stack direction={'row'} spacing={6}>
          <Link to="/" style={{ color: 'white' }}>
            Home
          </Link>
          <Link to="/about-us" style={{ color: 'white' }}>
            Sobre Nosotros
          </Link>
          <Link to="/#productos" style={{ color: 'white' }}>
            Productos
          </Link>
          <Link to="/contact" style={{ color: 'white' }}>
            Contacto
          </Link>
        </Stack>
      </Container>

      <Box borderTopWidth={1} borderStyle={'solid'} borderColor={useColorModeValue('pink.600', 'pink.700')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Text>© 2024 Demo Store. Todos los derechos reservados</Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'WhatsApp'} href={'https://wa.me/1234567890?text=Hola,%20me%20interesa%20saber%20más'}>
              <FaWhatsapp />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'#'}>
              <FaInstagram />
            </SocialButton>
            <SocialButton label={'Email'} href={'mailto:demo@example.com'}>
              <FaEnvelope />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
