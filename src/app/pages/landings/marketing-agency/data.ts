import { SafeHtml } from '@angular/platform-browser'
import {
  consultation,
  guarantee,
  onlineSupport,
  workOnTime,
} from '@components/icons'
import { currentYear } from 'src/app/states/constants'

export type ToolsType = {
  tool: string
  imageSrc?: string
  delay?: number
  imageSrcDark?: string
  imageSrcLight?: string
}

export type BenefitsType = {
  title: string
  description: string
  icon: string
  svgPath: any
  sanitizedIcon?: SafeHtml
}

export type SpecialistType = {
  brand: string
  imageSrcDark: string
  imageSrcLight: string
  width: number
}

export type TeamDataType = {
  name: string
  role: string
  image: string
  socialMedia: [
    { platform: string; link: string },
    { platform: string; link: string },
    { platform: string; link: string },
  ]
}

export type ResourceType = {
  date: string
  category: string
  title: string
  excerpt: string
  author: {
    name: string
    avatar: string
  }
}

export type TestimonialSwiperType = {
  author: string
  quote: string
}

export type testimonialType = {
  id: string
  name: string
  role: string
  avatar: string
}

export type CounterType = {
  id: string
  title: string
  description: string
  statistics: {
    leads: string
    revenueIncrease: string
    salesChannels: string
  }
}

export type ServicesType = {
  title: string
  icon: string
  color: string
  description: string
}[][]

export const toolsData: ToolsType[] = [
  {
    tool: 'Bing',
    imageSrc: 'assets/img/landing/marketing-agency/tools/bing.svg',
    delay: 300,
  },
  {
    tool: 'Facebook',
    imageSrc: 'assets/img/landing/marketing-agency/tools/facebook.svg',
    delay: 500,
  },
  {
    tool: 'Microsoft',
    imageSrcDark:
      'assets/img/landing/marketing-agency/tools/microsoft-dark.svg',
    imageSrcLight:
      'assets/img/landing/marketing-agency/tools/microsoft-light.svg',
    delay: 200,
  },
  {
    tool: 'Google',
    imageSrc: 'assets/img/landing/marketing-agency/tools/google.svg',
    delay: 800,
  },
  {
    tool: 'Google Ads',
    imageSrcDark:
      'assets/img/landing/marketing-agency/tools/google-ads-dark.svg',
    imageSrcLight:
      'assets/img/landing/marketing-agency/tools/google-ads-light.svg',
  },
  {
    tool: 'Admitad',
    imageSrcDark: 'assets/img/landing/marketing-agency/tools/admitad-dark.svg',
    imageSrcLight:
      'assets/img/landing/marketing-agency/tools/admitad-light.svg',
    delay: 600,
  },
  {
    tool: 'Google Analytics',
    imageSrcDark:
      'assets/img/landing/marketing-agency/tools/google-analytics-dark.svg',
    imageSrcLight:
      'assets/img/landing/marketing-agency/tools/google-analytics-light.svg',
    delay: 400,
  },
  {
    tool: 'Instagram',
    imageSrcDark:
      'assets/img/landing/marketing-agency/tools/instagram-dark.svg',
    imageSrcLight:
      'assets/img/landing/marketing-agency/tools/instagram-light.svg',
    delay: 700,
  },
  {
    tool: 'TikTok',
    imageSrcDark: 'assets/img/landing/marketing-agency/tools/tiktok-dark.svg',
    imageSrcLight: 'assets/img/landing/marketing-agency/tools/tiktok-light.svg',
    delay: 100,
  },
]

export const benefitsData: BenefitsType[] = [
  {
    title: 'Online support',
    description:
      'Pharetra morbi quis is massa maecenas vulputate elit non nullage a duis tortor mi massa pharetra.',
    icon: 'ai-search-settings',
    svgPath: onlineSupport,
  },
  {
    title: '100% guarantee',
    description:
      'Sapien ultrices egestas at faucibus eu diam velit diam id amet nibh quam rutrum diam diam natoque scelerisque.',
    icon: 'ai-bulb-alt',
    svgPath: guarantee,
  },
  {
    title: 'Work on time',
    description:
      'Morbi et massa fames ac scelerisque sit commodo dignissim faucibus vel quisque proin lectus orbi et massa fames.',
    icon: 'ai-circle-check-filled',
    svgPath: workOnTime,
  },
  {
    title: 'Free consultation',
    description:
      'Consectetur adipiscing elit proin volutpat mollis egestas nam luctus facilisis ultrices pellentesque volutpat ligula est.',
    icon: 'ai-rocket',
    svgPath: consultation,
  },
]

