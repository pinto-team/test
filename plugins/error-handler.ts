import type {NuxtError} from "#app";

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.hook('vue:error', (err) => {
       throw createError({statusCode: (err as NuxtError).statusCode ?? 500, message: (err as NuxtError)?.message})
    })
})
