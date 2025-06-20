import { Component } from '@angular/core'
import { SaasFeatureType, saasFeature } from '../../data'
import { LightboxModule, Lightbox } from 'ngx-lightbox'

@Component({
  selector: 'saas1-features',
  standalone: true,
  imports: [LightboxModule],
  templateUrl: './features.component.html',
})
export class FeaturesComponent {
  saasFeatureData: SaasFeatureType[] = saasFeature

  constructor(public lightbox: Lightbox) {}
  album = [
    {
      src: 'assets/img/landing/saas-1/features/01-light.png',
      thumb: 'assets/img/landing/saas-1/features/01-light.png',
      caption: '',
    },
  ]

  open(index: number) {
    this.lightbox.open(this.album, index, { isVideo: true })
  }
}
