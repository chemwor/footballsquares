import { Component } from '@angular/core'
import { influenceInstagram, InfluenceInstagramType } from '../../data'
import { SimplebarAngularModule } from 'simplebar-angular'

@Component({
  selector: 'influencer-instagram',
  standalone: true,
  imports: [SimplebarAngularModule],
  templateUrl: './instagram.component.html',
  styles: ``,
})
export class InstagramComponent {
  instagramInfluence: InfluenceInstagramType[] = influenceInstagram
}
