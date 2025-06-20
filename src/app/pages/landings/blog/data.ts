import { currentYear } from 'src/app/states/constants'

export type MostPopularBlogType = {
  href: string
  image_src: string
  date: string
  category: string
  title: string
  excerpt: string
  author_image: string
  author_name: string
}

export type LatestBlogType = {
  title: string
  href: string
  excerpt: string
  date: string
  category: string
}

export type TopAuthorBlogType = {
  name: string
  role: string
  image: string
}

export type EditorsType = {
  date: string
  category: string
  title: string
  content: string
  author: {
    name: string
    avatar: string
  }
}

export type RealavantArticalType = {
  title: string
  shares: number
  comments: number
  date: string
}

export type FeaturePostType = {
  image: string
  title: string
  content: string
  shares: number
  comments: number
  date: string
  category: string
}

export const mostPopularBlog: MostPopularBlogType[] = [
  {
    href: '/blog/post-1',
    image_src: 'assets/img/blog/grid/01.jpg',
    date: '12 hours ago',
    category: 'Books',
    title: 'Top books for inspiration',
    excerpt:
      'Vulputate auctor lacus imperdiet facilisi tristique nisl pulvinar porta diam duis...',
    author_image: 'assets/img/avatar/06.jpg',
    author_name: 'Jenny Wilson',
  },
  {
    href: '/blog/post-2',
    image_src: 'assets/img/blog/grid/02.jpg',
    date: '2 days ago',
    category: 'Travel',
    title: 'Ways to travel in ' + currentYear,
    excerpt:
      'Duis consectetur quis enim iaculis eu sagittis posuere imperdiet scelerisque...',
    author_image: 'assets/img/avatar/05.jpg',
    author_name: 'Darlene Robertson',
  },
  {
    href: '/blog/post-3',
    image_src: 'assets/img/blog/grid/03.jpg',
    date: '1 week ago',
    category: 'Inspiration',
    title: 'Inspiration in quarantine',
    excerpt:
      'Nec in est vel ac et odio interdum risus maecenas pulvinar potenti gravida sed...',
    author_image: 'assets/img/avatar/12.jpg',
    author_name: 'Guy Hawkins',
  },
  {
    href: '/blog/post-1',
    image_src: 'assets/img/blog/grid/04.jpg',
    date: 'July 15, ' + currentYear,
    category: 'TV Shows',
    title: 'New series from Netflix',
    excerpt:
      'Nec gravida senectus donec vivamus quam urna facilisis viverra eget in suspendisse...',
    author_image: 'assets/img/avatar/11.jpg',
    author_name: 'Lillia Black',
  },
  {
    href: '/blog/post-2',
    image_src: 'assets/img/blog/grid/05.jpg',
    date: 'May 28, ' + currentYear,
    category: 'Inspiration',
    title: 'How to look for inspiration?',
    excerpt:
      'Risus arcu urna nisl massa nec leo tesque ac suspendisse magna verot ipsum...',
    author_image: 'assets/img/avatar/08.jpg',
    author_name: 'David Bocous',
  },
  {
    href: '/blog/post-3',
    image_src: 'assets/img/blog/grid/06.jpg',
    date: 'April 14, ' + currentYear,
    category: 'Psychology',
    title: 'A psychologist as choice',
    excerpt:
      'Eu aenean euismod in tellus ipsum et natoque aliquam maecenas. Sed lectus...',
    author_image: 'assets/img/avatar/12.jpg',
    author_name: 'Guy Hawkins',
  },
]

export const latestBlog: LatestBlogType[] = [
  {
    title: 'The 15 best books every person should read',
    href: '/blog/post-2',
    excerpt:
      'Egestas neque sceleri semper sit at eu cursus faucibus velit cras aliquam sed dictum at at orci...',
    date: '12 hours ago',
    category: 'Books',
  },
  {
    title: 'Destinations to inspire and restore resources',
    href: '/blog/post-3',
    excerpt:
      'Purus lectus odio lacus nibh habitant ac sapien malesuada sed convallis adipiscing eget convallis...',
    date: '3 days ago',
    category: 'Travel',
  },
  {
    title: 'The fashion for eco bags with vintage prints',
    href: '/blog/post-1',
    excerpt:
      'Morbi et massa fames ac scelerisque sit commodo dignissim faucibus vel quisque proin lectus...',
    date: '12 hours ago',
    category: 'Fashion',
  },
  {
    title: 'How to look for inspiration for new goals',
    href: '/blog/post-2',
    excerpt:
      'Nec gravida senectus donec vivamus quam urna facilisis viverra eget in suspendisse dignissim...',
    date: '3 days ago',
    category: 'Psychology',
  },
]

