import { Component } from '@angular/core'
import { NavigationBar3Component } from '@components/navigation-bars'
import { DetailsComponent } from './components/details/details.component'
import { DescriptionComponent } from './components/description/description.component'
import { RelavantProductComponent } from './components/relavant-product/relavant-product.component'
import { FeaturesComponent } from './components/features/features.component'
import { FooterComponent } from './components/footer/footer.component'

@Component({
  selector: 'shop-single',
  standalone: true,
  imports: [
    NavigationBar3Component,
    DetailsComponent,
    DescriptionComponent,
    RelavantProductComponent,
    FeaturesComponent,
    FooterComponent,
  ],
  templateUrl: './single.component.html',
})
export class SingleComponent {}
