import { Component } from '@angular/core'
import { servicesv3, servicev3Type } from '../../data'
@Component({
  selector: 'single-v3-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styles: ``,
})
export class HeroComponent {
  servicesv3: servicev3Type[] = servicesv3
}
