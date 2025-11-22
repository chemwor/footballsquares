import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'
import { EmailService } from 'src/app/services/email.service'

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
  isSubmitting = false
  submitSuccess = false
  submitError = ''

  constructor(
    private fb: FormBuilder,
    private emailService: EmailService
  ) {}

  ngOnInit(): void {
    this.setupFormValidation()

    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      topic: ['Other'],
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

  async submitForm() {
    this.formGroup = true

    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true
      this.submitError = ''

      try {
        const formData = this.contactForm.value

        // Use Supabase email queue service to send email
        await this.emailService.queueContactFormEmail(formData)

        // Show success message
        this.submitSuccess = true

        // Reset form after successful submission
        this.contactForm.reset()
        this.contactForm.patchValue({ topic: 'Other' })
        this.formGroup = false

        // Hide success message after 5 seconds
        setTimeout(() => {
          this.submitSuccess = false
        }, 5000)

        console.log('Contact form email queued successfully')
      } catch (error) {
        console.error('Error sending contact form:', error)
        this.submitError = 'Failed to send message. Please try again or contact us directly at team@blitzsquares.com'
      } finally {
        this.isSubmitting = false
      }
    }
  }
}
