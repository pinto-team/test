import type {Store} from "~/models/store.model";
export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    const data = await useStorage('fs').getItem<Store>(query.shopName as string)
        if (!data) throw createError({statusCode: 404})
    return {data}
})
