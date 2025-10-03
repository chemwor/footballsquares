import { Routes } from '@angular/router'
import { AccountLayoutComponent } from './layouts/account-layout.component'

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/landings/saas-v3/saas-v3.component').then(
        (mod) => mod.SaasV3Component
      ),
    title: 'SaaS V3 | Home',
  },
  {
    path: 'landings',
    loadChildren: () =>
      import('./pages/landings/landings.route').then(
        (mod) => mod.LANDING_ROUTES
      ),
  },
  {
    path: 'portfolio',
    loadChildren: () =>
      import('./pages/portfolio/portfolio.route').then(
        (mod) => mod.PORTFOLIO_ROUTES
      ),
  },
  {
    path: 'shop',
    loadChildren: () =>
      import('./pages/shop/shop.route').then((mod) => mod.SHOP_ROUTES),
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('./pages/blog/blog.route').then((mod) => mod.BLOG_ROUTES),
  },
  {
    path: 'blog/complete-games',
    loadComponent: () =>
      import('./pages/blog/complete-games/complete-games.component').then(
        (m) => m.CompleteGamesComponent
      ),
  },
  {
    path: 'blog/hosted-games',
    loadComponent: () =>
      import('./pages/blog/hosted-games/complete-games.component').then(
        (m) => m.CompleteGamesComponent
      ),
  },
  {
    path: 'blog/hosted-history',
    loadComponent: () =>
      import('./pages/blog/hosted-history/complete-games.component').then(
        (m) => m.CompleteGamesComponent
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/account/auth/auth.route').then((mod) => mod.AUTH_ROUTES),
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./pages/about/about.route').then((mod) => mod.ABOUT_ROUTE),
  },
  {
    path: 'services',
    loadChildren: () =>
      import('./pages/services/service.route').then(
        (mod) => mod.SERVICE_ROUTES
      ),
  },
  {
    path: 'contacts',
    loadChildren: () =>
      import('./pages/contacts/contact.route').then((mod) => mod.CONTACT_ROUTE),
  },
  {
    path: 'pages/pricing',
    loadComponent: () =>
      import('./pages/pricing/pricing.component').then(
        (mod) => mod.PricingComponent
      ),
    data: { title: 'pricing' },
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./pages/pages/pages.route').then((mod) => mod.PAGES_ROUTES),
  },
  {
    path: 'account',
    component: AccountLayoutComponent,
    loadChildren: () =>
      import('./pages/account/pages/account.route').then(
        (mod) => mod.ACCOUNT_ROUTES
      ),
  },
]
