import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { SwiperOptions } from 'swiper/types'
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'
import { TopAuthorBlogType, topAuthorBlog } from '../../data'
import { Navigation } from 'swiper/modules'
// register Swiper custom elements
register()

@Component({
  selector: 'blog-authors',
  standalone: true,
  imports: [SwiperDirective],
  templateUrl: './authors.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthorsComponent {
  topAuthorBlogData: TopAuthorBlogType[] = topAuthorBlog

  swiperConfig: SwiperOptions = {
    modules: [Navigation],
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    navigation: {
      prevEl: '#prev-author',
      nextEl: '#next-author',
    },
    breakpoints: {
      '576': {
        slidesPerView: 2,
      },
      '1000': {
        slidesPerView: 3,
      },
      '1400': {
        slidesPerView: 'auto',
      },
    },
  }
}
