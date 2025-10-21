<script setup
        lang="ts">
import {useStaticData} from "~/store/staticData";
import File from "~/components/ui/File.vue";
import type {Ref} from "vue";
import ImageCard from "~/components/cards/ImageCard.vue";
import type {ImageFile} from "~/models/store.model";

enum StepsEnum {
  'brand',
  'category',
  'products',
  'contactInformation'
}

type Steps = keyof typeof StepsEnum
const store = useStaticData()
const route = useRoute()
const step: Ref<Steps> = ref('brand')
const {status} = route.query.id ? await useAsyncData('', async () =>
    await
    store.setEditStoreData(route.query.id as string))
: await useAsyncData('', () => store.clearEditStoreData())

function setStep(newStep: Steps): void {
  scrollTo({top: 0, behavior: 'smooth'})
  step.value = newStep
}

function handleBack(): void {
  scrollTo({top: 0, behavior: 'smooth'})
  switch (step.value) {
    case "contactInformation": {
      step.value = 'products'
      break;
    }
    case "products": {
      step.value = 'category'
      break;
    }
    case "category": {
      step.value = 'brand'
      break;
    }
    default: {
      step.value = 'brand'
      break;
    }
  }
}

async function handleSubmit(): Promise<void> {
  const data = await store.postStoreData()
  if (data) setTimeout(() => {
    navigateTo('/' + data.brand.enName)
  }, 1000)
}
</script>

