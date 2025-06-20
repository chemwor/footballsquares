import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { register } from 'swiper/element'
import { Pagination } from 'swiper/modules'
import { SwiperOptions } from 'swiper/types'
import { ServiceTestimonialType, servicesTestimonial } from '../../data'
register()

@Component({
  selector: 'service-v1-testimonial',
  standalone: true,
  imports: [SwiperDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './testimonial.component.html',
  styles: ``,
})
export class TestimonialComponent {
  servicesTestimonial: ServiceTestimonialType = servicesTestimonial

  swiperConfig: SwiperOptions = {
    modules: [Pagination],
    spaceBetween: 24,
    loop: true,
    autoHeight: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      '576': { slidesPerView: 2 },
      '992': { slidesPerView: 3 },
    },
  }
}
