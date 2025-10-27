import { Component } from '@angular/core'
import { NavigationBar2Component } from '@components/navigation-bars'
import { PlansComponent } from './component/plans/plans.component'
import { CompareTableComponent } from './component/compare-table/compare-table.component'
import { TestimonialComponent } from './component/testimonial/testimonial.component'
import { ToolComponent } from './component/tool/tool.component'
import { FaqComponent } from './component/faq/faq.component'
import { FooterComponent as SaasV2FooterComponent } from 'src/app/pages/landings/saas-v2/components/footer/footer.component'

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [
    NavigationBar2Component,
    PlansComponent,
    CompareTableComponent,
    TestimonialComponent,
    ToolComponent,
    FaqComponent,
    SaasV2FooterComponent,
  ],
  templateUrl: './pricing.component.html',
  styles: ``,
})
export class PricingComponent {}
