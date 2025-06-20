import { SafeHtml } from '@angular/platform-browser'
import {
  dashboardFlip,
  dashboardFlipBack,
  reliableFlip,
  reliableFlipBack,
  supportFlip,
  supportFlipBack,
} from '@components/icons'

export type BenefitProductType = {
  card_flip_front: {
    heading: string
    paragraph: string
    icon: any
    sanitizedIconFront?: SafeHtml
  }
  card_flip_back: {
    heading: string
    paragraph: string
    color: string
    icon: any
    sanitizedIconBack?: SafeHtml
  }
}

export type BrandType = {
  name: string
  image_src: string
  width: number
}

export const benefitsProduct: BenefitProductType[] = [
  {
    card_flip_front: {
      heading: 'Support',
      paragraph:
        'Around users and partners can count on 24/7 technical assistance, as well as the help of the technical analytics department and teams of specialized experts.',
      icon: supportFlip,
    },
    card_flip_back: {
      heading: '24/7',
      paragraph:
        'Around users and partners can count on 24/7 technical assistance, as well as the help of the technical analytics department and teams of specialized experts.',
      color: 'bg-primary',
      icon: supportFlipBack,
    },
  },

  {
    card_flip_front: {
      heading: 'Individual dashboard',
      paragraph:
        'You can easily identify interdependencies between different indicators, identify tendencies and prevent potential difficulties and problems.',
      icon: dashboardFlip,
    },
    card_flip_back: {
      heading: '136',
      paragraph:
        'You can easily identify interdependencies between different indicators, identify tendencies and prevent potential difficulties and problems.',
      color: 'bg-danger',
      icon: dashboardFlipBack,
    },
  },

  {
    card_flip_front: {
      heading: 'Reliable data',
      paragraph:
        'Thanks to our platform, developed using advanced data management methods, data quality reaches 100%, which is 20% better than other platforms.',
      icon: reliableFlip,
    },
    card_flip_back: {
      heading: '100%',
      paragraph:
        'Thanks to our platform, developed using advanced data management methods, data quality reaches 100%, which is 20% better than other platforms.',
      color: 'bg-info',
      icon: reliableFlipBack,
    },
  },
]

export const brandName: BrandType[] = [
  {
    name: 'Foster',
    image_src: 'assets/img/landing/saas-1/brands/foster-light.svg',
    width: 145,
  },
  {
    name: 'Klinos',
    image_src: 'assets/img/landing/saas-1/brands/klinos-light.svg',
    width: 140,
  },
  {
    name: 'Champion',
    image_src: 'assets/img/landing/saas-1/brands/champion-light.svg',
    width: 160,
  },
  {
    name: 'Airbnb',
    image_src: 'assets/img/landing/saas-1/brands/airbnb-light.svg',
    width: 130,
  },
  {
    name: 'Starcraft',
    image_src: 'assets/img/landing/saas-1/brands/starcraft-light.svg',
    width: 160,
  },
  {
    name: 'Alpine',
    image_src: 'assets/img/landing/saas-1/brands/alpine-light.svg',
    width: 150,
  },
]
