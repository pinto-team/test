// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: {enabled: true},
    modules: ["nuxt-swiper",
        'vue3-carousel-nuxt',
        "@nuxtjs/google-fonts",
        "@pinia/nuxt",
        '@nuxtjs/device'
    ],
    device: {
        refreshOnResize: true
    },
    swiper: {},
    carousel: {
        prefix: 'store-carousel'
    },
    nitro: {
        output: {
            dir: '/var/www/aapp'
        },
        minify: true,
        storage: {
            fs: {
                driver: 'fs',
                base: './data/fs'
            }
        }
    },
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "@/assets/css/mixins.scss";@import "@/assets/css/base.scss";`,
                },
            },
        },
    }
})