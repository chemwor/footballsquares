import { Component } from '@angular/core'
import { StepType, stepsToSuccess } from '../../data'

@Component({
  selector: 'agency-about-steps',
  standalone: true,
  imports: [],
  templateUrl: './steps.component.html',
})
export class StepsComponent {
  allSteps: StepType[] = stepsToSuccess
}
