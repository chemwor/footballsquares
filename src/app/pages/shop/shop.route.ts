import { Route } from '@angular/router'
import { CheckoutComponent } from './checkout/checkout.component'
import { CatalogComponent } from './catalog/catalog.component'
import { SingleComponent } from './single/single.component'

export const SHOP_ROUTES: Route[] = [
  {
    path: 'catalog',
    component: CatalogComponent,
    data: { title: 'Shop Catalog' },
  },
  {
    path: 'product',
    component: SingleComponent,
    data: { title: 'Shop Product Page' },
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    data: { title: 'Shop Checkout' },
  },
]
