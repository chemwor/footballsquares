import { Component } from '@angular/core'
import { NavigationBar2Component } from '@components/navigation-bars'
import { TitleComponent } from './components/title/title.component'
import { OverviewComponent } from './components/overview/overview.component'
import { DescriptionComponent } from './components/description/description.component'
import { NetworksComponent } from './components/networks/networks.component'
import { MarketingComponent } from './components/marketing/marketing.component'
import { ResultsComponent } from './components/results/results.component'
import { TestimonialsComponent } from './components/testimonials/testimonials.component'
import { ProjectsComponent } from './components/projects/projects.component'
import { FooterComponent } from './components/footer/footer.component'
import { Breadcrumb2Component } from '@components/breadcrumb/breadcrumb-2/breadcrumb-2.component'

@Component({
  selector: 'portfolio-single-v1',
  standalone: true,
  imports: [
    NavigationBar2Component,
    Breadcrumb2Component,
    TitleComponent,
    OverviewComponent,
    DescriptionComponent,
    NetworksComponent,
    MarketingComponent,
    ResultsComponent,
    TestimonialsComponent,
    ProjectsComponent,
    FooterComponent,
  ],
  templateUrl: './single-v1.component.html',
  styles: ``,
})
export class SingleV1Component {}
