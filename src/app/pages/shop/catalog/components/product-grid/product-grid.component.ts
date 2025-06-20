import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import {
  NgbPaginationModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap'
import { currency } from 'src/app/states/constants'

type productType = {
  id: number
  name: string
  image: string
  price: string
  mrp?: string
  tag?: string
  color?: {
    id: number
    code: string
    image?: string
  }[]
}

@Component({
  selector: 'catalog-product-grid',
  standalone: true,
  imports: [CommonModule, NgbPaginationModule, RouterModule, NgbTooltipModule],
  templateUrl: './product-grid.component.html',
  styles: ``,
})
export class ProductGridComponent {
  selectedCurrency = currency
  productList: productType[] = [
    {
      id: 1,
      name: 'Loft style lamp',
      image: 'assets/img/shop/products/01.png',
      price: '21.00',
      mrp: '35.00',
      tag: 'Sale',
      color: [
        { id: 1, code: '#576071' },
        { id: 2, code: '#d5d4d3' },
        { id: 3, code: '#a1b7d9' },
      ],
    },
    {
      id: 2,
      name: 'Dispenser for soap',
      image: 'assets/img/shop/products/02.png',
      price: '16.00',
    },

    {
      id: 3,
      name: 'Glossy round vase',
      image: 'assets/img/shop/products/03.png',
      price: '11.00',
      mrp: '15.00',
      tag: 'Sale',
      color: [
        { id: 1, code: '#d5d4d3' },
        { id: 2, code: '#576071' },
        { id: 3, code: '#a1b7d9' },
      ],
    },
    {
      id: 4,
      name: 'Ceramic flower pot',
      image: 'assets/img/shop/products/04.png',
      price: '19.00',
      tag: 'New',
      color: [
        { id: 1, code: '#c0c0c0', image: 'assets/img/shop/pattern/marble.jpg' },
        { id: 2, code: '#d9c9a1' },
        { id: 3, code: '#a1b7d9' },
      ],
    },
    {
      id: 5,
      name: 'Pendant lamp',
      image: 'assets/img/shop/products/05.png',
      price: '22.00',
      color: [
        { id: 1, code: '#bab8b7' },
        { id: 2, code: '#c0c0c0', image: 'assets/img/shop/pattern/wood.jpg' },
        { id: 3, code: '#c0c0c0', image: 'assets/img/shop/pattern/marble.jpg' },
      ],
    },
    {
      id: 6,
      name: 'Living room table',
      image: 'assets/img/shop/products/06.png',
      price: '46.00',
    },
    {
      id: 7,
      name: 'Teapot for hot drinks',
      image: 'assets/img/shop/products/07.png',
      price: '17.00',
    },
    {
      id: 8,
      name: 'Analogue wall clock',
      image: 'assets/img/shop/products/08.png',
      price: '25.00',
      tag: 'New',
      color: [
        { id: 1, code: '#a8c2c0' },
        { id: 2, code: '#b4a9c3' },
        { id: 3, code: '#a1b7d9' },
      ],
    },
    {
      id: 9,
      name: 'Scented candle',
      image: 'assets/img/shop/products/09.png',
      price: '13.00',
    },
    {
      id: 10,
      name: 'Matte color pitcher',
      image: 'assets/img/shop/products/10.png',
      price: '11.00',
      mrp: '15.00',
      tag: 'Sale',
      color: [
        { id: 1, code: '#aea6a6' },
        { id: 2, code: '#d9c9a1' },
        { id: 3, code: '#a1b7d9' },
      ],
    },
    {
      id: 11,
      name: 'Plate with granite print',
      image: 'assets/img/shop/products/11.png',
      price: '9.00',
    },
    {
      id: 12,
      name: 'Exquisite glass vase',
      image: 'assets/img/shop/products/12.png',
      price: '23.00',
    },
  ]
}
