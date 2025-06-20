export type servicev3Type = {
  iconSrc: string
  headingText: string
}

type Feature = {
  lightSrc: string
  darkSrc: string
  headingText: string
  descriptionText: string
}

export type AllServiceType = {
  imgSrc: string
  headingText: string
  contentText: string
  features: Feature[]
}

export type PartnerType = {
  name: string
  darkSrc?: string
  lightSrc?: string
  src?: string
}

export type FrontType = {
  image: string
  description: string
}

export type WebstudioSkillType = {
  type: string
  front?: FrontType
  back?: null
  content?: string
  image?: string
  altImage?: string
}

export const servicesv3: servicev3Type[] = [
  {
    iconSrc: 'assets/img/services/v3/icons/time-white.svg',
    headingText: 'Individual approach',
  },
  {
    iconSrc: 'assets/img/services/v3/icons/cog-white.svg',
    headingText: 'Integrated analytics',
  },
  {
    iconSrc: 'assets/img/services/v3/icons/monitor-white.svg',
    headingText: 'Step by step work',
  },
  {
    iconSrc: 'assets/img/services/v3/icons/size-white.svg',
    headingText: 'Full range of services',
  },
]

export const allServiceIncluded: AllServiceType[] = [
  {
    imgSrc: 'assets/img/services/v3/01.jpg',
    headingText: 'Web & App development',
    contentText:
      'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean auctor cursus tortor non fermentum. Fusce ornare pulvinar nibh, sed facilisis eros congue pretium. Suspendisse et fermentum massa.',
    features: [
      {
        lightSrc: 'assets/img/services/v3/icons/monitor-dark.svg',
        darkSrc: 'assets/img/services/v3/icons/monitor-light.svg',
        headingText: 'Custom websites',
        descriptionText:
          'Eu dignissim arcu, iaculis orci hendrerit commodo leo eget',
      },
      {
        lightSrc: 'assets/img/services/v3/icons/cloud-dark.svg',
        darkSrc: 'assets/img/services/v3/icons/cloud-light.svg',
        headingText: 'Cloud computing',
        descriptionText:
          'Adipiscing in aliquam iaculis pellentesque facilisi commo',
      },
    ],
  },
  {
    imgSrc: 'assets/img/services/v3/02.jpg',
    headingText: 'Mobile app design',
    contentText:
      'More erat leo proin odio est sed sit felis facilisi integer sed congue neque turpis dictumst sit sed volutpat aliquet tortor. Adipiscing posuere dui, amet, augue nisl dictum justo, enim sed neque congue non quam ultrices interdum vitae.',
    features: [
      {
        lightSrc: 'assets/img/services/v3/icons/cog-dark.svg',
        darkSrc: 'assets/img/services/v3/icons/cog-light.svg',
        headingText: 'For iOS & Android',
        descriptionText:
          'Eu dignissim arcu, iaculis orci hendrerit commodo leo eget',
      },
      {
        lightSrc: 'assets/img/services/v3/icons/time-dark.svg',
        darkSrc: 'assets/img/services/v3/icons/time-light.svg',
        headingText: 'Speed optimization',
        descriptionText:
          'Adipiscing in aliquam iaculis pellentesque facilisi commo',
      },
    ],
  },
  {
    imgSrc: 'assets/img/services/v3/03.jpg',
    headingText: 'UI & UX design',
    contentText:
      'Find aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur neque congue aliqua dolor do amet sint velit officia amet minim mollit non deserunt ullamco est sit aliqua dolor malesuada fames ac ante ipsum.',
    features: [
      {
        lightSrc: 'assets/img/services/v3/icons/monitor-dark.svg',
        darkSrc: 'assets/img/services/v3/icons/monitor-light.svg',
        headingText: 'All business niches',
        descriptionText:
          'Eu dignissim arcu, iaculis orci hendrerit commodo leo eget',
      },
      {
        lightSrc: 'assets/img/services/v3/icons/size-dark.svg',
        darkSrc: 'assets/img/services/v3/icons/size-light.svg',
        headingText: 'Customer focus',
        descriptionText:
          'Adipiscing in aliquam iaculis pellentesque facilisi commo',
      },
    ],
  },
]

