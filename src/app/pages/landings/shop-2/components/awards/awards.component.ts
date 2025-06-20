import { Component } from '@angular/core'
import { AwardType, awards } from '../../data'
import { SimplebarAngularModule } from 'simplebar-angular'

@Component({
  selector: 'shop2-awards',
  standalone: true,
  imports: [SimplebarAngularModule],
  templateUrl: './awards.component.html',
  styles: ``,
})
export class AwardsComponent {
  awardsData: AwardType[] = awards
}
