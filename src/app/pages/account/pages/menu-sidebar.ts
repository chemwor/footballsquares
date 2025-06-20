type AccountItem = {
  label: string
  icon?: string
  link: string
  badge?: string
}

export type AccountMenuType = {
  label: string
  icon?: string
  items?: AccountItem[]
  link?: string
}
export const accountData: AccountMenuType[] = [
  {
    label: 'Account',
    items: [
      {
        label: 'Overview',
        icon: 'ai-user-check',
        link: '/account/overview',
      },
      {
        label: 'Settings',
        icon: 'ai-settings',
        link: '/account/settings',
      },
      {
        label: 'Billing',
        icon: 'ai-wallet',
        link: '/account/billing',
      },
    ],
  },
  {
    label: 'Dashboard',
    items: [
      {
        label: 'Orders',
        icon: 'ai-cart',
        link: '/account/orders',
      },
      {
        label: 'Earnings',
        icon: 'ai-activity',
        link: '/account/earnings',
      },
      {
        label: 'Chat',
        icon: 'ai-messages',
        link: '/account/chat',
        badge: '4',
      },
      {
        label: 'Favorites',
        icon: 'ai-heart',
        link: '/account/favorites',
      },
    ],
  },
]
