import { currentYear } from 'src/app/states/constants'

export type PostType = {
  date: string
  category: string
  title: string
  image?: string
  content: string
  author: {
    name: string
    avatar: string
  }
}

export type TrendingType = {
  title: string
  image: string
  date: string
}
export const postsData: PostType[] = [
  {
    date: '9 hours ago',
    category: 'Brand strategy',
    title: 'Business strategy for a brand of vintage bags',
    content:
      'Pharetra in morbi quis is massa maecenas arcu vulputate pulvinar elit non nullage a, duis tortor mi massa ipsum in eu eu eget libero pulvinar elit vulputate...',
    author: {
      name: 'Darlene Robertson',
      avatar: 'assets/img/avatar/05.jpg',
    },
  },
  {
    date: '12 hours ago',
    category: 'Books',
    image: 'assets/img/blog/grid/01.jpg',
    title: 'Top books for inspiration',
    content:
      'Vulputate auctor lacus imperdiet facilisi tristique nisl pulvinar porta diam duis odio',
    author: {
      name: 'Jenny Wilson',
      avatar: 'assets/img/avatar/06.jpg',
    },
  },
  {
    date: 'July 16, ' + currentYear,
    category: 'Inspiration',
    title: 'How to look for inspiration for new goals',
    content:
      'Pharetra in morbi quis is massa maecenas arcu vulputate pulvinar elit non nullage a, duis tortor mi massa ipsum in eu eu eget libero pulvinar elit vulputate...',
    author: {
      name: 'Guy Hawkins',
      avatar: 'assets/img/avatar/12.jpg',
    },
  },
  {
    date: 'June 10, ' + currentYear,
    category: 'Ecommerce',
    title: 'Sales on social networks for the eco cosmetics',
    content:
      'Morbi et massa fames ac scelerisque sit commodo dignissim faucibus vel quisque proin lectus et massa fames ac scelerisque sit commodo dignissim...',
    author: {
      name: 'Lillia Black',
      avatar: 'assets/img/avatar/11.jpg',
    },
  },
  {
    date: 'January 9, ' + currentYear,
    category: 'Travel',
    title: 'Ways to travel in ' + currentYear,
    image: 'assets/img/blog/grid/02.jpg',
    content:
      'Duis consectetur quis enim iaculis eu sagittis posuere imperdiet scelerisque',
    author: {
      name: 'Darlene Robertson',
      avatar: 'assets/img/avatar/05.jpg',
    },
  },
  {
    date: 'December 15, ' + currentYear,
    category: 'Inspiration',
    title: 'Destinations to inspire and restore resources',
    content:
      'Non purus odio venenatis velit sed tellus sed ultrices neque adipiscing sit turpis vel nisl lacus, aenean sed luctus adipiscing ut orci molestie arcu, sapien sed felis...',
    author: {
      name: 'Jenny Wilson',
      avatar: 'assets/img/avatar/06.jpg',
    },
  },
]

export const trendingPost: TrendingType[] = [
  {
    title: 'Instagram trends that will definitely work',
    image: 'assets/img/blog/sidebar/01.jpg',
    date: '13 hours ago',
  },
  {
    title: 'A session with a psychologist',
    image: 'assets/img/blog/sidebar/02.jpg',
    date: 'May 12, ' + currentYear,
  },
  {
    title: 'How to look for inspiration for new goals',
    image: 'assets/img/blog/sidebar/03.jpg',
    date: 'June 10, ' + currentYear,
  },
]
