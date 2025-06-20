import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { SwiperOptions } from 'swiper/types'
import { register } from 'swiper/element/bundle'
import { Pagination } from 'swiper/modules'
register()

@Component({
  selector: 'mobile-showcase-testimonial',
  standalone: true,
  imports: [SwiperDirective],
  templateUrl: './testimonial.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TestimonialComponent {
  swiperConfig: SwiperOptions = {
    modules: [Pagination],
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    pagination: {
      el: '#swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      '800': {
        slidesPerView: 2,
      },
    },
  }
}
