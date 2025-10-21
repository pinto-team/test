<script setup lang="ts">
import ImageCard from "~/components/cards/ImageCard.vue";
import Text from "~/components/ui/Text.vue";
import { useStaticData } from "~/store/staticData";
import {useAsyncData} from "#app";
const staticDataStore = useStaticData();
const route = useRoute()
const { data } = await useAsyncData('', async () => await staticDataStore.setStoreData(route.params.shopName as string))
if (!data.value) throw createError({statusCode: 404})
if (staticDataStore.staticStore && staticDataStore.staticStore.brand?.showIntroText === undefined) staticDataStore.staticStore.brand.showIntroText = true
</script>
<template>
  <div class="home-page" v-if="data">
    <div class="home-page-image-wrapper">
      <ImageCard
        :img-src="'https://senamaapp.ir/api1/files/download/' + data.brand?.banner?.name"
        :img-alt="data.brand?.faName"
        :fit-direction="'height'"
      />
    </div>
    <div v-if="data.brand?.showIntroText" class="home-page-text-wrapper">
      <Text
        class="home-page-text-title"
        :textStyle="'28B9'"
        :color="'black'"
        :tag="'span'"
        :text-align="'center'"
        :wrap="'nowrap'"
      >
        <template #text>{{data.brand?.faName}}</template>
      </Text>
      <Text
        class="home-page-text-subtitle"
        :textStyle="'14R'"
        :color="'black'"
        :tag="'span'"
        :text-align="'center'"
        :wrap="'wrap'"
      >
        <template #text
          >{{data.brand?.slogan}}</template
        >
      </Text>
    </div>
    <NuxtLink :to="{name: 'shopName-products'}">
      <div class="home-page-arrow-wrapper">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M18.8316 8.77151H4.57242C4.48608 8.77068 4.40917 8.71685 4.37875 8.6361C4.34825 8.55526 4.37058 8.4641 4.43492 8.40651L8.29908 5.40648C8.76942 4.96304 8.804 4.22676 8.37733 3.74121C7.95058 3.25567 7.216 3.19536 6.71575 3.60481L0.731583 8.47068C0.301083 8.85034 0.0544987 9.39668 0.0544987 9.97068C0.0544987 10.5447 0.301083 11.091 0.731583 11.4707L6.71408 16.3348C7.2145 16.739 7.94458 16.6768 8.36933 16.1937C8.79408 15.7106 8.76233 14.9785 8.29742 14.534L4.43325 11.534C4.369 11.4764 4.34658 11.3852 4.37708 11.3044C4.4075 11.2236 4.48442 11.1698 4.57075 11.169H18.8316C19.4818 11.1518 20 10.6198 20 9.96943C20 9.31901 19.4818 8.78693 18.8316 8.76985V8.77151Z"
            fill="#202125"
          />
        </svg>
      </div>
    </NuxtLink>
  </div>
  <div v-else class="not-found">
    STORE NOT FOUND
  </div>
</template>
<style scoped lang="scss">
.not-found {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.home-page {
  width: 100%;
  height:100vh;
  position: relative;
  overflow: hidden;
  &-image-wrapper {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
  }
  &-text {
    &-wrapper {
      width: fit-content;
      height: fit-content;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 137px;
      right: 50%;
      transform: translateX(50%);
      .ui-text {
        text-shadow: 0 0px 3px var(--basic-white);
      }
    }
    &-title {
      width: 100%;
      height: fit-content;
      padding-bottom: 8px;
    }
    &-subtitle {
      width: 100%;
      height: fit-content;
    }
  }
  &-arrow-wrapper {
    background-color: var(--basic-white);
    width: 346px;
    max-width: 90%;
    height: fit-content;
    border-radius: 100px;
    padding: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 32px;
    right: 50%;
    transform: translateX(50%);
    cursor: pointer;
    svg {
      scale: 100%;
      transition: transform 0.3s ease;
    }
    &:hover {
      background-color: var(--light-secondary-8);
      svg {
        transform: scale(110%);
      }
    }
  }
}
</style>
