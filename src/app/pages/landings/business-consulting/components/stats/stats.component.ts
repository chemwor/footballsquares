import { Component } from '@angular/core'
import { CountType, counterData } from '../../data'

@Component({
  selector: 'business-consulting-stats',
  standalone: true,
  imports: [],
  templateUrl: './stats.component.html',
  styles: ``,
})
export class StatsComponent {
  counterData: CountType[] = counterData
}
