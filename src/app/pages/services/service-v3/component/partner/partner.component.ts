import { Component } from '@angular/core'
import { PartnerType, partner } from '../../data'

@Component({
  selector: 'service-v3-partner',
  standalone: true,
  imports: [],
  templateUrl: './partner.component.html',
  styles: ``,
})
export class PartnerComponent {
  partnerData: PartnerType[] = partner
}
