import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { Component } from '@angular/core'
import { SwiperOptions } from 'swiper/types'
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'
import { Pagination } from 'swiper/modules'
// register Swiper custom elements
register()
@Component({
  selector: 'mobile-showcase-logos',
  standalone: true,
  imports: [SwiperDirective],
  templateUrl: './logos.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LogosComponent {
  swiperConfig: SwiperOptions = {
    modules: [Pagination],
    slidesPerView: 2,
    spaceBetween: 24,
    pagination: {
      el: '#logo-pagination',
      clickable: true,
    },
    breakpoints: {
      '500': {
        slidesPerView: 3,
      },
      '750': {
        slidesPerView: 4,
      },
      '1000': {
        slidesPerView: 5,
      },
      '1200': {
        slidesPerView: 6,
      },
    },
  }
}
