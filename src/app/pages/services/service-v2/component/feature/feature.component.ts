import { Component } from '@angular/core'
import { approach, ApproachType } from '../../data'

@Component({
  selector: 'service-v2-feature',
  standalone: true,
  imports: [],
  templateUrl: './feature.component.html',
  styles: ``,
})
export class FeatureComponent {
  allFeatureData: ApproachType[] = approach
}
