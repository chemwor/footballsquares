import { AfterViewInit, Component } from '@angular/core'
import { StepType, stepsToSuccess } from 'src/app/pages/about/agency/data'
import { initAOS } from 'src/app/utils/init-aos'

@Component({
  selector: 'business-consulting-ceo',
  standalone: true,
  imports: [],
  templateUrl: './ceo.component.html',
  styles: ``,
})
export class CeoComponent implements AfterViewInit {
  allSteps: StepType[] = stepsToSuccess

  ngAfterViewInit(): void {
    initAOS()
  }
}
