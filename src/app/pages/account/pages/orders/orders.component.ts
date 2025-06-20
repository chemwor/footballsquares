import { Component } from '@angular/core'
import { Order, ordersData } from './data'
import { currency } from 'src/app/states/constants'
import { CommonModule } from '@angular/common'
import {
  NgbAccordionModule,
  NgbPaginationModule,
} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'account-pages-orders',
  standalone: true,
  imports: [CommonModule, NgbAccordionModule, NgbPaginationModule],
  templateUrl: './orders.component.html',
  styles: ``,
})
export class OrdersComponent {
  allOrder: Order[] = ordersData
  selectedCurrency = currency
}
