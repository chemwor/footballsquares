import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'

@Component({
  selector: 'contact-v2-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './contact-v2-form.component.html',
  styles: ``,
})
export class ContactV2FormComponent implements OnInit {
  contactForm!: UntypedFormGroup
  formGroup!: boolean
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.setupFormValidation()

    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      phone: ['', Validators.required],
      location: ['', Validators.required],
      message: ['', Validators.required],
    })
  }

  setupFormValidation(): void {
    const forms = document.getElementsByClassName('needs-validation')

    for (const form of Array.from(forms)) {
      form.addEventListener('submit', this.validateForm.bind(this))
    }
  }

  validateForm(event: Event): void {
    const form = event.target as HTMLFormElement

    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
    }

    form.classList.add('was-validated')
  }

  get formControl() {
    return this.contactForm.controls
  }

  submitForm() {
    this.formGroup = true
  }
}
