<script setup lang="ts">
import ImageSlider from "~/components/carousel/ImageSlider.vue";
import ImageCard from "~/components/cards/ImageCard.vue";
import Text from "~/components/ui/Text.vue";
import {useRoute} from "vue-router";
import {useStaticData} from "~/store/staticData";
import type {ComputedRef, Ref} from "vue";
import type {ImageFile, Product} from "~/models/store.model";

const route = useRoute();
const productId = route.params.id;
const staticDataStore = useStaticData();
const {data} = await useAsyncData('', () => staticDataStore.setStoreData(route.params.shopName as string))
if (!data.value) throw createError({statusCode: 404})
const product: ComputedRef<Product> = computed(() => {
  return staticDataStore.staticStore?.products.list.find(
      (product) => product.id === productId
  ) as Product
});
const formatter = new Intl.NumberFormat();
const fullScreenImage: Ref<boolean> = ref(false);
const activeColor: Ref<string> = ref(
    product?.value?.colors[0]?.name
        ? product.value.colors[0]?.name
        : "خاکستری"
);
const imageList: ComputedRef<ImageFile[] | undefined> = computed(() => {
  return product.value.colors.find(
      (color) => color.name === activeColor.value
  )?.imageFiles
})

function setActiveColor(color: string): void {
  activeColor.value = color;
};
</script>
<template>
  <div class="single-product-page">
    <template v-if="$route.query.shared !== 'true' || !$route.query.shared">
      <div class="single-product-page-header">
        <ImageCard
            @click="$router.back()"
            class="arrow-right-alt"
            :img-src="'/images/arrow-right-alt.svg'"
            :img-alt="'back'"
            :fit-direction="'height'"
        />
        <NuxtLink :to="{name: 'shopName-about-us'}">
          <ImageCard
              class="phone-in-talk"
              :img-src="'/images/phone_in_talk.svg'"
              :img-alt="'phoneTalk'"
              :fit-direction="'height'"
          />
        </NuxtLink>
      </div>
    </template>
    <div class="single-product-page-image-carousel" v-if="imageList">
      <ImageSlider
          :slidesPerView="1"
          :prev-el="'stores-carousel-prev'"
          :next-el="'stores-carousel-next'"
      >
        <template #items>
          <SwiperSlide
              v-for="(productImage, productImageIndex) in imageList"
              :key="productImageIndex"
          >
            <div class="single-product-page-image-wrapper">
              <ImageCard
                  :imgSrc="'https://senamaapp.ir/api1/files/download/' + productImage.name"
                  :imgAlt="'تصویر'"
                  :fitDirection="'both'"
                  @click="fullScreenImage = true"
              />
            </div>
          </SwiperSlide>
        </template>
      </ImageSlider>
    </div>
    <div class="single-product-page-detail-wrapper">
      <div class="single-product-page-detail-title-wrapper">
        <Text
            class="single-product-page-detail-title"
            :textStyle="'16B'"
            :color="'black'"
            :tag="'span'"
            :text-align="'right'"
            :wrap="'nowrap'"
        >
          <template #text> {{ product?.name }}</template>
        </Text>
        <div class="single-product-page-detail-price-line">
          <Text
              class="single-product-page-detail-subtitle"
              :textStyle="'14R'"
              :color="'secondary64'"
              :tag="'span'"
              :text-align="'center'"
              :wrap="'nowrap'"
          >
            <template #text>
              {{
                product?.description && product?.description.length > 2
                    ? product.description
                    : ""
              }}
            </template>
          </Text>
          <Text
              v-if="product?.price && product?.price > '0'"
              class="single-product-page-detail-price"
              :textStyle="'14M'"
              :color="'black'"
              :tag="'span'"
              :text-align="'center'"
              :wrap="'nowrap'"
          >
            <template #text>
              {{
                product?.price !== undefined && product?.price !== null
                    ? formatter.format(Number(product.price)) + " " +
                    product.priceTitle
                    : "تماس بگیرید"
              }}
            </template>
          </Text>
        </div>
      </div>
      <div v-if="product?.specs.length"
           class="single-product-page-detail-product-types-wrapper">
        <div
            v-for="(productSpec, productSpecIndex) in product?.specs"
            :key="productSpecIndex + productSpec.text"
            class="single-product-page-detail-product-types"
        >
          <Text
              class="single-product-page-detail-product-types-index"
              :textStyle="'12R'"
              :color="'secondary64'"
              :tag="'span'"
              :text-align="'right'"
              :wrap="'nowrap'"
          >
            <template #text> {{ productSpec.title }}</template>
          </Text>
          <Text
              class="single-product-page-detail-product-types-item"
              :textStyle="'14M'"
              :color="'black'"
              :tag="'span'"
              :text-align="'right'"
              :wrap="'nowrap'"
          >
            <template #text> {{ productSpec.text }}</template>
          </Text>
        </div>
      </div>
      <div
          v-if="product?.colors && product.colors.length > 0"
          class="single-product-page-detail-color-wrapper"
      >
        <div class="single-product-page-detail-color-title">
          <Text
              :textStyle="'14M'"
              :color="'black'"
              :tag="'span'"
              :text-align="'right'"
              :wrap="'nowrap'"
          >
            <template #text> {{product.colorsTitle}}:</template>
          </Text>
          <Text
              :textStyle="'14M'"
              :color="'black'"
              :tag="'span'"
              :text-align="'right'"
              :wrap="'nowrap'"
          >
            <template #text> {{ activeColor }}</template>
          </Text>
        </div>
        <div class="single-product-page-detail-color-item-wrapper">
          <span
              v-for="(productColor, productColorIndex) in product.colors"
              :key="productColorIndex + productColor.colorCode"
              class="single-product-page-detail-color-item gray"
              :style="{ backgroundColor: productColor.colorCode }"
              :class="{ active: activeColor === productColor.name }"
              @click="setActiveColor(productColor.name)"
          ></span>
        </div>
      </div>
      <div
          v-if="product?.audio"
          class="single-product-page-detail-voice-wrapper"
      >
        <Text
            class="single-product-page-detail-voice-title"
            :textStyle="'14M'"
            :color="'black'"
            :tag="'span'"
            :text-align="'right'"
            :wrap="'nowrap'"
        >
          <template #text> {{product.audioTitle}}:</template>
        </Text>
        <div class="single-product-page-detail-voice-box">
          <audio controls>
            <source :src="'https://senamaapp.ir/api1/files/download/' + product.audio.name"
                    type="audio/mpeg"/>
          </audio>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.single-product-page {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  position: relative;
  padding-bottom: 35vh;

  &-header {
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: space-between;
    padding: 16px 24px 12px;
    position: absolute;
    background-color: transparent;
    top: 0;
    right: 0;
    z-index: 5;

    .phone-in-talk {
      background: var(--light-secondary-100);
      width: fit-content;
      height: fit-content;
      padding: 8px;
      border-radius: 32px;
      cursor: pointer;
    }

    .arrow-right-alt {
      background: var(--light-secondary-12);
      width: fit-content;
      height: fit-content;
      padding: 8px;
      border-radius: 32px;
      cursor: pointer;
    }
  }

  &-image-carousel {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    overflow: hidden;

    :deep(.ui-carousel) {
      .swiper-wrapper {
        display: flex;
        align-items: center;
      }
    }
  }

  &-image-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &-detail {
    &-wrapper {
      width: 100%;
      height: fit-content;
      display: flex;
      flex-direction: column;
      padding: 24px 16px;
      row-gap: 24px;
    }

    &-title-wrapper {
      width: 100%;
      height: fit-content;
      display: flex;
      flex-direction: column;
      row-gap: 4px;
    }

    &-price-line {
      width: 100%;
      height: fit-content;
      display: flex;
      justify-content: space-between;
      column-gap: 8px;
    }

    &-price {
      min-width: fit-content;
    }

    &-product-types-wrapper {
      width: 100%;
      height: fit-content;
      display: flex;
      flex-wrap: nowrap;
      gap: 8px;
      justify-items: center;
      overflow-x: auto;
      white-space: nowrap;
      scrollbar-width: none;
    }

    &-product-types {
      background-color: var(--light-secondary-4);
      width: fit-content;
      height: fit-content;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      row-gap: 8px;
      padding: 8px 8px;
      border-radius: 8px;
    }

    &-color {
      &-wrapper {
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        row-gap: 16px;
      }

      &-title {
        width: 100%;
        height: fit-content;
        display: flex;

        .ui-text {
          &:nth-child(1) {
            padding-inline-end: 4px;
          }
        }
      }

      &-item-wrapper {
        width: 100%;
        height: fit-content;
        display: flex;
        column-gap: 16px;
      }

      &-item {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        display: flex;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        &.active {
          border: 1px solid var(--basic-white);
          box-shadow: 0 0 0 2px var(--light-secondary-24);
        }

        &.gray {
          background-color: var(--light-secondary-24);
        }

        &.red {
          background-color: var(--red);
        }

        &.blue {
          background-color: var(--nano);
        }

        &.yellow {
          background-color: var(--yellow);
        }

        &.aqua {
          background-color: var(--cyan);
        }

        &.green {
          background-color: var(--green);
        }
      }
    }

    &-voice {
      &-wrapper {
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        row-gap: 8px;
      }

      &-title {
        width: 100%;
        height: fit-content;
      }

      &-box {
        width: 100%;
        height: fit-content;

        audio {
          width: 100%;
        }
      }
    }
  }
}
</style>
