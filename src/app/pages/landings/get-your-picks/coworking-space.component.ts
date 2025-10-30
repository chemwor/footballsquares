import { Component } from '@angular/core'
import { NavigationBarComponent } from '@components/navigation-bars'
import { HeroComponent } from './components/hero/hero.component'
import { FooterComponent } from '../saas-v2/components/footer/footer.component'

@Component({
  selector: 'landings-coworking-space',
  standalone: true,
  imports: [NavigationBarComponent, HeroComponent, FooterComponent],
  templateUrl: './coworking-space.component.html',
  styles: ``,
})
export class CoworkingSpaceComponent {}
