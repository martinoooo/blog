import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  build: {
    // generate manifest.json in outDir
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: '/path/to/main.js',
    },
  },
});
