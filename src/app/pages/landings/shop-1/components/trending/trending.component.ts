import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { SwiperOptions } from 'swiper/types'
// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle'
import { TrendingProductType, trendingProducts } from '../../data'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
import { currency } from 'src/app/states/constants'
import { NgbTooltip, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap'
import { Navigation } from 'swiper/modules'
// register Swiper custom elements
register()
@Component({
  selector: 'shop-1-trending',
  standalone: true,
  imports: [SwiperDirective, RouterModule, CommonModule, NgbTooltipModule],
  templateUrl: './trending.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TrendingComponent {
  trendingProduct: TrendingProductType[] = trendingProducts
  selectedCurrency = currency

  toggleWithGreeting(tooltip: NgbTooltip, greeting: string) {
    if (tooltip.isOpen()) {
      tooltip.close()
    } else {
      tooltip.open({ greeting })
    }
  }

  swiperConfig: SwiperOptions = {
    modules: [Navigation],
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    navigation: {
      prevEl: '#trending-prev',
      nextEl: '#trending-next',
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
