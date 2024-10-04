import {
  Box,
  Heading,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Container,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  InputGroup,
  InputLeftElement,
  useToast,
  Flex,
  Avatar,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdOutlineEmail, MdWhatsapp } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { FaInstagram, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { Banner } from "../components/Banner";  
import { RiContactsLine } from "react-icons/ri";
import { GrContact } from "react-icons/gr";



const ContactInfo = () => {
  return (
    <Flex justify="center" mb={10}>
      <Box
        maxW={'500px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow={'2xl'}
        rounded={'md'}
        overflow={'hidden'}
      >
        <Box h={'200px'} w={'full'} bg="pink.500" position="relative">
          <Image
            src={'https://i.ibb.co/d4QdwVQ/pekitas-logo-1.webp'}
            alt="Logo Pekitas Ecotienda"
            borderRadius="full"
            boxSize="150px"
            border="2px solid white"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            objectFit="contain"
            filter="brightness(0) invert(1)"
          />
        </Box>

        <Box p={8} textAlign="center">
          <Heading fontSize={'2xl'} fontWeight={500} fontFamily={'body'}>
            Contáctanos
          </Heading>
          <Text color={'gray.500'} mb={4}>
            Pekitas Ecotienda
          </Text>

          <Stack direction={'column'} spacing={4} align={'center'}>
            <Button
              as="a"
              href="https://wa.me/5491165726162"
              colorScheme="whatsapp"
              leftIcon={<FaWhatsapp />}
              w={'full'}
            >
              WhatsApp: +54 9 11 6572 6162
            </Button>
            <Button
              as="a"
              href="mailto:contacto@pekitas-ecotienda.com"
              colorScheme="pink"
              leftIcon={<FaEnvelope />}
              w={'full'}
            >
              Email: contacto@pekitas-ecotienda.com
            </Button>
            <Button
              as="a"
              href="https://www.instagram.com/pekitasecotienda/"
              colorScheme="pink"
              leftIcon={<FaInstagram />}
              w={'full'}
            >
              Instagram
            </Button>
          </Stack>
        </Box>
      </Box>
    </Flex>
  );
};

export const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    whatsapp: "",
    mensaje: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await addDoc(collection(db, "contact"), {
        nombre: formData.nombre,
        email: formData.email,
        whatsapp: formData.whatsapp,
        mensaje: formData.mensaje,
        timestamp: new Date(),
      });

      toast({
        title: "Mensaje enviado.",
        description: "Tu mensaje ha sido enviado exitosamente.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setFormData({
        nombre: "",
        email: "",
        whatsapp: "",
        mensaje: "",
      });
    } catch (error) {
      toast({
        title: "Error al enviar mensaje.",
        description: "Hubo un problema al enviar tu mensaje, intenta de nuevo.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      
      <Banner />

      <Container maxW="container.md" mt={10} mb={20}>
        <ContactInfo />

        <Box p={8} shadow="md" borderWidth="1px" borderRadius="lg" bg="white">
          <Heading as="h2" size="xl" mb={6} textAlign="center" color="pink.500">
            Escríbenos para un cambio natural con Pekitas Ecotienda
          </Heading>

          <Text mb={6} fontSize="lg" color="gray.600" textAlign="center">
            Completa el formulario y nos pondremos en contacto contigo lo antes
            posible.
          </Text>

          <form onSubmit={handleSubmit}>
            <VStack spacing={6} align="stretch">
              <FormControl id="nombre" isRequired>
                <FormLabel>Nombre</FormLabel>
                <InputGroup borderColor="gray.300">
                  <InputLeftElement pointerEvents="none">
                    <BsPerson color="gray.500" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    placeholder="Tu nombre"
                    focusBorderColor="pink.400"
                    value={formData.nombre}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <InputGroup borderColor="gray.300">
                  <InputLeftElement pointerEvents="none">
                    <MdOutlineEmail color="gray.500" />
                  </InputLeftElement>
                  <Input
                    type="email"
                    placeholder="Tu email"
                    focusBorderColor="pink.400"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </FormControl>

              <FormControl id="whatsapp">
                <FormLabel>Número de WhatsApp</FormLabel>
                <InputGroup borderColor="gray.300">
                  <InputLeftElement pointerEvents="none">
                    <MdWhatsapp color="green" />
                  </InputLeftElement>
                  <Input
                    type="tel"
                    placeholder="Ej: +54 9 11 1234 5678"
                    focusBorderColor="pink.400"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                  />
                </InputGroup>
              </FormControl>

              <FormControl id="mensaje" isRequired>
                <FormLabel>Mensaje</FormLabel>
                <Textarea
                  placeholder="Escribe tu mensaje aquí..."
                  focusBorderColor="pink.400"
                  borderColor="gray.300"
                  size="md"
                  resize="vertical"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                />
              </FormControl>

              <Button
                colorScheme="pink"
                bgGradient='linear(to-br, pink.400, pink.900)'
                size="lg"
                width="full"
                mt={4}
                type="submit"
                isLoading={isLoading}
              >
                Enviar
              </Button>
            </VStack>
          </form>
        </Box>
      </Container>
    </>
  );
};
