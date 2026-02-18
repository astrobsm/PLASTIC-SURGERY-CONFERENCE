import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icon-192.png', 'icon-512.png', 'logo-unth.png'],
      manifest: {
        name: 'DFU: Myths, Pathophysiology & Management',
        short_name: 'DFU Presentation',
        description: 'Clinical conference presentation on Diabetic Foot Ulcer',
        theme_color: '#0b8a3e',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        navigateFallback: 'index.html',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/eutils\.ncbi\.nlm\.nih\.gov\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'pubmed-cache',
              expiration: { maxEntries: 100, maxAgeSeconds: 86400 * 7 },
              networkTimeoutSeconds: 5,
            },
          },
          {
            urlPattern: /^https:\/\/api\.crossref\.org\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'crossref-cache',
              expiration: { maxEntries: 100, maxAgeSeconds: 86400 * 7 },
              networkTimeoutSeconds: 5,
            },
          },
        ],
      },
    }),
  ],
})
