import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Icon,
  Text,
  Stack,
  HStack,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import {
  FaShoppingCart,
  FaCreditCard,
  FaTruck,
  FaUser,
  FaClipboardList,
  FaWhatsapp,
} from 'react-icons/fa';
import { Banner } from "../components/Banner";

const features = [
  {
    id: 1,
    title: 'Logueate a nuestra página',
    text: 'Ingresa a nuestra página, puedes registrarte de forma manual y entrar con tu nuevo usuario o loguearte con Google.',
    icon: FaUser,
  },
  {
    id: 2,
    title: 'Selecciona tus productos',
    text: 'Explora nuestra tienda y añade los productos eco-amigables que deseas comprar.',
    icon: FaShoppingCart,
  },
  {
    id: 3,
    title: 'Añade al carrito',
    text: 'Revisa tu carrito de compras y verifica los productos seleccionados.',
    icon: FaClipboardList,
  },
  {
    id: 4,
    title: 'Ir al carrito',
    text: 'Haz clic en el ícono del carrito en la esquina superior derecha. Una vez que corrobores los productos que quieres comprar, haz clic en "Ir al Checkout".',
    icon: FaShoppingCart,
  },
  {
    id: 5,
    title: 'Enviar pedido',
    text: 'Revisa el detalle del precio de cada producto y el total final. Aplica un código promocional si tienes uno y finaliza haciendo clic en "Enviar pedido por WhatsApp".',
    icon: FaWhatsapp,
  },
  {
    id: 6,
    title: 'Coordinar envío',
    text: 'Finalizada la compra, coordinaremos el tipo de envío contigo. Los productos llegarán en 24 a 72 horas hábiles (envíos al interior pueden tardar más según el correo).',
    icon: FaTruck,
  },
];

export const HowToBuy = () => {
  return (
    <Box
      minH="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Banner />
      <Box flex="1">
        <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'} mt={10}>
          <Heading fontSize={'3xl'} color="pink.400">
            ¿Cómo comprar en Pekitas Ecotienda?
          </Heading>
          <Text color={'gray.600'} fontSize={'xl'}>
            Sigue estos simples pasos para realizar tu compra en nuestra tienda online.
          </Text>
        </Stack>

        <Container maxW={'6xl'} mt={10} mb={10}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            {features.map((feature) => (
              <HStack key={feature.id} align={'top'}>
                <Box color="pink.400" px={2}>
                  <Icon as={feature.icon} w={8} h={8} />
                </Box>
                <VStack align={'start'}>
                  <Text fontWeight={600} color="pink.600">
                    {feature.title}
                  </Text>
                  <Text color={'gray.600'}>{feature.text}</Text>
                </VStack>
              </HStack>
            ))}
          </SimpleGrid>
        </Container>

        <Box bg={useColorModeValue('gray.50', 'gray.800')} py={10}>
          <Container maxW={'5xl'}>
            <Stack spacing={4} textAlign={'center'}>
              <Heading fontSize={'2xl'} color="pink.400">
                Métodos de Pago y Envío
              </Heading>
              <Text color={'gray.600'} fontSize={'lg'}>
                En Pekitas Ecotienda te ofrecemos múltiples formas de pago para
                facilitar tus compras:
              </Text>
            </Stack>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mt={8}>
              <VStack align={'start'}>
                <Icon as={FaCreditCard} color="pink.400" w={8} h={8} />
                <Text fontWeight={600} color="pink.600">
                  Pago en Efectivo
                </Text>
                <Text color={'gray.600'}>
                  Realiza tu pago en efectivo al coordinar la entrega.
                </Text>
              </VStack>

              <VStack align={'start'}>
                <Icon as={FaCreditCard} color="pink.400" w={8} h={8} />
                <Text fontWeight={600} color="pink.600">
                  Transferencia Bancaria
                </Text>
                <Text color={'gray.600'}>
                  Puedes realizar una transferencia a nuestra cuenta bancaria.
                </Text>
              </VStack>

              <VStack align={'start'}>
                <Icon as={FaCreditCard} color="pink.400" w={8} h={8} />
                <Text fontWeight={600} color="pink.600">
                  Mercado Pago
                </Text>
                <Text color={'gray.600'}>
                  Paga de manera segura utilizando Mercado Pago, con opciones
                  para tarjeta de crédito y débito.
                </Text>
              </VStack>
            </SimpleGrid>

            <Stack mt={10} textAlign={'center'}>
              <Text fontSize={'lg'} color={'gray.600'}>
                Envío a coordinar. Próximamente podrás comprar en cuotas con los
                medios habilitados de Mercado Pago, para facilitar tus compras a largo plazo.
              </Text>
            </Stack>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};
