import { Component } from '@angular/core'
import { PricingPlanType, pricingPlan } from '../../data'
import { currency } from 'src/app/states/constants'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'pricing-plans',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plans.component.html',
  styles: ``,
})
export class PlansComponent {
  pricingPlanData: PricingPlanType[] = pricingPlan
  selectedCurrency = currency
}
