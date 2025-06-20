import { currentYear } from 'src/app/states/constants'

export type TrendingType = {
  title: string
  link: string
}

export const trendingPost: TrendingType[] = [
  {
    title:
      'Instagram trends that will definitely work and bring results in the new  ' +
      currentYear,
    link: '/blog/post-2',
  },
  {
    title: 'A session with a psychologist',
    link: '/blog/post-3',
  },
  {
    title: 'Travel destinations to inspire and restore resources',
    link: '/blog/post-2',
  },
  {
    title: 'How to look for inspiration for new goals',
    link: '/blog/post-3',
  },
]
