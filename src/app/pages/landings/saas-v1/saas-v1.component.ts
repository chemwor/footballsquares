import { Component } from '@angular/core'
import { NavigationBar2Component } from '@components/navigation-bars'
import { HeroComponent } from './components/hero/hero.component'
import { ReviewsComponent } from './components/reviews/reviews.component'
import { FeaturesComponent } from './components/features/features.component'
import { FeaturesListComponent } from './components/features-list/features-list.component'
import { IndustriesComponent } from './components/industries/industries.component'
import { PricingComponent } from './components/pricing/pricing.component'
import { CtaComponent } from './components/cta/cta.component'
import { TestimonialsComponent } from './components/testimonials/testimonials.component'
import { FooterComponent } from './components/footer/footer.component'

@Component({
  selector: 'landings-saas-v1',
  standalone: true,
  imports: [
    NavigationBar2Component,
    HeroComponent,
    ReviewsComponent,
    FeaturesComponent,
    FeaturesListComponent,
    IndustriesComponent,
    PricingComponent,
    TestimonialsComponent,
    CtaComponent,
    FooterComponent,
  ],
  templateUrl: './saas-v1.component.html',
  styles: ``,
})
export class SaasV1Component {}
