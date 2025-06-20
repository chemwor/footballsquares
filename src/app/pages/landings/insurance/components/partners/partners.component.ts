import { Component } from '@angular/core'
import { PartenerType, partnerData } from '../../data'
import { SimplebarAngularModule } from 'simplebar-angular'

@Component({
  selector: 'insurance-partners',
  standalone: true,
  imports: [SimplebarAngularModule],
  templateUrl: './partners.component.html',
  styles: ``,
})
export class PartnersComponent {
  partnersData: PartenerType[] = partnerData
}
