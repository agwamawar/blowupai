
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: true,
    hmr: {
      clientPort: 443,
      host: "0.0.0.0",
      protocol: "ws",
    },
    allowedHosts: [
      "f8811748-cd66-4bb6-ac9b-c18574be76d3-00-39vlve6z0w0mn.spock.replit.dev",
      "a23320da-e9bb-4844-9988-eeb00259c658-00-3g6q7os19zd82.picard.replit.dev",
      "localhost",
      "0.0.0.0"
    ],
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json'],
  },
  define: {
    "process.env": {},
    "process.browser": true,
    "process.version": '"v16.0.0"',
    "process.stdout": 'null',
    global: "window",
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    sourcemap: true,
    rollupOptions: {
      external: [],
    },
  },
}));
