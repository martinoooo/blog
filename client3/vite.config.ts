import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
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
