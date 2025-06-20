import { Component } from '@angular/core'
import { NavigationBar2Component } from '@components/navigation-bars'
import { HeroComponent } from './components/hero/hero.component'
import { ServiceComponent } from './components/service/service.component'
import { PartnersComponent } from './components/partners/partners.component'
import { FeaturesComponent } from './components/features/features.component'
import { IndustriesComponent } from './components/industries/industries.component'
import { TestimonialsComponent } from './components/testimonials/testimonials.component'
import { TeamComponent } from './components/team/team.component'
import { BlogComponent } from './components/blog/blog.component'
import { CtaComponent } from './components/cta/cta.component'
import { FooterComponent } from './components/footer/footer.component'

@Component({
  selector: 'landings-corporate',
  standalone: true,
  imports: [
    NavigationBar2Component,
    HeroComponent,
    ServiceComponent,
    PartnersComponent,
    FeaturesComponent,
    IndustriesComponent,
    TestimonialsComponent,
    TeamComponent,
    BlogComponent,
    CtaComponent,
    FooterComponent,
  ],
  templateUrl: './corporate.component.html',
  styles: ``,
})
export class CorporateComponent {}
