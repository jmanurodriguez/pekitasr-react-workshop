import { Box, Image } from "@chakra-ui/react";

export const Banner = () => {
  return (
    <Box width="100%" mt={0} mb={0} p={0}> 
      <Image
        src="https://placehold.co/1920x400/FFB6C1/white/png?text=Banner+Demo+Store"
        alt="Banner Promocional"
        width="100%"
        height="auto"
        loading="lazy"
      />
    </Box>
  );
};
