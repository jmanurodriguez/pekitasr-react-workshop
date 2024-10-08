import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; 

export const Hero = () => {
  const navigate = useNavigate(); 

  const handleDiscoverMore = () => {
    navigate("/upcoming-products"); 
  };

  const handleHowToBuy = () => {
    navigate("/how-to-buy"); 
  };

  return (
    <Container maxW={"7xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 16, md: 24 }}
        direction={{ base: "column", md: "row" }}
        textAlign={{ base: "center", md: "left" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "pink.400",
                zIndex: -1,
              }}
            >
              ¡Explora Pekitas Ecotienda!
            </Text>
            <br />
            <Text as={"span"} color={"pink.400"}>
              Productos eco-amigables para todos
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Pekitas Ecotienda es tu destino para productos sostenibles y
            amigables con el medio ambiente. Desde cosméticos naturales hasta
            productos biodegradables, encuentra todo lo que necesitas para
            cuidar de ti y del planeta.
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              colorScheme={"pink"}
              bgGradient='linear(to-br, pink.400, pink.900)'
              _hover={{ bg: "pink.500" }}
              onClick={handleDiscoverMore} 
            >
              Descubre Más
            </Button>
            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              bgGradient='linear(to-br, gray.200, pink.500)'
              _hover={{ bg: "gray.400" }}
              onClick={handleHowToBuy} 
            >
              ¿Cómo comprar?
            </Button>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Blob
            w={"150%"}
            h={"150%"}
            position={"absolute"}
            top={"-20%"}
            left={0}
            zIndex={-1}
            color={useColorModeValue("pink.50", "pink.400")}
          />
          <Box
            position={"relative"}
            height={{ base: "250px", sm: "300px", md: "400px" }}
            rounded={"2xl"}
            boxShadow={"2xl"}
            width={"full"}
            overflow={"hidden"}
          >
            <Image
              alt={"Hero Image"}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={"100%"}
              src={"https://i.ibb.co/SvzmqmF/sales-31-11zon.webp"}
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
};

const Blob = (props) => {
  return (
    <Icon
      width={"100%"}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};
