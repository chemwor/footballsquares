import { SafeHtml } from '@angular/platform-browser'
import {
  businessCopywriting,
  communication,
  emailMarketing,
  marketShares,
  marketingBranding,
  strategDevelopment,
} from '@components/icons'

export type StepType = {
  stepNumber: string
  stepTitle: string
  stepDescription: string
}
export type ServiceType = {
  description: string
  title: string
  icon: any
  sanitizedIcon?: SafeHtml
}

export type TeamType = {
  name: string
  role: string
  image: string
  socialMedia: string[]
}

export type ProfessionalMissionType = {
  title: string
  content: string
  icon: any
  sanitizedIcon?: SafeHtml
}

export type LocationType = {
  src: string
  caption: string
  thumb: string
}

export type SwiperType = {
  bindedTo: string
  content: string
}

export type TestimonialSwiperType = {
  id: string
  imageSrc: string
  name: string
  role: string
}

export const stepsToSuccess: StepType[] = [
  {
    stepNumber: '01',
    stepTitle: 'Formulation of the problem',
    stepDescription:
      'Find aute irure dolor in reprehenderi voluptate velit esse cillum dolore eu fugiat nulla pariatur am luctus.',
  },
  {
    stepNumber: '02',
    stepTitle: 'Assessment of the current state',
    stepDescription:
      'Risus quam quis at euismod vitae dui elementu eu in diam malesuada mattis ut urna integer erat nisi nibh.',
  },
  {
    stepNumber: '03',
    stepTitle: 'Business plan creation',
    stepDescription:
      'A sagittis morbi massa venenatis, egestas viverra ac elit nibh tellus nisi in nec tellus mauris feugiat gravida.',
  },
  {
    stepNumber: '04',
    stepTitle: 'Strategy implementation',
    stepDescription:
      'Elementum purus, nisl ipsum sit. Amet sit praesent proin sit cras. Leo sed praesent nunc vel nec risus.',
  },
]

export const teamData: TeamType[] = [
  {
    name: 'Jane Cooper',
    role: 'Head of PR department',
    image: 'assets/img/landing/corporate/team/03.jpg',
    socialMedia: ['instagram', 'facebook', 'linkedin'],
  },
  {
    name: 'Guy Hawkins',
    role: 'Head of marketing',
    image: 'assets/img/landing/corporate/team/01.jpg',
    socialMedia: ['facebook', 'x', 'linkedin'],
  },
  {
    name: 'Martha Winter',
    role: 'Data analyst',
    image: 'assets/img/landing/corporate/team/02.jpg',
    socialMedia: ['instagram', 'facebook', 'linkedin'],
  },
  {
    name: 'Robert Fox',
    role: 'CTO',
    image: 'assets/img/landing/corporate/team/05.jpg',
    socialMedia: ['facebook', 'x', 'stack-overflow'],
  },
  {
    name: 'Michelle Yang',
    role: 'CEO, Founder',
    image: 'assets/img/landing/corporate/team/06.jpg',
    socialMedia: ['instagram', 'facebook', 'linkedin'],
  },
  {
    name: 'Albert Flores',
    role: 'Art director',
    image: 'assets/img/landing/corporate/team/04.jpg',
    socialMedia: ['facebook', 'behance', 'dribbble'],
  },
]

export const testimonialSwiperData: SwiperType[] = [
  {
    content:
      '“Around provides us with the detailed and accurate data we need to make strategic decisions. All tools are constantly being improved and contain a lot of useful and interesting information. Thanks to Around, we can constantly analyze our big data quickly and efficiently.”',
    bindedTo: '#author1',
  },
  {
    content:
      '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac pretium dui. Aliquam rutrum justo lorem, in efficitur odio efficitur vel. Integer mattis, neque malesuada sagittis porttitor, enim tortor ullamcorper diam, id eleifend sem mauris at turpis. Curabitur sed nisi nec ligula dictum maximus eu ut ante.”',
    bindedTo: '#author2',
  },
  {
    content:
      '“Quisque rutrum sit amet magna sit amet tristique. Vivamus rhoncus ac purus vitae convallis. Aliquam erat volutpat. Proin egestas, mauris ut semper semper, ipsum felis mattis ligula, et porttitor ante arcu nec ante. Aliquam congue est eu turpis sollicitudin, et ullamcorper tortor aliquam.”',
    bindedTo: '#author3',
  },
  {
    content:
      '“Vestibulum faucibus lectus eget augue pharetra, quis semper lectus gravida. Vestibulum pretium in elit sed iaculis. Curabitur elementum turpis at ipsum molestie, id maximus odio tincidunt. Praesent id lacinia orci. Phasellus at varius arcu. Ut nec lobortis velit. Mauris vel risus quis lacus placerat fringilla.”',
    bindedTo: '#author4',
  },
]

