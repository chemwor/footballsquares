export type ContactListType = {
  location: string
  phone: Detail
  email: Detail
  address: Detail
}

export type Detail = {
  icon: string
  text: string
  link: string
}

export const contactList: ContactListType[] = [
  {
    location: 'Orlando',
    phone: {
      icon: 'ai-phone',
      text: '+1 (786) 322 560 40',
      link: 'tel:+178632256040',
    },
    email: {
      icon: 'ai-mail',
      text: 'orlando@example.com',
      link: 'mailto:orlando@example.com',
    },
    address: {
      icon: 'ai-map-pin',
      text: '514 S. Magnolia St. Orlando, FL 32806',
      link: 'javascript:void(0);',
    },
  },
  {
    location: 'Chicago',
    phone: {
      icon: 'ai-phone',
      text: '+1 (786) 322 560 40',
      link: 'tel:+178632256040',
    },
    email: {
      icon: 'ai-mail',
      text: 'chicago@example.com',
      link: 'mailto:chicago@example.com',
    },
    address: {
      icon: 'ai-map-pin',
      text: '76, Industrial Dr, West Chicago, 60185',
      link: 'javascript:void(0);',
    },
  },
  {
    location: 'New York',
    phone: {
      icon: 'ai-phone',
      text: '+1 (786) 322 560 40',
      link: 'tel:+178632256040',
    },
    email: {
      icon: 'ai-mail',
      text: 'newyork@example.com',
      link: 'mailto:newyork@example.com',
    },
    address: {
      icon: 'ai-map-pin',
      text: '396 Lillian Blvd, Holbrook, NY 11741',
      link: 'javascript:void(0);',
    },
  },
]
