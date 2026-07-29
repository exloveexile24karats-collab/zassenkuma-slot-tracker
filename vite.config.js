import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" makes the build use relative asset paths, so it works whether
// GitHub Pages serves it at the repo root or at /<repo-name>/.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
