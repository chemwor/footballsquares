import { Component } from '@angular/core'
import { TrendingType, trendingPost } from '../../data'
import { RouterModule } from '@angular/router'
import { CommonModule } from '@angular/common'
@Component({
  selector: 'single-post-content',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './post-content.component.html',
  styles: ``,
})
export class PostContentComponent {
  trendingPostData: TrendingType[] = trendingPost
  relevant = ['Nature', 'Inspiration', 'Travel', 'Psychology']
  socialICon = ['instagram', 'facebook', 'telegram', 'x']
  list = [
    'Quam laoreet eget id sapien',
    'Morbi convallis suspendisse',
    'Vivamus non ante',
    'Praesent dignissim efficitur',
    'Gravida a mi neque',
  ]
  tag = ['Nature', 'Books', 'travel']
}
