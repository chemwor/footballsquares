import { Component } from '@angular/core'
import { NavigationBar5Component } from '@components/navigation-bars'
import { HeroComponent } from './components/hero/hero.component'
import { ProjectShowcaseComponent } from './components/project-showcase/project-showcase.component'
import { ParallaxComponent } from './components/parallax/parallax.component'
import { TestimonialsComponent } from './components/testimonials/testimonials.component'
import { ProjectsComponent } from './components/projects/projects.component'
import { FooterComponent } from './components/footer/footer.component'

@Component({
  selector: 'portfolio-single-v2',
  standalone: true,
  imports: [
    NavigationBar5Component,
    HeroComponent,
    ProjectShowcaseComponent,
    ParallaxComponent,
    TestimonialsComponent,
    ProjectsComponent,
    FooterComponent,
  ],
  templateUrl: './single-v2.component.html',
  styles: ``,
})
export class SingleV2Component {}
