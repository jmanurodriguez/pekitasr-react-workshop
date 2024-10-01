// main.jsx
import React from 'react'; // Importación necesaria
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './src/App';
import theme from './src/theme';  

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router> {/* Envolvemos la aplicación con Router */}
      <ChakraProvider theme={theme}>  
        <App />
      </ChakraProvider>
    </Router>
  </React.StrictMode>,
);
