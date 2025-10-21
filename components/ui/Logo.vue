<script setup lang="ts">
import ImageCard from "../cards/ImageCard.vue";
</script>
<template>
  <div class="ui-logo">
    <div class="ui-logo-bg"></div>
    <ImageCard
      class="ui-logo-name"
      :img-src="'/images/vitra-logo.svg'"
      :img-alt="'Vitra'"
      :fit-direction="'height'"
    />
  </div>
</template>
<style scoped lang="scss">
.ui-logo {
  width: fit-content;
  height: fit-content;
  position: relative;
  &-bg {
    background-color: var(--ellipse-39);
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }
  &-name {

    position: absolute;
    top: 49%;
    right: 50%;
    transform: translateX(50%) translateY(-50%);
    filter: brightness(0%);   
    &.ui-image-wrapper {
      width: 42px;
      height: 14px;
    }
  }
}
</style>
