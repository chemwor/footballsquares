import { SafeHtml } from '@angular/platform-browser'
import {
  contactFlexible,
  contactFullSpectrum,
  contactImpossible,
  contactTimeZone,
} from '@components/icons'

export type PortfolioList2Type = {
  image: string
  bgColor: string
  brandDark?: string
  brand?: string
  brandLight?: string
  title: string
  description: string
  awards?: string[]
  awardDark?: string[]
}

export type AwardsType = {
  VueJs?: string
  Deloitte?: string
  Clutch?: string
}

export type ContactListType = {
  title: string
  description: string
  icon: any
  sanitizedIcon?: SafeHtml
}[][]

export const portfolioList2: PortfolioList2Type[] = [
  {
    image: 'assets/img/portfolio/list/06.png',
    bgColor: 'bg-info',
    brandDark: 'assets/img/portfolio/brands/champion-blue-dark.svg',
    brandLight: 'assets/img/portfolio/brands/champion-blue-light.svg',
    title: 'Development of an application for a national bank',
    description:
      '<p class="fs-sm pb-3 pb-lg-4 mb-3">Morbi et massa fames ac scelerisque sit commodo dignissim faucibus vel quisque proin lectus. Morbi et massa fames ac scelerisque sit commodo dignissim.</p>',
    awards: [
      'assets/img/portfolio/brands/vuejs-dark.svg',
      'assets/img/portfolio/brands/deloitte-dark.svg',
    ],
    awardDark: [
      'assets/img/portfolio/brands/vuejs-light.svg',
      'assets/img/portfolio/brands/deloitte-light.svg',
    ],
  },
  {
    image: 'assets/img/portfolio/list/07.png',
    bgColor: 'bg-primary',
    brand: 'assets/img/portfolio/brands/foster-green.svg',
    title: 'Design and development of a dashboard for data management',
    description:
      '<p class="fs-sm pb-3 pb-lg-4 mb-3">Feugiat elit tempor, malesuada rutrum amet quis duis facilisi viverra. Quam ut in gravida dignissim eget mauris pretium facilisi dui varius amet et quam massa auctor.</p>',
  },
  {
    image: 'assets/img/portfolio/list/08.png',
    bgColor: 'bg-danger',
    brand: 'assets/img/portfolio/brands/boost.svg',
    title: 'Landing page for a marketing agency Boost',
    description: `<ul class="list-unstyled pb-1 pb-lg-2 mb-3"><li class="d-flex pb-1 mb-2"><i class="ai-check-alt text-primary fs-4 mt-n1 me-2"></i>
    Faucibus sit est dui id gravida
  </li>
  <li class="d-flex pb-1 mb-2">
    <i class="ai-check-alt text-primary fs-4 mt-n1 me-2"></i>
    Lectus in sem eu facilisis ornare
  </li>
  <li class="d-flex pb-1 mb-2">
    <i class="ai-check-alt text-primary fs-4 mt-n1 me-2"></i>
    Massa maecenas cras vivamus
  </li>
</ul>`,
  },
  {
    image: 'assets/img/portfolio/list/09.png',
    bgColor: 'bg-custom',
    brandDark: 'assets/img/portfolio/brands/champion-purple-dark.svg',
    brandLight: 'assets/img/portfolio/brands/champion-purple-light.svg',
    title: 'Development of an application for a task tracker',
    description:
      '<p class="fs-sm pb-3 pb-lg-4 mb-3">Egestas ultrices condimentum consectetur massa aliquam volutpat pulvinar aliquet nisi quam. Nibh commodo tristique nisi, justo, sed maecenas lectus ut nec.</p>',
    awards: [
      'assets/img/portfolio/brands/deloitte-dark.svg',
      'assets/img/portfolio/brands/clutch-dark.svg',
    ],
    awardDark: [
      'assets/img/portfolio/brands/deloitte-light.svg',
      'assets/img/portfolio/brands/clutch-light.svg',
    ],
  },
  {
    image: 'assets/img/portfolio/list/10.png',
    bgColor: 'bg-warning',
    brand: 'assets/img/portfolio/brands/foster-yellow.svg',
    title: 'Landing page for company for audience analysis',
    description: `<ul class="list-unstyled pb-1 pb-lg-2 mb-3"><li class="d-flex pb-1 mb-2"><i class="ai-check-alt text-primary fs-4 mt-n1 me-2"></i>
        Faucibus sit est dui id gravida
      </li>
      <li class="d-flex pb-1 mb-2">
        <i class="ai-check-alt text-primary fs-4 mt-n1 me-2"></i>
        Lectus in sem eu facilisis ornare
      </li>
      <li class="d-flex pb-1 mb-2">
        <i class="ai-check-alt text-primary fs-4 mt-n1 me-2"></i>
        Massa maecenas cras vivamus
      </li>
    </ul>`,
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
