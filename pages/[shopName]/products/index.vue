<script setup lang="ts">
import ImageCard from "~/components/cards/ImageCard.vue";
import ProductsCard from "~/components/cards/ProductsCard.vue";
import Text from "~/components/ui/Text.vue";
import MasonryWall from "@yeger/vue-masonry-wall";
import {useStaticData} from "~/store/staticData";
import type {ComputedRef, Ref} from "vue";
import type {ImageFile, Product} from "~/models/store.model";
import ImageSlider from "~/components/carousel/ImageSlider.vue";

const staticDataStore = useStaticData();
const route = useRoute()
const { data } = await useAsyncData('', () => staticDataStore.setStoreData(route.params.shopName as string))
if (!data.value) throw createError({statusCode: 404})
const selectedCategory: Ref<string> = ref('all');
// const filteredProducts: ComputedRef<Product[]> = computed(() => {
//   if (selectedCategory.value === 'all') {
//     return staticDataStore.staticStore?.products.list as Product[];
//   }
//   return staticDataStore.staticStore?.products.list.filter(product => product.category.id === selectedCategory.value) as Product[];
// });

const productsList: Ref<Product[]> = ref(staticDataStore.staticStore?.products.list || []);
const sortedProducts:Ref<Product[] | []> = ref([])

const filteredProducts: ComputedRef<Product[]> = computed((): Product[] => {
    sortedProducts.value = productsList.value.sort((firstProduct: Product, secondProduct: Product): number => {
    const firstProductId:Ref<number> = ref(parseInt(firstProduct.id.split('-')[1], 10));
    const secondProductId: Ref<number> =  ref(parseInt(secondProduct.id.split('-')[1], 10));
    return firstProductId.value - secondProductId.value;
  });

  if (selectedCategory.value === 'all') {
    return sortedProducts.value;
  }

  return sortedProducts.value.filter((product: Product) => product.category.id === selectedCategory.value);
});

function setActive(id: string): void {
  selectedCategory.value = id
}

</script>
<template>
  <div class="products-page" v-if="staticDataStore.staticStore">
    <div class="products-page-header-wrapper">
      <div class="products-page-header-logo-wrapper">
        <NuxtLink class="logo-link" :to="{name: 'shopName-about-us'}">
          <ImageCard
              :img-src="'https://senamaapp.ir/api1/files/download/' + staticDataStore.staticStore.brand.logo?.name"
              :img-alt="'back ground image'"
              :fit-direction="'height'"
          />
        </NuxtLink>
        <div class="products-page-header-logo-text-wrapper">
          <Text
              class="products-page-header-logo-text-title"
              :textStyle="'18B'"
              :color="'black'"
              :tag="'span'"
              :text-align="'right'"
              :wrap="'wrap'"
          >
            <template #text>{{ staticDataStore.staticStore.brand.faName }}</template>
          </Text>
          <Text
              class="products-page-header-logo-text-subtitle"
              :textStyle="'12R'"
              :color="'black'"
              :tag="'span'"
              :text-align="'right'"
              :wrap="'wrap'"
          >
            <template #text
            >{{ staticDataStore.staticStore.brand.shortDesc }}
            </template
            >
          </Text>
        </div>
        <NuxtLink :to="{name: 'shopName-about-us'}">
          <ImageCard
              class="phone-in-talk"
              :img-src="'/images/phone_in_talk.svg'"
              :img-alt="'phoneTalk'"
              :fit-direction="'height'"
          />
        </NuxtLink>
      </div>
      <div class="products-page-header-navbar-wrapper"
           v-if="staticDataStore.staticStore.menu.length">
        <nav class="products-page-header-navbar">
          <ul class="products-page-header-navbar-row">
            <li
                class="products-page-header-navbar-column"
                v-for="(item, index) in  staticDataStore.staticStore.menu"
                :key="item.id"
            >
              <Text
                  :class="[
                  'products-page-header-navbar-item',
                  { ' active': item.id === selectedCategory },
                ]"
                  :textStyle="'14M'"
                  :color="'black'"
                  :tag="'span'"
                  :text-align="'center'"
                  :wrap="'nowrap'"
                  @click="setActive(item.id)"
              >
                <template #text>{{ item.name }}</template>
              </Text>
            </li>
            <li class="products-page-header-navbar-column">
              <Text
                  :class="[
                  'products-page-header-navbar-item',
                  { ' active': selectedCategory === 'all'  },
                ]"
                  :textStyle="'14M'"
                  :color="'black'"
                  :tag="'span'"
                  :text-align="'center'"
                  :wrap="'nowrap'"
                  @click="setActive('all')"
              >
                <template #text>همه</template>
              </Text>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="products-page-header-image-wrapper">
      <ImageSlider
          :slidesPerView="1"
          :prev-el="'stores-carousel-prev'"
          :next-el="'stores-carousel-next'"
      >
        <template #items>
          <SwiperSlide
              v-for="(productImage, productImageIndex) in
               (staticDataStore.staticStore.products.banner as ImageFile[])"
              :key="productImageIndex"
          >
            <div class="single-product-page-image-wrapper">
              <ImageCard
                  :img-src="'https://senamaapp.ir/api1/files/download/' + productImage?.name"
                  :img-alt="'back ground image'"
                  :fit-direction="'height'"
                  aspect-ratio="1/1"
              />
            </div>
          </SwiperSlide>
        </template>
      </ImageSlider>
    </div>
    <MasonryWall
        v-if="filteredProducts"
        class="products-page-body"
        :items="filteredProducts"
        :ssr-columns="2"
        :column-width="190"
        :gap="8"
        :columns="2"
    >
      <template #default="{ item, index }">
          <ProductsCard
              :key="index"
              :image-source="{
                  imgSrc: 'https://senamaapp.ir/api1/files/download/' + item.image?.name,
                  imgAlt: 'background image',
                  fitDirection: 'width',
              }"
              :showShareBtn="true"
              :title="item.name"
              :linkId="item.id"
          />
      </template>
    </MasonryWall>
  </div>
