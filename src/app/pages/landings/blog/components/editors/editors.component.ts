import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { SwiperOptions } from 'swiper/types'
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'
import { EditorsType, editorsData } from '../../data'
import { RouterModule } from '@angular/router'
import { Pagination } from 'swiper/modules'
// register Swiper custom elements
register()

@Component({
  selector: 'blog-editors',
  standalone: true,
  imports: [SwiperDirective, RouterModule],
  templateUrl: './editors.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class EditorsComponent {
  editorsData: EditorsType[] = editorsData

  swiperConfig: SwiperOptions = {
    modules: [Pagination],
    spaceBetween: 24,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      '576': { slidesPerView: 2 },
      '992': { slidesPerView: 3 },
    },
  }
}
