import { currentYear } from 'src/app/states/constants'

export type CommentType = {
  author: string
  avatar: string
  timestamp: string
  content: string
  reply?: reply
}

export type TrendingType = {
  title: string
  link: string
}
export type reply = {
  author: string
  avatar: string
  timestamp: string
  content: string
  name: string
}

export type MostPopularType = {
  image: string
  title: string
  link: string
}

export const commentsData: CommentType[] = [
  {
    author: 'Albert Flores',
    avatar: 'assets/img/avatar/08.jpg',
    timestamp: '5 hours ago',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tellus lectus, tempus eu urna eu, imperdiet dignissim augue. Aliquam fermentum est a ligula bibendum, ac gravida ipsum dictum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur suscipit quam ut velit condimentum, nec mollis risus semper. Curabitur quis mauris eget ligula tincidunt venenatis. Sed congue pulvinar hendrerit.',
  },
  {
    author: 'Jenny Wilson',
    avatar: 'assets/img/avatar/11.jpg',
    timestamp: '2 days ago at 9:20',
    content:
      'Pellentesque urna pharetra, quis maecenas. Sit dolor amet nulla aenean eu, ac. Nisl mi tempus, iaculis viverra vestibulum scelerisque imperdiet montes mauris massa elit pretium elementum eget tortor quis',
    reply: {
      author: 'Ralph Edwards',
      avatar: 'assets/img/avatar/10.jpg',
      timestamp: '2 days ago at 11:45',
      name: '@Jenny Wilson',
      content:
        'Massa morbi duis et ornare urna dictum vestibulum pulvinar nunc facilisis ornare id at at ut arcu integer tristique placerat non turpis nibh turpis ullamcorper est porttitor.',
    },
  },
  {
    author: 'Esther Howard',
    avatar: 'assets/img/avatar/07.jpg',
    timestamp: 'May 19, ' + currentYear,
    content:
      'Donec et sollicitudin tellus. Duis maximus, dui eget egestas mattis, purus ex tempor nulla, quis tempor sapien neque at nisl. Aliquam eu nisi ut nisl ultrices posuere. Praesent dignissim efficitur nisi, a hendrerit ipsum elementum sit amet. Vivamus non ante nisl. Nunc faucibus velit at eros mollis semper.',
  },
]

export const mostPopularArticle: MostPopularType[] = [
  {
    image: 'assets/img/blog/list/01.jpg',
    title:
      'The fashion for eco bags with vintage prints will still be relevant for more than one year',
    link: '/blog/single-v1',
  },
  {
    image: 'assets/img/blog/list/06.jpg',
    title:
      'A session with a psychologist as a personal choice or a fashion trend',
    link: '/blog/single-v2',
  },
]

export const trendingPost: TrendingType[] = [
  {
    title:
      'Instagram trends that will definitely work and bring results in the new ' +
      currentYear,
    link: '/blog/post-2',
  },
  {
    title: 'A session with a psychologist as a personal choice',
    link: '/blog/post-3',
  },
  {
    title: 'Travel destinations to inspire and restore resources',
    link: '/blog/post-2',
  },
  {
    title: 'How to look for inspiration for new goals in life?',
    link: '/blog/post-3',
  },
]
