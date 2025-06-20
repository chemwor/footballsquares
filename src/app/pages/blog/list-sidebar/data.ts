import { currentYear } from 'src/app/states/constants'

export type BlogPostType = {
  title: string
  image: string
  excerpt: string
  shares: number
  comments: number
  date: string
  category: string
}

export type CategoryType = {
  count: number
  category: string
}

export const blogPostList: BlogPostType[] = [
  {
    title: 'Business strategy for a brand of vintage bags',
    image: 'assets/img/blog/list/01.jpg',
    excerpt:
      'Morbi et massa fames ac scelerisque sit commodo dignissim faucibus vel quisque proin lectus et massa fames ac scelerisque sit commodo dignissim. Tellus sagittis dolor pellentesque vel porttitor magna aliquet arcu. Interdum risus mauris pulvinar et vel morbi tellus, scelerisque vel metus ...',
    shares: 6,
    comments: 12,
    date: '8 hours ago',
    category: 'Business',
  },
  {
    title: 'Top books for inspiration',
    image: 'assets/img/blog/list/02.jpg',
    excerpt:
      'Sapien ultrices egestas at faucibus eu diam velit diam id amet nibh quam rutrum fermentum diam natoque scelerisque viverra molestie fames. Nulla fringilla arcu justo augue fringilla in nunc volutpat sit. Dui diam, faucibus vitae ultricies vitae mollis nunc elementum. Habitasse porta neque tempor tellus ut ...',
    shares: 10,
    comments: 4,
    date: '12 hours ago',
    category: 'Books',
  },
  {
    title: 'Destinations to inspire and restore resources',
    image: 'assets/img/blog/list/03.jpg',
    excerpt:
      'Sapien ultrices egestas at faucibus eu diam velit diam id amet nibh quam rutrum diam fermentum diam natoque scelerisque viverra molestie fames. Aliquet donec cras amet orci in in neque ut sed diam quis consectetur purus lorem eu, sit. Aliquam eget arcu sed urna feugiat. In integer nisl at dui malesuada ...',
    shares: 8,
    comments: 5,
    date: 'April 25, ' + currentYear,
    category: 'Travel',
  },
  {
    title: 'Promotion of an online store from scratch, first sales',
    image: 'assets/img/blog/list/04.jpg',
    excerpt:
      'Pharetra in morbi quis is massa maecenas arcu vulputate pulvinar elit non nullage a, duis tortor mi massa ipsum in eu eu eget libero pulvinar elit vulputate. Nunc aliquet scelerisque pellentesque imperdiet tortor elit, dictum. Tristique odio at dignissim viverra aliquet eleifend erat tellus, at arcu, egestas praesent...',
    shares: 11,
    comments: 3,
    date: 'May 12, ' + currentYear,
    category: 'Marketing',
  },
  {
    title: 'New series from Netflix',
    image: 'assets/img/blog/list/05.jpg',
    excerpt:
      'Egestas in neque scelerisque semper sit at eu cursus faucibus velit cras at aliquam sed dictum at at orci curabitur dictumst viverra non pharetra etiam non, vitae tristique eu in morbi felis nulla. Tellus sagittis dolor pellentesque vel porttitor magna aliquet arcu. Interdum risus mauris pulvinar et vel morbi ...',
    shares: 19,
    comments: 7,
    date: 'December 15, ' + currentYear,
    category: 'TV shows',
  },
]

export const category: CategoryType[] = [
  {
    category: 'All categories',
    count: 110,
  },
  {
    category: 'Inspiration',
    count: 34,
  },
  {
    category: 'Brand strategy',
    count: 8,
  },
  {
    category: 'Advertisement',
    count: 45,
  },
  {
    category: 'Ecommerce',
    count: 17,
  },
  {
    category: 'Travel & Vacation',
    count: 6,
  },
]

export const blogListSidebar: BlogPostType[] = [
  {
    title: 'Business strategy for a brand of vintage bags',
    image: 'assets/img/blog/list/01.jpg',
    excerpt:
      'Morbi et massa fames ac scelerisque sit commodo dignissim faucibus vel quisque proin lectus et massa fames ac scelerisque fames velit diam sit...',
    shares: 6,
    comments: 12,
    date: '8 hours ago',
    category: 'Business',
  },
  {
    title: 'Top books for inspiration',
    image: 'assets/img/blog/list/02.jpg',
    excerpt:
      'Sapien ultrices egestas at faucibus eu diam velit diam id amet nibh quam rutrum fermentum diam natoque scelerisque viverra viverra molestie fames...',
    shares: 10,
    comments: 4,
    date: '12 hours ago',
    category: 'Books',
  },
  {
    title: 'Destinations to inspire and restore resources',
    image: 'assets/img/blog/list/03.jpg',
    excerpt:
      'Sapien ultrices egestas at faucibus eu diam velit diam id amet nibh quam rutrum diam fermentum diam natoque scelerisque viverra molestie fames...',
    shares: 8,
    comments: 5,
    date: 'April 25, ' + currentYear,
    category: 'Travel',
  },
  {
    title: 'Promotion of an online store from scratch, first sales',
    image: 'assets/img/blog/list/04.jpg',
    excerpt:
      'Pharetra in morbi quis is massa maecenas arcu vulputate pulvinar elit non nullage a, duis tortor mi massa ipsum in eu eu eget libero pulvinar elit...',
    shares: 11,
    comments: 3,
    date: 'May 12, ' + currentYear,
    category: 'Marketing',
  },
  {
    title: 'New series from Netflix',
    image: 'assets/img/blog/list/05.jpg',
    excerpt:
      'Egestas in neque scelerisque semper sit at eu cursus faucibus velit cras at aliquam sed dictum at at orci curabitur dictumst viverra non pharetra etiam non, vitae tristique eu in morbi felis morbi nulla fermentum diam natoque...',
    shares: 19,
    comments: 7,
    date: 'December 15, ' + currentYear,
    category: 'TV shows',
  },
]
