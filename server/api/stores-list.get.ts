import type {Store} from "~/models/store.model";

export default defineEventHandler(async (event) => {
    const storeKeys = await useStorage('fs').getKeys()
    const storesListToGet: Promise<Store>[] = []
    storeKeys.forEach((storeKey) => {
        storesListToGet.push(useStorage('fs').getItem<Store>(storeKey) as Promise<Store>)
    })
    const data = await Promise.all(storesListToGet)
    return {data}
})
