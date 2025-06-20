import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { SwiperOptions } from 'swiper/types'
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'
import { attendance, AttendanceType } from '../../data'
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap'
import { CommonModule } from '@angular/common'
import { Autoplay, FreeMode } from 'swiper/modules'
// register Swiper custom elements
register()
@Component({
  selector: 'conference-testimonials',
  standalone: true,
  imports: [CommonModule, SwiperDirective, NgbRatingModule],
  templateUrl: './testimonials.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TestimonialsComponent {
  attendanceData: AttendanceType[] = attendance

  swiperConfig: SwiperOptions = {
    modules: [Autoplay, FreeMode],
    spaceBetween: 24,
    loop: true,
    grabCursor: false,
    centeredSlides: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    freeMode: true,
    speed: 10000,
    breakpoints: {
      '0': { slidesPerView: 1 },
      '500': { slidesPerView: 2 },
      '900': { slidesPerView: 3 },
      '1300': { slidesPerView: 4 },
      '1600': { slidesPerView: 5 },
    },
  }

  secondSwiper: SwiperOptions = {
    spaceBetween: 24,
    loop: true,
    grabCursor: false,
    centeredSlides: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    freeMode: true,
    speed: 10000,
    breakpoints: {
      '0': { slidesPerView: 1 },
      '500': { slidesPerView: 2 },
      '900': { slidesPerView: 3 },
      '1300': { slidesPerView: 4 },
      '1600': { slidesPerView: 5 },
    },
  }

  ariaValueText(current: number, max: number) {
    return `${current} out of ${max} hearts`
  }
}
