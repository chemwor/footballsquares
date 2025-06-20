import { SafeHtml } from '@angular/platform-browser'
import {
  businessCopywriting,
  communication,
  emailMarketing,
  marketShares,
  marketingBranding,
  strategDevelopment,
} from '@components/icons'
import { currentYear } from 'src/app/states/constants'

export type ServiceType = {
  title: string
  image: string
  description: string
  icons: string
  sanitizedIcon?: SafeHtml
}

export type CorporatePartnerType = {
  name: string
  logoDark?: string
  logoLight?: string
  width: number
  alt: string
  logo?: string
}

export type ProfessionalApproachType = {
  number: string
  title: string
  description: string
}

export type ContentBindedtype = {
  id: string
  name: string
  position: string
}
export type CorporateTestimonialType = {
  id: string
  author: string
  role: string
  quote: string
  content: string
}

export type CorporateTeamType = {
  name: string
  role?: string
  image: string
  social: {
    facebook?: string
    x?: string
    linkedin?: string
    instagram?: string
    stackOverflow?: string
    behance?: string
    dribbble?: string
  }
}

export type CorporateType = {
  title: string
  url: string
  excerpt: string
  date: string
  category: string
}

export type CorporateFaqsType = {
  name: string
  content: string
}

export const serviceData: ServiceType[] = [
  {
    title: 'Market shares analysis',
    image: 'assets/img/landing/corporate/services/01.jpg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget molestie massa. Donec egestas ex et velit egestas dignissim. Sed fringilla velit turpis.',
    icons: marketShares,
  },
  {
    title: 'Marketing and branding',
    image: 'assets/img/landing/corporate/services/02.jpg',
    description:
      'Find aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur neque congue aliqua dolor do amet sint velit officia.',
    icons: marketingBranding,
  },
  {
    title: 'Strategy development',
    image: 'assets/img/landing/corporate/services/03.jpg',
    description:
      'More erat leo proin odio est sed sit felis facilisi integer sed congue neque turpis dictumst sit sed volutpat aliquet tortor non aute irure dolor in reprehenderit in.',
    icons: strategDevelopment,
  },
  {
    title: 'Email marketing',
    image: 'assets/img/landing/corporate/services/04.jpg',
    description:
      'Adipiscing posuere dui, amet, augue nisl dictum justo enier sed neque congue non quam ultrices interdum vitae vestibulumaute irure dolor in reprehenderit in.',
    icons: emailMarketing,
  },
  {
    title: 'Working on communication',
    image: 'assets/img/landing/corporate/services/05.jpg',
    description:
      'Ut eu amet ac blandit nisl malesuada lectus viverra arcu in rhoncus egestas lorem consequat sollicitudin risus, in pellentesque tellus tincidunt purus viverra dignissim.',
    icons: communication,
  },
  {
    title: 'Business copywriting',
    image: 'assets/img/landing/corporate/services/06.jpg',
    description:
      'Massa morbi duis et ornare urna dictum vestibulum pulvinar nunc facilisis ornare id at at ut arcu integer tristique placerat non turpis nibh turpis ullamcorper est porttitor.',
    icons: businessCopywriting,
  },
]

export const corporatePartner: CorporatePartnerType[] = [
  {
    name: 'Auchan',
    logo: 'assets/img/brands/auchan.svg',
    width: 220,
    alt: 'Auchan',
  },
  {
    name: 'Suzuki',
    logo: 'assets/img/brands/suzuki.svg',
    width: 220,
    alt: 'Suzuki',
  },
  {
    name: 'Champion',
    logoDark: 'assets/img/brands/champion-dark.svg',
    logoLight: 'assets/img/brands/champion-light.svg',
    width: 220,
    alt: 'Champion',
  },
  {
    name: 'Starcraft',
    logoDark: 'assets/img/brands/starcraft-dark.svg',
    logoLight: 'assets/img/brands/starcraft-light.svg',
    width: 220,
    alt: 'Starcraft',
  },
  {
    name: 'Klinos',
    logo: 'assets/img/brands/klinos.svg',
    width: 220,
    alt: 'Klinos',
  },
  {
    name: 'Puma',
    logoDark: 'assets/img/brands/puma-dark.svg',
    logoLight: 'assets/img/brands/puma-light.svg',
    width: 220,
    alt: 'Puma',
  },
  {
    name: 'Airbnb',
    logo: 'assets/img/brands/airbnb.svg',
    width: 220,
    alt: 'Airbnb',
  },
  {
    name: 'Philips',
    logo: 'assets/img/brands/philips.svg',
    width: 220,
    alt: 'Philips',
  },
]

