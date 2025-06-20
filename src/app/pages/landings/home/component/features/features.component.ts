import { Component } from '@angular/core'
import { FeatureType, homeFeatures } from '../../data'

@Component({
  selector: 'home-features',
  standalone: true,
  imports: [],
  templateUrl: './features.component.html',
  styles: ``,
})
export class FeaturesComponent {
  featuresData: FeatureType[] = homeFeatures
}