<template>
  <div class="add-store" v-if="status !== 'idle' && status !== 'pending'">
    <div v-if="step !== 'brand'"
         class="back">
      <ImageCard
          @click="handleBack()"
          class="arrow-right-alt"
          :img-src="'/images/arrow-right-alt.svg'"
          :img-alt="'back'"
          :fit-direction="'height'"
      />
    </div>
    <Transition name="fade"
                :duration="{ enter: 500, leave: 1 }">
      <template v-if="step === 'brand'">
        <div class="box">
          <LazyUiText
              :textStyle="'26B'"
              :color="'black'"
              :tag="'span'"
              :text-align="'right'"
              :wrap="'wrap'"
          >
            <template #text>برند</template>
          </LazyUiText>
          <div class="row">
            <LazyUiTextInput
                v-model:model-value="store.addStoreBody.brand.enName"
                class="row-half"
                :placeholder="'آدرس سایت'"
                :error-text="''"
                :delay="false"
                :disabled="false"
                :id="'add-store-brand-name'"
                :bgc="'transparent'"
                :border-hide="false"
                :has-error="false"
                :thin="false"
                :type="'text'"
                :is-active="false"
                :input-style="'modern'"
                @update:model-value="($event) => store.addStoreBody.brand.enName = $event.replaceAll(' ', '-')"/>
            <LazyUiTextInput
                v-model:model-value="store.addStoreBody.brand.faName"
                class="row-half"
                :placeholder="'نام فارسی برند'"
                :error-text="''"
                :delay="false"
                :disabled="false"
                :id="'add-store-brand-name'"
                :bgc="'transparent'"
                :border-hide="false"
                :has-error="false"
                :thin="false"
                :type="'text'"
                :is-active="false"
                :input-style="'modern'"/>
            <LazyUiTextInput
                v-model:model-value="store.addStoreBody.brand.slogan"
                class="row-half"
                :placeholder="'شعار برند'"
                :error-text="''"
                :delay="false"
                :disabled="false"
                :id="'add-store-brand-name'"
                :bgc="'transparent'"
                :border-hide="false"
                :has-error="false"
                :thin="false"
                :type="'text'"
                :is-active="false"
                :input-style="'modern'"/>
            <div class="row-full">
              <div class="row-half">
                <p>افزودن لوگو</p>
              </div>
              <button class="add-button">
                <input type="file"
                       accept="image/*"
                       @change="store.addBrandLogo((($event as Event).target as HTMLInputElement).files)"/>
              </button>
            </div>
            <div v-if="store.addStoreBody.brand.logo"
                 class="row-half">
              <File type="image"
                    :file="store.addStoreBody.brand.logo.file"
                    v-model:model-value="store.addStoreBody.brand.logo.name"
                    @delete="store.deleteBrandLogo()"/>
            </div>
            <div class="row-full">
              <div class="row-half">
                <p>افزودن عکس شروع</p>
              </div>
              <button class="add-button">
                <input type="file"
                       accept="image/*"
                       @change="store.addBrandBanner((($event as Event).target as HTMLInputElement).files)"/>
              </button>
            </div>
            <div v-if="store.addStoreBody.brand.banner"
                 class="row-half">
              <File type="image"
                    :file="store.addStoreBody.brand.banner.file"
                    v-model:model-value="store.addStoreBody.brand.banner.name"
                    @delete="store.deleteBrandBanner()"/>
            </div>
            <div class="row-full">
              <div class="row-half">
                <p>افزودن تصویر بنر</p>
              </div>
              <button class="add-button">
                <input type="file"
                       accept="image/*"
                       multiple
                       @change="store.addProductBanner((($event as Event).target as HTMLInputElement).files)"/>
              </button>
            </div>
            <div v-if="store.addStoreBody.products.banner && Array.isArray(store.addStoreBody.products.banner)"
                 class="row-half">
              <template v-for="(banner, bannerIndex) in
              (store.addStoreBody.products.banner as ImageFile[])"
                        :key="'product-list-banner-' + bannerIndex">
                <File type="image"
                v-if="store.addStoreBody.products.banner[bannerIndex]"
                      :file="store.addStoreBody.products.banner[bannerIndex].file"
                      v-model:model-value="store.addStoreBody.products.banner[bannerIndex].name"
                      @delete="store.deleteProductBanner(bannerIndex)"/>
              </template>
            </div>
            <LazyUiTextInput
                v-model:model-value="store.addStoreBody.brand.shortDesc"
                class="row-half"
                :placeholder="'توضیحات کوتاه'"
                :error-text="''"
                :delay="false"
                :disabled="false"
                :id="'add-store-brand-name'"
                :bgc="'transparent'"
                :border-hide="false"
                :has-error="false"
                :thin="false"
                :type="'text'"
                :is-active="false"
                :input-style="'modern'"/>
            <LazyUiTextarea
                v-model:model-value="store.addStoreBody.brand.longDesc"
                class="row-full"
                :placeholder="'توضیحات بلند'"
                :error-text="''"
                :delay="false"
                :disabled="false"
                :id="'add-store-brand-name'"
                :bgc="'transparent'"
                :border-hide="false"
                :has-error="false"
                :thin="false"
                :type="'text'"
                :is-active="false"
                :input-style="'modern'"/>
          </div>
          <div class="row-full">
            <input type="checkbox"
                   id="show-intro-text"
                   v-model="store.addStoreBody.brand.showIntroText"/>
            <label for="show-intro-text">
              <LazyUiText
                  :textStyle="'16R'"
                  :color="'black'"
                  :tag="'span'"
                  :text-align="'right'"
                  :wrap="'wrap'"
              >
                <template #text>نمایش متن در صفحه اول</template>
              </LazyUiText>
            </label>
          </div>
        </div>
      </template>
    </Transition>
    <Transition name="fade"
                :duration="{ enter: 500, leave: 1 }">
      <button v-if="step === 'brand' && route.query.id"
              class="add-new-store-button">
        <LazyUiText
            :textStyle="'20B'"
            :color="'white'"
            :tag="'span'"
            :text-align="'center'"
            :wrap="'wrap'"
            @click="handleSubmit()"
        >
          <template #text>ذخیره تغییرات</template>
        </LazyUiText>
      </button>
    </Transition>
    <Transition name="fade"
                :duration="{ enter: 500, leave: 1 }">
      <button v-if="step === 'brand'"
              class="add-new-store-button">
        <LazyUiText
            :textStyle="'20B'"
            :color="'white'"
            :tag="'span'"
            :text-align="'center'"
            :wrap="'wrap'"
            @click="setStep('category')"
        >
          <template #text>مرحله بعد</template>
        </LazyUiText>
      </button>
    </Transition>
    <Transition name="fade"
                :duration="{ enter: 500, leave: 1 }">
      <template v-if="step === 'category'">
        <div class="box">
          <LazyUiText
              :textStyle="'26B'"
              :color="'black'"
              :tag="'span'"
              :text-align="'right'"
              :wrap="'wrap'"
          >
            <template #text>دسته بندی‌ها</template>
          </LazyUiText>
          <button class="add-button">
            <LazyUiText
                :textStyle="'14B'"
                :color="'white'"
                :tag="'span'"
                :text-align="'right'"
                :wrap="'wrap'"
                @click="store.addNewCategory()"
            >
              <template #text>اضافه کردن دسته بندی</template>
            </LazyUiText>
          </button>
          <template v-for="(category, categoryIndex) in store.addStoreBody.menu"
                    :key="'category-' + categoryIndex">
            <div class="row">
              <div class="close"
                   v-if="categoryIndex > 0"
                   @click="store.deleteCategory(categoryIndex)">
                X
              </div>
              <LazyUiTextInput
                  v-if="store.addStoreBody.menu[categoryIndex]"
                  v-model:model-value="store.addStoreBody.menu[categoryIndex].name"
                  class="row-half"
                  :placeholder="'نام دسته بندی'"
                  :error-text="''"
                  :delay="false"
                  :disabled="false"
                  :id="'add-store-brand-name'"
                  :bgc="'transparent'"
                  :border-hide="false"
                  :has-error="false"
                  :thin="false"
                  :type="'text'"
                  :is-active="false"
                  :input-style="'modern'"/>
              <LazyUiTextInput
                  v-model:model-value="store.addStoreBody.menu[categoryIndex].id"
                  class="row-half"
                  :placeholder="'آیدی دسته بندی'"
                  :error-text="''"
                  :delay="false"
                  :disabled="true"
                  :id="'add-store-brand-name'"
                  :bgc="'transparent'"
                  :border-hide="false"
                  :has-error="false"
                  :thin="false"
                  :type="'text'"
                  :is-active="false"
                  :input-style="'modern'"/>
            </div>
          </template>
        </div>
      </template>
    </Transition>
    <Transition name="fade"
                :duration="{ enter: 500, leave: 1 }">
      <button v-if="step === 'category' && route.query.id"
              class="add-new-store-button">
        <LazyUiText
            :textStyle="'20B'"
            :color="'white'"
            :tag="'span'"
            :text-align="'center'"
            :wrap="'wrap'"
            @click="handleSubmit()"
        >
          <template #text>ذخیره تغییرات</template>
        </LazyUiText>
      </button>
    </Transition>
    <Transition name="fade"
                :duration="{ enter: 500, leave: 1 }">
      <button v-if="step === 'category'"
              class="add-new-store-button">
        <LazyUiText
            :textStyle="'20B'"
            :color="'white'"
            :tag="'span'"
            :text-align="'center'"
            :wrap="'wrap'"
            @click="setStep('products')"
        >
          <template #text>مرحله بعد</template>
        </LazyUiText>
      </button>
    </Transition>
    <Transition name="fade"
                :duration="{ enter: 500, leave: 1 }">
      <template v-if="step === 'products'">
        <div class="box">
          <LazyUiText
              :textStyle="'26B'"
              :color="'black'"
              :tag="'span'"
              :text-align="'right'"
              :wrap="'wrap'"
          >
            <template #text>محصولات</template>
          </LazyUiText>
          <div class="row">
            <div class="row-full">
              <button class="add-button">
                <LazyUiText
                    :textStyle="'14B'"
                    :color="'white'"
                    :tag="'span'"
                    :text-align="'right'"
                    :wrap="'wrap'"
                    @click="store.addNewProduct()"
                >
                  <template #text>اضافه کردن محصول</template>
                </LazyUiText>
              </button>
            </div>
            <template v-for="(product, productIndex) in store.addStoreBody.products.list"
                      :key="'product-' + productIndex">
              <div class="row product-box"
                   :class="((store.addStoreBody.products.list.length % 2) === 0 && productIndex === 0) ? 'with-background' : ((store.addStoreBody.products.list.length % 2) === 0 && (productIndex % 2) === 0) ? 'with-background' : ((store.addStoreBody.products.list.length % 2) !== 0 && (productIndex % 2) !== 0) ? 'with-background' : ''">
                <div class="close close-section"
                     v-if="productIndex > 0"
                     @click="store.deleteProduct(productIndex)">X
                </div>
                <LazyUiTextInput
                    v-if="store.addStoreBody.products.list[productIndex]"
                    v-model:model-value="store.addStoreBody.products.list[productIndex].name"
                    class="row-half"
                    :placeholder="'نام محصول'"
                    :error-text="''"
                    :delay="false"
                    :disabled="false"
                    :id="'add-store-brand-name'"
                    :bgc="'transparent'"
                    :border-hide="false"
                    :has-error="false"
                    :thin="false"
                    :type="'text'"
                    :is-active="false"
                    :input-style="'modern'"/>
                <LazyUiTextInput
                    v-model:model-value="store.addStoreBody.products.list[productIndex].id"
                    class="row-half"
                    :placeholder="'آیدی محصول'"
                    :error-text="''"
                    :delay="false"
                    :disabled="false"
                    :id="'add-store-brand-name'"
                    :bgc="'transparent'"
                    :border-hide="false"
                    :has-error="false"
                    :thin="false"
                    :type="'text'"
                    :is-active="false"
                    :input-style="'modern'"/>
                <LazyUiTextarea
                    v-model:model-value="store.addStoreBody.products.list[productIndex].description"
                    class="row-half"
                    :placeholder="'توضیحات محصول'"
                    :error-text="''"
                    :delay="false"
                    :disabled="false"
                    :id="'add-store-brand-name'"
                    :bgc="'transparent'"
                    :border-hide="false"
                    :has-error="false"
                    :thin="false"
                    :type="'text'"
                    :is-active="false"
                    :input-style="'modern'"/>
                <select v-model="store.addStoreBody.products.list[productIndex].category">
                  <option selected
                          disabled
                          :value="{name: '', id: ''}">انتخاب دسته بندی محصول
                  </option>
                  <option v-for="(productCategory, productCategoryIndex) in store.addStoreBody.menu"
                          :key="'select-category-' + productCategoryIndex"
                          :value="productCategory">
                    {{ productCategory.name || '' }}
                  </option>
                </select>
                <div class="row-half">
                  <p>فایل صوتی محصول</p>
                </div>
                <div class="row-half">
                  <LazyUiTextInput
                      v-model:model-value="store.addStoreBody.products.list[productIndex].audioTitle"
                      class="row-full"
                      :placeholder="'عنوان فایل صوتی'"
                      :error-text="''"
                      :delay="false"
                      :disabled="false"
                      :id="'add-store-brand-name'"
                      :bgc="'transparent'"
                      :border-hide="false"
                      :has-error="false"
                      :thin="false"
                      :type="'text'"
                      :is-active="false"
                      :input-style="'modern'"/>
                </div>
                <button v-if="!store.addStoreBody.products.list[productIndex].audio"
                        class="add-button row-full">
                  <input type="file"
                         accept="audio/*"
                         @change="store.addAudioFile(productIndex, (($event as Event).target as HTMLInputElement).files)"/>
                </button>
                <div
                    v-if="store.addStoreBody.products.list[productIndex].audio"
                    class="row-full">
                  <File
                      type="audio"
                      :file="store.addStoreBody.products.list[productIndex].audio.file"
                      v-model:model-value="store.addStoreBody.products.list[productIndex].audio.name"
                      @delete="store.deleteAudioFile(productIndex)"/>
                </div>
                <LazyUiTextInput
                    v-model:model-value="store.addStoreBody.products.list[productIndex].price"
                    class="row-half"
                    :placeholder="'قیمت محصول'"
                    :error-text="''"
                    :delay="false"
                    :disabled="false"
                    :id="'add-store-brand-name'"
                    :bgc="'transparent'"
                    :border-hide="false"
                    :has-error="false"
                    :thin="false"
                    :type="'text'"
                    :is-active="false"
                    :input-style="'modern'"/>
                <LazyUiTextInput
                    v-model:model-value="store.addStoreBody.products.list[productIndex].priceTitle"
                    class="row-half"
                    :placeholder="'واحد پول'"
                    :error-text="''"
                    :delay="false"
                    :disabled="false"
                    :id="'add-store-brand-name'"
                    :bgc="'transparent'"
                    :border-hide="false"
                    :has-error="false"
                    :thin="false"
                    :type="'text'"
                    :is-active="false"
                    :input-style="'modern'"/>
                <div class="row-full">
                  <div class="row-half">
                    <p>عکس کاور محصول</p>
                  </div>
                  <button class="add-button">
                    <input type="file"
                           accept="image/*"
                           @change="store.addProductCover(productIndex, (($event as Event).target as HTMLInputElement).files)"/>
                  </button>
                </div>
                <div v-if="store.addStoreBody.products.list[productIndex]?.image"
                     class="row-half">
                  <File
                      type="image"
                      :file="store.addStoreBody.products.list[productIndex].image.file"
                      v-model:model-value="store.addStoreBody.products.list[productIndex].image.name"
                      @delete="store.deleteProductCover(productIndex)"/>
                </div>
                <div class="row-full">
                  <div class="row-half">
                    <button class="add-button">
                      <LazyUiText
                          :textStyle="'14B'"
                          :color="'white'"
                          :tag="'span'"
                          :text-align="'right'"
                          :wrap="'wrap'"
                          @click="store.addNewColor(productIndex)"
                      >
                        <template #text>اضافه کردن رنگ و عکس</template>
                      </LazyUiText>
                    </button>
                  </div>
                  <div class="row-half">

                    <LazyUiTextInput
                        v-model:model-value="store.addStoreBody.products.list[productIndex].colorsTitle"
                        class="row-full"
                        :placeholder="'عنوان قسمت رنگ'"
                        :error-text="''"
                        :delay="false"
                        :disabled="false"
                        :id="'add-store-brand-name'"
                        :bgc="'transparent'"
                        :border-hide="false"
                        :has-error="false"
                        :thin="false"
                        :type="'text'"
                        :is-active="false"
                        :input-style="'modern'"/>
                  </div>
                </div>
                <template v-for="(color, colorIndex) in product.colors"
                          :key="'product-color-' + colorIndex">
                  <div class="row">
                    <div class="divider"
                         v-if="colorIndex > 0"></div>
                    <div class="close close-section"
                         v-if="colorIndex > 0"
                         @click="store.deleteColor(productIndex, colorIndex)">X
                    </div>
                    <LazyUiTextInput
                        v-if="product.colors[colorIndex]"
                        v-model:model-value="product.colors[colorIndex].name"
                        class="row-half"
                        :placeholder="'نام رنگ'"
                        :error-text="''"
                        :delay="false"
                        :disabled="false"
                        :id="'add-store-brand-name'"
                        :bgc="'transparent'"
                        :border-hide="false"
                        :has-error="false"
                        :thin="false"
                        :type="'text'"
                        :is-active="false"
                        :input-style="'modern'"/>
                    <LazyUiTextInput
                        v-model:model-value="product.colors[colorIndex].colorCode"
                        class="row-half"
                        :placeholder="'کد رنگ با #'"
                        :error-text="''"
                        :delay="false"
                        :disabled="false"
                        :id="'add-store-brand-name'"
                        :bgc="'transparent'"
                        :border-hide="false"
                        :has-error="false"
                        :thin="false"
                        :type="'text'"
                        :is-active="false"
                        :input-style="'modern'"/>
                    <div class="row-full">
                      <div class="row-half">
                        <p>عکس های محصول</p>
                      </div>
                      <button class="add-button">
                        <input type="file"
                               accept="image/*"
                               multiple
                               @change="store.addNewImage(productIndex, colorIndex, (($event as Event).target as HTMLInputElement).files)"/>
                      </button>
                    </div>
                    <template v-for="(image, imageIndex) in product.colors[colorIndex].imageFiles"
                              :key="'product-image-' + imageIndex">
                      <div class="row-half">
                        <File
                            v-if="product.colors[colorIndex].imageFiles[imageIndex]"
                            type="image"
                            :file="product.colors[colorIndex].imageFiles[imageIndex].file"
                            v-model:model-value="product.colors[colorIndex].imageFiles[imageIndex].name"
                            @delete="store.deleteImage(productIndex, colorIndex, imageIndex)"/>
                      </div>
                    </template>
                  </div>
                </template>
                <div class="row-full">
                  <button class="add-button">
                    <LazyUiText
                        :textStyle="'14B'"
                        :color="'white'"
                        :tag="'span'"
                        :text-align="'right'"
                        :wrap="'wrap'"
                        @click="store.addNewSpec(productIndex)"
                    >
                      <template #text>اضافه کردن مشخصات</template>
                    </LazyUiText>
                  </button>
                </div>
                <template v-for="(spec, specIndex) in product.specs"
                          :key="'product-spec-' + specIndex">
                  <div class="row">
                    <div class="close"
                         v-if="specIndex > 0"
                         @click="store.deleteSpec(productIndex, specIndex)">X
                    </div>
                    <LazyUiTextInput
                        v-model:model-value="product.specs[specIndex].text"
                        class="row-half"
                        :placeholder="'متن مشخصات'"
                        :error-text="''"
                        :delay="false"
                        :disabled="false"
                        :id="'add-store-brand-name'"
                        :bgc="'transparent'"
                        :border-hide="false"
                        :has-error="false"
                        :thin="false"
                        :type="'text'"
                        :is-active="false"
                        :input-style="'modern'"/>
                    <LazyUiTextInput
                        v-model:model-value="product.specs[specIndex].title"
                        class="row-half"
                        :placeholder="'عنوان مشخصات'"
                        :error-text="''"
                        :delay="false"
                        :disabled="false"
                        :id="'add-store-brand-name'"
                        :bgc="'transparent'"
                        :border-hide="false"
                        :has-error="false"
                        :thin="false"
                        :type="'text'"
                        :is-active="false"
                        :input-style="'modern'"/>
                  </div>
                </template>
              </div>
            </template>
          </div>
        </div>
      </template>
    </Transition>
    <Transition name="fade"
                :duration="{ enter: 500, leave: 1 }">
      <button v-if="step === 'products' && route.query.id"
              class="add-new-store-button">
        <LazyUiText
            :textStyle="'20B'"
            :color="'white'"
            :tag="'span'"
            :text-align="'center'"
            :wrap="'wrap'"
            @click="handleSubmit()"
        >
          <template #text>ذخیره تغییرات</template>
        </LazyUiText>
      </button>
    </Transition>
    <Transition name="fade"
                :duration="{ enter: 500, leave: 1 }">
      <button v-if="step === 'products'"
              class="add-new-store-button">
        <LazyUiText
            :textStyle="'20B'"
            :color="'white'"
            :tag="'span'"
            :text-align="'center'"
            :wrap="'wrap'"
            @click="setStep('contactInformation')"
        >
          <template #text>مرحله بعد</template>
        </LazyUiText>
      </button>
    </Transition>
    <Transition name="fade"
                :duration="{ enter: 500, leave: 1 }">
      <template v-if="step === 'contactInformation'">
        <div class="box">
          <LazyUiText
              :textStyle="'26B'"
              :color="'black'"
              :tag="'span'"
              :text-align="'right'"
              :wrap="'wrap'"
          >
            <template #text>اطلاعات تماس</template>
          </LazyUiText>
          <div class="row">
            <div class="row-half">

              <LazyUiTextInput
                  v-model:model-value="store.addStoreBody.contactInfo.address.title"
                  class="row-full"
                  :placeholder="'عنوان آدرس'"
                  :error-text="''"
                  :delay="false"
                  :disabled="false"
                  :id="'add-store-brand-name'"
                  :bgc="'transparent'"
                  :border-hide="false"
                  :has-error="false"
                  :thin="false"
                  :type="'text'"
                  :is-active="false"
                  :input-style="'modern'"/>
            </div>
            <LazyUiTextarea
                v-model:model-value="store.addStoreBody.contactInfo.address.text"
                class="row-full"
                :placeholder="'متن آدرس'"
                :error-text="''"
                :delay="false"
                :disabled="false"
                :id="'add-store-brand-name'"
                :bgc="'transparent'"
                :border-hide="false"
                :has-error="false"
                :thin="false"
                :type="'text'"
                :is-active="false"
                :input-style="'modern'"/>
            <div class="row-half">
              <LazyUiTextInput
                  v-model:model-value="store.addStoreBody.contactInfo.address.locationTitle"
                  class="row-full"
                  :placeholder="'عنوان لوکیشن'"
                  :error-text="''"
                  :delay="false"
                  :disabled="false"
                  :id="'add-store-brand-name'"
                  :bgc="'transparent'"
                  :border-hide="false"
                  :has-error="false"
                  :thin="false"
                  :type="'text'"
                  :is-active="false"
                  :input-style="'modern'"/>
            </div>
            <LazyUiTextarea
                v-model:model-value="store.addStoreBody.contactInfo.address.location"
                class="row-half"
                :placeholder="'لینک لوکیشن'"
                :error-text="''"
                :delay="false"
                :disabled="false"
                :id="'add-store-brand-name'"
                :bgc="'transparent'"
                :border-hide="false"
                :has-error="false"
                :thin="false"
                :type="'text'"
                :is-active="false"
                :input-style="'modern'"/>
            <div class="row-half">
              <LazyUiTextInput
                  v-model:model-value="store.addStoreBody.contactInfo.address.routerTitle"
                  class="row-full"
                  :placeholder="'عنوان مسیریاب'"
                  :error-text="''"
                  :delay="false"
                  :disabled="false"
                  :id="'add-store-brand-name'"
                  :bgc="'transparent'"
                  :border-hide="false"
                  :has-error="false"
                  :thin="false"
                  :type="'text'"
                  :is-active="false"
                  :input-style="'modern'"/>
            </div>
            <LazyUiTextarea
                v-model:model-value="store.addStoreBody.contactInfo.address.router"
                class="row-half"
                :placeholder="'لینک مسیریاب'"
                :error-text="''"
                :delay="false"
                :disabled="false"
                :id="'add-store-brand-name'"
                :bgc="'transparent'"
                :border-hide="false"
                :has-error="false"
                :thin="false"
                :type="'text'"
                :is-active="false"
                :input-style="'modern'"/>
            <div class="row-half">
              <p>بنر صفحه تماس باما</p>
            </div>
            <button v-if="!store.addStoreBody.contactInfo.banner"
                    class="add-button">
              <input type="file"
                     accept="image/*"
                     @change="store.addContactUsBanner((($event as Event).target as HTMLInputElement).files)"/>
            </button>
            <div v-if="store.addStoreBody.contactInfo.banner"
                 class="row-half">
              <File type="image"
                    :file="store.addStoreBody.contactInfo.banner.file"
                    v-model:model-value="store.addStoreBody.contactInfo.banner.name"
                    @delete="store.deleteContactUsBanner()"/>
            </div>
            <div class="row">
              <button class="add-button row-half">
                <LazyUiText
                    :textStyle="'14B'"
                    :color="'white'"
                    :tag="'span'"
                    :text-align="'right'"
                    :wrap="'wrap'"
                    @click="store.addNewPhoneNumber()"
                >
                  <template #text>اضافه کردن شماره موبایل</template>
                </LazyUiText>
              </button>
              <div class="row-half">
                <LazyUiTextInput
                    v-model:model-value="store.addStoreBody.contactInfo.phoneNumberTitle"
                    class="row-full"
                    :placeholder="'عنوان تلفن همراه'"
                    :error-text="''"
                    :delay="false"
                    :disabled="false"
                    :id="'add-store-brand-name'"
                    :bgc="'transparent'"
                    :border-hide="false"
                    :has-error="false"
                    :thin="false"
                    :type="'text'"
                    :is-active="false"
                    :input-style="'modern'"/>
              </div>
            </div>
            <template
                v-for="(phoneNumber, phoneNumberIndex) in store.addStoreBody.contactInfo.phoneNumber"
                :key="'store-telephone-' + telephoneIndex">
              <div class="row">
                <div class="close"
                     v-if="phoneNumberIndex > 0"
                     @click="store.deletePhoneNumber(phoneNumberIndex)">X
                </div>
                <LazyUiTextInput
                    v-model:model-value="store.addStoreBody.contactInfo.phoneNumber[phoneNumberIndex]"
                    class="row-half"
                    :placeholder="'شماره موبایل'"
                    :error-text="''"
                    :delay="false"
                    :disabled="false"
                    :id="'add-store-brand-name'"
                    :bgc="'transparent'"
                    :border-hide="false"
                    :has-error="false"
                    :thin="false"
                    :type="'text'"
                    :is-active="false"
                    :input-style="'modern'"/>
              </div>
            </template>
            <div class="row">
              <button class="add-button row-half">
                <LazyUiText
                    :textStyle="'14B'"
                    :color="'white'"
                    :tag="'span'"
                    :text-align="'right'"
                    :wrap="'wrap'"
                    @click="store.addNewTelephone()"
                >
                  <template #text>اضافه کردن شماره کارخانه</template>
                </LazyUiText>
              </button>
              <div class="row-half">
                <LazyUiTextInput
                    v-model:model-value="store.addStoreBody.contactInfo.telephoneTitle"
                    class="row-full"
                    :placeholder="'عنوان تلفن کارخانه'"
                    :error-text="''"
                    :delay="false"
                    :disabled="false"
                    :id="'add-store-brand-name'"
                    :bgc="'transparent'"
                    :border-hide="false"
                    :has-error="false"
                    :thin="false"
                    :type="'text'"
                    :is-active="false"
                    :input-style="'modern'"/>
              </div>
            </div>
            <template
                v-for="(telephone, telephoneIndex) in store.addStoreBody.contactInfo.telephone"
                :key="'store-telephone-' + telephoneIndex">
              <div class="row">
                <div class="close"
                     v-if="telephoneIndex > 0"
                     @click="store.deleteTelephone(telephoneIndex)">X
                </div>
                <LazyUiTextInput
                    v-model:model-value="store.addStoreBody.contactInfo.telephone[telephoneIndex]"
                    class="row-half"
                    :placeholder="'شماره کارخانه'"
                    :error-text="''"
                    :delay="false"
                    :disabled="false"
                    :id="'add-store-mobile-phone'"
                    :bgc="'transparent'"
                    :border-hide="false"
                    :has-error="false"
                    :thin="false"
                    :type="'text'"
                    :is-active="false"
                    :input-style="'modern'"/>
              </div>
            </template>
            <div class="row">
              <button class="add-button row-half">
                <LazyUiText
                    :textStyle="'14B'"
                    :color="'white'"
                    :tag="'span'"
                    :text-align="'right'"
                    :wrap="'wrap'"
                    @click="store.addNewSocialMedia()"
                >
                  <template #text>اضافه کردن شبکه اجتماعی</template>
                </LazyUiText>
              </button>
              <div class="row-half">
                <LazyUiTextInput
                    v-model:model-value="store.addStoreBody.contactInfo.socialMediaTitle"
                    class="row-full"
                    :placeholder="'عنوان شبکه های اجتماعی'"
                    :error-text="''"
                    :delay="false"
                    :disabled="false"
                    :id="'add-store-brand-name'"
                    :bgc="'transparent'"
                    :border-hide="false"
                    :has-error="false"
                    :thin="false"
                    :type="'text'"
                    :is-active="false"
                    :input-style="'modern'"/>
              </div>
            </div>
            <template v-for="(social, socialIndex) in store.addStoreBody.contactInfo.socialMedia"
                      :key="'store-social-media-' + socialIndex">
              <div class="row">
                <div class="close"
                     v-if="socialIndex > 0"
                     @click="store.deleteSocialMedia(socialIndex)">
                  X
                </div>
                <select name=""
                        id=""
                        v-model="social.type">
                  <option value="instagram">اینستاگرام</option>
                  <option value="telegram">تلگرام</option>
                  <option value="whatsapp">واتس اپ</option>
                  <option value="website">وبسایت</option>
                  <option value="eata">ایتا</option>
                  <option value="rubika">روبیکا</option>
                </select>
                <LazyUiTextInput
                    v-model:model-value="social.link"
                    class="row-half"
                    :placeholder="'لینک شبکه اجتماعی'"
                    :error-text="''"
                    :delay="false"
                    :disabled="false"
                    :id="'add-store-brand-name'"
                    :bgc="'transparent'"
                    :border-hide="false"
                    :has-error="false"
                    :thin="false"
                    :type="'text'"
                    :is-active="false"
                    :input-style="'modern'"/>
              </div>
            </template>
          </div>
        </div>
      </template>
    </Transition>
    <Transition name="fade"
                :duration="{ enter: 500, leave: 1 }">
      <button v-if="step === 'contactInformation'"
              class="add-new-store-button">
        <LazyUiText
            :textStyle="'20B'"
            :color="'white'"
            :tag="'span'"
            :text-align="'center'"
            :wrap="'wrap'"
            @click="handleSubmit()"
        >
          <template #text>{{
              route.query.id ? 'ذخیره تغییرات' : 'ثبت فروشگاه'
            }}
          </template>
        </LazyUiText>
      </button>
    </Transition>
  </div>
