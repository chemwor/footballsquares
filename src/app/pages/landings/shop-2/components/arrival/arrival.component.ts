import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { SwiperOptions } from 'swiper/types'
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'
import { arrival, ArrivalType } from '../../data'
import { currency } from 'src/app/states/constants'
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap'
import { Navigation } from 'swiper/modules'
// register Swiper custom elements
register()
@Component({
  selector: 'shop2-arrival',
  standalone: true,
  imports: [SwiperDirective, NgbTooltipModule],
  templateUrl: './arrival.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ArrivalComponent {
  arrivalData: ArrivalType[] = arrival
  selectedCurrency = currency

  swiperConfig: SwiperOptions = {
    modules: [Navigation],
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    navigation: {
      prevEl: '#new-prev',
      nextEl: '#new-next',
    },
    breakpoints: {
      '500': {
        slidesPerView: 2,
      },
      '768': {
        slidesPerView: 3,
      },
    },
  }
}
