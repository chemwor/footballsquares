import { Component } from '@angular/core'
import { Breadcrumb1Component } from '@components/breadcrumb/breadcrumb-1/breadcrumb-1.component'
import { NavigationBar2Component } from '@components/navigation-bars'
import { FooterComponent } from './component/footer/footer.component'
import { SubscriptionComponent } from './component/subscription/subscription.component'
import { BlogPostComponent } from './component/blog-post/blog-post.component'
@Component({
  selector: 'grid-noSidebar',
  standalone: true,
  imports: [
    NavigationBar2Component,
    Breadcrumb1Component,
    FooterComponent,
    SubscriptionComponent,
    BlogPostComponent,
  ],
  templateUrl: './grid.component.html',
  styles: ``,
})
export class GridComponent {}
