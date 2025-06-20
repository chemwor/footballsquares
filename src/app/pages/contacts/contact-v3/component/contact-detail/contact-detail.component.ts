import { Component } from '@angular/core'
import {
  ContactCategoryType,
  ContactTimingType,
  contactCategory,
  contactTiming,
} from '../../data'

@Component({
  selector: 'contactV3-detail',
  standalone: true,
  imports: [],
  templateUrl: './contact-detail.component.html',
  styles: ``,
})
export class ContactDetailComponent {
  contactCategory: ContactCategoryType[] = contactCategory
  contactTiming: ContactTimingType[] = contactTiming
}
