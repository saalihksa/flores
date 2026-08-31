import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ['leaflet', 'maplibre-gl'],
    },
  },
  app: {
    head: {
      title: 'FLORES | Modern Yaşam, Güvenli Gelecek',
      htmlAttrs: { lang: 'tr' },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        {
          name: 'description',
          content:
            'FLORES, modern yaşamın ihtiyaçlarını karşılayan yenilikçi projeleriyle konfor, güvenlik ve estetiği bir araya getiriyor. MİSEK İnşaat güvencesiyle kentsel dönüşüm projeleri geliştirerek şehre değer katıyoruz.',
        },
        { property: 'og:site_name', content: 'FLORES' },
        { property: 'og:title', content: 'FLORES | Modern Yaşam, Güvenli Gelecek' },
        {
          property: 'og:description',
          content:
            'FLORES, modern yaşamın ihtiyaçlarını karşılayan yenilikçi projeleriyle konfor, güvenlik ve estetiği bir araya getiriyor. MİSEK İnşaat güvencesiyle kentsel dönüşüm projeleri geliştirerek şehre değer katıyoruz.',
        },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'preload', href: '/fonts/NewGrotesk-Regular.otf', as: 'font', type: 'font/otf', crossorigin: 'anonymous' },
        { rel: 'preload', href: '/fonts/NewGrotesk-Medium.otf', as: 'font', type: 'font/otf', crossorigin: 'anonymous' },
      ],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
})
