import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { SwiperOptions } from 'swiper/types'
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'
import { CommonModule } from '@angular/common'
import { mostPopularBlog, MostPopularBlogType } from '../../data'
import { RouterModule } from '@angular/router'
// register Swiper custom elements
register()

@Component({
  selector: 'blog-popular-articles',
  standalone: true,
  imports: [SwiperDirective, CommonModule, RouterModule],
  templateUrl: './popular-articles.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PopularArticlesComponent {
  popularinfluence: MostPopularBlogType[] = mostPopularBlog

  swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    navigation: {
      prevEl: '#prev-popular',
      nextEl: '#next-popular',
    },
    breakpoints: {
      '576': {
        slidesPerView: 'auto',
      },
    },
  }
}
