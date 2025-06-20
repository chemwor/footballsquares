export type Single2DescriptionTypes = {
  content: string
  title: string
  id?: boolean
}

export type Single2CounterType = {
  number: string
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
export type NextProjectType = {
  name: string
  imageSrc: string
  category: string
  width: string
}

export const singleDescriptions: Single2DescriptionTypes[] = [
  {
    title: 'About the client',
    content:
      'Sit congue tellus urna phasellus sagittis interdum sed laoreet eget curabitur. Vel magna sit aliquet viverra morbi massa mattis urna, feugiat egestas tincidunt ipsum diam quam massa amet odio nisi duis dolor. Morbi et massa fames ac scelerisque sit commodo dignissim faucibus quisque proin lectus laoreet sem adipiscing sollicitudin erat massa tellus lorem enim aenean phasellus in hendrerit interdum lorem proin pretium dictum urna suspendisse quis risus et.',
    id: true,
  },
  {
    title: 'The challenge',
    content:
      'Sit diam nunc, et pellentesque ornare elit, ut. Interdum feugiat id ut egestas tellus congue faucibus habitant semper nunc et etiam ultrices id nisi urna amet, odio mauris risus nam aliquam pharetra amet nunc, enim aliquet egestas purus penatibus ac, elit ultricies proin adipiscing suspendisse sit proin.',
  },
  {
    title: 'The solution',
    content:
      'Est enim mollis morbi vulputate egestas commodo vitae quis sed sit ultrices nulla habitant sit faucibus orci. Eu etiam ipsum porttitor morbi urna eget aliquet aenean tristique amet tempus, vestibulum vel montes, pellentesque sit. Cursus nulla viverra elit accumsan, vitae. Phasellus sed hac at pharetra urna. Imperdiet egestas ac eget porttitor ultrices morbi ornare. Libero, lectus eget adipiscing odio ornare non maecenas non vitae libero, at feugiat urna, risus augue fringilla. Venenatis quam.',
  },
]

export const single2counter: Single2CounterType[] = [
  {
    number: '30+',
    description: 'Different templates',
  },
  {
    number: '150',
    description: 'Happy clients all over the world',
  },
]

export const singlev2Result: Single2CounterType[] = [
  {
    number: '30+',
    description: 'Different templates',
  },
  {
    number: '160%',
    description: 'Revenue increase',
  },
  {
    number: '150',
    description: 'Happy clients all over the world',
  },
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

export const nextProject: NextProjectType[] = [
  {
    name: 'Doe design',
    imageSrc: 'assets/img/portfolio/grid/11.jpg',
    category: 'Branding, Stationery',
    width: '550px',
  },
  {
    name: 'D.G.Vent',
    imageSrc: 'assets/img/portfolio/grid/10.jpg',
    category: 'Stationery design',
    width: '605px',
  },
]
