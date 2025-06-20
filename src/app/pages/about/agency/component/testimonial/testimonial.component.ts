import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core'
import { SwiperContainer } from 'swiper/element'
import { Pagination } from 'swiper/modules'
import { Swiper, SwiperOptions } from 'swiper/types'
import {
  testimonialSwiperData,
  SwiperType,
  testimonialSwiper,
  TestimonialSwiperType,
} from '../../data'
import { initBindSwiper } from '@helpers/swiper'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'about-agency-testimonial',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.scss'],
})
export class TestimonialComponent implements AfterViewInit {
  swiperContent: SwiperType[] = testimonialSwiperData
  testimonialSwiperData: TestimonialSwiperType[] = testimonialSwiper
  thumbsSwiper: Swiper | null = null

  @ViewChild('testimonialSwipers')
  testimonialSwipers!: ElementRef<SwiperContainer>

  swiperConfig: SwiperOptions = {
    modules: [Pagination],
    pagination: {
      el: '#testimonials-bullets',
      clickable: true,
    },
    speed: 1000,
    spaceBetween: 10,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    loop: true,
    thumbs: {
      swiper: this.thumbsSwiper,
    },
  }

  ngAfterViewInit(): void {
    initBindSwiper(this.testimonialSwipers.nativeElement, this.swiperConfig)
  }
}
