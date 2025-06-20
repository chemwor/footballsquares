import { CommonModule } from '@angular/common'
import {
  Component,
  ViewChild,
  type AfterViewInit,
  type ElementRef,
} from '@angular/core'
import type { SwiperOptions } from 'swiper/types'
import type { SwiperContainer } from 'swiper/element'
import { initBindSwiper } from '@helpers/swiper'
import {
  bindedTestimonial,
  testimonialQuotes,
  TestimonialSwiperType,
  testimonialType,
} from '../../data'
import { Pagination } from 'swiper/modules'

@Component({
  selector: 'marketing-agency-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.scss'],
})
export class TestimonialsComponent implements AfterViewInit {
  testimonialSwiper: TestimonialSwiperType[] = testimonialQuotes
  bindedTestimonial: testimonialType[] = bindedTestimonial

  @ViewChild('FeedbackSwiper')
  FeedbackSwiper!: ElementRef<SwiperContainer>

  clientsFeedbackSwiperConfig: SwiperOptions = {
    modules: [Pagination],
    spaceBetween: 40,
    loop: true,
    pagination: {
      el: '#testimonials-bullets',
      clickable: true,
    },
  }
  ngAfterViewInit(): void {
    initBindSwiper(
      this.FeedbackSwiper.nativeElement,
      this.clientsFeedbackSwiperConfig
    )
  }
}
