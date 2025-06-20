import { SafeHtml } from '@angular/platform-browser'
import {
  advertisingCommunication,
  businessCopywrite,
  emailBusinessMarketing,
  marketingBusiness,
  webInternet,
  workingCommunication,
} from '@components/icons'

export type GridServiceType = {
  description: string
  title: string
  icon: any
  sanitizedIcon?: SafeHtml
}
export type CountType = {
  count: string
  title: string
}

export type IndustriesType = {
  title: string
  imageSrc: string
  listItems: string[]
}

export type ClientType = {
  image: {
    light: string
    dark: string
  }
}

export type CaseStudiesType = {
  title: string
  text: string
  buttonText: string
  buttonLink: string
  imageSrc: string
  imageWidth: number
}

export type BusinessConsultingType = {
  name: string
  role: String
  description: string
}

export type BusinessTestimonialType = {
  image: string
  title: string
  subtitle: string
  text: string
}[][]

export const gridService: GridServiceType[] = [
  {
    title: 'Advertising communications',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint velit officia consequat duis enim velit mollit.',
    icon: advertisingCommunication,
  },
  {
    title: 'Marketing and branding',
    description:
      'Find aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur neque congue.',
    icon: marketingBusiness,
  },
  {
    title: 'Web and Internet marketing',
    description:
      'Hac erat leo proin odio est sed sit felis facilisi integer sed congue neque turpis dictumst sit sed volutpat aliquet tortor non.',
    icon: webInternet,
  },
  {
    title: 'Email marketing',
    description:
      'Adipiscing posuere dui, amet, augue nisl dictum justo, enim. Sed neque congue non quam ultrices interdum vitae vestibulum.',
    icon: emailBusinessMarketing,
  },
  {
    title: 'Working on communication',
    description:
      'Molestie enim tempus egestas a at enim. Velit hendrerit nibh eget porta pretium. Ipsum orci habitasse eget malesuada platea.',
    icon: workingCommunication,
  },
  {
    title: 'Business copywriting',
    description:
      ' Massa donec quam orci feugiat. Quis iaculis facilisi ornare aenean lorem enim purus in lacus in ullamcorper diam consequat.',
    icon: businessCopywrite,
  },
]

export const counterData: CountType[] = [
  {
    count: '540+',
    title: 'Happy clients',
  },

  {
    count: '1070',
    title: 'Projects completed',
  },

  {
    count: '30+',
    title: 'Full time specialists',
  },

  {
    count: '15',
    title: 'Awards won',
  },
]

export const industriesDta: IndustriesType[] = [
  {
    title: 'Services',
    imageSrc: 'assets/img/landing/business-consulting/industries/01.jpg',
    listItems: [
      'Id habitasse dui habitant',
      'Rutrum tempor sit tincidunt',
      'Imperdiet est quis enim facilisis',
    ],
  },
  {
    title: 'Retail',
    imageSrc: 'assets/img/landing/business-consulting/industries/02.jpg',
    listItems: [
      'Ultrices volutpat sit mattis',
      'Egestas neque arcu duis',
      'Metus magna viverra blandit',
    ],
  },
  {
    title: 'Technology',
    imageSrc: 'assets/img/landing/business-consulting/industries/03.jpg',
    listItems: [
      'Diam diam nunc monte',
      'Nulla egestas arcu proin sit',
      'Nunc sapien turpis vulputate',
    ],
  },
]

export const clients: ClientType[] = [
  {
    image: {
      light: 'assets/img/landing/business-consulting/clients/01-light.svg',
      dark: 'assets/img/landing/business-consulting/clients/01-dark.svg',
    },
  },
  {
    image: {
      light: 'assets/img/landing/business-consulting/clients/02-light.svg',
      dark: 'assets/img/landing/business-consulting/clients/02-dark.svg',
    },
  },
  {
    image: {
      light: 'assets/img/landing/business-consulting/clients/03-light.svg',
      dark: 'assets/img/landing/business-consulting/clients/03-dark.svg',
    },
  },
  {
    image: {
      light: 'assets/img/landing/business-consulting/clients/04-light.svg',
      dark: 'assets/img/landing/business-consulting/clients/04-dark.svg',
    },
  },
  {
    image: {
      light: 'assets/img/landing/business-consulting/clients/05-light.svg',
      dark: 'assets/img/landing/business-consulting/clients/05-dark.svg',
    },
  },
  {
    image: {
      light: 'assets/img/landing/business-consulting/clients/06-light.svg',
      dark: 'assets/img/landing/business-consulting/clients/06-dark.svg',
    },
  },
  {
    // Duplicate of slide 2
    image: {
      light: 'assets/img/landing/business-consulting/clients/03-light.svg',
      dark: 'assets/img/landing/business-consulting/clients/03-dark.svg',
    },
  },
  {
    // Duplicate of slide 4
    image: {
      light: 'assets/img/landing/business-consulting/clients/05-light.svg',
      dark: 'assets/img/landing/business-consulting/clients/05-dark.svg',
    },
  },
  {
    // Duplicate of slide 1
    image: {
      light: 'assets/img/landing/business-consulting/clients/02-light.svg',
      dark: 'assets/img/landing/business-consulting/clients/02-dark.svg',
    },
  },
]

