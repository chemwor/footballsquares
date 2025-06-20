import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { LightboxModule, Lightbox } from 'ngx-lightbox'
import { register } from 'swiper/element'
import { Autoplay, Pagination } from 'swiper/modules'
import { SwiperOptions } from 'swiper/types'

register()
@Component({
  selector: 'yoga-studio-hero',
  standalone: true,
  imports: [SwiperDirective, LightboxModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
  slider = [
    'assets/img/landing/yoga-studio/hero/01.jpg',
    'assets/img/landing/yoga-studio/hero/02.jpg',
    'assets/img/landing/yoga-studio/hero/03.jpg',
  ]

  swiperConfig: SwiperOptions = {
    modules: [Pagination, Autoplay],
    effect: 'fade',
    speed: 800,
    autoplay: {
      delay: 7000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '#swiper-pagination',
      clickable: true,
    },
  }
  constructor(public lightbox: Lightbox) {}
  album = [
    {
      src: 'assets/img/landing/saas-1/features/01-light.png',
      thumb: 'assets/img/landing/saas-1/features/01-light.png',
      caption: '',
    },
  ]

  open(index: number) {
    this.lightbox.open(this.album, index, { isVideo: true })
  }
}
