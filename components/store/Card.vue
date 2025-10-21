<script setup lang="ts">
import type {Store} from "~/models/store.model";
import clipboard from "clipboardy";

const props = defineProps<{ storeData: Store }>()
const route = useRoute()
const emits = defineEmits(['delete', 'copy'])
const origin = computed<string>(() => {
  if (window) return window.location.origin
  return ''
})
</script>

<template>
  <div class="store">
    <nuxt-link :to="'/' + props.storeData.brand?.enName" class="link">
      <img class="image"
           :src="'https://senamaapp.ir/api1/files/download/' + props.storeData.brand?.logo?.name"
           :alt="props.storeData.brand?.enName">
      <div class="name-holder">
        <p class="name">{{ props.storeData.brand?.enName }}</p>
        <p class="name">{{ props.storeData.brand?.faName }}</p>
      </div>
    </nuxt-link>
    <div class="actions">
      <nuxt-link :to="'/stores/edit?id=' + props.storeData.brand?.enName" class="edit">
        <span>ویرایش</span>
      </nuxt-link>
      <button class="edit" @click="emits('copy')">
        <span>کپی</span>
      </button>
      <button class="delete" @click="emits('delete')">
        <span>حذف</span>
      </button>
      <button class="edit" @click="clipboard.write(origin +
      '/edit?id=' +
      props.storeData.brand?.enName)">
        <span>اشتراک گذاری</span>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.store {
  width: calc(50% - .5rem);
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1.5rem;
  padding: 1rem;
  border: 1px solid var(--cyan);

  .link {
    width: 100%;
    height: fit-content;
    max-height: 56px;
    display: flex;
    align-items: center;
    gap: 1.5rem;
    overflow: hidden;
  }

  .name {
    color: var(--light-secondary-86);
    font-weight: 700;
    font-size: 1rem;

    &-holder {
      flex-grow: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      row-gap: .75rem;
    }
  }

  .image {
    width: auto;
    height: 48px;
    object-fit: cover;
  }

  .actions {
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

    .edit {
      width: fit-content;
      height: fit-content;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: .75rem;
      border-radius: .5rem;
      background-color: var(--cyan);
      color: var(--basic-white);
      font-size: 1rem;
      cursor: pointer;
    }

    .delete {
      width: fit-content;
      height: fit-content;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: .75rem;
      border-radius: .5rem;
      background-color: var(--red);
      color: var(--basic-white);
      font-size: 1rem;
      cursor: pointer;
    }
  }
}
</style>