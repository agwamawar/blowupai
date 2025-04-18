import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(() => {
  const REPL_ID = process.env.REPL_ID;
  const REPL_CLUSTER = process.env.REPLIT_CLUSTER || "id"; // fallback cluster
  const currentHost = `${REPL_ID}.${REPL_CLUSTER}.repl.co`;

  return {
    server: {
      host: "0.0.0.0",
      port: 8080,
      strictPort: true,
      hmr: {
        protocol: "wss",
        host: currentHost,
        clientPort: 443,
      },
      allowedHosts: [
        currentHost,
        "localhost",
        "0.0.0.0"
      ],
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      extensions: [".mjs", ".js", ".mts", ".ts", ".jsx", ".tsx", ".json"],
    },
    define: {
      "process.env": {},
      "process.browser": true,
      "process.version": '"v16.0.0"',
      "process.stdout": "null",
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
  };
});