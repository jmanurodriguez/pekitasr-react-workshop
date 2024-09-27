//src/pages/Contact.jsx
import {
    Container,
    Box,
    Heading,
    Text,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    VStack,
    InputGroup,
    InputLeftElement,
    useToast,
  } from "@chakra-ui/react";
  import { MdOutlineEmail, MdWhatsapp } from "react-icons/md";
  import { BsPerson } from "react-icons/bs";
  import { useState } from "react";
  import { collection, addDoc } from "firebase/firestore";
  import { db } from "../firebase/config";
  
  export const Contact = () => {
    const [formData, setFormData] = useState({
      nombre: "",
      email: "",
      whatsapp: "",
      mensaje: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();  // Chakra UI para mostrar notificaciones
  
    // Manejar los cambios en los inputs
    const handleInputChange = (e) => {
      const { id, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    };
  
    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
  
      try {
        // Añadir los datos del formulario a Firestore
        await addDoc(collection(db, "contact"), {
          nombre: formData.nombre,
          email: formData.email,
          whatsapp: formData.whatsapp,
          mensaje: formData.mensaje,
          timestamp: new Date(), // Agregar fecha y hora
        });
  
        // Mostrar notificación de éxito
        toast({
          title: "Mensaje enviado.",
          description: "Tu mensaje ha sido enviado exitosamente.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
  
        // Limpiar el formulario
        setFormData({
          nombre: "",
          email: "",
          whatsapp: "",
          mensaje: "",
        });
      } catch (error) {
        // Mostrar notificación de error
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
      <Container maxW="container.md" mt={10} mb={20}>
        <Box p={8} shadow="md" borderWidth="1px" borderRadius="lg" bg="white">
          {/* Título principal */}
          <Heading as="h2" size="xl" mb={6} textAlign="center" color="pink.500">
            Escríbenos para un cambio natural con Pekitas Ecotienda
          </Heading>
  
          <Text mb={6} fontSize="lg" color="gray.600" textAlign="center">
            Completa el formulario y nos pondremos en contacto contigo lo antes posible.
          </Text>
  
          <form onSubmit={handleSubmit}>
            <VStack spacing={6} align="stretch">
              {/* Campo para nombre */}
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
  
              {/* Campo para email */}
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
  
              {/* Campo para WhatsApp */}
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
  
              {/* Campo para mensaje */}
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
  
              {/* Botón para enviar */}
              <Button
                colorScheme="pink"
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
    );
  };
  