export type FavoritesType = {
  id: number
  name: string
  image_src: string
  price: string
  discounted_price?: string
  colors?: ColorsTYpe[]
  status?: string
  badge?: string
  bgColor?: string[]
}

export type ColorsTYpe = {
  id: number
  name: string
  hex: string
  backgroundImage?: string
}

export const favoritesData: FavoritesType[] = [
  {
    id: 1,
    name: 'Dispenser for soap',
    image_src: 'assets/img/shop/products/02.png',
    price: '16.00',
  },
  {
    id: 2,
    name: 'Loft style lamp',
    image_src: 'assets/img/shop/products/01.png',
    price: '21.00',
    badge: 'Sale',
    discounted_price: '35.00',
    colors: [
      {
        id: 1,
        name: 'Dark gray',
        hex: '#576071',
      },
      {
        id: 2,
        name: 'Light gray',
        hex: '#d5d4d3',
      },
      {
        id: 3,
        name: 'Blue',
        hex: '#a1b7d9',
      },
    ],
  },
  {
    id: 3,
    name: 'Glossy round vase',
    image_src: 'assets/img/shop/products/03.png',
    price: '15.00',
    colors: [
      {
        id: 1,
        name: 'Light gray',
        hex: '#d5d4d3',
      },
      {
        id: 2,
        name: 'Dark gray',
        hex: '#576071',
      },
      {
        id: 3,
        name: 'Blue',
        hex: '#a1b7d9',
      },
    ],
  },
  {
    id: 4,
    name: 'Living room table',
    image_src: 'assets/img/shop/products/06.png',
    status: 'Out of stock',
    price: '46.00',
    badge: 'Out Of Stock',
    colors: [],
  },
  {
    id: 5,
    name: 'Ceramic flower pot',
    image_src: 'assets/img/shop/products/04.png',
    price: '19.00',
    colors: [
      {
        id: 1,
        name: 'Gray concrete',
        hex: '#c0c0c0',
        backgroundImage: 'url(assets/img/shop/pattern/marble.jpg)',
      },
      {
        id: 2,
        name: 'Beige',
        hex: '#d9c9a1',
      },
      {
        id: 3,
        name: 'Blue',
        hex: '#a1b7d9',
      },
    ],
  },
  {
    id: 6,
    name: 'Pendant lamp',
    image_src: 'assets/img/shop/products/05.png',
    status: 'New',
    badge: 'New',
    price: '22.00',
    colors: [
      {
        id: 1,
        name: 'Gray',
        hex: '#bab8b7',
      },
      {
        id: 2,
        name: 'Woody brown',
        hex: '#c0c0c0',
        backgroundImage: 'url(assets/img/shop/pattern/wood.jpg)',
      },
      {
        id: 3,
        name: 'Gray marble',
        hex: '#c0c0c0',
        backgroundImage: 'url(assets/img/shop/pattern/marble.jpg)',
      },
    ],
  },
]
