import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // Base URL sesuai nama repo GitHub Pages
  base: '/Nusantara-Rthym-/',
  plugins: [
    react(),
    VitePWA({
      devOptions: { enabled: false },
      registerType: 'autoUpdate',
      manifest: {
        name: 'NusantaraRhythm - Game Budaya Musik Nusantara',
        short_name: 'NusantaraRhythm',
        description: 'Game edukasi 2D interaktif musik tradisional nusantara & kuis lagu nasional gaya Marbel & Quizizz',
        theme_color: '#B45309',
        background_color: '#FFFBEB',
        display: 'standalone',
        orientation: 'portrait',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      },
      workbox: {
        // Jangan precache file mp3 besar - biarkan browser load on-demand
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // max 5MB per file
        runtimeCaching: [
          {
            urlPattern: /\.mp3$/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'audio-cache',
              expiration: { maxEntries: 50, maxAgeSeconds: 7 * 24 * 60 * 60 },
              rangeRequests: true,
            }
          }
        ]
      }
    })
  ],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    // Jangan inline file besar sebagai base64
    assetsInlineLimit: 0,
    // Jangan bundle mp3 ke dalam chunk js - biarkan sebagai file terpisah
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
      }
    }
  },
  // Izinkan Vite mengenali MP3 sebagai asset URL (bukan module)
  assetsInclude: ['**/*.mp3', '**/*.wav', '**/*.ogg'],
})
