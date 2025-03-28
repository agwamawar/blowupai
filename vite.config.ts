
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Ensure that allowedHosts includes the blocked host
export default defineConfig(({ mode }) => ({
  server: {
    host: "0.0.0.0",
    port: 8080,
    hmr: {
      clientPort: 443,
      host: `${process.env.REPL_ID}.id.repl.co`
    },
    allowedHosts: [
      "f8811748-cd66-4bb6-ac9b-c18574be76d3-00-39vlve6z0w0mn.spock.replit.dev",
      "localhost",
      "0.0.0.0"
    ]
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
