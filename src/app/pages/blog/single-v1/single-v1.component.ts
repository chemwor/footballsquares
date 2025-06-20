import { Component } from '@angular/core'
import { Breadcrumb2Component } from '@components/breadcrumb/breadcrumb-2/breadcrumb-2.component'
import { NavigationBar2Component } from '@components/navigation-bars'
import { PostContentComponent } from './component/post-content/post-content.component'
import { PostComentComponent } from './component/post-coment/post-coment.component'
import { ArticleComponent } from './component/article/article.component'
import { SubscriptionComponent } from './component/subscription/subscription.component'
import { FooterComponent } from './component/footer/footer.component'
import { JarallaxDirective } from '@components/jarallax-directive/jarallax-directive.component'
import type { JarallaxOptions } from 'jarallax'
@Component({
  selector: 'blog-single-v1',
  standalone: true,
  imports: [
    NavigationBar2Component,
    Breadcrumb2Component,
    PostContentComponent,
    PostComentComponent,
    ArticleComponent,
    SubscriptionComponent,
    FooterComponent,
    JarallaxDirective,
  ],
  templateUrl: './single-v1.component.html',
  styles: ``,
})
export class SingleV1Component {
  jarallaxConfig: JarallaxOptions = {
    speed: 0.6,
  }
}