</template>
<style scoped lang="scss">
.products-page {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding-bottom: 35vh;
  &-header {
    &-wrapper {
      width: 100%;
      height: fit-content;
      display: flex;
      flex-direction: column;
      row-gap: 8px;
      padding: 0px;
      position: sticky;
      padding-bottom: 16px;
      top: 0;
      background-color: var(--basic-white);
      z-index: 1;
    }

    &-logo {
      &-wrapper {
        width: 100%;
        height: fit-content;
        display: flex;
        column-gap: 16px;
        padding: 16px;
        align-items: center;
        lign-items: center;
        overflow: hidden;
        .logo-link {
          width: 56px;
          height: 56px;
          img {
            width: 100%;
            height: auto;
          }
        }
        .phone-in-talk {
          background: var(--light-secondary-100);
          width: fit-content;
          height: fit-content;
          padding: 8px;
          border-radius: 32px;
          cursor: pointer;
        }
      }

      &-text {
        &-wrapper {
          flex-grow: 1;
          height: fit-content;
          display: flex;
          flex-direction: column;
          align-self: center;
          row-gap: 8px;
        }
      }
    }

    &-navbar-wrapper {
      width: 100%;
      height: fit-content;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &-navbar {
      width: 100%;
      max-width: var(--wrapper);
      height: fit-content;
      display: flex;
      flex-direction: column;
      overflow-x: auto;
      white-space: nowrap;
      scrollbar-width: none;

      &-row {
        width: fit-content;
        height: fit-content;
        display: flex;
        flex-direction: row-reverse;
        list-style-type: none;
      }

      &-column {
        display: inline-block;
        white-space: nowrap;
        margin-inline-start: 8px;
      }

      &-item {
        cursor: pointer;
        width: fit-content;
        height: 28px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        background-color: var(--light-secondary-8);
        &.ui-text {
          padding: 4px 12px 6px;
        }

        &.active {
          background-color: var(--light-secondary-100);
          color: var(--basic-white);
        }
      }
    }

    &-image-wrapper {
      overflow: hidden;
      height: auto;
      width: 100%;
      margin-top: 0px;
      padding: 0 8px;

      :deep(.ui-image-wrapper.height) {
        img {
          border-radius: 8px;
          width: 100%;
        }
      }
    }
  }

  &-body {
    width: 100%;
    height: 100%;
    padding: 8px;
  }
}
</style>
