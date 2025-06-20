import { Component } from '@angular/core'
import { NavigationBar6Component } from '@components/navigation-bars'
import { HeroComponent } from './components/hero/hero.component'
import { AwardsComponent } from './components/awards/awards.component'
import { ServicesComponent } from './components/services/services.component'
import { IndustriesComponent } from './components/industries/industries.component'
import { SkillsComponent } from './components/skills/skills.component'
import { PortfolioComponent } from './components/portfolio/portfolio.component'
import { ContactComponent } from './components/contact/contact.component'
import { FooterComponent } from './components/footer/footer.component'

@Component({
  selector: 'landings-web-studio',
  standalone: true,
  imports: [
    NavigationBar6Component,
    HeroComponent,
    AwardsComponent,
    ServicesComponent,
    IndustriesComponent,
    SkillsComponent,
    PortfolioComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './web-studio.component.html',
  styles: ``,
})
export class WebStudioComponent {}
