import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { register } from 'swiper/element/bundle'
import { SwiperOptions } from 'swiper/types'
import { featuresData, FeaturesType } from '../../data'
import { DomSanitizer } from '@angular/platform-browser'
import { Pagination } from 'swiper/modules'
register()

@Component({
  selector: 'single-features',
  standalone: true,
  imports: [SwiperDirective],
  templateUrl: './features.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FeaturesComponent implements OnInit {
  shopFeatures: FeaturesType[] = featuresData
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.shopFeatures = this.shopFeatures.map((item) => {
      return {
        ...item,
        sanitizedIcon: this.sanitizer.bypassSecurityTrustHtml(item.icon),
      }
    })
  }

  swiperConfig: SwiperOptions = {
    modules: [Pagination],
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      '400': {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      '700': {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      '991': {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    },
  }
}
