export type SwiperType = {
  content: {
    stars: number
    quote: string
    brand: string
    imgSrc?: string
    imgDark?: string
    imgLight?: string
  }
}

export type SaasFeatureType = {
  order: number
  title: string
  description: string
}

export type ClientDataType = {
  name: string
  images: {
    color: string
    gray: string
    light: string
  }
  width: string
}

export type ClientTabPaneType = {
  id: string
  name: string
  role: string
  image: string
  testimonial: string
}

export const swiperSlides: SwiperType[] = [
  {
    content: {
      stars: 5,
      quote:
        '“Around provides us with the detailed and accurate data we need.”',
      brand: 'Clutch',
      imgLight: 'assets/img/landing/saas-1/brands/clutch-dark.svg',
      imgDark: 'assets/img/landing/saas-1/brands/clutch-light.svg',
    },
  },
  {
    content: {
      stars: 5,
      quote:
        '“Tools are constantly improved and contain a lot of useful information.”',
      brand: 'Product Hunt',
      imgSrc: 'assets/img/landing/saas-1/brands/product-hunt.svg',
    },
  },
  {
    content: {
      stars: 4,
      quote:
        '“We can easily analyze our big data quickly and efficiently all the time.”',
      brand: 'Capterra',
      imgSrc: 'assets/img/landing/saas-1/brands/capterra.svg',
    },
  },
]

export const saasFeature: SaasFeatureType[] = [
  {
    order: 1,
    title: 'Target your audience effectively',
    description:
      'Nisl in enim, gravida risus enim risus non et in iaculis non facilisis eget blandit id vulputate morbi proin vitae tincidunt vestibulum viverra. Quis odio mauris velit egestas risus vulputate.',
  },
  {
    order: 3,
    title: 'Build dashboard in minutes',
    description:
      'Facilisi eu neque amet, orci tellus nibh amet tincidunt nunc, feugiat arcu vulputate duis. Quis odio mauris, in sed pharetra velit egestas risus purus tincidunt.',
  },
  {
    order: 4,
    title: 'Easily download your tables and data',
    description:
      'Cursus dolor sagittis, nisi sit pharetra pharetra ornare nec diam id in in commodo mattis at retium at id nisi ullamcorper tortor augue parturient at tellus lorem enim.',
  },
  {
    order: 5,
    title: 'Access to dashboard from all devices',
    description:
      'Ac pharetra pharetra morbi turpis auctor vel eget amet nulla diam facilisis sit morbi sit aliquam in amet ultrices aliquet leo facilisis lorem proin pharetra ornare.',
  },
]

export const clientData: ClientDataType[] = [
  {
    name: 'Foster',
    images: {
      color: 'assets/img/landing/saas-1/brands/foster-color.svg',
      gray: 'assets/img/landing/saas-1/brands/foster-gray.svg',
      light: 'assets/img/landing/saas-1/brands/foster-light.svg',
    },
    width: '140',
  },
  {
    name: 'Klinos',
    images: {
      color: 'assets/img/landing/saas-1/brands/klinos-color.svg',
      gray: 'assets/img/landing/saas-1/brands/klinos-gray.svg',
      light: 'assets/img/landing/saas-1/brands/klinos-light.svg',
    },
    width: '131',
  },
  {
    name: 'Champion',
    images: {
      color: 'assets/img/landing/saas-1/brands/champion-color.svg',
      gray: 'assets/img/landing/saas-1/brands/champion-gray.svg',
      light: 'assets/img/landing/saas-1/brands/champion-light.svg',
    },
    width: '162',
  },
  {
    name: 'Airbnb',
    images: {
      color: 'assets/img/landing/saas-1/brands/airbnb-color.svg',
      gray: 'assets/img/landing/saas-1/brands/airbnb-gray.svg',
      light: 'assets/img/landing/saas-1/brands/airbnb-light.svg',
    },
    width: '132',
  },
  {
    name: 'StarCraft',
    images: {
      color: 'assets/img/landing/saas-1/brands/starcraft-color.svg',
      gray: 'assets/img/landing/saas-1/brands/starcraft-gray.svg',
      light: 'assets/img/landing/saas-1/brands/starcraft-light.svg',
    },
    width: '158',
  },
  {
    name: 'Alpine',
    images: {
      color: 'assets/img/landing/saas-1/brands/alpine-color.svg',
      gray: 'assets/img/landing/saas-1/brands/alpine-gray.svg',
      light: 'assets/img/landing/saas-1/brands/alpine-light.svg',
    },
    width: '146',
  },
]

export const clientDataTabPane: ClientTabPaneType[] = [
  {
    id: 'foster',
    name: 'Lilianna Bocouse',
    role: 'Head of Marketing',
    image: 'assets/img/avatar/13.jpg',
    testimonial:
      '“Around provides us with the detailed and accurate data we need to make strategic decisions. All tools are constantly being improved and contain a lot of useful and interesting information. Thanks to Around, we can constantly analyze our big data quickly and efficiently.”',
  },
  {
    id: 'klinos',
    name: 'Darell Steward',
    role: 'Project Manager',
    image: 'assets/img/avatar/14.jpg',
    testimonial:
      '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac pretium dui. Aliquam rutrum justo lorem, in efficitur odio efficitur vel. Integer mattis, neque malesuada sagittis porttitor, enim tortor ullamcorper diam, id eleifend sem mauris at turpis. Curabitur sed nisi nec ligula dictum maximus eu ut ante.”',
  },
  {
    id: 'champion',
    name: 'Annette Black',
    role: 'Lead Designer',
    image: 'assets/img/avatar/15.jpg',
    testimonial:
      '“Quisque rutrum sit amet magna sit amet tristique. Vivamus rhoncus ac purus vitae convallis. Aliquam erat volutpat. Proin egestas, mauris ut semper semper, ipsum felis mattis ligula, et porttitor ante arcu nec ante. Aliquam congue est eu turpis sollicitudin, et ullamcorper tortor aliquam.”',
  },
  {
    id: 'airbnb',
    name: 'Ralph Edwards',
    role: 'CEO, Co-Founder',
    image: 'assets/img/avatar/16.jpg',
    testimonial:
      '“Vestibulum faucibus lectus eget augue pharetra, quis semper lectus gravida. Vestibulum pretium in elit sed iaculis. Curabitur elementum turpis at ipsum molestie, id maximus odio tincidunt. Praesent id lacinia orci. Phasellus at varius arcu. Ut nec lobortis velit. Mauris vel risus quis lacus placerat fringilla.”',
  },
  {
    id: 'starcraft',
    name: 'Jane Cooper',
    role: 'Strategic Advisor',
    image: 'assets/img/avatar/17.jpg',
    testimonial:
      '“Morbi at fermentum enim, pulvinar malesuada quam. Morbi sit amet tellus luctus, vulputate arcu nec, consectetur diam. Proin est lacus, interdum ac aliquam sit amet, aliquam eget leo. Donec condimentum erat quam, tincidunt tempus augue consectetur a. Donec quis purus dictum, iaculis mi fringilla.”',
  },
  {
    id: 'alpine',
    name: 'Albert Flores',
    role: 'Business Analyst',
    image: 'assets/img/avatar/18.jpg',
    testimonial:
      '“Phasellus at varius arcu. Ut nec lobortis velit. Mauris vel risus quis lacus placerat fringilla. Aliquam congue risus tortor, sed posuere leo faucibus sed. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut dui ante, rutrum eget vehicula sed.”',
  },
]
