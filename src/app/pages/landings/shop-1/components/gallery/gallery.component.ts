import { Component } from '@angular/core'
import { register } from 'swiper/element/bundle'
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap'

register()
@Component({
  selector: 'shop-1-gallery',
  standalone: true,
  templateUrl: './gallery.component.html',
  imports: [NgbPopoverModule],
  styles: ``,
})
export class GalleryComponent {}
