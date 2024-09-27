//src/components/ProductCarousel/ProductCarousel.jsx
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
import { Item } from '../Item/Item'; // Asegúrate de que la ruta sea correcta

// Configuración del carrusel
const settings = {
  dots: true,
  arrows: false,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 3, // Cambiar a 3 para mostrar 3 productos
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2, // Mantener 3 productos en pantallas grandes
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2, // Mostrar 2 productos en pantallas medianas
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1, // Mostrar 1 producto en pantallas pequeñas
      },
    },
  ],
};

export const ProductCarousel = ({ products }) => {
  const [slider, setSlider] = React.useState(null);
  const top = useBreakpointValue({ base: '90%', md: '70%' });
  const side = useBreakpointValue({ base: '30%', md: '40px' });

  return (
    <Box position={'relative'} height={'600px'} width={'full'} overflow={'hidden'}>
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
        top={top}
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <BiRightArrowAlt size="40px" />
      </IconButton>
      
      <Slider {...settings} ref={(slider) => setSlider(slider)}>
        {products.map((product) => (
          <Box key={product.id} height={'auto'} position="relative">
            <Container size="container.lg" height="auto" position="relative">
              <Stack spacing={6} w={'full'} maxW={'lg'} position="relative">
                <Item producto={product} /> {/* Renderizamos cada producto */}
              </Stack>
            </Container>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};
