import { Component } from '@angular/core'
import { BrandType, brandName } from '../../data'
import { ParallaxMouseMoveDirective } from '@core/services/parralax-directive'

@Component({
  selector: 'saas-v2-hero',
  standalone: true,
  imports: [ParallaxMouseMoveDirective],
  templateUrl: './hero.component.html',
  styles: ``,
})
export class HeroComponent {
  allBrandName: BrandType[] = brandName
  list = [
    'Segmenting the audience is easy and simple',
    'Functional dashboard for managing your data',
    'Key performance indicators of team interaction',
  ]
}
