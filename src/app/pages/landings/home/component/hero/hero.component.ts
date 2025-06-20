import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { ParallaxMouseMoveDirective } from '@core/services/parralax-directive'

@Component({
  selector: 'home-hero',
  standalone: true,
  imports: [ParallaxMouseMoveDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeroComponent {}
