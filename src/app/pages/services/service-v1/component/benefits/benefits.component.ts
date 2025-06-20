import { Component } from '@angular/core'
import { BenefitType, benefits } from '../../data'

@Component({
  selector: 'service-v1-benefits',
  standalone: true,
  imports: [],
  templateUrl: './benefits.component.html',
  styles: ``,
})
export class BenefitsComponent {
  allBenefit: BenefitType[] = benefits
}
