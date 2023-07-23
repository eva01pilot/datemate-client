// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  runtimeConfig: {
    public: {
      API_DOMAIN: process.env.API_DOMAIN
    }
  },
  devServer: {
    port: 3000,
  },
  vite: {
    server: {
      hmr: {
        protocol: 'wss',
        clientPort: 443,
        path: 'hmr',
      },
    },
    vue: {
      script: {
        defineModel: true,
        propsDestructure: true
      }
    }
  },
  ssr: false,
  css: ['~/assets/css/main.css', "primevue/resources/themes/lara-light-blue/theme.css"],
  build: {
    transpile: ["primevue"]
  },
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/eslint-module',
    'nuxt-icon'
  ],
  eslint: {
    useEslintrc: true
  },
  components: {
    global: true,
    dirs: ['~/components']
  },
})
