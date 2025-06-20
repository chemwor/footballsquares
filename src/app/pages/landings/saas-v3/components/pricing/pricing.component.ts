import { AfterViewInit, Component } from '@angular/core'
import { currency } from 'src/app/states/constants'
import { initAOS } from 'src/app/utils/init-aos'
@Component({
  selector: 'saas-v3-pricing',
  standalone: true,
  imports: [],
  templateUrl: './pricing.component.html',
  styles: ``,
})
export class PricingComponent implements AfterViewInit {
  selectedCurrency = currency
  pricingFeature = [
    'Viverra adipiscing ullamcorper',
    'Et purus quis laoreet ipsum',
    'Massa non sagittis erat sit',
    'Ac dui leo adipiscing',
    'Ipsum sapien et a dolor viverra',
  ]
  pricingFeature2 = [
    'Et purus quis laoreet ipsum',
    'Placerat lorem elit purus',
    'Massa non sagittis erat sit',
  ]
  ngAfterViewInit(): void {
    initAOS()
  }
}
