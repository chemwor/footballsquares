export type SwiperType = {
  brand: string
  src?: string
  width: number
  alt: string
  dark_mode_src?: string
  light_mode_src?: string
}

export type AgencyTestimonialType = {
  id: string
  name: string
  position: string
  testimonial: string
  details: string
}

export type AgencyTeamType = {
  name: string
  position: string
  image: string
  social_media: SocialMedia[]
}

type SocialMedia = {
  platform: string
  icon: string
  'aria-label': string
}

export type AboutDatatype = {
  number: number
  description: string
}

export type FlipCreativeType = {
  title: string
  image: string
  description?: string
  list?: string[]
}

export type TrendingType = {
  id: string
  title: string
  role: string
}

export const marqueeSwiper: SwiperType[] = [
  {
    brand: 'Starcraft',
    light_mode_src: 'assets/img/brands/starcraft-dark.svg',
    width: 196,
    alt: 'Starcraft',
    dark_mode_src: 'assets/img/brands/starcraft-light.svg',
  },
  {
    brand: 'Auchan',
    src: 'assets/img/brands/auchan.svg',
    width: 196,
    alt: 'Auchan',
  },
  {
    brand: 'Klinos',
    src: 'assets/img/brands/klinos.svg',
    width: 196,
    alt: 'Klinos',
  },
  {
    brand: 'Suzuki',
    src: 'assets/img/brands/suzuki.svg',
    width: 196,
    alt: 'Suzuki',
  },
  {
    brand: 'Airbnb',
    src: 'assets/img/brands/airbnb.svg',
    width: 196,
    alt: 'Airbnb',
  },
  {
    brand: 'Philips',
    src: 'assets/img/brands/philips.svg',
    width: 196,
    alt: 'Philips',
  },
  {
    brand: 'Careem',
    src: 'assets/img/brands/careem.svg',
    width: 196,
    alt: 'Careem',
  },
  {
    brand: 'Puma',
    light_mode_src: 'assets/img/brands/puma-dark.svg',
    width: 196,
    alt: 'Puma',
    dark_mode_src: 'assets/img/brands/puma-light.svg',
  },
  {
    brand: 'Alpine',
    src: 'assets/img/brands/alpine.svg',
    width: 196,
    alt: 'Alpine',
  },
]

export const agencyTestimonial: AgencyTestimonialType[] = [
  {
    id: '#testimonial-1',
    name: 'Lilia Bocouse',
    position: 'Head of Marketing',
    testimonial: 'Awesome experience with a professional team. Thank you :)',
    details:
      'Suspendisse mauris elit, pellentesque nec purus sed, finibus finibus ipsum. Proin posuere, metus sed porttitor pellentesque, ante magna tincidunt mi, nec fermentum dui ligula vel massa. Praesent ultrices iaculis arcu iaculis ultrices. Maecenas vitae nulla odio. In laoreet, lectus in tempus ultricies.',
  },
  {
    id: '#testimonial-2',
    name: 'Robert Fox',
    position: 'Marketing Coordinator',
    testimonial:
      'Thanks to your talented team for the banding we dreamed about',
    details:
      'Leo vitae sem eget eget at in vivamus placerat sodales tristique risusiis senectusic quisque faucibus est justo egetert lobortis ultrices eu dignissim etiamier turpis tincidunt eget placerat feugiat senectusic quisque faucibus placerat sodales vitae tempor morbi tellus pulvinar tristique in turpis.',
  },
  {
    id: '#testimonial-3',
    name: 'Jenny Wilson',
    position: 'CEO, Co-Founder',
    testimonial:
      'Thanks to you, we have created a unique branding that is our pride!',
    details:
      'Duis sapien velit, rutrum ac rutrum dapibus, auctor ut lacus. Aenean sit amet erat augue. Aenean finibus, nibh sed malesuada maximus, nisi tellus iaculis quam, eget egestas mi felis eu urna. Quisque id nisl commodo, egestas eros ac, cursus odio. Ut nec rutrum magna, vel tempor erat. Vivamus nec tempus purus.',
  },
]

