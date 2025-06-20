import { currentYear } from 'src/app/states/constants'

export type HeroType = {
  name: string
  position: string
  image: string
}

export type TargetDataType = {
  category: string
  content: {
    id: string
    text: string
    list: string[]
  }
}

export type SpeakerType = {
  name: string
  role: string
  avatar: string
}

export type SponsorsType = {
  name: string
  dark_logo: string
  light_logo: string
  description: string
}

export type ScheduleType = {
  time: string
  event: string
  description?: string
  attendees?: string[]
}

export type AttendanceType = {
  name: string
  avatar: string
  rating: number
  review: string
}

export type GalleryType = {
  id: number
  videoUrl?: string
  thumbnailUrl: string
  altText: string
  imageUrl?: string
}

export const heroSwiper: HeroType[] = [
  {
    name: 'Esther Howard',
    position: 'VP of Strategy, Stretto Inc.',
    image: 'assets/img/landing/conference/hero/01.jpg',
  },
  {
    name: 'Albert Flores',
    position: 'Product Manager, Google',
    image: 'assets/img/landing/conference/hero/02.jpg',
  },
  {
    name: 'Kathryn Murphy',
    position: 'VP of Marketing, Glassdoor',
    image: 'assets/img/landing/conference/hero/03.jpg',
  },
]

export const targetData: TargetDataType[] = [
  {
    category: 'UI/UX Designers',
    content: {
      id: 'designers',
      text: 'Ipsum sed nascetur dolor accumsan integer phasellus tincidunt. Nulla quisque pellentesque adipiscing placerat integer feugiat facilisi elit mi. Dictum nunc lacinia vel molestie laoreet aliquet ridiculus diam justo viverra.',
      list: [
        'At donec auctor quam ut scelerisque dui.',
        'Mollis sed fringilla placerat lobortis viverra aliquam ut nisl nisi.',
        'Odio ullamcorper in praesent venenatis non non sed pharetra dipise.',
        'Lobortis dui nibh at condimentum.',
      ],
    },
  },
  {
    category: 'Developers',
    content: {
      id: 'developers',
      text: 'Etiam sed porta massa. In sapien metus, lobortis eu tortor id, maximus commodo enim. Phasellus feugiat mi vitae enim cursus, ut scelerisque augue scelerisque. Pellentesque habitant morbi tristique senectus et netus.',
      list: [
        'Donec imperdiet dolor at leo sodales.',
        'Fringilla placerat lobortis viverra aliquam ut nisl nisi.',
        'Lobortis ullamcorper in praesent venenatis non non sed pharetra dipise.',
        'Mollis dui nibh at condimentum.',
      ],
    },
  },
  {
    category: 'Managers',
    content: {
      id: 'managers',
      text: 'Ipsum sed nascetur dolor accumsan integer phasellus tincidunt. Nulla quisque pellentesque adipiscing placerat integer feugiat facilisi elit mi. Dictum nunc lacinia vel molestie laoreet aliquet ridiculus diam justo viverra.',
      list: [
        'At donec auctor quam ut scelerisque dui.',
        'Mollis sed fringilla placerat lobortis viverra aliquam ut nisl nisi.',
        'Odio ullamcorper in praesent venenatis non non sed pharetra dipise.',
        'Lobortis dui nibh at condimentum.',
      ],
    },
  },
  {
    category: 'Marketers',
    content: {
      id: 'marketers',
      text: 'Etiam sed porta massa. In sapien metus, lobortis eu tortor id, maximus commodo enim. Phasellus feugiat mi vitae enim cursus, ut scelerisque augue scelerisque. Pellentesque habitant morbi tristique senectus et netus.',
      list: [
        'Donec imperdiet dolor at leo sodales.',
        'Fringilla placerat lobortis viverra aliquam ut nisl nisi.',
        'Lobortis ullamcorper in praesent venenatis non non sed pharetra dipise.',
        'Mollis dui nibh at condimentum.',
      ],
    },
  },
]

export const speakersData: SpeakerType[] = [
  {
    name: 'Marvin McKinney',
    role: 'Founder & CEO, Uber',
    avatar: 'assets/img/avatar/36.jpg',
  },
  {
    name: 'Jenny Wilson',
    role: 'Marketer, Glassdoor',
    avatar: 'assets/img/avatar/37.jpg',
  },
  {
    name: 'Albert Flores',
    role: 'Product Manager, Google',
    avatar: 'assets/img/avatar/38.jpg',
  },
  {
    name: 'Anneta Nikson',
    role: 'Founder & CEO, Perfecto',
    avatar: 'assets/img/avatar/39.jpg',
  },
  {
    name: 'Esther Howard',
    role: 'VP of Strategy, Stretto Inc.',
    avatar: 'assets/img/avatar/40.jpg',
  },
  {
    name: 'Jerome Bell',
    role: 'Strategic Advisor, Shopify',
    avatar: 'assets/img/avatar/41.jpg',
  },
  {
    name: 'Kathryn Murphy',
    role: 'Marketing Coordinator',
    avatar: 'assets/img/avatar/42.jpg',
  },
  {
    name: 'Guy Hawkins',
    role: 'President of Sales',
    avatar: 'assets/img/avatar/43.jpg',
  },
]

