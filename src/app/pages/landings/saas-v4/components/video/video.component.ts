import { Component } from '@angular/core'
import { LightboxModule, Lightbox } from 'ngx-lightbox'

@Component({
  selector: 'saas-v4-video',
  standalone: true,
  imports: [LightboxModule],
  templateUrl: './video.component.html',
})
export class VideoComponent {
  constructor(public lightbox: Lightbox) {}
  album = [
    {
      src: 'assets/img/landing/saas-4/video-cover-light.jpg',
      thumb: 'assets/img/landing/saas-4/video-cover-light.jpg',
      caption: '',
    },
  ]

  open(index: number) {
    this.lightbox.open(this.album, index, { isVideo: true })
  }
}
