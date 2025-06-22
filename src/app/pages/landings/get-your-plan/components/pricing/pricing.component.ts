import { Component } from '@angular/core'
import { pricingSpace, PricingType } from '../../data'
import { currency } from 'src/app/states/constants'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'coworking-space-pricing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pricing.component.html',
  styles: ``,
})
export class PricingComponent {
  coWorkingPricing: PricingType[] = pricingSpace
  selectedCurrency = currency
}
