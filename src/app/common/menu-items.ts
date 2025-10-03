export type MenuItemType = {
  key: string
  label: string
  image?: string
  isMega?: boolean
  isNew?: boolean
  url?: string
  parentKey?: string
  target?: '_self' | '_blank' | '_parent' | '_top'
  children?: MenuItemType[]
}

export const MENU_ITEMS: MenuItemType[] = [
  {
    key: 'home',
    label: 'Home',
    url: '/',
  },
  {
    key: 'games',
    label: 'Games',
    children: [
      {
        key: 'current-games',
        label: 'Current Games',
        url: '/blog/list-no-sidebar',
      },
      {
        key: 'completed-games',
        label: 'Completed Games',
        url: '/blog/complete-games',
      },
    ]
  },
  {
    key: 'admin',
    label: 'Admin',
    children: [
      {
        key: 'admin-dashboard',
        label: 'Admin Dashboard',
        url: '/services/admin-game-page',
      },
      {
        key: 'hosted-games',
        label: 'Hosted Games',
        url: '/blog/hosted-games',
      },
      {
        key: 'hosted-history',
        label: 'Hosted History',
        url: '/blog/hosted-history',
      },
    ]
  },
  {
    key: 'game-management',
    label: 'Game Page',
    url: '/services/v3',
  },
  {
    key: 'create-game',
    label: 'Create Your Game',
    url: '/landings/get-your-picks',
  },
  {
    key: 'auth',
    label: 'Account',
    children: [
      {
        key: 'signin',
        label: 'Sign In',
        url: '/auth/signin',
      },
      {
        key: 'signup',
        label: 'Sign Up',
        url: '/auth/sign-up',
      },
    ]
  },
  {
    key: 'contact',
    label: 'Contact',
    url: '/contacts/v2',
  },
]
