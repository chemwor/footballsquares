import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'
import {
  contactList,
  ContactListType,
  portfolioList2,
  PortfolioList2Type,
} from '../../data'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'list2-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styles: ``,
})
export class ContactComponent implements OnInit {
  contactForm!: UntypedFormGroup
  submit: boolean = false
  contactListData: ContactListType = contactList

  constructor(
    public fb: UntypedFormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.contactForm = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      message: ['', Validators.required],
    })
  }

  ngOnInit() {
    contactList.forEach((item) => {
      item.forEach((data) => {
        data.sanitizedIcon = this.sanitizer.bypassSecurityTrustHtml(data.icon)
      })
    })
  }
  // Return form
  get Form() {
    return this.contactForm.controls
  }

  // Submit
  submitForm() {
    this.submit = true
  }
}
