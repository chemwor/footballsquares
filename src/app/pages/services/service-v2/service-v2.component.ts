import { Component } from '@angular/core'
import { Breadcrumb1Component } from '@components/breadcrumb/breadcrumb-1/breadcrumb-1.component'
import { NavigationBar2Component } from '@components/navigation-bars'
import { OurServiceComponent } from './component/our-service/our-service.component'
import { FeatureComponent } from './component/feature/feature.component'
import { TestimonialComponent } from './component/testimonial/testimonial.component'
import { CtaComponent } from './component/cta/cta.component'
import { FooterComponent } from './component/footer/footer.component'

@Component({
  selector: 'app-service-v2',
  standalone: true,
  imports: [
    NavigationBar2Component,
    Breadcrumb1Component,
    OurServiceComponent,
    FeatureComponent,
    TestimonialComponent,
    CtaComponent,
    FooterComponent,
  ],
  templateUrl: './service-v2.component.html',
  styles: ``,
})
export class ServiceV2Component {}
