
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  const REPL_ID = process.env.REPL_ID;
  const REPL_CLUSTER = process.env.REPLIT_CLUSTER || "id";
  const currentHost = REPL_ID ? `${REPL_ID}.${REPL_CLUSTER}.repl.co` : "localhost";

  return {
    server: {
      host: "0.0.0.0",
      port: 8080,
      strictPort: true,
      hmr: mode === "development" ? {
        protocol: "wss",
        host: currentHost,
        clientPort: 443,
      } : false,
      allowedHosts: [
        currentHost,
        "localhost",
        "0.0.0.0"
      ],
    },
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"],
    },
    build: {
      outDir: "dist",
      sourcemap: false,
      minify: "esbuild",
      target: "esnext",
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            ui: ['@radix-ui/react-tabs', '@radix-ui/react-dialog', '@radix-ui/react-select']
          }
        }
      }
    },
    define: {
      global: 'globalThis',
    },
    optimizeDeps: {
      include: ['react', 'react-dom']
    }
  };
});
