import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendors': ['react', 'react-dom'],
          'firebase-vendors': ['firebase/app', 'firebase/auth'],
          'chakra-ui': ['@chakra-ui/react', '@chakra-ui/icons'],
        },
      },
    },
  },
});
