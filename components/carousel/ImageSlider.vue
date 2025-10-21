<script setup lang="ts">
import { Pagination } from "swiper/modules";
type ControlsProps = {
  slidesPerView?: number;
  nextEl: string;
  prevEl: string;
};
const props: Readonly<ControlsProps> = defineProps<ControlsProps>();
</script>
<template>
  <div class="ui-carousel">
    <Swiper
      class="ui-carousel-swiper-wrapper"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: true,
      }"
      :modules="[SwiperAutoplay, Pagination]"
      :slides-per-view="
        props.slidesPerView && props.slidesPerView > 1
          ? props.slidesPerView
          : 'auto'
      "
      :effect="'slide'"
      :slides-per-group="
        props.slidesPerView && props.slidesPerView > 1 ? props.slidesPerView : 1
      "
      :navigation="{
        nextEl: '.' + props.nextEl,
        prevEl: '.' + props.prevEl,
        disabledClass: 'slider-disabled',
      }"
      :pagination="{
        el: '.swiper-pagination',
        clickable: true,
      }"
      :space-between="16"
    >
      <slot name="items"></slot>
      <div class="swiper-pagination"></div>
    </Swiper>
  </div>
</template>

<style scoped lang="scss">
.ui-carousel {
  width: 100%;
  height: fit-content;
  &-swiper-wrapper {
    height: fit-content;
    padding: 0;
    position: relative;
  }

  .swiper-pagination {
    position: absolute;
    bottom: 10px;
    left: 0;
    width: 100%;
    height: fit-content;
    text-align: center;
    :deep(.swiper-pagination-bullet) {
      background-color: var(--basic-white);
      width: 8px;
      opacity: 0.8;
      margin-inline: 2px;
    }

    :deep(.swiper-pagination-bullet-active) {
      background-color: var(--light-secondary-100);
    }
  }
}
</style>
