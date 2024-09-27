import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@hooks': path.resolve(__dirname, './src/hooks'),
      // Otros alias...
    },
  },
  build: {
    outDir: 'dist',  // Aquí se definirá la carpeta donde se guardará el build
    rollupOptions: {
      input: './index.html',  // Asegúrate de que esté apuntando a tu index.html
    },
  },
});
