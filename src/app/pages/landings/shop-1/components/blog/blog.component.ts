import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { SwiperOptions } from 'swiper/types'
import { register } from 'swiper/element/bundle'
import { blogData, BlogType } from '../../data'
import { Pagination } from 'swiper/modules'
register()
@Component({
  selector: 'shop-1-blog',
  standalone: true,
  imports: [SwiperDirective],
  templateUrl: './blog.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BlogComponent {
  allBlogData: BlogType[] = blogData
  swiperConfig: SwiperOptions = {
    modules: [Pagination],
    slidesPerView: 1,
    spaceBetween: 24,
    pagination: {
      el: '#swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      '500': {
        slidesPerView: 2,
      },
      '991': {
        slidesPerView: 3,
      },
    },
  }
}
