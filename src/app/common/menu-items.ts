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

// Menu for users who are NOT signed in
export const PRE_SIGNIN_MENU_ITEMS: MenuItemType[] = [
  {
    key: 'home',
    label: 'Home',
    url: '/',
  },
  {
    key: 'signin',
    label: 'Sign In',
    url: '/auth/signin',
  },
  {
    key: 'signup',
    label: 'Sign Up',
    url: '/auth/signup',
  },
  {
    key: 'pricing',
    label: 'Price',
    url: '/pages/pricing',
  },
  {
    key: 'contact',
    label: 'Contact',
    url: '/contacts/v2',
  },
]

// Menu for users who ARE signed in
export const SIGNED_IN_MENU_ITEMS: MenuItemType[] = [
  {
    key: 'home',
    label: 'Home',
    url: '/dashboard', // Dashboard route for signed-in users
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
        key: 'discover-games',
        label: 'Discover Games',
        url: '/blog/discover-games',
      },
      {
        key: 'past-games',
        label: 'Past Games',
        url: '/blog/complete-games',
      },
    ]
  },
  {
    key: 'create-game',
    label: 'Create Your Game',
    url: '/landings/get-your-picks',
  },
  {
    key: 'settings',
    label: 'Settings',
    url: '/account/settings',
  },
  {
    key: 'contact',
    label: 'Contact',
    url: '/contacts/v2',
  },
]

// Host menu items (shown conditionally for non-free members or users with played squares)
export const HOST_MENU_ITEMS: MenuItemType[] = [
  {
    key: 'host',
    label: 'Host',
    children: [
      {
        key: 'squares-hosting',
        label: 'Squares Hosting',
        url: '/blog/hosted-games',
      },
      {
        key: 'hosted-history',
        label: 'Hosted History',
        url: '/blog/hosted-history',
      },
      {
        key: 'pending-requests',
        label: 'Pending Requests',
        url: '/all-pending-requests',
      },
    ]
  },
]

// Legacy menu items (keeping for backward compatibility)
export const MENU_ITEMS: MenuItemType[] = PRE_SIGNIN_MENU_ITEMS
