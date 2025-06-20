import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { SwiperOptions } from 'swiper/types'
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'
import { featuresData, FeaturesType } from '../../data'
import { DomSanitizer } from '@angular/platform-browser'
import { Pagination } from 'swiper/modules'
// register Swiper custom elements
register()
@Component({
  selector: 'shop-1-features',
  standalone: true,
  imports: [SwiperDirective],
  templateUrl: './features.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FeaturesComponent {
  allfeatures!: FeaturesType[]
  swiperConfig: SwiperOptions = {
    modules: [Pagination],
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: {
      el: '#feature-pagination',
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

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.allfeatures = featuresData
    this.allfeatures.forEach((item) => {
      item.sanitizedIcon = this.sanitizer.bypassSecurityTrustHtml(item.icon)
    })
  }
}
