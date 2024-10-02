import { memo } from 'react';
import { HStack, Image, Text } from '@chakra-ui/react';

export const BlogAuthor = memo(({ name, date }) => (
  <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
    <Image
      borderRadius="full"
      boxSize="40px"
      src="https://ejemplo.com/avatar.jpg"
      alt={`Avatar de ${name}`}
    />
    <Text fontWeight="medium">{name}</Text>
    <Text>—</Text>
    <Text>{new Date(date).toLocaleDateString()}</Text>
  </HStack>
));
