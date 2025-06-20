import { Component } from '@angular/core'
import { ContactListType, contactList } from '../../data'

@Component({
  selector: 'contactv2-detail',
  standalone: true,
  imports: [],
  templateUrl: './contact-detail.component.html',
  styles: ``,
})
export class ContactDetailComponent {
  contactListDetail: ContactListType[] = contactList
}
