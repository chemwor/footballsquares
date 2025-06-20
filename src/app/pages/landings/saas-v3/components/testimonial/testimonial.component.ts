import { AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { SwiperOptions } from 'swiper/types'
import { register } from 'swiper/element/bundle'
import { SaasV3TestimonialType, saasv3Testimonial } from '../../data'
import { CommonModule } from '@angular/common'
import { initAOS } from 'src/app/utils/init-aos'
import { Navigation, Pagination } from 'swiper/modules'
import { EffectFade } from 'swiper/modules'
register()
@Component({
  selector: 'saas-v3-testimonial',
  standalone: true,
  imports: [SwiperDirective, CommonModule],
  templateUrl: './testimonial.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TestimonialComponent implements AfterViewInit {
  avatarsTestimonial: SaasV3TestimonialType = saasv3Testimonial

  ngAfterViewInit(): void {
    initAOS()
  }

  swiperConfig: SwiperOptions = {
    modules: [Pagination, Navigation, EffectFade],
    effect: 'fade',
    loop: true,
    pagination: {
      el: '.testimonials-count',
      type: 'fraction',
    },
    navigation: {
      prevEl: '#prev-testimonial',
      nextEl: '#next-testimonial',
    },
  }
}
