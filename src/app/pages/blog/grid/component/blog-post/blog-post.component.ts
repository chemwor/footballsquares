import { Component } from '@angular/core'
import { blogPost, BlogPostType } from '../../data'
import { NgxMasonryModule } from 'ngx-masonry'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'grid-noSidebar-post',
  standalone: true,
  imports: [NgxMasonryModule, NgbPaginationModule],
  templateUrl: './blog-post.component.html',
  styles: ``,
})
export class BlogPostComponent {
  allBlogPost!: BlogPostType[]

  ngOnInit(): void {
    this.allBlogPost = blogPost
  }
}
