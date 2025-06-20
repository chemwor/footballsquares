import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core'
import { SwiperOptions } from 'swiper/types'
import { SwiperContainer } from 'swiper/element/bundle'
import {
  agencyTestimonial,
  AgencyTestimonialType,
  trendingPost,
} from '../../data'
import { initBindSwiper } from '@helpers/swiper'
import { CommonModule } from '@angular/common'
import { Navigation, Pagination } from 'swiper/modules'
@Component({
  selector: 'creative-agency-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrls: ['./testimonial.component.scss'],
})
export class TestimonialsComponent {
  AgencyDataTestimonial: AgencyTestimonialType[] = agencyTestimonial
  trendingData = trendingPost

  @ViewChild('testimonialSwipers')
  testimonialSwipers!: ElementRef<SwiperContainer>

  swiperConfig: SwiperOptions = {
    modules: [Pagination, Navigation],
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
    initBindSwiper(this.testimonialSwipers.nativeElement, this.swiperConfig)
  }
}
