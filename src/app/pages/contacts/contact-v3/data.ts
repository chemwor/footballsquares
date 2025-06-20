export type ContactCategoryType = {
  category: string
  phone: string
  link: string
}

export type ContactTimingType = {
  day: string
  opening_hours: {
    start: string
    end: string
  }
}
export const contactCategory: ContactCategoryType[] = [
  {
    category: 'Main office',
    phone: '+1 (786) 322 560 33',
    link: 'tel:+178632256033',
  },
  {
    category: 'Reception room',
    phone: '+1 (786) 300 560 44',
    link: 'tel:+178630056044',
  },
  {
    category: 'Franchise',
    phone: '+1 (786) 300 500 55',
    link: 'tel:+178630050055',
  },
]

export const contactTiming: ContactTimingType[] = [
  {
    day: 'Mon - Thu',
    opening_hours: {
      start: '10:00',
      end: '22:00',
    },
  },
  {
    day: 'Fri - Sat',
    opening_hours: {
      start: '10:00',
      end: '20:00',
    },
  },
  {
    day: 'Sun',
    opening_hours: {
      start: '12:00',
      end: '16:00',
    },
  },
]
