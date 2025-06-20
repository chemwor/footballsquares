import { Component } from '@angular/core'
import { JarallaxDirective } from '@components/jarallax-directive/jarallax-directive.component'
import type { JarallaxOptions } from 'jarallax'

@Component({
  selector: 'agency-about',
  standalone: true,
  imports: [JarallaxDirective],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  jarallaxConfig: JarallaxOptions = {
    speed: 0.6,
  }
}
