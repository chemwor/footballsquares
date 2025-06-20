import { Component, TemplateRef, inject } from '@angular/core'
import { Breadcrumb1Component } from '@components/breadcrumb/breadcrumb-1/breadcrumb-1.component'
import { NavigationBar2Component } from '@components/navigation-bars'
import { ListBlogComponent } from './component/list-blog/list-blog.component'
import { FooterComponent } from './component/footer/footer.component'
import { SubscriptionComponent } from './component/subscription/subscription.component'
import { NgbActiveOffcanvas, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap'
import { TrendingType, trendingPost } from '../grid-sidebar/data'
import { CategoryType, category } from './data'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-list-sidebar',
  standalone: true,
  imports: [
    NavigationBar2Component,
    Breadcrumb1Component,
    ListBlogComponent,
    FooterComponent,
    SubscriptionComponent,
    CommonModule,
  ],
  templateUrl: './list-sidebar.component.html',
  styles: ``,
  providers: [NgbActiveOffcanvas],
})
export class ListSidebarComponent {
  private offcanvasService = inject(NgbOffcanvas)

  onSettingsButtonClicked(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' })
  }

  activeOffcanvas = inject(NgbActiveOffcanvas)

  trendingPostData: TrendingType[] = trendingPost
  categoryData: CategoryType[] = category
}
