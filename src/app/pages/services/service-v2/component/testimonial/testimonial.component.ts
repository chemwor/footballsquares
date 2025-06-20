import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core'
import { SwiperContainer } from 'swiper/element'
import { SwiperOptions } from 'swiper/types'
import {
  ContentBindedtype,
  PortfolioSingle2Types,
  contentBinded,
  portfolioSingle2,
} from '../../data'
import { CommonModule } from '@angular/common'
import { initBindSwiper } from '@helpers/swiper'
import { Navigation, Pagination } from 'swiper/modules'

@Component({
  selector: 'service-v2-testimonial',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss'],
})
export class TestimonialComponent implements AfterViewInit {
  testimonialSwiper: PortfolioSingle2Types[] = portfolioSingle2
  contentBinded: ContentBindedtype[] = contentBinded

  @ViewChild('serviceTestimonial')
  serviceTestimonial!: ElementRef<SwiperContainer>

  serviceSwiperConfig: SwiperOptions = {
    modules: [Navigation, Pagination],
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
      this.serviceTestimonial.nativeElement,
      this.serviceSwiperConfig
    )
  }
}
