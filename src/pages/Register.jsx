//src/pages/Register.jsx
import { useState } from 'react';
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; 

export const Register = () => {
  const { signup } = useAuth();
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    birthDate: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await signup(formData.email, formData.password);
      if (user && user.uid) {
        toast({
          title: 'Registro exitoso.',
          description: `Usuario registrado con UID: ${user.uid}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigate('/'); 
      }
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast({
          title: 'El correo ya está registrado.',
          description: 'Por favor, usa un correo diferente o inicia sesión.',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Error al registrar.',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const handleClick = () => setShowPassword(!showPassword);

  return (
    <Box borderWidth="1px" rounded="lg" shadow="1px 1px 3px rgba(0,0,0,0.3)" maxWidth={800} p={6} m="10px auto" as="form" onSubmit={handleSubmit}>
      <Progress hasStripe value={progress} mb="5%" mx="5%" isAnimated />
      
      {step === 1 && (
        <>
          <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
            Registro de Usuario
          </Heading>
          <Flex>
            <FormControl mr="5%">
              <FormLabel htmlFor="first-name" fontWeight={'normal'}>
                Nombre
              </FormLabel>
              <Input id="first-name" name="firstName" placeholder="Nombre" value={formData.firstName} onChange={handleChange} />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="last-name" fontWeight={'normal'}>
                Apellido
              </FormLabel>
              <Input id="last-name" name="lastName" placeholder="Apellido" value={formData.lastName} onChange={handleChange} />
            </FormControl>
          </Flex>
          <FormControl mt="2%">
            <FormLabel htmlFor="birth-date" fontWeight={'normal'}>
              Fecha de Nacimiento
            </FormLabel>
            <Input id="birth-date" name="birthDate" type="date" value={formData.birthDate} onChange={handleChange} />
          </FormControl>
        </>
      )}

      {step === 2 && (
        <>
          <Heading w="100%" textAlign={'center'} fontWeight="normal" mb="2%">
            Detalles Personales
          </Heading>

          <FormControl mt="2%">
            <FormLabel htmlFor="email" fontWeight={'normal'}>
              Correo Electrónico
            </FormLabel>
            <Input id="email" name="email" type="email" placeholder="Correo Electrónico" value={formData.email} onChange={handleChange} />
          </FormControl>

          <FormControl mt="2%">
            <FormLabel htmlFor="password" fontWeight={'normal'}>
              Contraseña
            </FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </>
      )}

      <ButtonGroup mt="5%" w="100%">
        <Flex w="100%" justifyContent="space-between">
          <Flex>
            <Button
              onClick={() => {
                setStep(step - 1);
                setProgress(progress - 33.33);
              }}
              isDisabled={step === 1}
              colorScheme="pink"
              variant="solid"
              w="7rem"
              mr="5%"
            >
              Atrás
            </Button>
            <Button
              w="7rem"
              isDisabled={step === 2}
              onClick={() => {
                setStep(step + 1);
                setProgress(progress + 33.33);
              }}
              colorScheme="pink"
              variant="outline"
            >
              Siguiente
            </Button>
          </Flex>
          {step === 2 && (
            <Button w="7rem" colorScheme="pink" variant="solid" type="submit">
              Registrar
            </Button>
          )}
        </Flex>
      </ButtonGroup>
    </Box>
  );
};
