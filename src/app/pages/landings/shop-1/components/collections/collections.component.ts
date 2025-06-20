import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ViewChild,
  type AfterViewInit,
  type ElementRef,
} from '@angular/core'
import type { Swiper as SwiperType, SwiperOptions } from 'swiper/types'
import { RouterModule } from '@angular/router'
import Swiper from 'swiper'
import { currency } from 'src/app/states/constants'
import { type SwiperContainer } from 'swiper/element/bundle'
import { productCollectionData, productCollectionDetailData } from '../../data'
import { initBindSwiper } from '@helpers/swiper'
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'shop-1-collections',
  standalone: true,
  imports: [RouterModule, NgbTooltipModule],
  templateUrl: './collections.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styleUrl: './collections.component.scss',
})
export class CollectionsComponent implements AfterViewInit {
  currency = currency
  productCollectionData = productCollectionData
  productCollectionDetailData = productCollectionDetailData

  thumbnailSwiperInstance?: SwiperType

  @ViewChild('quoteSwiper') quoteSwiper!: ElementRef<SwiperContainer>
  @ViewChild('cardSwiper') cardSwiper!: ElementRef<SwiperContainer>

  ngAfterViewInit(): void {
    const cardSwiperOptions: SwiperOptions = {
      allowTouchMove: false,
      spaceBetween: 40,
      loop: true,
    }

    this.thumbnailSwiperInstance = new Swiper(
      this.cardSwiper.nativeElement,
      cardSwiperOptions
    )

    const productDetailSwiperOptions: SwiperOptions = {
      spaceBetween: 40,
      loop: true,
      controller: {
        control: this.thumbnailSwiperInstance,
      },
      navigation: {
        prevEl: '#prev-collection',
        nextEl: '#next-collection',
      },
    }
    initBindSwiper(this.quoteSwiper.nativeElement, productDetailSwiperOptions)
  }
}
