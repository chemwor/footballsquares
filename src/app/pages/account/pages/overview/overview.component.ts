import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { AttributedType, Order, attrubutesData, ordersData } from './data'
import { currency, currentYear } from 'src/app/states/constants'
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'account-overview',
  standalone: true,
  imports: [RouterModule, NgbAccordionModule, CommonModule],
  templateUrl: './overview.component.html',
  styles: ``,
})
export class OverviewComponent {
  allOrder: Order[] = ordersData
  attrubutes: AttributedType[] = attrubutesData
  selectedCurrency = currency
  currentYear = currentYear
}
