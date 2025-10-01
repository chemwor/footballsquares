import { Component } from '@angular/core'
import { NavigationBarComponent } from '@components/navigation-bars'
import { HeroComponent } from './components/hero/hero.component'
import { AboutComponent } from './components/about/about.component'
import { GalleryComponent } from './components/gallery/gallery.component'
import { FeaturesComponent } from './components/features/features.component'
import { VideoComponent } from './components/video/video.component'
import { TestimonialsComponent } from './components/testimonials/testimonials.component'
import { PricingComponent } from './components/pricing/pricing.component'
import { AddressComponent } from './components/address/address.component'
import { FooterComponent } from '../mobile-showcase/components/footer/footer.component'
import { BoardComponent } from '../../../components/board/board.component'
import { FormsModule } from '@angular/forms'
import { AdminPanelComponent } from '@components/admin-panel/admin-panel.component'

@Component({
  selector: 'landings-coworking-space',
  standalone: true,
  imports: [
    NavigationBarComponent,
    HeroComponent,
    AboutComponent,
    GalleryComponent,
    FeaturesComponent,
    VideoComponent,
    TestimonialsComponent,
    PricingComponent,
    AddressComponent,
    FooterComponent,
    BoardComponent,
    FormsModule,
    AdminPanelComponent,
  ],
  templateUrl: './coworking-space.component.html',
  styles: ``,
})
export class CoworkingSpaceComponent {}
