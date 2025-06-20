import { Component } from '@angular/core'
import { popularData, PopularDataype } from '../../data'

@Component({
  selector: 'shop2-popular',
  standalone: true,
  imports: [],
  templateUrl: './popular.component.html',
  styles: ``,
})
export class PopularComponent {
  allPopularData: PopularDataype[] = popularData
}
