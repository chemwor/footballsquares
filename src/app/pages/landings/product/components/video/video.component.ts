import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { ProductFeatureType, productFeatures } from '../../data'
import { DomSanitizer } from '@angular/platform-browser'
import { CommonModule } from '@angular/common'
import { LightboxModule, Lightbox } from 'ngx-lightbox'

@Component({
  selector: 'product-video',
  standalone: true,
  imports: [LightboxModule, CommonModule],
  templateUrl: './video.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class VideoComponent implements OnInit {
  productData: ProductFeatureType[] = productFeatures
  constructor(
    private sanitizer: DomSanitizer,
    public lightbox: Lightbox
  ) {}

  ngOnInit(): void {
    this.productData.forEach((item) => {
      item.sanitizedIcon = this.sanitizer.bypassSecurityTrustHtml(item.icons)
    })
  }

  album = [
    {
      src: 'assets/img/landing/product/video-cover.jpg',
      thumb: 'assets/img/landing/product/video-cover.jpg',
      caption: '',
    },
  ]

  open(index: number) {
    this.lightbox.open(this.album, index, { isVideo: true })
  }
}
