import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Plan Lens',
        short_name: 'Plan Lens',
        description: 'Recognize a plant in realtime, offline',
        theme_color: '#4AD42B',
        background_color: '#4AD42B',
        orientation: 'portrait',
        shortcuts: [
          /*  {
             'name': 'Take a Snapshot',
             'short_name': 'Snapshot',
             'description': 'Take a Snapshot',
             'url': '/',
             'icons': [{ 'src': '/pwa/phone.png', 'sizes': '512x512' }]
           }, */
        ],
        icons: [
          {
            src: '/pwa/icon-48.png',
            sizes: '48x48',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/pwa/icon-72.png',
            sizes: '72x72',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/pwa/icon-96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/pwa/icon-128.png',
            sizes: '128x128',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/pwa/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/pwa/icon-384.png',
            sizes: '384x384',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/pwa/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/pwa/icon-maskable-48.png',
            sizes: '48x48',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/pwa/icon-maskable-72.png',
            sizes: '72x72',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/pwa/icon-maskable-96.png',
            sizes: '96x96',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/pwa/icon-maskable-128.png',
            sizes: '128x128',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/pwa/icon-maskable-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/pwa/icon-maskable-384.png',
            sizes: '384x384',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/pwa/icon-maskable-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
        ],
        screenshots: [
          {
            src: '/pwa/screenshot-desktop-1.webp',
            sizes: '1024x576',
            type: 'image/webp',
            form_factor: 'wide',
            label: 'Screenshot 1'
          },
          {
            src: '/pwa/screenshot-desktop-2.webp',
            sizes: '1024x576',
            type: 'image/webp',
            form_factor: 'wide',
            label: 'Screenshot 2'
          },
          {
            src: '/pwa/screenshot-desktop-3.webp',
            sizes: '1024x576',
            type: 'image/webp',
            form_factor: 'wide',
            label: 'Screenshot 3'
          },
          {
            src: '/pwa/screenshot-mobile-1.webp',
            sizes: '576x1024',
            type: 'image/webp',
            form_factor: 'narrow',
            label: 'Screenshot 1'
          },
          {
            src: '/pwa/screenshot-mobile-2.webp',
            sizes: '576x1024',
            type: 'image/webp',
            form_factor: 'narrow',
            label: 'Screenshot 2'
          },
          {
            src: '/pwa/screenshot-mobile-3.webp',
            sizes: '576x1024',
            type: 'image/webp',
            form_factor: 'narrow',
            label: 'Screenshot 3'
          },
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,jpg,png,webp,svg,ico}'],
      },
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
