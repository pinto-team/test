import type {GetStoreApiResponse, PostStoreApiBody, Store} from "~/models/store.model";
export default defineEventHandler(async (event) => {
    const data = await readBody<PostStoreApiBody>(event)
    const store = await useStorage('fs').setItem<PostStoreApiBody>(data.brand.enName, data)
    return data
})
