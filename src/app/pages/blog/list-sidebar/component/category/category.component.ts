import { Component, inject } from '@angular/core'
import { TrendingType, trendingPost } from '../../../grid-sidebar/data'
import { category, CategoryType } from '../../data'
import { CommonModule } from '@angular/common'
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'list-sidebar-category',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category.component.html',
  styles: ``,
})
export class CategoryComponent {
  activeOffcanvas = inject(NgbActiveOffcanvas)

  trendingPostData: TrendingType[] = trendingPost
  categoryData: CategoryType[] = category
}
