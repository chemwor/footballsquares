import { Route } from '@angular/router'
import { ListV1Component } from './list-v1/list-v1.component'
import { List2Component } from './list-2/list-2.component'
import { Grid1Component } from './grid-1/grid-1.component'
import { Grid2Component } from './grid-2/grid-2.component'
import { SingleV1Component } from './single-v1/single-v1.component'
import { SingleV2Component } from './single-v2/single-v2.component'
import { SliderComponent } from './slider/slider.component'

export const PORTFOLIO_ROUTES: Route[] = [
  {
    path: 'list-1',
    component: ListV1Component,
    data: { title: 'Portfolio List View v.1' },
  },
  {
    path: 'list-2',
    component: List2Component,
    data: { title: 'Portfolio List View v.2' },
  },
  {
    path: 'grid-1',
    component: Grid1Component,
    data: { title: 'Portfolio Grid View v.1' },
  },
  {
    path: 'grid-2',
    component: Grid2Component,
    data: { title: 'Portfolio Grid View v.2' },
  },
  {
    path: 'slider',
    component: SliderComponent,
    data: { title: 'Portfolio Slider View' },
  },
  {
    path: 'single-1',
    component: SingleV1Component,
    data: { title: 'Single Project v.1' },
  },
  {
    path: 'single-2',
    component: SingleV2Component,
    data: { title: 'Single Project v.2' },
  },
]
