
import { Box, Image } from "@chakra-ui/react";

export const Banner = () => {
  return (
    <Box width="100%" mt={0} mb={0} p={0}> 
      <Image
        src="https://res.cloudinary.com/dpcpcnqmq/image/upload/v1728071475/Banner_web_horizontal_nuevos_ingresos_maquillaje_gradiente_colorido_1_svoid9.png"
        alt="Banner Promocional"
        width="100%"
        height="auto"
        loading="lazy"
      />
    </Box>
  );
};
