import { Component, signal } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Breadcrumb2Component } from '@components/breadcrumb/breadcrumb-2/breadcrumb-2.component'
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap'
import { LightboxModule, Lightbox } from 'ngx-lightbox'
import { currency } from 'src/app/states/constants'

@Component({
  selector: 'single-details',
  standalone: true,
  imports: [Breadcrumb2Component, NgbTooltip, LightboxModule, FormsModule],
  templateUrl: './details.component.html',
})
export class DetailsComponent {
  selectedCurrency = currency
  count = signal(1)
  colorName: string = 'Gray concrete'
  // decrement
  decrement() {
    this.count.update((prevCount) => prevCount - 1)
  }
  // increments signal
  increment() {
    this.count.update((prevCount) => prevCount + 1)
  }

  constructor(public lightbox: Lightbox) {}
  album = [
    {
      src: 'assets/img/shop/single/gallery/01.png',
      thumb: 'assets/img/shop/single/gallery/th01.png',
      caption: '',
    },
    {
      src: 'assets/img/shop/single/gallery/01.png',
      thumb: 'assets/img/shop/single/gallery/th01.png',
      caption: '',
    },
    {
      src: 'assets/img/shop/single/gallery/02.png',
      thumb: 'assets/img/shop/single/gallery/th02.png',
      caption: '',
    },
    {
      src: 'assets/img/shop/single/gallery/03.png',
      thumb: 'assets/img/shop/single/gallery/th03.png',
      caption: '',
    },
  ]

  open(index: number) {
    this.lightbox.open(this.album, index, { isVideo: true })
  }
}
