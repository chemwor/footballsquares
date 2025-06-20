import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { SwiperOptions } from 'swiper/types'
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'
import { Pagination } from 'swiper/modules'
import { businessTestimonial, BusinessTestimonialType } from '../../data'

register()
@Component({
  selector: 'business-consulting-testimonials',
  standalone: true,
  imports: [SwiperDirective],
  templateUrl: './testimonials.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent {
  testimonial: BusinessTestimonialType = businessTestimonial

  swiperConfig: SwiperOptions = {
    modules: [Pagination],
    spaceBetween: 24,
    loop: true,
    autoHeight: true,
    pagination: {
      el: '#swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      '576': { slidesPerView: 2 },
      '992': { slidesPerView: 3 },
    },
  }
}
