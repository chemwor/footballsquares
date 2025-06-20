export type GuidesType = {
  programs: string
  exercises: string
  price: number
  title: string
  details: string[]
  image: string
}

export type InfluenceResultType = {
  icon_class: string
  title: string
  description: string
  aos: {
    fade_up: boolean
    delay?: number
    offset?: number
    disable_parallax_down: string
  }
}

export type InfluenceInstagramType = {
  likes: number
  comments: number
  image_src: string
}

export type InfluenceTestimonialType = {
  image_id: string
  quote: string
  author: string
}

export type FeatureInfluenceType = {
  title: string
  icon: string
}
export const influenceGuides: GuidesType[] = [
  {
    programs: '6 programs',
    exercises: '> 230 exercises',
    image: 'assets/img/landing/influencer/guides/01.jpg',
    price: 125.0,
    title: 'Effective weight loss',
    details: [
      'Ut nunc ultricies nibh blandit odio in.',
      'Nibh viverra volutpat viverra.',
      'Ac lacus ut viverra iaculis neque scelerisque.',
    ],
  },
  {
    programs: '12 programs',
    exercises: '> 400 exercises',
    image: 'assets/img/landing/influencer/guides/02.jpg',
    price: 154.99,
    title: 'Beginner to expert guide',
    details: [
      'Nutrition guides for the best overall results.',
      'Stretching routines.',
      'Direct coaching and 24/7 access to community.',
    ],
  },
  {
    programs: '8 programs',
    exercises: '> 420 exercises',
    image: 'assets/img/landing/influencer/guides/03.jpg',
    price: 121.0,
    title: 'Yoga for pregnancy',
    details: [
      'Adipiscing vulputate ever in potenti velit.',
      'Non metus orci convallis posuere.',
      'Dolor commodo dignissim pharetra tempor.',
    ],
  },
]

export const influenceResult: InfluenceResultType[] = [
  {
    icon_class: 'ai-target',
    title: 'Reach your goals',
    description:
      'Eu pharetra sagittis ornarenam elit scelerisque pellentesque mauris diam outertn.',
    aos: {
      fade_up: true,
      offset: 280,
      disable_parallax_down: 'md',
    },
  },
  {
    icon_class: 'ai-fruit',
    title: 'Healthy eating habits',
    description:
      'Ultricies at vitae nunc,facilisi sagittis nullam mattis nunc metus suspendisse.',
    aos: {
      fade_up: true,
      delay: 250,
      offset: 280,
      disable_parallax_down: 'md',
    },
  },
  {
    icon_class: 'ai-body',
    title: 'Nice & healthy body',
    description:
      'Nunc congue dolor sodales faucibus nun faucibus tristique tempor in diam.',
    aos: {
      fade_up: true,
      delay: 500,
      disable_parallax_down: 'md',
    },
  },
  {
    icon_class: 'ai-heart-alt',
    title: 'Feel great',
    description:
      'Lacus neque sed fringilla proin bibendum interdum vivamus verum dignissim.',
    aos: {
      fade_up: true,
      delay: 700,
      disable_parallax_down: 'md',
    },
  },
]

export const influenceInstagram: InfluenceInstagramType[] = [
  {
    likes: 2048,
    comments: 320,
    image_src: 'assets/img/landing/influencer/instagram/01.jpg',
  },
  {
    likes: 1764,
    comments: 283,
    image_src: 'assets/img/landing/influencer/instagram/02.jpg',
  },
  {
    likes: 4560,
    comments: 417,
    image_src: 'assets/img/landing/influencer/instagram/03.jpg',
  },
  {
    likes: 1505,
    comments: 274,
    image_src: 'assets/img/landing/influencer/instagram/04.jpg',
  },
  {
    likes: 3708,
    comments: 198,
    image_src: 'assets/img/landing/influencer/instagram/05.jpg',
  },
  {
    likes: 2925,
    comments: 409,
    image_src: 'assets/img/landing/influencer/instagram/06.jpg',
  },
  {
    likes: 1348,
    comments: 120,
    image_src: 'assets/img/landing/influencer/instagram/07.jpg',
  },
  {
    likes: 963,
    comments: 98,
    image_src: 'assets/img/landing/influencer/instagram/08.jpg',
  },
]

export const influenceTestimonial: InfluenceTestimonialType[] = [
  {
    image_id: '#image1',
    quote:
      'Odio risus amet amet tincidunt. Turpis nibh ultricies morbi porta ipsum adipiscing. Morbi magnis nunc in facilisis gravida adipiscing in elementum aliquet nunc.',
    author: 'Wade Warren',
  },
  {
    image_id: '#image2',
    quote:
      'Blandit facilisi eget feugiat ultricies. Id habitant lectus imperdiet amet elementum lectus lacus sit laoreet. Quis nullam. Gravida pretium iaculis lorem sit in elementum.',
    author: 'Annete Smith',
  },
]

export const featuresInfluenceData: FeatureInfluenceType[] = [
  { title: 'Nutrition guides for the best overall results.', icon: 'ai-fruit' },
  {
    title: 'Individually designed programs and workout plans.',
    icon: 'ai-drop',
  },
  { title: 'Stretching routines.', icon: 'ai-stones' },
  { title: 'Workouts designed for optimal results.', icon: 'ai-weight' },
  {
    title: 'Bonus features like weight history, gratitude journal, ect.',
    icon: 'ai-heart-alt',
  },
  {
    title: 'Direct coaching and 24/7 access to support community.',
    icon: 'ai-chat',
  },
]
