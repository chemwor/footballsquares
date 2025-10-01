import { Component, ViewEncapsulation } from '@angular/core'
import { ourSpace, SpaceType } from '../../data'
import { LightboxModule, Lightbox } from 'ngx-lightbox'
@Component({
  selector: 'coworking-space-gallery',
  standalone: true,
  imports: [LightboxModule],
  templateUrl: './gallery.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class GalleryComponent {
  allGalary: SpaceType[] = ourSpace

  constructor(public _lightbox: Lightbox) {}

  open(index: number): void {
    this._lightbox.open(this.allGalary, index)
  }
}
