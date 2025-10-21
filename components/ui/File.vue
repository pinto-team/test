<script setup lang="ts">
import type {ModelRef, Ref} from "vue";

const props = defineProps<{ file: File | null, type: 'image' | 'audio' }>()
const modelValue: ModelRef<string> = defineModel<string>({required: true, default: ''})
const emit = defineEmits(['delete'])
const formData = new FormData()
formData.append('file', props?.file as File)
const {status, clear, error, refresh, execute} = await useAsyncData('', async () => {
  const imageData = await $fetch<{ filename: string, filepath: string, uuid: string }>('https://senamaapp.ir/api1/files', {
    method: 'POST',
    body: formData,
  })
  modelValue.value = imageData.filename
}, {
  immediate: false
})
if (props.file && props.file.name) {
  execute()
}
function handleClear(): void {
  clear()
  emit('delete')
}
async function handleDelete(): Promise<void> {
  try {
    await $fetch<{message: string}>('https://senamaapp.ir/api1/files', {
      method: 'DELETE',
      params: {
        filename: modelValue.value
      }
    })
    emit('delete')
  }
  catch {
    console.error('delete file has error', {fileName: modelValue.value})
  }
}
</script>

<template>
  <div class="file-box">
    <template v-if="modelValue.length">
      <img v-if="props.type === 'image'" class="image" :src="'https://senamaapp.ir/api1/files/download/' + modelValue"
           :alt="modelValue || 'عکس محصول'">
      <audio v-else controls preload="auto" crossorigin="use-credentials" :key="modelValue" class="audio">
        <source :src="'https://senamaapp.ir/api1/files/download/' + modelValue"
                type="audio/mpeg"/>
      </audio>
      <button class="delete-button" @click="handleDelete()">
        <span>حذف</span>
      </button>
    </template>
    <div v-else-if="status === 'pending' || status === 'idle'" class="loading">
      <div class="circle"></div>
      <button class="cancel-button" @click="handleClear()">
        <span>لغو</span>
      </button>
    </div>
    <div v-else-if="error" class="loading">
      <span class="error-text">آپلود عکس با خطا مواجه شد</span>
      <button class="cancel-button" @click="refresh()">
        <span>تلاش مجدد</span>
      </button>
      <button class="cancel-button second" @click="handleClear()">
        <span>لغو</span>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.file-box {
  width: 100%;
  height: 240px;
  max-height: 240px;
  position: relative;
  border: 1px solid var(--cyan);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .loading {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .error-text {
      width: fit-content;
      height: fit-content;
      color: var(--red);
      font-size: 1.1rem;
      position: absolute;
      top: 25%;
      right: 50%;
      transform: translate(50%, -50%);
    }
    .circle {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background-color: transparent;
      border: 2px dashed var(--cyan);
      border-top: none;
      position: absolute;
      top: 25%;
      right: calc(50% - 1.5rem);
      animation: rotate 1s linear infinite;
    }
    .cancel-button {
      width: fit-content;
      height: fit-content;
      cursor: pointer;
      padding: .5rem 1.5rem;
      border-radius: .5rem;
      background-color: var(--red);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      color: var(--basic-white);
      position: absolute;
      top: 75%;
      right: 50%;
      transform: translate(50%, -50%);
      &.second {
        top: 75%;
      }
    }

    .retry-button {
      width: fit-content;
      height: fit-content;
      cursor: pointer;
      padding: .5rem 1.5rem;
      border-radius: .5rem;
      background-color: var(--cyan);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      color: var(--basic-white);
      position: absolute;
      top: 50%;
      right: 50%;
      transform: translate(50%, -50%);
    }
  }
  .audio {
    width: 100%;
  }
  .image {
    width: auto;
    height: 100%;
    object-fit: cover;
  }

  .delete-button {
    width: fit-content;
    height: fit-content;
    cursor: pointer;
    padding: .5rem 1.5rem;
    border-radius: .5rem;
    background-color: var(--red);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    color: var(--basic-white);
    position: absolute;
    bottom: 1rem;
    right: 50%;
    transform: translateX(50%);
  }
}
</style>