export const specialistsData: SpecialistType[] = [
  {
    brand: 'Klinos',
    imageSrcDark: 'assets/img/landing/saas-1/brands/klinos-gray.svg',
    imageSrcLight: 'assets/img/landing/saas-1/brands/klinos-light.svg',
    width: 120,
  },
  {
    brand: 'Starcraft',
    imageSrcDark: 'assets/img/landing/saas-1/brands/starcraft-gray.svg',
    imageSrcLight: 'assets/img/landing/saas-1/brands/starcraft-light.svg',
    width: 147,
  },
  {
    brand: 'Airbnb',
    imageSrcDark: 'assets/img/landing/saas-1/brands/airbnb-gray.svg',
    imageSrcLight: 'assets/img/landing/saas-1/brands/airbnb-light.svg',
    width: 121,
  },
  {
    brand: 'Alpine',
    imageSrcDark: 'assets/img/landing/saas-1/brands/alpine-gray.svg',
    imageSrcLight: 'assets/img/landing/saas-1/brands/alpine-light.svg',
    width: 132,
  },
  {
    brand: 'Foster',
    imageSrcDark: 'assets/img/landing/saas-1/brands/foster-gray.svg',
    imageSrcLight: 'assets/img/landing/saas-1/brands/foster-light.svg',
    width: 132,
  },
  {
    brand: 'Champion',
    imageSrcDark: 'assets/img/landing/saas-1/brands/champion-gray.svg',
    imageSrcLight: 'assets/img/landing/saas-1/brands/champion-light.svg',
    width: 130,
  },
  {
    brand: 'Starcraft',
    imageSrcDark: 'assets/img/landing/saas-1/brands/starcraft-gray.svg',
    imageSrcLight: 'assets/img/landing/saas-1/brands/starcraft-light.svg',
    width: 147,
  },
  {
    brand: 'Klinos',
    imageSrcDark: 'assets/img/landing/saas-1/brands/klinos-gray.svg',
    imageSrcLight: 'assets/img/landing/saas-1/brands/klinos-light.svg',
    width: 120,
  },
]

export const testimonialQuotes: TestimonialSwiperType[] = [
  {
    author: '#author1',
    quote:
      '“Around provides us with the detailed and accurate data we need to make strategic decisions. All tools are constantly being improved and contain a lot of useful and interesting information. Thanks to Around, we can constantly analyze our big data quickly and efficiently.”',
  },
  {
    author: '#author2',
    quote:
      '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac pretium dui. Aliquam rutrum justo lorem, in efficitur odio efficitur vel. Integer mattis, neque malesuada sagittis porttitor, enim tortor ullamcorper diam, id eleifend sem mauris at turpis. Curabitur sed nisi nec ligula dictum maximus eu ut ante.”',
  },
  {
    author: '#author3',
    quote:
      '“Quisque rutrum sit amet magna sit amet tristique. Vivamus rhoncus ac purus vitae convallis. Aliquam erat volutpat. Proin egestas, mauris ut semper semper, ipsum felis mattis ligula, et porttitor ante arcu nec ante. Aliquam congue est eu turpis sollicitudin, et ullamcorper tortor aliquam.”',
  },
  {
    author: '#author4',
    quote:
      '“Vestibulum faucibus lectus eget augue pharetra, quis semper lectus gravida. Vestibulum pretium in elit sed iaculis. Curabitur elementum turpis at ipsum molestie, id maximus odio tincidunt. Praesent id lacinia orci. Phasellus at varius arcu. Ut nec lobortis velit. Mauris vel risus quis lacus placerat fringilla.”',
  },
]

export const counterData: CounterType[] = [
  {
    id: '#image1',
    title:
      'Growth of subscribers and sales on social networks for the eco shoe brand',
    description:
      'Morbi et massa fames ac scelerisque sit commodo dignissim faucibus vel quisque proin lectus. Morbi et massa fames ac scelerisque sit commodo dignissim.',
    statistics: {
      leads: '1000+',
      revenueIncrease: '160%',
      salesChannels: '12+',
    },
  },
  {
    id: '#image2',
    title: 'Business strategy for a brand of vintage bags and accessories',
    description:
      'Pharetra in morbi quis is massa maecenas arcu vulputate pulvinar elit non nullage a, duis tortor mi massa ipsum in eu eu eget libero pulvinar elit vulputate scelerisque.',
    statistics: {
      leads: '1200+',
      revenueIncrease: '130%',
      salesChannels: '14+',
    },
  },
  {
    id: '#image3',
    title:
      'Growth of subscribers and sales on social networks for the eco cosmetics',
    description:
      'Sapien ultrices egestas at faucibus eu diam velit diam id amet nibh quam rutrum diam fermentum diam natoque scelerisque viverra molestie fames pulvinar elit.',
    statistics: {
      leads: '900+',
      revenueIncrease: '150%',
      salesChannels: '10+',
    },
  },
]

