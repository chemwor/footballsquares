import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  type ElementRef,
  ViewChild,
} from '@angular/core'
import { SwiperOptions } from 'swiper/types'
import { type SwiperContainer } from 'swiper/element/bundle'
import { FeatureSwiperType, featureSwiper } from '../../data'
import { initBindSwiper } from '@helpers/swiper'
import { Navigation } from 'swiper/modules'

@Component({
  selector: 'mobile-showcase-features',
  standalone: true,
  imports: [],
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FeaturesComponent implements AfterViewInit {
  featureSwiperData: FeatureSwiperType[] = featureSwiper

  @ViewChild('testimonialFeedbackSwiper')
  testimonialFeedbackSwiper!: ElementRef<SwiperContainer>

  // swiper option
  featureSwiperConfig: SwiperOptions = {
    modules: [Navigation],
    spaceBetween: 30,
    autoHeight: true,
    navigation: {
      prevEl: '#prev-feature',
      nextEl: '#next-feature',
    },
  }

  ngAfterViewInit(): void {
    initBindSwiper(
      this.testimonialFeedbackSwiper.nativeElement,
      this.featureSwiperConfig
    )
  }
}
