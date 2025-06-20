import { Component } from '@angular/core'
import { Breadcrumb2Component } from '@components/breadcrumb/breadcrumb-2/breadcrumb-2.component'
import { NavigationBar2Component } from '@components/navigation-bars'
import { PostContentComponent } from './component/post-content/post-content.component'
import { PostComentComponent } from './component/post-coment/post-coment.component'
import { ArticleComponent } from './component/article/article.component'
import { FooterComponent } from './component/footer/footer.component'
import { SubscriptionComponent } from './component/subscription/subscription.component'
import type { JarallaxOptions } from 'jarallax'
import { JarallaxDirective } from '@components/jarallax-directive/jarallax-directive.component'

@Component({
  selector: 'blog-single-v2',
  standalone: true,
  imports: [
    NavigationBar2Component,
    Breadcrumb2Component,
    PostContentComponent,
    PostComentComponent,
    ArticleComponent,
    FooterComponent,
    SubscriptionComponent,
    JarallaxDirective,
  ],
  templateUrl: './single-v2.component.html',
  styles: ``,
})
export class SingleV2Component {
  jarallaxConfig: JarallaxOptions = {
    speed: 0.65,
  }
}
