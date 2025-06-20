import { Component } from '@angular/core'
import { corporatePartner, CorporatePartnerType } from '../../data'

@Component({
  selector: 'corporate-partners',
  standalone: true,
  imports: [],
  templateUrl: './partners.component.html',
  styles: ``,
})
export class PartnersComponent {
  corporatePartner: CorporatePartnerType[] = corporatePartner
}
