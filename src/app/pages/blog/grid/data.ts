import { currentYear } from 'src/app/states/constants'

export type BlogPostType = {
  date: string
  category: string
  title: string
  content: string
  image?: string
  author: {
    name: string
    avatar: string
  }
}
export const blogPost: BlogPostType[] = [
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
    title: 'Top books for inspiration',
    image: 'assets/img/blog/grid/01.jpg',
    content:
      'Vulputate auctor lacus imperdiet facilisi tristique nisl pulvinar porta diam duis odio',
    author: {
      name: 'Jenny Wilson',
      avatar: 'assets/img/avatar/06.jpg',
    },
  },
  {
    date: '13 hours ago',
    category: 'Fashion',
    title: 'The fashion for eco bags with vintage prints',
    content:
      'Non purus odio venenatis velit sed tellus sed ultrices neque adipiscing sit turpis vel nisl lacus, aenean sed luctus adipiscing ut orci molestie arcu, sapien sed felis...',
    author: {
      name: 'Lillia Black',
      avatar: 'assets/img/avatar/11.jpg',
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
    date: 'May 12, ' + currentYear,
    category: 'Ecommerce',
    title: 'Promotion of an online store from scratch, first sales',
    content:
      'Sapien ultrices egestas at faucibus eu diam velit diam id amet nibh quam rutrum diam fermentum diam natoque scelerisque viverra molestie fames...',
    author: {
      name: 'David Bocous',
      avatar: 'assets/img/avatar/08.jpg',
    },
  },
  {
    date: 'June 10, ' + currentYear,
    category: 'Inspiration',
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
    date: 'October 10, ' + currentYear,
    category: 'Inspiration',
    title: 'Inspiration in quarantine',
    image: 'assets/img/blog/grid/03.jpg',
    content:
      'Nec in est vel ac et odio interdum risus maecenas pulvinar potenti gravida sed',
    author: {
      name: 'Guy Hawkins',
      avatar: 'assets/img/avatar/12.jpg',
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
