import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { SwiperOptions } from 'swiper/types'
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'
import { portfolioCaseStudies, PortfolioCaseStudiesType } from '../../data'
import { Navigation } from 'swiper/modules'
// register Swiper custom elements
register()
@Component({
  selector: 'single1-projects',
  standalone: true,
  imports: [SwiperDirective],
  templateUrl: './projects.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProjectsComponent {
  portfolioProject: PortfolioCaseStudiesType[] = portfolioCaseStudies

  swiperConfig: SwiperOptions = {
    modules: [Navigation],
    spaceBetween: 24,
    loop: true,
    slidesPerView: 2,
    navigation: {
      prevEl: '#prev-project',
      nextEl: '#next-project',
    },
    breakpoints: {
      425: { slidesPerView: 1 },
      576: { slidesPerView: 2 },
    },
  }
}
