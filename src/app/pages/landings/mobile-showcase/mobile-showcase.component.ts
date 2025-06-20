import { Component } from '@angular/core'
import { NavigationBarComponent } from '@components/navigation-bars'
import { StatsComponent } from './components/stats/stats.component'
import { FeaturesComponent } from './components/features/features.component'
import { InfoComponent } from './components/info/info.component'
import { LogosComponent } from './components/logos/logos.component'
import { TestimonialComponent } from './components/testimonial/testimonial.component'
import { FaqComponent } from './components/faq/faq.component'
import { CtaComponent } from './components/cta/cta.component'
import { FooterComponent } from './components/footer/footer.component'
import { HeroComponent } from '../insurance/components/hero/hero.component'
import { BenefitsComponent } from '../insurance/components/benefits/benefits.component'
import { CarServicesComponent } from '../insurance/components/car-services/car-services.component'
import { FeturesComponent } from '../saas-v3/components/fetures/fetures.component'

@Component({
  selector: 'landings-mobile-showcase',
  standalone: true,
  imports: [
    NavigationBarComponent,
    HeroComponent,
    StatsComponent,
    FeaturesComponent,
    InfoComponent,
    LogosComponent,
    TestimonialComponent,
    FaqComponent,
    CtaComponent,
    FooterComponent,
    HeroComponent,
    BenefitsComponent,
    CarServicesComponent,
    FeturesComponent,
  ],
  templateUrl: './mobile-showcase.component.html',
  styles: ``,
})
export class MobileShowcaseComponent {}
