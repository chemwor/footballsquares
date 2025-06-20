import { Component } from '@angular/core'
import { JarallaxDirective } from '@components/jarallax-directive/jarallax-directive.component'
import type { JarallaxOptions } from 'jarallax'
import { LightboxModule, Lightbox } from 'ngx-lightbox'

@Component({
  selector: 'coworking-space-video',
  standalone: true,
  imports: [JarallaxDirective, LightboxModule],
  templateUrl: './video.component.html',
})
export class VideoComponent {
  jarallaxConfig: JarallaxOptions = {
    speed: 0.6,
  }

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
