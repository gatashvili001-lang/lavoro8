import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
let port = 5001;
try {
  if (process.env.PORT && process.env.PORT !== "undefined") {
    const p = Number(process.env.PORT);
    if (!isNaN(p) && p > 0) port = p;
  }
} catch {
  port = 5001;
}

let basePath = "/";
try {
  if (process.env.BASE_PATH && process.env.BASE_PATH !== "undefined") {
    basePath = process.env.BASE_PATH;
  }
} catch {
  basePath = "/";
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
