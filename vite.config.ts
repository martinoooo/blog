import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '#components/',
        replacement: path.join(__dirname, './src/components/'),
      },
      {
        find: '#constants/',
        replacement: path.join(__dirname, './src/constants/'),
      },
      { find: '#api/', replacement: path.join(__dirname, './src/api/') },
    ],
  },
});
