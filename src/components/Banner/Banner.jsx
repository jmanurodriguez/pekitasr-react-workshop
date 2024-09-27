// src/components/Banner/Banner.jsx
import { Box, Image } from "@chakra-ui/react";

export const Banner = () => {
  return (
    <Box width="100%" mt={0} mb={0} p={0}> {/* Ajusta los márgenes y padding */}
      <Image
        src="https://res.cloudinary.com/dpcpcnqmq/image/upload/v1722779555/Banner_web_horizontal_nuevos_ingresos_maquillaje_gradiente_colorido_1920_x_300_px_otpzld.png"
        alt="Banner Promocional"
        width="100%"
        height="auto"
        loading="lazy"
      />
    </Box>
  );
};
