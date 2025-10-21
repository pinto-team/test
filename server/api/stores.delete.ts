import type {Store} from "~/models/store.model";
export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const data = await useStorage('fs').removeItem(query.shopName as string)
    return {data}
})
