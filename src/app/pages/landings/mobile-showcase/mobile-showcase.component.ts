import { Component } from '@angular/core'
import { NavigationBarComponent } from '@components/navigation-bars'
import { StatsComponent } from './components/stats/stats.component'
import { FeaturesComponent } from './components/features/features.component'
import { InfoComponent } from './components/info/info.component'
import { LogosComponent } from './components/logos/logos.component'
import { TestimonialComponent } from './components/testimonial/testimonial.component'
import { FaqComponent } from './components/faq/faq.component'
import { CtaComponent } from './components/cta/cta.component'
import { HeroComponent } from '../insurance/components/hero/hero.component'
import { BenefitsComponent } from '../insurance/components/benefits/benefits.component'
import { CarServicesComponent } from '../insurance/components/car-services/car-services.component'
import { FeturesComponent } from '../saas-v3/components/fetures/fetures.component'
import { FooterComponent } from '../saas-v2/components/footer/footer.component'

@Component({
  selector: 'landings-mobile-showcase',
  standalone: true,
  imports: [
    NavigationBarComponent,
    HeroComponent,
    StatsComponent,
    FeaturesComponent,
    TestimonialComponent,
    FaqComponent,
    CtaComponent,
    HeroComponent,
    FeturesComponent,
    FooterComponent,
  ],
  templateUrl: './mobile-showcase.component.html',
  styles: ``,
})
export class MobileShowcaseComponent {}
