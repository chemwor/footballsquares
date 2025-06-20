import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { SwiperOptions } from 'swiper/types'
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'
import { influenceGuides, GuidesType } from '../../data'
import { currency } from 'src/app/states/constants'
import { Pagination } from 'swiper/modules'
// register Swiper custom elements
register()
@Component({
  selector: 'influencer-guides',
  standalone: true,
  imports: [SwiperDirective],
  templateUrl: './guides.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GuidesComponent {
  allGuide: GuidesType[] = influenceGuides
  selectedCurrency = currency
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
