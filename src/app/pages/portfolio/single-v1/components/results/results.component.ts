import { Component } from '@angular/core'
import { resultCounter, ResultCounterType } from '../../data'

@Component({
  selector: 'single1-results',
  standalone: true,
  imports: [],
  templateUrl: './results.component.html',
  styles: ``,
})
export class ResultsComponent {
  allResultCount: ResultCounterType[] = resultCounter
}