export const partner: PartnerType[] = [
  {
    name: 'Auchan',
    src: 'assets/img/brands/auchan.svg',
  },
  {
    name: 'Suzuki',
    src: 'assets/img/brands/suzuki.svg',
  },
  {
    name: 'Champion',
    darkSrc: 'assets/img/brands/champion-dark.svg',
    lightSrc: 'assets/img/brands/champion-light.svg',
  },
  {
    name: 'Starcraft',
    darkSrc: 'assets/img/brands/starcraft-dark.svg',
    lightSrc: 'assets/img/brands/starcraft-light.svg',
  },
  {
    name: 'Klinos',
    src: 'assets/img/brands/klinos.svg',
  },
  {
    name: 'Puma',
    darkSrc: 'assets/img/brands/puma-dark.svg',
    lightSrc: 'assets/img/brands/puma-light.svg',
  },
  {
    name: 'Airbnb',
    src: 'assets/img/brands/airbnb.svg',
  },
  {
    name: 'Philips',
    src: 'assets/img/brands/philips.svg',
  },
]

export const webStudioSkills: WebstudioSkillType[] = [
  {
    type: 'card-flip',
    front: {
      image: 'assets/img/landing/web-studio/skills/figma.svg',
      description:
        'Figma is convenient online service for interface development and prototyping with the ability to work together in real time.',
    },
    back: null,
  },
  {
    type: 'card',
    content:
      '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum posuere finibus dui, eget scelerisque ipsum suscipit nec. Praesent nec quam in ipsum ultricies ultricies et sagittis dui. Sed condimentum felis at pretium."',
    image: 'assets/img/brands/foster.svg',
  },
  {
    type: 'card-flip',
    front: {
      image: 'assets/img/landing/web-studio/skills/css3.svg',
      description:
        'Cascading Style Sheets Level 3 is the iteration of the CSS standard used in the styling and formatting of Web pages.',
    },
    back: null,
  },
  {
    type: 'card',
    content:
      '"Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris tincidunt imperdiet hendrerit. Fusce tortor turpis, facilisis ac efficitur eget, aliquet ut odio. Curabitur in vestibulum tellus."',
    image: 'assets/img/brands/champion-dark.svg',
    altImage: 'assets/img/brands/champion-light.svg',
  },
  {
    type: 'card-flip',
    front: {
      image: 'assets/img/landing/web-studio/skills/bootstrap.svg',
      description:
        'Powerful, extensible, and feature-packed frontend toolkit. Build and customize with Sass, utilize prebuilt grid system and components.',
    },
    back: null,
  },
  {
    type: 'card',
    content:
      '"Nulla facilisi. Curabitur dictum sodales aliquam. Etiam tortor augue, ultrices in efficitur sit amet, luctus dapibus magna. Vivamus eu lacus elementum, ultrices massa vitae, elementum lorem. Proin feugiat egestas dolor."',
    image: 'assets/img/brands/alpine.svg',
  },
  {
    type: 'card-flip',
    front: {
      image: 'assets/img/landing/web-studio/skills/python.svg',
      description:
        'Python is a programming language that lets you work quickly and integrate systems more effectively.',
    },
    back: null,
  },
  {
    type: 'card',
    content:
      '"Suspendisse potenti. Nulla vel varius urna. Donec at libero ipsum. Nullam scelerisque tempus malesuada. Donec vehicula odio est, at faucibus purus sollicitudin ut. Fusce mollis ultrices ex sed pellentesque velit euismod."',
    image: 'assets/img/brands/deloitte-dark.svg',
    altImage: 'assets/img/brands/deloitte-light.svg',
  },
]
