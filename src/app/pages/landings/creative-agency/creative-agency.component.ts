import { Component } from '@angular/core'
import { NavigationBar5Component } from '@components/navigation-bars'
import { HeroComponent } from './components/hero/hero.component'
import { AboutComponent } from './components/about/about.component'
import { ProjectsComponent } from './components/projects/projects.component'
import { ClientsComponent } from './components/clients/clients.component'
import { TestimonialsComponent } from './components/testimonials/testimonials.component'
import { TeamComponent } from './components/team/team.component'
import { FooterComponent } from './components/footer/footer.component'

@Component({
  selector: 'landings-creative-agency',
  standalone: true,
  imports: [
    NavigationBar5Component,
    HeroComponent,
    AboutComponent,
    ProjectsComponent,
    ClientsComponent,
    TestimonialsComponent,
    TeamComponent,
    FooterComponent,
  ],
  templateUrl: './creative-agency.component.html',
  styles: ``,
})
export class CreativeAgencyComponent {}
