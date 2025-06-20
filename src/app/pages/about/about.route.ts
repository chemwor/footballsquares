import { Route } from '@angular/router'
import { AgencyComponent } from './agency/agency.component'
import { ProductComponent } from './product/product.component'

export const ABOUT_ROUTE: Route[] = [
  {
    path: 'agency',
    component: AgencyComponent,
    data: { title: 'About - Agency' },
  },
  {
    path: 'product',
    component: ProductComponent,
    data: { title: 'About - Product' },
  },
]
