import { SafeHtml } from '@angular/platform-browser'
import {
  businessCopywriting,
  communication,
  emailMarketing,
  strategDevelopment,
} from '@components/icons'

export type ApproachType = {
  number: string
  title: string
  description: string
}

export type PortfolioSingle2Types = {
  id: string
  name: string
  position: string
  testimonial: string
  details: string
}

export type ContentBindedtype = {
  id: string
  name: string
  position: string
}

export type ServiceV2Type = {
  id: number
  title: string
  icon: any
  content: string
  sanitizedIcon?: SafeHtml
}[][]
export const approach: ApproachType[] = [
  {
    number: '01',
    title: 'Individual approach',
    description:
      'Hac erat leo proin odio est sed sit in felis facilisi integer sed congue neque turpis dictumst.',
  },
  {
    number: '02',
    title: 'Integrated analytics',
    description:
      'Find aute irure dolor in enderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur neque.',
  },
  {
    number: '03',
    title: 'Step by step work',
    description:
      'More erat leo proin odio est sed sit felis facilisi integer sed sit congue neque turpis dictumst.',
  },
  {
    number: '04',
    title: 'Full range of services',
    description:
      'Adipiscing posuere dui, amet, augue nisl dictum justo, enim sed neque congue non quam.',
  },
]

export const serviceV2: ServiceV2Type = [
  [
    {
      id: 1,
      title: 'Development',
      icon: emailMarketing,
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget molestie massa. Donec egestas nulla pariatur.',
    },
    {
      id: 2,
      title: 'Business copywriting',
      icon: businessCopywriting,
      content:
        'Find aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur neque congue aliqua dolor.',
    },
  ],
  [
    {
      id: 3,
      title: 'Design and branding',
      icon: strategDevelopment,
      content:
        'More erat leo proin odio est sed sit felis facilisi integer sed congue neque turpis dictumst sit sed volutpat aliquet tortor non aute irure dolor in reprehenderit in posuere dui amet augue nisl dictum.',
    },
    {
      id: 4,
      title: 'Consulting',
      icon: communication,
      content:
        'Ut eu amet ac blandit nisl malesuada lectus viverra arcu in rhoncus egestas lorem consequat sollicitudin risus, in pellentesque tellus tincidunt purus viverra dignissim.',
    },
  ],
]

export const portfolioSingle2: PortfolioSingle2Types[] = [
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
