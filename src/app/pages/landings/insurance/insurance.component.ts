import { Component } from '@angular/core'
import { NavigationBarComponent } from '@components/navigation-bars'
import { HeroComponent } from './components/hero/hero.component'
import { PartnersComponent } from './components/partners/partners.component'
import { BenefitsComponent } from './components/benefits/benefits.component'
import { CarServicesComponent } from './components/car-services/car-services.component'
import { HealthServicesComponent } from './components/health-services/health-services.component'
import { TravelServicesComponent } from './components/travel-services/travel-services.component'
import { CtaComponent } from './components/cta/cta.component'
import { FaqComponent } from './components/faq/faq.component'
import { FooterComponent } from './components/footer/footer.component'

@Component({
  selector: 'landings-insurance',
  standalone: true,
  imports: [
    NavigationBarComponent,
    HeroComponent,
    PartnersComponent,
    BenefitsComponent,
    CarServicesComponent,
    HealthServicesComponent,
    TravelServicesComponent,
    CtaComponent,
    FaqComponent,
    FooterComponent,
  ],
  templateUrl: './insurance.component.html',
  styles: ``,
})
export class InsuranceComponent {}
