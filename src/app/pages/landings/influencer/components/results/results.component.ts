import { AfterViewInit, Component } from '@angular/core'
import { influenceResult, InfluenceResultType } from '../../data'
import { initAOS } from 'src/app/utils/init-aos'

@Component({
  selector: 'influencer-results',
  standalone: true,
  imports: [],
  templateUrl: './results.component.html',
  styles: ``,
})
export class ResultsComponent implements AfterViewInit {
  allInfluenceResult: InfluenceResultType[] = influenceResult
  ngAfterViewInit(): void {
    initAOS()
  }
}
