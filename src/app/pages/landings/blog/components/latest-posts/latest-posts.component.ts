import { Component } from '@angular/core'
import { latestBlog, LatestBlogType } from '../../data'
import { RouterLink } from '@angular/router'

@Component({
  selector: 'blog-latest-posts',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './latest-posts.component.html',
  styles: ``,
})
export class LatestPostsComponent {
  latestBlog: LatestBlogType[] = latestBlog
}
