import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { App } from './src/App';
import theme from './src/theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
