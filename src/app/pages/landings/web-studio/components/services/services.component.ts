import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { SwiperOptions } from 'swiper/types'
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'
import { WebStudioServiceType, webStudioServices } from '../../data'
import { DomSanitizer } from '@angular/platform-browser'
import { Pagination } from 'swiper/modules'
// register Swiper custom elements
register()
@Component({
  selector: 'web-studio-services',
  standalone: true,
  imports: [SwiperDirective],
  templateUrl: './services.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ServicesComponent implements OnInit {
  allwebServicesdata: WebStudioServiceType[] = webStudioServices

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
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.allwebServicesdata = this.allwebServicesdata.map((item) => {
      return {
        ...item,
        sanitizedIcon: this.sanitizer.bypassSecurityTrustHtml(item.icon),
      }
    })
  }
}
