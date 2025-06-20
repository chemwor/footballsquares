import { Component } from '@angular/core'
import { Breadcrumb2Component } from '@components/breadcrumb/breadcrumb-2/breadcrumb-2.component'
import { NavigationBar2Component } from '@components/navigation-bars'
import { ArticleComponent } from './component/article/article.component'
import { SubscriptionComponent } from './component/subscription/subscription.component'
import { FooterComponent } from './component/footer/footer.component'
import { PostContentComponent } from './component/post-content/post-content.component'

@Component({
  selector: 'blog-single-v3',
  standalone: true,
  imports: [
    NavigationBar2Component,
    Breadcrumb2Component,
    ArticleComponent,
    SubscriptionComponent,
    FooterComponent,
    PostContentComponent,
  ],
  templateUrl: './single-v3.component.html',
  styles: ``,
})
export class SingleV3Component {}
