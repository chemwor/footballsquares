import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { SwiperOptions } from 'swiper/types'
import { ClientType, clients } from '../../data'

@Component({
  selector: 'business-consulting-clients',
  standalone: true,
  imports: [SwiperDirective],
  templateUrl: './clients.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ClientsComponent {
  allClientData: ClientType[] = clients

  firstSwiper: SwiperOptions = {
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
      '0': { slidesPerView: 2 },
      '400': { slidesPerView: 3 },
      '600': { slidesPerView: 4 },
      '800': { slidesPerView: 5 },
      '1200': { slidesPerView: 6 },
      '1400': { slidesPerView: 7 },
      '1600': { slidesPerView: 8 },
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
    speed: 8500,
    breakpoints: {
      '0': { slidesPerView: 2 },
      '400': { slidesPerView: 3 },
      '600': { slidesPerView: 4 },
      '800': { slidesPerView: 5 },
      '1200': { slidesPerView: 6 },
      '1400': { slidesPerView: 7 },
      '1600': { slidesPerView: 8 },
    },
  }
}
