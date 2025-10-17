// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    modules: ['@nuxt/eslint', '@nuxt/ui', '@pinia/nuxt'],
    css: ['~/assets/css/main.css'],
    pages: true,
    vite: {
        plugins: [
            tailwindcss()
        ]
    },
    runtimeConfig: { public: { SOCKET_URL: process.env.VITE_SOCKET_URL || 'http://localhost:4000' } },
    ssr: false,
    nitro: { preset: 'static' }
})