export const businessTestimonial: BusinessTestimonialType = [
  [
    {
      image: 'assets/img/avatar/22.jpg',
      title: 'Jane Cooper',
      subtitle: 'Medical Assistant',
      text: 'Sit risus metus, vel neque eu lectus duis. Vulputate facilisi at feugiat mi aenean nunc enim faucibus arcu. Diam id accumsan sit.',
    },
    {
      image: 'assets/img/avatar/25.jpg',
      title: 'Cameron Williamson',
      subtitle: 'Marketing Coordinator',
      text: 'Nam convallis maecenas leo sapien interdum id. Facilisi dictum lacinia in phasellus. Nullam id sed tempor, volutpat blandit urna sagittis, commodo vestibulum. Adipiscing dictumst nunc enim massa lacus lobortis.',
    },
  ],
  [
    {
      image: 'assets/img/avatar/23.jpg',
      title: 'Wade Warren',
      subtitle: 'President of Sales',
      text: 'Vitae tempor morbi tellus pulvinar. Ut iaculis sit tristique in turpis volutpat quam nec. Pretium eu nulla egestas ultrices. Donec in pulvinar ut fermentum a, nunc, aliquam. Integer dui dui ornare sed lacinia.',
    },
    {
      image: 'assets/img/avatar/26.jpg',
      title: 'Leslie Alexander',
      subtitle: 'CEO, Divi',
      text: 'Malesuada at ullamcorper adipiscing lobortis vestibulum. Aliquet lobortis justo arcu ut auctor porttitor amet, tortor. Justo.',
    },
  ],
  [
    {
      image: 'assets/img/avatar/24.jpg',
      title: 'Esther Howard',
      subtitle: 'CEO, Slack',
      text: 'Ante turpis leo dictum adipiscing nisl magnis elementum eu. Integer consequat sed ipsum massa egestas integer proin id.',
    },
    {
      image: 'assets/img/avatar/27.jpg',
      title: 'Brooklyn Simmons',
      subtitle: 'Marketing Coordinator',
      text: 'In quisque dolor, aliquam faucibus. Gravida diam ornare egestas proin quis odio suspendisse pellentesque. Condimentum risus, rutrum curabitur faucibus mi a turpis morbi. Nulla euismod dolor quis amet sed.',
    },
  ],

  [
    {
      image: 'assets/img/avatar/28.jpg',
      title: 'Fannie Summers',
      subtitle: 'VP of Sales',
      text: 'In et dui amet amet elementum urna, dictum. Eget leo ornare bibendum a fermentum. Rutrum pellentesque ipsum cras purus ac a ullamcorper. Elit ac amet quam tellus euismod ac aliquam pharetra lectus.',
    },
    {
      image: 'assets/img/avatar/29.jpg',
      title: 'Robert Fox',
      subtitle: 'Marketing Coordinator',
      text: 'At felis non consequat neque in ultrices tortor purus dui. At sed fermentum, egestas amet et donec euismod risus. Nulla mauris.',
    },
  ],
]

export const caseStudies: CaseStudiesType[] = [
  {
    title: 'Robotics & artificial intelligence',
    text: 'Cursus volutpat pharetra vel in. Felis ut nulla dui nec, vulputate viverra sit eget vel. Convallis diam nunc, vitae, orci, nibh quam tristique pulvinar. In semper etiam aliquam molestie arcu. Nullam id sed tempor, volutpat blandit urna sagittis, commodo vestibulum. Adipiscing dictumst nunc enim massa.',
    buttonText: 'Read case study',
    buttonLink: '#',
    imageSrc: 'assets/img/landing/business-consulting/case-studies/01.png',
    imageWidth: 347,
  },
  {
    title: 'Toothbrush from natural eco materials',
    text: 'Cursus volutpat pharetra vel in. Felis ut nulla dui nec, vulputate viverra sit eget vel. Convallis diam nunc, vitae, orci, nibh quam tristique pulvinar. In semper etiam aliquam molestie arcu. Nullam id sed tempor, volutpat blandit urna sagittis, commodo vestibulum. Adipiscing dictumst nunc enim massa.',
    buttonText: 'Read case study',
    buttonLink: '#',
    imageSrc: 'assets/img/landing/business-consulting/case-studies/02.png',
    imageWidth: 291,
  },
]
