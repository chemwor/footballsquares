import { Component } from '@angular/core'
import { currency } from 'src/app/states/constants'

@Component({
  selector: 'influencer-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styles: ``,
})
export class HeroComponent {
  selectedCurrency = currency
}
