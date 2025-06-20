import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'

@Component({
  selector: 'conference-contact',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styles: ``,
})
export class ContactComponent {
  contactForm!: UntypedFormGroup
  submit!: boolean

  constructor(public fb: UntypedFormBuilder) {
    this.contactForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      name: ['', Validators.required],
      message: ['', Validators.required],
    })
  }

  // return forms
  get form() {
    return this.contactForm.controls
  }

  submitForm() {
    this.submit = true
  }
}
