import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core'
import { SwiperOptions } from 'swiper/types'
import { counterData, CounterType } from '../../data'
import { currency } from 'src/app/states/constants'
import { SwiperContainer } from 'swiper/element'
import { initBindSwiper } from '@helpers/swiper'
import { initAOS } from 'src/app/utils/init-aos'
import { Navigation, Pagination } from 'swiper/modules'
@Component({
  selector: 'marketing-agency-case-studies',
  standalone: true,
  imports: [],
  templateUrl: './case-studies.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrls: ['./case-studies.component.scss'],
})
export class CaseStudiesComponent implements AfterViewInit {
  counterData: CounterType[] = counterData
  selectedCurrency = currency

  @ViewChild('testimonialSwipers')
  testimonialSwipers!: ElementRef<SwiperContainer>

  swiperConfig: SwiperOptions = {
    modules: [Pagination, Navigation],
    spaceBetween: 40,
    autoHeight: true,
    pagination: {
      el: '#slides-count',
      type: 'fraction',
    },
    navigation: {
      prevEl: '#prev-case-study',
      nextEl: '#next-case-study',
    },
  }

  ngAfterViewInit(): void {
    initAOS()
    initBindSwiper(this.testimonialSwipers.nativeElement, this.swiperConfig)
  }
}
