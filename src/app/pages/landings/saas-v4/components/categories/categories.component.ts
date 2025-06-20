import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { SwiperOptions } from 'swiper/types'
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'
import { CategorySlideType, categotySlides } from '../../data'
import { Pagination } from 'swiper/modules'
// register Swiper custom elements
register()
@Component({
  selector: 'saas-v4-categories',
  standalone: true,
  imports: [SwiperDirective],
  templateUrl: './categories.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CategoriesComponent {
  categortData: CategorySlideType[] = categotySlides
  swiperConfig: SwiperOptions = {
    modules: [Pagination],
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      '560': {
        slidesPerView: 2,
      },
      '960': {
        slidesPerView: 3,
      },
    },
  }
}
