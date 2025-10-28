import type {
    Address, Brand, Category, Colors,
    ContactInfo,
    GetStoreApiResponse, ImageFile,
    Menu, PostStoreApiResponse,
    Product,
    Products, SocialMedia, Specs,
    Store
} from "~/models/store.model";
import {defineStore} from 'pinia'
import type {Ref} from "vue";

export const useStaticData = defineStore('static-data', () => {
    const route = useRoute()
    const brandLogoTemplateRef: Ref<string> = ref('')
    const brandBannerTemplateRef: Ref<string> = ref('')
    const productAudioTemplateRef: Ref<string> = ref('')
    const productBannerTemplateRef: Ref<string> = ref('')
    const productCoverTemplateRef: Ref<string> = ref('')
    const productImageListTemplateRef: Ref<string> = ref('')
    const contactUsBannerTemplateRef: Ref<string> = ref('')
    const staticStore: Ref<Store | null> = ref(null)
    const storeKeys: Ref<Store[] | null> = ref(null)
    const brandLogo: Ref<ImageFile | null> = ref(null)
    const brandBanner: Ref<ImageFile | null> = ref(null)
    const productBanner: Ref<ImageFile | null> = ref(null)
    const productCover: Ref<ImageFile | null> = ref(null)
    const productAudio: Ref<ImageFile | null> = ref(null)
    const brand: Ref<Brand> = ref({
        enName: '',
        faName: '',
        logo: brandLogo.value,
        longDesc: '',
        shortDesc: '',
        slogan: '',
        banner: brandBanner.value,
        showIntroText: true
    })
    const menu: Ref<Menu[]> = ref([{
        id: 'category-1',
        name: ''
    }])
    const specs: Ref<Specs[]> = ref([
        {
            title: '',
            text: ''
        }
    ])
    const category: Ref<Category> = ref({
        name: '',
        id: ''
    })
    const imageFiles: Ref<ImageFile[]> = ref([])
    const colors: Ref<Colors[]> = ref([
        {
            name: '',
            colorCode: '',
            imageFiles: imageFiles.value
        }
    ])
    const price: Ref<string> = ref('')
    const productList: Ref<Product[]> = ref([
        {
            name: '',
            id: 'product-1',
            specs: specs.value,
            audio: productAudio.value,
            price: price.value,
            description: '',
            category: category.value,
            colors: colors.value,
            image: productCover.value
        }])
    const products: Ref<Products> = ref({
        banner: null,
        list: productList.value
    })
    const phoneNumber: Ref<string[]> = ref([''])
    const router: Ref<string> = ref('')
    const location: Ref<string> = ref('')
    const address: Ref<Address> = ref({
        text: '',
        router: router.value,
        location: location.value
    })
    const telephone: Ref<string[]> = ref([''])
    const socialMedia: Ref<SocialMedia[]> = ref([{
        link: '',
        type: 'instagram'
    }])
    const contactInformation: Ref<ContactInfo> = ref({
        phoneNumber: phoneNumber.value,
        address: address.value,
        telephone: telephone.value,
        socialMedia: socialMedia.value,
        banner: null,
        telephoneTitle: '',
        phoneNumberTitle: '',
        socialMediaTitle: ''
    })
    const addStoreBody: Ref<Store> = ref({
        brand: brand.value,
        menu: menu.value,
        products: products.value,
        contactInfo: contactInformation.value
    })

    async function getStoresList(): Promise<Store[]> {
        try {
            storeKeys.value = JSON.parse(JSON.stringify([]))
            const {data} = await useFetch<{ data: Store[] }>(`/api/stores-list`, {
                method: "GET"
            })
            if (data.value) {
                storeKeys.value = JSON.parse(JSON.stringify(data.value.data))
                return Promise.resolve(data.value.data as Store[])
            } else return Promise.reject()
        } catch (error) {
            console.error(error)
            return Promise.reject()
        }
    }

    async function getStoreData(shopName: string): Promise<GetStoreApiResponse> {
        try {
            const {data} = await useFetch<GetStoreApiResponse>(`/api/stores`, {
                method: "GET",
                query: {
                    shopName: shopName
                }
            })

            if (data.value) {
                const flattedData = {
                    ...data.value,
                    data: {
                        ...data.value.data,
                        menu: data.value.data.menu.filter(menu => menu.name !== ''),
                        products: {
                            ...data.value.data.products,
                            banner: data.value.data.products.banner && Array.isArray(data.value.data.products.banner) ? data.value.data.products.banner : [data.value.data.products.banner],
                            list: data.value.data.products.list.map(product => {
                                return {
                                    ...product,
                                    specs: product.specs.filter(spec => spec.title !== ''),
                                    colors: product.colors.filter(color => color.colorCode !== '')
                                }
                            })
                        }
                    }
                }
                return Promise.resolve(flattedData as GetStoreApiResponse)
            } else return Promise.reject()
        } catch (error) {
            console.error(error)
            return Promise.reject()
        }
    }

    async function setStoreData(shopName: string): Promise<Store> {
        try {
            const {data} = await getStoreData(shopName)
            if (data) {
                staticStore.value = data
                staticStore.value = {
                    ...staticStore.value,
                    menu: staticStore.value.menu.filter(menu => menu.name !== ''),
                    contactInfo: {
                        ...staticStore.value.contactInfo,
                        address: {
                            ...staticStore.value.contactInfo.address,
                            title: staticStore.value.contactInfo.address.title ?? 'نشانی',
                            locationTitle: staticStore.value.contactInfo.address.locationTitle ?? 'لوکیشن',
                            routerTitle: staticStore.value.contactInfo.address.routerTitle ?? 'مسیریابی'
                        },
                        socialMediaTitle: staticStore.value.contactInfo.socialMediaTitle ?? 'ارتباط سریع و آسان',
                        phoneNumberTitle: staticStore.value.contactInfo.phoneNumberTitle ?? 'تلفن همراه',
                        telephoneTitle: staticStore.value.contactInfo.telephoneTitle ?? 'تلفن کارخانه'
                    },
                    products: {
                        ...staticStore.value.products,
                        banner: staticStore.value.products.banner && Array.isArray(staticStore.value.products.banner) ? staticStore.value.products.banner : staticStore.value.products.banner ? [staticStore.value.products.banner] : null,
                        list: staticStore.value.products.list.map(product => {
                            return {
                                ...product,
                                audioTitle: product.audioTitle ?? 'توضیحات صوتی',
                                colorsTitle: product.colorsTitle ?? 'رنگ',
                                priceTitle: product.priceTitle ?? 'تومان',
                                specs: product.specs.filter(spec => spec.title !== ''),
                                colors: product.colors.filter(color => color.colorCode !== '')
                            }
                        })
                    }
                }
                if (data.brand.showIntroText === undefined) staticStore.value.brand.showIntroText = true
                return Promise.resolve(data)
            } else return Promise.reject()
        } catch (error) {
            console.error(error)
            return Promise.reject()
        }
    }

    async function setEditStoreData(shopName: string): Promise<Store> {
        try {
            const {data} = await getStoreData(shopName)
            if (data) {
                addStoreBody.value = data
                addStoreBody.value = {
                    ...addStoreBody.value,
                    menu: addStoreBody.value.menu.filter(menu => menu.name !== ''),
                    contactInfo: {
                        ...addStoreBody.value.contactInfo,
                        address: {
                            ...addStoreBody.value.contactInfo.address,
                            title: addStoreBody.value.contactInfo.address.title ?? 'نشانی',
                            locationTitle: addStoreBody.value.contactInfo.address.locationTitle ?? 'لوکیشن',
                            routerTitle: addStoreBody.value.contactInfo.address.routerTitle ?? 'مسیریابی'
                        },
                        socialMediaTitle: addStoreBody.value.contactInfo.socialMediaTitle ?? 'ارتباط سریع و آسان',
                        phoneNumberTitle: addStoreBody.value.contactInfo.phoneNumberTitle ?? 'تلفن همراه',
                        telephoneTitle: addStoreBody.value.contactInfo.telephoneTitle ?? 'تلفن کارخانه'
                    },
                    products: {
                        ...addStoreBody.value.products,
                        banner: addStoreBody.value.products.banner && Array.isArray(addStoreBody.value.products.banner) ? addStoreBody.value.products.banner : addStoreBody.value.products.banner ? [addStoreBody.value.products.banner] : null,
                        list: addStoreBody.value.products.list.map(product => {
                            return {
                                ...product,
                                audioTitle: product.audioTitle ?? 'توضیحات صوتی',
                                colorsTitle: product.colorsTitle ?? 'رنگ',
                                priceTitle: product.priceTitle ?? 'تومان',
                                specs: product.specs.filter(spec => spec.title !== ''),
                                colors: product.colors.filter(color => color.colorCode !== '')
                            }
                        })
                    }
                }
                if (data.brand.showIntroText === undefined) addStoreBody.value.brand.showIntroText = true
                return Promise.resolve(data)
            } else return Promise.reject()
        } catch (error) {
            console.error(error)
            return Promise.reject()
        }
    }

    async function clearEditStoreData(): Promise<void> {
        addStoreBody.value = {
            contactInfo: {
                socialMediaTitle: '',
                phoneNumberTitle: '',
                telephoneTitle: '',
                phoneNumber: [''],
                banner: null,
                socialMedia: [{link: '', type: 'instagram'}],
                telephone: [''],
                address: {
                    text: '',
                    router: '',
                    location: ''
                }
            },
            brand: {
                enName: '',
                banner: null,
                logo: null,
                faName: '',
                slogan: '',
                shortDesc: '',
                longDesc: '',
                showIntroText: true
            },
            products:
                {
                    banner: null,
                    list: [
                        {
                            audio: null,
                            image: null,
                            specs: [{text: '', title: ''}],
                            colors: [{
                                name: '',
                                imageFiles: [],
                                colorCode: ''
                            }],
                            price: '',
                            name: '',
                            id: 'product-1',
                            category: {
                                name: '',
                                id: ''
                            },
                            description: ''
                        }
                    ]
                },
            menu: [{
                name: '',
                id: 'category-1',
            }]
        }
        return Promise.resolve()
    }

    async function postStoreData(): Promise<PostStoreApiResponse> {
        try {
            const flattedBody = {
                ...addStoreBody.value,
                products: {
                    ...addStoreBody.value.products,
                    menu: addStoreBody.value.menu.filter(menu => menu.name !== ''),
                    list: addStoreBody.value.products.list.map(product => {
                        return {
                            ...product,
                            specs: product.specs.filter(spec => spec.title !== ''),
                            colors: product.colors.filter(color => color.colorCode !== '')
                        }
                    })
                }
            }
            const {data} = await useFetch<PostStoreApiResponse>(`/api/stores`, {
                method: "post",
                body: flattedBody
            })

            if (data.value) {
                return Promise.resolve(data.value as PostStoreApiResponse)
            } else return Promise.reject()
        } catch (error) {
            console.error(error)
            return Promise.reject()
        }
    }

    async function deleteStore(shopName: string): Promise<void> {
        try {
            const {data} = await useFetch<{ data: void }>(`/api/stores`, {
                method: "DELETE",
                query: {
                    shopName: shopName
                }
            })
            return Promise.resolve()
        } catch {
            return Promise.reject()
        }
    }

    function addBrandLogo(file: FileList | null): void {
        if (!file) {
            addStoreBody.value.brand.logo = null
            return
        }
        addStoreBody.value.brand.logo = {
            file: file[0],
            name: ''
        }
    }

    function addBrandBanner(file: FileList | null): void {
        if (!file) {
            addStoreBody.value.brand.banner = null
            return
        }
        addStoreBody.value.brand.banner = {
            file: file[0],
            name: ''
        }
    }

    function addProductBanner(file: FileList | null): void {
        if (!file?.length) {
            addStoreBody.value.products.banner = []
            return
        }

        const banners: ImageFile[] = Array.isArray(addStoreBody.value.products.banner)
            ? addStoreBody.value.products.banner.filter(Boolean)
            : []

        for (const f of Array.from(file)) {
            if (!f) continue
            banners.push({
                file: f,
                name: f.name
            })
        }

        addStoreBody.value.products.banner = banners
    }


    function addProductCover(productIndex: number, file: FileList | null): void {
        if (!file) {
            addStoreBody.value.products.list[productIndex].image = null
            return
        }
        addStoreBody.value.products.list[productIndex].image = {
            file: file[0],
            name: ''
        }
    }

    function addNewCategory(): void {
        addStoreBody.value.menu.unshift({
            id: 'category-' + (addStoreBody.value.menu.length + 1),
            name: ''
        })
    }

    function addNewProduct(): void {
        addStoreBody.value.products.list.unshift({
            id: 'product-' + (addStoreBody.value.products.list.length + 1),
            name: '',
            category: {
                id: '',
                name: ''
            },
            audio: null,
            colors: [{
                name: '',
                colorCode: '',
                imageFiles: []
            }],
            specs: [{
                text: '',
                title: ''
            }],
            description: '',
            image: null,
            price: ''
        })

    }

    function addAudioFile(productIndex: number, files: FileList | null): void {
        if (!files) {
            addStoreBody.value.products.list[productIndex].audio = null
            return
        }
        addStoreBody.value.products.list[productIndex].audio = {
            file: files[0],
            name: ''
        }
    }

    function addContactUsBanner(files: FileList | null): void {
        if (!files) {
            addStoreBody.value.contactInfo.banner = null
            return
        }
        addStoreBody.value.contactInfo.banner = {
            file: files[0],
            name: ''
        }
    }

    function addNewColor(productIndex: number): void {
        addStoreBody.value.products.list[productIndex].colors.unshift({
            name: '',
            imageFiles: [],
            colorCode: '',
        })
    }

    function addNewImage(productIndex: number, colorIndex: number, files: FileList | null): void {
        if (!files) {
            addStoreBody.value.products.list[productIndex].colors[colorIndex].imageFiles = []
            return
        }
        let index: number = JSON.parse(JSON.stringify(files.length))
        while (index > 0) {
            index = --index
            addStoreBody.value.products.list[productIndex].colors[colorIndex].imageFiles.push({
                file: files.item(index) as File,
                name: ''
            })
        }
    }

    function addNewSpec(productIndex: number): void {
        addStoreBody.value.products.list[productIndex].specs.unshift({
            title: '',
            text: ''
        })
    }

    function addNewPhoneNumber(): void {
        addStoreBody.value.contactInfo.phoneNumber.unshift('')
    }

    function addNewTelephone(): void {
        addStoreBody.value.contactInfo.telephone.unshift('')
    }

    function addNewSocialMedia(): void {
        addStoreBody.value.contactInfo.socialMedia.unshift({
            link: '',
            type: 'instagram'
        })
    }

    function deleteCategory(categoryIndex: number): void {
        addStoreBody.value.menu.splice(categoryIndex, 1)
    }

    function deleteProduct(productIndex: number): void {
        addStoreBody.value.products.list.splice(productIndex, 1)
    }

    function deleteColor(productIndex: number, colorIndex: number): void {
        addStoreBody.value.products.list[productIndex].colors.splice(colorIndex, 1)
    }

    function deleteImage(productIndex: number, colorIndex: number, imageIndex: number): void {
        addStoreBody.value.products.list[productIndex].colors[colorIndex].imageFiles.splice(imageIndex, 1)
        if (addStoreBody.value.products.list[productIndex].colors[colorIndex].imageFiles.length === 0)
            productImageListTemplateRef.value = ''
    }

    function deleteSpec(productIndex: number, specIndex: number): void {
        addStoreBody.value.products.list[productIndex].specs.splice(specIndex, 1)
    }

    function deletePhoneNumber(telephoneIndex: number): void {
        addStoreBody.value.contactInfo.phoneNumber.splice(telephoneIndex, 1)
    }

    function deleteTelephone(telephoneIndex: number): void {
        addStoreBody.value.contactInfo.telephone.splice(telephoneIndex, 1)
    }

    function deleteSocialMedia(socialMediaIndex: number): void {
        addStoreBody.value.contactInfo.socialMedia.splice(socialMediaIndex, 1)
    }

    function deleteBrandLogo(): void {
        brandLogoTemplateRef.value = ''
        addStoreBody.value.brand.logo = null
    }

    function deleteBrandBanner(): void {
        brandBannerTemplateRef.value = ''
        addStoreBody.value.brand.banner = null
    }

    function deleteProductBanner(bannerIndex: number): void {
        (addStoreBody.value.products.banner as ImageFile[]).splice(bannerIndex, 1)
        if ((addStoreBody.value.products.banner as ImageFile[]).length === 0)
            productBannerTemplateRef.value = ''
    }

    function deleteProductCover(productIndex: number): void {
        productCoverTemplateRef.value = ''
        addStoreBody.value.products.list[productIndex].image = null
    }

    function deleteAudioFile(productIndex: number): void {
        productAudioTemplateRef.value = ''
        addStoreBody.value.products.list[productIndex].audio = null
    }

    function deleteContactUsBanner(): void {
        contactUsBannerTemplateRef.value = ''
        addStoreBody.value.contactInfo.banner = null
    }

    return {
        brandLogoTemplateRef,
        brandBannerTemplateRef,
        productAudioTemplateRef,
        productBannerTemplateRef,
        productCoverTemplateRef,
        productImageListTemplateRef,
        contactUsBannerTemplateRef,
        staticStore,
        addStoreBody,
        brand,
        menu,
        telephone,
        contactInformation,
        specs,
        category,
        colors,
        productList,
        products,
        phoneNumber,
        router,
        location,
        address,
        socialMedia,
        storeKeys,
        setStoreData,
        postStoreData,
        addNewCategory,
        addNewProduct,
        addNewColor,
        addNewSpec,
        addNewTelephone,
        addNewSocialMedia,
        addNewImage,
        deleteCategory,
        deleteProduct,
        deleteColor,
        deleteImage,
        deleteSpec,
        deleteTelephone,
        deleteSocialMedia,
        getStoresList,
        addProductCover,
        addProductBanner,
        addBrandBanner,
        addBrandLogo,
        deleteBrandLogo,
        deleteBrandBanner,
        deleteProductBanner,
        deleteProductCover,
        setEditStoreData,
        deleteStore,
        addAudioFile,
        deleteAudioFile,
        addContactUsBanner,
        deleteContactUsBanner,
        addNewPhoneNumber,
        deletePhoneNumber,
        clearEditStoreData
    }
})