export const professionalApproach: ProfessionalApproachType[] = [
  {
    number: '01',
    title: 'Individual approach',
    description:
      'Hac erat leo proin odio est sed sit in felis facilisi integer sed congue neque turpis dictumst sitsed volutpat aliquet tortor.',
  },
  {
    number: '02',
    title: 'Integrated analytics',
    description:
      'Find aute irure dolor in enderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur neque congue neque turpis.',
  },
]

export const corporateTestimonial: CorporateTestimonialType[] = [
  {
    id: '#testimonial-1',
    author: 'Lilia Bocouse',
    role: 'Head of Marketing',
    quote: 'Thanks to your talented team for the strategy we dreamed about!',
    content:
      'Suspendisse mauris elit, pellentesque nec purus sed, finibus finibus ipsum. Proin posuere, metus sed porttitor pellentesque, ante magna tincidunt mi, nec fermentum dui ligula vel massa. Praesent ultrices iaculis arcu iaculis ultrices. Maecenas vitae nulla odio. In laoreet, lectus in tempus ultricies.',
  },
  {
    id: '#testimonial-2',
    author: 'Robert Fox',
    role: 'Marketing Coordinator',
    quote: 'Exceptional work, delivery and flexibility. An excellent result.',
    content:
      'Leo vitae sem eget eget at in vivamus placerat sodales tristique risusiis senectusic quisque faucibus est justo egetert lobortis ultrices eu dignissim etiamier turpis tincidunt eget placerat feugiat senectusic quisque faucibus placerat sodales vitae tempor morbi tellus pulvinar tristique in turpis.',
  },
  {
    id: '#testimonial-3',
    author: 'Jenny Wilson',
    role: 'CEO, Co-Founder',
    quote:
      'Thanks to you, we have created a unique branding that is our pride!',
    content:
      'Duis sapien velit, rutrum ac rutrum dapibus, auctor ut lacus. Aenean sit amet erat augue. Aenean finibus, nibh sed malesuada maximus, nisi tellus iaculis quam, eget egestas mi felis eu urna. Quisque id nisl commodo, egestas eros ac, cursus odio. Ut nec rutrum magna, vel tempor erat. Vivamus nec tempus purus.',
  },
]

export const teamData: CorporateTeamType[] = [
  {
    name: 'Guy Hawkins',
    role: 'Head of marketing',
    image: 'assets/img/landing/corporate/team/01.jpg',
    social: {
      facebook: 'facebook',
      x: 'x',
      linkedin: 'linkedin',
    },
  },
  {
    name: 'Martha Winter',
    role: 'Data analyst',
    image: 'assets/img/landing/corporate/team/02.jpg',
    social: {
      instagram: 'instagram',
      facebook: 'facebook',
      linkedin: 'linkedin',
    },
  },
  {
    name: 'Jane Cooper',
    role: 'Head of PR department',
    image: 'assets/img/landing/corporate/team/03.jpg',
    social: {
      instagram: 'instagram',
      facebook: 'facebook',
      linkedin: 'linkedin',
    },
  },
]

