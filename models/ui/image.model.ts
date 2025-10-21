type FitDirection = 'height' | 'width' | 'both'

export type ImageSource = {
    imgSrc: string
    imgAlt: string
    fitDirection: FitDirection
    borderRadius?: boolean 
    imageScale?: boolean
    aspectRatio?: string
}