import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { SwiperOptions } from 'swiper/types'
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'
import { swiperSlides, SwiperType } from '../../data'
import { Pagination } from 'swiper/modules'
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap'
// register Swiper custom elements
register()
@Component({
  selector: 'saas1-reviews',
  standalone: true,
  imports: [SwiperDirective, NgbRatingModule],
  templateUrl: './reviews.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReviewsComponent {
  saasReview: SwiperType[] = swiperSlides

  swiperConfig: SwiperOptions = {
    modules: [Pagination],
    spaceBetween: 24,
    pagination: {
      el: '#reveiw-pagination',
      clickable: true,
    },
    breakpoints: {
      '500': { slidesPerView: 2 },
      '992': { slidesPerView: 3 },
    },
  }
}
