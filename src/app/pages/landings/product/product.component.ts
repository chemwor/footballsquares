import { Component } from '@angular/core'
import { NavigationBarComponent } from '@components/navigation-bars'
import { HeroComponent } from './components/hero/hero.component'
import { VideoComponent } from './components/video/video.component'
import { ColorComponent } from './components/color/color.component'
import { CtaComponent } from './components/cta/cta.component'
import { ProductDetailsComponent } from './components/product-details/product-details.component'
import { GalleryComponent } from './components/gallery/gallery.component'
import { FooterComponent } from './components/footer/footer.component'

@Component({
  selector: 'landings-product',
  standalone: true,
  imports: [
    NavigationBarComponent,
    HeroComponent,
    VideoComponent,
    ColorComponent,
    CtaComponent,
    ProductDetailsComponent,
    GalleryComponent,
    FooterComponent,
  ],
  templateUrl: './product.component.html',
})
export class ProductComponent {}
