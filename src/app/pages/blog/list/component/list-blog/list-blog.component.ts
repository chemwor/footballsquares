import { Component } from '@angular/core'
import { blogPostList, BlogPostType } from '../../../list-sidebar/data'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'list-blog',
  standalone: true,
  imports: [NgbPaginationModule, RouterModule],
  templateUrl: './list-blog.component.html',
  styles: ``,
})
export class ListBlogComponent {
  allListBlog: BlogPostType[] = blogPostList
}