export const sponsoredData: SponsorsType[] = [
  {
    name: 'Envato',
    dark_logo: 'assets/img/landing/conference/sponsors/envato-dark.svg',
    light_logo: 'assets/img/landing/conference/sponsors/envato-light.svg',
    description:
      'Faucibus amet cursus accumsan eleifend tempus diam id duis. Mi velit nulla purus commodo non.',
  },
  {
    name: 'Angular',
    dark_logo: 'assets/img/landing/conference/sponsors/angular-dark.svg',
    light_logo: 'assets/img/landing/conference/sponsors/angular-light.svg',
    description:
      'Nulla consequat tincidunt ut aliquet quam dignissim. Sagittis, enim libero ultrices eleifend congue.',
  },

  {
    name: 'Pingdom',
    dark_logo: 'assets/img/landing/conference/sponsors/pingdom-dark.svg',
    light_logo: 'assets/img/landing/conference/sponsors/pingdom-light.svg',
    description:
      'Ornare leo sed gravida quam volutpat vulputate massa aliquam. Sem lacus, quam tellus duis sit pellentesque.',
  },
  {
    name: 'WooCommerce',
    dark_logo: 'assets/img/landing/conference/sponsors/woocommerce-dark.svg',
    light_logo: 'assets/img/landing/conference/sponsors/woocommerce-light.svg',
    description:
      'Imperdiet nunc, mauris, sed at egestas. Massa laoreet facilisis turpis adipiscing semper venenatis ipsum.',
  },
  {
    name: 'Magento',
    dark_logo: 'assets/img/landing/conference/sponsors/magento-dark.svg',
    light_logo: 'assets/img/landing/conference/sponsors/magento-light.svg',
    description:
      'Purus eu faucibus at vel, aliquam. Faucibus nibh odio sed elementum blandit ut sociis et.',
  },
  {
    name: 'Bootstrap',
    dark_logo: 'assets/img/landing/conference/sponsors/bootstrap-dark.svg',
    light_logo: 'assets/img/landing/conference/sponsors/bootstrap-light.svg',
    description:
      'Adipiscing ultrices risus maecenas libero donec nam. In sollicitudin nulla sagittis, neque sit ullamcorper.',
  },
  {
    name: 'Laravel',
    dark_logo: 'assets/img/landing/conference/sponsors/laravel-dark.svg',
    light_logo: 'assets/img/landing/conference/sponsors/laravel-light.svg',
    description:
      'Pharetra morbi id nibh ut at risus tortor consequat. Dictum urna vulputate quis ut facilisis turpis purus commodo.',
  },
  {
    name: 'React',
    dark_logo: 'assets/img/landing/conference/sponsors/react-dark.svg',
    light_logo: 'assets/img/landing/conference/sponsors/react-light.svg',
    description:
      'Suspendisse luctus maecenas tristique urna turpis aenean est. Porttitor porta nec tincidunt ut aliquet quam.',
  },
]

export const scheduleData: ScheduleType[] = [
  {
    time: '9:30 - 10:30 am',
    event: 'Opening party & registration',
    description:
      'Vitae lectus metus non dolor mattis penatibus ultricies aliquet nunc sit metus turpis enim urna nec risus vehicula pharetra diam erat ac proin donec.',
    attendees: [
      'assets/img/avatar/05.jpg',
      'assets/img/avatar/08.jpg',
      'assets/img/avatar/09.jpg',
      'assets/img/avatar/12.jpg',
    ],
  },
  {
    time: '10:30 - 11:30 am',
    event: 'What are the top ideas for startup in ' + currentYear,
    description:
      'Iaculis tellus morbi dui metus non leo pellentesque et euismod et tellus.',
    attendees: ['assets/img/avatar/10.jpg', 'assets/img/avatar/06.jpg'],
  },
  {
    time: '11:30 - 12:00 am',
    event: 'Coffee break',
  },
  {
    time: '12:00 - 15:00 am',
    event: 'Workshop: leading UI/UX design trends',
    description:
      'Mi ullamcorper porttitor auctor nunc dui massa mattis fusce convallis. Aliquam quam nulla faucibus id. Eu cum quisque imperdiet semper ut ligula scelerisque.',
    attendees: ['assets/img/avatar/19.jpg'],
  },
  {
    time: '15:00 - 17:30 pm',
    event: 'Group discussion: How to align and empower cross-team success',
    description:
      'Vitae lectus metus non dolor mattis penatibus ultricies aliquet nunc sit metus.',
    attendees: [
      'assets/img/avatar/08.jpg',
      'assets/img/avatar/06.jpg',
      'assets/img/avatar/09.jpg',
    ],
  },
]

