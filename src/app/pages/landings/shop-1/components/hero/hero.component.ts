import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { SwiperOptions } from 'swiper/types'
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'
import { ProductType, products } from '../../data'
import { currency } from 'src/app/states/constants'
import { JarallaxDirective } from '@components/jarallax-directive/jarallax-directive.component'
// register Swiper custom elements
import type { JarallaxOptions } from 'jarallax'
import { RouterModule } from '@angular/router'
import { Navigation } from 'swiper/modules'

register()
@Component({
  selector: 'shop-1-hero',
  standalone: true,
  imports: [SwiperDirective, JarallaxDirective, RouterModule],
  templateUrl: './hero.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeroComponent {
  jarallaxConfig: JarallaxOptions = {
    speed: 0.7,
  }
  productSwiper: ProductType[] = products
  selectedCurrency = currency
  swiperConfig: SwiperOptions = {
    modules: [Navigation],
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    navigation: {
      prevEl: '#popular-prev',
      nextEl: '#popular-next',
    },
    breakpoints: {
      '500': {
        slidesPerView: 2,
      },
      '860': {
        slidesPerView: 3,
      },
      '1200': {
        slidesPerView: 4,
      },
    },
  }
}
