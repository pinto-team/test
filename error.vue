<script setup lang="ts">
import type { NuxtError } from '#app'
import type {ComputedRef} from "vue";

const props = defineProps({
  error: Object as () => NuxtError
})

const handleError = () => clearError({ redirect: '/' })
const errorText: ComputedRef<string> = computed(() => {
  if (props.error?.statusCode === 500) return 'مشکل غیر منتظره‌ای پیش اومده٬ داریم درستش میکنیم'
  if (props.error?.statusCode === 404) return  'صفحه مورد نظر وجود ندارد'
  return 'لطفا با پشتیبانی تماس بگیرید'
})
</script>

<template>
<div class="error-page">
  <img class="image" src="public/images/404.svg" alt="">
  <span class="code">{{ props.error?.statusCode }}</span>
  <span class="text">{{ errorText }}</span>
</div>
</template>

<style scoped lang="scss">
.error-page {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5rem;
  position: relative;
  .image {
    width: auto;
    height: auto;
  }
  .text {
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1.5rem;
  }
  .code {
    position: absolute;
    top: 50%;
    right: 50%;
    transform: translate(50%, -50%);
    font-size: 20rem;
    z-index: 0;
    opacity: .1;
  }
}
</style>