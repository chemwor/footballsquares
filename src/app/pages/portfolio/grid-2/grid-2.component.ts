import { Component } from '@angular/core'
import { NavigationBar5Component } from '@components/navigation-bars'
import { ProductsComponent } from './components/products/products.component'
import { FooterComponent } from './components/footer/footer.component'
import { Breadcrumb1Component } from '@components/breadcrumb/breadcrumb-1/breadcrumb-1.component'

@Component({
  selector: 'portfolio-grid-2',
  standalone: true,
  imports: [
    NavigationBar5Component,
    ProductsComponent,
    Breadcrumb1Component,
    FooterComponent,
  ],
  templateUrl: './grid-2.component.html',
  styles: ``,
})
export class Grid2Component {}
