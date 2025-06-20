import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core'
import { SwiperOptions } from 'swiper/types'

// import function to register Swiper custom elements
import { SwiperContainer } from 'swiper/element/bundle'
import {
  contentBinded,
  ContentBindedtype,
  portfolioSingle2,
  PortfolioSingle2Types,
} from '../../data'
import { CommonModule } from '@angular/common'
import { initBindSwiper } from '@helpers/swiper'

@Component({
  selector: 'single2-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent {
  portfolioSingle2Data: PortfolioSingle2Types[] = portfolioSingle2
  contentBindedData: ContentBindedtype[] = contentBinded

  @ViewChild('testimonialSwiper')
  testimonialSwiper!: ElementRef<SwiperContainer>

  portfolioTestimonialConfig: SwiperOptions = {
    spaceBetween: 40,
    loop: true,
    autoHeight: true,
    pagination: {
      el: '.testimonials-count',
      type: 'fraction',
    },
    navigation: {
      prevEl: '#prev-testimonial',
      nextEl: '#next-testimonial',
    },
  }

  ngAfterViewInit(): void {
    initBindSwiper(
      this.testimonialSwiper.nativeElement,
      this.portfolioTestimonialConfig
    )
  }
}
