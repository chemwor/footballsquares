import { Component, ViewEncapsulation } from '@angular/core'
import { RouterModule } from '@angular/router'
import { NgxMasonryModule } from 'ngx-masonry'
import { LightboxModule, Lightbox } from 'ngx-lightbox'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

@Component({
  selector: 'conference-gallery',
  standalone: true,
  imports: [LightboxModule, RouterModule, NgxMasonryModule],
  templateUrl: './gallery.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class GalleryComponent {
  public _albums: { src: string; caption: string; thumb: string }[] = []

  constructor(private _lightbox: Lightbox) {
    this._albums = [
      {
        src: 'assets/img/landing/conference/gallery/01.jpg',
        caption: '',
        thumb: 'assets/img/landing/conference/gallery/th01.jpg',
      },
      {
        src: 'assets/img/landing/conference/gallery/02.jpg',
        caption: '',
        thumb: 'assets/img/landing/conference/gallery/th02.jpg',
      },
      {
        src: 'https://www.youtube.com/embed/5-A8_ocajCM',
        caption: '',
        thumb: 'assets/img/landing/conference/gallery/th05.jpg',
      },
      {
        src: 'assets/img/landing/conference/gallery/03.jpg',
        caption: '',
        thumb: 'assets/img/landing/conference/gallery/th03.jpg',
      },
      {
        src: 'assets/img/landing/conference/gallery/04.jpg',
        caption: '',
        thumb: 'assets/img/landing/conference/gallery/th04.jpg',
      },
      {
        src: 'https://www.youtube.com/embed/Omr18ybhPKI',
        caption: '',
        thumb: 'assets/img/landing/conference/gallery/th06.jpg',
      },
    ]
  }

  open(index: number): void {
    this._lightbox.open(this._albums, index, { isVideo: true })
  }
}
