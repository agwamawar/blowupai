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
      host: `${process.env.REPL_ID}.id.repl.co`,
      protocol: "wss",
    },
    allowedHosts: [
      `${process.env.REPL_ID}.id.repl.co`,
      ".repl.co",
      ".replit.dev",
    ],
  },
  preview: {
    host: "0.0.0.0",
    port: 5000,
    strictPort: true,
    hmr: {
      clientPort: 443,
      host: `${process.env.REPL_ID}.id.repl.co`,
      protocol: "wss",
    },
  },
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: true,
  },
}));