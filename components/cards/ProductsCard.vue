<script setup lang="ts">
import type { ImageSource } from "~/models/ui/image.model";
import ImageCard from "./ImageCard.vue";
type ProductsCard = {
  imageSource: ImageSource;
  title: string;
  showShareBtn?: boolean;
  linkId?: string;
};
const props: Readonly<ProductsCard> = defineProps<ProductsCard>();
function handleShareClick(): void {
  if (navigator.share) {
    navigator
      .share({
        title: props.title,
        url: window.location.href + "/" + props.linkId + '?shared=true',
      })
      .then(() => {
        console.log("Successfully shared");
      })
      .catch((error) => {
        console.error("Something went wrong sharing", error);
      });
  } else {
    alert("Web Share API is not supported in your browser.");
  }
}
</script>
<template>
  <div class="ui-products-card">
    <NuxtLink
      :to="{ name: 'shopName-products-id', params: { id: props.linkId } }"
    >
      <ImageCard
        :imgSrc="props.imageSource.imgSrc"
        :imgAlt="props.imageSource.imgAlt"
        :fitDirection="props.imageSource.fitDirection"
        :border-radius="true"
      />
    </NuxtLink>
    <div
      :class="'ui-products-card-share-btn-wrapper'"
      v-if="props.showShareBtn"
    >
    <div 
      @click="handleShareClick()">
      
    <svg class='ui-products-card-share-btn' xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 -960 960 960" width="32px" fill="#5e5e5e" ><path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" /></svg> 
    </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.ui-products-card {
  // color: var(--basic-white);
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  object-fit: cover;
  border-radius: 8px;
  scale: 100%;
  overflow: hidden;
  transition: transform 0.3s ease;
  &:hover {
    // transform: scale(101%);
    // box-shadow: 0 0 20px 0 var(--light-secondary-24);
  }
  &-share-btn-wrapper {
    width: 100%;
    height: fit-content;
  }
  &-share-btn {
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    padding-top: 2px;
    border-radius: 8px;
    cursor: pointer;
    &:hover {
      // box-shadow: 0 0 10px var(--light-secondary-24);
    }
  }
}
@media (width < 768px) {
  .ui-products-card {
    &-share-btn {
      &:hover {
        // box-shadow: none;
      }
    }
  }
}
</style>
