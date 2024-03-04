import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import SvgLoader from "vite-svg-loader";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [vue(), SvgLoader()],
});