export const topAuthorBlog: TopAuthorBlogType[] = [
  {
    name: 'Jane Cooper',
    role: 'Chief editor',
    image: 'assets/img/landing/blog/authors/01.png',
  },
  {
    name: 'Darlene Robertson',
    role: 'Marketing consultant',
    image: 'assets/img/landing/blog/authors/02.png',
  },
  {
    name: 'Guy Hawkins',
    role: 'Psychologist',
    image: 'assets/img/landing/blog/authors/03.png',
  },
  {
    name: 'Cameron Williamson',
    role: 'Fashion blogger',
    image: 'assets/img/landing/blog/authors/04.png',
  },
  {
    name: 'Albert Flores',
    role: 'Travel blogger',
    image: 'assets/img/landing/blog/authors/05.png',
  },
]

export const editorsData: EditorsType[] = [
  {
    date: '12 hours ago',
    category: 'Fashion',
    title: 'The fashion for eco bags with vintage prints',
    content:
      'Morbi et massa fames ac scelerisque sit commodo dignissim faucibus vel quisque...',
    author: {
      name: 'Lillia Black',
      avatar: 'assets/img/avatar/11.jpg',
    },
  },
  {
    date: '12 hours ago',
    category: 'Inspiration',
    title: 'How to look for inspiration for new goals',
    content:
      'Morbi et massa fames ac scelerisque sit commodo dignissim faucibus vel quisque...',
    author: {
      name: 'Darlene Robertson',
      avatar: 'assets/img/avatar/05.jpg',
    },
  },
  {
    date: 'July 16, ' + currentYear,
    category: 'Travel',
    title: 'Destinations to inspire and restore resources',
    content:
      'Nec gravida senectus donec vivamus quam urna facilisis viverra eget in suspendisse...',
    author: {
      name: 'Guy Hawkins',
      avatar: 'assets/img/avatar/08.jpg',
    },
  },
]

export const featurePost: FeaturePostType[] = [
  {
    image: 'assets/img/landing/blog/01.jpg',
    title:
      'The fashion for eco bags with vintage prints will still be relevant for more than one year',
    content:
      'Morbi et massa fames ac scelerisque sit commodo dignissim faucibus vel quisque proin lectus. Laoreet sem adipiscing sollicitudin erat massa tellus lorem enim aenean phasellus in hendrerit...',
    shares: 6,
    comments: 12,
    date: '12 hours ago',
    category: 'Fashion',
  },
  {
    image: 'assets/img/landing/blog/02.jpg',
    title:
      'How to look for inspiration for new goals in life and remember to give yourself a break?',
    content:
      'Egestas in neque scelerisque semper sit at eu cursus faucibus velit cras at aliquam sed dictum at at orci curabitur dictumst viverra non pharetra etiam non, vitae tristique eu in morbi felis...',
    shares: 13,
    comments: 8,
    date: '9 days ago',
    category: 'Inspiration',
  },
  {
    image: 'assets/img/landing/blog/03.jpg',
    title:
      'A session with a psychologist as a personal choice or a fashion trend in society',
    content:
      'Purus lectus odio lacus nibh habitant ac sapien malesuada sed convallis adipiscing eget convallis amet enim diam tellus sodales ornare vitae molestie nulla tincidunt ac non facilisis faucibus...',
    shares: 24,
    comments: 17,
    date: '2 weeks ago',
    category: 'Psychology',
  },
]

export const relavantArticle: RealavantArticalType[] = [
  {
    title:
      'Instagram trends that will definitely work and bring results in the new ' +
      currentYear,
    shares: 4,
    comments: 6,
    date: '9 hours ago',
  },
  {
    title:
      'A session with a psychologist as a personal choice or a fashion trend in society',
    shares: 7,
    comments: 12,
    date: '2 days ago',
  },
  {
    title: 'Travel destinations to inspire and restore resources',
    shares: 5,
    comments: 11,
    date: '3 days ago',
  },
  {
    title:
      'How to look for inspiration for new goals in life and remember to give yourself a break?',
    shares: 18,
    comments: 26,
    date: 'July 13, ' + currentYear,
  },
  {
    title: 'The 15 best books every person should read',
    shares: 15,
    comments: 23,
    date: 'May 25, ' + currentYear,
  },
]
