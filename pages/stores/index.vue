<script setup lang="ts">
import {useStaticData} from "~/store/staticData";
import Card from "~/components/store/Card.vue";
import type {Store} from "~/models/store.model";

const staticDataStore = useStaticData();
const {data, refresh} = await useAsyncData('', async () => await staticDataStore.getStoresList())
async function handleDelete(shopName: string): Promise<void> {
  await staticDataStore.deleteStore(shopName)
  await refresh()
}
async function handleCopy(store: Store): Promise<void> {
  staticDataStore.addStoreBody = {
    ...store,
    brand: {
      ...store.brand,
      enName: store.brand.enName + store.brand.enName.substring(0, 2)
    }
  }
  await staticDataStore.postStoreData()
  await refresh()
}
</script>

<template>
<div class="stores">
  <template v-if="data">
    <div class="list">
      <template v-for="(store, storeIndex) in data" :key="'store-card-' + storeIndex">
        <Card :store-data="store" @delete="handleDelete(store.brand?.enName)"
       @copy="handleCopy(store)" />
      </template>
    </div>
  </template>
  <nuxt-link class="add-store-link" to="/stores/add">
    <span>اضافه کردن فروشگاه</span>
  </nuxt-link>
</div>
</template>

<style scoped lang="scss">
.stores {
  width: 100%;
  height: fit-content;
  padding: 3rem 0;
  .list {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .add-store-link {
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    border-radius: .5rem;
    background-color: var(--cyan);
    color: var(--basic-white);
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 3rem;
  }
}
</style>