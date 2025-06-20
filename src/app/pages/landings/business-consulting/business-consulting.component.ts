import { Component, OnDestroy, OnInit, Renderer2, inject } from '@angular/core'
import { CeoComponent } from './components/ceo/ceo.component'
import { ClientsComponent } from './components/clients/clients.component'
import { GridServiceComponent } from './components/grid-service/grid-service.component'
import { HeroComponent } from './components/hero/hero.component'
import { IndustriesComponent } from './components/industries/industries.component'
import { StatsComponent } from './components/stats/stats.component'
import { TestimonialsComponent } from './components/testimonials/testimonials.component'
import { CaseStudiesComponent } from './components/case-studies/case-studies.component'
import { CtaComponent } from './components/cta/cta.component'
import { FooterComponent } from './components/footer/footer.component'
import { NavigationBarComponent } from '@components/navigation-bars'

@Component({
  selector: 'landings-business-consulting',
  standalone: true,
  imports: [
    NavigationBarComponent,
    HeroComponent,
    StatsComponent,
    GridServiceComponent,
    IndustriesComponent,
    ClientsComponent,
    CeoComponent,
    TestimonialsComponent,
    CaseStudiesComponent,
    CtaComponent,
    FooterComponent,
  ],
  templateUrl: './business-consulting.component.html',
  styles: ``,
})
export class BusinessConsultingComponent implements OnInit, OnDestroy {
  public renderer = inject(Renderer2)

  ngOnInit() {
    this.renderer.addClass(document.body, 'bg-secondary')
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'bg-secondary')
  }
}
