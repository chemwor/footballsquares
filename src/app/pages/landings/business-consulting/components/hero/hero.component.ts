import { Component } from '@angular/core'
import { ParallaxMouseMoveDirective } from '@core/services/parralax-directive'
@Component({
  selector: 'business-consulting-hero',
  standalone: true,
  imports: [ParallaxMouseMoveDirective],
  templateUrl: './hero.component.html',
  styles: ``,
})
export class HeroComponent {}
