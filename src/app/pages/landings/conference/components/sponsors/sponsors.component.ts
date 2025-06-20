import { Component } from '@angular/core'
import { sponsoredData, SponsorsType } from '../../data'
import { SimplebarAngularModule } from 'simplebar-angular'

@Component({
  selector: 'conference-sponsors',
  standalone: true,
  imports: [SimplebarAngularModule],
  templateUrl: './sponsors.component.html',
  styles: ``,
})
export class SponsorsComponent {
  allSponsoredDetail: SponsorsType[] = sponsoredData
}
