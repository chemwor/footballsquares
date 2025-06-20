import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { SwiperOptions } from 'swiper/types'
import { register } from 'swiper/element/bundle'
import { industriesDta, IndustriesType } from '../../data'
import { Pagination } from 'swiper/modules'
register()
@Component({
  selector: 'business-consulting-industries',
  standalone: true,
  imports: [SwiperDirective],
  templateUrl: './industries.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class IndustriesComponent {
  allIndustriesData: IndustriesType[] = industriesDta
  swiperConfig: SwiperOptions = {
    modules: [Pagination],
    spaceBetween: 24,
    pagination: {
      el: '#pagination',
      clickable: true,
    },
    breakpoints: {
      '576': { slidesPerView: 2 },
      '992': { slidesPerView: 3 },
    },
  }
}
