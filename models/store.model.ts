export enum SocialMediaEnum {
    'whatsapp' = 'واتس اپ',
    'telegram' = 'تلگرام',
    'instagram' = 'اینستاگرام',
    'rubika' = 'روبیکا',
    'website' = 'وبسایت',
    'eata' = 'ایتا'
}
export type SocialMediaType = keyof typeof SocialMediaEnum;
export type ImageFile = {
    file: File | null
    name: string
}
export type Colors = {
    name: string,
    colorCode: string,
    imageFiles: ImageFile[]
}
export type Specs = {
    title: string,
    text: string
}
export type Category = {
    id: string,
    name: string,
}
export type Product = {
    id: string;
    image: ImageFile | null;
    name: string;
    category: Category;
    price: string;
    priceTitle?: string
    description: string;
    specs: Specs[];
    colors: Colors[];
    colorsTitle?: string;
    audio: ImageFile | null;
    audioTitle?: string;
}
export type Products = {
    banner: ImageFile[] | ImageFile | null
    list: Product[]
}
export type Menu = {
    id: string;
    name: string;
}
export type Brand = {
    faName: string
    enName: string
    shortDesc: string
    longDesc: string
    slogan: string
    logo: ImageFile | null
    banner: ImageFile | null
    showIntroText: boolean | undefined
}
export type Address = {
    title?: string
    location: string,
    locationTitle?: string
    router: string,
    routerTitle?: string
    text: string,
}
export type SocialMedia = {
    link: string
    type: SocialMediaType
}
export type ContactInfo = {
    phoneNumber: string[],
    phoneNumberTitle?: string
    telephone: string[],
    telephoneTitle?: string
    socialMedia: SocialMedia[],
    socialMediaTitle: string,
    address: Address,
    banner: ImageFile | null
}
export type Store = {
    contactInfo: ContactInfo
    brand: Brand,
    menu: Menu[];
    products: Products
};

export type GetStoreApiResponse = {
    data: Store
}

export type GetStoresListApiResponse = {
    data: Store[]
}

export type PostStoreApiResponse = Store
export type PostStoreApiBody = Store
