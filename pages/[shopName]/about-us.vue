<script setup lang="ts">
import ImageCard from "~/components/cards/ImageCard.vue";
import Text from "~/components/ui/Text.vue";
import {useStaticData} from "~/store/staticData";

const staticDataStore = useStaticData();
const route = useRoute()
const { data } = await useAsyncData('', () => staticDataStore.setStoreData(route.params.shopName as string))
if (!data.value) throw createError({statusCode: 404})

</script>
<template>
  <div class="about-us-page">
    <div class="about-us-page-header">
      <div class="about-us-page-header-image-wrapper">
        <ImageCard
            v-if="staticDataStore.staticStore?.contactInfo.banner"
            class="about-us-page-header-image"
            :img-src="'https://senamaapp.ir/api1/files/download/' + staticDataStore.staticStore?.contactInfo.banner.name"
            :img-alt="'back ground image'"
            :fit-direction="'width'"
            aspect-ratio="16/9"
        />
      </div>
      <div class="about-us-page-header-back-icon">
        <ImageCard
            @click="$router.back()"
            class="arrow-right-alt"
            :img-src="'/images/arrow-right-alt.svg'"
            :img-alt="'back'"
            :fit-direction="'height'"
        />
      </div>
    </div>
    <div class="about-us-page-about-company">
      <div class="about-us-page-about-company-logo">
        <ImageCard
            :img-src="'https://senamaapp.ir/api1/files/download/' + staticDataStore.staticStore?.brand.logo?.name"
            :img-alt="'back'"
            :fit-direction="'height'"
        />
      </div>
      <div class="about-us-page-about-company-text">
        <Text
            :textStyle="'18B'"
            :color="'black'"
            :tag="'span'"
            :text-align="'right'"
            :wrap="'nowrap'"
        >
          <template #text>{{ staticDataStore.staticStore?.brand.faName }}</template>
        </Text>
        <Text
            :textStyle="'12R'"
            :color="'black'"
            :tag="'span'"
            :text-align="'right'"
            :wrap="'wrap'"
        >
          <template #text
          >
            {{ staticDataStore.staticStore?.brand.longDesc }}
          </template>
        </Text>
      </div>
    </div>
    <div class="about-us-page-contact-info border-for-box">
      <div v-if="staticDataStore.staticStore?.contactInfo.phoneNumber.length" class="about-us-page-contact-info-company-number">
        <Text
            :textStyle="'14M'"
            :color="'black'"
            :tag="'span'"
            :text-align="'right'"
            :wrap="'wrap'"
        >
          <template #text>{{
              staticDataStore.staticStore?.contactInfo.phoneNumberTitle }}</template>
        </Text>
        <div class="about-us-page-contact-info-company-number-together-number">
          <a
              v-for="(phoneNumber , phoneNumberIndex) in staticDataStore.staticStore?.contactInfo.phoneNumber"
              :key='phoneNumberIndex'
              :href="'tel:' + phoneNumber">
            <Text
                dir="ltr"
                :textStyle="'16R'"
                :color="'black'"
                :tag="'span'"
                :text-align="'right'"
                :wrap="'wrap'"
            >
              <template #text>
                {{ phoneNumber }}
              </template>
            </Text>
          </a>
        </div>
      </div>
      <div v-if="staticDataStore.staticStore?.contactInfo.telephone.length" class="divider"></div>
      <div v-if="staticDataStore.staticStore?.contactInfo.telephone.length" class="about-us-page-contact-info-company-number">
        <Text
            :textStyle="'14M'"
            :color="'black'"
            :tag="'span'"
            :text-align="'right'"
            :wrap="'wrap'"
        >
          <template #text>{{
              staticDataStore.staticStore?.contactInfo.telephoneTitle }}</template>
        </Text>
        <div class="about-us-page-contact-info-company-number-together-number">
          <a
              v-for="(telephone , telephoneIndex) in staticDataStore.staticStore?.contactInfo.telephone"
              :key='telephoneIndex'
              :href="'tel:' + telephone">
            <Text
                dir="ltr"
                :textStyle="'16R'"
                :color="'black'"
                :tag="'span'"
                :text-align="'right'"
                :wrap="'wrap'"
            >
              <template #text>
                {{ telephone }}
              </template>
            </Text>
          </a>
        </div>
      </div>
    </div>
    <div v-if="staticDataStore.staticStore?.contactInfo.socialMedia.length" class="about-us-page-social-info border-for-box">
      <Text
          :textStyle="'14M'"
          :color="'black'"
          :tag="'span'"
          :text-align="'right'"
          :wrap="'wrap'"
      >
        <template #text>{{
            staticDataStore.staticStore?.contactInfo.socialMediaTitle }}</template>
      </Text>
      <div class="about-us-page-social-info-item-wrapper">
        <div v-for="(socialMedia , socialMediaIndex) in staticDataStore.staticStore?.contactInfo.socialMedia"
             :key='socialMedia.type + socialMediaIndex' class="about-us-page-social-info-item">
          <a class="about-us-page-social-info-link" :href="socialMedia.link" target="_blank">
            <ImageCard
                :img-src="'/images/' + socialMedia.type.toLowerCase() + '.svg'"
                :img-alt="'back'"
                :fit-direction="'height'"
            />
          </a>
        </div>
      </div>
    </div>
    <div class="about-us-page-place-info border-for-box">
      <div class="about-us-page-place-info-text-wrapper">
        <Text
            class="about-us-page-place-info-title-address"
            :textStyle="'14M'"
            :color="'black'"
            :tag="'span'"
            :text-align="'right'"
            :wrap="'nowrap'"
        >
          <template #text>{{
              staticDataStore.staticStore?.contactInfo.address.title }}
            :</template>
        </Text>
        <Text
            :textStyle="'14R'"
            :color="'black'"
            :tag="'span'"
            :text-align="'right'"
            :wrap="'wrap'"
        >
          <template #text>
          {{staticDataStore.staticStore?.contactInfo.address.text}}
          </template>
        </Text>
      </div>
      <div class="about-us-page-place-info-link-wrapper">
        <a v-if="staticDataStore.staticStore?.contactInfo.address.location" :href="staticDataStore.staticStore?.contactInfo.address.location" target="_blank" class="about-us-page-place-info-link">
           <ImageCard
              :img-src="'/images/location.svg'"
              :img-alt="'back'"
              :fit-direction="'height'"
          />
          <Text
              :textStyle="'14M'"
              :color="'black'"
              :tag="'span'"
              :text-align="'right'"
              :wrap="'wrap'"
          >
            <template #text>{{
                staticDataStore.staticStore?.contactInfo.address.locationTitle
              }}</template>
          </Text>
        </a>
        <a v-if="staticDataStore.staticStore?.contactInfo.address.router" :href="staticDataStore.staticStore?.contactInfo.address.router" target="_blank"  class="about-us-page-place-info-link">
          <ImageCard
              :img-src="'/images/router.svg'"
              :img-alt="'back'"
              :fit-direction="'height'"
          />
          <Text
              :textStyle="'14M'"
              :color="'black'"
              :tag="'span'"
              :text-align="'right'"
              :wrap="'wrap'"
          >
            <template #text>{{
                staticDataStore.staticStore?.contactInfo.address.routerTitle }}</template>
          </Text>
        </a>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.about-us-page {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  padding-bottom: 35vh;

  &-header {
    width: 100%;
    height: auto;
    position: relative;

    &-image-wrapper {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      aspect-ratio: 16/9;

      :deep(.ui-image-wrapper.width) {
        height: 100%;

        img {
          height: 100%;
        }
      }
    }

    &-back-icon {
      background-color: var(--light-secondary-12);
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      position: absolute;
      top: 16px;
      right: 16px;
      padding: 8px;
      cursor: pointer;

      svg {
        margin-top: 4px;
      }
    }
  }

  &-about-company {
    width: 100%;
    height: fit-content;
    display: flex;
    padding: 8px 16px 16px;
    column-gap: 16px;

    &-logo {
      width: 56px;
      height: 56px;

    }

    &-text {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      row-gap: 8px;
    }
  }

  &-contact-info {
    width: calc(100% - 16px);
    margin: 0 8px;
    display: flex;
    flex-direction: column;

    &-mobile-number {
      width: 100%;
      height: fit-content;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 8px;
    }

    .divider {
      width: 100%;
      height: 1px;
      background-color: var(--light-secondary-12);
    }

    &-company-number {
      width: 100%;
      height: fit-content;
      padding: 16px 0;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      &-together-number {
        width: fit-content;
        height: fit-content;
        display: flex;
        flex-direction: column;
        row-gap: 4px;
      }
    }
  }

  &-social-info {
    width: calc(100% - 16px);
    margin: 0 8px;
    display: flex;
    justify-content: space-between;
    padding-block: 12px;
    align-items: center;

    &-item-wrapper {
      width: fit-content;
      display: flex;
      justify-content: flex-end;
      gap: 16px;
      max-width: 60%;
      flex-wrap: wrap;
    }

    &-item {
      background-color: var(--light-secondary-6);
      width: 48px;
      height: 48px;
      border-radius: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    &-link {
      width: 100%;
      height: 100%;
      border-radius: 16px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      padding: 12px;
    }
  }

  &-place-info {
    width: calc(100% - 16px);
    margin: 0 8px;
    display: flex;
    flex-direction: column;
    row-gap: 24px;
    padding-block: 16px;

    &-text-wrapper {
      width: 100%;
      height: fit-content;
      display: flex;
      column-gap: 8px;
    }
    &-title-address{
      width: 44px;
      min-width: 43px;
      padding: 0;
      margin: 0;
      &.ui-text{
        padding: 0;
        margin: 0;
      }
    }

    &-link-wrapper {
      width: 100%;
      height: fit-content;
      display: flex;
      column-gap: 24px;
      justify-content: space-evenly;
    }

    &-link {
      background-color: var(--light-secondary-4);
      width: 100%;
      max-width: 170px;
      height: fit-content;
      padding: 8px;
      border-radius: 16px;
      border: 1px solid var(--light-secondary-12);
      display: flex;
      column-gap: 8px;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
}
</style>
