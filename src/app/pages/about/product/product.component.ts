import { Component } from '@angular/core'
import { NavigationBar2Component } from '@components/navigation-bars'
import { HeroComponent } from './component/hero/hero.component'
import { ClientComponent } from './component/client/client.component'
import { StepsComponent } from './component/steps/steps.component'
import { FeaturesComponent } from './component/features/features.component'
import { BenefitsComponent } from './component/benefits/benefits.component'
import { ToolsComponent } from './component/tools/tools.component'
import { CtaComponent } from './component/cta/cta.component'
import { FooterComponent } from './component/footer/footer.component'

@Component({
  selector: 'about-product',
  standalone: true,
  imports: [
    NavigationBar2Component,
    HeroComponent,
    ClientComponent,
    StepsComponent,
    FeaturesComponent,
    BenefitsComponent,
    ToolsComponent,
    CtaComponent,
    FooterComponent,
  ],
  templateUrl: './product.component.html',
  styles: ``,
})
export class ProductComponent {}
