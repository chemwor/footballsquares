import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { SwiperOptions } from 'swiper/types'
import { marqueeSwiper, SwiperType } from '../../data'

@Component({
  selector: 'creative-agency-clients',
  standalone: true,
  imports: [SwiperDirective],
  templateUrl: './clients.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: ``,
})
export class ClientsComponent {
  marqueeSwiper: SwiperType[] = marqueeSwiper

  firstSwiper: SwiperOptions = {
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
      '0': { slidesPerView: 2 },
      '600': { slidesPerView: 3 },
      '800': { slidesPerView: 4 },
      '1200': { slidesPerView: 5 },
      '1400': { slidesPerView: 6 },
      '1600': { slidesPerView: 7 },
    },
  }

  secondSwiper: SwiperOptions = {
    loop: true,
    grabCursor: false,
    centeredSlides: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    freeMode: true,
    speed: 8500,
    breakpoints: {
      '0': { slidesPerView: 2 },
      '600': { slidesPerView: 3 },
      '800': { slidesPerView: 4 },
      '1200': { slidesPerView: 5 },
      '1400': { slidesPerView: 6 },
      '1600': { slidesPerView: 7 },
    },
  }
}
