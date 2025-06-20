import { Component } from '@angular/core'
import {
  FeaturePostType,
  RealavantArticalType,
  featurePost,
  relavantArticle,
} from '../../data'
import { RouterModule } from '@angular/router'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'blog-feature-post',
  standalone: true,
  imports: [RouterModule, NgbDropdownModule],
  templateUrl: './feature-post.component.html',
  styles: ``,
})
export class FeaturePostComponent {
  featurePost: FeaturePostType[] = featurePost
  relavantArticle: RealavantArticalType[] = relavantArticle
}
