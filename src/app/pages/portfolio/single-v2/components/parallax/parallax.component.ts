import { Component } from '@angular/core'
import { JarallaxDirective } from '@components/jarallax-directive/jarallax-directive.component'
import type { JarallaxOptions } from 'jarallax'

@Component({
  selector: 'single2-parallax',
  standalone: true,
  imports: [JarallaxDirective],
  templateUrl: './parallax.component.html',
  styles: ``,
})
export class ParallaxComponent {
  jarallaxConfig: JarallaxOptions = {
    speed: 0.6,
  }
}
