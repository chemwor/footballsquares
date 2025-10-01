import { Component } from '@angular/core'
import { NavigationBarComponent } from '@components/navigation-bars'
import { HeroComponent } from './components/hero/hero.component'
import { FeturesComponent } from './components/fetures/fetures.component'
import { EdgeComponent } from './components/edge/edge.component'
import { ComparisonSliderComponent } from './components/comparison-slider/comparison-slider.component'
import { MobileAppComponent } from './components/mobile-app/mobile-app.component'
import { PricingComponent } from './components/pricing/pricing.component'
import { ToolsComponent } from './components/tools/tools.component'
import { CtaComponent } from './components/cta/cta.component'
import { StepsComponent } from '../saas-v2/components/steps/steps.component'
import { TicketsComponent } from '../conference/components/tickets/tickets.component'
import { TestimonialComponent } from '../mobile-showcase/components/testimonial/testimonial.component'
import { FaqComponent } from '../mobile-showcase/components/faq/faq.component'
import { FooterComponent } from '../saas-v2/components/footer/footer.component'

@Component({
  selector: 'landings-saas-v3',
  standalone: true,
  imports: [
    NavigationBarComponent,
    HeroComponent,
    FeturesComponent,
    EdgeComponent,
    ComparisonSliderComponent,
    MobileAppComponent,
    PricingComponent,
    ToolsComponent,
    CtaComponent,
    StepsComponent,
    TicketsComponent,
    TestimonialComponent,
    FaqComponent,
    FooterComponent,
  ],
  templateUrl: './saas-v3.component.html',
})
export class SaasV3Component {}
