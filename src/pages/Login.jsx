// src/pages/Login.jsx
import {
    Button,
    Checkbox,
    Flex,
    Text,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Image,
    Box,
    useToast,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { useAuth } from '../context/AuthContext';
  import { useNavigate } from 'react-router-dom';
  
  export const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const { loginWithEmail, loginWithGoogle } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await loginWithEmail(formData.email, formData.password);
            toast({
                title: 'Inicio de sesión exitoso.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            navigate('/');  // Redirigir a la página principal o la que desees
        } catch (error) {
            toast({
                title: 'Error al iniciar sesión.',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };
  
    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Heading fontSize={'2xl'}>Inicia sesión en tu cuenta</Heading>
                    <form onSubmit={handleSubmit}>
                        <FormControl id="email">
                            <FormLabel>Correo electrónico</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </FormControl>
                        <FormControl id="password" mt={4}>
                            <FormLabel>Contraseña</FormLabel>
                            <Input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </FormControl>
                        <Stack spacing={6} mt={4}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}
                            >
                                <Checkbox>Recordarme</Checkbox>
                                <Text color={'pink.500'}>¿Olvidaste tu contraseña?</Text>
                            </Stack>
                            <Button
                                type="submit"
                                colorScheme={'pink'}
                                variant={'solid'}
                                isLoading={loading}
                            >
                                Iniciar sesión
                            </Button>
                            <Button
                                colorScheme="blue"
                                variant="outline"
                                onClick={loginWithGoogle}
                            >
                                Iniciar sesión con Google
                            </Button>
                        </Stack>
                    </form>
                </Stack>
            </Flex>
  
            <Flex flex={1} justify="center" align="center">
                <Box
                    bg="pink.50"
                    borderRadius="lg"
                    p={6}
                    boxShadow="lg"
                >
                    <Image
                        alt={'Imagen de inicio de sesión'}
                        objectFit={'cover'}
                        src={'https://res.cloudinary.com/dpcpcnqmq/image/upload/v1722792525/Agua_de_rosas_qkxkmu.png'}
                        borderRadius="lg"
                        maxW="400px"
                        mx="auto"
                    />
                </Box>
            </Flex>
        </Stack>
    );
  };
  