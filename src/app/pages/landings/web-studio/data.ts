import { SafeHtml } from '@angular/platform-browser'
import {
  contactFlexible,
  contactFullSpectrum,
  contactImpossible,
  contactTimeZone,
  graphicDesign,
  mobileDevelopment,
  webDevelopment,
} from '@components/icons'

export type WebStudioServiceType = {
  title: string
  description: string
  icon: string
  sanitizedIcon?: SafeHtml
}

export type WebstudioSkillType = {
  type: string
  front?: FrontType
  back?: null
  content?: string
  image?: string
  altImage?: string
}

export type WebAwardType = {
  brand: string
  darkModeSrc: string
  lightModeSrc: string
}

export type FrontType = {
  image: string
  description: string
}

export type WebStudioFaqType = {
  title: string
  content: string
  imageId: string
}

export type ContactListType = {
  title: string
  description: string
  icon: any
  sanitizedIcon?: SafeHtml
}[][]

export const webStudioServices: WebStudioServiceType[] = [
  {
    title: 'Web development',
    description:
      'Pellentesque bibendum congue massa urna. Tempus hendrerit non molestie nulla enim, est vitae nisl amet.',
    icon: webDevelopment,
  },
  {
    title: 'Mobile development',
    description:
      'Amet, consectetur rhoncus, libero, morbi malesuada feugiat nulla feugiat mi vitae est pharetra nisi velit tincidunt.',
    icon: mobileDevelopment,
  },
  {
    title: 'Graphic design',
    description:
      'Est, nisl, ornare augue maecenas dis vitae tincidunt interdum tincidunt donec ipsum pellentesque luctus justo.',
    icon: graphicDesign,
  },
]

export const webStudioSkills: WebstudioSkillType[] = [
  {
    type: 'card-flip',
    front: {
      image: 'assets/img/landing/web-studio/skills/figma.svg',
      description:
        'Figma is convenient online service for interface development and prototyping with the ability to work together in real time.',
    },
    back: null,
  },
  {
    type: 'card',
    content:
      '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum posuere finibus dui, eget scelerisque ipsum suscipit nec. Praesent nec quam in ipsum ultricies ultricies et sagittis dui. Sed condimentum felis at pretium."',
    image: 'assets/img/brands/foster.svg',
  },
  {
    type: 'card-flip',
    front: {
      image: 'assets/img/landing/web-studio/skills/css3.svg',
      description:
        'Cascading Style Sheets Level 3 is the iteration of the CSS standard used in the styling and formatting of Web pages.',
    },
    back: null,
  },
  {
    type: 'card',
    content:
      '"Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris tincidunt imperdiet hendrerit. Fusce tortor turpis, facilisis ac efficitur eget, aliquet ut odio. Curabitur in vestibulum tellus."',
    image: 'assets/img/brands/champion-dark.svg',
    altImage: 'assets/img/brands/champion-light.svg',
  },
  {
    type: 'card-flip',
    front: {
      image: 'assets/img/landing/web-studio/skills/bootstrap.svg',
      description:
        'Powerful, extensible, and feature-packed frontend toolkit. Build and customize with Sass, utilize prebuilt grid system and components.',
    },
    back: null,
  },
  {
    type: 'card',
    content:
      '"Nulla facilisi. Curabitur dictum sodales aliquam. Etiam tortor augue, ultrices in efficitur sit amet, luctus dapibus magna. Vivamus eu lacus elementum, ultrices massa vitae, elementum lorem. Proin feugiat egestas dolor."',
    image: 'assets/img/brands/alpine.svg',
  },
  {
    type: 'card-flip',
    front: {
      image: 'assets/img/landing/web-studio/skills/python.svg',
      description:
        'Python is a programming language that lets you work quickly and integrate systems more effectively.',
    },
    back: null,
  },
  {
    type: 'card',
    content:
      '"Suspendisse potenti. Nulla vel varius urna. Donec at libero ipsum. Nullam scelerisque tempus malesuada. Donec vehicula odio est, at faucibus purus sollicitudin ut. Fusce mollis ultrices ex sed pellentesque velit euismod."',
    image: 'assets/img/brands/deloitte-dark.svg',
    altImage: 'assets/img/brands/deloitte-light.svg',
  },
]

export const webAwardData: WebAwardType[] = [
  {
    brand: 'Clutch',
    darkModeSrc: 'assets/img/brands/clutch-rating-dark.svg',
    lightModeSrc: 'assets/img/brands/clutch-rating-light.svg',
  },
  {
    brand: 'Deloitte',
    darkModeSrc: 'assets/img/brands/deloitte-dark.svg',
    lightModeSrc: 'assets/img/brands/deloitte-light.svg',
  },
  {
    brand: 'Vue.js',
    darkModeSrc: 'assets/img/brands/vuejs-dark.svg',
    lightModeSrc: 'assets/img/brands/vuejs-light.svg',
  },
  {
    brand: 'Awwwards',
    darkModeSrc: 'assets/img/brands/awwwards-dark.svg',
    lightModeSrc: 'assets/img/brands/awwwards-light.svg',
  },
  {
    brand: 'Clutch',
    darkModeSrc: 'assets/img/brands/clutch-dark.svg',
    lightModeSrc: 'assets/img/brands/clutch-light.svg',
  },
]

export const webStudioFaqs: WebStudioFaqType[] = [
  {
    title: 'Finance and insurance',
    content:
      'Sit purus platea nunc semper auctor integer semper et ac odio eget a lacus eu duis ante sed molestie varius tempus gravida libero pretium sit etiam morbi orci et vestibulum velit.',
    imageId: 'finance-img',
  },
  {
    title: 'Startup and technology',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum posuere finibus dui, eget scelerisque ipsum suscipit nec. Praesent nec quam in ipsum ultricies ultricies et sagittis dui.',
    imageId: 'tech-img',
  },
  {
    title: 'Medicine and beauty',
    content:
      'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris tincidunt imperdiet hendrerit. Fusce tortor turpis, facilisis ac efficitur eget.',
    imageId: 'medicine-img',
  },
  {
    title: 'E-commerce',
    content:
      'Curabitur dictum sodales aliquam. Etiam tortor augue, ultrices in efficitur sit amet, luctus dapibus magna. Vivamus eu lacus elementum, ultrices massa vitae, elementum lorem.',
    imageId: 'ecommerce-img',
  },
]

export const contactList: ContactListType = [
  [
    {
      title: "Time zones ain't no thing",
      description:
        'Pharetra in morbi quis is massa maecenas arcu vulputate pulvinar elit non nullage a, duis tortor mi massa ipsum in eu eu eget libero.',
      icon: contactTimeZone,
    },
    {
      title: 'Flexible work terms',
      description:
        'Pharetra in morbi quis is massa maecenas arcu vulputate pulvinar elit non nullage a, duis tortor mi massa ipsum in eu eu eget libero.',
      icon: contactFlexible,
    },
  ],
  [
    {
      title: 'Full spectrum of services',
      description:
        'Pharetra in morbi quis is massa maecenas arcu vulputate pulvinar elit non nullage a, duis tortor mi massa ipsum in eu eu eget libero.',
      icon: contactImpossible,
    },
    {
      title: "Impossible? We're on it",
      description:
        'Pharetra in morbi quis is massa maecenas arcu vulputate pulvinar elit non nullage a, duis tortor mi massa ipsum in eu eu eget libero.',
      icon: contactFullSpectrum,
    },
  ],
]
