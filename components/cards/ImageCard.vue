<script setup lang="ts">
import {type ComputedRef, computed} from 'vue';
import type {ImageSource} from '~/models/ui/image.model';
const props: Readonly<ImageSource> = defineProps<ImageSource>()
const imageClass: ComputedRef<string> = computed(() => {
  const classNames: string[] = ['ui-image-wrapper']
  classNames.push(String(props.fitDirection))
  if (props.borderRadius) classNames.push('border-radius') 
  if (props.imageScale) classNames.push('image-scale')
  return classNames.join(' ')
})
</script>
<template>
  <div :class="imageClass">
    <img
        :src="props.imgSrc"
        :alt="props.imgAlt"
        :style="props.aspectRatio
        ?{aspectRatio: props.aspectRatio}
        :{}"
    />
  </div>
</template>
<style scoped lang="scss">
.ui-image-wrapper {
  width: 100%;
  height: fit-content;
  position: relative;

  &.image-scale {
    overflow: hidden;
    border-radius: .5rem;

    img {
      transition: transform .35s ease-in;
      transform-origin: center;
    }

    &:hover img {
      transform: scale(103%);
    }
  }    
  &.width {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }
  }

  &.height {
    width: auto;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: auto;
      height: 100%;
      object-fit: cover;
    }
  }
  &.both {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &.border-radius {
    img {
      border-radius: .5rem;
      overflow: hidden;
    }
  }
}
</style>