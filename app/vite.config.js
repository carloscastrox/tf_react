//modificar para PWA

// // import { defineConfig } from 'vite'
// // import react from '@vitejs/plugin-react'

// // // https://vite.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// // })


//npm install vite-plugin-pwa
//npm install vite-plugin-pwa --legacy-peer-deps
// npm run build
// npm run preview
// se elimina este archivo

// probar npm install serve VITE.CONFI-g y luego serve -s build

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Estrategia de Service Worker: 'generateSW' (auto) o 'injectManifest' (custom)
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", 'hero.png', "robots.txt"],
      workbox: {
        navigateFallback: "/index.html",
        globPatterns: ["**/*.{js,jsx,css,html,ico,png,svg,jpg}"],
      },
      manifest: {
        name: "Mi Aplicación React PWA",
        short_name: "ReactPWA",
        description: "Una increíble PWA creada con Vite y React",
        scope: "/",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#090836",

        screenshots: [
          {
            src: "/img/pwa-1200x581.png",
            sizes: "1200x581",
            type: "image/png",
            form_factor: "narrow",
          },
          {
            src: "/img/pwa-1200x581.png",
            sizes: "1200x581",
            type: "image/png",
            form_factor: "wide",
          },
        ],
        icons: [
          {
            src: "/img/logosena_512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
