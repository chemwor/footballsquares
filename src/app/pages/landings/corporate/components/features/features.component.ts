import { AfterViewInit, Component } from '@angular/core'
import { professionalApproach, ProfessionalApproachType } from '../../data'
import { initAOS } from 'src/app/utils/init-aos'

@Component({
  selector: 'corporate-features',
  standalone: true,
  imports: [],
  templateUrl: './features.component.html',
  styles: ``,
})
export class FeaturesComponent implements AfterViewInit {
  professionalApproach: ProfessionalApproachType[] = professionalApproach

  ngAfterViewInit(): void {
    initAOS()
  }
  consulting = [
    'Forecasting and recommendations',
    'Segmentation by various methods',
    'Identification of patterns, analysis',
  ]
}
