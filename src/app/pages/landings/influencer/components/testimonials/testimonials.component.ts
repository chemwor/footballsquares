import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core'
import { SwiperOptions } from 'swiper/types'
import { SwiperContainer } from 'swiper/element/bundle'
import { influenceTestimonial, InfluenceTestimonialType } from '../../data'
import { initBindSwiper } from '@helpers/swiper'
import { Navigation, Pagination } from 'swiper/modules'

@Component({
  selector: 'influencer-testimonials',
  standalone: true,
  imports: [],
  templateUrl: './testimonials.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent implements AfterViewInit {
  allInfluenceTestimonial: InfluenceTestimonialType[] = influenceTestimonial

  @ViewChild('influenceTestimonial')
  influenceTestimonial!: ElementRef<SwiperContainer>

  swiperConfig: SwiperOptions = {
    modules: [Navigation, Pagination],
    spaceBetween: 30,
    loop: true,
    slidesPerView: 1,
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
    initBindSwiper(this.influenceTestimonial.nativeElement, this.swiperConfig)
  }
}
