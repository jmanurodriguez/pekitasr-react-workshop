import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Image,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  VStack,
  HStack,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { ChevronDownIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { CartWidget } from "../CartWidget/CartWidget";
import { useCategory } from "../../hooks/useCategory";
import { useAuth } from "../../context/AuthContext";

export const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { categories } = useCategory();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const isMobile = useBreakpointValue({ base: true, md: false });
  const logoBoxSize = useBreakpointValue({ base: "50px", sm: "60px", md: "70px" });
  const buttonSize = useBreakpointValue({ base: "xs", md: "sm" });

 
  const [showCategories, setShowCategories] = useState(false);

  const handleCategoryClick = (category) => {
    onClose();
    navigate(`/category/${category}`);
  };

  const NavItem = ({ to, children, onClick }) => (
    <RouterLink to={to} onClick={onClick}>
      <Text
        color="white"
        fontWeight="bold"
        fontSize={{ base: "md", md: "lg" }}
        mb={{ base: 4, md: 0 }}
      >
        {children}
      </Text>
    </RouterLink>
  );

  const NavItems = () => (
    <>
      <NavItem to="/about-us" onClick={onClose}>
        Sobre Nosotros
      </NavItem>

      
      <Menu>
        <MenuButton
          as={Button}
          variant="ghost"
          color="white"
          fontWeight="bold"
          fontSize={{ base: "md", md: "lg" }}
          rightIcon={<ChevronDownIcon />}
          _hover={{ bg: 'pink.600' }}
        >
          Productos
        </MenuButton>
        <MenuList bg="pink.500" border="none">
          {categories.map((category) => (
            <MenuItem
              key={category}
              onClick={() => handleCategoryClick(category)}
              bg="pink.500"
              color="white"
              _hover={{ bg: 'pink.600' }}
            >
              {category.replace('-', ' ')}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>

      <NavItem to="/upcoming-products" onClick={onClose}>
        Próximos Productos
      </NavItem>
      <NavItem to="/contact" onClick={onClose}>
        Contacto
      </NavItem>
    </>
  );

  return (
    <Box bg="pink.500" boxShadow="md" mb={0} width="100%">
      <Flex
        color="white"
        minH="70px"
        py={2}
        px={{ base: 2, md: 4 }}
        align="center"
        justify="space-between"
        flexWrap="wrap"
        width="100%"
      >
     
        <Flex align="center" flex={{ base: 1, md: 'auto' }}>
          <IconButton
            display={{ base: "flex", md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            color="white"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            variant="outline"
            aria-label="Toggle menu"
            size="md"
            mr={2}
          />
          <HStack spacing={6} display={{ base: "none", md: "flex" }}>
            <NavItems />
          </HStack>
        </Flex>

        
        <Flex justify="center" flex={{ base: 1, md: 1 }} px={2}>
          <RouterLink to="/">
            <Image
              src="https://i.ibb.co/d4QdwVQ/pekitas-logo-1.webp"
              alt="Pekitas Logo"
              boxSize={logoBoxSize}
              border="1px solid white"
              borderRadius="full"
              objectFit="contain"
              filter="brightness(20)"
              _hover={{ transform: "scale(1.05)", transition: "0.3s" }}
            />
          </RouterLink>
        </Flex>

      
        <Flex align="center" justify="flex-end" flex={{ base: 1, md: 'auto' }}>
          {!isMobile && currentUser && (
            <Text color="white" mr={4} fontSize="sm">
              Bienvenido, {currentUser.displayName || currentUser.email}
            </Text>
          )}
          {currentUser ? (
            <Button colorScheme="pink" onClick={logout} size={buttonSize} mr={2}>
              Cerrar Sesión
            </Button>
          ) : (
            <HStack spacing={2} mr={2}>
              <RouterLink to="/register">
                <Button colorScheme="pink" size={buttonSize}>
                  Registrarse
                </Button>
              </RouterLink>
              <RouterLink to="/login">
                <Button colorScheme="pink" size={buttonSize}>
                  Iniciar Sesión
                </Button>
              </RouterLink>
            </HStack>
          )}
          <CartWidget />
        </Flex>
      </Flex>

      
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay />
        <DrawerContent bg="pink.500">
          <DrawerCloseButton color="white" />
          <DrawerHeader color="white">Menú</DrawerHeader>
          <DrawerBody>
            <VStack align="stretch" spacing={4}>
              <NavItem to="/about-us" onClick={onClose}>
                Sobre Nosotros
              </NavItem>

            
              <Box>
                <Button
                  variant="ghost"
                  color="white"
                  fontWeight="bold"
                  fontSize="md"
                  width="100%"
                  justifyContent="flex-start"
                  rightIcon={<ChevronDownIcon />}
                  onClick={() => setShowCategories(!showCategories)}
                >
                  Productos
                </Button>
                {showCategories && (
                  <VStack align="start" pl={4} spacing={2} mt={2}>
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant="ghost"
                        onClick={() => handleCategoryClick(category)}
                        w="full"
                        justifyContent="flex-start"
                        color="white"
                        textTransform="capitalize"
                        _hover={{ bg: 'pink.600' }}
                      >
                        {category.replace('-', ' ')}
                      </Button>
                    ))}
                  </VStack>
                )}
              </Box>

              <NavItem to="/upcoming-products" onClick={onClose}>
                Próximos Productos
              </NavItem>
              <NavItem to="/contact" onClick={onClose}>
                Contacto
              </NavItem>

              {currentUser && (
                <Text color="white" fontSize="md">
                  Bienvenido, {currentUser.displayName || currentUser.email}
                </Text>
              )}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