export const day_two_schedule: ScheduleType[] = [
  {
    time: '12:00 - 15:00 am',
    event: 'Workshop: How Blockchain affects modern IT market',
    description:
      'Mi ullamcorper porttitor auctor nunc dui massa mattis fusce convallis. Aliquam quam nulla faucibus id. Eu cum quisque imperdiet semper ut ligula scelerisque.',
    attendees: ['assets/img/avatar/19.jpg'],
  },
  {
    time: '9:30 - 10:30 am',
    event: 'The future of front-end frameworks',
    description:
      'Vitae lectus metus non dolor mattis penatibus ultricies aliquet nunc sit metus turpis enim urna nec risus vehicula pharetra diam erat ac proin donec.',
    attendees: [
      'assets/img/avatar/05.jpg',
      'assets/img/avatar/08.jpg',
      'assets/img/avatar/09.jpg',
      'assets/img/avatar/12.jpg',
    ],
  },
  {
    time: '11:30 - 12:00 am',
    event: 'Coffee break',
  },
  {
    time: '15:00 - 17:30 pm',
    event: 'Group discussion: How good UI design influences our perception',
    description:
      'Vitae lectus metus non dolor mattis penatibus ultricies aliquet nunc sit metus.',
    attendees: [
      'assets/img/avatar/08.jpg',
      'assets/img/avatar/06.jpg',
      'assets/img/avatar/09.jpg',
    ],
  },
  {
    time: '10:30 - 11:30 am',
    event: 'What are the top ideas for startup in' + currentYear,
    description:
      'Iaculis tellus morbi dui metus non leo pellentesque et euismod et tellus.',
    attendees: ['assets/img/avatar/10.jpg', 'assets/img/avatar/06.jpg'],
  },
]

export const attendance: AttendanceType[] = [
  {
    name: 'Wade Warren',
    avatar: 'assets/img/avatar/23.jpg',
    rating: 4,
    review:
      'Sit facilisis dolor arcu, fermentum vestibulum arcu elementum imperdiet. Mauris duis eleifend faucibus amet sagittis amet consequat aucibus.',
  },
  {
    name: 'Jenny Wilson',
    avatar: 'assets/img/avatar/26.jpg',
    rating: 5,
    review:
      'Netus vel, amet placerat eget sit eleifend. Urna laoreet ultricies orci feugiat amet egestas semper praesent. Risus ut porttitor metus.',
  },
  {
    name: 'Bessie Cooper',
    avatar: 'assets/img/avatar/27.jpg',
    rating: 4.5,
    review:
      'Netus vel, amet placerat eget sit eleifend. Urna laoreet ultricies orci feugiat amet egestas semper praesent. Risus ut porttitor metus.',
  },
  {
    name: 'Ralph Edwards',
    avatar: 'assets/img/avatar/32.jpg',
    rating: 4,
    review:
      'Odio viverra tristique id adipiscing varius. Leo vel tincidunt amet arcu. Auctor ipsum fames lacus vestibulum. Ultricies cras et at sed sed turpis.',
  },
  {
    name: 'Cameron Williamson',
    avatar: 'assets/img/avatar/28.jpg',
    rating: 4.5,
    review:
      'Mauris fermentum vitae volutpat orci mattis dolor malesuada porta id. Enim, dis nisi eget tincidunt bibendum leo pulvinar in. At justo hacsit diam.',
  },
  {
    name: 'Annette Black',
    avatar: 'assets/img/avatar/24.jpg',
    rating: 5,
    review:
      'Nisi et venenatis vitae, purus arcu. Integer lacus maecenas rhoncus nibh aliquam, enim sollicitudin interdum hendrerit. Proin venenatis varius.',
  },
]

export const galleryData: GalleryType[] = [
  {
    id: 1,
    imageUrl: 'assets/img/landing/conference/gallery/01.jpg',
    thumbnailUrl: 'assets/img/landing/conference/gallery/th01.jpg',
    altText: 'Auditorium',
  },
  {
    id: 2,
    imageUrl: 'assets/img/landing/conference/gallery/02.jpg',
    thumbnailUrl: 'assets/img/landing/conference/gallery/th02.jpg',
    altText: 'Comfortable chairs',
  },
  {
    id: 3,
    videoUrl: 'https://www.youtube.com/watch?v=5-A8_ocajCM',
    thumbnailUrl: 'assets/img/landing/conference/gallery/th05.jpg',
    altText: 'Conference showreel',
  },
  {
    id: 4,
    imageUrl: 'assets/img/landing/conference/gallery/03.jpg',
    thumbnailUrl: 'assets/img/landing/conference/gallery/th03.jpg',
    altText: 'Whiteboard',
  },
  {
    id: 5,
    imageUrl: 'assets/img/landing/conference/gallery/04.jpg',
    thumbnailUrl: 'assets/img/landing/conference/gallery/th04.jpg',
    altText: 'Coffee break',
  },
  {
    id: 6,
    videoUrl: 'https://www.youtube.com/watch?v=Omr18ybhPKI',
    thumbnailUrl: 'assets/img/landing/conference/gallery/th06.jpg',
    altText: 'Speaker on stage',
  },
]
