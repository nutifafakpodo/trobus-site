import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// Static SPA. BASE_PATH lets the same build serve from a sub-path
// (GitHub Pages serves project sites at /<repo>/); Vercel serves at "/".
const basePath = process.env.BASE_PATH ?? "/";
const port = Number(process.env.PORT ?? 5178);

export default defineConfig({
  base: basePath,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "src") },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: { port, strictPort: true },
  preview: { port },
});
