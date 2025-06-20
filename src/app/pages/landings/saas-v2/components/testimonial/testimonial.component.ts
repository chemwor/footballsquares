import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { SwiperOptions } from 'swiper/types'
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'
import { TestimonialType, testimonials } from './data'
import { Navigation } from 'swiper/modules'
// register Swiper custom elements
register()
@Component({
  selector: 'saas-v2-testimonial',
  standalone: true,
  imports: [SwiperDirective],
  templateUrl: './testimonial.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TestimonialComponent {
  testimonialSwiper: TestimonialType[] = testimonials
  swiperConfig: SwiperOptions = {
    modules: [Navigation],
    spaceBetween: 30,
    loop: true,
    navigation: {
      prevEl: '#prev-testimonial',
      nextEl: '#next-testimonial',
    },
  }
}
