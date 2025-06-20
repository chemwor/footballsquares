export type TestimonialType = {
  quote: string
  author: {
    name: string
    role: string
    avatar: string
  }
}

export type ResoursesType = {
  title: string
  image: string
  description: string
  shares: number
  comments: number
  timestamp: string
  category: string
}

export const testimonials: TestimonialType[] = [
  {
    quote:
      'Around provides us with the detailed and accurate data we need to make strategic decisions. All tools are constantly being improved and contain a lot of useful and interesting information. Thanks to Around, we can constantly analyze data quickly, efficiently.',
    author: {
      name: 'Jenny Wilson',
      role: 'Head of Marketing',
      avatar: 'assets/img/avatar/30.jpg',
    },
  },
  {
    quote:
      'Turpis augue pulvinar est adipiscing netus. Arcu at aliquet venenatis elementum. Mi at gravida id nullam imperdiet a proin dolor. Egestas facilisis venenatis quisque viverra donec et. Augue convallis eu a volutpat sed ullamcorper. At dictumst sapien, tristique vitae nec massa.',
    author: {
      name: 'Esther Howard',
      role: 'CEO, Co-Founder',
      avatar: 'assets/img/avatar/31.jpg',
    },
  },
  {
    quote:
      'Cursus fames sollicitudin nunc eget sceler tortor. Sem amet, velit posuere ipsum id. Mi feugiat at vulputate vel pellentesque proin viverra. Massa, tellus orci, aenean nulla leo maecenas sed. Magna at aliquam dictum velit dolor phasellus donec et mi. Aenean adipiscing amet mauris.',
    author: {
      name: 'Nick Wenirten',
      role: 'Web Developer',
      avatar: 'assets/img/avatar/32.jpg',
    },
  },
]

export const resources: ResoursesType[] = [
  {
    title: 'Analytics for the HR department for the Klinos company',
    image: 'assets/img/landing/saas-2/resources/01.jpg',
    description:
      'Sapien ultrices egestas at faucibus eu diam velit diam id amet nibh quam rutrum fermentum diam natoque scelerisque viverra molestie fames...',
    shares: 6,
    comments: 12,
    timestamp: '12 hours ago',
    category: 'Analytics',
  },
  {
    title: 'Analytics for the Marketing department of Fast Inc.',
    image: 'assets/img/landing/saas-2/resources/02.jpg',
    description:
      'Morbi et massa fames ac scelerisque sit commodo dignissim faucibus vel quisque proin lectus. Laoreet sem adipiscing sollicitudin erat massa...',
    shares: 10,
    comments: 19,
    timestamp: '3 days ago',
    category: 'Analytics',
  },
  {
    title: 'Research data structuring and presentation in diagrams',
    image: 'assets/img/landing/saas-2/resources/03.jpg',
    description:
      'Egestas in neque scelerisque semper sit at eu cursus faucibus velit cras at aliquam sed dictum at at orci curabitur dictumst viverra non pharetra...',
    shares: 21,
    comments: 37,
    timestamp: '5 days ago',
    category: 'Analytics',
  },
]