export const team2Data: CorporateTeamType[] = [
  {
    name: 'Albert Flores',
    role: 'Art director',
    image: 'assets/img/landing/corporate/team/04.jpg',
    social: {
      facebook: 'facebook',
      behance: 'behance',
      dribbble: 'dribbble',
    },
  },
  {
    name: 'Robert Fox',
    role: 'CTO',
    image: 'assets/img/landing/corporate/team/05.jpg',
    social: {
      facebook: 'facebook',
      x: 'x',
      stackOverflow: 'stack-overflow',
    },
  },
  {
    name: 'Michelle Yang',
    role: 'CEO, Founder',
    image: 'assets/img/landing/corporate/team/06.jpg',
    social: {
      instagram: 'instagram',
      facebook: 'facebook',
      linkedin: 'linkedin',
    },
  },
]

export const corporateBlog: CorporateType[] = [
  {
    title: 'Promotion from scratch to the first sales',
    url: '#',
    excerpt:
      'Suscipit consectetur nam hac in enim, adipiscing aenean tortor ac commodo eu nibh a tempus sed...',
    date: 'August 13, ' + currentYear,
    category: 'Strategy',
  },
  {
    title: 'New business strategies for ' + currentYear,
    url: '#',
    excerpt:
      'Orci massa sapien varius odio et vel egestas ultricies commodo tristique ullamcorper sit vitae cursus...',
    date: 'August 2, ' + currentYear,
    category: 'Business',
  },
  {
    title: 'Outgoing year results, the main news',
    url: '#',
    excerpt:
      'Mauris suscipit in tempor, platea lobortis mollis rutrum aliquam pulvinar ultricies orci augue libero...',
    date: 'July 27, ' + currentYear,
    category: 'Analytics',
  },
  {
    title: 'How to define goals and objectives',
    url: '#',
    excerpt:
      'Sed convallis integer egestas sapien sapien purus enim massa porttitor vulputate metus purus in fringilla...',
    date: 'July 19, ' + currentYear,
    category: 'Strategy',
  },
]

export const corporateFaqs: CorporateFaqsType[] = [
  {
    name: 'Finance and insurance',
    content:
      'Sit purus platea nunc semper auctor integer semper et ac odio eget a lacus eu duis ante sed molestie varius tempus gravida libero pretium sit etiam morbi orci et vestibulum velit consectetur posuere suscipit.',
  },
  {
    name: 'Startup and technology',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum posuere finibus dui, eget scelerisque ipsum suscipit nec. Praesent nec quam in ipsum ultricies ultricies et sagittis dui platea nunc semper auctor.',
  },
  {
    name: 'Medicine and beauty',
    content:
      'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris tincidunt imperdiet hendrerit. Fusce tortor turpis, facilisis ac efficitur eget etiam morbi orci et.',
  },
  {
    name: 'Real estate and catering',
    content:
      'Aenean suscipit, lacus eu sagittis pretium, quam purus aliquet velit, in vestibulum eros massa et eros. Proin sed mollis tortor. Integer non felis condimentum, gravida metus nec, mollis mauris ultrices malesuada.',
  },
  {
    name: 'E-commerce',
    content:
      'Curabitur dictum sodales aliquam. Etiam tortor augue, ultrices in efficitur sit amet, luctus dapibus magna. Vivamus eu lacus elementum, ultrices massa vitae, elementum lorem tristique senectus et netus.',
  },
  {
    name: 'Educational and training',
    content:
      'Sed sollicitudin interdum nunc ut pharetra. Proin vehicula volutpat mattis. Curabitur a ipsum leo. Praesent dapibus est ac risus maximus, sit amet placerat diam congue elit sem commodo justo scelerisque ipsum.',
  },
]

export const contentBinded: ContentBindedtype[] = [
  {
    id: 'testimonial-1',
    name: 'Lilia Bocouse',
    position: 'Head of Marketing',
  },
  {
    id: 'testimonial-2',
    name: 'Robert Fox',
    position: 'Marketing Coordinator',
  },
  {
    id: 'testimonial-3',
    name: 'Jenny Wilson',
    position: 'CEO, Co-Founder',
  },
]
