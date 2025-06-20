import {
  AfterViewInit,
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { SwiperOptions } from 'swiper/types'
// import function to register Swiper custom elements
import { SwiperContainer, register } from 'swiper/element/bundle'
import { heroSwiper, HeroType } from '../../data'
import { EffectCreative, Pagination, Thumbs } from 'swiper/modules'
import { CommonModule } from '@angular/common'
// register Swiper custom elements
register()
@Component({
  selector: 'conference-hero',
  standalone: true,
  imports: [SwiperDirective, CommonModule],
  templateUrl: './hero.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements AfterViewInit {
  heroSwiper: HeroType[] = heroSwiper
  constructor(private elementRef: ElementRef) {}
  @ViewChild('swiper') swiper!: ElementRef<SwiperContainer>
  @ViewChild('swiperThumbs') swiperThumbs!: ElementRef<SwiperContainer>

  // thumbsContainer =
  //   this.elementRef.nativeElement.querySelector('.swiper-thumbnail');
  index = 0
  thumbnailImages = [
    'assets/img/landing/conference/hero/th01.jpg',
    'assets/img/landing/conference/hero/th02.jpg',
    'assets/img/landing/conference/hero/th03.jpg',
    // Add more thumbnail images as needed
  ]

  swiperConfig: SwiperOptions = {
    modules: [EffectCreative],
    effect: 'creative',
    loop: true,
    allowTouchMove: false,
    speed: 450,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    creativeEffect: {
      prev: {
        translate: ['-102%', 0, -1],
      },
      next: {
        translate: ['100%', 0, 0],
      },
    },
    thumbs: {
      swiper: '#thumbnails',
    },
  }

  swiperThumbsConfig: SwiperOptions = {
    spaceBetween: 10,
    slidesPerView: 3,
    loop: true,
    autoplay: true,
  }

  ngAfterViewInit(): void {
    if (this.swiper && this.swiper.nativeElement) {
      this.swiper.nativeElement.swiper.activeIndex = this.index
    }
  }

  slideChange(swiper: any) {
    this.index = swiper.detail[0].activeIndex
  }
}
