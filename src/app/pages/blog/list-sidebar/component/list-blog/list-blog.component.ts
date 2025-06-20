import { Component } from '@angular/core'
import { blogListSidebar, BlogPostType } from '../../data'
import { CategoryComponent } from '../category/category.component'
import { RouterModule } from '@angular/router'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'list-sidebar-blog',
  standalone: true,
  imports: [CategoryComponent, RouterModule, NgbPaginationModule],
  templateUrl: './list-blog.component.html',
  styles: ``,
})
export class ListBlogComponent {
  allListBlog: BlogPostType[] = blogListSidebar
}
