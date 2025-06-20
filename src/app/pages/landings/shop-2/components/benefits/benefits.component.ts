import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { SwiperOptions } from 'swiper/types'
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'
import { features, FeaturesType } from '../../data'
import { Pagination } from 'swiper/modules'
// register Swiper custom elements
register()
@Component({
  selector: 'shop2-benefits',
  standalone: true,
  imports: [SwiperDirective],
  templateUrl: './benefits.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BenefitsComponent {
  benefit: FeaturesType[] = features

  swiperConfig: SwiperOptions = {
    modules: [Pagination],
    spaceBetween: 32,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      '460': { slidesPerView: 2 },
      '700': { slidesPerView: 3 },
      '992': { slidesPerView: 4 },
    },
  }
}