export const servicesData: ServiceType[] = [
  {
    title: 'Market shares analysis',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget molestie massa. Donec egestas ex et velit egestas dignissim. Sed fringilla velit turpis.',
    icon: marketShares,
  },
  {
    title: 'Marketing and branding',
    description:
      'Find aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur neque congue aliqua dolor do amet sint velit officia.',
    icon: marketingBranding,
  },
  {
    title: 'Strategy development',
    description:
      'More erat leo proin odio est sed sit felis facilisi integer sed congue neque turpis dictumst sit sed volutpat aliquet tortor non aute irure dolor in reprehenderit in.',
    icon: strategDevelopment,
  },
  {
    title: 'Email marketing',
    description:
      'Adipiscing posuere dui, amet, augue nisl dictum justo enier sed neque congue non quam ultrices interdum vitae vestibulumaute irure dolor in reprehenderit in.',
    icon: emailMarketing,
  },
  {
    title: 'Working on communication',
    description:
      'Ut eu amet ac blandit nisl malesuada lectus viverra arcu in rhoncus egestas lorem consequat sollicitudin risus, in pellentesque tellus tincidunt purus viverra dignissim.',
    icon: communication,
  },
  {
    title: 'Business copywriting',
    description:
      'Massa morbi duis et ornare urna dictum vestibulum pulvinar nunc facilisis ornare id at at ut arcu integer tristique placerat non turpis nibh turpis ullamcorper est porttitor.',
    icon: businessCopywriting,
  },
]

export const professionalMissionData: ProfessionalMissionType[] = [
  {
    title: 'Individual approach',
    content:
      'Find aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur neque congue aliqua dolor.',
    icon: businessCopywriting,
  },
  {
    title: 'Integrated analytics',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget molestie massa. Donec egestas nulla pariatur.',
    icon: marketShares,
  },
  {
    title: 'Step by step work',
    content:
      'More erat leo proin odio est sed sit felis facilisi integer sed congue neque turpis dictumst sit sed volutpat aliquet tortor.',
    icon: strategDevelopment,
  },
]

export const locationData: LocationType[] = [
  {
    src: 'assets/img/about/agency/gallery/01.jpg',
    caption: 'Gallery image #1',
    thumb: '416px',
  },
  {
    src: 'assets/img/about/agency/gallery/02.jpg',
    caption: 'Gallery image #2',
    thumb: '526px',
  },
  {
    src: 'assets/img/about/agency/gallery/03.jpg',
    caption: 'Gallery image #3',
    thumb: '306px',
  },
  {
    src: 'assets/img/about/agency/gallery/04.jpg',
    caption: 'Gallery image #4',
    thumb: '367px',
  },
  {
    src: 'assets/img/about/agency/gallery/05.jpg',
    caption: 'Gallery image #5',
    thumb: '526px',
  },
  {
    src: 'assets/img/about/agency/gallery/06.jpg',
    caption: 'Gallery image #6',
    thumb: '416px',
  },
]

export const testimonialSwiper: TestimonialSwiperType[] = [
  {
    id: 'author1',
    imageSrc: 'assets/img/avatar/21.jpg',
    name: 'Lilianna Bocouse',
    role: 'Head of Marketing',
  },
  {
    id: 'author2',
    imageSrc: 'assets/img/avatar/33.jpg',
    name: 'Darell Steward',
    role: 'Project Manager',
  },
  {
    id: 'author3',
    imageSrc: 'assets/img/avatar/34.jpg',
    name: 'Annette Black',
    role: 'Lead Designer',
  },
  {
    id: 'author4',
    imageSrc: 'assets/img/avatar/35.jpg',
    name: 'Ralph Edwards',
    role: 'CEO, Co-Founder',
  },
]
