import { Component } from '@angular/core'
import { TitleComponent } from './components/title/title.component'
import { FeaturePostComponent } from './components/feature-post/feature-post.component'
import { PopularArticlesComponent } from './components/popular-articles/popular-articles.component'
import { LatestPostsComponent } from './components/latest-posts/latest-posts.component'
import { AuthorsComponent } from './components/authors/authors.component'
import { EditorsComponent } from './components/editors/editors.component'
import { SubscriptionComponent } from './components/subscription/subscription.component'
import { FooterComponent } from './components/footer/footer.component'
import { NavigationBarComponent } from '@components/navigation-bars'

@Component({
  selector: 'landings-blog',
  standalone: true,
  imports: [
    NavigationBarComponent,
    TitleComponent,
    FeaturePostComponent,
    PopularArticlesComponent,
    LatestPostsComponent,
    AuthorsComponent,
    EditorsComponent,
    SubscriptionComponent,
    FooterComponent,
  ],
  templateUrl: './blog.component.html',
  styles: ``,
})
export class BlogComponent {}
