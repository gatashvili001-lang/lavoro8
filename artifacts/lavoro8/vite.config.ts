import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { writeSitemapFile } from "./scripts/generate-sitemap";
import type { Plugin } from "vite";

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

function sitemapPlugin(): Plugin {
  return {
    name: "generate-sitemap",
    buildStart() {
      writeSitemapFile();
    },
    configureServer() {
      writeSitemapFile();
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    sitemapPlugin(),
    react(),
    tailwindcss({ optimize: false }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
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
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
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
