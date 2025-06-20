export type ColorType = {
  name: string
  value: string
  backgroundColor: `#${string}`
  backgroundImage?: string
}

export type BrandType = {
  name: string
  value: string
  count: number
  checked?: boolean
}

export type LivingCategoryType = {
  label: string
  items: categoryType[]
}

type categoryType = {
  title: string
  number: number
  checked?: boolean
}
export const colorData: ColorType[] = [
  {
    name: 'Black',
    value: 'Black',
    backgroundColor: '#1d211f',
  },
  {
    name: 'Soft beige',
    value: 'Soft beige',
    backgroundColor: '#d9c9a1',
  },
  {
    name: 'Bluish sky',
    value: 'Bluish sky',
    backgroundColor: '#a1b7d9',
  },
  {
    name: 'Green grass',
    value: 'Green grass',
    backgroundColor: '#74947d',
  },
  {
    name: 'Woody brown',
    value: 'Woody brown',
    backgroundColor: '#af8352',
    backgroundImage: 'assets/img/shop/pattern/wood.jpg',
  },
  {
    name: 'Gray marble',
    value: 'Gray marble',
    backgroundColor: '#c0c0c0',
    backgroundImage: 'assets/img/shop/pattern/marble.jpg',
  },
]

export const brandData: BrandType[] = [
  {
    name: 'Pazolinni',
    value: 'Pazolinni',
    count: 48,
  },
  {
    name: 'Tither Room',
    value: 'Tither Room',
    count: 32,
    checked: true,
  },
  {
    name: 'Moissy Decor',
    value: 'Moissy Decor',
    count: 25,
  },
  {
    name: 'Victorio Via',
    value: 'Victorio Via',
    count: 56,
  },
]

export const livingCategory: LivingCategoryType[] = [
  {
    label: 'Living room',
    items: [
      {
        title: 'View all',
        number: 697,
      },
      {
        title: 'Vases',
        number: 234,
        checked: true,
      },
      {
        title: 'Mirrors',
        number: 182,
      },
      {
        title: 'Paintings',
        number: 133,
      },
      {
        title: 'Furniture',
        number: 24,
      },
      {
        title: 'Clocks',
        number: 49,
        checked: true,
      },
      {
        title: 'Photo frames',
        number: 75,
      },
    ],
  },
  {
    label: 'Kitchen',
    items: [
      {
        title: 'View all',
        number: 813,
      },
      {
        title: 'Cutlery',
        number: 387,
      },
      {
        title: 'Storage',
        number: 124,
      },
      {
        title: 'Waste bins',
        number: 59,
      },
      {
        title: 'Holders',
        number: 227,
      },
      {
        title: 'Sinks',
        number: 16,
      },
    ],
  },
  {
    label: 'Bathroom',
    items: [
      {
        title: 'View all',
        number: 1416,
      },
      {
        title: 'Showers',
        number: 113,
      },
      {
        title: 'Basins',
        number: 98,
      },
      {
        title: 'Dispensers',
        number: 205,
      },
      {
        title: 'Cleaning',
        number: 747,
      },
      {
        title: 'Holders',
        number: 253,
      },
    ],
  },
  {
    label: 'Bedroom',
    items: [
      {
        title: 'View all',
        number: 1219,
      },
      {
        title: 'Furniture',
        number: 43,
      },
      {
        title: 'Bed linen',
        number: 528,
      },
      {
        title: 'Lighting',
        number: 391,
      },
      {
        title: 'Storage',
        number: 75,
      },
      {
        title: 'Mirrors',
        number: 182,
      },
    ],
  },
]
