import {
  Box,
  Heading,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Container,
  Flex,
  Icon,
} from "@chakra-ui/react";
import { FaLeaf } from "react-icons/fa";
import { Banner } from "../components/Banner";

const BlogTags = ({ tags, marginTop }) => {
  return (
    <HStack spacing={2} marginTop={marginTop}>
      {tags.map((tag) => (
        <Tag size={"md"} variant="solid" colorScheme="pink" key={tag}>
          {tag}
        </Tag>
      ))}
    </HStack>
  );
};

const BlogAuthor = ({ date }) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Text color="gray.500" fontSize="sm">
        {new Date(date).toLocaleDateString()}
      </Text>
    </HStack>
  );
};

const upcomingProducts = [
  {
    id: 1,
    title: "Jabonera Bambú",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "https://placehold.co/400x400/B6E3E9/white/png?text=Jabonera+Bambu",
    expectedDate: "2024-06-01"
  },
  {
    id: 2,
    title: "Kit Zero Waste",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    image: "https://placehold.co/400x400/B6E3E9/white/png?text=Kit+Zero",
    expectedDate: "2024-07-15"
  },
  {
    id: 3,
    title: "Set Sustentable",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate.",
    image: "https://placehold.co/400x400/B6E3E9/white/png?text=Set+Sustentable",
    expectedDate: "2024-08-01"
  }
];

export const UpcomingProducts = () => {
  return (
    <Box as="section" w="100%" m="0" p="0">
      <Banner />

      <Container maxW="7xl" p="12">
        <Heading as="h1" color="pink.500" textAlign="center" mb={10}>
          Próximos Productos
        </Heading>

        <Flex
          direction={{ base: "column", md: "row" }}
          alignItems="center"
          mb={20}
        >
          <Box flex="1" mr={{ base: 0, md: 10 }} mb={{ base: 6, md: 0 }}>
            <Image
              borderRadius="lg"
              src="https://placehold.co/400x400/B6E3E9/white/png?text=Jabonera"
              alt="Producto próximo"
              objectFit="cover"
              w="100%"
              h="100%"
              maxH="400px"
              transition="0.3s ease-in-out"
              _hover={{ transform: "scale(1.05)" }}
            />
          </Box>

          <Box flex="1">
            <BlogTags tags={["Próximamente", "Nuevo"]} />
            <Heading marginTop="1" color="pink.400">
              Espuma de Limpieza
            </Heading>
            <Text
              as="p"
              marginTop="2"
              color="gray.700"
              fontSize="lg"
              textAlign="justify"
            >
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam lorem ipsum dolor sit amet consectetur adipisicing elit.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            </Text>
            <BlogAuthor date={new Date()} />
          </Box>



        </Flex>

        <Flex justifyContent="center" alignItems="center" my={20}>
          <Divider borderColor="pink.500" width="40%" />
          <Icon as={FaLeaf} color="pink.500" mx={2} boxSize={8} />
          <Divider borderColor="pink.500" width="40%" />
        </Flex>
        <Flex
          direction={{ base: "column", md: "row" }}
          alignItems="center"
          mb={50}
        >
          <Box flex="1" order={{ base: 2, md: 1 }}>
            <Heading marginTop="1" color="pink.400">
              <BlogTags tags={["Próximamente", "Nuevo"]} />
              Jabón Liquido Aromas "Sandía, Chicle y Caramelo" (tipo gel de ducha)
            </Heading>
            <Text
              as="p"
              marginTop="2"
              color="gray.700"
              fontSize="lg"
              textAlign="justify"
            >
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam lorem ipsum dolor sit amet consectetur adipisicing elit.  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            </Text>
            <BlogAuthor date={new Date()} />
          </Box>

          <Box
            flex="1"
            ml={{ base: 0, md: 10 }}
            mb={{ base: 6, md: 0 }}
            order={{ base: 1, md: 2 }}
          >
            <Image
              borderRadius="lg"
              src="https://placehold.co/400x400/B6E3E9/white/png?text=Jabonera"
              alt="Segundo Producto próximo"
              objectFit="cover"
              w="100%"
              h="100%"
              maxH="400px"
              transition="0.3s ease-in-out"
              _hover={{ transform: "scale(1.05)" }}
            />
          </Box>
        </Flex>

        {/* <Flex justifyContent="center" alignItems="center" my={20}> 
          <Divider borderColor="pink.500" width="40%" />
          <Icon as={FaLeaf} color="pink.500" mx={2} boxSize={8} />
          <Divider borderColor="pink.500" width="40%" />
        </Flex> */}

        <Flex
          direction={{ base: "column", md: "row" }}
          alignItems="center"
          mb={20}
        >
          {/* <Box flex="1" mr={{ base: 0, md: 10 }} mb={{ base: 6, md: 0 }}> 
            <Image
              borderRadius="lg"
              src="https://res.cloudinary.com/dpcpcnqmq/image/upload/v1727830306/urucum_qoky7b.jpg" 
              alt="Oleo Urucum"
              objectFit="cover"
              w="100%"
              h="100%"
              maxH="400px"
              transition="0.3s ease-in-out"
              _hover={{ transform: 'scale(1.05)' }}
            />
          </Box> */}

          {/* <Box flex="1">
            <BlogTags tags={['Próximamente', 'Especial']} />
            <Heading marginTop="1" color="pink.400">
            Oleo Urucum
            </Heading>
            <Text
              as="p"
              marginTop="2"
              color="gray.700"
              fontSize="lg"
              textAlign="justify"
            >
             
            </Text>
            <BlogAuthor date={new Date()} />
          </Box> */}
        </Flex>
      </Container>
    </Box>
  );
};
