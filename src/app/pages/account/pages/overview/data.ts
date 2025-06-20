import { currentYear } from 'src/app/states/constants'

export type Order = {
  orderNumber: string
  status: string
  orderDate: string
  total: string
  products: Product[]
  payment: string
  deliveryAddress: string
  images?: string[]
}

export type Product = {
  image: string
  name: string
  color: string
  quantity: number
  price: number
}

export type AttributedType = {
  attribute: string
  value: string
}
export const ordersData: Order[] = [
  {
    orderNumber: '#78A6431D409',
    status: 'In progress',
    orderDate: 'Jan 27, ' + currentYear,
    total: '16.00',
    images: ['assets/img/account/orders/01.png'],
    products: [
      {
        image: 'assets/img/account/orders/01.png',
        name: 'Candle in concrete bowl',
        color: 'Gray night',
        quantity: 1,
        price: 16,
      },
    ],
    payment: 'Upon the delivery',
    deliveryAddress:
      '401 Magnetic Drive Unit 2, Toronto, Ontario, M3J 3H9, Canada',
  },
  {
    orderNumber: '#47H76G09F33',
    status: 'Canceled',
    orderDate: 'Sep 14, ' + currentYear,
    total: '59.00',
    images: [
      'assets/img/account/orders/02.png',
      'assets/img/account/orders/03.png',
      'assets/img/account/orders/04.png',
    ],
    products: [
      {
        image: 'assets/img/account/orders/02.png',
        name: 'Analogue wall clock',
        color: 'Turquoise',
        quantity: 1,
        price: 25,
      },
      {
        image: 'assets/img/account/orders/03.png',
        name: 'Glossy round vase',
        color: 'White',
        quantity: 1,
        price: 15,
      },
      {
        image: 'assets/img/account/orders/04.png',
        name: 'Ceramic flower pot',
        color: 'Gray concrete',
        quantity: 1,
        price: 19,
      },
    ],
    payment: 'Upon the delivery',
    deliveryAddress:
      '401 Magnetic Drive Unit 2, Toronto, Ontario, M3J 3H9, Canada',
  },
  {
    orderNumber: '#34VB5540K83',
    status: 'Delivered',
    orderDate: 'Jul 10, ' + currentYear,
    total: '38.00',
    images: [
      'assets/img/account/orders/01.png',
      'assets/img/account/orders/05.png',
    ],
    products: [
      {
        image: 'assets/img/account/orders/01.png',
        name: 'Candle in concrete bowl',
        color: 'Gray night',
        quantity: 1,
        price: 16,
      },
      {
        image: 'assets/img/account/orders/05.png',
        name: 'Exquisite glass vase',
        color: 'Rose',
        quantity: 2,
        price: 11,
      },
    ],
    payment: 'Upon the delivery',
    deliveryAddress:
      '401 Magnetic Drive Unit 2, Toronto, Ontario, M3J 3H9, Canada',
  },
  {
    orderNumber: '#502TR872W2',
    status: 'Delivered',
    orderDate: 'May 11, ' + currentYear,
    total: '17.00',
    images: ['assets/img/account/orders/06.png'],
    products: [
      {
        image: 'assets/img/account/orders/06.png',
        name: 'Dispenser for soap',
        color: 'White marble',
        quantity: 1,
        price: 17,
      },
    ],
    payment: 'Upon the delivery',
    deliveryAddress:
      '401 Magnetic Drive Unit 2, Toronto, Ontario, M3J 3H9, Canada',
  },
]

export const attrubutesData: AttributedType[] = [
  {
    attribute: 'Phone',
    value: '+1 234 567 890',
  },
  {
    attribute: 'Language',
    value: 'English',
  },
  {
    attribute: 'Gender',
    value: 'Female',
  },
  {
    attribute: 'Communication',
    value: 'Mobile, email',
  },
]
