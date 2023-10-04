import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
    minify: false,
    sourcemap: true,
    rollupOptions: {
      output: {
        format: "esm",
      },
    },
  },
});
