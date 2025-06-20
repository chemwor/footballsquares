import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ViewEncapsulation,
} from '@angular/core'
import { SwiperDirective } from '@components/swiper-directive.component'
import { register } from 'swiper/element'
import { Navigation } from 'swiper/modules'
import { SwiperOptions } from 'swiper/types'
import { LocationType, locationData } from '../../data'
import { LightboxModule, Lightbox } from 'ngx-lightbox'
import { CommonModule } from '@angular/common'
register()

@Component({
  selector: 'about-agency-location',
  standalone: true,
  imports: [SwiperDirective, LightboxModule, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './location.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class LocationComponent {
  locationData: LocationType[] = locationData
  index = 0

  constructor(private _lightbox: Lightbox) {
    // for (let i = 1; i <= 4; i++) {
    //   const src = 'demo/img/image' + i + '.jpg';
    //   const caption = 'Image ' + i + ' caption here';
    //   const thumb = 'demo/img/image' + i + '-thumb.jpg';
    //   const album = {
    //      src: src,
    //      caption: caption,
    //      thumb: thumb
    //   };
    //   this._albums.push(album);
    // }
  }

  swiperConfig: SwiperOptions = {
    modules: [Navigation],
    slidesPerView: 'auto',
    spaceBetween: 24,
    loop: true,
    navigation: {
      prevEl: '.prev-gallery',
      nextEl: '.next-gallery',
    },
  }

  open(index: number): void {
    this._lightbox.open(this.locationData, index, { showZoom: true })
  }
}
