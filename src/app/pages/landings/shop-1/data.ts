import { SafeHtml } from '@angular/platform-browser'
import { delivery, moneyBack, payment, support } from '@components/icons'

export type FeaturesType = {
  icon: any
  title: string
  description: string
  sanitizedIcon?: SafeHtml
}
export type BlogType = {
  image: string
  title: string
  description: string
}

export type ProductType = {
  name: string
  image_src: string
  price: number
  discounted_price?: number
}

export type TrendingProductType = {
  id: number
  name: string
  image_src: string
  color?: {
    id: number
    code: string
    image?: string
  }[]
  price: number
  badge?: string
  discounted_price?: number
}

export type CategoryDatatype = {
  imageSrc: string
  category: string
}

export type CollectionDataType = {
  imageUrl: string
  title: string
  price: number
}
export type CollectionThumbSwiperType = {
  text: string
  buttonText: string
  buttonLink: string
  dataSwiperBinded: string
}

export type InstagramFollowType = {
  imageUrl: string
}

export const products: ProductType[] = [
  {
    name: 'Exquisite glass vase',
    image_src: 'assets/img/landing/shop-1/hero/01.png',
    price: 19.0,
  },
  {
    name: 'Pot for home flowers',
    image_src: 'assets/img/landing/shop-1/hero/02.png',
    price: 11.0,
    discounted_price: 15.0,
  },
  {
    name: 'Ceramic soap dispenser',
    image_src: 'assets/img/landing/shop-1/hero/03.png',
    price: 16.0,
  },
  {
    name: 'Wooden clock with metal hands',
    image_src: 'assets/img/landing/shop-1/hero/04.png',
    price: 24.0,
  },
  {
    name: 'Scented candle in ceramic shell',
    image_src: 'assets/img/landing/shop-1/hero/05.png',
    price: 13.0,
  },
]

export const trendingProducts: TrendingProductType[] = [
  {
    id: 1,
    name: 'Loft style lamp',
    image_src: 'assets/img/shop/products/01.png',
    price: 21.0,
    discounted_price: 35.0,
    color: [
      { id: 1, code: '#576071' },
      { id: 2, code: '#d5d4d3' },
      { id: 3, code: '#a1b7d9' },
    ],
    badge: 'Sale',
  },
  {
    id: 2,
    name: 'Dispenser for soap',
    image_src: 'assets/img/shop/products/02.png',
    price: 16.0,
  },
  {
    id: 3,
    name: 'Glossy round vase',
    image_src: 'assets/img/shop/products/03.png',
    price: 11.0,
    discounted_price: 15.0,
    color: [
      { id: 1, code: '#d5d4d3' },
      { id: 2, code: '#576071' },
      { id: 3, code: '#a1b7d9' },
    ],
    badge: 'Sale',
  },
  {
    id: 4,
    name: 'Scented candle',
    image_src: 'assets/img/shop/products/09.png',
    price: 13.0,
    badge: 'New',
  },
  {
    id: 5,
    name: 'Living room table',
    image_src: 'assets/img/shop/products/06.png',
    price: 46.0,
  },
]

export const featuresData: FeaturesType[] = [
  {
    icon: delivery,
    title: 'Fast and free delivery',
    description:
      'Free delivery for all orders over $200 honcus egestas lorem honcus egestas',
  },
  {
    icon: moneyBack,
    title: 'Money back guarantee',
    description:
      'We return money within 30 days honcus egestas lorem honcus egestas',
  },
  {
    icon: support,
    title: '24/7 customer support',
    description:
      'Friendly 24/7 customer support honcus egestas lorem honcus egestas',
  },
  {
    icon: payment,
    title: 'Secure online payment',
    description:
      'We possess SSL / Secure сertificate honcus egestas lorem honcus egestas',
  },
]

export const blogData: BlogType[] = [
  {
    image: 'assets/img/landing/shop-1/blog/01.jpg',
    title: 'Paintings for home decor',
    description:
      'Morbi et massa fames ac scelerisque sit commodo dignissim faucibus vel quisque proin lectus laoreet sem adipiscing sollicitudin erat massa tellus lorem',
  },
  {
    image: 'assets/img/landing/shop-1/blog/02.jpg',
    title: 'How to keep flowers fresh longer',
    description:
      'Morbi et massa fames ac scelerisque sit commodo dignissim faucibus vel quisque proin lectus laoreet sem adipiscing sollicitudin erat massa tellus lorem',
  },
  {
    image: 'assets/img/landing/shop-1/blog/03.jpg',
    title: 'Bedroom decoration explained',
    description:
      'Morbi et massa fames ac scelerisque sit commodo dignissim faucibus vel quisque proin lectus laoreet sem adipiscing sollicitudin erat massa tellus lorem',
  },
]

export const categoryData: CategoryDatatype[] = [
  {
    imageSrc: 'assets/img/shop/categories/03.jpg',
    category: 'For the bathroom',
  },
  {
    imageSrc: 'assets/img/shop/categories/04.jpg',
    category: 'For the bedroom',
  },
]

export const productCollectionData: CollectionDataType[] = [
  {
    imageUrl: 'assets/img/landing/shop-1/collections/th01.png',
    title: 'Set for a dinner party of 7 items',
    price: 116.0,
  },
  {
    imageUrl: 'assets/img/landing/shop-1/collections/th02.png',
    title: 'A set of flowerpots for the living room',
    price: 78.0,
  },
]

export const productCollectionDetailData: CollectionThumbSwiperType[] = [
  {
    text: 'Meet the guests with a stunning set for a dinner party',
    buttonText: 'Explore all sets',
    buttonLink: '/shop/catalog',
    dataSwiperBinded: '#bg-1',
  },
  {
    text: 'Decor for the living room or bedrooms in wood style',
    buttonText: 'Explore all sets',
    buttonLink: '/shop/catalog',
    dataSwiperBinded: '#bg-2',
  },
]

export const shopInstagramFollow: InstagramFollowType[] = [
  {
    imageUrl: 'assets/img/landing/shop-1/instagram/01.jpg',
  },
  {
    imageUrl: 'assets/img/landing/shop-1/instagram/02.jpg',
  },
]

export const shopInstagramView = [
  {
    image: 'assets/img/landing/shop-1/instagram/03.jpg',
  },
  {
    image: 'assets/img/landing/shop-1/instagram/04.jpg',
  },
  {
    image: 'assets/img/landing/shop-1/instagram/05.jpg',
  },
  {
    image: 'assets/img/landing/shop-1/instagram/06.jpg',
  },
]
