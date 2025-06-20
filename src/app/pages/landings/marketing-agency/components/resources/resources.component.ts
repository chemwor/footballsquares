import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { SwiperOptions } from 'swiper/types'
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'
import { resourcesData, ResourceType } from '../../data'
import { Pagination } from 'swiper/modules'
// register Swiper custom elements
register()
@Component({
  selector: 'marketing-agency-resources',
  standalone: true,
  imports: [SwiperDirective],
  templateUrl: './resources.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ResourcesComponent {
  resourseData: ResourceType[] = resourcesData
  swiperConfig: SwiperOptions = {
    modules: [Pagination],
    spaceBetween: 24,
    pagination: {
      el: '#resoursepagination',
      clickable: true,
    },
    breakpoints: {
      '576': { slidesPerView: 2 },
      '992': { slidesPerView: 3 },
    },
  }
}
