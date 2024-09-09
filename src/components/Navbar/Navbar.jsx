import {
  Box,
  Flex,
  IconButton,
  Stack,
  Collapse,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { BsCartFill } from "react-icons/bs";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import { useCategory } from "../../hooks/useCategory";

export const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { categories } = useCategory();

  return (
    <Box bg={'pink.500'} boxShadow="md" mb={4}>
      <Flex
        color="white"
        minH="70px"
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={"center"}
        justify={"space-between"}
      >
        <Flex flex={{ base: 1, md: "auto" }} display={{ base: "flex", md: "none" }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>

        {/* Logo */}
        <Flex justify={{ base: "center", md: "center" }} flex={1}>
          <RouterLink to="/">
            <Image
              src="https://i.ibb.co/d4QdwVQ/pekitas-logo-1.webp"
              alt="Pekitas Logo"
              boxSize="100px"
              objectFit="contain"
              mx="auto"
              filter="brightness(0) invert(1)" // Hace que el logo sea blanco
              _hover={{ transform: 'scale(1.05)', transition: '0.3s' }} // Hover effect
            />
          </RouterLink>
        </Flex>

        {/* Cart Button */}
        <Stack flex={{ base: 1, md: 0 }} justify={"flex-end"} direction={"row"} spacing={6}>
          <RouterLink to="/cart">
            <IconButton
              icon={<BsCartFill />}
              aria-label="Carrito"
              size="lg"
              color="white"
              variant="ghost"
              _hover={{ color: 'yellow.400', transform: 'scale(1.1)' }} // Hover effect
            />
          </RouterLink>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav categories={categories} />
      </Collapse>

      <Flex display={{ base: "none", md: "flex" }} bg={'pink.500'} p={4}>
        <Accordion allowToggle w="full" maxW="container.lg" mx="auto">
          <AccordionItem border="none">
            <h2>
              <AccordionButton
                _expanded={{ bg: "pink.600", color: "white" }}
                w="200px" // Ajusta el ancho del botón de categorías
                maxW="200px" // Limita el ancho máximo para que no sea muy ancho
              >
                <Box flex="1" textAlign="left" fontSize="lg" color="white">
                  Categorías
                </Box>
                <AccordionIcon w={4} h={4} /> {/* Ajuste del tamaño de la flecha */}
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} bg={'pink.500'} color="white" rounded="md">
              {categories.map((category) => (
                <RouterLink key={category} to={`/category/${category}`}>
                  <Text mb={2} textTransform="capitalize">{category}</Text>
                </RouterLink>
              ))}
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Flex>
    </Box>
  );
};

const MobileNav = ({ categories }) => (
  <Stack bg={'pink.500'} p={4} display={{ md: "none" }}>
    <Accordion allowToggle>
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left" color="white">
            Categorías
          </Box>
          <AccordionIcon w={4} h={4} /> {/* Reducción del tamaño de la flecha en mobile */}
        </AccordionButton>
        <AccordionPanel>
          {categories.map((category) => (
            <RouterLink key={category} to={`/category/${category}`}>
              <Text color="white" textTransform="capitalize">{category}</Text>
            </RouterLink>
          ))}
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  </Stack>
);
