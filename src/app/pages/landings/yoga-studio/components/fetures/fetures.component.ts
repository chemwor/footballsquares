import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { SwiperOptions } from 'swiper/types'
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'
import { advantages, AdvantagesType } from '../../data'
import { Navigation } from 'swiper/modules'
// register Swiper custom elements
register()
@Component({
  selector: 'yoga-studio-fetures',
  standalone: true,
  imports: [SwiperDirective],
  templateUrl: './fetures.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FeturesComponent {
  yogaFeatures: AdvantagesType[] = advantages
  swiperConfig: SwiperOptions = {
    modules: [Navigation],
    slidesPerView: 'auto',
    spaceBetween: 24,
    loop: true,
    navigation: {
      prevEl: '#prev-feature',
      nextEl: '#next-feature',
    },
  }
}
