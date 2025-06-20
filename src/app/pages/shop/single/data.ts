import { SafeHtml } from '@angular/platform-browser'
import { delivery, moneyBack, payment, support } from '@components/icons'

export type RelavantType = {
  id: number
  name: string
  image: string
  colors?: {
    id: number
    code: string
    image?: string
  }[]
  price?: number
  discountedPrice?: number
  badge?: string
}

export type FeaturesType = {
  icon: any
  title: string
  description: string
  sanitizedIcon?: SafeHtml
}

export const relavantData: RelavantType[] = [
  {
    id: 1,
    name: 'Loft style lamp',
    image: 'assets/img/shop/products/01.png',
    colors: [
      { id: 1, code: '#576071' },
      { id: 2, code: '#d5d4d3' },
      { id: 3, code: '#a1b7d9' },
    ],
    price: 21,
    discountedPrice: 35,
    badge: 'Sale',
  },
  {
    id: 2,
    name: 'Dispenser for soap',
    image: 'assets/img/shop/products/02.png',
    price: 16,
  },
  {
    id: 3,
    name: 'Glossy round vase',
    image: 'assets/img/shop/products/03.png',
    colors: [
      { id: 1, code: '#d5d4d3' },
      { id: 2, code: '#576071' },
      { id: 3, code: '#a1b7d9' },
    ],
    price: 11,
    discountedPrice: 15,
    badge: 'Sale',
  },
  {
    id: 4,
    name: 'Scented candle',
    image: 'assets/img/shop/products/09.png',
    price: 13,
    badge: 'New',
  },
  {
    id: 5,
    name: 'Living room table',
    image: 'assets/img/shop/products/06.png',
    price: 46,
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
