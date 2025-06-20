import { AfterViewInit, Component } from '@angular/core'
import { FeatureInfluenceType, featuresInfluenceData } from '../../data'
import { initAOS } from 'src/app/utils/init-aos'

@Component({
  selector: 'influencer-features',
  standalone: true,
  imports: [],
  templateUrl: './features.component.html',
  styles: ``,
})
export class FeaturesComponent implements AfterViewInit {
  featuresInfluencesData: FeatureInfluenceType[] = featuresInfluenceData

  ngAfterViewInit(): void {
    initAOS()
  }
}
