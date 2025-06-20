import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { JarallaxDirective } from '@components/jarallax-directive/jarallax-directive.component'
import type { JarallaxOptions } from 'jarallax'

@Component({
  selector: 'web-studio-hero',
  standalone: true,
  imports: [JarallaxDirective, RouterModule],
  templateUrl: './hero.component.html',
  styles: ``,
})
export class HeroComponent {
  jarallaxConfig: JarallaxOptions = {
    speed: 0.6,
  }
}
