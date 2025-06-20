import { Component } from '@angular/core'
import { instagram, InstagramType } from '../../data'
import { SimplebarAngularModule } from 'simplebar-angular'

@Component({
  selector: 'shop2-instagram',
  standalone: true,
  imports: [SimplebarAngularModule],
  templateUrl: './instagram.component.html',
  styles: ``,
})
export class InstagramComponent {
  instagramData: InstagramType[] = instagram
}
