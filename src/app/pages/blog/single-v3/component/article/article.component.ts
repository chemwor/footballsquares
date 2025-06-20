import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SwiperDirective } from '@components/swiper-directive.component'
import { register } from 'swiper/element'
import { Navigation } from 'swiper/modules'
import { SwiperOptions } from 'swiper/types'
register()

@Component({
  selector: 'single-3-article',
  standalone: true,
  imports: [SwiperDirective, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './article.component.html',
  styles: ``,
})
export class ArticleComponent {
  swiperConfig: SwiperOptions = {
    modules: [Navigation],
    spaceBetween: 24,
    loop: true,
    autoHeight: true,
    navigation: {
      prevEl: '#prev-post',
      nextEl: '#next-post',
    },
    breakpoints: {
      '576': { slidesPerView: 2 },
      '1000': { slidesPerView: 3 },
    },
  }

  swiper = [
    {
      title:
        'The fashion for eco bags with vintage prints will still be relevant for more than one year',
      image: 'assets/img/blog/list/01.jpg',
      link: '/blog/post-2',
    },
    {
      title:
        'How to look for inspiration for new goals in life and remember to give yourself a break?',
      image: 'assets/img/blog/list/04.jpg',
      link: '/blog/post-3',
    },
    {
      title:
        'A session with a psychologist as a personal choice or a fashion trend in society',
      image: 'assets/img/blog/list/06.jpg',
      link: '/blog/post-2',
    },
    {
      title: 'Top 10 best TV shows on Netflix for your next weekend',
      image: 'assets/img/blog/list/05.jpg',
      link: '/blog/post-3',
    },
  ]
}
