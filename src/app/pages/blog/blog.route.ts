import { Route } from '@angular/router'
import { GridSidebarComponent } from './grid-sidebar/grid-sidebar.component'
import { GridComponent } from './grid/grid.component'
import { ListSidebarComponent } from './list-sidebar/list-sidebar.component'
import { ListComponent } from './list/list.component'
import { SingleV1Component } from './single-v1/single-v1.component'
import { SingleV2Component } from './single-v2/single-v2.component'
import { SingleV3Component } from './single-v3/single-v3.component'

export const BLOG_ROUTES: Route[] = [
  {
    path: 'grid-sidebar',
    component: GridSidebarComponent,
    data: { title: 'Blog Grid with Sidebar' },
  },
  {
    path: 'grid-no-sidebar',
    component: GridComponent,
    data: { title: 'Blog Grid no Sidebar' },
  },
  {
    path: 'list-sidebar',
    component: ListSidebarComponent,
    data: { title: 'Blog List with Sidebar' },
  },
  {
    path: 'list-no-sidebar',
    component: ListComponent,
    data: { title: 'Blog List no Sidebar' },
  },
  {
    path: 'post-1',
    component: SingleV1Component,
    data: { title: 'Single Post v.1' },
  },
  {
    path: 'post-2',
    component: SingleV2Component,
    data: { title: 'Single Post v.2' },
  },
  {
    path: 'post-3',
    component: SingleV3Component,
    data: { title: 'Single Post v.3' },
  },
]
