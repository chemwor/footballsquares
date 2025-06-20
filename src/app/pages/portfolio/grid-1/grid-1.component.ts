import { Component } from '@angular/core'
import { NavigationBarComponent } from '@components/navigation-bars'
import { ProductsComponent } from './components/products/products.component'
import { FooterComponent } from './components/footer/footer.component'
import { Breadcrumb1Component } from '@components/breadcrumb/breadcrumb-1/breadcrumb-1.component'

@Component({
  selector: 'portfolio-grid-1',
  standalone: true,
  imports: [
    NavigationBarComponent,
    Breadcrumb1Component,
    ProductsComponent,
    FooterComponent,
  ],
  templateUrl: './grid-1.component.html',
  styles: ``,
})
export class Grid1Component {}
