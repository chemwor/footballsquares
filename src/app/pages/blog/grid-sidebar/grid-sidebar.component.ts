import { Component, TemplateRef, inject } from '@angular/core'
import { NavigationBar2Component } from '@components/navigation-bars'
import { GridPostComponent } from './component/grid-post/grid-post.component'
import { SubscriptionComponent } from './component/subscription/subscription.component'
import { FooterComponent } from './component/footer/footer.component'
import { RouterModule } from '@angular/router'
import { Breadcrumb1Component } from '@components/breadcrumb/breadcrumb-1/breadcrumb-1.component'
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap'
import { SimplebarAngularModule } from 'simplebar-angular'
import { TrendingType, trendingPost } from './data'

@Component({
  selector: 'blog-grid-sidebar',
  standalone: true,
  imports: [
    NavigationBar2Component,
    GridPostComponent,
    SubscriptionComponent,
    FooterComponent,
    RouterModule,
    Breadcrumb1Component,
    SimplebarAngularModule,
  ],
  templateUrl: './grid-sidebar.component.html',
  styles: ``,
})
export class GridSidebarComponent {
  private offcanvasService = inject(NgbOffcanvas)
  trendingPostData: TrendingType[] = trendingPost
  socialICon = ['instagram', 'facebook', 'telegram', 'x']

  onSettingsButtonClicked(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' })
  }
}
