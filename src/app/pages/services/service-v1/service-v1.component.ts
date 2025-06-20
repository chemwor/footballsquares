import { Component } from '@angular/core'
import { Breadcrumb1Component } from '@components/breadcrumb/breadcrumb-1/breadcrumb-1.component'
import { NavigationBar2Component } from '@components/navigation-bars'
import { ServiceGridComponent } from './component/service-grid/service-grid.component'
import { BenefitsComponent } from './component/benefits/benefits.component'
import { TestimonialComponent } from './component/testimonial/testimonial.component'
import { CTAComponent } from './component/cta/cta.component'
import { FooterComponent } from './component/footer/footer.component'

@Component({
  selector: 'app-service-v1',
  standalone: true,
  imports: [
    NavigationBar2Component,
    Breadcrumb1Component,
    ServiceGridComponent,
    BenefitsComponent,
    TestimonialComponent,
    CTAComponent,
    FooterComponent,
  ],
  templateUrl: './service-v1.component.html',
  styles: ``,
})
export class ServiceV1Component {}
