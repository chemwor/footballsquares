import { Route } from '@angular/router'
import { SettingsComponent } from './settings/settings.component'
import { BillingComponent } from './billing/billing.component'
import { OrdersComponent } from './orders/orders.component'
import { EarningsComponent } from './earnings/earnings.component'
import { ChatComponent } from './chat/chat.component'
import { FavoritesComponent } from './favorites/favorites.component'
import { OverviewComponent } from './overview/overview.component'

export const ACCOUNT_ROUTES: Route[] = [
  {
    path: 'overview',
    component: OverviewComponent,
    data: { title: 'Account - Overview' },
  },
  {
    path: 'settings',
    component: SettingsComponent,
    data: { title: 'Account - Settings' },
  },
  {
    path: 'billing',
    component: BillingComponent,
    data: { title: 'Account - Billing' },
  },
  {
    path: 'orders',
    component: OrdersComponent,
    data: { title: 'Account - Orders' },
  },
  {
    path: 'earnings',
    component: EarningsComponent,
    data: { title: 'Account - Earnings' },
  },
  {
    path: 'chat',
    component: ChatComponent,
    data: { title: 'Account -Chat' },
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
    data: { title: 'Account - Favorites' },
  },
]
