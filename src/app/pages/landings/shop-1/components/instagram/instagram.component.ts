import { Component } from '@angular/core'
import {
  InstagramFollowType,
  shopInstagramFollow,
  shopInstagramView,
} from '../../data'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'shop-1-instagram',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instagram.component.html',
  styles: ``,
})
export class InstagramComponent {
  allShopInstagramFollow: InstagramFollowType[] = shopInstagramFollow
  allShopInstagramView = shopInstagramView
}
