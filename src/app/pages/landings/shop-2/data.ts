export type ArrivalType = {
  image: string
  title: string
  price: number
}

export type FeaturesType = {
  title: string
  iconSrc: string
  width: number
  alt: string
  description: string
}

export type InstagramType = {
  likes: number
  comments: number
  imageSrc: string
  alt: string
}
export type AwardType = {
  src: string
  width: number
  alt: string
  darkModeSrc?: string
}

export type item = {
  quantity: number
  images: string[]
  name: string
}

export type PopularDataype = {
  items: item[]
}
export const arrival: ArrivalType[] = [
  {
    image: 'assets/img/landing/shop-2/products/01.png',
    title: 'The Sunshine Box (6)',
    price: 18.0,
  },
  {
    image: 'assets/img/landing/shop-2/products/02.png',
    title: 'Fromage (9)',
    price: 24.0,
  },
  {
    image: 'assets/img/landing/shop-2/products/03.png',
    title: 'Rainbow (20)',
    price: 58.0,
  },
  {
    image: 'assets/img/landing/shop-2/products/02.png',
    title: 'Fromage (9)',
    price: 24.0,
  },
]

export const features: FeaturesType[] = [
  {
    title: 'Gluten-Free',
    iconSrc: 'assets/img/landing/shop-2/benefits/glutenfree.svg',
    width: 82,
    alt: 'Icon',
    description:
      'Made without gluten, offer to savor taste and quality without limitations.',
  },
  {
    title: 'Vegan',
    iconSrc: 'assets/img/landing/shop-2/benefits/vegan.svg',
    width: 82,
    alt: 'Icon',
    description: "Made without animal products, they're perfect for vegans.",
  },
  {
    title: '100% Natural',
    iconSrc: 'assets/img/landing/shop-2/benefits/natural.svg',
    width: 82,
    alt: 'Icon',
    description: 'We have no place for artificial additives and preservatives.',
  },
  {
    title: 'Made with Love',
    iconSrc: 'assets/img/landing/shop-2/benefits/love.svg',
    width: 82,
    alt: 'Icon',
    description:
      'Each macaron is meticulously handcrafted with a deep passion for detail and quality.',
  },
]

export const instagram: InstagramType[] = [
  {
    likes: 2048,
    comments: 320,
    imageSrc: 'assets/img/landing/shop-2/instagram/01.jpg',
    alt: 'Image',
  },
  {
    likes: 1764,
    comments: 283,
    imageSrc: 'assets/img/landing/shop-2/instagram/02.jpg',
    alt: 'Image',
  },
  {
    likes: 4560,
    comments: 417,
    imageSrc: 'assets/img/landing/shop-2/instagram/03.jpg',
    alt: 'Image',
  },
  {
    likes: 1505,
    comments: 274,
    imageSrc: 'assets/img/landing/shop-2/instagram/04.jpg',
    alt: 'Image',
  },
  {
    likes: 3708,
    comments: 198,
    imageSrc: 'assets/img/landing/shop-2/instagram/05.jpg',
    alt: 'Image',
  },
  {
    likes: 2925,
    comments: 409,
    imageSrc: 'assets/img/landing/shop-2/instagram/06.jpg',
    alt: 'Image',
  },
  {
    likes: 1348,
    comments: 120,
    imageSrc: 'assets/img/landing/shop-2/instagram/07.jpg',
    alt: 'Image',
  },
  {
    likes: 963,
    comments: 98,
    imageSrc: 'assets/img/landing/shop-2/instagram/08.jpg',
    alt: 'Image',
  },
]

export const awards: AwardType[] = [
  {
    src: 'assets/img/landing/shop-2/awards/01.png',
    width: 226,
    alt: 'Award',
  },
  {
    src: 'assets/img/landing/shop-2/awards/02.png',
    width: 226,
    alt: 'Award',
  },
  {
    src: 'assets/img/landing/shop-2/awards/03-light.png',
    width: 226,
    alt: 'Award',
    darkModeSrc: 'assets/img/landing/shop-2/awards/03-dark.png',
  },
  {
    src: 'assets/img/landing/shop-2/awards/04.png',
    width: 226,
    alt: 'Award',
  },
]

export const popularData: PopularDataype[] = [
  {
    items: [
      {
        quantity: 3,
        images: [
          'assets/img/landing/shop-2/popular/th01.png',
          'assets/img/landing/shop-2/popular/th01.png',
          'assets/img/landing/shop-2/popular/th01.png',
        ],
        name: 'Salted caramel',
      },
      {
        quantity: 2,
        images: [
          'assets/img/landing/shop-2/popular/th02.png',
          'assets/img/landing/shop-2/popular/th02.png',
        ],
        name: 'Caramel Salé',
      },
      {
        quantity: 2,
        images: [
          'assets/img/landing/shop-2/popular/th03.png',
          'assets/img/landing/shop-2/popular/th03.png',
        ],
        name: 'Simplement Chocolat',
      },
    ],
  },
  {
    items: [
      {
        quantity: 3,
        images: [
          'assets/img/landing/shop-2/popular/th04.png',
          'assets/img/landing/shop-2/popular/th04.png',
          'assets/img/landing/shop-2/popular/th04.png',
        ],
        name: 'Follement Framboise',
      },
      {
        quantity: 3,
        images: [
          'assets/img/landing/shop-2/popular/th05.png',
          'assets/img/landing/shop-2/popular/th05.png',
          'assets/img/landing/shop-2/popular/th05.png',
        ],
        name: 'Vanille de Madagascar',
      },
      {
        quantity: 2,
        images: [
          'assets/img/landing/shop-2/popular/th06.png',
          'assets/img/landing/shop-2/popular/th06.png',
        ],
        name: 'Bleuets-Cassis',
      },
    ],
  },
]
