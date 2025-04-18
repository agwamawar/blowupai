
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: true,
    hmr: {
      clientPort: 443,
      host: `${process.env.REPL_ID}.id.replit.co`,
      protocol: "wss",
    },
    allowedHosts: [
      "f8811748-cd66-4bb6-ac9b-c18574be76d3-00-39vlve6z0w0mn.spock.replit.dev",
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
