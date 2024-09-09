import { defineConfig } from 'vite';
import tailwind from 'tailwindcss';
import autoprefixer from 'autoprefixer';
// import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.js',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['@stitches/core'],
    },
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer(),
        tailwind()
      ],
    },
  },
});