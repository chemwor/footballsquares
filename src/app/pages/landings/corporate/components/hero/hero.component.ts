import { Component } from '@angular/core'
import { JarallaxDirective } from '@components/jarallax-directive/jarallax-directive.component'
import type { JarallaxOptions } from 'jarallax'

@Component({
  selector: 'corporate-hero',
  standalone: true,
  imports: [JarallaxDirective],
  templateUrl: './hero.component.html',
  styles: ``,
})
export class HeroComponent {
  jarallaxConfig: JarallaxOptions = {
    speed: 0.65,
  }
}
