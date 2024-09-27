import React, { useState, useEffect } from 'react';
import { Box, Stack, Text, Button, useToast } from '@chakra-ui/react';
import { FcLock } from 'react-icons/fc';

export function SimpleCookiePreference({ onAccept, onCancel }) {
  const [showBanner, setShowBanner] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const cookiePreference = localStorage.getItem('cookiePreference');
    if (!cookiePreference) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    setShowBanner(false);
    localStorage.setItem('cookiePreference', 'accepted');
    if (onAccept) {
      onAccept();
    }
    toast({
      title: "Cookies aceptadas",
      description: "Gracias por aceptar nuestras cookies.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleCancel = () => {
    setShowBanner(false);
    localStorage.setItem('cookiePreference', 'rejected');
    if (onCancel) {
      onCancel();
    }
    toast({
      title: "Cookies rechazadas",
      description: "Has rechazado nuestras cookies. Algunas funciones pueden no estar disponibles.",
      status: "warning",
      duration: 5000,
      isClosable: true,
    });
  };

  if (!showBanner) {
    return null;
  }

  return (
    <Box 
      position="sticky" 
      top={0} 
      left={0} 
      right={0} 
      zIndex={9999} 
      bg="white" 
      boxShadow="md"
      p={4}
    >
      <Stack 
        direction={{ base: 'column', md: 'row' }} 
        justifyContent="space-between" 
        alignItems="center" 
        spacing={4}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <FcLock size="24px" />
          <Text fontWeight="semibold" fontSize="sm">
            Usamos cookies para mejorar tu experiencia en nuestro sitio.
          </Text>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button size="sm" variant="outline" colorScheme="red" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button size="sm" colorScheme="green" onClick={handleAccept}>
            OK
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}