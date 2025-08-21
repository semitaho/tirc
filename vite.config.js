import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  clean: true,
  root: 'app',
  plugins: [react()],
    base: '/tirc/',  // 👈 must match repo name

});
