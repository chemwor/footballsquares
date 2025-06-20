import { Component } from '@angular/core'
import { PostType, postsData } from '../../data'
import { CategoryComponent } from '../category/category.component'
import { NgxMasonryModule } from 'ngx-masonry'
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap'
import { RouterModule } from '@angular/router'
import { SimplebarAngularModule } from 'simplebar-angular'

@Component({
  selector: 'grid-sidebar-post',
  standalone: true,
  imports: [
    CategoryComponent,
    NgxMasonryModule,
    NgbPaginationModule,
    RouterModule,
  ],
  templateUrl: './grid-post.component.html',
  styles: ``,
})
export class GridPostComponent {
  allPostData: PostType[] = postsData
}
