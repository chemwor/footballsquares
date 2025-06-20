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

export const ordersData: Order[] = [
  {
    orderNumber: '#78A6431D409',
    status: 'In progress',
    orderDate: 'Jan 27, 2023',
    total: '16.00',
    images: ['assets/img/account/orders/01.png'],
    products: [
      {
        image: 'assets/img/shop/cart/01.png',
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
    orderDate: 'Sep 14, 2023',
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
        image: 'assets/img/shop/cart/05.png',
        name: 'Glossy round vase',
        color: 'White',
        quantity: 1,
        price: 15,
      },
      {
        image: 'assets/img/shop/cart/06.png',
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
    orderDate: 'Jul 10, 2023',
    total: '38.00',
    images: [
      'assets/img/account/orders/01.png',
      'assets/img/account/orders/05.png',
    ],
    products: [
      {
        image: 'assets/img/shop/cart/01.png',
        name: 'Candle in concrete bowl',
        color: 'Gray night',
        quantity: 1,
        price: 16,
      },
      {
        image: 'assets/img/shop/cart/02.png',
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
    orderDate: 'May 11, 2023',
    total: '17.00',
    images: ['assets/img/account/orders/06.png'],
    products: [
      {
        image: 'assets/img/shop/cart/07.png',
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
