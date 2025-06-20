import { Component } from '@angular/core'
import { currency } from 'src/app/states/constants'
import { PageTitleComponent } from './components/page-title/page-title.component'
import { SalesValueComponent } from './components/sales-value/sales-value.component'
import { PurchaseChartComponent } from './components/purchase-chart/purchase-chart.component'
import { StatesComponent } from './components/states/states.component'
import { CountrySalesComponent } from './components/country-sales/country-sales.component'

@Component({
  selector: 'account-earnings',
  standalone: true,
  imports: [
    PageTitleComponent,
    SalesValueComponent,
    PurchaseChartComponent,
    StatesComponent,
    CountrySalesComponent,
  ],
  templateUrl: './earnings.component.html',
  styles: ``,
})
export class EarningsComponent {}