export const teamsData: TeamDataType[] = [
  {
    name: 'Alisa Black',
    role: 'Head of marketing',
    image: 'assets/img/landing/creative-agency/team/02.jpg',
    socialMedia: [
      { platform: 'instagram', link: '#' },
      { platform: 'facebook', link: '#' },
      { platform: 'linkedin', link: '#' },
    ],
  },
  {
    name: 'Guy Hawkins',
    role: 'President of Sales',
    image: 'assets/img/landing/creative-agency/team/01.jpg',
    socialMedia: [
      { platform: 'X', link: '#' },
      { platform: 'facebook', link: '#' },
      { platform: 'instagram', link: '#' },
    ],
  },
  {
    name: 'Robert Fox',
    role: 'Web Designer',
    image: 'assets/img/landing/creative-agency/team/06.jpg',
    socialMedia: [
      { platform: 'facebook', link: '#' },
      { platform: 'behance', link: '#' },
      { platform: 'dribbble', link: '#' },
    ],
  },
  {
    name: 'Jane Cooper',
    role: 'Marketing Coordinator',
    image: 'assets/img/landing/creative-agency/team/04.jpg',
    socialMedia: [
      { platform: 'instagram', link: '#' },
      { platform: 'facebook', link: '#' },
      { platform: 'linkedin', link: '#' },
    ],
  },
  {
    name: 'Cody Fisher',
    role: 'SMM Specialist',
    image: 'assets/img/landing/creative-agency/team/03.jpg',
    socialMedia: [
      { platform: 'X', link: '#' },
      { platform: 'facebook', link: '#' },
      { platform: 'instagram', link: '#' },
    ],
  },
  {
    name: 'Jacob Jones',
    role: 'Web Designer',
    image: 'assets/img/landing/creative-agency/team/05.jpg',
    socialMedia: [
      { platform: 'facebook', link: '#' },
      { platform: 'behance', link: '#' },
      { platform: 'dribbble', link: '#' },
    ],
  },
]

export const resourcesData: ResourceType[] = [
  {
    date: 'August 13, ' + currentYear,
    category: 'Inspiration',
    title: 'Promotion of an online store from scratch, first sales',
    excerpt:
      'Sapien ultrices egestas at faucibus eu diam velit diam id amet nibh quam rutrum diam fermentum diam natoque scelerisque viverra molestie fames...',
    author: {
      name: 'Guy Hawkins',
      avatar: 'assets/img/avatar/10.jpg',
    },
  },
  {
    date: 'July 25, ' + currentYear,
    category: 'Inspiration',
    title: 'Business strategy for a brand of vintage bags',
    excerpt:
      'Pharetra in morbi quis is massa maecenas arcu vulputate pulvinar elit non nullage a, duis tortor mi massa ipsum in eu eu eget libero pulvinar elit vulputate...',
    author: {
      name: 'Cody Fisher',
      avatar: 'assets/img/avatar/07.jpg',
    },
  },
  {
    date: 'July 08, ' + currentYear,
    category: 'Inspiration',
    title: 'Sales on social networks for the eco cosmetics',
    excerpt:
      'Morbi et massa fames ac scelerisque sit commodo dignissim faucibus vel quisque proin lectus et massa fames ac scelerisque sit commodo dignissim...',
    author: {
      name: 'Jane Cooper',
      avatar: 'assets/img/avatar/09.jpg',
    },
  },
]

export const marketingAgecy: ServicesType = [
  [
    {
      title: 'SEO Website Audit',
      icon: 'ai-search-settings',
      color: 'primary',
      description:
        'Consectetur adipiscing elit proin volutpat mollis egestas nam in luctus facilisis ultrices llentesque volutpat ligula est dignissim.',
    },
    {
      title: 'Content Marketing',
      icon: 'ai-bulb-alt',
      color: 'info',
      description:
        'Morbi et massa fames ac lerisque sit commodo dignissim faucibus vel quisque proin lectus orbi et massa fames ac massa.',
    },
  ],
  [
    {
      title: 'Email Marketing',
      icon: 'ai-mail-filled',
      color: 'warning',
      description:
        'Sapiener ultrices egestas at faucibus eu diam velit diam id amet nibh quam rutrum diam diam natoque scelerisque viverra.',
    },
    {
      title: 'Social Networks',
      icon: 'ai-telegram',
      color: 'danger',
      description:
        'Pharetra in morbi quis is massa maecenas arcu vulputate pulvinar elit non nullage a, duis tortor mi massa ipsum in eu eu eget libero.',
    },
  ],
]

export const bindedTestimonial: testimonialType[] = [
  {
    id: 'author1',
    name: 'Lilianna Bocouse',
    role: 'Head of Marketing',
    avatar: 'assets/img/avatar/13.jpg',
  },
  {
    id: 'author2',
    name: 'Darell Steward',
    role: 'Project Manager',
    avatar: 'assets/img/avatar/14.jpg',
  },
  {
    id: 'author3',
    name: 'Annette Black',
    role: 'Lead Designer',
    avatar: 'assets/img/avatar/15.jpg',
  },
  {
    id: 'author4',
    name: 'Ralph Edwards',
    role: 'CEO, Co-Founder',
    avatar: 'assets/img/avatar/16.jpg',
  },
]
