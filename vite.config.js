import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Served from https://mcui1997.github.io/cybersecurity-blog/
export default defineConfig({
  plugins: [react()],
  base: '/cybersecurity-blog/',
});
