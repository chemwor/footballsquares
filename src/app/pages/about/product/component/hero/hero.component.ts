import { Component } from '@angular/core'
import { ParallaxImageType, parallaxImage } from '../../data'
import { ParallaxMouseMoveDirective } from '@core/services/parralax-directive'

@Component({
  selector: 'about-product-hero',
  standalone: true,
  imports: [ParallaxMouseMoveDirective],
  templateUrl: './hero.component.html',
  styles: ``,
})
export class HeroComponent {
  parallaxImageData: ParallaxImageType[] = parallaxImage
}
