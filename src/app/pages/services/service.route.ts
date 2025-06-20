import { Route } from '@angular/router'
import { ServiceV1Component } from './service-v1/service-v1.component'
import { ServiceV2Component } from './service-v2/service-v2.component'
import { ServiceV3Component } from './service-v3/service-v3.component'

export const SERVICE_ROUTES: Route[] = [
  {
    path: 'v1',
    component: ServiceV1Component,
    data: { title: 'Services v.1' },
  },
  {
    path: 'v2',
    component: ServiceV2Component,
    data: { title: 'Services v.2' },
  },
  {
    path: 'v3',
    component: ServiceV3Component,
    data: { title: 'Services v.3' },
  },
]
