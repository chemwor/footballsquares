import { Component } from '@angular/core'
import { JarallaxDirective } from '@components/jarallax-directive/jarallax-directive.component'
import type { JarallaxOptions } from 'jarallax'
import { currency } from 'src/app/states/constants'
import { pricingSaas, PricingSaasType } from '../../data'

@Component({
  selector: 'saas-v4-pricing',
  standalone: true,
  imports: [JarallaxDirective],
  templateUrl: './pricing.component.html',
  styles: ``,
})
export class PricingComponent {
  pricingSaasData: PricingSaasType[] = pricingSaas
  selectedCurrency = currency

  jarallaxConfig: JarallaxOptions = {
    speed: 0.4,
  }
}
