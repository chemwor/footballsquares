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
    key: 'mobile-showcase',
    label: 'Home',
    url: '/',
  },
  {
    key: 'contacts-2',
    url: '/contacts/v2',
    label: 'Contact',
  },
  {
    key: 'coworking-space',
    label: 'Get Your Gameplan',
    url: '/landings/get-your-plan',
  }
]