export const agencyTeam: AgencyTeamType[] = [
  {
    name: 'Nick Black',
    position: 'Web Designer',
    image: 'assets/img/landing/creative-agency/team/01.jpg',
    social_media: [
      {
        platform: 'Facebook',
        icon: 'ai-facebook',
        'aria-label': 'Facebook',
      },
      {
        platform: 'Dribbble',
        icon: 'ai-dribbble',
        'aria-label': 'Dribbble',
      },
      {
        platform: 'Stack Overflow',
        icon: 'ai-stack-overflow',
        'aria-label': 'Stack Overflow',
      },
    ],
  },
  {
    name: 'Emilia Denver',
    position: 'Identity Designer',
    image: 'assets/img/landing/creative-agency/team/02.jpg',
    social_media: [
      {
        platform: 'Facebook',
        icon: 'ai-facebook',
        'aria-label': 'Facebook',
      },
      {
        platform: 'Instagram',
        icon: 'ai-instagram',
        'aria-label': 'Instagram',
      },
      {
        platform: 'Behance',
        icon: 'ai-behance',
        'aria-label': 'Behance',
      },
    ],
  },
  {
    name: 'Jane Cooper',
    position: 'Marketing Coordinator',
    image: 'assets/img/landing/creative-agency/team/03.jpg',
    social_media: [
      {
        platform: 'Facebook',
        icon: 'ai-facebook',
        'aria-label': 'Facebook',
      },
      {
        platform: 'X',
        icon: 'ai-x',
        'aria-label': 'X',
      },
      {
        platform: 'Google',
        icon: 'ai-google',
        'aria-label': 'Google',
      },
    ],
  },
  {
    name: 'Jenny Wilson',
    position: 'Web Designer',
    image: 'assets/img/landing/creative-agency/team/04.jpg',
    social_media: [
      {
        platform: 'Facebook',
        icon: 'ai-facebook',
        'aria-label': 'Facebook',
      },
      {
        platform: 'Dribbble',
        icon: 'ai-dribbble',
        'aria-label': 'Dribbble',
      },
      {
        platform: 'Behance',
        icon: 'ai-behance',
        'aria-label': 'Behance',
      },
    ],
  },
  {
    name: 'Robert Fox',
    position: 'Graphic Designer',
    image: 'assets/img/landing/creative-agency/team/05.jpg',
    social_media: [
      {
        platform: 'Instagram',
        icon: 'ai-instagram',
        'aria-label': 'Instagram',
      },
      {
        platform: 'Dribbble',
        icon: 'ai-dribbble',
        'aria-label': 'Dribbble',
      },
      {
        platform: 'Behance',
        icon: 'ai-behance',
        'aria-label': 'Behance',
      },
    ],
  },
  {
    name: 'Jacob Jones',
    position: 'Branding Designer',
    image: 'assets/img/landing/creative-agency/team/06.jpg',
    social_media: [
      {
        platform: 'Facebook',
        icon: 'ai-facebook',
        'aria-label': 'Facebook',
      },
      {
        platform: 'X',
        icon: 'ai-x',
        'aria-label': 'X',
      },
      {
        platform: 'Behance',
        icon: 'ai-behance',
        'aria-label': 'Behance',
      },
    ],
  },
]

export const aboutData: AboutDatatype[] = [
  {
    number: 16,
    description: 'Awards in various industries',
  },
  {
    number: 22,
    description: 'Full time specialists',
  },
  {
    number: 205,
    description: 'Happy clients all over the world',
  },
]

export const flipCardCreative: FlipCreativeType[] = [
  {
    title: 'Strategy',
    image: 'assets/img/landing/creative-agency/services/01.jpg',
    description:
      'Leo vitae sem eget eget at in vivamus placerat in sodales tristique a risusiis senectusic vitae sem eget eget at in vivamus placerat in sodales.',
  },
  {
    title: 'Social',
    image: 'assets/img/landing/creative-agency/services/02.jpg',
    list: [
      'Social media posts',
      'Content plan',
      'Advertising launch',
      'Photo and video content',
      'Cases and portfolio',
    ],
  },
  {
    title: 'Branding',
    image: 'assets/img/landing/creative-agency/services/03.jpg',
    list: [
      'Identity design',
      'Brand book creation',
      'Colors and fonts',
      'Banners and covers',
      'Visual style',
    ],
  },
  {
    title: 'Web design',
    image: 'assets/img/landing/creative-agency/services/04.jpg',
    description:
      'Pharetra in morbi quis is massa maecenas arcu vulputate in pulvinar elit non nullage a, duis tortor mi massa ipsum in eu eu eget libero.',
  },
]

export const trendingPost: TrendingType[] = [
  {
    id: 'testimonial-1',
    title: 'Lilia Bocouse',
    role: 'Head of Marketing',
  },
  { id: 'testimonial-2', title: 'Robert Fox', role: 'Marketing Coordinator' },
  { id: 'testimonial-3', title: 'Jenny Wilson', role: 'CEO, Co-Founder' },
]
