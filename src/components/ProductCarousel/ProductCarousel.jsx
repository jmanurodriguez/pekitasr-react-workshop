import React from 'react';
import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Container,
} from '@chakra-ui/react';
import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import Slider from 'react-slick';
import { Item } from '../Item/Item';

// Datos de ejemplo para el carrusel
const carouselProducts = [
  {
    id: "carousel-001",
    nombre: "Jabonera Ecológica",
    precio: 29.99,
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
    imagen: "https://placehold.co/400x400/B6E3E9/white/png?text=Jabonera",
    categorias: ["Eco", "Destacados"],
    stock: 10,
    isNew: true
  },
  {
    id: "carousel-002",
    nombre: "Kit Sustentable",
    precio: 59.99,
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam.",
    imagen: "https://placehold.co/400x400/B6E3E9/white/png?text=Kit+Sustentable",
    categorias: ["Eco", "Premium"],
    stock: 8,
    isNew: true
  },
  {
    id: "carousel-003",
    nombre: "Vela Artesanal",
    precio: 29.99,
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor.",
    imagen: "https://placehold.co/400x400/B6E3E9/white/png?text=Vela+Artesanal",
    categorias: ["Hogar", "Destacados"],
    stock: 15
  },
  {
    id: "carousel-004",
    nombre: "Set Facial Natural",
    precio: 89.99,
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Excepteur sint occaecat cupidatat.",
    imagen: "https://placehold.co/400x400/B6E3E9/white/png?text=Set+Facial",
    categorias: ["Cuidado", "Premium"],
    stock: 7,
    isNew: true
  }
];

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const ProductCarousel = () => {
  const [slider, setSlider] = React.useState(null);
  const top = useBreakpointValue({ base: '90%', md: '70%' });
  const side = useBreakpointValue({ base: '10px', md: '40px' });

  return (
    <Box position={'relative'} height={'600px'} width={'full'} overflow={'hidden'} p={4}>
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />

      <IconButton
        aria-label="left-arrow"
        variant="ghost"
        position="absolute"
        left={side}
        top={top}
        color="pink.200"
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickPrev()}
      >
        <BiLeftArrowAlt size="40px" />
      </IconButton>

      <IconButton
        aria-label="right-arrow"
        variant="ghost"
        position="absolute"
        right={side}
        color="pink.200"
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>

      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {carouselProducts.map((product) => (
          <Box key={product.id} height={'auto'} position="relative" px={4}>
            <Container size="container.lg" height="auto" position="relative">
              <Stack spacing={6} w={'full'} maxW={'lg'} position="relative">
                <Item producto={product} />
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};