</template>

<style scoped
       lang="scss">
#show-intro-text {
  margin-left: 1rem;
  cursor: pointer;
}

label {
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.add-button {
  width: fit-content;
  height: fit-content;
  cursor: pointer;
  padding: .5rem 1.5rem;
  border-radius: .5rem;
  background-color: var(--cyan);
  display: flex;
  align-items: center;
  justify-content: center;
}

.divider {
  width: 100%;
  height: 2px;
  background-color: var(--cyan);
  margin: .25rem 0;
}

.close {
  position: absolute;
  right: -24px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  aspect-ratio: 1/1;
  background-color: var(--red);
  color: var(--basic-white);
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: normal;
  cursor: pointer;
  z-index: 1;

  &-section {
    top: 45px;
    transform: unset;
  }
}

.add-new-store-button {
  width: 100%;
  height: fit-content;
  cursor: pointer;
  padding: .5rem 1.5rem;
  border-radius: .5rem;
  background-color: var(--cyan);
  display: flex;
  align-items: center;
  justify-content: center;
}

.back {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
}

.add-store {
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 4rem 1rem;
  position: relative;

  .box {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    position: relative;

    .row {
      width: 100%;
      height: fit-content;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      position: relative;

      &-half {
        width: calc(50% - .5rem);
        position: relative;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
      }

      &-full {
        width: 100%;
        position: relative;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
      }
    }
  }
}

.product-box {
  padding: 3rem 1rem;
  border-radius: .5rem;

  &.with-background {
    background-color: var(--light-secondary-4);
  }
}
</style>