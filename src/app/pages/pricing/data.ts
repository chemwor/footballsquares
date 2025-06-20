export type PricingPlanType = {
  name: String
  price: number
  description: String
  buttonColor: string
  buttonText: string
}

type FeatureType = {
  name: string
  info?: string
}

type PlanType = {
  light: boolean | string
  premium: boolean | string
  medium: boolean | string
  feature: FeatureType
}

export type ComparePlanType = {
  title: string
  children: PlanType[]
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

export type FaqsType = {
  question: string
  answer: string
}
export const planData: ComparePlanType[] = [
  {
    title: '',
    children: [
      {
        feature: {
          name: 'Billed Monthly',
        },
        light: '$18',
        premium: '$72',
        medium: '$36',
      },
      {
        feature: {
          name: 'Members',
          info: 'Feature description text',
        },
        light: 'Just you',
        premium: 'Unlimited',
        medium: '3 Members',
      },
      {
        feature: {
          name: 'Guest access',
          info: 'Feature description text',
        },
        light: 'Just you',
        premium: 'Unlimited',
        medium: '3 members',
      },
      {
        feature: {
          name: 'File uploads',
          info: 'Feature description text',
        },
        light: '2 GB',
        premium: '30 GB',
        medium: '10 GB',
      },
    ],
  },
  {
    title: 'Collaboration',
    children: [
      {
        feature: {
          name: 'Real-time collaboration',
        },
        light: true,
        premium: true,
        medium: true,
      },
      {
        feature: {
          name: 'Link sharing',
          info: 'Feature description text',
        },
        light: true,
        premium: true,
        medium: true,
      },
      {
        feature: {
          name: 'Collaborative workspace',
          info: 'Feature description text',
        },
        light: false,
        premium: true,
        medium: true,
      },
      {
        feature: {
          name: 'Filter views',
          info: 'Feature description text',
        },
        light: '3',
        premium: 'Unlimited',
        medium: '12',
      },
      {
        feature: {
          name: 'Teams',
          info: 'Feature description text',
        },
        light: false,
        premium: true,
        medium: true,
      },
    ],
  },
  {
    title: 'Features',
    children: [
      {
        feature: {
          name: 'Web, desktop, & mobile apps',
        },
        light: false,
        premium: true,
        medium: true,
      },
      {
        feature: {
          name: 'Reminders',
          info: 'Feature description text',
        },
        light: true,
        premium: true,
        medium: true,
      },
      {
        feature: {
          name: 'Priorities',
          info: 'Feature description text',
        },
        light: false,
        premium: true,
        medium: true,
      },
      {
        feature: {
          name: 'Comments',
          info: 'Feature description text',
        },
        light: true,
        premium: true,
        medium: true,
      },
      {
        feature: {
          name: 'Integrations',
        },
        light: '5',
        premium: 'Unlimited',
        medium: '15',
      },
    ],
  },
  {
    title: 'Admin &; security',
    children: [
      {
        feature: {
          name: 'Admin &; member roles',
        },
        light: false,
        premium: true,
        medium: false,
      },
      {
        feature: {
          name: 'Team billing',
        },
        light: false,
        premium: true,
        medium: false,
      },
      {
        feature: {
          name: 'Priority support',
          info: 'Feature description text',
        },
        light: false,
        premium: true,
        medium: false,
      },
    ],
  },
]

export const pricingPlan: PricingPlanType[] = [
  {
    name: 'Light',
    price: 8,
    description:
      'Phasellus in hendrerit interdum lorem proin pretium dictum urna',
    buttonColor: 'primary',
    buttonText: 'Get this plan now',
  },
  {
    name: 'Premium',
    price: 72,
    description:
      'Morbi et massa fames ac scelerisque sit commodo dignissim aucibus',
    buttonColor: 'light',
    buttonText: 'Get this plan now',
  },
  {
    name: 'Medium',
    price: 36,
    description:
      'Enim aenean phasellus in hendrerit interdum lorem proin pretium',
    buttonColor: 'primary',
    buttonText: 'Get this plan now',
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

export const faqsData: FaqsType[] = [
  {
    question: 'Is there a free trial?',
    answer:
      'Adipiscing sagittis neque egestas id platea accumsan. Morbi inpa platea urna curabitur habitant pulvinar lacinia neque. Netus gravida amet, aliquam quam turpis aliquet cras. Find aute irure dolor in reprehenderit voluptate velit esse cillum dolore eu nulla pariatur. Sit amet, adipiscing elit.',
  },
  {
    question: 'How do refunds work?',
    answer:
      'Quisque rutrum sit amet magna sit amet tristique. Vivamus rhoncus ac purus vitae convallis. Aliquam erat volutpat. Proin egestas, mauris ut semper semper, ipsum felis mattis ligula, et porttitor ante arcu nec ante. Aliquam congue est eu turpis sollicitudin, et ullamcorper tortor aliquam.',
  },
  {
    question: 'Do you offer student discounts?',
    answer:
      'Proin ac quam eget velit luctus tincidunt vel in nunc. Maecenas cursus erat lacus, id interdum elit accumsan in. Mauris placerat dapibus sem, condimentum interdum nulla varius ac. Mauris quam mauris, rhoncus et tortor vel, tempus dignissim libero. Curabitur sed odio in odio elementum cursus.',
  },
  {
    question: 'What happens if I run out of credit?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac pretium dui. Aliquam rutrum justo lorem, in efficitur odio efficitur vel. Integer mattis, neque malesuada sagittis porttitor, enim tortor ullamcorper diam, id eleifend sem mauris at turpis. Curabitur sed nisi nec ligula dictum.',
  },
  {
    question: 'Do you have monthly and yearly billing options?',
    answer:
      'Vestibulum faucibus lectus eget augue pharetra, quis semper lectus gravida. Vestibulum pretium in elit sed iaculis. Curabitur elementum turpis at ipsum molestie, id maximus odio tincidunt. Praesent id lacinia orci. Phasellus at varius arcu. Ut nec lobortis velit.',
  },
  {
    question: 'What happens when I change plans?',
    answer:
      'Nunc non placerat mi, sit amet hendrerit lacus. Quisque cursus lorem vitae placerat ultrices. Morbi ut orci sit amet quam vulputate lobortis. Donec vulputate mi nec nisi tincidunt commodo. Nullam efficitur tincidunt tellus accumsan pellentesque. Suspendisse elementum blandit orci.',
  },
  {
    question: 'How do I cancel my paid plan?',
    answer:
      'Morbi a consequat diam. Fusce sit amet faucibus erat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque id est dictum, suscipit neque id, ornare nibh. Cras lacinia, est non ultrices porttitor, arcu orci rhoncus leo, egestas condimentum lorem.',
  },
]
