import { Component } from '@angular/core'
import { Saa3LayersType, saas3Layer } from '../../data'
import { ParallaxMouseMoveDirective } from '@core/services/parralax-directive'

@Component({
  selector: 'saas-v3-hero',
  standalone: true,
  imports: [ParallaxMouseMoveDirective],
  templateUrl: './hero.component.html',
  styles: ``,
})
export class HeroComponent {
  saas3Layers: Saa3LayersType[] = saas3Layer
}
