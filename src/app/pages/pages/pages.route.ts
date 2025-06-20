import { Route } from '@angular/router'
import { ComingSoonComponent } from './coming-soon/coming-soon.component'
import { ComingSoon2Component } from './coming-soon2/coming-soon2.component'
import { Error404Component } from './error404/error404.component'
import { Error2404Component } from './error2404/error2404.component'
import { Error3404Component } from './error3404/error3404.component'

export const PAGES_ROUTES: Route[] = [
  {
    path: 'coming-soon-1',
    component: ComingSoonComponent,
    data: { title: 'Coming-soon v.1' },
  },
  {
    path: 'coming-soon-2',
    component: ComingSoon2Component,
    data: { title: 'Coming-soon v.2' },
  },
  {
    path: 'error-404-1',
    component: Error404Component,
    data: { title: '404 Error v.1' },
  },
  {
    path: 'error-404-2',
    component: Error2404Component,
    data: { title: '404 Error v.2' },
  },
  {
    path: 'error-404-3',
    component: Error3404Component,
    data: { title: '404 Error v.3' },
  },
]
