import { Component, inject } from '@angular/core'
import { TrendingType, trendingPost } from '../../data'
import { RouterModule } from '@angular/router'
import { NgbActiveOffcanvas } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'grid-sidebar-category',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './category.component.html',
  styles: ``,
})
export class CategoryComponent {
  trendingPostData: TrendingType[] = trendingPost
  socialICon = ['instagram', 'facebook', 'telegram', 'x']
}
