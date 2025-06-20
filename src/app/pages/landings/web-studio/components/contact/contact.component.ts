import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'
import { ContactListType, contactList } from '../../data'
import { DomSanitizer } from '@angular/platform-browser'

@Component({
  selector: 'web-studio-contact',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styles: ``,
})
export class ContactComponent implements OnInit {
  contactForm!: UntypedFormGroup
  submit: boolean = false
  webStudioContactData: ContactListType = contactList

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

  ngOnInit(): void {
    this.webStudioContactData.forEach((item) => {
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
