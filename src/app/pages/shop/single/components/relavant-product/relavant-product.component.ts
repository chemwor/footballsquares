import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { SwiperOptions } from 'swiper/types'
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'
import { relavantData, RelavantType } from '../../data'
import { currency } from 'src/app/states/constants'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap'
import { Navigation } from 'swiper/modules'
// register Swiper custom elements
register()

@Component({
  selector: 'single-relavant-product',
  standalone: true,
  imports: [SwiperDirective, CommonModule, RouterModule, NgbTooltipModule],
  templateUrl: './relavant-product.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class RelavantProductComponent {
  allRelavantData: RelavantType[] = relavantData
  selectedCurrency = currency

  swiperConfig: SwiperOptions = {
    modules: [Navigation],
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    navigation: {
      prevEl: '#relevant-prev',
      nextEl: '#relevant-next',
    },
    breakpoints: {
      '500': {
        slidesPerView: 2,
      },
      '768': {
        slidesPerView: 3,
      },
      '1000': {
        slidesPerView: 4,
      },
    },
  }
}
