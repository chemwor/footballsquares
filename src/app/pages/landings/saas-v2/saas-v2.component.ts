import { Component } from '@angular/core'
import { NavigationBarComponent } from '@components/navigation-bars'
import { HeroComponent } from './components/hero/hero.component'
import { FeturesComponent } from './components/fetures/fetures.component'
import { TestimonialComponent } from './components/testimonial/testimonial.component'
import { BenefitsComponent } from './components/benefits/benefits.component'
import { ToolsComponent } from './components/tools/tools.component'
import { ResourcesComponent } from './components/resources/resources.component'
import { CtaComponent } from './components/cta/cta.component'
import { FooterComponent } from './components/footer/footer.component'
import { StepsComponent } from './components/steps/steps.component'

@Component({
  selector: 'landings-saas-v2',
  standalone: true,
  imports: [
    NavigationBarComponent,
    HeroComponent,
    FeturesComponent,
    StepsComponent,
    TestimonialComponent,
    BenefitsComponent,
    ToolsComponent,
    ResourcesComponent,
    CtaComponent,
    FooterComponent,
  ],
  templateUrl: './saas-v2.component.html',
})
export class SaasV2Component {}
