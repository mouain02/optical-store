import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      "/api": {
        target: "https://optical-store-uy38.onrender.com",
        changeOrigin: true,
      },
      "/uploads": {
        target: "https://optical-store-uy38.onrender.com",
        changeOrigin: true,
      },
    },
  },
});
