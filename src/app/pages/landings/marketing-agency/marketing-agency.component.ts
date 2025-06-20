import { Component } from '@angular/core'
import { NavigationBarComponent } from '@components/navigation-bars'
import { HeroComponent } from './components/hero/hero.component'
import { ServicesComponent } from './components/services/services.component'
import { ToolsComponent } from './components/tools/tools.component'
import { BenefitsComponent } from './components/benefits/benefits.component'
import { AboutComponent } from './components/about/about.component'
import { TestimonialsComponent } from './components/testimonials/testimonials.component'
import { CaseStudiesComponent } from './components/case-studies/case-studies.component'
import { TeamComponent } from './components/team/team.component'
import { ResourcesComponent } from './components/resources/resources.component'
import { ContactComponent } from './components/contact/contact.component'
import { FooterComponent } from './components/footer/footer.component'

@Component({
  selector: 'landings-marketing-agency',
  standalone: true,
  imports: [
    NavigationBarComponent,
    HeroComponent,
    ServicesComponent,
    ToolsComponent,
    BenefitsComponent,
    AboutComponent,
    TestimonialsComponent,
    CaseStudiesComponent,
    TeamComponent,
    ResourcesComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './marketing-agency.component.html',
  styles: ``,
})
export class MarketingAgencyComponent {}
