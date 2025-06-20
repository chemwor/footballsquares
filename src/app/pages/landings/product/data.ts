import { SafeHtml } from '@angular/platform-browser'
import { earPads, noiseIcons, sound } from '@components/icons'

export type ProductFeatureType = {
  description: string
  title: string
  icons: any
  sanitizedIcon?: SafeHtml
}
export type Features = {
  other_features: string[]
  battery: string[]
  connectivity: string[]
  general: string[]
}

export const productFeatures: ProductFeatureType[] = [
  {
    title: 'Active noise suppression',
    description:
      'Adipiscing posuere dui, amet, augue nisl dictum justo enim sed neque congue non quam ultrices interdum vitae vestibulum.',
    icons: noiseIcons,
  },
  {
    title: 'Memory foam ear pads',
    description:
      'Dignissim eget ultrices feugiat dolor volutpat amet et suscipit metus sed laoreet platea amet, sit sem at dui tempor netus.',
    icons: earPads,
  },
  {
    title: 'Surround sound',
    description:
      'Tellus sit quam libero, ut quam praesent mi, elementum vulputate amet viverra purus sed velit morbi tellus sodales sed vitae.',
    icons: sound,
  },
]

export const produceDetail: Features[] = [
  {
    other_features: ['Noise suppression', 'Memory foam ear pads'],
    battery: [
      'Up to 60 hours life',
      'Charge via Micro-USB cable',
      'Fast charging technology',
    ],
    connectivity: ['Wireless Bluetooth', 'Micro-USD port'],
    general: [
      'Height: 7.9 in / 19.6 cm',
      'Weight: 7.55 oz / 0,75 g',
      'Form factor: On ear',
    ],
  },
]
